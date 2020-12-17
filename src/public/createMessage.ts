import Message from '@/components/message.vue'
import { createApp } from 'vue'
import { MessageProps } from './types'
const createMessage = (props: MessageProps) => {
  const { message, type = 'default', timeout = 2000 } = props
  const instance = createApp(Message, {
    message,
    type
  })
  const node = document.createElement('div')
  document.body.appendChild(node)
  instance.mount(node)
  setTimeout(() => {
    instance.unmount(node)
    document.body.removeChild(node)
  }, timeout)
}
export default createMessage
