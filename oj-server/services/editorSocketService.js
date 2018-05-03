var redisClient = require('../modules/redisClient');
const TIMEOUT_IN_SECONDS = 3600;
// export a function
module.exports = function(io) {
    // collaboration sessions
    // record all the participants in each session
    // so that server can send changes to all participants in a session
    var collaborations = {};

    // map from socketId to sessionId
    var socketIdToSessionId = {};

    // Redis can serve different application
    // each application has their own session
    // We also use Redis for our second project
    var sessionPath = '/temp_session';

    // when 'connection' event happends,
    io.on('connection', socket => {
        let sessionId = socket.handshake.query['sessionId'];
        socketIdToSessionId[socket.id] = sessionId;

        // if sessionId is not in collaborations, it means no one does this problem before
        // if(!(sessionId in collaborations)) {
        //     collaborations[sessionId] = {
        //         'participants':[]
        //     };
        // }
        //collaborations[sessionId]['participants'].push(socket.id);

        // when connection,first check in collaborations.
        if(sessionId in collaborations) {
            // add the current socketId to participants
            collaborations[sessionId]['participants'].push(socket.id);
        } else {
            // not in memory, check in redis
            redisClient.get(sessionPath + "/" + sessionId, function (data) {
                if(data) {
                    // if exist in Redis, restore the changes from redis
                    console.log("session terminated previously, get back from redis");
                    collaborations[sessionId] = {
                        'cachedInstructions': JSON.parse(data),
                        'participants': [] // emty, we will add the current participant later
                    }
                } else {
                    // this may be the first time created or expired
                    // create new session
                    console.log('creating new session');
                    collaborations[sessionId] = {
                        'cachedInstructions': [],
                        'participants': []
                    }
                }
                // add the current socket into participants list.
                collaborations[sessionId]['participants'].push(socket.id);
            })
        }

        // socket event listeners
        // delta is the change info
        // it records the row and cloumn of the changes
        socket.on('change', delta => {
         // log, easy for debuging
            console.log("change " + socketIdToSessionId[socket.id] + " " +
                delta);
            // get session id based on socket.id
            let sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                collaborations[sessionId]['cachedInstructions'].push(["change", delta, Date.now()]);
                // get all participants on this session
                let participants = collaborations[sessionId]['participants'];

                // send changes to all participants
                for (let i = 0; i < participants.length; i++) {
                // skip the one who created this change
                    if (socket.id != participants[i]) {
                        io.to(participants[i]).emit("change", delta);
                    }
                }
            } else {
                console.log("could not tie socket id to any collaboration");
            }
        });

        socket.on('restoreBuffer', () => {
            // get sessionId
            let sessionId = socketIdToSessionId[socket.id];
            console.log('restore buffer for session' + sessionId, 'socket id:' + socket.id);

            // first check if the session in memory
            if (sessionId in collaborations) {
                // get the hisorty instructions
                let instructions = collaborations[sessionId]['cachedInstructions'];
                for(let i = 0; i < instructions.length; i++) {
                    // instructions[i][0]: change
                    // instructions[i][1]: change value (delta)
                    socket.emit(instructions[i][0], instructions[i][1]);
                }
            } else {
                console.log('could not find any collcation for the session');
            }
        });

        // disconnect happens when participants close the session.
        socket.on('disconnect', function() {
            let sessionId = socketIdToSessionId[socket.id];
            console.log('disconnect session' + sessionId, 'socket id:' + socket.id);

            let foundAndRemoved = false;

            if(sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                let index = participants.indexOf(socket.id);

                // if find then remove
                if(index >= 0) {
                    // remove the participants
                    participants.splice(index, 1);
                    foundAndRemoved = true;

                    // then check if this is the last participants
                    if(participants.length == 0) {
                        console.log('last participant iin collaboration, committing to redis and remove from memory');
                        let key = sessionPath + '/' + sessionId;
                        // convert JSON object into string
                        let value = JSON.stringify(collaborations[sessionId]['cachedInstructions']);
                        //store int redis
                        redisClient.set(key, value, redisClient.redisPrint);

                        //set expire time
                        redisClient.expire(key, TIMEOUT_IN_SECONDS);
                        delete collaborations[sessionId];
                    }
                }
            }

            if(!foundAndRemoved) {
                // if reach here, debug needed
                console.log("Warning: could not find the socket.id in collaborations");
            }
        })
    })
}