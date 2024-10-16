// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");
const syncSeed = require("./seed.js");

beforeAll(async () => {
    await syncSeed()
    const musicians = await Musician.findAll({});
    restQuantity = musicians.length;
});


describe('Testing ./musicians endpoint', () => {
    test("Testing musicians endpoint status code", async () => {
        // Sends request to `/musicians` endpoint
        const response = await request(app).get("/musicians");
        expect(response.statusCode).toBe(200);
    })

    test("Testing GET /musicians", async () => {
        const response = await request(app).get("/musicians");
        const responseData = JSON.parse(response.text);
        //console.log(responseData)
        expect(responseData.length).toBe(6)
        expect(responseData[0].id).toBe(1)
        expect(responseData[0].name).toBe("Mick Jagger")
    })

    test("Testing GET /musicians/:id", async () => {
        const response = await request(app).get("/musicians/1");
        //console.log(response.body)
        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,
                name: "Mick Jagger",
                instrument: "Voice"
            })
        );
    })

    test("Test for POST /musicians", async () => {
        const response = await request(app)
            .post("/musicians")
            .send({name: "Taylor Swift", instrument: "Voice"});
        expect(response.body.length).toEqual(restQuantity + 1)
        expect(response.body[6].name).toBe("Taylor Swift")
    })

    test("Test for PUT /musicians/:id", async () => {
        const response = await request(app)
            .put("/musicians/1")
            .send({name: "Taylor Swift", instrument: "Voice"});
            const musician = await Musician.findByPk(1)
        expect(musician.name).toBe("Taylor Swift")
    });

    test("Test for DELETE /musicians/:id", async () => {
        const response = await request(app)
            .delete("/musicians/1");
        const musicians = await Musician.findAll()
        expect(musicians.length).toBe(restQuantity)
        expect(musicians[0].id).not.toBe(1)
    });


})
