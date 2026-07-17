const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose.set('strictQuery', false)

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const main = async () => {
    await mongoose.connect(config.MONGODB_URI)

    await new Note({ content: 'HTML is easy', important: true }).save()
    await new Note({ content: 'Browser can execute only JavaScript', important: true }).save()
    console.log('notes saved!')

    const notes = await Note.find({})
    notes.forEach((note) => {
        console.log(note)
    })

    await mongoose.connection.close()
}

main()