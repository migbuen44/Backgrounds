import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'
import store from '../../../client/src/store';
import LogoutIcon from '../../../client/src/components/icons_and_holders/logoutIcon';

describe('LoginIcon', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <LogoutIcon />
      </Provider>, div);
  })

  it('matches snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <LogoutIcon />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})