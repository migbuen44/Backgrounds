import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'
import store from '../../../client/src/store';
import SongTile from '../../../client/src/components/songs/songTile';

describe('SongTile', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <SongTile />
      </Provider>, div)
  })

  // it('matches snapshot', () => {
  //   const tree = renderer.create(
  //     <Provider store={store}>
  //       <SongTile />
  //     </Provider>
  //   ).toJSON();
  //   expect(tree).toMatchSnapshot();
  // })
})
