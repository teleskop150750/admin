/* eslint-disable no-nested-ternary */
export default () => {
  const tabbed = document.querySelector('.tabbed');
  const tablist = tabbed.querySelector('.tabbed__list');
  const tabs = [...tablist.querySelectorAll('.tabbed__button')];
  const panels = [...tabbed.querySelectorAll('.tabbed__section')];

  const switchTab = (oldTab, newTab) => {
    newTab.focus();

    newTab.removeAttribute('tabindex');
    newTab.setAttribute('aria-selected', 'true');

    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');

    const index = tabs.indexOf(newTab);
    const oldIndex = tabs.indexOf(oldTab);
    panels[oldIndex].hidden = true;
    panels[index].hidden = false;
  };

  tablist.setAttribute('role', 'tablist');

  tabs.forEach((tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', `tab${i + 1}`);
    tab.setAttribute('tabindex', '-1');
    tab.parentNode.setAttribute('role', 'presentation');

    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTab = tablist.querySelector('[aria-selected]');
      if (e.currentTarget !== currentTab) {
        switchTab(currentTab, e.currentTarget);
      }
    });

    tab.addEventListener('keydown', (e) => {
      const index = tabs.indexOf(e.currentTarget);
      const dir = e.which === 37 ? index - 1
        : e.which === 39 ? index + 1
          : e.which === 40 ? 'down' : null;
      if (dir !== null) {
        e.preventDefault();
        if (dir === 'down') {
          panels[i].focus();
        } else if (tabs[dir]) {
          switchTab(e.currentTarget, tabs[dir]);
        }
      }
    });
  });

  panels.forEach((panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '-1');
    const id = panel.getAttribute('id');
    panel.setAttribute('aria-labelledby', tabs[i][id]);
    // eslint-disable-next-line no-param-reassign
    panel.hidden = true;
  });

  tabs[0].removeAttribute('tabindex');
  tabs[0].setAttribute('aria-selected', 'true');
  panels[0].hidden = false;
};
