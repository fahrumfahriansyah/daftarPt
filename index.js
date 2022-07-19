//! jenis modul yang di pakai
//! express

const { urlencoded } = require('express')
const express = require('express')
const { masukJSON, masukan, samaData, samaDataPw } = require('./olahData/data')
const { check, body, validationResult } = require('express-validator');
const { render } = require('ejs');
const app = express()


app.set("view engine", "ejs")
app.use(urlencoded())
app.use(express.static('public'))
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
app.post('/daftar', [body('email').custom((value) => {
    const sama = samaData(value)
    if (sama.length <= 0) {
        console.log(sama);
        return true
    }
    console.log(sama);
    throw new Error('nama email sudah dipakai')
}),
check('email', "email ini salah").isEmail()], (req, res) => {
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
//! menanagni login
app.post('/login', [body('email').custom((value) => {
    const sama = samaData(value)
    if (sama.length <= 0) {
        throw new Error('nama email salah')
    }
    return true

}), body('password').custom((value) => {
    const sama1 = samaDataPw(value)
    if (sama1.length <= 0) {
        throw new Error('nama password salah')
    }
    return true

}), check('email', 'nomor email tidak valid').isEmail()], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {

        res.render('login', {
            judul: 'login',
            error: errors.array()
        })
    } else {
        res.redirect('/regis')
    }
})
app.get('/regis', (req, res) => {
    res.render('regis', {
        judul: 'registrasi',
    })
})
app.use('/', (req, res) => {
    res.status(404)
    res.send('error not page')
})

