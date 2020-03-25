import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

// Generate the DOM structure for a note
const generateNoteDOM = note => {
  const noteEl = document.createElement('a')
  const titleEl = document.createElement('p')
  const statusEl = document.createElement('p')

  // Setup the link
  noteEl.setAttribute('href', `/edit.html#${note.id}`)
  noteEl.classList.add('list-item')

  // Setup the note title text
  if (note.title.length > 0) {
    titleEl.textContent = note.title
  } else {
    titleEl.textContent = 'Unnamed title'
  }
  titleEl.classList.add('list-item__title')
  noteEl.appendChild(titleEl)

  // Setup the status message
  statusEl.textContent = generateLastEdited(note.updatedAt)
  statusEl.classList.add('list-item__subtitle')
  noteEl.appendChild(statusEl)

  return noteEl
}

// Render application notes
const renderNotes = () => {
  const notesEl = document.querySelector('#notes')
  const filters = getFilters()
  const notes = sortNotes(filters.sortBy)
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  )

  notesEl.innerHTML = ''

  if (filteredNotes.length > 0) {
    filteredNotes.forEach(note => {
      const noteEl = generateNoteDOM(note)
      notesEl.appendChild(noteEl)
    })
  } else {
    const emptyMessage = document.createElement('p')
    emptyMessage.textContent = 'No notes to show'
    emptyMessage.classList.add('empty-message')
    notesEl.appendChild(emptyMessage)
  }
}

const initializeEditPage = noteId => {
  const titleEl = document.querySelector('#note-title')
  const bodyEl = document.querySelector('#note-body')
  const timeInfoEl = document.querySelector('#last-edited')
  const notes = getNotes()
  const note = notes.find(note => note.id === noteId)

  if (!note) {
    location.assign('/index.html')
  }

  titleEl.value = note.title
  bodyEl.value = note.body
  timeInfoEl.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`
}

// Generate the last edited message
const generateLastEdited = timestamp => `Last edited ${moment(timestamp).fromNow()}`

export { generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage }
