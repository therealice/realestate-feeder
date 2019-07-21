import { loadPageContent } from './loader'
import { parsePageUrls, parseProspectUrls, parseProspect } from './parser'
const fs = require('fs');

async function getProspectsOnPage($, delay) {
  const prospects = []
  const prospectUrls = parseProspectUrls($)
  
  console.log('Parsing prospects on page:', prospectUrls.length)
  for (const url of prospectUrls) {
    const $ = await loadPageContent(url)
    
    const prospect = parseProspect($)
    prospect.link = url
    prospects.push(prospect)

    await new Promise(resolve => setTimeout(resolve, delay));
  }
  console.log('Finished parsing page.')

  return prospects
}

export async function crawl(outputFile, delay) {
  // First page
  const firstPage = 'https://www.blocket.se/bostad/uthyres?sort=&ss=&se=&ros=&roe=&bs=&be=&mre=&q=&q=&q=&is=1&save_search=1&l=0&md=li&f=p&f=c&f=b&ca=15&w=3'

  // Get content on first page
  const $ = await loadPageContent(firstPage)

  // Get pagination urls
  const pagesUrls = parsePageUrls($)  
  console.log('Parsing pages:', pagesUrls.length)
  
  // Get prospects on first page
  const prospects = await getProspectsOnPage($, delay)
  fs.appendFileSync(outputFile, JSON.stringify(prospects))

  // Get prospects on pagination pages
  for(const pageUrl of pagesUrls) {
    const $ = await loadPageContent(pageUrl)
    prospects = await getProspectsOnPage($, delay)
    fs.appendFileSync(outputFile, JSON.stringify(prospects))
  }
}