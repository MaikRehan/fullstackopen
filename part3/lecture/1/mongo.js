const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]


const url = `mongodb://maikrehan:${password}@ac-crafurz-shard-00-00.4oe0m33.mongodb.net:27017,ac-crafurz-shard-00-01.4oe0m33.mongodb.net:27017,ac-crafurz-shard-00-02.4oe0m33.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-qabzc7-shard-0&authSource=admin&appName=Cluster0`
mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is easy',
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})