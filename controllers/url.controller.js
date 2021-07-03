const shortId = require('shortid');
const db = require('../config/dbconfig');
const { buildShortUrl } = require('../helpers/common');
const validator = require('../helpers/validation-schemas').createUrlSchema;
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'url_records';

const insertUrl = async (longUrl) => {
    const QUERY = `SELECT * FROM ${SCHEMA}.${TABLE} WHERE longUrl="${longUrl}" LIMIT 1`;
    const exists = await db.query(QUERY);
    if (exists.data.length) {
        const { urlCode } = exists.data[0];
        const shortUrl = buildShortUrl(urlCode);
        return { longUrl, shortUrl };
    } else {
        const urlCode = shortId.generate();
        return await db.insert({
            table: TABLE,
            schema: SCHEMA,
            records: [{
                longUrl: longUrl,
                urlCode: urlCode,
                counter: 0,
            }]
        }).then(() => {
            const shortUrl = buildShortUrl(urlCode);
            return { longUrl, shortUrl };
        }, error => {
            throw error;
        });
    };

}

const createShortURL = async(req, res) => {
    const { error, value:body } = validator.validate(req.body);
    const redirect = req.body.redirect;
    if (error) {
        if (redirect) {
            res.redirect('http://localhost:5000/?error');
        }
        else {
            res.status(400).json({message: error.message});
        }
    }
    else {
        try {
            const data = await insertUrl(body.longUrl);
            if (redirect) {
                res.redirect('http://localhost:5000/?shortUrl=' + encodeURIComponent(data.shortUrl));
            }
            else {
                res.json(data);
            }
        } catch (error) {
            res.status(400).json({message: error.error});
        }
    }
}

function increaseCounter(item) {
    const options = {
        table: TABLE,
        schema: SCHEMA,
        records: [
            {
                id: item.id,
                longUrl: item.longUrl,
                shortCode: item.shortCode,
                counter: ++item.counter,
            }
        ]
    };
    try {
        db.update(options);
    } catch (error) {
        console.error('error ', error);
    }
}

const redirectUrl = async (req, res) => {
    const shortCode = req.params.shortCode;
    const SQL = `SELECT longUrl,id,counter FROM ${SCHEMA}.${TABLE} WHERE urlCode = "${shortCode}" LIMIT 1`;
    const list = await db.query(SQL);
    if (list && list.data && list.data[0] && list.data[0].longUrl) {
        const current = list.data[0];
        res.redirect(current.longUrl);
        increaseCounter(current);
    }
    else {
        res.status(404).send('URL not found');
    }
};

const getStats = async (req, res) => {
    const shortCode = req.params.shortCode;
    const SQL = `SELECT longUrl,id,counter, urlCode FROM ${SCHEMA}.${TABLE} WHERE urlCode = "${shortCode}" LIMIT 1`;
    const list = await db.query(SQL);
    list.data.map(one => one.shortUrl = buildShortUrl(one.urlCode))
    res.json(list);
};

const getLast5 = async (req, res) => {
    const SQL = `SELECT * FROM ${SCHEMA}.${TABLE} ORDER BY __createdtime__ DESC LIMIT 5`;
    const list = await db.query(SQL);
    list.data.map(one => one.shortUrl = buildShortUrl(one.urlCode))
    res.json(list);
};

const getMostPopular5 = async (req, res) => {
    const SQL = `SELECT * FROM ${SCHEMA}.${TABLE} ORDER BY counter DESC LIMIT 5`;
    const list = await db.query(SQL);
    list.data.map(one => one.shortUrl = buildShortUrl(one.urlCode))
    res.json(list);
};

const maintenance = async (req, res) => {
    // DROP COLUMN
    // const options = {
    //     schema: SCHEMA,
    //     table: TABLE,
    //     attribute: 'shortUrl',
    // };
    // await db.dropAttribute(options, (error, result) => {
        //     res.json({error, result});
        // });
        
    // DESCRIBE
    const options = {
        schema: SCHEMA,
        table: TABLE,
    };
    await db.describeTable(options, (error, result) => {
        res.json({error, result});
    });
    
};

module.exports = {
    createShortURL,
    redirectUrl,
    getStats,
    getLast5,
    getMostPopular5,
    maintenance,
}