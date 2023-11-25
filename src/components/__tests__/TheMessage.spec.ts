import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { expect, describe, it } from 'vitest'
import TheMessage from '@/components/TheMessage/TheMessage.vue'
import { THE_MESSAGE_VARIANTS } from '../TheMessage/TheMessage.type'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      message: {
        close: 'Close'
      }
    }
  }
})

describe('TheMessage.vue', () => {
  it('renders correctly when show is true', async () => {
    const wrapper = mount(TheMessage, {
      props: {
        show: true,
        variant: THE_MESSAGE_VARIANTS.WARNING,
        message: 'Some message'
      },
      global: {
        stubs: {
          IconClose: true
        },
        plugins: [i18n]
      }
    })
    await wrapper.vm.$nextTick()

    await wrapper.find('button').trigger('click')

    expect(wrapper.find('.message').exists()).toBe(true)
    expect(wrapper.find('.warning').exists()).toBe(true)
    expect(wrapper.text()).toContain('Some message')
    expect(wrapper.emitted()['update:show'][0]).toStrictEqual([])
  })
})
