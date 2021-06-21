import { useSeedMutation, useUsersListQuery } from '@/generated/graphql'
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

export const UsersView = defineComponent({
  name: 'UsersView',
  setup() {
    const pagination = reactive({
      offset: 0,
      limit: 20,
    })
    const users = useUsersListQuery(pagination)

    const seed = useSeedMutation()
    seed.onDone(() => users.refetch())

    const fetching = ref(false)

    const loadMore = () => {
      if (fetching.value || users.result.value?.usersCount <= users.result.value?.users.length) {
        return
      }
      fetching.value = true
      users.fetchMore({
        variables: {
          offset: users.result.value.users.length,
        },
      })
      fetching.value = false
    }

    const onScroll = () => {
      const scrollPosition = window.pageYOffset
      const windowSize = window.innerHeight
      const bodyHeight = document.body.offsetHeight
      const pixelsToBottom = bodyHeight - (scrollPosition + windowSize)
      if (pixelsToBottom < 200) {
        loadMore()
      }
    }

    onMounted(() => {
      document.addEventListener('wheel', onScroll)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('wheel', onScroll)
    })

    return () => (
      <div>
        <button onClick={() => seed.mutate()}>Seed!</button>
        <table class="border border-solid border-black">
          <thead>
            <tr>
              <th>
                <button onClick={() => users.refetch()}>refresh</button>
              </th>
            </tr>
            <tr>
              <th>Username:</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>
                Total:
                {users.result.value?.usersCount ?? 0}
                {users.result.value?.usersCount > users.result.value?.users.length ? (
                  <button onClick={loadMore}>Show more</button>
                ) : null}
              </th>
            </tr>
          </tfoot>
          <tbody>
            {users.result.value?.users.map(user => (
              <tr class="border border-solid border-black">
                <td>
                  <RouterLink to={`/users/${user.id}`}>{user.username}</RouterLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },
})
