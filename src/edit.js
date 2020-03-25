import { initializeEditPage, generateLastEdited } from './views'
import { updateNote, removeNote } from './notes';

const titleEl = document.querySelector('#note-title')
const bodyEl = document.querySelector('#note-body')
const timeInfoEl = document.querySelector('#last-edited')
const removeBtn = document.querySelector('#remove-note')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

titleEl.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    timeInfoEl.textContent = generateLastEdited(note.editedAt)
})

bodyEl.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    timeInfoEl.textContent = generateLastEdited(note.editedAt)
})

removeBtn.addEventListener('click', () => {
    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})