//! jenis modul yang di pakai
//! express

const { urlencoded } = require('express')
const express = require('express')
const { masukJSON, masukan, samaData } = require('./olahData/data')
const { check, body, validationResult } = require('express-validator');
const { render } = require('ejs');
const app = express()


app.set("view engine", "ejs")
app.use(urlencoded())
//!membuat halaman utama
app.get('/', function (req, res) {

    res.render('index', {
        judul: 'halaman awal'
    })
})
//! tutup
//! membuat login masuk
app.get('/login', (req, res) => {
    res.render('login', { judul: 'login' })
})
//! tutup
//!membuat daftar masuk
app.get('/daftar', (req, res) => {
    res.render("daftar", {
        judul: 'daftar',
    })
}).listen(3000, () => {
    console.log('open in browser');
})
app.post('/daftar', [check('email', "email ini salah").isEmail()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render("daftar", {
            judul: "daftar",
            error: errors.array()
        })
    } else {
        masukan(req.body)
        res.redirect('/login')
    }
})
//!tutup
//!menanagani bug url
app.use('/', (req, res) => {
    res.status(404)
    res.send('error not page')
})

