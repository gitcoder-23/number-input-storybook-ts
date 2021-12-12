**useNumberFormat.ts**

`useNumberFormat` custom hook is for a Number Format of a text field. You can use it for the number format input field. You can use it to simplify many tasks, such as a multi-page input form. Without changing component hierarchy, you can reuse stateful logic and it is easy to share custom hooks
with other components.

**Usage**

```
  import useNumberFormat from './hooks/useNumberFomat';

  function App(){
      const[value,bindNumber]=useNumberFormat({
                                  initialvalue:'',
                                  precision:2,
                                  delimiter:',',
                                  decimalMark:'.'
                               });
      return(){
        <div>
          <input type="text" placeholder="Enter a number"  {...binNumber}/>
        </div>
      }
  }

```

**Config**

You pass `useNumberFormat` a configuration object containing the following (\* = required).

| Key            | Type   | Default Value | Description                                     |
| -------------- | ------ | ------------- | ----------------------------------------------- |
| initialvalue\* | string | `''`          | Initial value used by the field.                |
| precision\*    | number | `2`           | The number of digits after the decimal mark.    |
| delimiter\*    | string | `','`         | The character is used as a thousands separator. |
| decimalMark\*  | string | `'.'`         | The character is used as a decimal mark.        |

**Return object**

| Key        | Type   | Description                        |
| ---------- | ------ | ---------------------------------- |
| value      | any    | Controlled value of the field.     |
| bindNumber | object | A `bindNumber` object (see below). |

**bindNumber object**

| Key      | Type     | Description                                                   |
| -------- | -------- | ------------------------------------------------------------- |
| value    | any      | Controlled value of the field.                                |
| onChange | Function | Event triggered upon input change.                            |
| onBlur   | Function | Event triggered upon input blur.                              |
| onPaste  | Function | event occurs when the user pastes some content in an element. |

**handleChange**

`handleChange` function is for update initial value of `useState`.It has used in `onChange` event.

**handleBlur**

`handleBlur` function is for update initial value of `useState` When the user user clicks or hits <kbd>tab</kbd> (onBlur) .It has used in `onBlur` event.

**handlePaste**

`handleChange` function is for update initial value of `useState` when the user press <kbd>Ctrl</kbd>+<kbd>V</kbd> or Right-Click the input and choose `paste`.It has used in `onPaste` event.

**getNumberValue**

`getNumberValue` function returns only digits, a minus sign, the decimal point character, and the delimiter character.

**Props**

| Prop        | Type   | Description                                     |
| ----------- | ------ | ----------------------------------------------- |
| delimiter\* | string | The character is used as a thousands separator. |
| str\*       | string | The value passed in this function.              |

**setDecimalMarkPosition**

`setDecimalMarkPosition` function returns only digits with a decimal point. It returns positive or negative digits depending on the `str` value.

**Props**

| Prop      | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| str\*     | string | The value passed in this function.             |
| index\*   | number | The number used a length of decimal precision. |
| decimal\* | string | The character is used as a decimal mark.       |

**setDelimeter**

`setDelimeter` function returns only digits with a thousand separators. It returns positive or negative digits depending on the `str` value.

**Props**

| Prop        | Type   | Description                                     |
| ----------- | ------ | ----------------------------------------------- |
| str\*       | string | The value passed in this function.              |
| delimiter\* | string | The character is used as a thousands separator. |

**setDelimeterwithPrecision**

`setDelimeterwithPrecision` function returns only digits with thousand separators and decimal precision. It returns positive or negative digits depending on the `str` value.

**Props**

| Prop        | Type   | Description                                     |
| ----------- | ------ | ----------------------------------------------- |
| str\*       | string | The value passed in this function.              |
| delimiter\* | string | The character is used as a thousands separator. |
| precision\* | number | The number of digits after the decimal mark.    |

**Input.tsx**

It is an input component. It has used a number format functional component. In this component
I have used a custom hook for the number format. For Component styling, I have used styled-component.

**Props**

| Key            | Type   | Default Value | Description                                            |
| -------------- | ------ | ------------- | ------------------------------------------------------ |
| type\*         | string | `''`          | The type used as an input filed type.                  |
| placeholder    | string | `''`          | The placeholder is used as an input filed placeholder. |
| initialvalue\* | string | `''`          | Initial value used by the field.                       |
| precision\*    | number | `2`           | The number of digits after the decimal mark.           |
| delimiter\*    | string | `','`         | The character is used as a thousands separator.        |
| decimalMark\*  | string | `'.'`         | The character is used as a decimal mark.               |

**Usage**

```
  const[value,bindNumber]=useNumberFormat({
                                  initialvalue:'',
                                  precision:2,
                                  delimiter:',',
                                  decimalMark:'.'
                               });
 <InputContainer  type={type}  placeholder={placeholder}  {...bindNumber} />
```

**InputStyle.ts**

It has been used for design input components. Here I have used `styled-components package. It provides
a unique CSS class name. Here I have passed props for dynamic input attributes.

**Input.stories.tsx**

It has been used as a playground for UI components. It allows to create and test components in isolation.

**useNumber.test.tsx**

It has been used as a test of hook function. Unit test providing quality of codes, find bugs early, debugging process. I have used the enzyme library for the unit tests.
