<template>
  <q-page class="constrain q-pa-md">
    <q-card
      v-for="post in posts"
      :key="post.id"
      class="card-post q-mb-md" flat bordered
    >
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>ryan_reynolds</q-item-label>
          <q-item-label caption>
            {{ post.location }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-img :src="post.imageUrl"></q-img>

      <q-card-section>
        <div>{{ post.caption }}</div>
        <div class="text-caption text-grey">{{ post.date }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      posts: [
        {
          id: 1,
          caption: 'The Hills',
          date: 1680413522958,
          location: 'Manali, Uttrakhand',
          imageUrl: 'https://cdn.quasar.dev/img/mountains.jpg'
        },
        {
          id: 2,
          caption: 'Blinding Lights',
          date: 1780413522958,
          location: 'Noida, Uttar Pradesh',
          imageUrl: 'https://picsum.photos/200'
        },
        {
          id: 3,
          caption: 'Heartless',
          date: 1880413522958,
          location: 'Daft Punk, North Carolina',
          imageUrl: 'https://picsum.photos/300/200'
        },
        {
          id: 4,
          caption: 'Feel It Coming',
          date: 1980413522958,
          location: 'Berlin, Germany',
          imageUrl: 'https://random.imagecdn.app/300/200'
        },
      ],
    }
  }
})
</script>

<style lang="sass">
.card-post
  .q-img
    min-height: 200px
</style>
