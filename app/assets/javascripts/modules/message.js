$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="messagebox" data-message-id=${message.id}>
        <div class="messeage__list">
          <div class="messeage__name">
            ${message.user_name}
          </div>
          <div class="messeage__date">
            ${message.created_at}
          </div>
        <div class="message__chat">
          <p class="message__content">
            ${message.content}
          </p>
          <img class="Message__image" src="${message.image}">
        </div>
      </div>`
      return html;
    } else {
      let html =
      `<div class="messagebox" data-message-id=${message.id}>
        <div class="messeage__list">
          <div class="messeage__name">
            ${message.user_name}
          </div>
          <div class="messeage__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message__chat">
          <p class="message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }
  $('.tweet-form').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      let html = buildHTML(data);
      $('.messeage').append(html);
      $('.messeage').animate({ scrollTop: $('.messeage')[0].scrollHeight});
      $('.send-btn').prop('disabled', false);
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
      $('Form__submit').prop("disabled", false);
    });
  })
});