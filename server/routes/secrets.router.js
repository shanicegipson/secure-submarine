const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('req.username:', req.user);
    console.log('isAuth', req.isAuthenticated())

    const queryString = `SELECT * FROM "secret" WHERE "secrecy_level" <= $1`;

    if(req.isAuthenticated()){
        pool.query(queryString, [req.user.clearance_level])
            .then((response) => {
                res.send(response.rows);
            })
            .catch((err) => {
                console.log(`$err`);
                res.sendStatus(403);
            })
    } else {
        res.sendStatus(403);
    }
});


module.exports = router;