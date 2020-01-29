
# Contribution System

## Prerequisites
1. Install Node.js latest

2. Install Mongodb latest

3. Clone this repository:

		https://gitlab.com/istiawan/contributor-system.git
		

## How to build
1. Change directory to one of the sample folders, e.g. platform-backend:

		cd contributor-system/

2. Install the sample's dependencies (see the sample's README for details):

		npm install

3. Run the sample:

		node index.js

  

## API Usage


### Generator

1. CREATE (melakukan registrasi) user baru

	`POST` request ke `http://localhost:4000/api/v1/generator/register`

	dengan form berisi:

	* username

	* password

	* email

  

2. LOGIN

	`POST` request ke `http://localhost:4000/api/v1/generator/login`

	dengan form berisi:

	* username

	* password


3. NEW_LINK

	`POST` request ke `http://localhost:4000/api/v1/generator/new-link`
  

### Contributor

1. CREATE contribution

	`POST` request ke `http://localhost:4000/api/v1/contributor/<uniq-link>`

	dengan form berisi:

	* email


# Testing Code

1. lakukan perintah untuk menjalankan test
  

## Run all test

1. npm run test

	perintah ini di jalankan untuk melakukan run unit-test.

  

## History

  

TODO: Write history

  

## Author

* Andri
  

TODO: Write credits

  

## License

  

TODO: Write license