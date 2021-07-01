const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');
const db = require('../config/dbconfig');
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'url_records';

router.post('/swishurl', async(req, res) => {

    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid URL');
    }

    //@maestre do your magic
    const urlCode = shortId.generate();

    if (validUrl.isUri(longUrl)) {

        try {
            const QUERY = `SELECT * FROM ${SCHEMA}.${TABLE} WHERE longUrl="${longUrl}"`;
            const url = await db.query(QUERY);

            if (url.data.length) {
                console.log('url already exists');
                res.json(url.data);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                //write new URL to DB
                db.insert({
                    table: TABLE,
                    schema: SCHEMA,
                    records: [{
                        longUrl: longUrl,
                        shortUrl: shortUrl,
                        urlCode: urlCode,
                        date: new Date()
                    }]
                }).then(result => {
                    res.status(result.statusCode).json({ longUrl: longUrl, shortUrl: shortUrl, urlCode: urlCode });
                }, error => {
                    res.status(500).json(error);
                });
            };

        } catch (err) {
            console.log('error with url');
            res.status(500).json(err);
        }
    } else {
        res.status(500).json('invalid long url');
    }
});


module.exports = router;