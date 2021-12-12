import React from "react";
import useNumberFormat,{INumberHook} from "../useNumberFormat";
import { mount } from 'enzyme';
import {findByTestAttr} from '../../../test/testUtills';

const NumberComponent =(initialValues:INumberHook)=>{
  const [numberValue,bindNumberValue] = useNumberFormat(initialValues);
  return(
    <div data-test='input-component' >
      <input  type='text'  {...bindNumberValue} data-test="input-box" />
    </div>
  )
}
const setup=(props: Partial<INumberHook> = {})=>{
  const defaultProps: INumberHook = {
      initialvalue:'',
      precision:2,
      delimiter:',',
      decimalMark:'.'
    };
  return mount(<NumberComponent {...defaultProps} {...props}/>);
}
describe('number format hook',()=>{
  let mockSetValue: any = jest.fn();
  let originalUseState: any;
  beforeEach(() => {
    mockSetValue.mockClear();
    originalUseState = React.useState;
    React.useState = jest.fn(() => ['', mockSetValue]);
  });
  afterEach(() => {
    React.useState = originalUseState;
  });
  test('render without error',()=>{
    const wrapper = setup();
    const inputComponent = findByTestAttr(wrapper,'input-component');
    expect(inputComponent.length).toBe(1);
  });
  test('render input box without error',()=>{
    const wrapper = setup();
    const inputBox = findByTestAttr(wrapper,'input-box');
    expect(inputBox.length).toBe(1);
  });
 
  /** OnChange Event Number format test */
  describe('onChange Event Number Format',()=>{
    describe('postive number',()=>{
      test('a very large number',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { target: { value: `10000000000000` } };
        inputBox.simulate('change', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`10,000,000,000,000`);
      });
      test('with decimals',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { target: { value: `1000000.00` } };
        inputBox.simulate('change', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`1,000,000.00`);
      });
     
    });
    describe('negative number',()=>{
      test('a very large number',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { target: { value: `-10000000000000` } };
        inputBox.simulate('change', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`-10,000,000,000,000`);
      });
      test('with decimal',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { target: { value: `-1000000.00` } };
        inputBox.simulate('change', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`-1,000,000.00`);
      });
    });
   
  })
  
  /** OnBlur Event Number format test */
  describe('onBlur Event Number Format',()=>{
    describe('positive million',()=>{
      test('a large',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { target: { value: '1000000' } };
        inputBox.simulate('blur', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`1,000,000.00`);
      }); 
      test('with more decimals than the precision',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { target: { value: '1000000.0000' } };
        inputBox.simulate('blur', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`1,000,000.00`);
      }); 
      test('with more decimals than the precision to round up',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { target: { value: '1000000.009' } };
        inputBox.simulate('blur', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`1,000,000.01`);
      }); 
      test('with more decimals than the precision to round down',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { target: { value: '1000000.001' } };
        inputBox.simulate('blur', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`1,000,000.00`);
      }); 
    })
    describe('nagative million',()=>{
      test('a large',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { target: { value: '-1000000' } };
        inputBox.simulate('blur', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`-1,000,000.00`);
      }); 
      test('with more decimals than the precision',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { target: { value: '-1000000.0000' } };
        inputBox.simulate('blur', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`-1,000,000.00`);
      }); 
      test('with more decimals than the precision to round up',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { target: { value: '-1000000.009' } };
        inputBox.simulate('blur', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`-1,000,000.01`);
      }); 
      test('with more decimals than the precision to round down',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { target: { value: '-1000000.001' } };
        inputBox.simulate('blur', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`-1,000,000.00`);
      }); 
    });  
  })
  
  /** Onpest Event Number format test */
  describe('onPaste Event',()=>{
    describe('a positive  value stored on their clipboard and paste ctrl+v or right click paste',()=>{
      test('a positive million clipboard content',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { clipboardData: { getData: jest.fn().mockReturnValueOnce(`1000000`) } };
        inputBox.simulate('paste', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`1,000,000.00`);
      });
      test('with decimals',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { clipboardData: { getData: jest.fn().mockReturnValueOnce(`1000000.00`) } };
        inputBox.simulate('paste', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`1,000,000.00`);
      });
      test('with more decimals than the precision',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { clipboardData: { getData: jest.fn().mockReturnValueOnce(`1000000.0000`) } };
        inputBox.simulate('paste', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`1,000,000.00`);
      });
      test('with more decimals than the precision to round up',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { clipboardData: { getData: jest.fn().mockReturnValueOnce(`1000000.009`) } };
        inputBox.simulate('paste', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`1,000,000.01`);
      });
      test('with more decimals than the precision to round down',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { clipboardData: { getData: jest.fn().mockReturnValueOnce(`1000000.001`) } };
        inputBox.simulate('paste', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`1,000,000.00`);
      });
    });
    describe('a negative  value stored on their clipboard and paste ctrl+v or right click paste',()=>{
      test('a negative million clipboard content',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { clipboardData: { getData: jest.fn().mockReturnValueOnce(`-1000000`) } };
        inputBox.simulate('paste', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`-1,000,000.00`);
      });
      test('with decimals',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { clipboardData: { getData: jest.fn().mockReturnValueOnce(`-1000000.00`) } };
        inputBox.simulate('paste', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`-1,000,000.00`);
      });
      test('with more decimals than the precision',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { clipboardData: { getData: jest.fn().mockReturnValueOnce(`-1000000.0000`) } };
        inputBox.simulate('paste', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`-1,000,000.00`);
      });
      test('with more decimals than the precision to round up',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { clipboardData: { getData: jest.fn().mockReturnValueOnce(`-1000000.009`) } };
        inputBox.simulate('paste', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`-1,000,000.01`);
      });
      test('with more decimals than the precision to round down',()=>{
        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper,'input-box');
        const mockEvent = { clipboardData: { getData: jest.fn().mockReturnValueOnce(`-1000000.001`) } };
        inputBox.simulate('paste', mockEvent);
        expect(mockSetValue).toHaveBeenCalledWith(`-1,000,000.00`);
      });
    });
  })
 
});
