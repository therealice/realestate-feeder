function parseNumberOfPages($) {
  const link = $('#pagination').find('li[class=last] a').attr('href')
  return link.match(/o=(\d+)/g)[0].split('=')[1]
}

function parsefirstInt(str) {
  try {
    return parseInt(str.replace(/\s+/g, '').match(/^\d+/)[0])
  } catch(e) {
    return null
  }
}

export function parseProspectUrls($) {
  const links = []
  $('#item_list').find('div .media-body .media-heading a').map(function(i, link) {
    links.push(link.attribs.href)
  })

  return links
} 

export function parsePageUrls($) {
  const links = []
  const last = parseNumberOfPages($)
  
  for(let i=1; i<=last; i++) {
    links.push('https://www.blocket.se/bostad/uthyres?sort=&ss=&se=&ros=&roe=&bs=&be=&mre=&q=&q=&q=&save_search=1&l=0&md=li&o='+i+'&f=p&f=c&f=b&ca=15&w=3')
  }
 
  return links
}

export function parseProspect($) {
  const images = []
  $('.carousel-inner').find('.item img').map(function(i, image) {
    images.push(image.attribs.src)
  })

  let coords = null
  try {
    const coordsMatch = $('.map a img').attr('src').match(/(\d+\.\d+):(\d+\.\d+)\?/)
    coords = {
      latitude: coordsMatch[1],
      longitude: coordsMatch[2]
    }
  } catch(e) {}

  const prospect = {
    price: parsefirstInt($('.param-price').text()),
    rooms: parsefirstInt($('.price-wrapper .param').first().text()),
    areal: parsefirstInt($('.price-wrapper .param').last().text()),
    category: $('.subject-param.category').text().trim(),
    address: $('.subject-param.address').text().trim(),
    title: $('.subject_large').text().trim(),
    description: $('.object-text').text().trim(),
    images: images,
    coords: coords
  }  
  
  return prospect
}