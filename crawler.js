import { loadProspectsLinks, loadPageLinks, loadProspect } from './loader'
const fs = require('fs');

export async function crawl(outputFile) {
  // First page
  const firstPage = 'https://www.blocket.se/bostad/uthyres?sort=&ss=&se=&ros=&roe=&bs=&be=&mre=&q=&q=&q=&is=1&save_search=1&l=0&md=li&f=p&f=c&f=b&ca=15&w=3'

  // Load page links
  const pageLinks = await loadPageLinks(firstPage, 0)
  console.log('Number of page links: ', pageLinks.length)

  // Load prospect links for all pages
  let prospectLinks = []
  for(const pageLink of pageLinks) {
    console.log('Getting prospects links from: ', pageLink)
    const result = await loadProspectsLinks(pageLink, 400)
    prospectLinks = prospectLinks.concat(result)
    console.log('Total prospect links fetched: ', prospectLinks.length)
  }

  // Load prospects
  const prospects = []
  for(const prospectLink of prospectLinks) {
    const result = await loadProspect(prospectLink, 400)
    prospects.push(result)
    console.log('Total prospects fetched: ', prospects.length)
  }

  // Write prospects to file
  fs.appendFileSync(outputFile, JSON.stringify(prospects))
}