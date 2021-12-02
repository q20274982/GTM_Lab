(function() {

  const shoppingList = [
    {
      id: 0,
      name: 'Storage Box',
      price: 38
    },
    {
      id: 1,
      name: 'Lounge Chair',
      price: 1420,
      imgUrl: 'img/shop/th01.jpg'
    },
    {
      id: 2,
      name: 'Navy Box',
      price: 75,
      imgUrl: 'img/shop/th05.jpg'
    },
    {
      id: 3,
      name: 'Campfire Table',
      price: 1087,
      imgUrl: 'img/shop/th16.jpg'
    },
    {
      id: 4,
      name: 'Tissue Holder',
      price: 76.4,
      imgUrl: 'img/shop/th06.jpg'
    },
    {
      id: 5,
      name: 'Pendant Lamp',
      price: 27,
      imgUrl: 'img/shop/th09.jpg'
    },
    {
      id: 6,
      name: 'Office Chair',
      price: 329,
      imgUrl: 'img/shop/th08.jpg'
    },
  ]
  const cartList = []
  const orderInfo = {
    firstName: '',
    LastName: '',
    email: '',
    address: ''
  }

  const cartbody = document.querySelector('#shoppingCartTbody')
  const clearCartBtn = document.querySelector('#clearCartBtn')
  const subTotalInCart = document.querySelector('#subTotalInCart')
  const subTotalInOrder = document.querySelector('#subTotalInOrder')
  const totalInOrder = document.querySelector('#totalInOrder')
  
  function initAddToCartBinding () {
    const addToCartBtnList = document.querySelectorAll('button[data-shopping-id]')
    addToCartBtnList.forEach((el, idx) => {
      el.addEventListener('click', () => addToCart(el))
    })
  }

  function initCartBinding () {
    clearCartBtn.addEventListener('click', () => clearCart())
  }

  function addToCart (el) {
    const shoppingId = parseInt(el.dataset.shoppingId)
    const product = shoppingList[shoppingId]
    const isCartListContainProduct = cartList.some(x => x.id === shoppingId)

    if(isCartListContainProduct) {
      const cartItem = cartList.find(x => x.id === shoppingId)
      cartItem.quantity ++ 
      countSubTotal()
      removeCartItem(shoppingId, false)
      addToCartDOM(cartItem)
      cartList.push(cartItem)
    } else {
      const newCartItem = {...product,quantity: 1}
      cartList.push(newCartItem)
      countSubTotal()
      addToCartDOM(newCartItem)
    }
  }

  function addToCartDOM ({ quantity, id, name, price, imgUrl }) {
    const amount = (quantity * price).toLocaleString('en-US')
    const tr = document.createElement('tr')
    tr.id = `cartItem_${id}`
    const template = `
    <td>
    <div class="product-item"><a class="product-thumb" href="#"><img src="${ imgUrl }"
    alt="Product"></a>
    <div class="product-info">
    <h4 class="product-title"><a href="#">${ name }</a></h4>
    </div>
    </div>
      </td>
      <td class="text-center text-lg text-medium">$${ amount }</td>
      <td class="text-center"><a class="remove-from-cart" data-toggle="tooltip" title="Remove item"><i
      class="material-icons icon_close"></i></a></td>
      `
    tr.innerHTML = template
    tr.querySelector('.remove-from-cart').addEventListener('click', () => {
      removeCartItem(id)
    })
    cartbody.appendChild(tr)

  }

  function removeCartItem (id, call = true) {
    cartList.splice(cartList.findIndex(x => x.id === id), 1)
    const cartItem = cartbody.querySelector(`#cartItem_${id}`)
    cartItem.remove()
    if (!call) return
    countSubTotal()
  }

  function clearCart () {
    cartList.splice(0, cartList.length)
    cartbody.innerHTML = ''
    countSubTotal()
  }

  function countSubTotal () {
    const subTotal = cartList.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0)

    subTotalInCart.innerHTML = `$${subTotal.toLocaleString('en-US')}`
    subTotalInOrder.innerHTML = `$${subTotal.toLocaleString('en-US')}`
    totalInOrder.innerHTML = `$${(subTotal + 20 + 10).toLocaleString('en-US')}`
  }

  window.addEventListener('load', () => {
    initAddToCartBinding()
    initCartBinding()

  })
}())