import * as path from "path";

import { openFile } from "../utils/fileHelpers";

/**
  * Opens the file type to extension mapping file in the VS Code editor.
  * The file is located in the data directory of the extension.
  * If the file does not exist, an error message is shown.
  */
export function showRecommendations() {
    openFile(path.join(__dirname, "../data", "mappings.json"));
}
