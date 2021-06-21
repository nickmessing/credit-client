import { User } from '@/generated/graphql'
import { decode } from 'jsonwebtoken'
import { computed, reactive } from 'vue'

const initialToken = localStorage.getItem('authorization-token')

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
