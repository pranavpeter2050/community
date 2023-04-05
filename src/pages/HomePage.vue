<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
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
            <div class="text-caption text-grey">{{ niceDate(post.date) }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-4 large-screen-only">
        <q-item class="fixed">
            <q-item-section avatar>
              <q-avatar size="48px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>ryan_reynolds</q-item-label>
              <q-item-label caption>
                Ryan Reynolds
              </q-item-label>
            </q-item-section>
          </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    niceDate(timeStamp) {
      return date.formatDate(timeStamp, 'MMMM D, h:mmA')
    },
    getPosts() {
      this.$axios.get("http://localhost:3000/posts").then(response => {
        this.posts = response.data
      }).catch(error => {
        console.log("error: ", error)
      })
    }
  },
  created() {
    this.getPosts()
  }
})
</script>

<style lang="sass">
.card-post
  .q-img
    min-height: 200px
</style>
