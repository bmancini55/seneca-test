# seneca-test
Testing playground for Seneca Microservices.  This code is written in ES6 Javascript and makes ure of Babel to perform real-time transpiling.  Each Microservice uses npm scripts to execute.  To locally run any of the services simply execute `npm start` in the project root.

## Services
This project contains a number of Microservices:

1) meshbase - provides an entry point for meshnetworking. In Seneca, the SWIM networking implementation requires an entry point into the network.  The Meshbase node acts as this entry point.
2) registry - this service will report the network status to a database for visual representation and management. Currently, other nodes connect to it and register their presense.  This heartbeating approach is not needed with mesh enabled.
3) comics-metadata - this service reads from a mongodb instance and provides standard query responds
4) comics-iamges - this service grabs file bytes from an HTTP address and returns the file metadata or the file bytes

## Docker
The example also makes use of Docker. 

A base image must be created from node:4.2.6.  To create this image navigate to the project root path and execute:
```
docker build -t seneca:base .
```

To setup the other microservices execute the following:
```
-- seneca:meshbase
cd src/meshbase
docker build -t seneca:meshbase .
```
```
-- seneca:registry
cd src/registry
docker build -t seneca:registry .
```

```
-- seneca:comics-metadata
docker buld -t seneca:comics-metadata .
```

Once the images have been built you can execute the infrastructure by executing the following:
```
docker run -it --rm seneca:meshbase
docker run -it --rm sencea:registry
docker run -it --rm seneca:comics-metadata
```

This will attach each of the microservices to the bridged network in `172.17.0.0` subnet.
