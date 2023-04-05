/* dependencies */
const express = require('express')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
let busboy = require('busboy');

/* config - express */
const app = express()

/* config - firebase */
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

/* api endpoint - posts */
app.get('/posts', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*')

  let posts = []

  db.collection('posts').orderBy('date', 'desc').get().then(snapshot => {
    snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      posts.push(doc.data())
    });
    response.send(posts)
  })

})

/* api endpoint - createPost */
app.post('/createPost', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*')

  console.log('POST request');
  const busboyy = busboy({ headers: request.headers });

  let fields = {}

  busboyy.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    file.on('data', (data) => {
      console.log(`File [${name}] got ${data.length} bytes`);
    }).on('close', () => {
      console.log(`File [${name}] done`);
    });
  });

  busboyy.on('field', (name, val, info) => {
    // console.log(`Field [${name}]: value: %j`, val);
    fields[name] = val
  });

  busboyy.on('close', () => {
    // console.log('fields: ', fields)

    // Add a new document in collection "posts"
    db.collection('posts').doc(fields.id).set({
      id: fields.id,
      caption: fields.caption,
      location: fields.location,
      // date: fields.date, // if we direct send like this then the date will be saved as a "string" but we need to save it as an "integer"
      date: parseInt(fields.date),
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/community-9b01c.appspot.com/o/Slider_01.jpg?alt=media&token=67399992-8018-4ee8-81fc-6c6060a434bc'
    });

    // console.log('Done parsing form!');
    // response.end(); // response.data object will be empty, so instead use below line
    response.send("Done parsing form!")
  });

  request.pipe(busboyy);

})

/* listen (port) */
app.listen(3000)
