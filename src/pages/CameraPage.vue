<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <img src="https://cdn.quasar.dev/img/mountains.jpg" class="full-width">
    </div>

    <div class="text-center q-pa-md">
      <q-btn round color="grey-10" icon="eva-camera" size="lg" />
    </div>

    <div class="row justify-center q-ma-md">
      <q-input
        v-model="caption"
        class="col col-sm-8"
        label="Caption"
        dense
      />
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        v-model="location"
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

export default defineComponent({
  name: 'CameraPage'
})
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
