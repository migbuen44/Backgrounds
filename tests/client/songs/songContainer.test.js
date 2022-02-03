import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'
import store from '../../../client/src/store';
import SongContainer from '../../../client/src/components/songs/songContainer';

describe('SongContainer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <SongContainer />
      </Provider>, div)
  })

  it('matches snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <SongContainer />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
