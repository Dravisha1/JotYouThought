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

var db = firebase.database();
const uid = localStorage.getItem("uid");
const diaryRef = db.ref('diary/' + uid)
var flag = 1; //1 for add and 0 for edit
var editIndex = -1;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.alert("Welcome to JotYourThought!!!")
    getContent().then((userNotes) => display(userNotes));
  }
  else {
    window.alert("Try logging in first.")
    window.location = "index.html";
  }
})


let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function (e) {
  let titleTxt = document.getElementById('title');
  let addTxt = document.getElementById('addTxt');

  if (titleTxt.value == '' || addTxt.value == '') window.alert("Both fields are mandatory.")
  else {
    if (flag === 0) {
      console.log("Flag =0");      
      updateData(uid, editIndex, document.getElementById('addTxt').value, document.getElementById('title').value);
      getContent().then((userNotes) => display(userNotes));
      document.getElementById("addTxt").value = "";
      document.getElementById("title").value = "";
    }
    else {
      console.log("Flag =1");
      saveNoteWithTitle(titleTxt.value, addTxt.value).then(async res => {
        document.getElementById("addTxt").value = "";
        document.getElementById("title").value = "";
        getContent().then((userNotes) => display(userNotes));
      })
        .catch(err => console.log(err))
    }
  }
});

async function display(userNotes) {
  let html = "";
  //const userNotes = await diaryRef.get();
  if(userNotes)
  Object.keys(userNotes).forEach((index) => {
    html += `
    <div class="noteCard  card my-2 mx-2" >
      <div class="card-body">
        <h5 class="card-title">${userNotes[index].title}</h5>
        <p class="card-text">${userNotes[index].content} </p>    
            <button id="${index}" onclick = "deleteThis(${index})" class="deleteBtn btn btn-primary">Delete</button>
            <button id="${index}" onclick = "editThis(${index})" class="editBtn btn btn-primary">Edit</button>
      </div>
    </div>
`;
  });
  let notesElm = document.getElementById("notes");
  notesElm.innerHTML = html;
}



async function saveNoteWithTitle(title, content) {
  let upd =
  {
    title,
    content
  }
  return await diaryRef.update({
    [Date.now()]: upd
  })
}

async function getContent() {
  const userNotes = await diaryRef.get()
  //console.log(userNotes.exists())
  if (userNotes.exists()) return userNotes.val()
  else {
    let notesElm = document.getElementById("notes")
    notesElm = "Nothing to show.. Get started..."
    return;
  }
}

let signoutBtn = document.getElementById("signoutBtn");
signoutBtn.addEventListener("click", (e) => {
  firebase.auth().signOut().then(() => {
    window.alert("Logged out successfully");
  }).catch((error) => {
    console.log(error);
  });
})

function deleteThis(index) {
  //console.log(index);
  var delRef = db.ref('diary/' + uid + '/' + index);
  delRef.remove().then(function () {
    getContent().then((userNotes) => display(userNotes)).catch(err => handleError(err))
    //CKEDITOR.instances["addTxt"].setData('');
  })
    .catch((err) => console.log(err.message));
  //console.log("Delete called");
}

async function editThis(index) {

  window.scrollTo(0, 0);
  var editRef = db.ref('diary/' + uid + '/' + index);
  editRef.get().then(snapshot => {
    if (snapshot.exists) {
      var currentValue = snapshot.val();
      document.getElementById('title').value = currentValue.title;
      document.getElementById('addTxt').value = currentValue.content;
      flag = 0;
      editIndex = index;
      
      // var userNotes = getContent();
      // if (userNotes.exists) {
      //   Object.keys(userNotes)[index].content = currentValue.content;
      //   Object.keys(userNotes)[index].title = currentValue.title;
      // }
    }
  })
    .catch(err => console.log(err));
  flag = 1;
}

function updateData(userId, entryIndex, newContent, newTitle) {
  console.log(newContent , newTitle);
  let updates = {
    ['diary/' + userId + '/' + entryIndex + '/' + 'title']: newTitle,
    ['diary/' + userId + '/' + entryIndex + '/' + 'content']: newContent,
  }
  return firebase.database().ref().update(updates, console.log("Update function entered"));
}