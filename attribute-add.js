import formValidate from './scripts/form-validate.js';

const constraints = {
  title: {
    // Password is also required
    presence: true,
    // message: 'Длина поля больше 5 символов',
    // And must be at least 5 characters long
    length: {
      minimum: 5,
      message: 'Длина поля больше 5 символов',
    },
    // message: 'Длина поля больше 5 символов',
  },
};

function showSuccess() {
  // We made it \:D/
  alert('Success!');
}

formValidate(constraints, showSuccess);
