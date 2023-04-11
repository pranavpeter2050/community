<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="constrain">
        <q-btn flat round icon="eva-camera-outline" size="18px" dense to="/camera" class="header-nav-icon large-screen-only q-mr-sm"/>

        <q-separator vertical spaced class="large-screen-only" />

        <q-toolbar-title class="text-grand-hotel text-bold">
          Community
        </q-toolbar-title>
        <q-btn flat round icon="eva-home-outline" size="18px" dense to="/" class="header-nav-icon large-screen-only"/>

      </q-toolbar>
    </q-header>

    <q-footer class="bg-white" bordered>
      <div v-if="showAppInstallBanner" class="banner-container bg-primary">
        <div class="constrain">
          <q-banner inline-actions class="bg-primary text-white" dense>
            <template v-slot:avatar>
              <q-avatar color="white" text-color="grey-10" icon="eva-camera-outline" font-size="22px" />
            </template>

            <b>Install Commmunity?</b>

            <template v-slot:action>
              <q-btn flat label="Yes" class="q-px-sm" dense @click="installApp"/>
              <q-btn flat label="Later" class="q-px-sm" dense />
              <q-btn flat label="Never" class="q-px-sm" dense />
            </template>
          </q-banner>
        </div>
      </div>

      <q-tabs class="text-grey-10 small-screen-only" active-color="primary" indicator-color="transparent"
      >
        <q-route-tab to="/" icon="eva-home-outline" />
        <q-route-tab to="/camera" icon="eva-camera-outline" />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

export default {
  name: 'MainLayout',

  data () {
    return {
      showAppInstallBanner: false
    }
  },
  methods: {
    installApp() {
      // Hide the app provided install promotion
      this.showAppInstallBanner = false;
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismessed the install prompt");
        }
      });

    }
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      this.showAppInstallBanner = true;
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });
  }
}
</script>

<style lang="sass">
.header-nav-icon
  .q-icon
    margin-top: 6px

.q-toolbar
  @media (min-width: $breakpoint-sm-min)
    height: 77px

.q-toolbar__title
  font-size: 32px
  @media (max-width: $breakpoint-xs-max)
    text-align: center

.q-footer
  .q-tab__icon
    font-size: 30px
</style>
