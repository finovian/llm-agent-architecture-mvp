export const getCountryInfo = async (countryName: string) => {

    try {
        const result = await fetch(`${process.env.COUNTRY_API_URL}/${countryName}`)
        const data = await result.json()
        return data[0]

    } catch (error) {
        return error
    }

}


export const getCryptoPrice = async (crypto: string, curruncy: string) => {
    try {
        const result = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
        const data = await result.json()
        return data

    } catch (error) {
        console.log('error', error)
        return error
    }
}

export const getweatherbycordinates = async (latitude: any, longitude: any) => {


    try {
        const result = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        const data = await result.json()
        return data

    } catch (error) {
        return error
    }
}

export const cityToCordinatesConverter = async (city: string) => {
    try {
        const result = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        const data = await result.json()
        return data?.results[0]

    } catch (error) {
        return error
    }
}