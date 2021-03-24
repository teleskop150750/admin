export default () => {
  const body = document.querySelector('.page__body');
  const imageBoxSingle = document.querySelector('.image-box--single');
  const imageBoxButtonSelect = imageBoxSingle.querySelector('.image-box__button--select');
  const imageBoxfille = imageBoxSingle.querySelector('.image-box__fille');
  const imageBoxfilleInput = imageBoxfille.querySelector('.image-box__fille-input');
  const imageBoxfilleName = imageBoxfille.querySelector('.image-box__fille-name');
  const modalfillesSingle = document.querySelector('.modal-filles--single');
  const filleslist = modalfillesSingle.querySelector('.modal-filles__list-inner');

  const closeModalfilles = (modal) => {
    modal.classList.remove('modal-filles--open');
    body.classList.remove('page__body--lock');
  };

  const openModalfilles = (modal) => {
    modal.classList.add('modal-filles--open');
    body.classList.add('page__body--lock');
    const buttonClose = modal.querySelector('.modal-filles__button--close');

    buttonClose.addEventListener('click', () => {
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
    if (target.classList.contains('button--select-single')) {
      const name = getImgName(target);
      imageBoxfilleInput.value = name;
      imageBoxfilleName.textContent = name;
      closeModalfilles(modalfillesSingle);
    }
    if (target.classList.contains('button--delete')) {
      const parent = target.closest('.fille');
      parent.remove();
    }
  });

  imageBoxButtonSelect.addEventListener('click', () => {
    openModalfilles(modalfillesSingle);
  });
};
