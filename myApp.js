
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
    person.save((err, updatedPerson) => done(err, updatedPerson));
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {
      name: personName
    },
    {
      age: ageToSet
    },
    {
      new: true
    },
    (err, updatedPerson) => done(err, updatedPerson)
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson) => {
    done(err, deletedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove}, (err, result) => {
    done(err,result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select('-age').exec((err, data) => done(err,data));
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
