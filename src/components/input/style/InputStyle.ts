import styled from "styled-components";

export const InputContainer = styled.input.attrs(props=>({
    type:props.type || 'text',
    placeholder:props.placeholder||'Enter you input here'
}))`
    width:30em;
    height: 3em;
    border-radius: 0.2em;
    border: 1px solid #ced4da;
    padding: 0.2em 0.5em;
    margin-right: 1em;
    margin-top:1em;
`;