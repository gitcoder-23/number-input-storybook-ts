import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import  Input from '../Input';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'NumberInput/Input',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes : {
    delimiter: {
        control: {
            type: 'select',
            options: [',', '.', ';', ':', '"', '\'', ' '],
        },
    },
    decimalMark: {
        control: {
            type: 'select',
            options: [',', '.',],
        },
    },
},

  // argTypes: { onChange: { action: 'changed' } },
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args) => <Input  {...args}/>;

export const DecimalInput = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args

DecimalInput.args = {
    type:'text',
    placeholder:'Enter your number',
    initialvalue:'',
    precision:2,
    delimiter:',',
    decimalMark:'.'
};