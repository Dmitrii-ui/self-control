<template>
  <div>
    <TheHeader></TheHeader>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'

export default {
  components: {
    TheHeader
  },
  mounted() {
    this.$store.dispatch('auth/getUser')
  }
}
</script>