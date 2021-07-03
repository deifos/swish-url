# swish-url
URL shortener our way.

A little project to decompress our brains after work or before. 

Because builders build. 

## How to start
### Production
```shell
npm run start
```
### Development
It will start "nodemon" to watch for changes on your code with auto-refresh
```shell
npm run dev
```

## How to use
### Inserting

```json
POST /api/url
{
    "longUrl": "http://this_is_a_long_url"
}

--- Returns ---
{
    "longUrl": "http://<long_url>",
    "shortUrl": "http://<short url>"
}
```

### REDIRECT
http://localhost/go/_\<short code\>_



## Thunder Client
You can import the collection under `/docs`