import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'
import store from '../../../client/src/store';
import Home from '../../../client/src/components/home/home';

describe('Home', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Home />
      </Provider>, div);
  })

  it('matches snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Home />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
});