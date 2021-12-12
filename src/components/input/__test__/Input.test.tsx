import React from "react";
import Input,{INumberInput} from "../Input";
import {findByTestAttr} from '../../../test/testUtills';
import { shallow } from "enzyme";

const setup=(props: Partial<INumberInput> = {})=>{
    const defaultProps: INumberInput = {
        type:'text',
        placeholder:'Enter your number',
        initialvalue:'',
        precision:2,
        delimiter:',',
        decimalMark:'.'
      };
    return shallow(<Input {...defaultProps} {...props}/>);
}
describe('',()=>{
    test('render without error',()=>{
        const wrapper = setup();
        const inputComponent = findByTestAttr(wrapper,'input-test');
        expect(inputComponent.length).toBe(1);
    });
})
