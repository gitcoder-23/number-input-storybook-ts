import React from 'react';
// import { render, screen } from '@testing-library/react';
import { findByTestAttr } from './globalTestFiles/test.utils';
import { shallow } from 'enzyme';
import App from './App';

const setup = () => shallow(<App />);

it('renders without crashing', () => {
  const wrapper = setup();
  // console.log('app', wrapper.debug());
  expect(wrapper.exists()).toBe(true);
  expect(wrapper.length).toBe(1);
});

it('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent).toHaveLength(1);
});

it('Header name exist', () => {
  const wrapper = setup();
  const appHeadTag = findByTestAttr(wrapper, 'app-header');
  expect(appHeadTag.exists()).toBe(true);
});

it('Header text checking', () => {
  const wrapper = setup();
  const headerText = findByTestAttr(wrapper, 'app-header');
  expect(headerText.text().includes('Number Input Using React StoryBook')).toBe(
    true
  );
});
