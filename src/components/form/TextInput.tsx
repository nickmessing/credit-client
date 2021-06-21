import { defineComponent, ref, watch } from 'vue'
import { typedListener } from '@/types'

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
    type: {
      type: String,
      default: 'text',
    },
    onInput: {
      type: typedListener<[value: string]>(),
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

    return () => (
      <label class="block">
        <span>{props.label}: </span>
        <input class="border border-black border-solid" type={props.type} value={innerValue.value} onInput={setValue} />
      </label>
    )
  },
})
