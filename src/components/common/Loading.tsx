import { defineComponent } from 'vue'

export const Loading = defineComponent({
  name: 'Loading',
  setup() {
    return () => (
      <div class="progress-materializecss">
        <div class="indeterminate"></div>
      </div>
    )
  },
})
