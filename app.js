import { crawl } from './crawler'
import { addToindexFromFile, dropIndex } from './indexer'

// Bolig til leie i Sverige
(async() => {
  // Output file for scraped data
  const outputFile = 'scraped_' + new Date().toISOString() + '.json'

  // 1 seconds delay after each prospect crawled
  const delay = 1000
  
  await crawl(outputFile, delay).catch(e => console.log(e))

  // Drop index
  dropIndex()

  // Add to index
  addToindexFromFile(outputFile)
})()
