import React from 'react'
import {InputContainer} from './style/InputStyle';
import useNumberFormat from '../hooks/useNumberFormat';
export interface INumberInput {
     /** The input type is number. */
     type: string
     /** Placeholder is optional. */
     placeholder?: string
     /** Initailvalue for input  */
     initialvalue:string
    /** The number of digits after the decimal mark. */
    precision: number
    /** The character used as a thousands separator. */
    delimiter: string
    /** The character used as a decimal mark.  */
    decimalMark: string
}

const Input= ({type,placeholder,initialvalue,precision,delimiter,decimalMark}:INumberInput) => {
    const [value,bindNumber] = useNumberFormat({initialvalue,precision,delimiter,decimalMark});
    return (
        <InputContainer  type={type}  placeholder={placeholder}  {...bindNumber} data-test='input-test'/>
    )
}

export default Input
