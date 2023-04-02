<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
        autoplay
        class="full-width"
        playsinline
        ref="video"
      />
    </div>

    <div class="text-center q-pa-md">
      <q-btn round color="grey-10" icon="eva-camera" size="lg" />
    </div>

    <div class="row justify-center q-ma-md">
      <q-input
        v-model="post.caption"
        class="col col-sm-8"
        label="Caption"
        dense
      />
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        v-model="post.location"
        class="col col-sm-8"
        label="Location"
        dense
      >
        <template v-slot:append>
          <q-btn round dense flat icon="eva-navigation-2-outline" />
        </template>
      </q-input>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn unelevated rounded color="primary" label="Post Image" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { uid } from 'quasar'

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
      }
    }
  },
  methods: {
    initCamera(){
      // "getUserMedia()" method allows us to access the user's camera. This method takes an "object" an parameter.
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.$refs.video.srcObject = stream
      })
    }
  },
  // used "mounted()" hook to initialize the camera everytime a user hits CameraPage.
  mounted() {
    this.initCamera()
  }
})
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
