// Require the necessary discord.js classes
import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import { token } from "../config.json";
import { parse } from "@textlint/markdown-to-ast";
import {
  createEmbed,
  getBotMessage,
  getCodeblocks,
  getTypescriptPlaygroundUrl,
} from "./lib";

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", async (message) => {
  //Ensure the message is not from the bot
  if (message.author.id === client.user?.id) {
    return;
  }

  console.log({ message });

  const ast = parse(message.content);
  const codeblocks = getCodeblocks(ast.children);

  if (codeblocks.length > 0) {
    const code = codeblocks.join("\n");
    const url = getTypescriptPlaygroundUrl(code);

    const thread = await message.startThread({
      name: `${message.author.username}'s Playground`,
    });
    const embed = createEmbed(url);

    thread.send({ embeds: [embed] });
  }
});

client // Login to Discord with your client's token
  .login(token);
