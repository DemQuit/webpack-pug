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
  closeEscapeHandler;

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
      if (!e.target.closest('.popup-open')) return;
      e.preventDefault();
      /**
       *
       * @type {HTMLElement}
       */
      const target = e.target.closest('.popup-open');
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
      if (!e.target.closest('.popup__close')) return;
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
    popup.classList.add('popup_show');
    this.createEscapeListener();
  }

  /**
   *
   * @param popup {HTMLElement}
   */
  close(popup) {
    this.body.classList.remove('overflow-hidden');
    popup.classList.add('popup_hide');

    setTimeout(() => {
      popup.classList.remove('popup_show');
      popup.classList.remove('popup_hide');
    }, this.animationDuration);

    this.removeEscapeListener();
  }

  /**
   *
   * @param event {KeyboardEvent}
   */
  closeEscapeHandle(event) {
    const popup = document.querySelector('.popup.popup_show');
    if (popup && event.key === 'Escape') {
      this.close(popup);
    }
  }

  createEscapeListener() {
    this.closeEscapeHandler = this.closeEscapeHandle.bind(this);
    document.addEventListener('keyup', this.closeEscapeHandler);
  }
  removeEscapeListener() {
    document.removeEventListener('keyup', this.closeEscapeHandler);
  }
}

export const popup = new Popup();
