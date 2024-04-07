import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import Post from "../Post.vue";

describe("Post", () => {
  it("renders the post ID", () => {
    const wrapper = mount(Post, {
      props: {
        id: 1,
      },
    });

    expect(wrapper.find("h2").text()).toBe("Post 1");
  });

  it("emits 'click:moveUp' event when the up button is clicked", async () => {
    const wrapper = mount(Post, {
      props: {
        id: 1,
      },
    });

    await wrapper.find("[data-testid='button-up']").trigger("click");

    expect(wrapper.emitted("click:moveUp")).toBeTruthy();
    expect(wrapper.emitted("click:moveUp")[0][0]).toBe(1);
  });

  it("emits 'click:moveDown' event when the down button is clicked", async () => {
    const wrapper = mount(Post, {
      props: {
        id: 1,
      },
    });

    await wrapper.find("[data-testid='button-down']").trigger("click");

    expect(wrapper.emitted("click:moveDown")).toBeTruthy();
    expect(wrapper.emitted("click:moveDown")[0][0]).toBe(1);
  });

  it("does not render the up button when hideUpButton prop is true", () => {
    const wrapper = mount(Post, {
      props: {
        id: 1,
        hideUpButton: true,
      },
    });

    expect(wrapper.find("[data-testid='button-up']").exists()).toBe(false);
  });

  it("does not render the down button when hideDownButton prop is true", () => {
    const wrapper = mount(Post, {
      props: {
        id: 1,
        hideDownButton: true,
      },
    });

    expect(wrapper.find("[data-testid='button-down']").exists()).toBe(false);
  });
});
