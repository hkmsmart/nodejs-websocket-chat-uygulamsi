var socket = io.connect('/');

socket.on('message', function (data){
    data = JSON.parse(data);
    if(data.username == undefined){
      data.username = 'anonim';
    }
    $('#messages').append('<div class="'+data.type+'">'+data.username+':'+data.message+'</div>');
});

$(function(){
  $('#send').click(function(){
      var text_message =  $('#message').val();
      if(text_message == ''){
        alert('Lütfen mesaj yazınız');
        return false;
      }
      var data = {
        message : text_message,
        type    : 'userMessage',
        username: $('#username').val(),
        sender  : socket.id
      };

      socket.send(JSON.stringify(data));
      $('#message').val('');
  });
});
