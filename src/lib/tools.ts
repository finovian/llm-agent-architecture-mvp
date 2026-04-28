import openAi, { OpenAI } from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/index.js'
import { toolsSchemas } from '../tools/schemas'


export const getCountryInfo = async (countryName: string) => {

    try {
        const result = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        const data = await result.json()
        return data

    } catch (error) {
        return error
    }

}


export const findmyCryptoPrice = async (crypto: string, curruncy: string) => {
    try {
        const result = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${curruncy}`)
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
        return data

    } catch (error) {
        return error
    }
}

export const getPercentage = async (currentPrice: number, comparablePrice: number) => {
    return (currentPrice * 100) / comparablePrice
}



const exicuteTools = async (toolName: string, inputs: any) => {
    switch (toolName) {
        case 'get_country_info_by_name': {
            const result = await getCountryInfo(inputs.countyName);
            return JSON.stringify(result);
        }

        case 'get_crypto_price': {
            const result = await findmyCryptoPrice(inputs.cryptoName, inputs.currancy);
            return JSON.stringify(result);
        }

        case 'get_weatherdata_by_cordinates': {
            const result = await getweatherbycordinates(inputs.latitude, inputs.longitude);
            return JSON.stringify(result);
        }

        case 'get_cordinatesData_by_cityName': {
            const result = await cityToCordinatesConverter(inputs.city);
            return JSON.stringify(result);
        }
        case 'percentage_calculator': {
            const result = await getPercentage(inputs.currentPrice, inputs.comparablePrice)
            return JSON.stringify(result);
        }



        default:
            return JSON.stringify({ message: 'no tools match there' });
    }
}

const openai = new openAi({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: process.env.GITHUB_TOKEN,
})

export const exparimentalAgent = async (message: string, history: any) => {


    const contextWindowMessages: ChatCompletionMessageParam[] = [
        {
            role: 'system', content: 'You are my AI assistant, you have access to some tools, use them when needed to answer the user question, if you want to use the tool call it with the format specified in the toolsSchemas, and wait for the response from the tool to answer the user question'
        },
        ...history.map((item: any) => {
            return {
                role: item.role,
                content: item.content
            }
        })
    ]

    let steps = 0
    const MAX_STEPS = 5


    while (steps < MAX_STEPS) {
        steps++

        console.log('contextWindowMessages', contextWindowMessages)

        try {

            const response = await openai.chat.completions.create({
                messages: contextWindowMessages,
                model: 'gpt-4o-mini',
                tools: toolsSchemas
            })

            const messageRes = response.choices[0].message
            contextWindowMessages.push(messageRes)

            const choice = response.choices[0]

            if (choice.finish_reason == 'stop' || !messageRes.tool_calls?.length) {

                return messageRes.content
            }

            for (const tools of messageRes?.tool_calls) {
                console.log('tools', tools)
                const toolId = tools.id
                const toolName = tools.function.name
                const inputs = JSON.parse(tools.function.arguments)
                const toolsData = await exicuteTools(toolName, inputs)


                contextWindowMessages.push({
                    role: 'tool',
                    tool_call_id: toolId,
                    content: JSON.stringify(toolsData),
                })
            }


        } catch (error) {
            return error
        }
    }
    return "Max steps reached";
}
