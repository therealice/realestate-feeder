import { crawl } from './crawler'
import { addToindexFromFile, dropIndex } from './indexer'

// Bolig til leie i Sverige
(async() => {
  // Output file for scraped data
  const outputFile = 'scraped_' + new Date().toISOString() + '.json'
  
  await crawl(outputFile).catch(e => console.log(e))

  // Drop index
  dropIndex()

  // Add to index
  addToindexFromFile(outputFile)
})()
