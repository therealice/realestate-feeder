require('dotenv').config()
const { Client } = require('@elastic/elasticsearch')
const fs = require('fs');

const config = { 
  node: process.env.ELASTICSEARCH_ENDPOINT,
  index: process.env.ELASTICSEARCH_INDEX 
}

const client = new Client(config)
console.log('Elasticsearch endpoint:', config.node)
console.log('Elasticsearch index:', config.index)

export function addToIndex(data) {
  console.log('Indexing:', data)
  return client.index({
    index: config.index,
    type: '_doc',
    body: data
  })
}

export function addToindexFromFile(filename) {
  const prospects = JSON.parse(fs.readFileSync(filename))
  for(const prospect of prospects) {
    addToIndex(prospect)
  }
}

export function dropIndex() {
  console.log('Dropping index')
  return client.indices.delete({
    index: config.index,
  });
}
