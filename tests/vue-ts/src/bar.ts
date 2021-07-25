import { defineComponent, h } from 'vue'

export const Bar = defineComponent({
  setup() {
    return () => h('span', 'test b')
  },
})
