const form = document.getElementById('form')
const firstName = document.getElementById('first-name')
const lastName = document.getElementById('last-name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm-password')

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

const validation = (element, message, error) => {
    const spanMessage = document.querySelectorAll('.error');

    if(error === true) {
        spanMessage[message].classList.remove('hide')
        element.style.borderColor = "#fff564"
    } else if (error == false) {
        spanMessage[message].classList.add('hide');
        element.style.borderColor = "#ff2770"; 
    } 

}


const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const nameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    // todo: check if you can use a for

    // const password2Value = password2.value.trim();

    if(nameValue === '' || nameValue.length < 4) {
        validation(firstName, 0, true);
    } else {
        validation(firstName, 0, false);
    }

    if(lastNameValue === '' || lastNameValue.length < 4) {
        validation(lastName, 1, true);
    } else {
        validation(lastName, 1, false);
    }

    if(emailValue === '' || emailValue.length < 4) {
        validation(email, 2, true);
    } else {
        validation(email, 2, false);
    }

    if(phoneValue === '') {
        validation(phone, 3, true);
    } else {
        validation(phone, 3, false);
    }

    if(passwordValue === '') {
        validation(password, 4, true);
    } else {
        validation(password, 4, false);
    }

    if(confirmPasswordValue === passwordValue && confirmPasswordValue === '') {
        validation(confirmPassword, 5, true);
    } else {
        validation(confirmPassword, 5, false);
    }

};
