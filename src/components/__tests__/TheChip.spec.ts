import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import TheChip from '../TheChip/TheChip.vue'

describe('TheChip.vue', () => {
  it('renders the chips with correct styles and handles click event', async () => {
    const chips = [
      { id: '1', label: 'Chip 1', active: false, value: 'chip1' },
      { id: '2', label: 'Chip 2', active: true, value: 'chip2' }
    ]

    const i18n = createI18n({
      locale: 'en',
      messages: {
        en: {
          header: {
            appName: 'Culinary Compass'
          }
        }
      }
    })

    const wrapper = mount(TheChip, {
      props: {
        chips
      },
      global: {
        plugins: [i18n]
      }
    })

    expect(wrapper.findAll('.chip')).toHaveLength(chips.length)

    chips.forEach((chip) => {
      expect(wrapper.text()).toContain(chip.label)
    })

    const activeChip = wrapper.find('.chip.active')
    expect(activeChip.exists()).toBe(true)
    expect(activeChip.classes('active')).toBe(true)

    const inactiveChip = wrapper.find('.chip:not(.active)')

    await inactiveChip.trigger('click')

    expect(wrapper.emitted()['update:chips']).toBeTruthy()
    expect(inactiveChip.classes('active')).toBe(true)
  })
})
