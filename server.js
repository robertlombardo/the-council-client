const express = require('express')
const path    = require('path')

const app = express()

// access to build directory (where the javascript bundle lives)
app.use('/build', express.static(path.join(__dirname, 'build')))
app.use('/static', express.static(path.join(__dirname, 'build/static')))
 
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'build/index.html'));
})
 
app.listen(3000)
console.log('\nServer is listening on port 3000!')
