import { loadPageContent } from './loader'
import { addToIndex, dropIndex } from './indexer'
import { parsePageUrls, parseProspectUrls, parseProspect } from './parser'

async function indexProspectsOnPage($, delay) {
  const prospectUrls = parseProspectUrls($)
  
  for (const url of prospectUrls) {
    const $ = await loadPageContent(url)
    
    const prospect = parseProspect($)
    prospect.link = url
    
    await addToIndex(prospect)
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

export async function crawl(delay) {
  // Drop existing index
  dropIndex()

  // First page
  const firstPage = 'https://www.blocket.se/bostad/uthyres?sort=&ss=&se=&ros=&roe=&bs=&be=&mre=&q=&q=&q=&is=1&save_search=1&l=0&md=li&f=p&f=c&f=b&ca=15&w=3'

  // Index prospect on first page
  const $ = await loadPageContent(firstPage)
  await indexProspectsOnPage($, delay)

  // Get pagination urls
  const pagesUrls = parsePageUrls($)  
  
  // Index prospects on pagination pages
  for(const pageUrl of pagesUrls) {
    const $ = await loadPageContent(pageUrl)
    await indexProspectsOnPage($, delay)
  }
}