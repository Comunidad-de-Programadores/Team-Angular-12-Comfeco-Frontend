export interface Country
{
    name_en: String;
    name_es: String;
    dial_code: String;
    code: Number;
}

export interface ListCountries {
    countries: Country[];
}