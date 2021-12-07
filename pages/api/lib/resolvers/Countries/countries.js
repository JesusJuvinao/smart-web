const { RESTDataSource } = require('apollo-datasource-rest')

export const allCountries = async (parent, args, { dataSources }) => {
    const myData = await dataSources.countriesAPI.getAllCountries()
    const vals = []
    for (const item of myData) {
        vals.push(item.name.common)
    }
    return vals.then(data => data)
}
export const countryByName = async (parent, { name }, { dataSources }) => {
    const countryData = dataSources.countriesAPI.getCountryByName(name)
    return countryData.then(data => data[0])
}

export class CountriesAPI extends RESTDataSource {
    constructor () {
        super()
        this.baseURL = 'https://restcountries.com/v3.1'
    }

    async getAllCountries () {
        return this.get('/all')
    }

    async getCountryByName (name) {
        return this.get(`/name/${ name }`)
    }
}

export default {
    TYPES: {},
    QUERIES: {
        allCountries,
        countryByName
    }
}
