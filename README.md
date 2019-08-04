# Prospect feeder
## Purpose
The user interface on blocket.se does not have what I need, so I made this for my own use. The idea is to read the prospects from their website and feed them into an Elasticsearch instance. Then display the data using a simple web page by fetching the data from Elasticsearch. This is not really ment for public use.

## Configure
Copy the .env.template file to .env and configure it to your needs.

## Install
To install, type:
```
npm install
```

## Run
To crawl type:
```
npm start
```
This will do the following in order:
1. Fetch all links to the real estate prospects
2. Parse each prospect and index it in Elasticsearch.
