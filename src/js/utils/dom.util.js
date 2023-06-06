/**
 * Функция для обертки элемента в другой элемент с заданым классом
 * @param {Element} el
 * @param {string} wrapClass
 */

export const wrap = (el, wrapClass = '') => {
  const wrapper = document.createElement('div');
  wrapper.classList.add(wrapClass);
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
};
