<template>
  <div>
    <span class="test">testa {{ data.data }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const data = reactive({ foo: 'bar' })
    return {
      data,
    }
  },
})
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
