window.addEventListener('DOMContentLoaded',()=>{
  draggable();
})
function draggable() {
  var items = document.querySelectorAll('.well');
  items.forEach(item=>{
    // console.log(item);
    item.ondragstart = function () {
      event.dataTransfer.setData('text/plain', event.target.id);
    };
    item.ondragover = function () {
      event.preventDefault();
      this.style.borderTop = '2px solid blue';
    };
    item.ondragleave = function () {
      this.style.borderTop = '';
    };
    item.ondrop = function () {
      event.preventDefault();
      let id = event.dataTransfer.getData('text/plain');
      let item_drag = document.getElementById(id);
      this.parentNode.insertBefore(item_drag, this);
      this.style.borderTop = '';
    };
  })
}
