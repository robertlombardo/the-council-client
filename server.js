const express = require('express')
const path    = require('path')

const app = express()

// access to build directory (where the javascript bundle lives)
app.use('/build', express.static(path.join(__dirname, 'build')))
app.use('/static', express.static(path.join(__dirname, 'build/static')))
app.use('/assets', express.static(path.join(__dirname, 'build/assets')))
 
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'build/index.html'));
})
 
const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log(`\nThe Commons - client server is listening on port: ${PORT}`)
