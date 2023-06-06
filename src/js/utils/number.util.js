/**
 * Функция генерации рандомных чисел между мин. и макс. значениями
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

/**
 *
 * @param {number} value
 * @returns {string}
 */
export const addZero = (value) => {
  let newValue = '' + value;
  if (value < 10) {
    newValue = '0' + newValue;
  }

  return newValue;
};
