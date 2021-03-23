/* eslint-disable no-use-before-define */
export default () => {
  const className = 'nav__item--open';

  const aside = document.querySelector('.aside');
  const navButtons = aside.querySelectorAll('.nav__link--treeview');

  const closeTransitionendHandlerCb = (block, button) => {
    block.removeEventListener('transitionend', closeTransitionendHandler);
    button.addEventListener('click', open);
  };

  const closeTransitionendHandler = (e) => {
    const block = e.target;
    const parent = block.closest('.nav__item');
    const button = parent.querySelector('.nav__link--treeview');
    button.removeEventListener('click', close);
    closeTransitionendHandlerCb(block, button);
  };

  const close = (button) => {
    const parent = button.closest('.nav__item');
    const block = parent.querySelector('.nav__submenu');
    parent.classList.remove(className);
    block.style.height = `${block.scrollHeight}px`;
    getComputedStyle(block).getPropertyValue('height');
    block.style.height = '0';
    button.removeEventListener('click', close);
    block.addEventListener('transitionend', closeTransitionendHandler);
  };

  const openTransitionendHandlerCb = (block, button) => {
    block.removeEventListener('transitionend', openTransitionendHandler);
    button.addEventListener('click', () => {
      close(button);
    });
  };

  const openTransitionendHandler = (e) => {
    const block = e.target;
    const parent = block.closest('.nav__item');
    const button = parent.querySelector('.nav__link--treeview');
    button.removeEventListener('click', open);
    openTransitionendHandlerCb(block, button);
  };

  function open(e) {
    const openMenu = aside.querySelector('.nav__item--open');
    if (openMenu) {
      const buttonOpenMenu = openMenu.querySelector('.nav__link--treeview');
      close(buttonOpenMenu);
    }
    const button = e.target;
    const parent = button.closest('.nav__item');
    const block = parent.querySelector('.nav__submenu');
    block.style.height = `${block.scrollHeight}px`;
    parent.classList.add(className);
    button.removeEventListener('click', block);
    block.addEventListener('transitionend', openTransitionendHandler);
  }

  navButtons.forEach((button) => {
    button.addEventListener('click', open);
  });
};
