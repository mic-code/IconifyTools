import { readFile, writeFile, mkdir } from "node:fs/promises";
import { locate } from "@iconify/json";
import { IconSet } from "@iconify/tools";
import { IconifyJSON } from "@iconify/types";

(async function ()
{
	const icons = ["line-md"];

	icons.forEach(async (prefix)=>
	{
		const filename = locate(prefix);
		console.log(filename);

		const iconJson = JSON.parse(await readFile(filename, "utf8")) as IconifyJSON;
		const iconSet = new IconSet(iconJson);
		await iconSet.forEach(async (name) => 
		{
			const svg = iconSet.toString(name);
			if (!svg)
				return;

			const directory = `output/${prefix}`;
			await mkdir(directory, { recursive: true });
			await writeFile(`${directory}/${name}.svg`, svg, "utf8");
		});
	});
}
)().catch(err => {
	console.error(err);
});
