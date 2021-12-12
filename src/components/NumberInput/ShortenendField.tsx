import React, { useState } from 'react';
import { INumberInput } from '../model/Interface';
import { StyledInputText } from '../styles/styled';

export interface ShortInputProps extends INumberInput {
  /*** This is the type of Input Field */
  displayMode: 'decimal' | 'shortened' | 'scientific';
}

const ShortenendField: React.FC<ShortInputProps> = ({
  displayMode,
  precision,
  delimiter,
  decimalMark,
}: ShortInputProps) => {
  return (
    <StyledInputText
      type="text"
      // ref={focusDiv}
      value=""
      className={`input-field ${displayMode}`}
      style={{
        border: displayMode === 'shortened' && '1px solid blue',
      }}
      placeHolder="Type Here.."
    />
  );
};

export default ShortenendField;
