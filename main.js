function setFormMessage(formElement , type , message){
    //type -> success/error
    const messageElement = formElement.querySelector(".form_message");
    messageElement.textContent = message;
    messageElement.classList.remove('form_message_error' , 'form_message_success');
    messageElement.classList.add(`form_message_${type}`);
};

function setInputError(inputElement , message){
    inputElement.classList.add('.form_input_error');
    inputElement.parentElement.querySelector('.form_input_error_message').textContent = message;
}

document.addEventListener("DOMContentLoaded" , () => {
    const loginForm = document.querySelector('#login');
    const createAccountForm = document.querySelector('#createAccount');

    document.querySelector('#linkLogin').addEventListener('click' , (e) => {
        e.preventDefault();
        createAccountForm.classList.add('form_hidden');
        loginForm.classList.remove('form_hidden');        
    });
    
    document.querySelector('#linkCreateAccount').addEventListener('click' , (e) => {
        e.preventDefault();
        createAccountForm.classList.remove('form_hidden');
        loginForm.classList.add('form_hidden');
    });

    loginForm.addEventListener("submit" , (e) => {
        e.preventDefault();
        setFormMessage(loginForm , 'error' , "Invalid username password combination");
    });

    document.querySelectorAll('.form_input').forEach(inputElement  => {
        inputElement.addEventListener("blur" , e => {
            if(e.target.id === "signUpUsername" &&  e.target.value.length<10){
                setInputError(inputElement , "Username must be atleast 10 characters");
            };
        });        
    });
});
