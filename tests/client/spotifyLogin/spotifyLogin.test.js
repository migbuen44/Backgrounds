import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import SpotifyLogin from '../../../client/src/components/spotifyLogin/spotifyLogin';

describe('SpotifyLogin', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SpotifyLogin />, div)
  })

  it('matches snapshot', () => {
    const tree = renderer.create(<SpotifyLogin />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
