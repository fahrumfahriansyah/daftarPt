
const fs = require('fs')

if (!fs.existsSync('./data')) {
    fs.mkdirSync('data')
}
if (!fs.existsSync('./data/contact.json')) {
    fs.writeFileSync('./data/contact.json', '[]', 'utf-8')
}
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

module.exports = { masukJSON, masukan, samaData, samaDataPw }