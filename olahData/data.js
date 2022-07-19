//! jika suatu saat ingin membuat web utamakan params karena indentitas penting
//! url yang idial cth localhost:3000/contact/:nama/:data ini akan jauh lebih ideal


const fs = require('fs')

if (!fs.existsSync('./data')) {
    fs.mkdirSync('data')
}
if (!fs.existsSync('./data/contact.json')) {
    fs.writeFileSync('./data/contact.json', '[]', 'utf-8')
}
if (!fs.existsSync('./data/dataUser.json')) {
    fs.writeFileSync('./data/dataUser.json', '[]', 'utf-8')
}
//! data ini berkaitan dengan contact json
const masukJSON = () => {
    const file = fs.readFileSync('data/contact.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts

}
const masukanData = ((data) => {
    fs.writeFileSync('./data/contact.json', JSON.stringify(data))
})

const masukan = ((data) => {
    const dataUser = masukJSON()
    dataUser.push(data)
    return masukanData(dataUser)
})

const samaData = (email) => {
    const dataUser = masukJSON()
    const jadi = dataUser.filter((a) => a.email === email)
    return jadi
}
const samaDataPw = (password) => {
    const dataUser = masukJSON()
    const jadi = dataUser.filter((a) => a.password === password)
    return jadi
}
//! tutup
//! data ini berkaitan dengan dataUser.json
const dataUser = () => {
    const file = fs.readFileSync('data/dataUser.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts
}
const masukanDataUser = ((data) => {
    fs.writeFileSync('./data/dataUser.json', JSON.stringify(data))
})

const masukUserJson = (data) => {
    const datanya = dataUser()
    datanya.push(data)
    return masukanDataUser(datanya)
}
const samaDataHp = (noHP) => {
    const databae = dataUser()
    const jadi = databae.filter((a) => a.noHP === noHP)
    return jadi
}

//!tutup

module.exports = { masukJSON, masukan, samaData, samaDataPw, masukUserJson, samaDataHp }