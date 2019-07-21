const axios = require('axios')
const cheerio = require('cheerio')

export async function loadPageContent(url) {
  const response = await axios.get(url).then(res => res.data)
  return cheerio.load(response)
}