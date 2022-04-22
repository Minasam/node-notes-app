const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title === title)
    
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green.inverse('New Note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }

}

const removeNote =  (title) => {
    const notes = loadNotes()
    const filteredNotes = notes.filter((note) => note.title !== title)

    if (notes.length === filteredNotes.length) {
        console.log(chalk.inverse.red('No note found!'))
    } else {
        console.log(chalk.inverse.green('Note removed!'))
        saveNotes(filteredNotes)
    }

}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse("your Notes:"))

    notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.inverse.green('Title: '+ note.title))
        console.log('Body: '+ note.body)
    }else{
        console.log(chalk.inverse.red('Note not found!'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        const notes = JSON.parse(dataJSON)

        return notes
    } catch (e) {
        return []
    }

}

const saveNotes = (notes) => {
    const notesString = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesString)
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}