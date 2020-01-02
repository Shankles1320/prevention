const express = require("express");
const session = require("express-session");
require("dotenv").config();
const { register, login, logout, userSession } = require("./authCon");

const { register, login, logout, userSession } = require("./authcon");
const app = express();
const { SESSION_SECRET, CONNECTION_STRING } = process.env;
app.use(express.json());
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxage: 1000 * 60 * 60 * 24 * 14
		}
	})
);

massive(CONNECTION_STRING).then((db) => {
	console.log("db online");
	app.set("db", db);
});

//login endpoints
app.post("/api/welcome", login);
app.post("/api/registration", register);
app.post("/api/goodbye", logout);
app.get("/api/user", userSession);

const port = 4500;

app.listen(port, () => console.log(`Gettin SCHWIFTY on ${port}`));
