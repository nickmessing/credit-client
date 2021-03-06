import { computed, defineComponent, ref, watch } from 'vue'
import { typedListener } from '@/types'

let inputCounter = 0

export const TextInput = defineComponent({
  name: 'TextInput',
  props: {
    label: {
      type: String,
      default: 'Text input',
    },
    value: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    error: {
      type: String,
      required: false,
    },
    onInput: {
      type: typedListener<[value: string]>(),
      required: false,
    },
    onBlur: {
      type: typedListener(),
      required: false,
    },
  },
  setup(props) {
    const innerValue = ref(props.value)

    watch(
      () => props.value,
      () => (innerValue.value = props.value),
    )

    const setValue = (event: Event) => {
      const target = event.target as HTMLInputElement
      const value = target.value

      innerValue.value = value
      props.onInput?.(value)
    }

    const counterValue = ref(++inputCounter)
    const id = computed(() => `input_${props.id || counterValue.value}`)

    return () => (
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for={id.value}>
          {props.label}
        </label>
        <input
          class={[
            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
            {
              'border-red-500': props.error !== '',
              'mb-3': props.error !== '',
            },
          ]}
          id={id.value}
          type={props.type}
          placeholder={props.label}
          value={innerValue.value}
          onInput={setValue}
          onBlur={props.onBlur}
        />
        {props.error && <p class="text-red-500 text-xs italic">{props.error}</p>}
      </div>
    )
  },
})
