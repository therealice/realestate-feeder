import { crawl } from './crawler'

// Bolig til leie i Sverige
(async() => {
  await crawl().catch(e => console.log(e))
})()
