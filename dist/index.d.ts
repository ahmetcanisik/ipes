import { IpInfoType, CountriesType, InspectorType } from "./types";
export declare class Ipes {
    private IPINFO;
    private COUNTRY_INFO;
    find_ip(): Promise<IpInfoType>;
    find_country(countryCode: string, options?: InspectorType): Promise<CountriesType>;
    get_country_info(): Promise<CountriesType>;
    get_ip_info(): Promise<IpInfoType>;
}
