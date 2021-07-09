import { defineComponent, provide } from 'vue'
import '@/assets/tailwind.css'
import '@/assets/main.css'

import { MainLayout } from '@/layout/Main'
import { MeKey } from '@/store/auth'
import { useMeQuery } from '@/generated/graphql'

export const App = defineComponent({
  name: 'App',
  setup() {
    const me = useMeQuery()

    provide(MeKey, me)

    return () => <MainLayout />
  },
})
