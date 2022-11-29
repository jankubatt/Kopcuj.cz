const express = require('express');
const router = express.Router();

let mysql = require('mysql');
let config = require('../../config/db.js');
let db = mysql.createConnection(config);

router.get('/', (req, res) => {
    let sql = `SELECT * FROM hills`
    db.query(sql, (err, result) => {
        res.send(result)
    })
});

router.get('/name/:name', (req, res) => {
    let name = req.params.name.split("-")[0];
    let elevation = req.params.name.split("-")[1].replace('m', '')

    let sql = `SELECT * FROM hills WHERE name='${name}' AND elevation='${elevation}'`;
    db.query(sql, (err, result) => {
        res.send(result)
    })
})

router.get(`/attributes/:hillId`, (req, res) => {
    let sql = `SELECT * FROM hills_attributes WHERE hill=${req.params.hillId};`;
    db.query(sql, (e, r) => {
        res.send(r);
    })
})

router.post('/create', (req, res) => {
    let sql = `INSERT INTO hills (
                                    name, 
                                    elevation, 
                                    lat,
                                    lng, 
                                    prominence, 
                                    isolation, 
                                    material, 
                                    basin, 
                                    district, 
                                    location
                                  ) VALUES (
                                  '${req.body.name}',
                                  ${req.body.elevation},
                                  '${req.body.lat}', 
                                  '${req.body.lng}', 
                                  '${req.body.prominence}', 
                                  '${req.body.isolation}', 
                                  '${req.body.material}', 
                                  '${req.body.basin}',
                                  '${req.body.district}',
                                  '${req.body.location}'
                                  )`;
    db.query(sql, (err, result) => {
        console.log(err)
        res.send(result)
    })
})

module.exports = router;