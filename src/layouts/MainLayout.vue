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

    <q-footer class="bg-white small-screen-only" bordered>
      <q-banner inline-actions class="bg-primary text-white" dense>
        <template v-slot:avatar>
          <q-avatar color="white" text-color="grey-10" icon="eva-camera-outline" font-size="22px" />
        </template>

        <b>Install Commmunity?</b>

        <template v-slot:action>
          <q-btn flat label="Yes" class="q-px-sm" dense />
          <q-btn flat label="Later" class="q-px-sm" dense />
          <q-btn flat label="Never" class="q-px-sm" dense />
        </template>
      </q-banner>
      <q-tabs class="text-grey-10" active-color="primary" indicator-color="transparent"
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
export default {
  name: 'MainLayout',

  data () {
    return {

    }
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
