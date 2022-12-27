const chai = require('chai');
const request = require('supertest');
const { server } = require('../../src/server');
const { baseurl } = require('../base');
const db = require('../../src/models/index');
const jwt = require("jsonwebtoken");

const { expect } = chai;

