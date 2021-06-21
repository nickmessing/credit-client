import { useMeQuery } from '@/generated/graphql'
import { authorize, state } from '@/store/auth'
import { defineComponent, watch } from 'vue'
import { RouterView, RouterLink } from 'vue-router'

export const MainLayout = defineComponent({
  name: 'MainLayout',
  setup() {
    const me = useMeQuery()

    watch(
      () => state.token,
      () => me.refetch(),
    )

    return () => (
      <div>
        <pre>Authenticated as: {String(me.result.value?.me?.username)}</pre>
        <button onClick={() => authorize(null)}>Logout</button>
        <ul class="list-disc pl-10">
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/login">Login</RouterLink>
          </li>
          <li>
            <RouterLink to="/users">Users</RouterLink>
          </li>
        </ul>
        <RouterView />
      </div>
    )
  },
})
