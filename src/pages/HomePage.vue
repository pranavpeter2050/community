<template>
  <q-page class="constrain q-pa-md">
    <q-card class="card-post" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>ryan_reynolds</q-item-label>
          <q-item-label caption>
            Vancity, Canada
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-img src="https://cdn.quasar.dev/img/mountains.jpg"></q-img>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage'
})
</script>

<style lang="sass">
.card-post
  .q-img
    min-height: 200px
</style>
