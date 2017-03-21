export function isLoggedIn() {
  return !!localStorage.token
}

export function requiredAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export function getToken() {
  return localStorage.token;
}
