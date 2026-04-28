import e from "express";

export const validateToolInput = (toolName: string, input: any) => {
    if (toolName === "get_crypto_price") {
        if (!input.cryptoName || !input.currency) {
            throw new Error("Invalid crypto tool input");
        }
        return true;
    }

    else if (toolName === "get_country_info_by_name") {
        if (!input.countyName) {
            throw new Error("Invalid country info tool input");
        }
        return true;
    }
    else if (toolName === "get_weatherdata_by_cordinates") {
        if (!input.latitude || !input.longitude) {
            throw new Error("Invalid weather data tool input");
        }
        return true;
    }
    else if (toolName === "get_cordinatesData_by_cityName") {
        if (!input.city) {
            throw new Error("Invalid city to cordinates tool input");
        }
        return true;
    }
}