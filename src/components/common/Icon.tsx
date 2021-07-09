import { defineComponent } from 'vue'
import { typedListener, typedString } from '@/types'
import * as icons from '@mdi/js'

export type IconType = keyof typeof icons

export const Icon = defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: typedString<IconType>(),
      required: true,
    },
    size: {
      type: Number,
      default: 4,
    },
    class: {
      type: String,
      default: '',
    },
    onClick: {
      type: typedListener(),
      required: false,
    },
  },
  setup(props) {
    return () => (
      <span class={['mdi', props.class]}>
        <svg
          class={['fill-current inline-block align-middle', `w-${props.size} h-${props.size}`]}
          viewBox="0 0 24 24"
          onClick={props.onClick}
        >
          <path d={icons[props.name]} clip-rule="evenodd" fill-rule="evenodd" />
        </svg>
      </span>
    )
  },
})
