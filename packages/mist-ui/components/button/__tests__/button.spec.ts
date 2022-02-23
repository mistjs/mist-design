import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '../button';

describe('button', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, { slots: { default: () => 'Test' } });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
