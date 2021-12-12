import React, { useState } from 'react';
import { INumberInput } from '../model/Interface';
import { StyledInputText } from '../styles/styled';

export interface ScientificInputProps extends INumberInput {
  /*** This is the type of Input Field */
  displayMode: 'decimal' | 'shortened' | 'scientific';
}

const ScientificField: React.FC<ScientificInputProps> = ({
  displayMode,
  precision,
  delimiter,
  decimalMark,
}: ScientificInputProps) => {
  const [inputNumber, setInputNumber] = useState<number>();

  /***Scientific function */

  const onChangeScientific = (event: React.ChangeEvent<HTMLInputElement>) => {
    let targetValue = event.target.value;
    setInputNumber(Number(targetValue));
    let convertedValue = Number(targetValue)
      .toExponential()
      .replace(/e\+?/, '^');
    // let convertedValue = targetValue.toString().replace(regexValue, '');
    console.log('convertedValue', convertedValue);
    if (targetValue === 'NaN') {
      setInputNumber(0);
    } else if (convertedValue === 'NaN') {
      // setInput(convertedValue);
      setInputNumber(0);
    } else if (convertedValue === 'Infinity') {
      setInputNumber(0);
    }
  };

  const onSciBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // let targetValue = event.target.value;
    // let convertedValue = Number(targetValue).toExponential();
    // setInputNumber(Number(convertedValue));

    let targetValue = event.target.value;
    let convertedValue = Number(targetValue)
      .toExponential()
      .replace(/e\+?/, '^');
    // let convertedValue = targetValue.toString().replace(regexValue, '');
    console.log('convertedValue', convertedValue);
    if (targetValue === 'NaN') {
      setInputNumber(0);
    } else if (convertedValue === 'NaN') {
      // setInput(convertedValue);
      setInputNumber(0);
    } else if (convertedValue === 'Infinity') {
      setInputNumber(0);
    }
  };

  // useEffect(() => {
  //   if (focusDiv.current) focusDiv.current.focus();
  // }, [focusDiv]);
  return (
    <StyledInputText
      type="text"
      onChange={onChangeScientific}
      // onBlur={onSciBlur}
      // ref={focusDiv}
      value={inputNumber}
      className={`input-field ${displayMode}`}
      style={{
        border: displayMode === 'scientific' && '1px solid green',
      }}
      placeHolder="Type Here.."
    />
  );
};

export default ScientificField;
