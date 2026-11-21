// Collector nicknames for Rolex models. These are informal names, not Rolex's own.
// refs: reference numbers in our catalogue (shown as links). otherRefs: mentioned in text only.
export interface Nickname {
  slug: string;
  name: string; // "Batman"
  model: string;
  summary: string;
  identify: string[];
  refs: string[];
  otherRefs?: string;
  related?: string[]; // other nickname slugs
}

export const NICKNAMES: Nickname[] = [
  {
    slug: "batman", name: "Batman", model: "GMT-Master II",
    summary: "The Rolex Batman is the steel GMT-Master II with a black dial and a two-colour blue and black ceramic bezel. The name comes from the colours. Rolex introduced it in 2013 as reference 116710BLNR and replaced it in 2019 with 126710BLNR.",
    identify: ["Blue and black Cerachrom (ceramic) bezel with a 24-hour scale.", "Black dial with a blue GMT hand.", "116710BLNR was sold on the three-link Oyster bracelet.", "126710BLNR launched on the five-link Jubilee bracelet, which collectors call the Batgirl, and is also made on the Oyster."],
    refs: ["116710BLNR", "126710BLNR"], related: ["batgirl", "pepsi", "bruce-wayne"],
  },
  {
    slug: "batgirl", name: "Batgirl", model: "GMT-Master II",
    summary: "Batgirl is the nickname for the blue and black GMT-Master II, reference 126710BLNR, when it is fitted with the five-link Jubilee bracelet. The watch head is the same as the current Batman; the bracelet is what earns the different name.",
    identify: ["Blue and black ceramic bezel and black dial, as on the Batman.", "Five-link Jubilee bracelet rather than the three-link Oyster.", "Reference 126710BLNR, introduced in 2019."],
    refs: ["126710BLNR"], related: ["batman", "pepsi"],
  },
  {
    slug: "pepsi", name: "Pepsi", model: "GMT-Master II",
    summary: "The Rolex Pepsi is a GMT-Master with a red and blue bezel, the colour scheme the model has carried since the 1950s. The modern steel version is reference 126710BLRO, introduced in 2018 with a ceramic bezel. Earlier references used aluminium bezel inserts.",
    identify: ["Red and blue 24-hour bezel: ceramic on modern references, aluminium on older ones.", "Black dial on the steel models.", "126710BLRO is steel; white gold versions carry references ending 719BLRO.", "The older 16710 could be supplied with a Pepsi, Coke (red and black) or all-black insert, so check which is fitted."],
    refs: ["126710BLRO", "16710"], otherRefs: "White gold versions (116719BLRO, 126719BLRO) and vintage references such as 1675 and 16750 are also called Pepsi.", related: ["batman", "root-beer", "sprite"],
  },
  {
    slug: "bruce-wayne", name: "Bruce Wayne", model: "GMT-Master II",
    summary: "Bruce Wayne is the nickname for the steel GMT-Master II with a grey and black ceramic bezel, reference 126710GRNR, introduced in 2024. The name plays on the Batman: the same watch in a quieter suit.",
    identify: ["Grey and black Cerachrom bezel.", "Black dial with the model name in green and a green GMT hand.", "Steel case, reference 126710GRNR."],
    refs: ["126710GRNR"], related: ["batman", "sprite"],
  },
  {
    slug: "sprite", name: "Sprite", model: "GMT-Master II",
    summary: "The Rolex Sprite is the GMT-Master II with a green and black ceramic bezel, reference 126720VTNR, introduced in 2022. It is unusual for Rolex in having the crown and date on the left side of the case.",
    identify: ["Green and black Cerachrom bezel.", "Winding crown on the left of the case, with the date window at 9 o'clock.", "Steel case, reference 126720VTNR."],
    refs: ["126720VTNR"], related: ["batman", "bruce-wayne"],
  },
  {
    slug: "root-beer", name: "Root Beer", model: "GMT-Master II",
    summary: "The Rolex Root Beer is a GMT-Master with a brown and black bezel and gold in the case. The current versions, introduced in 2018, are 126711CHNR in steel and Everose gold and 126715CHNR in solid Everose gold. The name was first used for brown-bezel GMT-Masters of the 1970s and 1980s.",
    identify: ["Brown and black ceramic bezel on current references.", "126711CHNR is two-tone steel and Everose (rose) gold.", "126715CHNR is solid Everose gold."],
    refs: ["126711CHNR", "126715CHNR"], otherRefs: "Vintage Root Beer references include 1675/3, 16753 and 16713.", related: ["pepsi", "batman"],
  },
  {
    slug: "hulk", name: "Hulk", model: "Submariner Date",
    summary: "The Rolex Hulk is the Submariner Date reference 116610LV, with a green dial and a green ceramic bezel. It was made from 2010 until 2020, when it was replaced by the black-dial 126610LV.",
    identify: ["Green dial and green Cerachrom bezel. Both must be green.", "40 mm steel case, reference 116610LV.", "If the bezel is green but the dial is black, it is a Kermit (16610LV) or a Starbucks (126610LV)."],
    refs: ["116610LV"], related: ["kermit", "starbucks"],
  },
  {
    slug: "kermit", name: "Kermit", model: "Submariner Date",
    summary: "The Rolex Kermit is the Submariner Date reference 16610LV, introduced in 2003 for the Submariner's 50th anniversary. It has a black dial and a green aluminium bezel insert, and was made until 2010.",
    identify: ["Green aluminium bezel insert with a black dial.", "40 mm steel case, reference 16610LV.", "The later green-bezel, black-dial watch with a ceramic bezel is the 126610LV, usually called the Starbucks."],
    refs: ["16610LV"], related: ["hulk", "starbucks"],
  },
  {
    slug: "starbucks", name: "Starbucks", model: "Submariner Date",
    summary: "The Rolex Starbucks is the current green-bezel Submariner Date, reference 126610LV, introduced in 2020. It has a black dial and a green ceramic bezel in a 41 mm case. Some collectors call it the Cermit, a ceramic Kermit.",
    identify: ["Green Cerachrom bezel with a black dial.", "41 mm steel case, reference 126610LV.", "A green dial as well as a green bezel makes it a Hulk (116610LV) instead."],
    refs: ["126610LV"], related: ["hulk", "kermit"],
  },
  {
    slug: "smurf", name: "Smurf", model: "Submariner Date",
    summary: "The Rolex Smurf is the white gold Submariner Date reference 116619LB, with a blue dial and a blue ceramic bezel, made from 2008 to 2020. Its successor, 126619LB, has a black dial with the blue bezel and is nicknamed the Cookie Monster.",
    identify: ["Solid white gold case and bracelet, noticeably heavier than steel.", "Blue dial and blue bezel on 116619LB.", "Black dial and blue bezel on the later 126619LB."],
    refs: ["126619LB"], otherRefs: "The original Smurf is reference 116619LB.", related: ["bluesy", "hulk"],
  },
  {
    slug: "bluesy", name: "Bluesy", model: "Submariner Date",
    summary: "Bluesy is the nickname for the two-tone Submariner Date in steel and yellow gold with a blue dial and blue bezel. The current reference is 126613LB; earlier versions are 116613LB and 16613.",
    identify: ["Steel and yellow gold case and bracelet.", "Blue dial and blue bezel.", "The black-dial two-tone version carries a reference ending LN, not LB."],
    refs: ["126613LB", "116613LB"], otherRefs: "The older aluminium-bezel Bluesy is reference 16613.", related: ["smurf", "hulk"],
  },
  {
    slug: "panda", name: "Panda", model: "Cosmograph Daytona",
    summary: "The Rolex Panda is the steel Cosmograph Daytona with a white dial, black sub-dial rings and a black ceramic bezel. It was introduced in 2016 as reference 116500LN and updated in 2023 as 126500LN. Both references were also made with a black dial, which is not a Panda.",
    identify: ["White dial with black rings around the three sub-dials.", "Black Cerachrom bezel with a tachymeter scale.", "Steel case, reference 116500LN or 126500LN."],
    refs: ["116500LN", "126500LN"], related: ["pepsi", "batman"],
  },
  {
    slug: "wimbledon", name: "Wimbledon", model: "Datejust",
    summary: "The Rolex Wimbledon is not a single reference but a dial: slate grey with Roman numerals outlined in green. It is most often seen on the Datejust 41, in steel, steel and white gold, and two-tone versions.",
    identify: ["Slate grey dial with black Roman numerals edged in green.", "Found on several Datejust references, so the reference alone does not confirm it.", "Check the dial against the papers if you are unsure which version you have."],
    refs: ["126300", "126334", "126333", "126331"], related: ["panda", "pepsi"],
  },
];

export const getNickname = (slug: string) => NICKNAMES.find((n) => n.slug === slug);
