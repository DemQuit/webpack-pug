import { MOBILE_SIZE, TABLET_SIZE } from './_constants';

/**
 *
 * @returns {boolean}
 */
export const isMobileWidth = () => {
  return window.innerWidth < MOBILE_SIZE;
};

/**
 *
 * @returns {boolean}
 */
export const isTabletWidth = () => {
  return window.innerWidth < TABLET_SIZE;
};

/**
 *
 * @returns {boolean}
 */
export const isMobileDevice = () => {
  return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};
