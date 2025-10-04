import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { getFileTypeToExtensionMap } from "../utils/fileHelpers";

export async function removeFile() {
    try {
        const data: Record<string, string[]> = getFileTypeToExtensionMap();
        const fileTypes: string[] = Object.keys(data);

        if (fileTypes.length === 0) {
            vscode.window.showInformationMessage("No file type mappings found.");
            return;
        }

        // Let user pick multiple file types
        const selected: string[] | undefined = await vscode.window.showQuickPick(fileTypes, {
            canPickMany: true,
            placeHolder: "Select file type to remove from global recommendations"
        });

        if (!selected || selected.length === 0) {
            vscode.window.showInformationMessage("No file type selected.");
            return;
        }

        // Confirm before deleting
        const confirm: string | undefined = await vscode.window.showWarningMessage(
            `Remove mappings for: ${selected.join(", ")}?`,
            { modal: true },
            "Yes", "Cancel"
        );
        if (confirm !== "Yes") return;

        for (const file of selected) {
            delete data[file];
        }

        const mappingPath: string = path.join(__dirname, "../data", "mappings.json");
        fs.writeFileSync(mappingPath, JSON.stringify(data, null, 2));
        vscode.window.showInformationMessage(`Removed mappings for: ${selected.join(", ")}`);

    } catch (error: any) {
        console.error("Error removing file type mapping:", error);
        vscode.window.showErrorMessage(`Error removing file type mapping: ${error.message || error}`);
    }
}
