const router = require("express").Router();
const shortid = require("shortid");
const fs = require("fs");
const path = require("path");
const dbLocation = path.resolve("src", "data.json");

router.post("/player", async (req, res) => {
	const player = {
		...req.body,
		id: shortid.generate(),
	};
	const data = await fs.readFileSync(dbLocation);
	const players = JSON.parse(data);
	players.push(player);
	await fs.writeFileSync(dbLocation, JSON.stringify(players));
	res.status(200).json(player)
});

router.get("/players", async (req, res) => {
	const data = await fs.readFileSync(dbLocation);
	const players = JSON.parse(data);
	res.status(201).json(players);
});

router.get("/player/:id", async (req, res) => {
	const id = req.params.id;
	const data = await fs.readFileSync(dbLocation);
	const players = JSON.parse(data);
	const player = players.find((item) => {
		return item.id === id;
	});
	if (!player) {
		res.status(404).json({
			message: "Player Not Found!"
		});
	}
	res.status(201).json(player);
});

router.patch("/player/:id", async (req, res) => {
	const id = req.params.id;
	const data = await fs.readFileSync(dbLocation);
	const players = JSON.parse(data);
	const player = players.find((item) => {
		return item.id === id;
	});
	
	if (!player) {
		res.status(404).json({
			message: "Player Not Found!"
		});
	}

	player.name = req.body.name || player.name;
	player.country = req.body.country || player.country;
	player.rank = req.body.rank || player.rank;
	await fs.writeFileSync(dbLocation, JSON.stringify(players));
	res.status(200).json(player)
});

router.put("/player/:id", async (req, res) => {
	const id = req.params.id;
	const data = await fs.readFileSync(dbLocation);
	const players = JSON.parse(data);
	
	let player = players.find((item) => {
		return item.id === id;
	});
	
	if (!player) {
		player = {
			...req.body,
			id: shortid.generate(),
		};
		players.push(player);
	} else {
		player.name = req.body.name;
		player.country = req.body.country;
		player.rank = req.body.rank;
	}
	
	await fs.writeFileSync(dbLocation, JSON.stringify(players));
	res.status(200).json(player);
});

router.delete("/player/:id", async (req, res) => {
	const id = req.params.id;
	const data = await fs.readFileSync(dbLocation);
	const players = JSON.parse(data);
	const player = players.find((item) => {
		return item.id === id;
	});
	
	if (!player) {
		res.status(404).json({
			message: "Player Not Found!"
		});
	}

	const newPlayers = players.filter((item) => {
		return item.id !== id;
	});
	await fs.writeFileSync(dbLocation, JSON.stringify(newPlayers));
	res.status(203).send();
});

module.exports = router;