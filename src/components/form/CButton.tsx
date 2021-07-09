import { defineComponent } from 'vue'
import { typedListener } from '@/types'
import { RouterLink } from 'vue-router'

export const CButton = defineComponent({
  name: 'CButton',
  props: {
    label: {
      type: String,
      default: 'Submit',
    },
    class: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: typedListener(),
      required: false,
    },
  },
  setup(props, ctx) {
    return () => {
      const attrs = {
        class: [
          '  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
          {
            'bg-blue-500': !props.disabled,
            'hover:bg-blue-700': !props.disabled,
            'bg-gray-300': props.disabled,
          },
          props.class,
        ],
        onClick: props.onClick,
      }
      const content = ctx.slots.default?.() ?? props.label

      return props.to ? (
        <RouterLink to={props.to} {...attrs}>
          {content}
        </RouterLink>
      ) : (
        <button type="submit" {...attrs}>
          {content}
        </button>
      )
    }
  },
})
