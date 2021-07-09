import { computed, defineComponent, ref, watch } from 'vue'
import { typedArray, typedListener } from '@/types'

let dropdownCounter = 0

export const DropdownSelect = defineComponent({
  name: 'DropdownSelect',
  props: {
    label: {
      type: String,
      default: 'Dropdown',
    },
    value: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    options: {
      type: typedArray<{ label: string; value: string }>(),
      required: true,
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
      const target = event.target as HTMLSelectElement
      const value = target.value

      innerValue.value = value
      props.onInput?.(value)
    }

    const counterValue = ref(++dropdownCounter)
    const id = computed(() => `select_${props.id || counterValue.value}`)

    return () => (
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for={id.value}>
          {props.label}
        </label>
        <select
          class={[
            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
            {
              'border-red-500 mb-3': props.error,
            },
          ]}
          id={id.value}
          placeholder={props.label}
          value={innerValue.value}
          onChange={setValue}
          onBlur={props.onBlur}
        >
          {props.options.map(option => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
        {props.error && <p class="text-red-500 text-xs italic">{props.error}</p>}
      </div>
    )
  },
})
