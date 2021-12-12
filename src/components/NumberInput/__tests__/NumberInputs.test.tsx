import React from 'react';
import { findByTestAttr } from '../../../globalTestFiles/test.utils';
import { shallow } from 'enzyme';
import NumberInputs from '../NumberInputs';

const defaultProps = {
  displayMode: 'decimal' as const,
  precision: 2,
  delimiter: ',',
  decimalMark: '.',
};

const setup = (InputProps = {}) => {
  const setupProps = { ...defaultProps, ...InputProps };
  return shallow(<NumberInputs {...setupProps} />);
};

describe(`Number input ${defaultProps.displayMode} test`, () => {
  it('render without crashing', () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.length).toBe(1);
  });
  it('render without error', () => {
    const wrapper = setup();
    const divComponent = findByTestAttr(wrapper, 'component-numberdiv');
    expect(divComponent).toHaveLength(1);
  });
  it('decimal input field exists', () => {
    const wrapper = setup();
    const decimalInput = findByTestAttr(wrapper, 'decimal-input');
    expect(decimalInput.exists()).toBe(true);
  });
});

describe('State controlled input field', () => {
  let mockSetCurrentInput: any = jest.fn();
  let wrapper: any;
  let originalUseState: any;
  let delmtr = defaultProps.delimiter;
  let precision = defaultProps.precision;
  let dcmlmrk = defaultProps.decimalMark;
  beforeEach(() => {
    mockSetCurrentInput.mockClear();
    originalUseState = React.useState;
    React.useState = jest.fn(() => ['', mockSetCurrentInput]);
    wrapper = setup();
  });
  afterEach(() => {
    React.useState = originalUseState;
  });

  describe('Controlled input field upon change', () => {
    it('Update with value of input box with number of calls', () => {
      const decimalInputBox = findByTestAttr(wrapper, 'decimal-input');
      const mockEvent = { target: { value: '1111' } };
      decimalInputBox.simulate('change', mockEvent);
      expect(mockSetCurrentInput).toHaveBeenCalledTimes(4);
    });

    it(`State update with delimiter->'${delmtr}' added value`, () => {
      const decimalInputBox = findByTestAttr(wrapper, 'decimal-input');
      const mockEvent = { target: { value: `1000000` } };
      decimalInputBox.simulate('change', mockEvent);
      expect(mockSetCurrentInput).toHaveBeenCalledWith(
        `1${delmtr}000${delmtr}000`
      );
    });

    it(`Check negative value with delimiter->'${delmtr}' added`, () => {
      const decimalInputBox = findByTestAttr(wrapper, 'decimal-input');
      const mockEvent = {
        target: { value: `-1000000` },
      };
      decimalInputBox.simulate('change', mockEvent);
      expect(mockSetCurrentInput).toHaveBeenCalledWith(
        `-1${delmtr}000${delmtr}000`
      );
    });

    it(`State update with decimalMark->'${dcmlmrk}' added value`, () => {
      const decimalInputBox = findByTestAttr(wrapper, 'decimal-input');
      const mockEvent = {
        target: { value: `1234567${dcmlmrk}00` },
      };
      decimalInputBox.simulate('change', mockEvent);
      expect(mockSetCurrentInput).toHaveBeenCalledWith(`1234567${dcmlmrk}00`);
    });
  });

  describe('Controlled input field upon blur', () => {
    it('Update with value of input box with number of calls', () => {
      const decimalInputBox = findByTestAttr(wrapper, 'decimal-input');
      const mockEvent = { target: { value: '1111' } };
      decimalInputBox.simulate('blur', mockEvent);
      expect(mockSetCurrentInput).toHaveBeenCalledTimes(3);
    });

    it('Update with value of input box with called result', () => {
      const decimalInputBox = findByTestAttr(wrapper, 'decimal-input');
      const mockEvent = { target: { value: '1234567' } };

      decimalInputBox.simulate('blur', mockEvent);
      expect(mockSetCurrentInput).toHaveBeenCalledWith(
        `1${delmtr}234${delmtr}567${dcmlmrk}00`
      );
    });

    it(`Check negative value with delimiter->'${delmtr}' added`, () => {
      const decimalInputBox = findByTestAttr(wrapper, 'decimal-input');
      const mockEvent = {
        target: { value: `-1234567` },
      };
      decimalInputBox.simulate('change', mockEvent);
      expect(mockSetCurrentInput).toHaveBeenCalledWith(
        `-1${delmtr}234${delmtr}567`
      );
    });

    it(`Check negative value with decimalMark->'${dcmlmrk}' added`, () => {
      const decimalInputBox = findByTestAttr(wrapper, 'decimal-input');
      const mockEvent = {
        target: { value: `-1234567.00` },
      };
      decimalInputBox.simulate('change', mockEvent);
      expect(mockSetCurrentInput).toHaveBeenCalledWith(`-1234567${dcmlmrk}00`);
    });
  });
});
