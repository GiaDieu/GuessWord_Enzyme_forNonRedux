import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestAttr } from '../../../test/testUtils';
import Input from './Input';

/**
 * @function setup
 * @returns {shallowWrapper}
 */
const setup = (secretWord = 'party') => {
  return shallow(<Input secretWord={secretWord} />);
};

test('renders Input Component without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});

test('does not throw a warning with expected props', () => {
  checkProps(Input, { secretWord: 'party' });
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    wrapper = setup();
  });

  test('state update with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  test('field is cleared upone submit button clicked', () => {
    const submitBtn = findByTestAttr(wrapper, 'submit-button');
    submitBtn.simulate('click', { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});
