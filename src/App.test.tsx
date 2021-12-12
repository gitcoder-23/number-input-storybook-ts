import React from 'react';
import App from './App';
import {shallow} from 'enzyme';
import {findByTestAttr} from './test/testUtills';
const setup = ()=>{
  return shallow(<App />);
}
test('renders learn react link', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper,'app-component');
  expect(appComponent.length).toBe(1);
});
