import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import IconBookmark from '@/components/icons/IconBookmark.vue'
import TheCard from '../TheCard/TheCard.vue'

describe('TheCard.vue', () => {
  it('renders the card with correct styles and handles bookmark button click', async () => {
    const props = {
      link: 'https://example.com',
      image: 'https://example.com/image.jpg',
      bookmarked: false
    }

    const i18n = createI18n({
      locale: 'en',
      messages: {
        en: {
          header: {
            appName: 'Sword Github Discovery'
          }
        }
      }
    })

    const wrapper = mount(TheCard, {
      props,
      global: {
        components: {
          IconBookmark
        },
        plugins: [i18n]
      }
    })

    expect(wrapper.find('.card').exists()).toBe(true)

    await wrapper.find('.card-image img').trigger('load')

    expect(wrapper.find('.bookmark').exists()).toBe(true)

    expect(wrapper.find('.bookmark').classes('active')).toBe(false)

    await wrapper.find('.bookmark').trigger('click')

    expect(wrapper.emitted()['update:bookmarked']).toBeTruthy()

    const emittedValue = wrapper.emitted('update:bookmarked')![0][0]

    expect(emittedValue).toBe(!props.bookmarked)
  })
})
