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
 *
 * @param {string} url
 * @param {requestCallback} callback
 *
 */
export const getHTML = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'text';
  xhr.onload = () => {
    const status = xhr.status;
    console.log(xhr);
    callback(status, xhr.response);
    if (xhr.status !== 200) {
      console.error('Ошибка при получении новости...');
    }
  };
  xhr.send();
};

/**
 *
 * @param {string} url
 * @param {requestCallback} callback
 *
 */
export const formPOST = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.responseType = 'json';
  xhr.onload = () => {
    const status = xhr.status;
    console.log(xhr);
    callback(status, xhr.response);
    if (xhr.status !== 200) {
      console.error('error');
    }
  };
  xhr.send();
};

/**
 * This callback is displayed as a global member.
 * @callback requestCallback
 * @param {number} responseCode
 * @param responseData
 */
