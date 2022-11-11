const supertest = require('supertest');
const request = supertest('http://localhost:3000/api/v1/');

export default request;