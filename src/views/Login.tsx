import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { TextInput, CButton, Loading, Alert } from '@/components'
import { useAuthenticateMutation } from '@/generated/graphql'
import { authorize, useMe } from '@/store/auth'
import { useValidation } from '@/utils/validation'

export const LoginView = defineComponent({
  name: 'LoginView',
  setup() {
    const me = useMe()

    const formData = reactive({
      username: '',
      password: '',
    })

    const auth = useAuthenticateMutation({
      variables: {
        user: formData,
      },
    })

    const wrongCredentials = ref(false)
    const unexpectedError = ref(false)

    auth.onDone(result => {
      const token = result.data?.authenticate.token
      if (token) {
        authorize(token)
        void me.refetch()
      }
    })
    auth.onError(error =>
      error.message === 'USER_NOT_FOUND' ? (wrongCredentials.value = true) : (unexpectedError.value = true),
    )

    watch(
      () => formData,
      () => {
        wrongCredentials.value = false
        unexpectedError.value = false
      },
      { deep: true },
    )

    const validation = useValidation({
      username: {
        data: computed(() => formData.username),
        validations: [
          {
            rule: ['isLength', { min: 3, max: 32 }],
            message: 'Numele de utilizator trebuie să fie între 3 și 32 caractere',
          },
        ],
      },
      password: {
        data: computed(() => formData.password),
        validations: [
          {
            rule: ['isLength', { min: 8 }],
            message: 'Parola nu poate fi mai scurtă de 8 caractere',
          },
        ],
      },
    })

    return () => (
      <div class="p-10">
        <h1 class="font-bold text-8xl text-center text-indigo-600">urban credit</h1>
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={event => {
            event.preventDefault()
            validation.enable()
            if (validation.valid.value) {
              void auth.mutate()
            }
          }}
        >
          {(wrongCredentials.value || unexpectedError.value) && (
            <Alert type="error">
              {wrongCredentials.value ? 'Nume de utilizator sau parola greșită' : 'Eroare de rețea'}
            </Alert>
          )}
          {auth.loading.value && <Loading />}
          <TextInput
            label="Nume de utilizator"
            value={formData.username}
            error={validation.fields.username.error.value}
            onInput={str => (formData.username = str)}
            onBlur={() => validation.fields.username.enable()}
          />
          <TextInput
            label="Parola"
            type="password"
            value={formData.password}
            error={validation.fields.password.error.value}
            onInput={str => (formData.password = str)}
            onBlur={() => validation.fields.password.enable()}
          />
          <CButton label="Autentificare" disabled={!validation.valid.value} onClick={validation.enable} />
        </form>
      </div>
    )
  },
})
