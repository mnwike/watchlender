// WatchLender enquiry mailer. Runs in Martin's Google account as a web app.
// The website posts each enquiry here; this emails it to the address below. Nothing is stored.
var TO = 'martin@nwike.com';
var DAILY_CAP = 80; // stays under Gmail's daily sending limit and blunts abuse

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    var s = function (v, max) { return String(v == null ? '' : v).replace(/[\r\n]+/g, ' ').trim().slice(0, max); };
    var email = s(d.email, 200), name = s(d.name, 120);
    if (d.website) return out({ ok: true }); // hidden field only bots fill in
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || d.consent !== true) return out({ ok: false, error: 'invalid' });

    var props = PropertiesService.getScriptProperties();
    var day = Utilities.formatDate(new Date(), 'Europe/London', 'yyyy-MM-dd');
    var lock = LockService.getScriptLock(); lock.waitLock(5000);
    var count = props.getProperty('day') === day ? Number(props.getProperty('count') || 0) : 0;
    if (count >= DAILY_CAP) { lock.releaseLock(); return out({ ok: false, error: 'busy' }); }
    props.setProperties({ day: day, count: String(count + 1) }); lock.releaseLock();

    var rows = [
      ['Type', s(d.intent, 20)], ['Name', name], ['Email', email], ['Phone', s(d.phone, 30)], ['Postcode', s(d.postcode, 12)],
      ['Item', s(d.watch || d.watchText, 200)], ['Catalogue id', s(d.watchId, 200)], ['Listing', s(d.listingId, 80)],
      ['Year', s(d.year, 20)], ['Weight', s(d.weight, 40)], ['Condition', s(d.condition, 40)], ['Box and papers', s(d.boxPapers, 40)],
      ['Asking price', s(d.askingPrice, 20)], ['Page', s(d.sourceUrl, 300)]
    ].filter(function (r) { return r[1]; });
    var body = rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n') +
      '\n\nMessage:\n' + String(d.message == null ? '' : d.message).slice(0, 2000) +
      '\n\nSent ' + Utilities.formatDate(new Date(), 'Europe/London', "d MMM yyyy 'at' HH:mm") + ' (London). Reply to this email to answer ' + name + '.';
    MailApp.sendEmail({ to: TO, replyTo: email, name: 'WatchLender website', subject: 'WatchLender: ' + (s(d._subject, 150) || 'enquiry from ' + name), body: body });
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: 'failed' });
  }
}

function doGet() { return out({ ok: true, service: 'WatchLender enquiries' }); }
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
// Run once from the editor to grant permission to send email.
function authorise() { MailApp.getRemainingDailyQuota(); }
