import { loadProspectsLinks, loadPageLinks, loadProspect } from './loader'
import { createIndex, isLinkIndexed, addToIndex } from './indexer'

export async function crawl() {
  // Create inedx if it does not exist
  await createIndex()

  // First page
  const firstPage = 'https://www.blocket.se/bostad/uthyres?sort=&ss=&se=&ros=&roe=&bs=&be=&mre=&q=&q=&q=&is=1&save_search=1&l=0&md=li&f=p&f=c&f=b&ca=15&w=3'

  // Load page links
  const pageLinks = await loadPageLinks(firstPage, 0)
  console.log('Number of page links: ', pageLinks.length)

  // Load prospect links for all pages
  let prospectLinks = []
  for(const pageLink of pageLinks) {
    console.log('Getting prospects links from: ', pageLink)
    const result = await loadProspectsLinks(pageLink, 800)
    prospectLinks = prospectLinks.concat(result)
    console.log('Total prospect links fetched: ', prospectLinks.length)
  }

  // Load prospects
  let completed = 0, fetched = 0
  for(const prospectLink of prospectLinks) {
    const isIndexed = await isLinkIndexed(prospectLink.link)

    if(!isIndexed) {
      const prospect = await loadProspect(prospectLink, 800)
      addToIndex(prospect)
      fetched++
    }

    completed++
    console.log('Links completed: '+ completed + ', prospects fetched: '+ fetched)
  }
}