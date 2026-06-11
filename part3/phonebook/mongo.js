const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://maikrehan:${password}@ac-crafurz-shard-00-00.4oe0m33.mongodb.net:27017,ac-crafurz-shard-00-01.4oe0m33.mongodb.net:27017,ac-crafurz-shard-00-02.4oe0m33.mongodb.net:27017/phonebookApp?ssl=true&replicaSet=atlas-qabzc7-shard-0&authSource=admin&appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const savePerson = () => {
    const personName = process.argv[3];
    const personNumber = process.argv[4];

    const person = new Person({
        name: personName,
        number: personNumber
    });

    person.save().then(result => {
        console.log(`note saved: {}`, result);
        mongoose.connection.close();
    })
}

const findPeople = () => {
    console.log('phonebook:');
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number);
        })
        mongoose.connection.close();
    })
}

if (process.argv.length === 3) {
    findPeople()
} else if (process.argv.length === 5) {
    savePerson()
} else {
    console.log('error creating person')
}