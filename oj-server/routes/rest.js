const express = require('express'); // import express package
const router = express.Router(); // import router

// bussiness logic put in service
// router helps us to find which service we need
const problemService = require('../services/problemService');

const bodyParser = require('body-parser');
// since the request body is json format, we use json parser to
// parse the body
const jsonParser = bodyParser.json();

// GET all problems
router.get('/problems', (req, res) => {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

//get one problem by given id
router.get('/problems/:id', (req, res) => {
    const id = req.params.id;
    problemService.getProblemById(+id)
        .then(problem => res.json(problem));
});

//post problem
router.post('/problems', jsonParser, (req, res) => {
    problemService.addProblem(req.body)
        .then(
            //resolve
            (problems) => {
                res.json(problems);
            },
            //reject
            (error) => {
                res.status(400).send("Problem name already exists");
            }
        )
})

//Node Client
const nodeRestClient = require('node-rest-client').Client;

// for server to call the RESTful API
const restClient = new nodeRestClient();

// Python Flask server listen on port 5000 by default
EXECUTOR_SERVER_URL = 'http://localhost:5000/build_and_run';

//register a method
restClient.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');

// jsonParser: middleware, used to parse the body of the POST request
router.post('/build_and_run', jsonParser, (req, res) => {

    const userCode = req.body.user_code;
    const lang = req.body.lang;

    console.log('lang: ', lang, 'user code: ', userCode);

    // this is the method we registered before
    restClient.methods.build_and_run(
        {
            data: {code: userCode, lang: lang},
            headers: {'Content-Type': 'application/json'}
        },
        (data, response) => {
            // response: raw data, data: parsed response
            const text = `Build output: ${data['build']}, execute output: ${data['run']}`;
            res.json(text);
        }
    )
})

// module is ES5 syntax.
module.exports = router;