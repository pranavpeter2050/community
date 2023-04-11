# Community

An Instagram clone using Quasar framework.

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## Roadmap

### Initializing the Quasar project
```bash
npm init quasar
```

### Folder and Files Structure

- The main folder we are concerned with is the `src` folder. This contains an `App.vue` file.
- `App.vue` is the **main** Vue component. Within this `<router-view />` directs points us to the `layouts` folder.
- The `MainLayout.vue` is the base layout of our app (generated by default). Within **layouts** we load **pages**.
- The `<q-page-container>` within MainLayout.vue specifies the location where our pages will be loaded.
- `assets` folder contains any images etc. *Anything we put in this folder will be processed by **Webpack**. This means that images might get converted to **base64** and stuff like that*
- `boot` folder is used to store the boot files. **Boot** file allows us to initialize code before the app starts. This is really good for initializing *plugins* and stuff like that.
- `components` folder to keep any Vue components.
- `css/quasar.variables.sass` has some CSS variables defined which we can change to customise our app.
- `router` folder, where qwqe configure the routes of our app.
- `postcss.config.js` is used to add assets. Assets added here will not be processed by webpack (cross-check to ensure this point).
- [Using **Vue dev tools**](https://youtu.be/9tyFBchdb00?list=PLAiDzIdBfy8h6HgfQg3namagsCUT0Y2Bs&t=559)

## Changed the <script></script> tag in MainLayout.vue
original lines
```javascript
export default defineComponent({
  name: 'MainLayout',
  components: {
    ...
  },
  setup () {
    const leftDrawerOpen = ref(false)
    return {

      ...

    }
  }
})
```

New lines
```javascript
export default {
  name: 'MainLayout',
  data () {
    return {
    }
  }
}
```

## Formating how the "Date" is displayed in Quasar

Quasar has in-built utility to help with the same. Click [here](https://quasar.dev/quasar-utils/date-utils#introduction) for more info.

## [Classes “q-col-gutter-{size}”](https://quasar.dev/layout/grid/gutter#classes-q-col-gutter-size)

These classes are to be used when the direct children have col-* or offset-* classes that specify a width.

## [CSS Positioning Classes](https://quasar.dev/style/positioning#introduction)

## [Layout/Grid/Row/Responsive Classes](https://quasar.dev/layout/grid/row#responsive-classes)

## [Other CSS Helper Classes/Size Related](https://quasar.dev/style/other-helper-classes#size-related)

## [Using Sass/SCSS Variables](https://quasar.dev/style/color-palette#using-sass-scss-variables)

## Generating "Unique Id" for object inside data() function

Quasar has in built Utility to generate Id. See [here](https://quasar.dev/quasar-utils/other-utils#uid-generate-uid).

## Accessing Camera maybe not supported in every browser
Check the Mozilla docs for **Browser Compactibility** [here](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#browser_compatibility). Some older versions of different browsers use different function name for `getUserMedia`. To help solve this issue, we use a npm package `md-gum-polyfill`.

```bash
// md-gum-polyfill => mediaDevices-getUserMedia-polyfill
npm install --save md-gum-polyfill
```
See [here](https://github.com/mozdevs/mediaDevices-getUserMedia-polyfill#readme) to see usage of `md-gum-polyfill`.

## Fallback for when user "denies" camera access etc.

- In this case, we have implemented a file-picker `<q-file>` and saved the selected file inside `imageUpload` data variable.
- Now we need to show a thumbnail inside the camera-frame for the selected image by creating a *blob*.
- To show a thumbanail of the image file selected by user, check the *Upload Image to Canvas* in Reference section.

## Setting up Backend using Node.js and Express.js
`nodejs` and `express` backend is built to upload to image to Firebase Storage.
#### Steps:
1. Create new folder, say `backend`. Open a terminal inside this folder and run `npm init`. (*npm init* will initialize the *backend folder* as a **npm package** and create a *package.json* file to manage dependencies). Leave all prompts as default by pressing enter-key.
  - We can add/create/define custom *scripts* to help run hard-to-remember commands.
2. Create `index.js` file inside `backend` folder. This will be used to store all of our backend code.
3. We are using `express` as backend or to built our backend. Express is very handy for creating APIs. Install Express by running `npm install express --save`.
4. Run the app with the following command: `node app.js` (Replace the *app.js* name with the name of the respective file, in our case *index.js*).
5. We will have to stop the express-server and start it again every time we make changes in the `index.js` file. To solve this we use **nodemon** npm package. To install nodemon, run `npm install -g nodemon`. Read related docs [here](https://github.com/remy/nodemon#nodemon).
6. To start the express-server using nodemon, run `nodemon index.js`. To avoid writing the command, we define a script in `package.json` file, called `start`. See `package.json: line 7`. We can now start the express-server by running `npm start` instead of `nodemon index.js`.

## Deploying the Backend service / Hosting our backend for free

There are various places where we can host our backend for free such as *IBM Cloud, Hope node, Netlify* etc. We are using Heroku for this project because with Heoku we can deploy this server with just a terminal command without having to setup any git repository. This will help us keep the project as simple as possible.

Note:
Heroku is now a paid service. For the time being, we are using **ngrok** to expose the *local express-server* to the internet.

## Connecting Backend to Firebase DB

Follow the [Firebase Docs](https://firebase.google.com/docs/firestore/quickstart?hl=en&authuser=1#node.js) on *Set up your development environment* to add the required dependencies etc. to our app.

```bash
// Run below command to install Firebase Admin SDK when using node.js.
// Note: The teminal should be opened inside the "backend" folder in our case.
npm install firebase-admin --save
```

## Changed the default [Read Data](https://firebase.google.com/docs/firestore/quickstart?hl=en&authuser=1#node.js_4) method (node.js)
original lines
```bash
const snapshot = await db.collection('users').get();
snapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
});
```

New lines
```bash
db.collection('posts').get().then(snapshot => {
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
})
```
## Fetching data from backend to frontend

When trying to get posts from backend API, we see an error in the Browser-console:

```console
Access to XMLHttpRequest at 'http://localhost:3000/posts' from origin 'http://localhost:9000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

This basically means that our app (frontend) doesn't have permission to access the backend API endpoint. In other words, our API endpoint **can't** recieve cross-origin requests (i.e requests from other servers).

We can handle this by setting the `Access-Control-Allow-Origin` header to allow requests from any origin by using the "**response**" object that we have in our endpoint. See `backend\index.js: line 20`.

#### [Sorting data](https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=en&authuser=1) when fetching from Firebase DB

By default, a query retrieves all documents that satisfy the query in ascending order by document ID. You can specify the sort order for your data using orderBy(), and you can limit the number of documents retrieved using limit().

```bash
// query for the first 3 cities alphabetically with:
const firstThreeRes = await citiesRef.orderBy('name').limit(3).get();index.js

// sort in descending order to get the last 3 cities:
const lastThreeRes = await citiesRef.orderBy('name', 'desc').limit(3).get();index.js

// order by multiple fields. For example, if you wanted to order by state, and within each state order by population in descending order:
const byStateByPopRes = await citiesRef.orderBy('state').orderBy('population', 'desc').get();index.js

// combine where() filters with orderBy() and limit(). In the following example, the queries define a population threshold, sort by population in ascending order, and return only the first few results that exceed the threshold:
const biggestRes = await citiesRef.where('population', '>', 2500000)
  .orderBy('population').limit(2).get();index.js
```

However, if you have a filter with a range comparison (<, <=, >, >=), your first ordering must be on the same field, see the list of orderBy() limitations [here](https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=en&authuser=1#limitations).

# Finishing up - [Last video](https://www.youtube.com/watch?v=Tnz2K_tX_qo)

1. Making "create post" endpoint which will be used by our CameraPage to create a new post
2. Setting up an **env variable** to switch between our production API and local API. See *Handling process.env* in Reference.
3. Setting up "create post" endpoint with **busboy** library. See *busboy* in Reference section.
4. Add some form validations; like disabling the camera-button once an image has been captured. Add some error handling, loadingState when creating/submittung new post.
5. Deploy our app to Firebase hosting. Backend was supposed to be deployed in Heroku.. but since it is not a paid service now. We try and see if we can use **ngrok** to expose our *local backend* to the internet.

Installing **Busboy**. For explaination on working of Busboy, see this [video](https://youtu.be/Tnz2K_tX_qo?t=1089).
```bash
// we add "--save" to save the npm package (busboy in this case) as a dependency
npm install busboy --save
```

Adding data to collection in Firebase DB: See [here](https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en&authuser=1#set_a_document).

## PWA - Setup and Manifest file

Read more about **manifest** file and it's available properties [here](https://developer.mozilla.org/en-US/docs/Web/Manifest).

## PWA - Icons for All Devices

We are using **Icon Genie** (option given by Quasar) to generate all the different size icons we need from a single source image. Install Icon Genie CLI by running: `npm install -g @quasar/icongenie`. Read more [here](https://quasar.dev/icongenie/introduction).

For best results, use source image with dimensions as specified in docs [here](https://quasar.dev/icongenie/installation#input-files). We can make an draft Vector Icon using [Sketch](https://www.sketch.com/).

To generate icons using Icon Genie, read docs [here](https://quasar.dev/icongenie/command-list). Run the foolwing command to generate icon with respect to the source image *app-icon.png*: `icongenie generate -i app-icon.png --skip-trim --theme-color 212121`. This command is a little difficult to remmember, so we will create an *npm script* for the same. See `package.json: line 9`. After creating
the script, run `npm run icons` to generate the icons.

## PWA - Home Screen Installation (Prompt)

## Interesting

- `toDataURL()` is used to convert to image to base64 string. See `CameraPage: line 88`.
- `blob` Binary log object. We use this to create image from a base64 string/URL. See `CameraPage: line 90`. Check *Converting Data URI to Blob* in Reference section.
- We use **Arrow functions** so that we can still use our *Vue* instance with the **"this"** keyword. See `CameraPage: line 107, 121`.
- `getVideoTracks()` returns all of the tracks used by this "video" element. See `CameraPage: line 125`.
- `beforeDestroy()` hook is triggered just before we leave a page. Hence this is used to *disable" camera when user leaves the camera page. See `CameraPage: line 159`.
- We can get the user's location (Latitude & Longitude) using the `geolocation API`. See `CameraPage: line 155`.
- We pass the latitude &longitude we got from above into a `geocode API` to get user's city/country etc. See `CameraPage: line 155`. Check *Geocode.xyz* in Reference section.
- Quasar has a in-built plugin to help show *Dialogs* to the user. Read more [here](https://quasar.dev/quasar-plugins/dialog)
- Quasar has a in-built plugin to help show *Loading state (i.e a component is loading)* to the user. Read more [here](https://quasar.dev/quasar-plugins/loading)
- To add *loading state* for input field, check [here](https://quasar.dev/vue-components/input#loading-state)
- We can check if the user's browser supports `geolocation` with help of the `navigator` object. See `CameraPage: line 84`.
- `computed` object to written below `data()` and above `methods` object. What is the use-case of *computed*?
- the `getPosts()` method is triggered using the `created()` vue-hook. See `HomePage: line 116`.
- In order to access the *formData, fields, files* etc. on the backend we use an npm package called **busboy**.


## Reference

- [Create an Instagram Clone with Vue JS, Quasar & Firebase - in 4 HOURS! (1/6)](https://www.youtube.com/watch?v=9tyFBchdb00&list=PLAiDzIdBfy8h6HgfQg3namagsCUT0Y2Bs)
- [Eva icons](https://akveo.github.io/eva-icons/#/)
- [Using Eva icons](https://quasar.dev/vue-components/icon#webfont-usage)
- [Google Fonts](https://fonts.google.com/)
- [Grand Hotel - Google Font](https://fonts.google.com/share?selection.family=Grand+Hotel)
- [Lorem Picsum](https://picsum.photos/)
- [Random Image API](https://random.responsiveimages.io/)
- [Pexels API - Documentation](https://www.pexels.com/api/documentation/#photos-overview)
- [Classes “q-col-gutter-{size}”](https://quasar.dev/layout/grid/gutter#classes-q-col-gutter-size)
- [Quasar - Other CSS Helper Classes](https://quasar.dev/style/other-helper-classes)
- [Quasar - Color Palette](https://quasar.dev/style/color-palette)
- [Quasar Utils/ Other Utils](https://quasar.dev/quasar-utils/other-utils)
- [What Does `playsinline` Mean in Web Video?](https://css-tricks.com/what-does-playsinline-mean-in-web-video/)
- [MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- [md-gum-polyfill - npm package](https://www.npmjs.com/package/md-gum-polyfill)
- [Converting Data URI to Blob](https://stackoverflow.com/questions/12168909/blob-from-dataurl)
- [Upload Image to Canvas](https://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas)
- [Geocode.xyz](https://geocode.xyz/api)
- [Geocode/cred](pranavgotb@gmail.com/password1234)
- [Setting up Firebase: Firestore, Storage](https://www.youtube.com/watch?v=bOMVP7EdIGs)
- [Express JS](https://expressjs.com/)
- [Nodemon](https://nodemon.io/)
- [Setting up Heroku to host *Backend* - Youtube](https://youtu.be/bOMVP7EdIGs?t=1226)
- [Genereating Service Account Key](https://youtu.be/G6SoMOBDm0A?t=190)
- [Skeleton Quasar/Vue component](https://quasar.dev/vue-components/skeleton#qskeleton-api)
- [Handling process.env](https://quasar.dev/quasar-cli-vite/handling-process-env#adding-to-process-env)
- [Busboy github](https://github.com/mscdex/busboy)
- [Quasar Notify Plugin](https://quasar.dev/quasar-plugins/notify)
- [Quasar Loading Plugin](https://quasar.dev/quasar-plugins/loading)
- [Deploying with Firebase Hosting](https://firebase.google.com/docs/hosting/quickstart?hl=en&authuser=1)
- [Sketch - online Vector Graphics editor](https://www.sketch.com/)
