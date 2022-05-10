//array type
import axios from 'axios'
let addToCart = document.querySelectorAll('.add-to-cart')

function updateCart(food) {
    //req to sent on server
    //library axios

    axios.post('/update-cart', food).then(res => {
        console.log(res)
    })
}
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let food = JSON.parse(btn.dataset.food)
        updateCart(food)
        console.log(food)


        //server req and add to cart
    })
})