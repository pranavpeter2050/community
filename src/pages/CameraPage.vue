<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
        v-show="!imageCaptured"
        autoplay
        class="full-width"
        playsinline
        ref="video"
      />
      <canvas
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="240"
      />
    </div>

    <div class="text-center q-pa-md">
      <q-btn v-if="hasCameraAccess" round color="grey-10" icon="eva-camera" size="lg" @click="captureImage" :disable="imageCaptured" />

      <q-file v-else outlined v-model="imageUpload" label="Choose an image" accept="image/*" @input="captureImageFallback">
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
    </div>

    <div class="row justify-center q-ma-md">
      <q-input
        v-model="post.caption"
        class="col col-sm-8"
        label="Caption*"
        dense
      />
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        :loading="locationLoading"
        v-model="post.location"
        class="col col-sm-8"
        label="Location"
        dense
      >
        <template v-slot:append>
          <q-btn v-if="!locationLoading && locationSupported"
            round dense flat
            icon="eva-navigation-2-outline"
            @click="getLocation"/>
        </template>
      </q-input>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn unelevated rounded color="primary" label="Post Image" @click="addPost()" :disable="!post.caption || !post.photo" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { uid } from 'quasar'
// require('md-gum-polyfill') // this is not the correct why to use in quasar/vue
import 'md-gum-polyfill';

export default defineComponent({
  name: 'CameraPage',
  data() {
    return {
      post: {
        id: uid(),
        caption: "",
        location: "",
        photo: null,
        date: Date.now()
      },
      imageCaptured: false,
      imageUpload: [], // <q-file> must have model-value in {{ File | FileList | Array | null | undefined }}  - required!
      hasCameraAccess: true,
      locationLoading: false
    }
  },
  computed: {
    locationSupported() {
      if ('geolocation' in navigator) {
        return true
      } else {
        return false
      }
    },
    backgorundSyncSupported() {
      // first, check if user's browser supports "service-workers"
      // if yes, then there will be a "serviceWorker" object in the "navigator" object
      // and if the browser supports background sync
      // then there will be a "syncManager" object in "window" object
      if ('serviceWorker' in navigator && 'SyncManager' in window) return true
      return false
    }
  },
  methods: {
    initCamera(){
      // "getUserMedia()" method allows us to access the user's camera. This method takes an "object" an parameter.
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.$refs.video.srcObject = stream
      }).catch(error => {
        this.hasCameraAccess = false
      })
    },
    captureImage() {
      let video = this.$refs.video
      let canvas = this.$refs.canvas
      canvas.width = video.getBoundingClientRect().width
      canvas.height = video.getBoundingClientRect().height

      let context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      this.imageCaptured = true
      // toDataURL() is used to convert to image to base64 string
      this.post.photo = this.dataURItoBlob(canvas.toDataURL())
      this.disableCamera()
    },
    captureImageFallback(file) {
      // console.log('file: ', file) // not working as seen in video
      // console.log('file: ', file.target.files[0])
      this.post.photo = file.target.files[0]
      let canvas = this.$refs.canvas
      let context = canvas.getContext('2d')

      var reader = new FileReader();
      // we use "Arrow functions" below so that we can still use our Vue instance with the "this" keyword
      reader.onload = event => {
        var img = new Image()
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          // image is draw into the canvas below
          context.drawImage(img,0,0)
          // un-hide the canvas in DOM
          this.imageCaptured = true
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file.target.files[0])
    },
    disableCamera() {
      // getVideoTracks() returns all of the tracks used by this "video" element
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop()
      })
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      var ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], {type: mimeString});
      return blob;

    },
    getLocation() {
      this.locationLoading = true
      navigator.geolocation.getCurrentPosition(position => {
        // console.log("position: ", position)
        this.getCityAndCountry(position)
      }, error => {
        // console.log("error: ", error)
        this.locationError()
      }, { timeout: 7000 })
    },
    getCityAndCountry(position) {
      let apiKey = "24152333254667263678x92974"
      let apiUrl = `https://geocode.xyz/${ position.coords.latitude },${ position.coords.longitude }?json=1&auth=${ apiKey }`

      this.$axios.get(apiUrl).then(result => {
        // console.log("result: ", result)
        this.locationSuccess(result)
      }).catch(error => {
        // console.log("error: ", error)
        this.locationError()
      })
    },
    locationSuccess(result) {
      this.post.location = result.data.city
      if (result.data.country) {
        this.post.location += `, ${ result.data.country }`
      }
      this.locationLoading = false
    },
    locationError() {
      let locationErrorMessage = 'Could not fetch your location.'
      if (this.$q.platform.is.mac) {
        locationErrorMessage += 'You might be able to fix this in System Preferences > Security & Privacy > Location Services'
      }

      this.$q.dialog({
        title: 'Error',
        message: locationErrorMessage
      })
      this.locationLoading = false
    },
    addPost() {
      this.$q.loading.show()
      let formData = new FormData()
      formData.append('id', this.post.id)
      formData.append('caption', this.post.caption)
      formData.append('location', this.post.location)
      formData.append('date', this.post.date)
      formData.append('file', this.post.photo, this.post.id + '.png')

      this.$axios.post(`${ process.env.API }/createPost`, formData).then(response => {
        console.log("response: ", response)
        this.$router.push('/')
        this.$q.notify({
          message: 'Post created!',
          actions: [
            { label: 'Dismiss', color: 'white' }
          ]
        })
        this.$q.loading.hide()
      }).catch(error => {
        console.log("error: ", error)
        // check if user is offline using "navigator.onLine"
        if (!navigator.onLine && this.backgorundSyncSupported) {
          // redirect to Homepage
          this.$q.notify('Post created offline!')
          this.$router.push('/')
        }
        else {
          this.$q.dialog({
            title: 'Error',
            message: 'Sorry, could not create post!'
          })
        }
        this.$q.loading.hide()
      })
    }
  },
  // used "mounted()" hook to initialize the camera everytime a user hits CameraPage.
  mounted() {
    this.initCamera()
  },
  // beforeDestroy() { // deprecated, use below hook instead
  beforeUnmount() {
    if (this.hasCameraAccess) {
      this.disableCamera()
    }
  }
})
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
