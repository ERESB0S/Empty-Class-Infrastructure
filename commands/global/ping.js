const Command = require("../../classes/Command");

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			name: "ping",
			usage: "ping",
			description: "",
			aliases: ["pong"],
			enabled: true,
			cooldown: 10000
		});
	}

	run(client, message) {
		message.channel.send("Pong!");
	}
};
