export default () => {
  const body = document.querySelector('.page__body');
  const imageBoxGallery = document.querySelector('.image-box--gallery');
  const imageBoxfilleWrapper = imageBoxGallery.querySelector('.image-box__fille-wrapper');
  const imageBoxButtonAdd = imageBoxGallery.querySelector('.image-box__button--add');
  const modalfillesGallery = document.querySelector('.modal-filles--gallery');
  const filleslist = modalfillesGallery.querySelector('.modal-filles__list-inner');
  let gallery = [];

  const closeModalfilles = (modal) => {
    const filesCheck = modalfillesGallery.querySelectorAll('.fille--check');
    filesCheck.forEach((item) => {
      item.classList.remove('fille--check');
    });
    gallery.length = 0;

    modal.classList.remove('modal-filles--open');
    body.classList.remove('page__body--lock');
  };

  const openModalfilles = (modal) => {
    modal.classList.add('modal-filles--open');
    body.classList.add('page__body--lock');

    const buttonClose = modal.querySelector('.modal-filles__button--close');
    const buttonOk = modal.querySelector('.modal-filles__button--ok');

    buttonClose.addEventListener('click', () => {
      closeModalfilles(modal);
    });

    buttonOk.addEventListener('click', () => {
      const html = gallery.reduce((str, el) => `${str}<div class="image-box__fille">
      <input class="image-box__fille-input" type="hidden" name="gallery[]" value="${el}">
      <svg class="image-box__fille-icon">
        <use xlink:href="images/sprite-product.svg#fille"></use>
      </svg>
      <span class="image-box__fille-name">${el}</span>
      <button class="image-box__fille-button" type="button">
        <svg class="image-box__fille-button-icon">
          <use xlink:href="images/sprite-product.svg#delete"></use>
        </svg>
      </button>
    </div>
      `, '');
      imageBoxfilleWrapper.innerHTML += html;
      closeModalfilles(modal);
    });
  };

  const getImgName = (target) => {
    const parent = target.closest('.fille');
    const img = parent.querySelector('.fille__img-wrapper-img');
    return img.src.substr(img.src.lastIndexOf('upload/images/')).replace('upload/images/', '');
  };

  filleslist.addEventListener('click', (e) => {
    const { target } = e;
    if (target.classList.contains('button--select-gallery')) {
      const parent = target.closest('.fille');
      if (!parent.classList.contains('fille--check')) {
        parent.classList.add('fille--check');
        const name = getImgName(target);
        gallery.push(name);
      } else {
        parent.classList.remove('fille--check');
        const name = getImgName(target);
        gallery = gallery.filter((el) => el !== name);
      }
    }
    if (target.classList.contains('button--delete')) {
      const parent = target.closest('.fille');
      parent.remove();
    }
  });

  imageBoxButtonAdd.addEventListener('click', () => {
    openModalfilles(modalfillesGallery);
  });

  imageBoxfilleWrapper.addEventListener('click', (e) => {
    const { target } = e;

    if (target.classList.contains('image-box__fille-button')) {
      const parent = target.closest('.image-box__fille');
      parent.remove();
    }
  });
};
