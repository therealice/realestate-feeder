import { crawl } from './crawler'

// Bolig til leie i Sverige
(async() => {
  // 1 seconds delay after each prospect crawled
  const DELAY = 1000
  await crawl(DELAY).catch(e => console.log(e))
})()
