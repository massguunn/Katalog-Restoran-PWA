import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';
import routes from '../routes/routes';

class App {
  constructor({
    button, drawer, content, jumbroton,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._jumbroton = jumbroton;

    this._initialAppshell();
  }

  _initialAppshell() {
    // TODO: initial Drawer
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
      jumbroton: this._jumbroton,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#mainContent').focus();
    });
  }
}

export default App;
