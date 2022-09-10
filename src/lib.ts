import { compressToEncodedURIComponent } from "lz-string";
import { Syntax } from "@textlint/markdown-to-ast";

export const getCodeblocks = (node: any) =>
  node
    .filter((node: any) => node.type === Syntax.CodeBlock)
    .map((node: any) => node.value);

export const getBotMessage = (url: string) =>
  "Here is a link to the TypeScript Playground with your code \n" + url;

export const getTypescriptPlaygroundUrl = (code: string) => {
  const compressed = compressToEncodedURIComponent(code);
  return `https://www.typescriptlang.org/play?#code/${compressed}`;
};
