# swish-url
URL shortener our way.

A little project to decompress our brains after work or before. 

Because builders build. 

## How to start
Download the repo and install dependencies
```shell
npm install
```
Then copy `.env.sample` into `.env` and change the values to your own credentials, you will need a HarperDB database or your own local instance (e.g. Docker) of HarperDB.

### Run Development
It will start "nodemon" to watch for changes on your code with auto-refresh
```shell
npm run dev
```

### Run Production
```shell
npm run start
```

## How to use
### Inserting

```json
POST /api/url
{
    "longUrl": "http://this_is_a_long_url"
}

--- RETURNS ---
{
    "longUrl": "http://<long-url>",
    "shortUrl": "http://<short-url>"
}
```

### Redirect
To use the redirect, you will just access the site url (default localhost:5000) and the short code.
```
http://localhost:5000/<short-code>
```

## Thunder Client
You can import the collection under `/docs`