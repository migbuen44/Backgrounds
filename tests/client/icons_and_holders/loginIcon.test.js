import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'
import store from '../../../client/src/store';
import LoginIcon from '../../../client/src/components/icons_and_holders/loginIcon';

describe('LoginIcon', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <LoginIcon />
      </Provider>, div);
  })

  it('matches snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <LoginIcon />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})