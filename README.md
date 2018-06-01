# Collaborative-Online-Judge-System

    • Implemented a web-based collaborative code editor which supports multiple user editing simultaneously (ACE, Socket.io, Redis);

    • Designed and developed a single-page web application for coding problems (Angular2, Auth0, Node.js, MongoDB);

    • Built a user-code executor service which can build and execute user’s code (Docker, Flask);

    • Refactored and Improved system throughput by decoupling services using RESTful API and loading balancing by Nginx (REST API, Nginx).

## System Overview
![](https://github.com/lbrobinho/Collaborative-Online-Judge-System/raw/master/image/1.JPG)

## System Design Diagram
![](https://github.com/lbrobinho/Collaborative-Online-Judge-System/raw/master/image/2.JPG)

## Development environment
- **AngularJS** is a JavaScript-based open-source front-end web application framework to develop **single-page applications**.
- **Angular CLI** is a command line interface for Angular. We use commands such as **"ng generate"**, **"ng serve"** and so on.
- **Bootstrap** contains HTML- and CSS-based design templates for typography, forms, buttons, **navigation** and other interface components, as well as optional JavaScript extensions.
- **Express** is a node.js web framework with **routing** and **middleware**. It helps us to build node.js server.
- **Nodemon** monitors for any changes in your source and automatically restart your server.
- We need **body-parser** to parse t JSON format request body.
- **Mongoose** is a JavaScript framework that is commonly used in a Node.js application to connect to **MongoDB** database.
- **RxJS** is a set of libraries to compose asynchronous and event-based programs using **observable** collections  in JavaScript.
- **HttpClientModule** let **client** fetch the problem from **server** through API call.
- **Ace** is an embeddable code editor written in JavaScript.
- **socketIO** is to connect the server and the client and synchronous the content on the editor to all clients who are editing the same problem.
- **restoreBuffer** is emitted when user enters a collaboration session, and this event asks server to send back all the cached instructions for the current session.
- **redis** is cache to save current data in a collaboration session.
- **Flask** Flask is a micro web framework written in Python, we use Flask to compile and execute code in **Docker**.
- **Docker** is a container which we compile and execute code insise.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install Redis

```
wget http://download.redis.io/releases/redis-3.2.6.tar.gz
tar xzf redis-3.2.6.tar.gz
cd redis-3.2.6
make
sudo make install
cd utils
sudo ./install_server.sh
```
Install Docker

```
curl -fsSL https://get.docker.com/ | sh
sudo usermod -aG docker $(whoami)
sudo systemctl enable docker
```
### Installing





After install, restart Redis

```
sudo service redis_6379 restart
```


## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Bo Li** - *Initial work* - [lbrobinho](https://github.com/lbrobinho)



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
