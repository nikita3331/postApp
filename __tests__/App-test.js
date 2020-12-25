/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

import renderer from 'react-test-renderer';
import {addNums} from '../src/func/dumies'
jest.useFakeTimers();
jest.mock('../src/actions/user')

it('renders correctly', () => {
    renderer.create(<App />);
});
test('add numbers',()=>{
  expect(addNums(1,2)).toEqual(3)
})
