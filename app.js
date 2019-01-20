const express     = require('express')
    , app         = express()
    , bodyParser  = require('body-parser')
    , path        = require('path');

const sites = require('./utils/sites.js')
const devSites = require('./utils/sites_dev_nonauthor.js')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))
// app.use(express.static(path.join(__dirname, '/public/bigger_picture')))





app.get('/', (req, res, next) => {
  // console.log(req.query.mode, !!req.query.mode)
  if (req.query.dev) res.render('index', { sites: devSites })
  else res.render('index', { sites })
})

app.get('/site', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/public/bigger_picture/index.html'))
})

app.get('/sites/:site', (req, res, next) => {
  console.log(req.params.site)
  res.render(`${req.params.site}`)
})

app.get('/api/sites', (req, res, next) => {
  if (req.query.dev) res.status(200).json({ sites: devSites })
  else res.status(200).json({ sites })
})

app.get('/api/site/:id', (req, res, next) => {
  const site = sites.find(e => e._id === req.params.id)
  if (site) res.status(200).json({ site })
  else res.status(400).json({ err: 'Not found', site })
})

const PORT = process.env.PORT || 3000
app.listen(
  PORT
  , () => console.log(
    `${new Date().toLocaleTimeString('en-GB')}: Server initialised on PORT ${PORT}...`
  )
)
