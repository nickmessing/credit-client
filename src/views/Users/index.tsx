import { Pagination, Search, useUsersListQuery } from '@/generated/graphql'
import { defineComponent, ref } from 'vue'
import { Table } from '@/components'
import { debounce } from 'lodash'
import { readableRole } from '@/utils/strings'

export const UsersView = defineComponent({
  name: 'UsersView',
  setup() {
    type User = typeof users['result']['value']['users'][0]
    const UsersTable = Table<User>()
    const pagination = ref<Pagination>({
      offset: 0,
      limit: 10,
      orderBy: 'firstName',
      orderDesc: false,
    })
    const search = ref<Search>({
      field: null,
      needle: '',
    })

    const passedSearch = ref<Search>({
      field: null,
      needle: '',
    })

    const users = useUsersListQuery(() => ({
      pagination: pagination.value,
      search: search.value,
    }))

    const updateSearch = (sr: Search) => (search.value = sr)

    const debouncedUpdateSearch = debounce(updateSearch, 500)

    const onSearchChange = (sr: Search) => {
      passedSearch.value = sr
      if (sr.field === search.value.field) {
        debouncedUpdateSearch(sr)
      } else {
        updateSearch(sr)
      }
    }

    return () => (
      <div>
        <UsersTable
          total={users.result?.value?.usersCount ?? 0}
          headers={[
            {
              label: 'Prenume',
              key: 'firstName',
              searchable: true,
            },
            {
              label: 'Nume',
              key: 'lastName',
              searchable: true,
            },
            {
              label: 'Nume de utilizator',
              key: 'username',
              searchable: true,
            },
            {
              label: 'Rol',
              key: 'role',
              transform: readableRole,
            },
          ]}
          data={users.result?.value?.users ?? []}
          pagination={pagination.value}
          onPaginationChange={pg => (pagination.value = pg)}
          search={passedSearch.value}
          onSearchChange={onSearchChange}
          linkFn={user => `/users/${user.id}`}
        />
      </div>
    )
  },
})
