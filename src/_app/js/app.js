import '../scss/app.scss';
import { burger, popup } from './components';

window.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  /* Global */
  burger.init();
  popup.init();
}
