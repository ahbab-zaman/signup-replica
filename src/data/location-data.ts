/**
 * Country → State/Province data for the Location step cascading dropdowns.
 * Covers the most commonly used countries with full state/division lists.
 */

export type Country = {
  code: string;
  name: string;
  flag: string;
  states: string[];
};

export const COUNTRIES: Country[] = [
  {
    code: "BD",
    name: "Bangladesh",
    flag: "🇧🇩",
    states: [
      "Barisal",
      "Chittagong",
      "Dhaka",
      "Khulna",
      "Mymensingh",
      "Rajshahi",
      "Rangpur",
      "Sylhet",
    ],
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    states: [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California",
      "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
      "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
      "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
      "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
      "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
      "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
      "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
      "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
      "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
    ],
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    states: [
      "England", "Northern Ireland", "Scotland", "Wales",
    ],
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    states: [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
      "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
      "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
      "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
      "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
      "Uttar Pradesh", "Uttarakhand", "West Bengal",
      "Delhi", "Puducherry",
    ],
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    states: [
      "Alberta", "British Columbia", "Manitoba", "New Brunswick",
      "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia",
      "Nunavut", "Ontario", "Prince Edward Island", "Quebec",
      "Saskatchewan", "Yukon",
    ],
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    states: [
      "Australian Capital Territory", "New South Wales", "Northern Territory",
      "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia",
    ],
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    states: [
      "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen",
      "Hamburg", "Hesse", "Lower Saxony", "Mecklenburg-Vorpommern",
      "North Rhine-Westphalia", "Rhineland-Palatinate", "Saarland",
      "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia",
    ],
  },
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    states: [
      "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany",
      "Centre-Val de Loire", "Corsica", "Grand Est", "Hauts-de-France",
      "Île-de-France", "Normandy", "Nouvelle-Aquitaine", "Occitanie",
      "Pays de la Loire", "Provence-Alpes-Côte d'Azur",
    ],
  },
  {
    code: "PK",
    name: "Pakistan",
    flag: "🇵🇰",
    states: [
      "Azad Jammu and Kashmir", "Balochistan", "Gilgit-Baltistan",
      "Islamabad Capital Territory", "Khyber Pakhtunkhwa", "Punjab", "Sindh",
    ],
  },
  {
    code: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
    states: [
      "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
      "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
      "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna",
      "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
      "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
      "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
    ],
  },
  {
    code: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    states: [
      "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará",
      "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
      "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará",
      "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
      "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima",
      "Santa Catarina", "São Paulo", "Sergipe", "Tocantins",
    ],
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    states: ["Central Region", "East Region", "North Region", "North-East Region", "West Region"],
  },
  {
    code: "MY",
    name: "Malaysia",
    flag: "🇲🇾",
    states: [
      "Johor", "Kedah", "Kelantan", "Kuala Lumpur", "Labuan",
      "Malacca", "Negeri Sembilan", "Pahang", "Penang", "Perak",
      "Perlis", "Putrajaya", "Sabah", "Sarawak", "Selangor", "Terengganu",
    ],
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    states: [
      "Abu Dhabi", "Ajman", "Dubai", "Fujairah",
      "Ras Al Khaimah", "Sharjah", "Umm Al Quwain",
    ],
  },
  {
    code: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    states: [
      "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal",
      "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape",
    ],
  },
];

/** Lookup helpers */
export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

export function getStatesByCountryCode(code: string): string[] {
  return getCountryByCode(code)?.states ?? [];
}
