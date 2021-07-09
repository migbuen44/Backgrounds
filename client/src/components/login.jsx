import React from 'react'
import axios from 'axios';

const Login = () => {
  const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=4cb458aef9d344d2a58c62e7da3d0da5&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
  return <a href={AUTH_URL}>
    Login
  </a>
}

export default Login;

// import React from "react"
// import { Container } from "react-bootstrap"

// const AUTH_URL =
//   "https://accounts.spotify.com/authorize?client_id=4cb458aef9d344d2a58c62e7da3d0da5&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

// export default function Login() {
//   return (
//     <Container
//       className="d-flex justify-content-center align-items-center"
//       style={{ minHeight: "100vh" }}
//     >
//       <a className="btn btn-success btn-lg" href={AUTH_URL}>
//         Login With Spotify
//       </a>
//     </Container>
//   )
// }