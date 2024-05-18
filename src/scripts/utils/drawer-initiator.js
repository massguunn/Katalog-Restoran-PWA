const DrawerInitiator = {
  init({
    button, drawer, content, jumbroton,
  }) {
    button.addEventListener('click', (event) => {
      this._ToogleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });

    jumbroton.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _ToogleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },
};

export default DrawerInitiator;
