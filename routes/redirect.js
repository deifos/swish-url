const express = require('express');
const router = express.Router();
const db = require('../config/dbconfig');
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'url_records';

router.get('/:shortCode', async (req, res) => {
    const shortCode = req.params.shortCode;
    const SQL = `SELECT longUrl,id FROM ${SCHEMA}.${TABLE} WHERE urlCode = "${shortCode}" LIMIT 1`;
    const list = await db.query(SQL);
    if (list && list.data && list.data[0] && list.data[0].longUrl) {
        const current = list.data[0];
        res.redirect(current.longUrl);
    }
    else {
        res.status(401).send({message: 'NOT_FOUND'});
    }
});

module.exports = router;