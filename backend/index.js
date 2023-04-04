/* dependencies */
const express = require('express')

/* config - express */
const app = express()

/* api endpoint - posts */
app.get('/posts', (request, response) => {
  let posts = [
    {
      caption: "Golden Gate Bridge",
      location: "San Francisco"
    },
    {
      caption: "Big Ben Tower",
      location: "London"
    }
  ]
  response.send(posts)
})

/* listen (port) */
app.listen(3000)
