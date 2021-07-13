// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCF4LZVhVaiGy7EbirQLvp1CBG07BSt2U0",
    authDomain: "jotyourthought-ad7a4.firebaseapp.com",
    databaseURL: "https://jotyourthought-ad7a4-default-rtdb.firebaseio.com",
    projectId: "jotyourthought-ad7a4",
    storageBucket: "jotyourthought-ad7a4.appspot.com",
    messagingSenderId: "50504003451",
    appId: "1:50504003451:web:a7911d8d8abcf52370d7de",
    measurementId: "G-11YXEG9GBQ"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const auth = firebase.auth();


const signupbtn = document.getElementById("signupbtn");
signupbtn.addEventListener('click'  , (e) => {
    e.preventDefault();
    addData();
    document.getElementById("createAccount").reset();
});

function addData(){
    //preventDefault();
    var userEmail = document.getElementById("signUpEmail").value;
    var passEnter = document.getElementById("signUpPassword").value;
    var passCheck = document.getElementById("signUpPasscheck").value;
    if(passEnter ===passCheck){
        //window.alert("Entered if");
        firebase.auth().createUserWithEmailAndPassword(userEmail, passEnter)
        .then((userCredential) => {
            // Signed in 
            window.alert("Account created!!");
            var user = userCredential.user;
            window.location.href = "notes.html";
            console.log(firebase.auth().onAuthStateChanged(user => {if(user) {
                console.log(user.uid) }
            }));
            //document.getElementById("createAccount").reset();
        })
        .catch((error) => {
            // var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage);
        });
    }
    else{
        window.alert("Confirm your password again!");
    }
    
}


const loginbtn = document.getElementById("loginbtn");
loginbtn.addEventListener('click' , (e) => {
    e.preventDefault();
    login();
    document.getElementById("login").reset();
})




function login(){
    var loginEmail = document.getElementById("loginEmail").value;
    var loginPass = document.getElementById("loginPass").value;
    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPass)
    .then(cred => {
        //window.alert("Logged in!!");
        localStorage.setItem("user", JSON.stringify(cred));
        localStorage.setItem("uid",  cred.user["uid"]);
        window.location.href = "notes.html";
        //document.getElementById("login").reset();
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage);
    });
    //window.alert("Yha tak aaya");
}