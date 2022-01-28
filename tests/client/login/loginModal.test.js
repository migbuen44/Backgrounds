import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'
import store from '../../../client/src/store';
import LoginModal from '../../../client/src/components/login/loginModal';

describe('LoginModal', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <LoginModal />
      </Provider>, div)
  })

  it('matches snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <LoginModal />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})