import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import TheInput from '../TheInput/TheInput.vue'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      input: {
        show: 'show',
        hide: 'hide',
        invalidPassword: 'Invalid password',
        label: 'Password'
      }
    }
  }
})

describe('TheInput.vue', () => {
  it('renders input with type password and show/hide button', async () => {
    const wrapper = mount(TheInput, {
      props: {
        id: 'passwordInput',
        label: 'Password',
        type: 'password',
        value: 'testpassword',
        disabled: false,
        required: true,
        errorMessages: ['input.invalidPassword']
      },
      global: {
        plugins: [i18n]
      }
    })

    expect(wrapper.find('input').exists()).toBe(true)

    expect(wrapper.find('.show-password').exists()).toBe(true)

    await wrapper.find('.show-password').trigger('click')

    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('renders input with type text when type is not password', async () => {
    const wrapper = mount(TheInput, {
      props: {
        id: 'textInput',
        label: 'Text Input',
        type: 'text',
        value: 'testvalue',
        disabled: false,
        required: false,
        errorMessages: []
      },
      global: {
        plugins: [i18n]
      }
    })

    expect(wrapper.find('input').exists()).toBe(true)

    expect(wrapper.find('.show-password').exists()).toBe(false)

    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('emits update:value on input', async () => {
    const wrapper = mount(TheInput, {
      props: {
        id: 'inputWithEvents',
        label: 'Input with Events',
        type: 'text',
        value: 'testvalue',
        disabled: false,
        required: false,
        errorMessages: []
      },
      global: {
        plugins: [i18n]
      }
    })

    await wrapper.find('input').setValue('newvalue')

    expect(wrapper.emitted()['update:value']).toBeTruthy()
    expect(wrapper.emitted()['update:value'][0]).toEqual(['newvalue'])
  })
})
