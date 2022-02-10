// 從 gtm.js 引入資源
import { addToCartEvent, checkout, browseProductList, puchase } from './gtm.js'

// IIFE + 主程式碼區塊
(function() {
  // 商品清單
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
  // 購物車清單
  const cartList = []
  // 訂單資訊
  const orderInfo = {
    firstName: '',
    LastName: '',
    email: '',
    address: ''
  }
  // 訂單收入
  let revenue = 0

  // 選取 index.html 內的 html tag 並轉為 DOM 物件
  const cartbody = document.querySelector('#shoppingCartTbody')
  const clearCartBtn = document.querySelector('#clearCartBtn')
  const subTotalInCart = document.querySelector('#subTotalInCart')
  const subTotalInOrder = document.querySelector('#subTotalInOrder')
  const totalInOrder = document.querySelector('#totalInOrder')
  const checkoutBtn = document.querySelector('#checkoutBtn')
  const continueBtn = document.querySelector('#continueBtn')
  
  // 監聽 加入購物車按鈕， 觸發時 執行 addToCart()
  function initAddToCartBinding () {
    const addToCartBtnList = document.querySelectorAll('button[data-shopping-id]')
    addToCartBtnList.forEach((el, idx) => {
      el.addEventListener('click', () => addToCart(el))
    })
  }

  // 監聽 清除購物車按鈕， 觸發時 執行 clearCart()
  function initClearCartBinding () {
    clearCartBtn.addEventListener('click', () => clearCart())
  }

  // 加入購物車
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

      pushToDataLayer(addToCartEvent([{
        name: cartItem.name,
        id: cartItem.id,
        price: cartItem.price,
        quantity: cartItem.quantity
      }]))
    } else {
      const newCartItem = {...product,quantity: 1}
      cartList.push(newCartItem)
      countSubTotal()
      addToCartDOM(newCartItem)

      pushToDataLayer(addToCartEvent([{
        name: newCartItem.name,
        id: newCartItem.id,
        price: newCartItem.price,
        quantity: 1
      }]))
    }
  }

  // 將 商品 渲染畫面在 購物車清單上
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

  // 購物車內商品移除功能
  function removeCartItem (id, call = true) {
    cartList.splice(cartList.findIndex(x => x.id === id), 1)
    const cartItem = cartbody.querySelector(`#cartItem_${id}`)
    cartItem.remove()
    if (!call) return
    countSubTotal()
  }

  // 購物車清除功能
  function clearCart () {
    cartList.splice(0, cartList.length)
    cartbody.innerHTML = ''
    countSubTotal()
  }

  // 金額計算功能
  function countSubTotal () {
    const subTotal = cartList.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0)

    subTotalInCart.innerHTML = `$${subTotal.toLocaleString('en-US')}`
    subTotalInOrder.innerHTML = `$${subTotal.toLocaleString('en-US')}`
    totalInOrder.innerHTML = `$${(subTotal + 20).toLocaleString('en-US')}`
    revenue = subTotal
  }

  // 推送至 GTM 的 dataLayer
  function pushToDataLayer (obj) {
    dataLayer.push(obj)
  }

  // window 載入後執行
  window.addEventListener('load', () => {
    // 初始化加入購物車按鈕行為
    initAddToCartBinding()
    // 初始化清除購物車按鈕行為
    initClearCartBinding()

    // 推送 (GA商品瀏覽事件) 至 dataLayer
    pushToDataLayer(browseProductList(shoppingList))
    
    // 監聽 確認結帳按鈕，觸發時 推送 (衡量結帳事件) 至 dataLayer
    checkoutBtn.addEventListener('click', () => {
      pushToDataLayer(checkout({ step: 1 }, cartList))
    })

    // 監聽 繼續結帳按鈕，觸發時 推送 (衡量結帳事件) 至 dataLayer
    continueBtn.addEventListener('click', () => {
      pushToDataLayer(checkout({ step: 2 }, cartList))

      // 2 秒後，推送 (衡量結帳事件)、(交易事件) 至 dataLayer
      setTimeout(() => {
        pushToDataLayer(checkout({ step: 3 }, cartList))
        pushToDataLayer(puchase({
          id: Date.now(),
          affiliation: '測試商店',
          revenue , // Total transaction value (incl. tax and shipping)
          shipping: 20,
        },cartList))
      }, 2000)
    })
  })
}())