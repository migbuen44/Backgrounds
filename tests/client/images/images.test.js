import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'
import store from '../../../client/src/store';
import Image from '../../../client/src/components/images/image';

describe('Image', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Image />
      </Provider>, div)
  })

  it('matches snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Image />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})