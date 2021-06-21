import { defineComponent, reactive } from 'vue'
import { TextInput } from '@/components/form/TextInput'
import { useAuthenticateMutation } from '@/generated/graphql'
import { authorize, state } from '@/store/auth'

export const LoginView = defineComponent({
  name: 'LoginView',
  setup() {
    const data = reactive({
      username: '',
      password: '',
    })

    const auth = useAuthenticateMutation({
      variables: {
        user: data,
      },
    })

    auth.onDone(result => {
      const token = result.data?.authenticate.token
      if (token) {
        authorize(token)
      }
    })

    return () => (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault()
            auth.mutate()
          }}
        >
          ERR: {String(auth.error.value)}
          <br />
          Token: {String(state.token)}
          <TextInput label="Username" value={data.username} onInput={str => (data.username = str)} />
          <TextInput label="Password" type="password" value={data.password} onInput={str => (data.password = str)} />
          <button>Login!</button>
        </form>
      </div>
    )
  },
})
