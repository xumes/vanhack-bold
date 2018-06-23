const express = require('express')
const mysql = require('mysql2/promise')
const bodyParser = require('body-parser')

const api = require('./routes')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('build'))

const init = async () => {
    const connection = await mysql.createConnection({
        host: 'mysql472.umbler.com',
        port: 41890,
        user: 'bold',
        password: 'VanhackJun18',
        database: 'bold-vanhack'
    })

    app.get('/', async (req, res) => {
        res.json({ 'status': 'so far, so good' });
    })

    app.use('/api', api(connection))

    const port = 3000
    app.listen(port, () => {
        console.log(`Serveris running in http://localhost:${port} `)
    });

}

init();