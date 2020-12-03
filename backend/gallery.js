const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const paintings = require('./paintings')
const products = require('./products')

const assert = require('assert')
/*
 * Initialize the express engine and setup to use bodyParser
 */
const app = express()
const clientPort = 3001
//const clientPort = 4200

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "http://localhost:"+clientPort)
  next()
})
/*
app.route('/api/login')
    .post(loginRoute)

const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key')

function loginRoute(req, res) {

    const email = req.body.email,
          password = req.body.password

    if (validateEmailAndPassword()) {
       const userId = findUserIdForEmail(email)

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: 120,
                subject: userId
            })

          // send the JWT back to the user
          // TODO - multiple options available
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401)
    }
}
*/

/*
 * Get all paintings from gallery.paintings (db/collection)
 */
app.get('/api/getPaintings', paintings.getPaintings)

/*
 * Get painting with the given 'name'
 */
app.get('/api/getPainting/:name', paintings.getPainting)

/*
 * Add a painting via a post which contains 'id', 'name' and 'imageFile' fields in json format.
 */
app.post('/api/addPainting', paintings.addPainting)

app.post('/api/cart/additem/:cartId', (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true )
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:'+clientPort)
  const cartId = req.params.cartId
  console.log("cartId: " + cartId)

  const newItem = req.body
  console.log("new Item: " + JSON.stringify(newItem) )

  MongoClient.connect("mongodb://localhost:27017/gallery", { useNewUrlParser: true }, (err, client) => {
    if(err) { return console.dir(err) }

    const db = client.db('gallery')
    db.collection('carts', (err, carts) => {
      if(err) {
        console.log(err)
      }
      carts.insertOne(newItem, (err, collection) => {
        if(err) {
          console.log(err)
          console.log("Failed to insert "+ newItem)
        }
      })
    })
  })
})

/*
 * Get all items associated with the cart id
 *
 */
app.get('/api/items/:cartId', ( req, res ) => {
  const cartId = req.params.cartId

  MongoClient.connect("mongodb://localhost:27017/gallery", { useNewUrlParser: true }, (err, client) => {
    if (err) {
      return console.dir(err)
    }

    const db = client.db('gallery')
    db.collection('carts', (err, carts) => {
      if (err) {
        console.log(err)
      }
      carts.find({}).toArray((err, docs) => {
        console.log("retrieved records:")
        console.log(docs)
        res.send(docs)
      })
    })
  })
})

app.get('/api/productSelections', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:'+clientPort)

  MongoClient.connect("mongodb://localhost:27017/gallery", {useNewUrlParser: true}, (err, client) => {
    if (err) {
      return console.dir(err)
    }

    const db = client.db('gallery')
    db.collection('selections', (err, products) => {
      if (err) {
        console.log(err)
      }
      products.find({}).toArray((err, docs) => {
        console.log("retrieved records:")
        console.log(docs)
        res.send(docs)
      })
    })
  })
})

app.get('/api/cacheProductTypes', products.cacheProductTypes)

app.get('/api/saveproductTypes',  products.saveProductTypes)

/*
 * Get product types with the given name
 */
app.get('/api/productTypes/:name', products.getProductTypesByName)

/*
 * Get product types
 */
app.get('/api/productTypes', products.getProductTypes)

/*
 * Get product with the given name
 */
app.get('/api/products/:name', products.getProductsByName)

/*
 * Get all product names
 */
app.get('/api/products', products.getProductGroups)

/*
 * Start up the server on port 3000
 */
app.listen(3000, () => {
  console.log('Gallery Web app service listening on port 3000!')
})

