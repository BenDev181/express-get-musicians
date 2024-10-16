const express = require("express");
const app = express();
const Musician = require("../../models/Musician.js")
const db = require("../../db/connection.js");
const { where } = require("sequelize");

const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

router.get("/", async (req, res) => {
    let musicians = await Musician.findAll()
    res.json(musicians)
})

router.get("/:id", async (req, res) => {
    let musician = await Musician.findByPk(req.params.id)
    res.json(musician)
})

router.post("/", async (req, res) => {
    const musician = await Musician.create(req.body)
    let musicians = await Musician.findAll()
    res.json(musicians)
})

router.put("/:id", async (req, res) => {
    const updatedMusician = await Musician.update(req.body, {where: {id: req.params.id}});
    let musicians = await Musician.findAll()
    res.json(musicians)
})

router.delete("/:id", async (req, res) => {
    const deletedMusician = await Musician.destroy({where: {id: req.params.id}})
    let musicians = await Musician.findAll()
    res.json(musicians)
})

module.exports = router;