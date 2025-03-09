"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ipes = void 0;
class Ipes {
    constructor() {
        this.IPINFO = undefined;
        this.COUNTRY_INFO = undefined;
    }
    find_ip() {
        return __awaiter(this, void 0, void 0, function* () {
            // get ip address request
            const ipInfoRes = yield fetch("https://ipinfo.io/json");
            // if ipInfoRes response is valid...
            if (ipInfoRes.status === 200) {
                // get response body
                const ipInfo = yield ipInfoRes.json();
                // if ip info is right...
                if (ipInfo) {
                    return ipInfo;
                }
                // else ip info is not right!
                throw new Error("ip informations is not found! please reload this page and check your connection!");
            }
            // if ipInfoRes response status is not valid
            throw new Error(`ipInfoRes fetch failed!  ${ipInfoRes.status ? `here is status code = ${ipInfoRes.status}` : ""}`);
        });
    }
    find_country(countryCode_1) {
        return __awaiter(this, arguments, void 0, function* (countryCode, options = { inspect: false }) {
            // get all countries database from github
            const getAllCountriesRes = yield fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/countries.json");
            // if get all countries response is right...
            if (getAllCountriesRes.status === 200) {
                // help me for this code analyze...
                if (options.inspect)
                    console.log("get all countries response status code is ", getAllCountriesRes.status);
                // get all countries with json format.
                const countries = yield getAllCountriesRes.json();
                // if all countries is right...
                if (countries) {
                    // help me for this code analyze...
                    if (options.inspect)
                        console.log("all countries datas are find!", JSON.stringify(countries[0], null, 2), "\n...");
                    // then loop in countries for the getting countryCode
                    let userCountryCode = countries.find((country) => countryCode.toLowerCase() === country.iso2.toLowerCase());
                    if (userCountryCode) {
                        // help me for this code analyze...
                        if (options.inspect)
                            console.log(`matched! your country code is valid!`, userCountryCode);
                        return userCountryCode;
                    }
                    throw new Error(`user country code(${countryCode}) is not matched any countries!`);
                }
                // if countries is not found!
                else {
                    throw new Error("Countries is not found on countries database!");
                }
            }
            // get all countries response is not valid!
            else {
                throw new Error(`Failed to fetching all countries database! ${getAllCountriesRes.status
                    ? `here is status code = ${getAllCountriesRes.status}`
                    : ""}`);
            }
        });
    }
    get_country_info() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.IPINFO) {
                this.IPINFO = yield this.find_ip();
            }
            if (!this.COUNTRY_INFO) {
                this.COUNTRY_INFO = yield this.find_country(this.IPINFO.country);
            }
            if (this.IPINFO.country) {
                return this.COUNTRY_INFO;
            }
            throw new Error("Country info was not found!");
        });
    }
    get_ip_info() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.IPINFO) {
                this.IPINFO = yield this.find_ip();
            }
            if (this.IPINFO) {
                return this.IPINFO;
            }
            throw new Error("ip info was not found!");
        });
    }
}
exports.Ipes = Ipes;
