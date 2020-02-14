
# Contribution System

## Prerequisites
1. Install Node.js latest

2. Install Mongodb latest

3. Clone this repository:

		https://github.com/AndriIstiawan/JSON_Web_Service.git
		

## How to build
1. Change directory to one of the sample folders, e.g. platform-backend:

		cd JSON_Web_Service/

2. Install the sample's dependencies (see the sample's README for details):

		npm install

3. Run the sample:

		node index.js

## Run with Dokcer
1. build docker image

		docker image build -t json_web_service:1.0 .
		
2. publish image to docker container

		docker container run --publish 8000:8080 --detach --name bb json_web_service:1.0

3. run app

		localhost:8000
  

## API Usage

### Contributor

1. Get Person

	`GET` request ke `http://localhost:4000/api/v1/person`


# Testing Code

1. lakukan perintah untuk menjalankan test
  

## Run all test

1. npm run test

	perintah ini di jalankan untuk melakukan run test.
  

## History

  

TODO: Write history

  

## Author

* Andri
  

TODO: Write credits

  

## License

  

TODO: Write license