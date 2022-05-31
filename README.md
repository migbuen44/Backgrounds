# Backgrounds

**Version 1.0.0**

Backgrounds is an image gallery, slideshow, music player that cycles through a set of images
and plays music from a playlist based on the user's current input. I created this project to improve my ability integrating third party API's, such as the ones I used for this project, Spotify's and Pexel's APIs.

## Installation

```bash
npm install
npm run build
npm start
```

> Note: Spotify login is configured to redirect to production url and may not work locally

## Features
1. Image handling
  - Scrollable container appears on the left hand side of the screen that contains backgrounds images thatmatch the user's query.
  - Cycles through images automatically, but user can pause and play the cycle by clicking on the image
    on the background, or click on one of the images on the container to select that image to dispaly and
    automatically pause the cycle as well.
  - User can save images to their account using the plus button that displays on the images in the image container when a user is logged in.
  - User can toggle between displaying the saved and searched images by clicking on the toggle button next to the image container.
2. Song handling
  - User is required to login to spotify to use the song related features of the app. A spotify login button
    that redirects the user to Spotify's login page is displayed if a user has not sign in. Upon successful login
    user is then redirected back to the app with all the song features enabled.
  - Scrollable container appears on the right hand side of the screen that contains songs from a playlist
    that matches the users's input.
  - User can click on the songs album image to play that song
  - Utilized the react-spotify-web-playback library to display the music player at the bottom of the screen
    - Library allows user to save songs to their favorites folder on their Spotify account
    - User can adjust song player volume and select which active devices to play the songs on
3. Login and User account creation
  - Users can create an account to take advantage of the saved images feature. User's password is hashed in the
    backend prior to being stored in a database.
  - A login button appears on the top right hand of the screen that displays a login page modal for a user to
    login if they already have an account. If they don't they can click on the sign up button to display the
    sign up modal, which then automatically logs the user in upon successful account creation.



