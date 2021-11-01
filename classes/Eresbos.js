const { Intents, Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = class Eresbos extends Client {
	constructor() {
		super({ fetchAllMembers: true, ws: { intents: Object.values(Intents.FLAGS) } });
		this.config = require("../config.json");
		this.commands = new Collection();
		this.aliases = new Collection();
		this.cooldown = new Map();
	}

	login(token) {
		super.login(token).then(() => console.log("[Bot] Bot connection successfully established!")).catch((err) => console.log(`[Bot] An error occurred while establishing the bot connection! \nError: ${err}`));
		return this;
	}

	loadCommands() {
		readdirSync("./commands").forEach(dir => {
			const commandsFiles = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith("js"));
			for (const file of commandsFiles) {
				const command = new (require(`../commands/${dir}/${file}`))(this);
				this.commands.set(command.conf.name, command);
				console.log(`[Command] ${file.replace(".js", "")} command loaded.`);
				command.conf.aliases.forEach((aliases) => this.aliases.set(aliases, command));
			}
		});
		return this;
	}

	loadEvents() {
		readdirSync("./events").forEach((file) => {
			const event = new (require(`../events/${file}`))(this);
			super.on(file.split(".")[0], (...args) => event.run(...args));
			console.log(`[Event] ${file.replace(".js", "")} event loaded.`);
		});
		return this;
	}
};
