// Collector nicknames for Rolex models. These are informal names, not Rolex's own.
// refs: reference numbers in our catalogue (shown as links). otherRefs: mentioned in text only.
export interface Nickname {
  brand?: "Rolex" | "Omega" | "Tudor"; // default Rolex
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
    slug: "le-mans", name: "Le Mans", model: "Cosmograph Daytona",
    summary: "The Rolex Le Mans is a special Cosmograph Daytona made to mark 100 years of the 24 Hours of Le Mans. It was launched in 2023 in white gold as reference 126529LN, which was discontinued within about a year, and followed in 2024 by a yellow gold version, 126528LN, that Rolex never listed in its public catalogue.",
    identify: ["Black ceramic bezel with the number 100 picked out in red on the tachymeter scale.", "Black dial with contrasting white sub-dials in the style of the vintage exotic dials.", "The chronograph hour counter runs to 24 hours rather than 12.", "Calibre 4132 behind a sapphire case back.", "White gold is 126529LN; yellow gold is 126528LN."],
    refs: ["126529LN", "126528LN"], related: ["paul-newman", "panda", "rainbow"],
  },
  {
    slug: "paul-newman", name: "Paul Newman", model: "Cosmograph Daytona",
    summary: "A Paul Newman Daytona is a vintage, manually wound Cosmograph Daytona fitted with what Rolex called an exotic dial. The name comes from the actor Paul Newman, who wore one. It is the dial, not the reference, that makes a Paul Newman, which is why authenticity and originality matter so much.",
    identify: ["Sub-dials with square-tipped markers and an Art Deco style typeface.", "A contrasting outer minute track in the colour of the sub-dials.", "Found on vintage references including 6239, 6241, 6262, 6263, 6264 and 6265.", "Many ordinary dials have been swapped or faked over the years, so a Paul Newman needs expert authentication before any valuation."],
    refs: ["6239", "6263"], otherRefs: "Exotic dials were also fitted to references 6241, 6262, 6264 and 6265. Paul Newman's own watch was a 6239.", related: ["le-mans", "panda"],
  },
  {
    slug: "rainbow", name: "Rainbow", model: "Cosmograph Daytona",
    summary: "The Rolex Rainbow is a gold Cosmograph Daytona with a bezel set with baguette-cut sapphires graded through the colours of the rainbow. Rolex introduced it in 2012 in yellow gold and white gold, and added an Everose gold version in 2018.",
    identify: ["Bezel set with 36 baguette-cut sapphires in a rainbow gradient.", "Diamonds set into the lugs and crown guards.", "Reference ends in RBOW: 116598RBOW in yellow gold, 116599RBOW in white gold and 116595RBOW in Everose gold.", "Stones added after the watch left Rolex do not make a Rainbow: aftermarket gem-setting is valued very differently."],
    refs: ["116595RBOW", "116598RBOW", "116599RBOW"], related: ["le-mans", "panda"],
  },
  {
    slug: "pikachu", name: "Pikachu", model: "Cosmograph Daytona",
    summary: "The Rolex Pikachu is a yellow gold Cosmograph Daytona with a champagne dial, black sub-dials and a black ceramic bezel, on the black Oysterflex strap. The yellow and black colours gave it the name. Most collectors mean reference 116518LN, introduced in 2017, and its 2023 successor 126518LN.",
    identify: ["Yellow gold case with a black Cerachrom bezel.", "Champagne dial with black sub-dials. The same references were made with other dials, which are not a Pikachu.", "Black Oysterflex strap rather than a metal bracelet.", "Some dealers also use the name for the all-gold bracelet versions, 116508 and 126508, with the same dial, so check the reference rather than relying on the nickname."],
    refs: ["116518LN", "126518LN"], otherRefs: "The bracelet versions 116508 and 126508 with a champagne and black dial are sometimes given the same nickname.", related: ["panda", "le-mans", "rainbow"],
  },
  {
    slug: "wimbledon", name: "Wimbledon", model: "Datejust",
    summary: "The Rolex Wimbledon is not a single reference but a dial: slate grey with Roman numerals outlined in green. It is most often seen on the Datejust 41, in steel, steel and white gold, and two-tone versions.",
    identify: ["Slate grey dial with black Roman numerals edged in green.", "Found on several Datejust references, so the reference alone does not confirm it.", "Check the dial against the papers if you are unsure which version you have."],
    refs: ["126300", "126334", "126333", "126331"], related: ["panda", "pepsi"],
  },
  {
    slug: "cookie-monster", name: "Cookie Monster", model: "Submariner Date",
    summary: "The Rolex Cookie Monster is the white gold Submariner Date reference 126619LB, introduced in 2020, with a black dial and a blue ceramic bezel. It replaced the all-blue Smurf.",
    identify: ["Solid white gold case and bracelet.", "Black dial with a blue Cerachrom bezel.", "41 mm case, reference 126619LB."],
    refs: ["126619LB"], related: ["smurf", "bluesy"],
  },
  {
    slug: "coke", name: "Coke", model: "GMT-Master II",
    summary: "The Rolex Coke is a GMT-Master II with a red and black bezel. The colour scheme first appeared in the 1980s and is best known on reference 16710, which could be fitted with a Coke, Pepsi or all-black aluminium insert.",
    identify: ["Red and black aluminium 24-hour bezel insert.", "Black dial, steel case.", "Because inserts on the 16710 are interchangeable, check that the insert on yours is original to the watch."],
    refs: ["16710"], otherRefs: "The first Coke was reference 16760, sometimes called the Fat Lady.", related: ["pepsi", "batman"],
  },
  {
    slug: "john-mayer", name: "John Mayer", model: "Cosmograph Daytona",
    summary: "The John Mayer is the yellow gold Cosmograph Daytona reference 116508 with a green dial, introduced in 2016. It takes its nickname from the musician and watch collector who praised it.",
    identify: ["Solid yellow gold case and bracelet with a gold bezel.", "Green dial with gold sub-dial rings.", "Reference 116508. Other dial colours of the same reference are not the John Mayer."],
    refs: ["116508"], related: ["panda"],
  },
  {
    slug: "polar", name: "Polar", model: "Explorer II",
    summary: "Polar is the nickname for the Rolex Explorer II with a white dial. The current reference is 226570; earlier versions are 216570 and 16570. Each reference was also made with a black dial.",
    identify: ["White dial with black-outlined hour markers.", "Fixed steel bezel with a 24-hour scale and an orange 24-hour hand on recent references.", "Steel case: 42 mm on 226570 and 216570, 40 mm on 16570."],
    refs: ["226570", "216570"], otherRefs: "The 40 mm reference 16570 was also made with a Polar dial.", related: ["panda"],
  },
  {
    slug: "president", name: "President", model: "Day-Date",
    summary: "The Rolex President is the Day-Date, made only in gold or platinum. Strictly, President is the name of its three-link bracelet with semi-circular links, but collectors use it for the whole watch.",
    identify: ["Day of the week spelled out in full at 12 o'clock, with the date at 3.", "Precious metal only: yellow, white or Everose gold, or platinum.", "The President bracelet with a concealed clasp."],
    refs: ["228238", "228235", "228239", "228206", "128238"], related: ["wimbledon"],
  },
  {
    slug: "zombie", name: "Zombie", model: "GMT-Master II",
    summary: "The Rolex Zombie is the two-tone GMT-Master II reference 126713GRNR, in steel and yellow gold with a grey and black ceramic bezel. Some collectors also call it the Guinness.",
    identify: ["Grey and black Cerachrom bezel.", "Steel and yellow gold case and bracelet.", "Reference 126713GRNR. The all-steel grey and black version is the Bruce Wayne (126710GRNR)."],
    refs: ["126713GRNR"], otherRefs: "The solid yellow gold version with the same bezel is reference 126718GRNR.", related: ["bruce-wayne", "root-beer"],
  },
  {
    slug: "tiffany", name: "Tiffany", model: "Oyster Perpetual",
    summary: "Tiffany is the nickname for the Rolex Oyster Perpetual with a turquoise blue dial, a colour close to the jeweller's signature blue. It is not connected with Tiffany & Co. The dial appeared in 2020 and is currently offered on the Oyster Perpetual 36, reference 126000.",
    identify: ["Bright turquoise blue lacquer dial.", "Steel Oyster Perpetual with a smooth bezel and no date.", "Reference 126000 in 36 mm. The 41 mm reference 124300 was also made with this dial."],
    refs: ["126000", "124300"], related: ["wimbledon", "president"],
  },
  {
    brand: "Tudor", slug: "pepsi", name: "Pepsi", model: "Black Bay GMT",
    summary: "The Tudor Pepsi is the Black Bay GMT with a burgundy and blue bezel, reference M79830RB, introduced in 2018. It takes its nickname from the red and blue Rolex GMT-Master it resembles.",
    identify: ["Matt burgundy and blue aluminium 24-hour bezel.", "Black dial with a red snowflake GMT hand.", "41 mm steel case, reference M79830RB."],
    refs: ["M79830RB-0001"],
  },
  {
    brand: "Omega", slug: "snoopy", name: "Snoopy", model: "Speedmaster",
    summary: "The Omega Snoopy is the Speedmaster Silver Snoopy Award, made to mark the award NASA astronauts gave Omega in 1970 after Apollo 13. The current version is the 50th anniversary model, reference 310.32.42.50.02.001, introduced in 2020. Earlier editions were released in 2003 and 2015.",
    identify: ["Silver dial with blue sub-dials and Snoopy in a spacesuit at 9 o'clock.", "Blue ceramic bezel with a white tachymeter scale.", "An animated case back showing Snoopy in a spacecraft passing the Moon.", "42 mm steel case, reference 310.32.42.50.02.001."],
    refs: ["310.32.42.50.02.001"], otherRefs: "The 2015 edition is reference 311.32.42.30.04.003 and the 2003 edition is 3578.51.00.",
  },
  {
    brand: "Omega", slug: "bond", name: "Bond Seamaster", model: "Seamaster Diver 300M",
    summary: "The Omega Bond watch is the Seamaster Diver 300M, worn by James Bond on screen since GoldenEye in 1995. Collectors usually mean the blue wave-dial Seamaster Professional 300M of the 1990s, reference 2531.80, or the titanium 007 Edition made for No Time To Die, reference 210.90.42.20.01.001.",
    identify: ["2531.80: 41 mm steel case, blue wave-pattern dial, blue bezel, skeleton hands and a helium escape valve at 10 o'clock.", "The first Bond Seamaster, in GoldenEye, was the quartz version, reference 2541.80. The automatic 2531.80 followed in later films.", "007 Edition: 42 mm titanium case, brown aluminium dial and bezel, and a titanium mesh bracelet or striped fabric strap.", "The current blue Diver 300M, 210.30.42.20.03.001, continues the same design with a ceramic dial and bezel."],
    refs: ["2531.80.00", "210.90.42.20.01.001", "210.30.42.20.03.001"], otherRefs: "The quartz GoldenEye watch is reference 2541.80.", related: ["moonwatch", "snoopy"],
  },
  {
    brand: "Omega", slug: "moonwatch", name: "Moonwatch", model: "Speedmaster Professional",
    summary: "The Omega Moonwatch is the Speedmaster Professional, the watch worn on the Moon during the Apollo missions. Unlike most nicknames it is one Omega uses itself. The current steel references use the calibre 3861 and come with either a hesalite or a sapphire crystal.",
    identify: ["42 mm steel case with a black dial, three sub-dials and a black tachymeter bezel.", "Hand-wound movement: calibre 3861 on current models, 1861 before that.", "310.30.42.50.01.001 has a hesalite crystal and a solid case back.", "310.30.42.50.01.002 has a sapphire crystal and a display case back."],
    refs: ["310.30.42.50.01.001", "310.30.42.50.01.002", "311.30.42.30.01.005", "311.30.42.30.01.006"],
  },
];

export const nickBrand = (n: Nickname) => n.brand ?? "Rolex";
export const nickUrl = (n: Nickname) => `/${nickBrand(n).toLowerCase()}/${n.slug}`;
export const nicknamesFor = (brand: string) => NICKNAMES.filter((n) => nickBrand(n) === brand);
export const getNickname = (slug: string, brand = "Rolex") => NICKNAMES.find((n) => n.slug === slug && nickBrand(n) === brand);
