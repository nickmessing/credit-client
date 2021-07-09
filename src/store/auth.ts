import { useMeQuery, User } from '@/generated/graphql'
import router from '@/router'
import { decode } from 'jsonwebtoken'
import { computed, inject, reactive, watch } from 'vue'

const initialToken =
  (localStorage.getItem('authorization-token') === 'null' ? null : localStorage.getItem('authorization-token')) ?? null

export const authorize = (token: string | null): void => {
  state.token = token
  setUser()
  saveToken()
}

export const computeUser = (token: string): User => {
  return decode(token) as User
}

export const setUser = (): void => {
  if (state.token != null) {
    state.user = computeUser(state.token)
  }
}

export const saveToken = (): void => {
  if (state.token) {
    localStorage.setItem('authorization-token', state.token)
  } else {
    localStorage.removeItem('authorization-token')
  }
}

export const state = reactive({
  user: initialToken ? computeUser(initialToken) : null,
  token: initialToken,
})

export const authenticated = computed(() => state.token != null)

export type Auth = {
  authorize: typeof authorize
  computeUser: typeof computeUser
  setUser: typeof setUser
  saveToken: typeof saveToken
  state: typeof state
  authenticated: typeof authenticated
}

watch(
  () => state.token,
  () => router.push('/'),
)

export const useAuth = (): Auth => ({ authorize, computeUser, setUser, saveToken, state, authenticated })

export const MeKey = Symbol('Me')

export const useMe = (): ReturnType<typeof useMeQuery> => inject(MeKey) as ReturnType<typeof useMeQuery>
