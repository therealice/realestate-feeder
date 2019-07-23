const axios = require('axios')
const cheerio = require('cheerio')
import { parseProspectUrls, parseProspect, parsePageUrls } from './parser'

export async function loadPageContent(url, delay) {
  await new Promise(resolve => setTimeout(resolve, delay));
  const response = await axios.get(url).then(res => res.data)
  return cheerio.load(response)
}

export async function loadProspect(url, delay) {
  const $ = await loadPageContent(url, delay)
  const prospect = parseProspect($)
  prospect.link = url

  return prospect
}

export async function loadPageLinks(url, delay) {
  const $ = await loadPageContent(url, delay)
  return parsePageUrls($);
}

export async function loadProspectsLinks(url, delay) {
  const $ = await loadPageContent(url, delay)
  return parseProspectUrls($)
}