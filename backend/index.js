/* dependencies */
const express = require('express')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
let busboy = require('busboy');
let path = require('path');
let os = require('os');
let fs = require('fs');
let UUID = require('uuid-v4');

/* config - express */
const app = express()

/* config - firebase */
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'community-9b01c.appspot.com'
});

const db = getFirestore();
const bucket = getStorage().bucket();

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

  let uuid = UUID()

  console.log('POST request');
  const busboyy = busboy({ headers: request.headers });

  let fields = {}
  let fileData = {}

  busboyy.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );

    let filepath = path.join(os.tmpdir(), filename)
    file.pipe(fs.createWriteStream(filepath))
    fileData = { filepath, mimeType }
  });

  busboyy.on('field', (name, val, info) => {
    // console.log(`Field [${name}]: value: %j`, val);
    fields[name] = val
  });

  busboyy.on('close', () => {
    // console.log('fields: ', fields)

    bucket.upload(
      fileData.filepath,
      {
        uploadType: 'media',
        metadata: {
          metadata: {
            contentType: fileData.mimeType,
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (error, uploadedFile) => {
        if (!error) {
          createDocument(uploadedFile)
        }
      }
    )

    function createDocument(uploadedFile) {

      // Add a new document in collection "posts"
      db.collection('posts').doc(fields.id).set({
        id: fields.id,
        caption: fields.caption,
        location: fields.location,
        date: parseInt(fields.date),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${ bucket.name }/o/${ uploadedFile.name }?alt=media&token=${ uuid }`
      }).then(() => {
        response.send("post id: " + fields.id)
      })
    }
    // console.log('Done parsing form!');
    // response.end(); // response.data object will be empty, so instead use below line
    // response.send("Done parsing form!")
  });

  request.pipe(busboyy);

})

/* api endpoint - createSubscription */
app.post('/createSubscription', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  console.log("request: ", request)
})

/* listen (port) */
app.listen(3000)
