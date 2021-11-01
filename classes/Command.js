module.exports = class Command {
	constructor(client, options) {
		this.client = client;
		this.conf = {
			name: options.name,
			usage: options.usage,
			description: options.description,
			aliases: options.aliases || [],
			enabled: options.enabled,
			cooldown: options.cooldown || 5000
		};
	}
};
