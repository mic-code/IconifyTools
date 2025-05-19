import { readFile, writeFile } from "node:fs/promises";
import { locate } from "@iconify/json";
import { IconSet } from "@iconify/tools";
import { IconifyJSON } from "@iconify/types";

(async function ()
{
	const icons = ["ri"];

	icons.forEach(async (prefix)=>
	{
		const filename = locate(prefix);
		console.log(filename);

		const iconJson = JSON.parse(await readFile(filename, "utf8")) as IconifyJSON;
		const iconSet = new IconSet(iconJson);
		await iconSet.forEach(async (name) => {
			const svg = iconSet.toString(name);
			if (!svg) {
				return;
			}

			// Save to file
			await writeFile(`output/${name}.svg`, svg, "utf8");
			// console.log(`Saved output/${name}.svg (${svg.length} bytes)`);
		});
	});
}
)().catch(err => {
	console.error(err);
});
