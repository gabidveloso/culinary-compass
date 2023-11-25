import { createI18n } from 'vue-i18n'
import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import TheHeader from '../TheHeader/TheHeader.vue'

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

describe('TheHeader.vue', () => {
  it('renders the header with logo and menu items when logged in', async () => {
    const menuItems = [{ path: '/discovery', name: 'Discovery' }]

    const wrapper = mount(TheHeader, {
      props: {
        isLoggedIn: true,
        userName: 'John Doe',
        menuItems
      },
      global: {
        plugins: [i18n]
      }
    })

    expect(wrapper.find('.logo').exists()).toBe(true)

    expect(wrapper.find('.logo-wrapper span').text()).toBe(i18n.global.t('header.appName'))

    menuItems.forEach((item) => {
      expect(wrapper.text()).toContain(item.name)
    })

    expect(wrapper.text()).toContain('John Doe')

    expect(wrapper.text()).toContain('header.logout')
  })

  it('renders the header without menu items when not logged in', async () => {
    const wrapper = mount(TheHeader, {
      props: {
        isLoggedIn: false,
        userName: '',
        menuItems: []
      },
      global: {
        plugins: [i18n]
      }
    })

    expect(wrapper.find('.logo').exists()).toBe(true)

    expect(wrapper.find('.logo-wrapper span').text()).toBe(i18n.global.t('header.appName'))

    expect(wrapper.find('.menu').exists()).toBe(false)

    expect(wrapper.find('.btn-nav').exists()).toBe(false)
  })

  it('should emit logout event when logout button is clicked', async () => {
    const wrapper = mount(TheHeader, {
      props: {
        isLoggedIn: true,
        userName: 'John Doe',
        menuItems: []
      },
      global: {
        plugins: [i18n]
      }
    })

    await wrapper.find('.logout').trigger('click')

    expect(wrapper.emitted('logout')).toBeTruthy()
  })
})
