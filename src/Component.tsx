import { defineComponent } from 'vue'
import { useUsersQuery } from './generated/graphql'

export const Component = defineComponent({
  setup() {
    const data = useUsersQuery()

    return () => <h1>Hello from TSX Loading: {String(data.loading.value)} </h1>
  },
})
