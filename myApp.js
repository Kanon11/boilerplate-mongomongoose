const mongoose = require('mongoose');


require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

let Person = require('./models/Person');
// let Person;

const createAndSavePerson = (done) => {
  const document = new Person({ name: "Kpol", age: 30, favoriteFoods: ['mango', 'orange', 'apple'] })
  document.save((err,data) => {
    if (err) {
     return done(err);
    } 
      done(null , data);
    
  });



};

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })

};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
   Person.findOne({ favoriteFoods: food }, (err,data)=> {
     if (err) {
       return done(err);
     }
     done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  })
  // done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err,personObj)=> {
  if (err) {
    done(err);
    }
    personObj.favoriteFoods.push(foodToAdd);
    personObj.save((err, data) => {
      if (err) {
        // Check for duplicate key error or other errors
        if (err.code === 11000 || err.code === 11001) {
          console.log("Duplicate key error:", err.message);
          return done(new Error("Duplicate key error"));
        }
        return done(err);
      }
      done(null, data);
    })
  });

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet },{new:true} ,(err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  })
};

const removeManyPeople =  (done) => {


  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if (err) {
      done(err)
    }
    console.log("first: ",data)
    done(null, data);
 })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};
// createManyPeople([{ name: 'Mary', age: 1 }, { name: 'Mary', age: 2 }], (err, response) => {
//   if (err) {
//     console.log(err)
//   }
//   else {
//     console.log("Many people: ", response);
//   }
// })
// removeManyPeople((err, response) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("Deletion Response:", response);
//   }
// })
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
