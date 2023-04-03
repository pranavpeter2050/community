/* dependencies */
const express = require('express')

/* config - express */
const app = express()

/* api endpoint */
app.get('/', (request, response) => {
  response.send('Hello World!')
})

/* listen (port) */
app.listen(3000)
