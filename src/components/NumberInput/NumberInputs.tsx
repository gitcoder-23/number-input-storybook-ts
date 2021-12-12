import React, { useState } from 'react';
import { StyledWrapper, StyledInputText } from '../styles/styled';
import { INumberInput } from '../model/Interface';
import ScientificField from './ScientificField';
import ShortenendField from './ShortenendField';

/**Here model interface & component interface inherited */
export interface InputProps extends INumberInput {
  /*** This is the type of Input Field */
  displayMode: 'decimal' | 'shortened' | 'scientific';
}

/** Number Inputs Operations */
const NumberInputs: React.FC<InputProps> = ({
  displayMode = 'decimal',
  precision,
  delimiter,
  decimalMark,
}: InputProps) => {
  const [input, setInput] = React.useState<string>('');
  const [newValue, setNewValue] = React.useState<string[]>([]);
  const [blurCase, setBlurCase] = React.useState<boolean>(false);
  const [oneDot, setOneDot] = React.useState<boolean>(false);

  /**This is input onchange function.
   * By this function if add number only then delimiter added with the number autometically*/
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let targetValue = event.target.value;

    /** This Regex accept only number*/
    const acceptOnlyNum = targetValue.replace(/[^0-9^\.\-]+/g, '');

    /**By using this regex the number splitted and delimiter with join function*/
    var numberWithDel = acceptOnlyNum.split(/(?=(?:\d{3})+$)/).join(delimiter);
    setInput(numberWithDel);
    const splitComma = numberWithDel.toString().split(delimiter);
    setNewValue(splitComma);
    setBlurCase(false);
    setOneDot(false);
  };

  /**This is onblur function.*/
  /** By using this function the precision added with the given number after blur*/
  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let blurTargetValue = event.target.value;
    const getSplitedValue: string[] = newValue || blurTargetValue.split('');
    const joindValue = getSplitedValue.join('');
    const convertedWithPrecision = Number(joindValue).toFixed(precision);
    const valWithDelimiter = convertedWithPrecision
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
    console.log('valWithDelimiter', valWithDelimiter);

    if (joindValue === '') {
      setInput('');
    } else {
      setInput(valWithDelimiter);
      setBlurCase(true);
    }
    setBlurCase(true);
    if (valWithDelimiter === 'NaN') {
      setOneDot(true);
    }
  };

  return (
    <StyledWrapper data-test="component-numberdiv">
      {displayMode == 'decimal' && (
        <>
          <StyledInputText
            type="text"
            onChange={onChange}
            onBlur={onBlur}
            value={input == 'NaN' ? '' : input}
            className={`input-field ${displayMode}`}
            style={{
              border: displayMode === 'decimal' && '1px solid black',
            }}
            data-test="decimal-input"
          />

          {oneDot == true && (
            <pre style={{ color: 'red' }}>Only one dot & sign accepted </pre>
          )}
        </>
      )}
      {displayMode == 'shortened' && (
        <ShortenendField
          displayMode={displayMode}
          precision={precision}
          delimiter={delimiter}
          decimalMark={decimalMark}
        />
      )}
      {displayMode == 'scientific' && (
        <ScientificField
          displayMode={displayMode}
          precision={precision}
          delimiter={delimiter}
          decimalMark={decimalMark}
        />
      )}
    </StyledWrapper>
  );
};

export default NumberInputs;
