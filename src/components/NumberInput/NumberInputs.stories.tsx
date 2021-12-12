import { Meta, Story } from '@storybook/react';
import NumberInputs, { InputProps } from './NumberInputs';

const meta: Meta = {
  title: 'Number Inputs',
  component: NumberInputs,
  /**Individual argument types can be added as per requirements*/
  argTypes: {
    displayMode: {
      control: {
        type: 'select',
        options: ['decimal', 'shortened', 'scientific'],
      },
    },
    precision: {
      control: {
        type: 'select',
        options: ['1', '2', '3'],
      },
    },

    delimiter: {
      control: {
        type: 'select',
        options: [',', '.', ':', ';', '*'],
      },
    },
    decimalMark: {
      control: {
        type: 'select',
        options: ['.'],
      },
    },
  },
};

export default meta;

const Template: Story<InputProps> = (args) => <NumberInputs {...args} />;
export const DecimalField = Template.bind({});

DecimalField.args = {
  displayMode: 'decimal',
  precision: 2,
  delimiter: ',',
  decimalMark: '.',
};

export const ShortenedField = Template.bind({});

ShortenedField.args = {
  displayMode: 'shortened',
};

export const ScientificField = Template.bind({});

ScientificField.args = {
  displayMode: 'scientific',
};
