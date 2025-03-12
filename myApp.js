
require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Erfolgreich mit MongoDB verbunden!"))
.catch(err => console.error("Fehler beim Verbinden mit MongoDB:", err));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  favoriteFoods:{
    type: [String],
    required: false
  }
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {

  const person = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Burger']
  });
  
  person.save((err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople).then(savedPeople => done(null, savedPeople)).catch(err => done(err));
  
}

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => done(err,data));
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food}, (err, data) => done(err,data));
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err,data) => done(null,data));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    person.favoriteFoods.push(foodToAdd);
    person.save((updatedPerson) => done(updatedPerson));
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
