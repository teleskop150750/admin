import formValidate from './scripts/form-validate.js';

const constraints = {
  login: {
    presence: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'Длина поля не меншьше 6 символов',
    },
  },
};

function showSuccess() {
  // We made it \:D/
  alert('Success!');
}

formValidate(constraints, showSuccess);
