//! jenis modul yang di pakai
//! express

const { urlencoded } = require('express')
const express = require('express')
const { masukJSON, masukan, samaData, samaDataPw, masukUserJson, samaDataHp, dataUser, samaDataNama } = require('./olahData/data')
const { check, body, validationResult } = require('express-validator');
const { render } = require('ejs');
const app = express()


app.set("view engine", "ejs")
app.use(urlencoded({ extended: true }))
app.use(express.static('public'))
//!membuat halaman utama
app.get('/', function (req, res) {

    res.render('index', {
        judul: 'PT.Gudang Garam'
    })
})
//! tutup

//!membuat daftar masuk
app.get('/daftar', (req, res) => {
    res.render("daftar", {
        judul: 'PT.Gudang Garam',
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
            judul: "PT.Gudang Garam",
            error: errors.array()
        })
    } else {
        masukan(req.body)
        res.redirect('/login')
    }
})
//!tutup
//! menanagni login
//! membuat login masuk
app.get('/login', (req, res) => {
    res.render('login', { judul: 'login' })
})
//! tutup
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
        const data = { email: 'admin@gmail.com', password: 'admin123' }
        const user = req.body
        console.log(user.email, data.email);
        if (user.email === data.email) {
            res.redirect('/admin')
        } else {
            res.redirect('/regis')
        }
    }
})
//! tutup
//! registrasi 
app.get('/regis', (req, res) => {
    res.render('regis', {
        judul: 'registrasi',
    })
})
//!

//! input data
app.get('/inputData', (req, res) => {
    res.render('inputData', {
        judul: 'PT gudang garam',
    })
})
app.post('/inputData', [body('namaDepan').custom((value) => {
    if (value.length < 3) {
        throw new Error('nama  depan harus lebih dari tiga huruf')
    }
    return true
}), check('noHP', 'no hp salah').isMobilePhone('id-ID'), body('noHP').custom((value) => {
    const dataHp = samaDataHp(value)
    if (dataHp.length <= 0) {
        return true

    }

    console.log(dataHp);
    throw new Error('nomor tlp sudah ada')
}), check('namaDepan', 'nama depan harus huruf besar').isUppercase(), check('namaBelakang', 'nama belakang harus huruf besar').isUppercase(), check('Email', 'email anda salah').isEmail()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        res.render('inputData', {
            judul: 'PT gudang garam',
            error: errors.array()
        })
    } else {

        masukUserJson(req.body)
        res.redirect('/hasilData')
    }
})
//! tutup
//! hasil data

app.get('/hasilData', (req, res) => {
    res.render('hasilData', {
        judul: 'data_anda',
    })

})
//! web admin
app.get('/admin', (req, res) => {

    const data = dataUser()
    res.render('admin', {
        judul: 'admin',
        data
    })
})
//! tutup
//! web detail
app.get('/admin/:nama', (req, res) => {
    const data = samaDataNama(req.params.nama)
    console.log(data);
    res.render('detail', {
        judul: 'detail',
        data,
    })
})
//!

app.use('/', (req, res) => {
    res.status(404)
    res.send('error not page')
})

