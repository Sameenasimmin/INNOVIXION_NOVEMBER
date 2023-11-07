// app.js

document.addEventListener("DOMContentLoaded", function () {
    const addNoteButton = document.getElementById("addNote");
    const notesContainer = document.getElementById("notes");
    const noteTitleInput = document.getElementById("noteTitle");
    const noteContentInput = document.getElementById("noteContent");

    let notes = [];

    addNoteButton.addEventListener("click", function () {
        const title = noteTitleInput.value;
        const content = noteContentInput.value;

        if (title && content) {
            createNote(title, content);
            clearInputs();
        }
    });

    function createNote(title, content) {
        const note = {
            title: title,
            content: content
        };

        notes.push(note);
        displayNotes();
    }

    function displayNotes() {
        notesContainer.innerHTML = '';

        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <h4>${note.title}</h4>
                <p>${note.content}</p>
                <button class="btn btn-primary edit-button" data-index="${index}">Edit</button>
                <button class="btn btn-danger delete-button" data-index="${index}">Delete</button>
            `;
            notesContainer.appendChild(noteElement);

            const deleteButton = noteElement.querySelector(".delete-button");
            deleteButton.addEventListener("click", function () {
                deleteNote(index);
            });

            const editButton = noteElement.querySelector(".edit-button");
            editButton.addEventListener("click", function () {
                editNote(index);
            });
        });
    }

    function deleteNote(index) {
        notes.splice(index, 1);
        displayNotes();
    }

    function editNote(index) {
        const noteToEdit = notes[index];
        noteTitleInput.value = noteToEdit.title;
        noteContentInput.value = noteToEdit.content;
        deleteNote(index);
    }

    function clearInputs() {
        noteTitleInput.value = "";
        noteContentInput.value = "";
    }

    displayNotes();
});
