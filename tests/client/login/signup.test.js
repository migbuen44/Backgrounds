import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'
import store from '../../../client/src/store';
import Signup from '../../../client/src/components/login/signup';

describe('Signup', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Signup />
      </Provider>, div)
  })

  it('matches snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Signup />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
