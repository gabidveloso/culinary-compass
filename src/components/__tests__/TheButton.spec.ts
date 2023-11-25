import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import TheButton from '../TheButton/TheButton.vue'
import { THE_BUTTON_VARIANTS } from '../TheButton/TheButton.type'

describe('TheButton.vue', () => {
  it('renders the primary button correctly', async () => {
    const wrapper = mount(TheButton, {
      props: {
        id: 'primaryButton',
        variant: THE_BUTTON_VARIANTS.PRIMARY,
        disabled: false
      },
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.exists()).toBe(true)

    expect(wrapper.classes()).toContain('primary')

    expect(wrapper.text()).toContain('Click me')

    expect(wrapper.attributes('disabled')).toBeFalsy()

    await wrapper.trigger('click')
  })
})
