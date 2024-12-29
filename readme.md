<h1 align="center"> Task Manager API </h1>
<p>
	Technical test for backend Node.js
</p>

## Thoughts

First of all, I want to explain my thought process, which was largely based (though not entirely) on what I learned from reading the well-known book "Clean Architecture" by Uncle Bob, and of course, the principles of DDD (Domain-Driven-Design). Initially, I considered this solution somewhat risky to implement as it takes a considerable amount of energy to plan what will be structured in the code. However, despite everything, I feel very proud of the result. I tried to focus more on the scalability of the project and making it Framework-Agnostic, as well as on the quality of the tests, both Unit-tests and Integration-tests.

## Philosophy

The philosophy behind this solution is to have a project that is highly maintainable and extensible over time as functionalities grow, and of course, to follow the most important aspects of the SOLID principles.

## Architecture

<img src="./assets/onion-architecture.png"  alt="onion-architecture"/>

## Installation

You must have [node.js](https://nodejs.org/en/) installed to run the project.

## env variables
check the varibles in the .env.example file

## How to run the project

### Clone the repository

```bash
	git clone https://github.com/JorgeDuranAlcala/task-manager-api.git
```

### Environment variables (OPTIONAL)

Optionally, you can create a .env file in which to add environment variables such as the API version

```bash
	API_VERSION=1
```

### Important

The routes will change depending on whether you decided to add the .env file. If you did not add the API_VERSION variable in the .env, the route will be as follows by default:

```bash
[domain-name | http://localhost:4000]/api/v1/
```

### Install dependencies

```bash
npm install
```

## Initialization

```bash
	npm run start:dev
```

## API Documentation 

```bash
[domain-name | http://localhost:4000]/api-docs
```

## Production

```bash
	npm run start
```

## Run tests

```bash
	npm run test
```

## External dependencies

- compression
- jest
- supertest
- uuid
- cross-env
- class-transformer
- class-validator
- express
- ts-node
- helmet
- reflect-metadata
- ts-node

```
