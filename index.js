const Eresbos = require("./classes/Eresbos");
const client = new Eresbos();

client.loadEvents();
client.loadCommands();
client.login(client.config.token);
