const express     = require('express')
    , app         = express()
    , bodyParser  = require('body-parser')
    , path        = require('path');

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/public/bigger_picture')))


const sites = [
  {
    local: false,
    title: 'NGEM Network Site',
    description: 'blah blah',
    offsiteURL: 'https://oddert.github.io/msc/bigger_picture/',
    onsiteURL: null,
    thumbnail: 'https://lh3.googleusercontent.com/9Yd-wZpkVlvQcIi5FSvxgyA-XwWi6TtXQ6zLvZipsckx-pXj8MrDQQlhC1tTp1Ez3PDTk1R1fWnOJ9LNeOL1kcQmndO_f7pxPbA2zjfPdds6kbJfVBOFQ9DvhWV1OHix9mkEYyIt1ZOBnzToU6-Xp81kFKbM1Z0rVvIO879VMHGtCcyiRoTJNxbw8GbUp_tJXxDRzLcRmF3XvJBc8dul-EBxhY0ERcDbTHsVUoFQyOYSy1AIXnoS8H3G4jPP_Vln5Ro0_eaEJYVRxdyYlrj5BWgf4x2oS4pj-RorZ0hqrlIBM9nL2h0jNdWFSVlV4x00U3fh6u_5nPmIhFD-5QkwGIlGAybtMmN9S1-zNwd9W0F7Td5djUsjm5QHdQgdhYKI2TxbAV1wiLgYWVzTazVwj2ZAoBlPspx7mKADwe1-uayfeQUSIEmzltZdszjF-c_gWNkVheR4VFeHmT3SOkXzH4SjszVihf_nakoR0GQskfEospx7JUoANnzBLRu4bTM95uXVDdF7ny4W_cu6FxWntEqVZkuQReAqDZtIzai-BAS2NqbIrTXQ0kpDov5VaJGJwpnGkCQnuyCALkkbwOOBFqRxaPSjqJ5MCY14CxN6TwVFHul5EkO1-BDmrAbcY1OSgBIP6KDg1BhaQoOx-CTkSVoabQ=w1926-h1014-no'
  }
]


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
