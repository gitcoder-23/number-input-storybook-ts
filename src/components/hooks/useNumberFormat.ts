import React, { useState } from "react";
export interface INumberHook {
    /** Initailvalue for input  */
    initialvalue:string
    /** The number of digits after the decimal mark. */
    precision: number
    /** The character used as a thousands separator. */
    delimiter: string
    /** The character used as a decimal mark.  */
    decimalMark: string
}
const useNumberFormat = ({initialvalue, precision, delimiter, decimalMark}:INumberHook) => {
    const [value, setValue] = useState(initialvalue);
    /** DecimalMark set in number */
    const setDecimalMarkPosition = (str: string, index: number, mark: string) => {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + mark + str.substring(index + 1);
    };
    /** Delimeter set in number */
    const setDelimeter = (str: string, delimiter: string) => {
        if (str !== '') return str.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, delimiter);
        return str;
    }
    /** Delimeter set in number */
    const setDelimeterwithPrecision = (str: string, precision: number, delimiter: string) => {
        if (str === '') return str;
        const convert_val = (Math.round(Number(str) * 100) / 100).toFixed(precision);
        return convert_val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, delimiter);
    }
    /** Only Value store  */
    const getNumberValue = (delimiter: string, str: string) => {
        const regex = new RegExp("[" + delimiter + ",a-z,A-Z]", "g");
        return str.replace(/ /g, '').replace(regex, '');
    }
    /** convert to decemal precision onchange method*/
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const val = evt.target.value
        let orgval = getNumberValue(delimiter, val);
        orgval = setDelimeter(orgval, delimiter);
        setValue(orgval);      
    }
    /** covert to delimiter onblur method */
    const handleBlur = (
        evt: React.FocusEvent<HTMLInputElement>,
    ) => {
        let val = evt.target.value
        let orgVal = getNumberValue(delimiter, val);
        if(orgVal !== ''){
            val = setDelimeterwithPrecision(orgVal, precision, delimiter);
            val = setDecimalMarkPosition(val, val.length - (precision + 1), decimalMark);
            setValue(val);
        }else{
            setValue(orgVal);
        }
    }
    /** onPestMethod, Right click paste function for number formate */
    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        let clipValue = event.clipboardData.getData('text');
        clipValue = getNumberValue(delimiter, clipValue);
        if (clipValue !== '') {
            let val = setDelimeterwithPrecision(clipValue, precision, delimiter);
            val = setDecimalMarkPosition(val, val.length - (precision + 1), decimalMark);
            setValue(val);
        } else {
            setValue('');
        }
    };
    const bind = {
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e),
        onBlur: (e: React.FocusEvent<HTMLInputElement>) => handleBlur(e),
        onPaste: (e: React.ClipboardEvent<HTMLInputElement>)=>handlePaste(e)
    }
    return [value,bind];
}

export default useNumberFormat;
