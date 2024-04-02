const checkboxes = $('input[type=checkbox]');
const amenities = {};

checkboxes.prop('checked', '');

checkboxes.change(function () {
  if ($(this).prop('checked')) {
    amenities[$(this).attr('data-id')] = $(this).attr('data-name');
  } else {
    delete amenities[$(this).attr('data-id')];
  }
  if (Object.keys(amenities).length === 0) {
    $('div.amenities h4').html('&nbsp');
  } else {
    $('div.amenities h4').text(Object.values(amenities).join(', '));
  }
});
