const headersEnglisCarsApi = {
  "x-rapidapi-host": "car-data.p.rapidapi.com",
  "x-rapidapi-key": "4607af252emsh3d7ae6deef5d96ep1f460fjsnd8f476e79f3a",
};
const carsProperties = {
  doorCountOptions: ["2", "3", "4", "5"],
  countOfSeatsOptions: [2, 4, 5, 6, 7],
  gearBoxesList: ["Concentric", "Parallel", "Right Angle", "Shaft Mount	"],
  NumberOfOwners: [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "+10",
  ],
  colorList: [
    "Black",
    "Gray",
    "Silver",
    "Red",
    "Blue",
    "Brown",
    "Green",
    "Beige",
    "Orange",
    "Gold",
    "Yellow",
    "Purple",
  ],
  InteriorDesign: [
    "Alcantara",
    "Leather",
    "Perforated Leather",
    "Cloth",
    "Inverted Leather",
  ],
  Condition: ["Used", "New", "Demonstration car"],
  makes: [
    {
      english: "Volvo",
      hebrew: "וולבו",
    },
    {
      english: "Ford",
      hebrew: "פורד",
    },
    {
      english: "GMC",
      hebrew: "ג'י.אמ.סי",
    },
    {
      english: "Mitsubishi",
      hebrew: "מיצובישי",
    },
    {
      english: "Dodge",
      hebrew: "דודג'",
    },
    {
      english: "Nissan",
      hebrew: "ניסאן",
    },
    {
      english: "honda",
      hebrew: "הונדה",
    },
    {
      english: "Lincoln",
      hebrew: "לינקולן",
    },
    {
      english: "Hyundai",
      hebrew: "יונדאי",
    },
    {
      english: "BMW",
      hebrew: "ב מ וו",
    },
    {
      english: "Bentley",
      hebrew: "בנטלי",
    },
    {
      english: "Lexus",
      hebrew: "לקסוס",
    },
    {
      english: "Chevrolet",
      hebrew: "שברולט",
    },
    {
      english: "Jaguar",
      hebrew: "יגואר",
    },
    {
      english: "Mercedes Benz",
      hebrew: "מרצדס",
    },
    {
      english: "Volkswagen",
      hebrew: "פולקסווגן",
    },
    {
      english: "Land Rover",
      hebrew: "לנדרובר",
    },
    {
      english: "Cadillac",
      hebrew: "קאדילאק",
    },
    {
      english: "Fiat",
      hebrew: "פיאט קרייזלר",
    },
    {
      english: "Kia",
      hebrew: "קיה",
    },
    {
      english: "Lamborghini",
      hebrew: "למבורגיני",
    },
    {
      english: "Audi",
      hebrew: "אאודי",
    },
    {
      english: "Jeep",
      hebrew: "ג'יפ",
    },
    {
      english: "Mazda",
      hebrew: "מזדה",
    },
    {
      english: "Suzuki",
      hebrew: "סוזוקי",
    },
    {
      english: "Toyota",
      hebrew: "טויוטה",
    },
    {
      english: "Chrysler",
      hebrew: "קרייזלר",
    },

    {
      english: "Ferrari",
      hebrew: "פרארי",
    },
    {
      english: "Tesla",
      hebrew: "טסלה",
    },
    {
      english: "Porsche",
      hebrew: "פורשה",
    },
    {
      english: "Rolls-Royce",
      hebrew: "רולס-רויס",
    },
    {
      english: "Smart",
      hebrew: "סמארט",
    },
    {
      english: "Maserati",
      hebrew: "מזארטי",
    },
    {
      english: "McLaren",
      hebrew: "מקלארין",
    },
  ],
};
const doorCountOptions = ["2", "3", "4", "5"];
const countOfSeatsOptions = [2, 4, 5, 6, 7];
const gearBoxesList = [
  "Concentric",
  "Parallel",
  "Right Angle",
  "Shaft Mount	",
];
const NumberOfOwners = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "+10",
];
const colorList = [
  "Black",
  "Gray",
  "Silver",
  "Red",
  "Blue",
  "Brown",
  "Green",
  "Beige",
  "Orange",
  "Gold",
  "Yellow",
  "Purple",
];
const companiesHeAndEn = [
  {
    english: "buick",
    hebrew: "ביואיק",
  },
  {
    english: "MINI",
    hebrew: "מיני קופר",
  },
  {
    english: "Volvo",
    hebrew: "וולו",
  },
  {
    english: "Ford",
    hebrew: "פורד",
  },
  {
    english: "HAMMER",
    hebrew: "האמר",
  },
  {
    english: "GMC",
    hebrew: "ג'י אם סי",
  },
  {
    english: "Subaru",
    hebrew: "סובארו",
  },
  {
    english: "Mitsubishi",
    hebrew: "מיצובישי",
  },
  {
    english: "Dodge",
    hebrew: "דודג'",
  },
  {
    english: "Nissan",
    hebrew: "ניסאן",
  },
  {
    english: "honda",
    hebrew: "הונדה",
  },
  {
    english: "Lincoln",
    hebrew: "לינקולן",
  },
  {
    english: "Hyundai",
    hebrew: "יונדאי",
  },
  {
    english: "BMW",
    hebrew: "במוו",
  },
  {
    english: "Bentley",
    hebrew: "בנטלי",
  },
  {
    english: "Lexus",
    hebrew: "לקסוס",
  },
  {
    english: "Chevrolet",
    hebrew: "שברולט",
  },
  {
    english: "Jaguar",
    hebrew: "יגואר",
  },
  {
    english: "Mercedes Benz",
    hebrew: "מרצדס",
  },
  {
    english: "Volkswagen",
    hebrew: "פולקסווגן",
  },
  {
    english: "Aston Martin",
    hebrew: "אסטון מרטין",
  },
  {
    english: "Land Rover",
    hebrew: "לנד רובר",
  },
  {
    english: "Cadillac",
    hebrew: "קאדילאק",
  },
  {
    english: "Fiat",
    hebrew: "פיאט",
  },
  {
    english: "Kia",
    hebrew: "קיה",
  },
  {
    english: "Lamborghini",
    hebrew: "למבורגיני",
  },
  {
    english: "Audi",
    hebrew: "אאודי",
  },
  {
    english: "Jeep",
    hebrew: "ג'יפ",
  },
  {
    english: "Mazda",
    hebrew: "מזדה",
  },
  {
    english: "Suzuki",
    hebrew: "סוזוקי",
  },
  {
    english: "Toyota",
    hebrew: "טויוטה",
  },
  {
    english: "Chrysler",
    hebrew: "קרייזלר",
  },
  {
    english: "Ferrari",
    hebrew: "פרארי",
  },
  {
    english: "Tesla",
    hebrew: "טסלה",
  },
  {
    english: "Infiniti",
    hebrew: "אינפיניטי",
  },
  {
    english: "Oldsmobile",
    hebrew: "אולד מובייל",
  },
  {
    english: "RAM",
    hebrew: "ראם",
  },
  {
    english: "Eagle",
    hebrew: "איגל",
  },
  {
    english: "Porsche",
    hebrew: "פורשה",
  },
  {
    english: "Mercury",
    hebrew: "מרקורי",
  },
  {
    english: "Scion",
    hebrew: "סקיון",
  },
  {
    english: "Lotus",
    hebrew: "לוטוס",
  },
  {
    english: "Plymouth",
    hebrew: "פליימוט'",
  },
  {
    english: "Freightliner",
    hebrew: "פרייטליינר",
  },
  {
    english: "Rolls-Royce",
    hebrew: "רולס רוייס",
  },
  {
    english: "SRT",
    hebrew: "אס אר טי",
  },
  {
    english: "Maybach",
    hebrew: "מייבאך",
  },
  {
    english: "Alpha Romeo",
    hebrew: "אלפא רומאו",
  },
  {
    english: "Geo",
    hebrew: "גאו",
  },
  {
    english: "Smart",
    hebrew: "סמארט",
  },
  {
    english: "Daihatsu",
    hebrew: "דייאטסו",
  },
  {
    english: "Daewoo",
    hebrew: "דאייוו",
  },
  {
    english: "Maserati",
    hebrew: "מזראטי",
  },
  {
    english: "Genesis",
    hebrew: "ג'נסיס",
  },
  {
    english: "McLaren",
    hebrew: "מקלארן",
  },
  {
    english: "Fisker",
    hebrew: "פיסקר",
  },
  {
    english: "Panoz",
    hebrew: "פאנוז",
  },
];
const carsCompany = [
  "Buick",
  "MINI",
  "Volvo",
  "Ford",
  "HUMMER",
  "GMC",
  "Subaru",
  "Mitsubishi",
  "Dodge",
  "Nissan",
  "Honda",
  "Lincoln",
  "Hyundai",
  "BMW",
  "Bentley",
  "Lexus",
  "Chevrolet",
  "Jaguar",
  "Mercedes-Benz",
  "Volkswagen",
  "Aston Martin",
  "Land Rover",
  "Pontiac",
  "Cadillac",
  "FIAT",
  "Saab",
  "Kia",
  "Lamborghini",
  "Audi",
  "Jeep",
  "MAZDA",
  "Suzuki",
  "Toyota",
  "Acura",
  "Saturn",
  "Chrysler",
  "Isuzu",
  "Ferrari",
  "Tesla",
  "INFINITI",
  "Oldsmobile",
  "Ram",
  "Eagle",
  "Porsche",
  "Mercury",
  "Scion",
  "Lotus",
  "Plymouth",
  "Freightliner",
  "Rolls-Royce",
  "SRT",
  "Maybach",
  "Alfa Romeo",
  "Geo",
  "smart",
  "Daewoo",
  "Maserati",
  "Daihatsu",
  "Genesis",
  "McLaren",
  "Fisker",
  "Panoz",
];
const hebrewCarsCompany = [
  "ב מ וו",
  "פורשה",
  "רובר",
  "מרצדס",
  "קאדילאק",
  "ג'יפ",
  "לנדרובר",
  "טויוטה",
  "ג'יפ",
  "סמארט",
  "וויט-וולוו",
  "רולס-רויס",
  "קרייזלר",
  "ג'י.אמ.סי",
  "למבורגיני",
  "קיה",
  "ניסאן",
  "הונדה",
  "לינקולן",
  "פיאט קרייזלר",
  "טסלה",
  "סקודה",
  "פיג'ו",
  "אאודי",
  "יגואר",
  "דודג'",
  "מזארטי",
  "לקסוס",
  "פולקסווגן",
  "יונדאי",
  "סיטרואן",
  "לנד רובר",
  "בנטלי",
  "מזדה",
  "וולבו",
  "פורד",
  "פרארי",
  "מיצובישי",
  "די.אס",
  "רנו",
  "מקלארין",
  "שברולט",
  "סוזוקי",
  "סיאט",
];

export {
  headersEnglisCarsApi,
  carsProperties,
  doorCountOptions,
  countOfSeatsOptions,
  gearBoxesList,
  colorList,
  companiesHeAndEn,
  carsCompany,
  hebrewCarsCompany,
};