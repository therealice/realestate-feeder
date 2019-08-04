require('dotenv').config()
const { Client } = require('@elastic/elasticsearch')

const config = { 
  node: process.env.ELASTICSEARCH_PROTOCOL + '://' + 
    process.env.ELASTICSEARCH_USERNAME + ':' + 
    process.env.ELASTICSEARCH_PASSWORD + '@' + 
    process.env.ELASTICSEARCH_ENDPOINT,
  index: process.env.ELASTICSEARCH_INDEX
}

const client = new Client(config)
console.log('Elasticsearch endpoint:', config.node)
console.log('Elasticsearch index:', config.index)

export async function addToIndex(data) {
  console.log('Indexing: ', data.link)
  return client.index({
    index: config.index,
    type: '_doc',
    id: data.link,
    body: data
  })
}

export async function isLinkIndexed(link) {
  const { body } = await client.search({
    index: config.index,
    type: '_doc',
    body: {
      query: {
        match: { _id: link }
      }
    }
  })

  if( body.hits.hits.length > 0) {
    console.log('Skipping:', body.hits.hits[0]._source.link)
  } 

  return body.hits.hits.length > 0 
}

export async function createIndex() {
  const { body } = await client.indices.exists({
    index: config.index
  })

  if(!body) {
    console.log('Creating index:', config.index)
    await client.indices.create({
      index: config.index
    })

    console.log('Creating mapping')
    return client.indices.putMapping({
      index: config.index,
      type: '_doc',
      body: {
        properties: {
          location: {
            type: "geo_point"
          }
        }
      }
    })
  }
}

export async function dropIndex() {
  const { body } = await client.indices.exists({
    index: config.index
  })

  if(body) {
    console.log('Dropping index:', config.index)
    return client.indices.delete({
      index: config.index
    })
  }
}
