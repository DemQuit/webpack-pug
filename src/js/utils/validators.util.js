/**
 *
 * @param email {string}
 * @returns {boolean}
 */
export const validatorEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  console.log(email, emailRegex.test(email));
  return emailRegex.test(email);
};
