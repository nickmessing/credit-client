import { computed, defineComponent, Ref } from 'vue'
import { typedString } from '@/types'
import { Icon, IconType } from '@/components'

export const Alert = defineComponent({
  name: 'Alert',
  props: {
    type: {
      type: typedString<'success' | 'info' | 'warning' | 'error'>(),
      default: 'info',
    },
  },
  setup(props, ctx) {
    const colorBase = computed(() =>
      props.type === 'success' ? 'green' : props.type === 'info' ? 'blue' : props.type === 'warning' ? 'yellow' : 'red',
    )

    const icon: Ref<IconType> = computed(() =>
      props.type === 'success'
        ? 'mdiCheckOutline'
        : props.type === 'info'
        ? 'mdiInformationOutline'
        : props.type === 'warning'
        ? 'mdiAlertOutline'
        : 'mdiAlertCircleOutline',
    )
    return () => (
      <div
        class={[
          'relative px-4 py-3 leading-normal rounded-lg mb-2 border',
          `text-${colorBase.value}-700 bg-${colorBase.value}-100 border-${colorBase.value}-500`,
        ]}
        role="alert"
      >
        <span class="absolute inset-y-0 left-0 flex items-center ml-4">
          <Icon name={icon.value} />
        </span>
        <p class="ml-6">{ctx.slots.default?.() ?? 'Notification'}</p>
      </div>
    )
  },
})
