// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    test("Testing musicians endpoint status code", async () => {
        // Sends request to `/musicians` endpoint
        const response = await request(app).get("/musicians");
        expect(response.statusCode).toBe(200);
    })

    test("Testing musicians endpoint", async () => {
        // Sends request to `/musicians` endpoint
        const response = await request(app).get("/musicians");
        const responseData = JSON.parse(response.text);
        //console.log(responseData)
        expect(responseData.length).toBe(3)
        expect(responseData[0].id).toBe(1)
        expect(responseData[0].name).toBe("Mick Jagger")
    })
})
