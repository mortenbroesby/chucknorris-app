import { mount, createLocalVue } from "@vue/test-utils";

import toastMessage from "./index";

describe("components/toastMessage", () => {
  const localVue = createLocalVue();

  test("should have correct rendering", done => {
    const wrapper = mount(toastMessage, {
      localVue,
      attachToDocument: true
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.isVueInstance()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
      wrapper.destroy();
      done();
    });
  });
});
