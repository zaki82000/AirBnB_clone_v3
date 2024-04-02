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

$.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
  if (data.status === 'OK') {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
});

function search_places() {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify({amenities: Object.keys(amenities)}),
    contentType: 'application/json'
  }).done(function (data) {
    data.forEach(place => {
      $('section.places').append(
        `<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's' : ''}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}</div>
        </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`
      );
    });
  });
}

search_places();

$('button').click(function () {
  $('section.places').html('');
  search_places();
});
