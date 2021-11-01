module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(client) {
    client = this.client;
    await client.user.setPresence({ activity: { name: "deneme", type: "LISTENING" }, status: "idle" });
  }
};
