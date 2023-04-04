/* dependencies */
const express = require('express')

/* config - express */
const app = express()

/* api endpoint */
app.get('/', (request, response) => {
  response.send('You\'re fine!')
  console.log("server is working")
})

/* listen (port) */
app.listen(3000)
