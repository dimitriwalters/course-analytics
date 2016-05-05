$(document).ready(() => {
  $('form').submit((event) => {
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
  })
});