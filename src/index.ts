import { IpInfoType, CountriesType, InspectorType } from "./types";

export class Ipes {
  private IPINFO: IpInfoType | undefined = undefined;
  private COUNTRY_INFO: CountriesType | undefined = undefined;

  async find_ip(): Promise<IpInfoType> {
    // get ip address request
    const ipInfoRes = await fetch("https://ipinfo.io/json");

    // if ipInfoRes response is valid...
    if (ipInfoRes.status === 200) {
      // get response body
      const ipInfo: IpInfoType = await ipInfoRes.json();

      // if ip info is right...
      if (ipInfo) {
        return ipInfo;
      }
      // else ip info is not right!
      throw new Error(
        "ip informations is not found! please reload this page and check your connection!"
      );
    }

    // if ipInfoRes response status is not valid
    throw new Error(
      `ipInfoRes fetch failed!  ${
        ipInfoRes.status ? `here is status code = ${ipInfoRes.status}` : ""
      }`
    );
  }

  async find_country(
    countryCode: string,
    options: InspectorType = { inspect: false }
  ): Promise<CountriesType> {
    // get all countries database from github
    const getAllCountriesRes = await fetch(
      "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/countries.json"
    );

    // if get all countries response is right...
    if (getAllCountriesRes.status === 200) {
      // help me for this code analyze...
      if (options.inspect)
        console.log(
          "get all countries response status code is ",
          getAllCountriesRes.status
        );

      // get all countries with json format.
      const countries = await getAllCountriesRes.json();

      // if all countries is right...
      if (countries) {
        // help me for this code analyze...
        if (options.inspect)
          console.log(
            "all countries datas are find!",
            JSON.stringify(countries[0], null, 2),
            "\n..."
          );

        // then loop in countries for the getting countryCode
        let userCountryCode = countries.find(
          (country: CountriesType) => countryCode.toLowerCase() === country.iso2.toLowerCase()
        );

        if (userCountryCode) {
          // help me for this code analyze...
          if (options.inspect)
            console.log(
              `matched! your country code is valid!`,
              userCountryCode
            );

          return userCountryCode;
        }

        throw new Error(
          `user country code(${countryCode}) is not matched any countries!`
        );
      }

      // if countries is not found!
      else {
        throw new Error("Countries is not found on countries database!");
      }
    }
    // get all countries response is not valid!
    else {
      throw new Error(
        `Failed to fetching all countries database! ${
          getAllCountriesRes.status
            ? `here is status code = ${getAllCountriesRes.status}`
            : ""
        }`
      );
    }
  }

  async get_country_info() {
    if (!this.IPINFO) {
      this.IPINFO = await this.find_ip();
    }

    if (!this.COUNTRY_INFO) {
      this.COUNTRY_INFO = await this.find_country(this.IPINFO.country);
    }

    if (this.IPINFO.country) {
      return this.COUNTRY_INFO;
    }

    throw new Error("Country info was not found!");
  }

  async get_ip_info() {
    if (!this.IPINFO) {
      this.IPINFO = await this.find_ip();
    }
    
    if (this.IPINFO) {
      return this.IPINFO;
    }
    
    throw new Error("ip info was not found!");
  }
}