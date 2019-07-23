require('dotenv').config()
const { Client } = require('@elastic/elasticsearch')

const config = { 
  node: process.env.ELASTICSEARCH_ENDPOINT,
  index: process.env.ELASTICSEARCH_INDEX 
}

const client = new Client(config)
console.log('Elasticsearch endpoint:', config.node)
console.log('Elasticsearch index:', config.index)

export async function addToIndex(data) {
  return client.index({
    index: config.index,
    type: '_doc',
    body: data
  })
}

export async function isLinkIndexed(link) {
  const result = await client.search({
    index: config.index,
    type: '_doc',
    body: {
      query: {
        match: { link: link }
      }
    }
  })

  return result.body.hits.hits.length > 0 
}

export async function createIndex() {
  const exists = await client.indices.exists({
    index: config.index
  })

  if(!exists) {
    console.log('Creating index:', config.index)
    return client.indices.create({
      index: config.index
    })
  }
}

export async function dropIndex() {
  console.log('Dropping index:', config.index)
  return client.indices.delete({
    index: config.index
  })
}
