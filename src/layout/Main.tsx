import { Icon } from '@/components'
import { useAuth } from '@/store/auth'
import { defineComponent, ref, watch } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'

export const MainLayout = defineComponent({
  name: 'MainLayout',
  setup() {
    const auth = useAuth()
    const route = useRoute()

    const menuOpen = ref(false)

    watch(
      () => route.path,
      () => (menuOpen.value = false),
    )

    return () =>
      auth.authenticated.value ? (
        <div class="w-screen h-screen">
          <nav
            class={[
              'bg-gray-200 absolute top-0 bottom-0 left-0 w-full text-xl transition duration-600 ease-in-out transform',
              menuOpen.value ? 'translate-x-0' : '-translate-x-full',
            ]}
          >
            <div class="text-right p-4">
              <Icon name="mdiClose" size={6} onClick={() => (menuOpen.value = false)} />
            </div>
            <RouterLink class="block py-2 px-4" to="/" activeClass="bg-white">
              <Icon name="mdiHome" class="mr-3" size={6} />
              <span>Pagina principală</span>
            </RouterLink>
            <RouterLink class="block py-2 px-4" to="/users" activeClass="bg-white">
              <Icon name="mdiAccountBox" class="mr-3" size={6} />
              <span>Utilizatori</span>
            </RouterLink>
            <RouterLink class="block py-2 px-4" to="/debtors" activeClass="bg-white">
              <Icon name="mdiAccountGroup" class="mr-3" size={6} />
              <span>Debitori</span>
            </RouterLink>
            <RouterLink class="block py-2 px-4" to="/loans" activeClass="bg-white">
              <Icon name="mdiCash" class="mr-3" size={6} />
              <span>Credite</span>
            </RouterLink>
            <span class="block py-2 px-4" onClick={() => auth.authorize(null)}>
              <Icon name="mdiClose" class="mr-3" size={6} />
              <span>Ieșire</span>
            </span>
          </nav>
          <div class="w-screen h-screen">
            <header class="bg-blue-200 h-12 p-3">
              <Icon name="mdiMenu" onClick={() => (menuOpen.value = true)} size={6} />
            </header>
            <div class="m-4">
              <RouterView />
            </div>
          </div>
        </div>
      ) : (
        <RouterView />
      )
  },
})
