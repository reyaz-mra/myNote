const addButton = document.querySelector("#add");

const updateLSData = () => {
    const textAreaData = document.querySelectorAll("textarea");
    const notes = [];
    window.location.reload();
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });

    localStorage.setItem("notes",JSON.stringify(notes));
}
// Add new note

const addNewNote = (text=' ') => {

    const note = document.createElement("div");
    note.classList.add("note");

    const htmlData = `
    <div class="operation">
        <button class="paint"><i class="fas fa-palette"></i></button>
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"> </div>
    <textarea  class="${text ? "hidden" : ""}"></textarea>`;

    note.insertAdjacentHTML("afterbegin",htmlData);

    //getting the referncess

    const editButton = note.querySelector(".edit");
    const delButton = note.querySelector(".delete");
    const mainDiv = note.querySelector(".main");
    const textArea = note.querySelector("textarea");
    const paintC = note.querySelector(".paint");

    //deleting the node

    delButton.addEventListener("click", ()=>{
        note.remove();
        updateLSData();
    })

    //toggle usiing edit button
    textArea.value = text;
    mainDiv.innerHTML = text;
    

    editButton.addEventListener("click", ()=>{
        mainDiv.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
        
    })
    

    textArea.addEventListener('change', (event) =>{
        const value = event.target.value;
        mainDiv.innerHTML = text;

        updateLSData();
    })


    document.body.appendChild(note);
}
//getting back data from local storage

const notes = JSON.parse(localStorage.getItem("notes"));

if(notes){ notes.forEach((note) => addNewNote(note))};

addButton.addEventListener("click", () => {
    addNewNote();
} );

    