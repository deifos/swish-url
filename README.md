# swish-url
URL shortener our way.

A little project to decompress our brains after work or before. 

Because builders build. 

## Internals
This project uses these technologies:
* [HaperDB](https://harperdb.io/)
* [Harperive](https://chandan-24.github.io/Harperive/) (DB client for node)
* [Express JS](https://expressjs.com/)


### Final Product

![swish](https://user-images.githubusercontent.com/3372909/124412853-6dbfab80-dd1d-11eb-9ab8-b2586d8dd321.png)

## How to start
Download the repo and install dependencies
```shell
npm install
```
Then copy `.env.sample` into `.env` and change the values to your own credentials, you will need a [HarperDB database](https://harperdb.io/product/harperdb-cloud/) or your own local instance [Docker HarperDB](https://hub.docker.com/r/harperdb/hdb).

### Run Development
It will start "nodemon" to watch for changes on your code with auto-refresh
```shell
npm run dev
```

### Run Production
```shell
npm run start
```
### Run Docker
To run docker, make sure **.env** file has the proper db credentials. After the service is up, you can access your app at `localhost:5000`
```shell
docker compose up
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
![thunder](https://user-images.githubusercontent.com/3884823/124386367-0a476680-dca8-11eb-8fae-76d22bdda0e4.png)


## POC utility
In case we need in the future to use a file-based config:
```
# /config/default.json
{"foo":"bar"}

const config = require('config');
config.get('foo');
```

