const express     = require('express')
    , app         = express()
    , bodyParser  = require('body-parser')
    , path        = require('path');

const sites = require('./utils/sites')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))
// app.use(express.static(path.join(__dirname, '/public/bigger_picture')))





app.get('/', (req, res, next) => res.render('index', { sites }))

app.get('/site', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/public/bigger_picture/index.html'))
})

const PORT = process.env.PORT || 3000
app.listen(
  PORT
  , () => console.log(
    `${new Date().toLocaleTimeString('en-GB')}: Server initialised on PORT ${PORT}...`
  )
)
