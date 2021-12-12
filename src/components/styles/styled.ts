import styled from 'styled-components';

export const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledInputText = styled.input`
  box-sizing: border-box;
  position: relative;
  background-color: #eeeeee;
  font-size: 18px;
  padding: 0;
  width: 40%;
  height: 45px;
  color: #000;
  border-radius: 2px;
  outline: none;
  transition: 0.1s ease-out;
  white-space: nowrap;

  padding-left: 15px;
  &:focus {
    box-shadow: inset 0 0 0 2px #000;
  }
  &:hover {
    background-color: #ede3e3 !important;
    color: #5e5e5e !important;
  }
`;
