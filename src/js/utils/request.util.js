/**
 *
 * @param {string} url
 * @param {requestCallback} callback
 *
 */
export const getJSON = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = () => {
    const status = xhr.status;
    callback(status, xhr.response);
  };
  xhr.send();
};
/**
 * This callback is displayed as a global member.
 * @callback requestCallback
 * @param {number} responseCode
 * @param responseData
 */
