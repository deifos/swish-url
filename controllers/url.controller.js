const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');
const db = require('../config/dbconfig');
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'url_records';

exports.createShortURL = async(req, res) => {

    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    if (!validUrl.isUri(baseUrl) || !validUrl.isUri(longUrl)) {
        return res.status(400).json({message: 'Invalid URL'});
    }

    //@maestre do your magic
    const urlCode = shortId.generate();

    try {
        const QUERY = `SELECT * FROM ${SCHEMA}.${TABLE} WHERE longUrl="${longUrl}" LIMIT 1`;
        const url = await db.query(QUERY);

        if (url.data.length) {
            const item = url.data[0];
            const shortUrl = baseUrl + '/go/' + item.urlCode;
            res.json({ longUrl: item.longUrl, shortUrl });
        } else {
            const shortUrl = baseUrl + '/go/' + urlCode;

            //write new URL to DB
            db.insert({
                table: TABLE,
                schema: SCHEMA,
                records: [{
                    longUrl: longUrl,
                    urlCode: urlCode,
                    date: new Date(),
                    counter: 0,
                }]
            }).then(result => {
                res.json({ longUrl, shortUrl });
            }, error => {
                res.status(400).json(error);
            });
        };

    } catch (err) {
        res.status(400).json(err);
    }
}