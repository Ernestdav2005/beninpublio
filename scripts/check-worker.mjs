import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/worker.js", import.meta.url), "utf8");
const workerForSyntaxCheck = source.replace("export default {async fetch", "const __worker = {async fetch");

try {
  new Function(workerForSyntaxCheck);
} catch (error) {
  console.error("Worker JavaScript syntax error:", error);
  process.exit(1);
}

const inlineScripts = [...source.matchAll(/<script>([\\s\\S]*?)<\\/script>/g)].map((match) => match[1]);
if (inlineScripts.length === 0) {
  console.error("No inline UI scripts found; check the HTML rendering.");
  process.exit(1);
}
for (const [index, script] of inlineScripts.entries()) {
  try {
    new Function(script);
  } catch (error) {
    console.error(`Inline script ${index + 1} syntax error:`, error);
    process.exit(1);
  }
}

const required = [
  'const planLimits=k=>k==="formule_3"?{products:150,images:3}:k==="formule_2"?{products:100,images:3}:{products:30,images:1}',
  'INSERT INTO products(id,shop_id,name,description,price,image_url,image_url_2,image_url_3)',
  'if(p.match(/^\\/api\\/admin\\/shops\\/',
];
for (const fragment of required) {
  if (!source.includes(fragment)) {
    console.error("Required safety/plan logic is missing:", fragment);
    process.exit(1);
  }
}

console.log(`Worker syntax OK; ${inlineScripts.length} inline scripts OK; plan guards found.`);
