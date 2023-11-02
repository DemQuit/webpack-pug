export const getCookie = (cookieName) => {
  let neededCookie = null;
  const cookies = document.cookie.split('; ');
  cookies.forEach((cookie) => {
    const parts = cookie.split('=');
    if (parts[0] === cookieName) {
      neededCookie = parts[1];
    }
  });

  return neededCookie;
};
