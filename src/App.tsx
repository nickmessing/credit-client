import { defineComponent, provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './apollo'
import '@/assets/tailwind.css'

import { Component } from './Component'

export const App = defineComponent({
  setup() {
    provide(DefaultApolloClient, apolloClient)

    return () => (
      <div>
        Parent
        <Component />
      </div>
    )
  },
})
