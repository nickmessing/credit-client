import { UserRole, useUserQuery } from '@/generated/graphql'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export const UserDetailsView = defineComponent({
  name: 'UserDetailsView',
  setup() {
    const route = useRoute()
    const vars = computed(() => ({ id: route.params.id as string }))
    const user = useUserQuery(vars)
    return () => (
      <div class="bg-white block shadow rounded p-2">
        <h2 class="text-xl font-bold text-center">Utilizatorul "{user.result.value?.user.username}"</h2>
        <select>
          {Object.values(UserRole).map(role => (
            <option selected={role === user.result.value?.user.role}>{role}</option>
          ))}
        </select>
      </div>
    )
  },
})
