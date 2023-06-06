/**
 *
 * @param {string} path
 * @returns {string}
 */
export const addSlashToPath = (path) => {
  let newPath = path;

  if (newPath.slice(-1) !== '/') {
    newPath += '/';
  }

  return newPath;
};
