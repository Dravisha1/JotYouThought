// let addBtn = document.getElementById('addBtn');
// let notesObj = [];
// let titleObj = [];
// addBtn.addEventListener("click", function (e) {
//     let titleTxt = document.getElementById('title');
//     let titles = localStorage.getItem("titles");
//     if (titles !== null) {
//         titleObj = JSON.parse(titles);
//     }
//     titleObj.push(titleTxt.value);
//     localStorage.setItem("titles", JSON.stringify(titleObj));
//     titleTxt.value = "";
//     let addTxt = document.getElementById("addTxt");
//     let notes = localStorage.getItem("notes");  //gets any item named notes in the local storage
//     if (notes !== null) {
//         notesObj = JSON.parse(notes);
//     }
//     notesObj.push(addTxt.value);
//     localStorage.setItem("notes", JSON.stringify(notesObj)); //Because local storage stores only strings    
//     addTxt.value = "";
//     if ((titleTxt.value !== "") || (addTxt.value !== "")) {
//         console.log("Both fields are mandatory.");
//     };
//     display();
// });

// function display() {
//     let html = "";
//     notesObj.forEach(function (element, index) {
//         html += `
//             <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
//                     <div class="card-body">
//                         <h5 class="card-title">Note ${index + 1}</h5>
//                         <p class="card-text"> ${element}</p>
//                         <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
//                     </div>
//                 </div>`;
//     });
//     let notesElm = document.getElementById("notes");
//     if (notesObj.length != 0) {
//         notesElm.innerHTML = html;
//     } else {
//         notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
//     }
// }
// function deleteThis(index) {
//     notesObj.splice(index, 1);
//     titleObj.splice(index, 1);
//     localStorage.setItem("notes", JSON.stringify(notesObj));
//     localStorage.setItem("titles", JSON.stringify(titleObj));
//     display();
//     console.log("Delete function called");
// }



let addBtn = document.getElementById('addBtn');
let notesObj = [];
let titleObj = [];
display();
addBtn.addEventListener("click", function (e) {
    let titleTxt = document.getElementById('title');
    let addTxt = document.getElementById('addTxt');

    if (titleTxt.value == '' || addTxt.value == '') window.alert("Both fields are mandatory.")
    else {
        let titles = localStorage.getItem("titles");
        if(titles!==null) titleObj = JSON.parse(titles);
        titleObj.push(titleTxt.value);
        localStorage.setItem("titles", JSON.stringify(titleObj));
        titleTxt.value = "";

        let notes = localStorage.getItem("notes");  //gets any item named notes in the local storage
        if(notes !== null) notesObj = JSON.parse(notes);
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj)); //Because local storage stores only strings    
        addTxt.value = "";
    }
    display();
});

function display() {
    let html = "";
    notesObj.forEach((element, index) => {
        console.log(index);
        console.log(titleObj[index]);
        html += `
            <div class="noteCard  card my-2 mx-2" style="width: 18rem;>
            <div class="card-body">
            <h5 class="card-title">${titleObj[index]}</h5>
            
            <p class="card-text">${element} </p>
            <button id="${index}" onclick = "deleteThis(this.id)" class="btn btn-primary">Delete</button>
            </div>
        `;
    })
    let notesElm = document.getElementById('notes');
    notesElm.innerHTML = html;
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        html += `<div id="noNotes" style="color: white; ">Nothing to show.. Get started...</div> `
        notesElm.innerHTML = html;
    }
}

function deleteThis(index) {
    notesObj.splice(index, 1);
    titleObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("titles", JSON.stringify(titleObj));
    display();
    console.log("Delete function called");
}