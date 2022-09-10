// Require the necessary discord.js classes
import { Client, GatewayIntentBits, Events } from "discord.js";
import { token } from "../config.json";
import { parse, Syntax } from "@textlint/markdown-to-ast";
import { compressToEncodedURIComponent } from "lz-string";

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
  if (message.author.id === client.user?.id) {
    return;
  }

  const result = parse(message.content);
  const codeblocks = result.children
    .filter((node: any) => node.type === Syntax.CodeBlock)
    .map((node: any) => node.value);

  if (codeblocks.length > 0) {
    const code = codeblocks.join("\n");
    const compressed = compressToEncodedURIComponent(code);
    console.log(`https://www.typescriptlang.org/play?#code/${compressed}`);

    const thread = await message.startThread({
      name: "TypeScript Playground",
    });

    const botMessage =
      "Here is a link to the TypeScript Playground with your code \n";

    thread.send(
      botMessage + `https://www.typescriptlang.org/play?#code/${compressed}`
    );
  }
});

client // Login to Discord with your client's token
  .login(token);
