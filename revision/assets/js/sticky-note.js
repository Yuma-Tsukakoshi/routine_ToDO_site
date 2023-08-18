function getNewNote() {
  return  '<div class="note">' + 
          '<input type="text">' +
          '<input class="delete-button sticky-button" type="button" value="削除">' +
          '<input class="color-button" type="color" value="色設定">' +
          '</div>';
}

function appendFunctions($note) {
  $note.draggable();
  $note.resizable();


  $note.children(".delete-button").on('click', function() {
      $(this).parents('.note').remove();
  });

  $note.children(".color-button").on('click', function() {
      const color = $(this).val();
      $(this).parents('.note').css('background-color', color);
});
}

$('#add-button').on('click', function(){
  var $note = $(getNewNote());
  appendFunctions($note);

  $('#sticky-note-container').append($note);
});