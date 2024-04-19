import countryList from '@/assets/country.json'
import countryListByCallingCode from 'country-json/src/country-by-calling-code.json'

const appCountryList = countryList.map((country) => {
  const item = {
    ...country,
    text: country.en,
    value: country.alpha3
  }
  const findItem = countryListByCallingCode.find((c) => c.country === country.en)
  if (findItem) {
    item.calling_code = findItem.calling_code
  }
  return item
})

export default appCountryList
