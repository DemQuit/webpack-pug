class Burger {
  button;
  html;
  showClass = 'mobile-show-navigation';
  hideClass = 'mobile-hide-navigation';
  timeout = 500;
  mobileNavigation;

  constructor() {}

  init() {
    this.button = document.querySelector('.button-burger');
    this.html = document.querySelector('html');
    this.mobileNavigation = document.querySelector('.header-mobile-navigation');

    if (this.button) {
      this.button.addEventListener('click', () => {
        if (this.html.classList.contains(this.showClass)) {
          this.hideNavigation();
        } else {
          this.showNavigation();
        }
      });
    }

    if (this.mobileNavigation) {
      this.mobileNavigation.querySelectorAll('a').forEach((el) => {
        el.addEventListener('click', () => {
          this.hideNavigation();
        });
      });
    }
  }

  hideNavigation() {
    this.html.classList.remove(this.showClass);
    this.html.classList.add(this.hideClass);
    setTimeout(() => {
      this.html.classList.remove(this.hideClass);
    }, this.timeout);
  }

  showNavigation() {
    this.html.classList.add(this.showClass);
  }
}

export const burger = new Burger();
