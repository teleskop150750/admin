export default (constraints, showSuccess) => {
  // Hook up the form so we can prevent it from being posted
  const form = document.querySelector('.form');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    handleFormSubmit(form);
  });

  // Hook up the inputs to validate on the fly
  const inputs = document.querySelectorAll('.form__input');
  for (let i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener('change', function (ev) {
      const errors = validate(form, constraints) || {};
      showErrorsForInput(this, errors[this.name]);
    });
  }

  function handleFormSubmit(form, input) {
    // validate the form against the constraints
    const errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});
    if (!errors) {
      showSuccess();
    }
  }

  // Updates the inputs with the validation errors
  function showErrors(form, errors) {
    // We loop through all the inputs and show the errors for that input
    _.each(form.querySelectorAll('input[name], select[name]'), (input) => {
      // Since the errors can be null if no errors were found we need to handle
      // that
      showErrorsForInput(input, errors && errors[input.name]);
    });
  }

  // Shows the errors for a specific input
  function showErrorsForInput(input, errors) {
    // This is the root of the input
    const formGroup = closestParent(input.parentNode, 'form__group');
    // Find where the error messages will be insert into
    const messages = formGroup.querySelector('.form__error');
    // First we remove any old messages and resets the classes
    resetFormGroup(formGroup);
    // If we have errors
    if (errors) {
      // we first mark the group has having errors
      formGroup.classList.add('has-error');
      // then we append all the errors
      _.each(errors, (error) => {
        addError(messages, error);
      });
    } else {
      // otherwise we simply mark it as success
      formGroup.classList.add('has-success');
    }
  }

  // Recusively finds the closest parent that has the specified class
  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    }
    return closestParent(child.parentNode, className);
  }

  function resetFormGroup(formGroup) {
    // Remove the success and error classes
    formGroup.classList.remove('has-error');
    formGroup.classList.remove('has-success');
    const messages = formGroup.querySelector('.form__error');
    // and remove any old messages
    messages.textContent = '';
  }

  // Adds the specified error with the following markup
  // <p class="help-block error">[message]</p>
  function addError(messages, error) {
    error = error.substr(error.indexOf(' '));
    messages.textContent = error;
  }
};
