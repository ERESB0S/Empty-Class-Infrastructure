let sended = false;

module.exports = class {
	constructor(client) {
		this.client = client;
	}

	run(message) {
		const eresbos = this.client.config.prefix;
		if (!eresbos || message.author.bot) return;

		let args = message.content.substring(eresbos.length).trim().split(" ");
		const commandName = args[0].toLowerCase();
		args = args.splice(1);
		
		const command = this.client.commands.get(commandName) || this.client.aliases.get(commandName);
		if (command) {
			if (!command.conf.enabled) return message.channel.send(`${message.member.toString()}, bu komut devre dışı bırakılmıştır!`).then(e => e.delete({ timeout: 10000 }));
			if (!message.guild) return;
			const cooldown = command.conf.cooldown || 5000;
			const cd = this.client.cooldown.get(message.author.id);
			if (cd) {
				const diff = Date.now() - cd.lastUsage;
				if (diff < cooldown)
				if (!sended) {
					sended = true;
					message.channel.send(`Tekrar komut kullanmak için **${Number(((cooldown - diff) / 1000).toFixed(2))} saniye** beklemelisin!`).then(async (e) => {
						await e.delete({ timeout: (cooldown - diff)});
						await this.client.cooldown.delete(message.author.id);
					});
				}
			} else {
				this.client.cooldown.set(message.author.id, { cooldown, lastUsage: Date.now() });
				command.run(this.client, message, args);
			}
		}
	}
};
