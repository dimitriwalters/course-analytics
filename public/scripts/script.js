$(document).ready(() => {
  $('form').submit(function(event) {
    var formData = {
      'subject': $('input[name=subject]').val().toUpperCase(),
      'number': $('input[name=number]').val(),
      'grade': parseInt($('input[name=grade]').val()),
    };
    $.ajax({
      contentType: 'application/json',
      type: 'POST',
      url: '/',
      data: JSON.stringify(formData),
    });
    window.location.reload();
    event.preventDefault();
  });
  $('.delete-link').click(function(event) {
    $.ajax({
      contentType: 'application/json',
      type: 'DELETE',
      url: '/',
      data: JSON.stringify({id: $(this).data('id')}),
    });
    window.location.reload();
    event.preventDefault();
  });
});