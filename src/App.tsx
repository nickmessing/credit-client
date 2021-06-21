import { defineComponent, provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './apollo'
import '@/assets/tailwind.css'

import { MainLayout } from './layout/Main'

export const App = defineComponent({
  name: 'App',
  setup() {
    provide(DefaultApolloClient, apolloClient)

    return () => <MainLayout />
  },
})
