import { mount, createLocalVue } from "@vue/test-utils";

import listView from "./index";

describe("components/listView", () => {
  const localVue = createLocalVue();

  test("should have correct default rendering", done => {
    const wrapper = mount(listView, {
      localVue,
      attachToDocument: true,
      propsData: {
        list: [],
        title: "Title 1",
        isVisible: true,
        buttonIcon: ""
      }
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.isVueInstance()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
      wrapper.destroy();
      done();
    });
  });

  test("should have correct rendering with actual data", done => {
    const list = [
      { message: "Message 1" },
      { message: "Message 2" },
    ];

    const wrapper = mount(listView, {
      localVue,
      attachToDocument: true,
      propsData: {
        list: list,
        title: "Title 2",
        isVisible: true,
        buttonIcon: "favorite"
      }
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.isVueInstance()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
      wrapper.destroy();
      done();
    });
  });
});
