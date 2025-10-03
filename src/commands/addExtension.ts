import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { getFileTypeToExtensionMap } from '../utils/fileHelpers';

export async function addExtension() {
    try {
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showWarningMessage("No workspace open.");
            return;
        }

        const mappingPath = path.join(__dirname, "../data", "mappings.json");
        const currentMapping = getFileTypeToExtensionMap();

        let ext = (await vscode.window.showInputBox({ prompt: "Enter file extension (e.g., .py)" }))?.trim();
        if (!ext) return;
        if (!ext.startsWith('.')) {
            ext = '.' + ext;
        }
        if (ext.slice(1).includes('.')) {
            vscode.window.showErrorMessage("Please enter a valid file extension (e.g., .js, .ts, .py).");
            return;
        }

        // Get all installed extensions
        const choices = vscode.extensions.all.map(e => ({
            label: e.packageJSON.displayName || e.id,
            description: e.id
        }));

        // Let user pick multiple extensions
        const selected = await vscode.window.showQuickPick(choices, {
            canPickMany: true,
            placeHolder: "Select extensions for this file type"
        });

        if (!selected || selected.length === 0) return;

        // Save the mapping
        currentMapping[ext] = selected.map(s => s.description);
        vscode.window.showInformationMessage(`Mapped ${ext} to ${currentMapping[ext].join(", ")}`);

        fs.mkdirSync(path.join(__dirname, "../data"), { recursive: true });
        fs.writeFileSync(mappingPath, JSON.stringify(currentMapping, null, 2));
        vscode.window.showInformationMessage(`Mapping updated for ${ext}`);
    } catch (error) {
        console.error("Error adding extension:", error);
        vscode.window.showErrorMessage(`Error adding extension: ${error}`);
    }
}
