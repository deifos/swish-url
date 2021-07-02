const express = require('express');
const router = express.Router();
const db = require('../config/dbconfig');
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'url_records';

router.get('/:shortCode', async (req, res) => {
    const shortCode = req.params.shortCode;
    const SQL = `SELECT longUrl,id,counter FROM ${SCHEMA}.${TABLE} WHERE urlCode = "${shortCode}" LIMIT 1`;
    const list = await db.query(SQL);
    if (list && list.data && list.data[0] && list.data[0].longUrl) {
        const current = list.data[0];
        res.redirect(current.longUrl);

        increaseCounter(current);
    }
    else {
        res.status(404).send('NOT_FOUND');
    }
});

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

module.exports = router;