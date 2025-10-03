import * as vscode from 'vscode';
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
    try {
        const mappingPath: string = path.join(__dirname, "../data", "mappings.json");
        if (fs.existsSync(mappingPath)) {
            const data: string = fs.readFileSync(mappingPath, "utf8");
            return JSON.parse(data);
        }
        return {};
    } catch (error) {
        console.error("Error reading mappings.json:", error);
        vscode.window.showErrorMessage(`Error reading mappings.json: ${error}`);
        return {};
    }
}

/**
  * Opens a file in the VS Code editor.
  * If the file does not exist, an error message is shown.
  * 
  * @param {string} filePath The path to the file to open.
  */
export async function openFile(filePath: string) {
    try {
        // Open the file as a TextDocument
        const document = await vscode.workspace.openTextDocument(filePath);
        
        // Show it in an editor tab
        await vscode.window.showTextDocument(document, {
            preview: false,
            viewColumn: vscode.ViewColumn.One
        });
    } catch (err) {
        vscode.window.showErrorMessage(`Failed to open file: ${err}`);
    }
}
