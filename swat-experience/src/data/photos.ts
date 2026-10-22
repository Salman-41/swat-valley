export interface Photo {
  id: string;
  filename: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
  date: string;
  alt: string;
  width: number;
  height: number;
}
export const photos: Photo[] = [
  {
    id: "lake",
    filename: "lake.jpg",
    title: "Mahodand Lake-Summer 2015.jpg",
    author: "Murtaza Mahmud",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source:
      "https://commons.wikimedia.org/wiki/File:Mahodand_Lake-Summer_2015.jpg",
    date: "5 June 2015",
    alt: "Still water at Mahodand, beneath pine forest and a steep mountain ridge",
    width: 2400,
    height: 1600,
  },
  {
    id: "mahodand",
    filename: "mahodand.jpg",
    title: "Mahodand Lake, Kalam, Swat, Pakistan.jpg",
    author: "Abeermajid1996",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source:
      "https://commons.wikimedia.org/wiki/File:Mahodand_Lake,_Kalam,_Swat,_Pakistan.jpg",
    date: "28 April 2018",
    alt: "Pink wildflowers on a rock in a meadow at Mahodand, with mountains behind",
    width: 2000,
    height: 1337,
  },
  {
    id: "kalam",
    filename: "kalam.jpg",
    title: "Kalam Valley Mountain.jpg",
    author: "نوید بٹ",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Kalam_Valley_Mountain.jpg",
    date: "14 April 2017",
    alt: "Snow-covered mountain slopes above conifer forest in Kalam Valley",
    width: 2000,
    height: 1500,
  },
  {
    id: "butkara",
    filename: "butkara.jpg",
    title: "General View of the main Butkara-I Stupa.JPG",
    author: "Muhammad Zahir",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source:
      "https://commons.wikimedia.org/wiki/File:General_View_of_the_main_Butkara-I_Stupa.JPG",
    date: "28 August 2013",
    alt: "Circular stone masonry and excavated foundations at Butkara I in Swat",
    width: 2000,
    height: 1333,
  },
  {
    id: "bahrain-town",
    filename: "bahrain-town.jpg",
    title: "Bahrain town in Swat.jpg",
    author: "Torwali",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Bahrain_town_in_Swat.jpg",
    date: "2018-08-01",
    alt: "Swat River running between the riverside buildings of Bahrain town.",
    width: 4032,
    height: 3024,
  },
  {
    id: "madyan",
    filename: "madyan.jpg",
    title: "Photo of Madyan - Swat (11).jpg",
    author: "Ali Madad Sakhirani",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source:
      "https://commons.wikimedia.org/wiki/File:Photo_of_Madyan_-_Swat_%2811%29.jpg",
    date: "2018-04-27",
    alt: "Buildings and wooded hills at Madyan in Swat.",
    width: 4272,
    height: 2403,
  },
  {
    id: "barikot-ruins",
    filename: "barikot-ruins.jpg",
    title: "Barikot Ghundai Ruins.JPG",
    author: "Tan Afridi",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source: "https://commons.wikimedia.org/wiki/File:Barikot_Ghundai_Ruins.JPG",
    date: "2012-02-18",
    alt: "Excavated stone walls at the Barikot Ghundai archaeological site.",
    width: 3648,
    height: 2048,
  },
  {
    id: "swat-museum",
    filename: "swat-museum.jpg",
    title: "Swat Museum, Swat.jpg",
    author: "Zohaibpmc",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Swat_Museum%2C_Swat.jpg",
    date: "Capture date unknown",
    alt: "The stone exterior of Swat Museum framed by its garden.",
    width: 5152,
    height: 3864,
  },
  {
    id: "malam-jabba",
    filename: "malam-jabba.jpg",
    title: "Malam Jabba, Swat Valley, Pakistan.jpg",
    author: "HQRaja",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source:
      "https://commons.wikimedia.org/wiki/File:Malam_Jabba%2C_Swat_Valley%2C_Pakistan.jpg",
    date: "2013-12-29",
    alt: "Sunlight breaks through cloud across the mountains at Malam Jabba.",
    width: 4128,
    height: 2322,
  },
  {
    id: "bahrain-river",
    filename: "bahrain-river.jpg",
    title: "Swat River in Bahrain Pakistan A.jpg",
    author: "Umairkhanaks",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source:
      "https://commons.wikimedia.org/wiki/File:Swat_River_in_Bahrain_Pakistan_A.jpg",
    date: "2015-05-22",
    alt: "The Swat River flowing over rocks below the riverside town of Bahrain.",
    width: 6016,
    height: 4000,
  },
  {
    id: "ushu-forest",
    filename: "ushu-forest.jpg",
    title: "Usho Valley Kalam.jpg",
    author: "Umer Wasi",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Usho_Valley_Kalam.jpg",
    date: "2017-12-27",
    alt: "Snow-covered peaks rise behind the conifer forest of Ushu Valley.",
    width: 5312,
    height: 2988,
  },
];
export function getPhoto(id: string): Photo {
  const p = photos.find((photo) => photo.id === id);
  if (!p) throw new Error(`Unknown photo: ${id}`);
  return p;
}
