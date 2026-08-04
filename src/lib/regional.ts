export type RegionalCity = {
  name: string;
  distanceKm: number;
  tier: "ate-20km" | "20-40km" | "40-60km";
};

export const regionalCities = [
  { name: "Sertãozinho", distanceKm: 0, tier: "ate-20km" },
  { name: "Dumont", distanceKm: 11, tier: "ate-20km" },
  { name: "Pontal", distanceKm: 14, tier: "ate-20km" },
  { name: "Ribeirão Preto", distanceKm: 19, tier: "ate-20km" },
  { name: "Barrinha", distanceKm: 19, tier: "ate-20km" },
  { name: "Jardinópolis", distanceKm: 27, tier: "20-40km" },
  { name: "Pradópolis", distanceKm: 27, tier: "20-40km" },
  { name: "Pitangueiras", distanceKm: 28, tier: "20-40km" },
  { name: "Cravinhos", distanceKm: 35, tier: "20-40km" },
  { name: "Guariba", distanceKm: 36, tier: "20-40km" },
  { name: "Jaboticabal", distanceKm: 38, tier: "20-40km" },
  { name: "Brodowski", distanceKm: 38, tier: "20-40km" },
  { name: "Guatapará", distanceKm: 41, tier: "40-60km" },
  { name: "Serrana", distanceKm: 42, tier: "40-60km" },
  { name: "Viradouro", distanceKm: 43, tier: "40-60km" },
  { name: "Sales Oliveira", distanceKm: 43, tier: "40-60km" },
  { name: "Taquaral", distanceKm: 45, tier: "40-60km" },
  { name: "Morro Agudo", distanceKm: 45, tier: "40-60km" },
  { name: "Motuca", distanceKm: 46, tier: "40-60km" },
  { name: "Orlândia", distanceKm: 47, tier: "40-60km" },
  { name: "Taiúva", distanceKm: 48, tier: "40-60km" },
  { name: "Serra Azul", distanceKm: 48, tier: "40-60km" },
  { name: "Batatais", distanceKm: 49, tier: "40-60km" },
  { name: "Luís Antônio", distanceKm: 51, tier: "40-60km" },
  { name: "Nuporanga", distanceKm: 51, tier: "40-60km" },
  { name: "Rincão", distanceKm: 52, tier: "40-60km" },
  { name: "Terra Roxa", distanceKm: 52, tier: "40-60km" },
  { name: "Taiaçu", distanceKm: 54, tier: "40-60km" },
  { name: "Monte Alto", distanceKm: 55, tier: "40-60km" },
  { name: "Bebedouro", distanceKm: 55, tier: "40-60km" },
  { name: "Santa Ernestina", distanceKm: 56, tier: "40-60km" },
  { name: "São Simão", distanceKm: 59, tier: "40-60km" },
  { name: "Dobrada", distanceKm: 60, tier: "40-60km" },
] as const satisfies readonly RegionalCity[];

export const regionalCityNames = regionalCities.map((city) => city.name);

export const primaryRegionalCities = [
  "Ribeirão Preto",
  "Sertãozinho",
  "Pontal",
  "Dumont",
  "Cravinhos",
  "Barrinha",
  "Jardinópolis",
  "Jaboticabal",
] as const;

export const regionalSearchTerms = [
  "retífica Ribeirão Preto",
  "retífica Sertãozinho",
  "retífica Pontal",
  "retífica Dumont",
  "retífica Cravinhos",
  "retífica de cabeçote Ribeirão Preto",
  "plaina de cabeçote na região de Ribeirão Preto",
] as const;

export function citiesByTier(tier: RegionalCity["tier"]) {
  return regionalCities.filter((city) => city.tier === tier);
}
