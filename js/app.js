const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

let noteCount = 0; // track the number of notes created

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];

    notes.forEach((note) => {
        data.push(note.value);
    });

    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
};

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");

    // Only add trash icon for notes after the first one
    const isFirstNote = noteCount === 0;

    note.innerHTML = `
        <div class="tool">
            <i class="save fa-solid fa-floppy-disk"></i>
            ${isFirstNote ? "" : '<i class="trash fa-solid fa-trash"></i>'}
        </div>
        <textarea>${text}</textarea>
    `;

    if (!isFirstNote) {
        note.querySelector(".trash").addEventListener("click", () => {
            note.remove();
            saveNotes();
        });
    }

    note.querySelector(".save").addEventListener("click", () => {
        saveNotes();
    });

    note.querySelector("textarea").addEventListener("input", () => {
        saveNotes(); // autosave on typing
    });

    main.appendChild(note);
    noteCount++;
    saveNotes();
};

addBtn.addEventListener("click", () => {
    addNote();
});

// IIFE: Load notes on page load
(function () {
    const lsnotes = JSON.parse(localStorage.getItem("notes") || "[]");

    if (lsnotes.length === 0) {
        // No saved notes, add one blank note
        addNote();
    } else {
        // Load saved notes
        lsnotes.forEach((lsnote) => {
            addNote(lsnote);
        });
    }
})();

