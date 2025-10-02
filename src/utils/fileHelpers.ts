import * as fs from 'fs';
import * as path from 'path';

/**
  * Returns a map of file types to extensions.
  * The map is loaded from mappings.json in the commands directory.
  * If the file does not exist, an empty map is returned.
  * 
  * @returns {Record<string, string[]>} A map of file types to extensions.
  */
export function getFileTypeToExtensionMap(): Record<string, string[]> {
    const mappingPath: string = path.join(__dirname, "../data", "mappings.json");
    if (fs.existsSync(mappingPath)) {
        const data: string = fs.readFileSync(mappingPath, "utf8");
        return JSON.parse(data);
    }
    return {};
}
