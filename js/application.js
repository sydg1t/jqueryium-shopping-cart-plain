let total = [];
let changeTotal = function () {
  if (total.length === 0) {
    return 0;
  }
  let currentTotal = total.reduce((accumulator, currentItem) => {
    return accumulator + currentItem;
  });
  
  return currentTotal;
}
let updateItemTotal = function (ele) {
  let quantity = parseFloat($(ele).find('.qty input').val());
  let price = parseFloat($(ele).children('.price').text());
  let itemTotal = quantity * price;
  $(ele).children('.total').html(itemTotal);
  return itemTotal;
}


let loadChanges = function () {



  $(".item").each(function (i, ele) {
    updateItemTotal(ele);
    total.push(updateItemTotal(ele));
  })
  changeTotal();
  $('#totalPrice').html(changeTotal());
  total = [];
  $('.btn.remove').on('click', function (event) {
    $(this).closest('tr').remove();
    loadChanges();
  });

}

$(document).ready(function () {
  loadChanges();



  var timeout;
  $(document).on('input', '.qty input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      loadChanges();
    }, 500);

  });
  $('.btn.add').on('click', function (event) {
    event.preventDefault();
    let name = $('.nameField').val();
    let price = $('.priceField').val();
    $('tbody').append('<tr class = "item">' + '<td class = "name">' + name + '</td>' +
      '<td class = "price">' + price + '</td>' +
      '<td class = "qty">' +
      '<input type = "number" value = "0">' +
      '</td>' +
      '<td class = "total"></td>' +
      '<td>' +
      '<button class = "btn btn-danger btn-sm remove">Remove</button>' +
      '</td>' +
      '</tr>');
    loadChanges();
  });
});