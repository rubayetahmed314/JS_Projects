let validateBtn = document.getElementById("validate");
let optionMenu = document.getElementById("option_menu");
let optionSelected = document.getElementById("selected_option");
let expression = document.getElementById('user_input');

let reEmail = /^([a-zA-Z0-9]\.?)+[^. ]@([a-zA-Z0-9]\.?)+[^.]$/ ;
let rePhone = /^(\+)?(88)?01[0-9]{9}$/;
let rePostal = /^[0-9]{4}$/;

let option = '';

$('.dropdown-item').click(function () {
    // console.log( $(this).text() );
    option = $(this).text().toString();
    optionSelected.innerHTML = `You have selected: <b>${option}</b>`;
});

validateBtn.addEventListener("click", validate);

function validate(event) {
    if (expression.value == '') {
        alert('Empty Input Field ! Nothing to Validate !');
    } else {
        let input = expression.value.toString().trim();
        // expression.value = '';
        switch (option) {
            case "Email":
                if(input.match(reEmail)){
                    displayAlert(`${input} is a Valid Email Address!`,"alert-success");
                } else {
                    displayAlert(`${input} is an Invalid Email Address!`,"alert-danger");
                }
                break;
            case "Phone Number":
                if(input.match(rePhone)){
                    displayAlert(`${input} is a Valid Phone Number!`,"alert-success");
                } else {
                    displayAlert(`${input} is an Invalid Phone Number!`,"alert-danger");
                }
                break;
            case "Postal Code":
                if(input.match(rePostal)){
                    displayAlert(`${input} is a Valid Postal Code!`,"alert-success");
                } else {
                    displayAlert(`${input} is an Invalid Postal Code!`,"alert-danger");
                }
                break;

            default:
                alert('No Option is Selected ! Select an Option First !');
                break;
        }
    }
}

function displayAlert(message, className) {
    clearAlert();
    let container = document.querySelector('.container');
    let afterHeading = document.getElementById("after_heading");
    let div = document.createElement('div');
    div.className = 'container alert text-center';
    div.classList.add(className);
    div.setAttribute("role", "alert");
    div.innerText = message;
    
    container.appendChild(div);
}

function clearAlert() {
    let alert = document.querySelector('.alert');
    if (alert) {
        alert.remove();
    }
}