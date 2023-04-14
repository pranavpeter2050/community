<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!loadingPosts && posts.length">
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
        </template>
        <template v-else-if="!loadingPosts && !posts.length">
          <h5 class="text-center text-grey">No posts yet.</h5>
        </template>
        <template v-else>
          <q-card flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
            </q-card-section>
          </q-card>
        </template>
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
import { openDB } from 'idb'

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      posts: [],
      loadingPosts: false
    }
  },
  methods: {
    niceDate(timeStamp) {
      return date.formatDate(timeStamp, 'MMMM D, h:mmA')
    },
    getPosts() {
      this.loadingPosts = true
      this.$axios.get(`${ process.env.API }/posts`).then(response => {
        this.posts = response.data
        this.loadingPosts = false
        if (!navigator.onLine) {
          this.getOfflinePosts()
        }
      }).catch(error => {
        this.$q.dialog({
          title: 'Error',
          message: 'Could not fetch posts.'
        })
        this.loadingPosts = false
      })
    },
    getOfflinePosts() {
      let db = openDB('workbox-background-sync').then(db => {
        db.getAll('requests').then(failedRequests => {
          // console.log("failedfailedRequests: ", failedRequests)
          failedRequests.forEach(failedRequest => {
            if (failedRequest.queueName == "createPostQueue") {
              // create a Javaescript-request-object to save the requestData from failedRequest object
              let request = new Request(failedRequest.requestData.url, failedRequest.requestData)
              request.formData().then(formData => {
                let offlinePost = {}
                offlinePost.id = formData.get('id')
                offlinePost.caption = formData.get('caption')
                offlinePost.location = formData.get('location')
                offlinePost.date = parseInt(formData.get('date'))
                offlinePost.offline = true

                // now we need to get the image in base64-url-encoded form
                // we can do this "FileReader"
                let reader = new FileReader()
                reader.readAsDataURL(formData.get('file'))
                reader.onloadend = () => {
                  offlinePost.imageUrl = reader.result
                  // we use "unshift()" so that the Post will be shown on top in the Homepage
                  this.posts.unshift(offlinePost)
                }
              })
            }
          })
        }).catch(err => {
          console.log("Error accessing IndexedDB: ", err)
        })
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
