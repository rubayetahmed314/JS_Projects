let shoppingCart = document.getElementById("shoppingCart");

$('.addToCart').click(function (event) {
    event.preventDefault();
    // console.log( $(this).text() );
    // option = $(this).text().toString();
    console.log(event.target);
    console.log(event.target.previousElementSibling.previousElementSibling.lastElementChild.textContent);

    let productID = event.target.parentElement.id;

    // Array.from(document.getElementById("shoppingCart").children).forEach((item, index, array)=>{
    //     if(item.id==copy.id){
    //         console.log("Matched!");
    //     } else {
    //         console.log("Not Matched!");
    //     }
    // });
    // // event.target.parentElement.remove();

    let newItem = true;
    Array.from(shoppingCart.children).forEach((item, index, array) => {
        // console.log(item);
        if (item.id == productID) {
            // console.log("Matched!" + item.id + copy.id + index);
            newItem = false;
            let quantity = item.firstElementChild.lastElementChild.textContent;
            console.log(quantity);
            quantity = parseInt(quantity) + 1;
            console.log(quantity);
            item.firstElementChild.lastElementChild.textContent = quantity.toString();
        }
    });

    if (newItem) {
        addToCart(event.target.parentElement);
    }
    displayAlert("Product Added to Cart Successfully !", "alert-success");
});

// Handle events for dynamically added elements

$('body').on("click", '.removeFromCart', function (event) {
    // console.log("Clicked");
    event.preventDefault();
    let item = event.target.parentElement;
    let quantity = item.firstElementChild.lastElementChild.textContent;
    console.log(quantity);
    if (quantity == 1) {
        item.remove();
    } else {
        quantity = parseInt(quantity) - 1;
        console.log(quantity);
        item.firstElementChild.lastElementChild.textContent = quantity.toString();
    }
    displayAlert("Product Removed from Cart Successfully !", "alert-danger");
});

function addToCart(product) {
    let copy = product.cloneNode(true);
    let btn = copy.lastElementChild;
    btn.classList.remove('btn-success', 'addToCart');
    btn.classList.add('btn-danger', 'removeFromCart');
    btn.textContent = "Remove from Cart";

    let badge = document.createElement('span');
    badge.className = "badge badge-primary text-center";
    badge.style.height = 'fit-content';
    badge.style.fontSize = 'large';
    badge.textContent = "1";
    copy.firstElementChild.appendChild(badge);

    shoppingCart.appendChild(copy);
}

function displayAlert(message, className) {
    let alertField = document.getElementById("shortAlert");
    
    alertField.classList.add(className);
    alertField.innerText = message;
    alertField.style.visibility = 'visible';
    
    setTimeout(clearAlert.bind(null, className),2000);
}

function clearAlert(className) {
    let alert = document.querySelector('.alert');
    if (alert) {
        // alert.remove();
        alert.style.visibility = 'hidden';
        alert.classList.remove(className);
    }
}