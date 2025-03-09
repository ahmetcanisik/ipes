export interface TimezoneType {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
}

export interface TranslationsType {
    "ko": string;
    "pt-BR": string;
    "pt": string;
    "nl": string;
    "hr": string;
    "fa": string;
    "de": string;
    "es": string;
    "fr": string;
    "ja": string;
    "it": string;
    "zh-CN": string;
    "tr": string;
    "ru": string;
    "uk": string;
    "pl": string;
}

export interface CountriesType {
    id: number;
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phonecode: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    region: string;
    region_id: number;
    subregion: string;
    subregion_id: number;
    nationality: string;
    timezones: TimezoneType[];
    translations: TranslationsType;
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
}
