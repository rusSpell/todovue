<template>
  <div class="my-3">
    <div class="notification" v-if="errored">
      {{ textError }}
    </div>
    <div class="notification" v-if="success">
      {{ textSuccess }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    errored: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    textError: {
      type: String,
      default: "Ошибка сервера! Попробуйте позже.",
    },
    textSuccess: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.notification {
  max-width: 315px !important;
}
</style>