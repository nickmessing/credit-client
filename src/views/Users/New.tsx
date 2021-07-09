import { useCreateUserMutation, UserRole } from '@/generated/graphql'
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { useValidation } from '@/utils/validation'
import { Alert, Loading, TextInput, CButton, DropdownSelect } from '@/components'
import { useRouter } from 'vue-router'
import { readableRole } from '@/utils/strings'

export const UserCreateView = defineComponent({
  name: 'UserCreateView',
  setup() {
    const router = useRouter()

    const formData = reactive({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      role: UserRole.Manager,
    })

    const createUser = useCreateUserMutation({
      variables: {
        user: formData,
      },
    })

    const existingUsername = ref(false)
    const unexpectedError = ref(false)

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
      firstName: {
        data: computed(() => formData.firstName),
        validations: [
          {
            rule: ['isLength', { min: 3, max: 32 }],
            message: 'Prenumele trebuie să fie între 3 și 32 caractere',
          },
        ],
      },
      lastName: {
        data: computed(() => formData.lastName),
        validations: [
          {
            rule: ['isLength', { min: 3, max: 32 }],
            message: 'Numele trebuie să fie între 3 și 32 caractere',
          },
        ],
      },
    })

    createUser.onDone(result => {
      void router.push(`/users/${result.data?.createUser.id ?? ''}`)
    })
    createUser.onError(error =>
      error.message === 'USERNAME_EXISTS' ? (existingUsername.value = true) : (unexpectedError.value = true),
    )

    watch(
      () => formData,
      () => {
        existingUsername.value = false
        unexpectedError.value = false
      },
      { deep: true },
    )

    return () => (
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={event => {
          event.preventDefault()
          validation.enable()
          if (validation.valid.value) {
            void createUser.mutate()
          }
        }}
      >
        {(existingUsername.value || unexpectedError.value) && (
          <Alert type="error">{existingUsername.value ? 'Nume de utilizator deja există' : 'Eroare de rețea'}</Alert>
        )}
        {createUser.loading.value && <Loading />}
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
        <TextInput
          label="Prenume"
          value={formData.firstName}
          error={validation.fields.firstName.error.value}
          onInput={str => (formData.firstName = str)}
          onBlur={() => validation.fields.firstName.enable()}
        />
        <TextInput
          label="Nume"
          value={formData.lastName}
          error={validation.fields.lastName.error.value}
          onInput={str => (formData.lastName = str)}
          onBlur={() => validation.fields.lastName.enable()}
        />
        <DropdownSelect
          label="Rol"
          value={formData.role}
          onInput={str => (formData.role = str as UserRole)}
          options={Object.values(UserRole).map(role => ({ label: readableRole(role), value: role }))}
        />
        <CButton label="Utilizator Nou" disabled={!validation.valid.value} onClick={validation.enable} />
      </form>
    )
  },
})
