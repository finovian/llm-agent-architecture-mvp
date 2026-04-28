import { cityToCordinatesConverter, getCountryInfo, getCryptoPrice, getweatherbycordinates } from "./implementations";


export const toolMap = {
    get_crypto_price: getCryptoPrice,
    get_country_info_by_name: getCountryInfo,
    get_weatherdata_by_cordinates: getweatherbycordinates,
    get_cordinatesData_by_cityName: cityToCordinatesConverter

};