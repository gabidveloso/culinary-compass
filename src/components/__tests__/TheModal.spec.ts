// TheModal.spec.js
import { mount } from '@vue/test-utils'
import { expect, describe, it, vi } from 'vitest'
import TheModal from '../TheModal/TheModal.vue'

describe('TheModal.vue', () => {
  it('renders correctly when show is true', async () => {
    const wrapper = mount(TheModal, {
      props: {
        show: true,
        clickOutsideToClose: true
      },
      slots: {
        header: '<div>Test Header</div>',
        body: '<div>Test Body</div>',
        footer: '<div>Test Footer</div>'
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.modal').exists()).toBe(true)
    expect(wrapper.find('.backdrop').exists()).toBe(true)
    expect(wrapper.find('.content').exists()).toBe(true)

    expect(wrapper.text()).toContain('Test Header')
    expect(wrapper.text()).toContain('Test Body')
    expect(wrapper.text()).toContain('Test Footer')
  })

  it('emits update:show when backdrop is clicked', async () => {
    const wrapper = mount(TheModal, {
      props: {
        show: true,
        clickOutsideToClose: true
      }
    })

    await wrapper.find('.backdrop').trigger('click')

    const emit = wrapper.emitted('update:show') ? wrapper.emitted('update:show')![0][0] : []

    expect(emit).toBe(false)
  })
})
