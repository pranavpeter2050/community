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

We are using the in-built Vue [Banner](https://quasar.dev/vue-components/banner) component to show a prompt to user to install our app on their (mobile) device.

Not all devices will support Homescreen-installationof our app. So before showing the *App Install Banner* we must check if the devicce supports (PWA) app installtion. Read this interesting [article](https://web.dev/customize-install/#promote-installation) on *How to provide your own in-app install experience*.

## PWA - Service Workers & Workbox

## PWA - Precaching

Build the App for Production & Switch to Live Backend. To build the PWA app for production, run `quasar build -m pwa`. To deploy the app in Firebase Hosting, run `firebase deploy`.
We have made a script to run the above commands, `npm run deploy`. See `package.json: line 10`.

## Note from Instructor:

**A Quicker Way to Go Online / Offline**

Since creating this course, I found a quicker way to go Online and Offline.

Instead of killing the backend server, then disabling the Wifi, we can just do this (**in Chrome Devtools**):

**Press Ctrl+Shift+P (Cmd+Shift+P on MacOS), type "offline" and hit enter.**

And then to go back online:

**Press Ctrl+Shift+P (Cmd+Shift+P on MacOS), type "online" and hit enter.**

We can also use this command palette to clear site data by typing "clear site" and hitting enter.

## PWA - Caching Strategies

[Workbox Caching Strategies](https://developer.chrome.com/docs/workbox/modules/workbox-strategies/)

### Stale while Revalidate Strategy

### Cache First Strategy (for Google Font)

The google-font will most certainly will not be cached as expected. To resolve this check this *github thread* [here](https://github.com/GoogleChrome/workbox/issues/1563#issuecomment-401880864).
We will also need to import the [workbox-expiration](https://developer.chrome.com/docs/workbox/modules/workbox-expiration/) and [workbox-cacheable-response](https://developer.chrome.com/docs/workbox/modules/workbox-cacheable-response/) for the below code to work.

```javascript
// Pass the object*{}* as seen below in respective code in custom-service-worker.js file
// import { ExpirationPlugin } from 'workbox-expiration';
// import {CacheableResponsePlugin} from 'workbox-cacheable-response';
// change workbox.expiration.Plugin to "ExpirationPlugin"
// change workbox.cacheableResponse.Plugin to "CacheableResponsePlugin"
// See CacheFirst() in custom-service-worker.js

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
    ],
  }),
);
```
## PWA - Background Sync

### Check for Background Sync Support

Not all browsers support Background Sync functionality. *Workbox* does provide a fallback method for such browsers. Check [here](https://caniuse.com/background-sync) for list of supported browsers.

To check if Client (browser) supports Background Sync follow through this thread on [Stackoverflow](https://stackoverflow.com/a/60958564).

### Create Post Background Sync

To enable background syncing of Post, first we'll need to create a [Queue](https://developer.chrome.com/docs/workbox/modules/workbox-background-sync/#creating-a-queue).

Then we have to listen for the [fetch](https://developer.chrome.com/docs/workbox/modules/workbox-background-sync/#adding-a-request-to-the-queue) event.

### Display the Offline Post (1) - Opening the IndexedDB database with IDB

Once we successfully create a post in background, we'll need to display this post offline in the Homepage. Javascript does have a build in IndexedDB API that will help us get the *post* data from IndexedDB BUT apparently it is "very clunky and not much fun to use". So we are using a **IDB library** to do this instead. See *IDB Library* in reference.

Run `npm install idb --save` to install *idb*.

```javascript
import { openDB, deleteDB, wrap, unwrap } from 'idb';

async function doDatabaseStuff() {
  const db = await openDB(…);
}

/* Instead of using "async-await" we are using "then-catch" */

```

### Disable the Workbox Logs

To disable the Workbox logs, just set `self.__WB_DISABLE_DEV_LOGS = true` in `custom-service-worker.js` near the top of the file. Huge thanks to Rolland Orgonas for providing the solution!

Example:

```javascript
/*
  dependencies
*/

  import {precacheAndRoute} from 'workbox-precaching'
  ...

/*
  config
*/

  // disable workbox logs
  self.__WB_DISABLE_DEV_LOGS = true

  precacheAndRoute(self.__WB_MANIFEST);

  let backgroundSyncSupported = 'sync' in self.registration ? true : false
  console.log('backgroundSyncSupported: ', backgroundSyncSupported)

```

### Show Offline Post was upload (1) - Add onSync Hook to Queue

[Observe queue operations when using background sync #2044](https://github.com/GoogleChrome/workbox/issues/2044#issuecomment-486390207)
An error occurs when we implement the `onSync` hook using example in the above link. This is solved with reference on the answer in below link. The `queue` is changed to an *object* i.e. `{queue}`.
[BackgroundSync - Unable to do anything in "onSync" (workbox 4.1.1.) #1982](https://github.com/GoogleChrome/workbox/issues/1982#issuecomment-475645712)
Now when `{queue}` is passed, we need to change the `this.` refernece to `queue.` for thefunction to work properly.
Related link: <https://developer.chrome.com/docs/workbox/reference/workbox-background-sync/#type-QueueOptions>

### Show Offline Post was upload (2) - Send Message to the Client (Browser)

[Stackoverflow - Service worker communicate to clients](https://stackoverflow.com/a/42162961)
The *event listener (which checks if the service-worker has emptied the queue / uploaded offline post)* is triggered twice (as can be seen in the console logs). To avoid this we need to keep the *Homepage* alive while the user navigates to Camerapage and creates a new post. To do this we need to add a `<keep-alive></keep-alive>` tag around the `<routerview />` component which is responsible for displaying our pages. By default, this will keep all the pages alive. Since, we only need the Homepage to be alive in the background, we need to specify that *<keep-alive> tag* like this, `<keep-alive :include="['HomePage']" > ... </keep-alive>` .See `MainLayout.vue: line 50`.

Since the Homepage is **alive** all the time, the `getPosts()` methods will not be triggered every this the user returns to the Homepage. To resolve this we use the `activated()` **vue hook** so that the `getPosts()` mmethod is triggered evertime a user visits the Homepage. See `HomePage.vue: line 171`.

## PWA - Push Notifications

### How Push Notifications Work - Push Notification Workflow

- Get Notification Permission
- Create a Push Subscription. Different browsers have their own "Push server".
- Store the Subscriptions in Database (in our case, Firebase)
  - Unique keys
  - Unique Push Server URL
- Backend to Loop through Subscriptions (we'll be using our node.js backend for this)
- Use our Service Worker (in our case, Workbox) to listen for Push Messages
- Display the Notification
- Listen to Notification Click
- Bring user back to our app if noticiation is clicked
- Protect our Push Notifications with Unique keys

#### Notifications vs. Push Notifications

##### Notifications

- Require User Permission
- Can be displayed anytime we like, but only when user is using our app
- Can be triggered  in our app's Javascript code
- Minimal Requirements: No need for subscriptions, backends or push notifications or service-workers

##### Push Notifications

- Require User Permission
- Sent to all of our subscribed users at once
- Displayed anytime, even if the user is not using the app
- Has complex requirement

### Create an "Enable Notifications" Banner (1) - Repurpose the App Install Banner

### Create an "Enable Notifications" Banner (2) - Improve the Style

### Request Notification Permission

If the user's browser supports "Push notifications", then there will be a "PushManager" object in "window" object. See `HomePage.vue: line 134`. Similarly, if we want to check for "Notifications" support, then we'll need to check for "Notification" object in the "window" object.

### Showing & Customizing Notifications from our app

Mozilla MDN documents have a list of options that can help customize our app Notifications. Click [here](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification) to read more.

### Displaying a Notification using the Service Worker

In `Homepage.vue: line 221` we are displaying a Notification using Javascript. We can also display Notifications using our Service Worker.

### Checking for Existing Push Subscriptions & Creating a New Subscription accordingly

On first attempting to create a new subsciption, we will encounter the follwing error in *Console*:

```console
Uncaught (in promise) DOMException: Registration failed - missing applicationServerKey, and gcm_sender_id not found in manifest     Homepage.vue:237
```

We will be sending our Push notifications from our backend server to the *browser Push notification servers*. Each *Push subscription* that we create will contain a unique *URL*. Without some kind of *security mechanism*, anyone who has access to this *URL* can send push-notifications to this URL and spam that user.
So we need to secure our Push subscriptions and make sure that Push notifications for our app can only be send from our backend server, i.e. we'll need a way to *authenticate* our backend server with the *browser push notidfication server*. We do this using two unique keys: Private and Public key. The public key in this case is the **applicationServerKey** seen in the error message in Console. We store this public key in our Javascript and send this key to our `pushManager.subscribe()` method. The Private key only lives on our Backend server.

### Secure the Push Subscription using Web Push

We can genereate these keys by using [web-push-library](https://github.com/web-push-libs/web-push#install). Since we'll also be using this library to send out Notifications in our Backend code, we need to install this into our backend project.

```node
C:\GitHub\community\backend> npm install web-push --save
```

We'll be using the terminal to generate our Public & Private Keys. In order to access the web-push-CLI, we need to add a script: `web-push` to our `backend/package.json` file. To generate vapid keys using web-push-CLI, run command `npm run web-push generate-vapid-keys`.

To use the above generated vapid keys, read the web-push docs [here](https://github.com/web-push-libs/web-push#using-vapid-key-for-applicationserverkey).

We are using the [qs-libeary](https://github.com/ljharb/qs#readme) to convert the Push-subscription JSON object object to a *query-string*. We shouldn't need to install this package cause it already installed in Quasar projects.

### A Note about Push Subscriptions & Service Workers

Each subscription that we store in the database, refers to a particular browser on a particular device. When we **Clear Site data (inluding "Unregister service worker" option)** on that browser, then the realted subscription data in the database will become **redundant** i.e. it will no longer refer to the particular browser on that device.

To avoid this, uncheck/disable the **Unregister service worker** option before clearing the site data. However, if we now make any changes to our `custom-service-worker.js` file, we won't be able to see any changes on the web browser. To force the browser to load the latest service-worker:

- Reload the page.
- Once it's finished loading, close the tab.
- Open the app in a new tab.

### Important - If using "Cloud functions".

FireBase free plans only allows "Google services". So if we use any other browser as our push notification server then we'll get an error. If we are on the Paid plan, we'll not get the error but will be charged a fare. So to avoid getting the error we check if our push notification server endpoint is a google/chrome service. See `index.js: line 131`.

"Since I'm not using **Cloud Functions** in this project, I'll remove the *check done above (index.js:131)*". See [video](https://www.udemy.com/course/pwa-with-vuejs-quasar-firebase/learn/lecture/21260322#overview) for more context.

### Listen for Push Notification in the Service Worker

When testing the Push Notification functionality as seen in this [video](https://www.udemy.com/course/pwa-with-vuejs-quasar-firebase/learn/lecture/21260346#overview), we seen that the `/createPost` request is being fired twice. To solve this folloe this github thread [here](https://github.com/GoogleChrome/workbox/issues/1480#issuecomment-579948965).

## Desktop Browsers - Testing & Fixing

Prod Firebase app URL: <https://community-9b01c.web.app>

### Firefox testing

If we try to access the above URL in Firefox, we are not ablew to see the appInstall prompt. If we visit the **Mozilla Mdn web docs** [here](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeinstallprompt_event#browser_compatibility), we can see that Firefox doesn't support the `beforeinstallprompt` event.

When a post was created in Chrome, apparently, the notification from Firefox was not shown. Check [here](https://caniuse.com/push-api). From there, we see that all three browsers, chrome, edge, firefox need to *Require full browser to be running to receive messages*.

Finally, if we try to create Post offline on Firefox, we find that it is not possible. Check [here](https://caniuse.com/background-sync) to confirm if Firefox supports `background-sync`.

### Firefox - Fixing Location issue that might be seen in Mac Systems

Even after granting the location acess in the Firefox browser, the user might see the Popup (dialog) saying *Could not fetch location*. This might be because the Location services is disable on their Mac systems.

To improve UX, we check if the user is on a Mac system and then customize the Popup message to let the user know why they are facing the location fetch issue. We be using **Quasar's Platfor Detection** feature to detect if the user is using a Mac system.

```javascript
if (this.$q.platform.is.mac) {
  errorMessage = 'Check if your Location Services is enabled in System Preferences'
}
```

### Safari - Testing

Push notifications are not supported in Safari. [Reference](https://caniuse.com/push-api).
Safari also doesn't dupport the `beforeinstallprompt` event.So no *Home screen Installation* for Safari.
`background-sync` is not supported by Safari, so *NO offline post creation*.

### Safaring - Fixing "New post not shown in Homepage sometimes" issue

This issue apparently happens due to Safari's **overly aggressive caching** for AJAX requests. To solve this, we reload the page after adding a little delay inside the `then()` block in `createPost` api axios call. See `CameraPage.vue: line 236`.

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
- Quasar uses Animate.css to help add Animations. See *Animate.css* in reference.

## Known Bugs

- The Dialog says post not created in camerapage even though offline post is working fine. (fixed `CameraPage.vue: line 95`).
- the `getPosts()` methos not working as desired inside `onActivated()` hook. So for time-being placed back inside the `created()` hook in HomePage.vue. `activated()` taught in this [video](https://www.udemy.com/course/pwa-with-vuejs-quasar-firebase/learn/lecture/21110176#overview).
- When the Notification was closed, the code did not console.log the messaged as expected. Refernce [video](https://www.udemy.com/course/pwa-with-vuejs-quasar-firebase/learn/lecture/21110238)
- The "app Install Banner" is not showing when visiting the Firebase Prod [app](https://community-9b01c.web.app).

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
- [Quasar Banner Component](https://quasar.dev/vue-components/banner#example--inline-actions)
- [Quasar Local Storage Plugin](https://quasar.dev/quasar-plugins/web-storage#installation)
- [Animations in Quasar](https://quasar.dev/options/animations)
- [Animate.css](https://animate.style/)
- [Workbox](https://developer.chrome.com/docs/workbox/)
- [IDB Library](https://github.com/jakearchibald/idb#readme)
- [web-push-library](https://github.com/web-push-libs/web-push#install)
- [qs-libeary](https://github.com/ljharb/qs#readme)
- [workbox-background-sync: duplicate POST requests #1480](https://github.com/GoogleChrome/workbox/issues/1480#issuecomment-579948965)
