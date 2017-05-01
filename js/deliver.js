$(document).ready(startup());

function startup(){
  $(".button-collapse").sideNav();
  $('#menu').on('click', '.orderButton', addToCart);
}



//object saving the order information
var order ={
  Hamburger: {
    price: 8.99,
    quantity: 0
  },
  Ribs: {
    price: 14.99,
    quantity: 0
  },
  'Fancy Pizza':{
    price: 11.99,
    quantity: 0
  },
  'Ice Cream' :{
    price: 7.99,
    quantity: 0
  }

};


// code for the order forms
function addToCart(){
  order[event.target.id].quantity++;
  updateCart();
}

function updateCart(){
  //updates order display
  $('#cart').css('display', 'block');
  if(seeIfOnList(event.target.id) < 0){
    $('#orders').append(`<div class="orderItem"><span>${event.target.id}</span><span><span>$${order[event.target.id].price}</span> x <span>${order[event.target.id].quantity}</span></span></div>`);
  }else{ $($($('#orders').children('div')[seeIfOnList(event.target.id)]).children('span')[1]).children('span')[1].innerHTML = order[event.target.id].quantity;
  }

  //updates subtotal
  $('.totals').children('span')[1].innerHTML = `$${getTotal()}`;

  //updates tax
  $('.totals').children('span')[3].innerHTML = `$${(getTotal()*.04).toFixed(2)}`;

  //updates total
  $('.totals').children('span')[5].innerHTML = `$${(getTotal()+(getTotal()*.04)).toFixed(2)}`

}

function seeIfOnList(anItem){
  let lengthOfOrders = $('#orders').children('div').length;
  for (let i = 0; i < lengthOfOrders; i++ ){
    let currentItem = $($('#orders').children('div')[i]).children('span')[0].innerHTML;
    if (currentItem == anItem){
      return i;
    }
  }
  return -1;
}

function getTotal(){
  let total = 0;
  for (food in order){
    total += (order[food].price)*(order[food].quantity);
  }
  return Number(total.toFixed(2));
}


//code for form validation
function validate(){
  if(document.getElementsByTagName('input')[0].value == "" ||
    document.getElementsByTagName('input')[1].value == "" ||
    document.getElementsByTagName('input')[2].value ==""){
      for (let i = 0; i < 3; i++){
        if (document.getElementsByTagName('input')[i].value ==""){
          Materialize.toast(`Please add a ${document.getElementsByTagName('input')[i].placeholder} to your order`,3000)
        }
      }
      return false;
    }
  $('#modal1').openModal({
    dismissible: false});
  return false;
}
