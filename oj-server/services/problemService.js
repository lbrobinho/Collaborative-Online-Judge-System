const ProblemModel = require('../models/problemModel');

const getProblems = function() {
    // since we will store problems in database later
    // we need promise to handle asynchronous call
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, function(err, problems) {
            if(err) {
                reject(err);
            } else {
                resolve(problems);
            }
        });
    });
}

// get problem by ID
const getProblemById =  function(id) {
    return new Promise((resolve, reject) => {
        // {id: id}: find problem whose id matches input id
        // findOne: find one item
        ProblemModel.findOne({id: id}, function (err, problem) {
            if(err) {
                reject(err);
            } else {
                resolve(problem);
            }
        })
    });
}

//add problem
const addProblem = function(newProblem) {
    // check if the problem exists
    return new Promise((resolve, reject) => {
        // check if the problem is already in the db
        ProblemModel.findOne({name: newProblem.name}, function (err, data) {
            if(data) {
                // if we find data, the problem exists
                reject("Problem name already exists")
            } else {
                // save the problem to mongodb
                // count: get the number of problems already in db
                ProblemModel.count({}, function (err, num) {
                    newProblem.id = num + 1;
                    // create mongodb object
                    let mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save();
                    resolve(mongoProblem);
                })
            }
        })
    });
}

module.exports = { getProblems, getProblemById, addProblem }
