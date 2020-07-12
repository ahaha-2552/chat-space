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

  let reloadMessages = function() {
    let last_message_id = $('.messagebox:last').data("message-id")
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messeage').append(insertHTML);
        $('.messeage').animate({ scrollTop: $('.messeage')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});