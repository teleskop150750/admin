/* eslint-disable no-undef */
export default () => {
  $('.select-multiple').each(function f() {
    $(this).select2({
      theme: 'bootstrap4',
      // eslint-disable-next-line no-nested-ternary
      width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
      placeholder: $(this).data('placeholder'),
      allowClear: Boolean($(this).data('allow-clear')),
      closeOnSelect: !$(this).attr('multiple'),
    });
  });
};
