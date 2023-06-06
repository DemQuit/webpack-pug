class Popup {
  /**
   * @private
   * @type {number}
   */
  animationDuration = 600;
  /**
   * @private
   * @type {HTMLElement}
   */
  body = null;

  init() {
    this.body = document.querySelector('body');
    this.openInit();
    this.closeInit();
  }

  /**
   * @private
   */
  openInit() {
    document.addEventListener('click', (e) => {
      if (!e.target.matches('.popup-open')) return;
      e.preventDefault();
      /**
       *
       * @type {HTMLElement}
       */
      const target = e.target;
      /**
       *
       * @type {string}
       */
      const href = target.getAttribute('href');
      /**
       *
       * @type {string}
       */
      const dataPopup = target.dataset['popup'];

      /**
       * @type {HTMLElement}
       */
      let popup;

      if (href && href !== '#') {
        popup = document.querySelector(href);
      }

      if (dataPopup) {
        popup = document.querySelector(`#${dataPopup}`);
      }

      if ((!href && !dataPopup) || !popup) {
        console.error("Couldn't find a popup");
        return;
      }

      this.open(popup);
    });
  }

  /**
   * @private
   */
  closeInit() {
    document.addEventListener('click', (e) => {
      if (!e.target.matches('.popup-close')) return;
      e.preventDefault();
      /**
       *
       * @type {HTMLElement}
       */
      const target = e.target;

      this.close(target.closest('.popup'));
    });

    /*Close in outside container*/

    document.addEventListener('click', (e) => {
      if (!e.target.matches('.popup')) return;
      e.preventDefault();
      /**
       *
       * @type {HTMLElement}
       */
      const target = e.target;

      this.close(target);
    });
  }

  /**
   *
   * @param popup {HTMLElement}
   */
  open(popup) {
    this.body.classList.add('overflow-hidden');
    popup.classList.add('popup-show');
  }

  /**
   *
   * @param popup {HTMLElement}
   */
  close(popup) {
    this.body.classList.remove('overflow-hidden');
    popup.classList.add('popup-hide');

    setTimeout(() => {
      popup.classList.remove('popup-show');
      popup.classList.remove('popup-hide');
    }, this.animationDuration);
  }
}

export const popup = new Popup();
