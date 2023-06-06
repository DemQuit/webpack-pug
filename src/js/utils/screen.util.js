import { MOBILE_SIZE, TABLET_SIZE } from './_constants';

/**
 *
 * @returns {boolean}
 */
export const isMobile = () => {
  return window.innerWidth < MOBILE_SIZE;
};

/**
 *
 * @returns {boolean}
 */
export const isTablet = () => {
  return window.innerWidth < TABLET_SIZE;
};
