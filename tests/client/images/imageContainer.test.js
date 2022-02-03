import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'
import store from '../../../client/src/store';
import ImageContainer from '../../../client/src/components/images/imageContainer';

describe('ImageContainer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <ImageContainer />
      </Provider>, div)
  })

  it('matches snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <ImageContainer />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot
  })
})