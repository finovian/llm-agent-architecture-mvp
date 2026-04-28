import { OpenAI } from "openai/client.js";

export const toolsSchemas: OpenAI.Chat.ChatCompletionTool[] = [

    {
        type: 'function',
        function: {
            name: 'get_country_info_by_name',
            description: "pass country name and find any country information A to Z",
            parameters: {
                type: 'object',
                properties: {
                    countyName: { type: "string" },
                },
                required: ['countyName']
            }


        }
    },
    {
        type: 'function',
        function: {
            name: 'get_crypto_price',
            description: "pass crypto  name and curruncy like 'inr' or 'usd' find any crypto price in those curruncy",
            parameters: {
                type: 'object',
                properties: {
                    cryptoName: {
                        type: 'string'
                    },
                    currancy: {
                        type: 'string'
                    }
                },
                required: ['cryptoName', 'currancy']


            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'get_weatherdata_by_cordinates',
            description: "pass cordinates values and get city's weatherdata",
            parameters: {
                type: 'object',
                properties: {
                    latitude: {
                        type: 'string'
                    },
                    longitude: {
                        type: 'string'
                    }
                },
                required: ['latitude', 'longitude']

            }

        }
    },
    {
        type: 'function',
        function: {
            name: 'get_cordinatesData_by_cityName',
            description: "pass cityName and get cordinatesData",
            parameters: {
                type: 'object',
                properties: {
                    city: {
                        type: 'string'
                    }
                },
                required: ['city']
            }

        }
    },
    {
        type: 'function',
        function: {
            name: 'percentage_calculator',
            description: 'pass two diffrent diffrtent numbers data  and we calculate how many percentage second number increase or decrease',
            parameters: {
                type: 'object',
                properties: {
                    currentPrice: {
                        type: 'number',
                    },
                    comparablePrice: {
                        type: 'number',
                    }
                },
                required: ['currentPrice', 'comparablePrice']
            }
        }
    }
]