import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'
import store from '../../../client/src/store';
import MusicPlayer from '../../../client/src/components/musicPlayer/musicPlayer';

describe('MusicPlayer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <MusicPlayer />
      </Provider>, div)
  })

  it('matches snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <MusicPlayer />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
