const bcrypt = require("bcrypt");

module.exports = {
	register: async (req, res, next) => {
		const { email, password, username } = req.body;
		const db = req.app.get("db");

		const foundUser = await db.findUserByEmail(email);

		if (foundUser.length) {
			res.status(200).send("That Email is Already In Use");
		} else {
			const saltRounds = 12;
			const salt = await bcrypt.genSalt(saltRounds);
			const hashedPassword = await bcrypt.hash(password, salt);
			const newUser = await db.createUser([email, hashedPassword, username]);
			req.session.user = newUser[0];
			res.status(200).send(req.session.user);
		}
	},
	login: async (req, res, next) => {
		const { email, password } = req.body;
		const db = req.app.get("db");
		const foundUser = await db.findUserByEmail(email);
		if (!foundUser.length) {
			res.status(404).send("You are Not Registered");
		} else {
			const authenticated = await bcrypt.compare(
				password,
				foundUser[0].password
			);
			if (authenticated) {
				req.session.user = {
					email: foundUser[0].email,
					id: foundUser[0].id,
					username: foundUser[0].username
				};
				res.status(200).send(req.session.user);
			} else {
				res.status(401).send("Not Your Session");
			}
		}
	},
	logout: (req, res, next) => {
		req.session.destroy();
		res.status(200).send("Sorry you hace been logged out");
	},
	userSession: (req, res, next) => {
		res.status(200).send(req.session.user);
	}
};
