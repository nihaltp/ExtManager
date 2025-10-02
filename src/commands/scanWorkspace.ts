import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { getFileTypeToExtensionMap } from '../utils/fileHelpers';

/**
  * Scans the workspace for files with extensions that are not
  * currently recommended for installation in the extensions.json file.
  * If a file with an extension is detected, the user is asked if
  * they want to enable the corresponding extension.
  * If the user chooses to enable the extension, it is added to the
  * recommendations list in the extensions.json file.
  * If the file does not exist, it is created with the recommended
  * extensions.
  * After scanning the workspace, the updated extensions.json file is
  * saved to disk.
  */
export async function scanWorkspace() {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showWarningMessage("No workspace open.");
        return;
    }

    const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const files = await vscode.workspace.findFiles("**/*.*");
    const extFile = path.join(rootPath, ".vscode", "extensions.json");
    let config: any = { recommendations: [] };

    if (fs.existsSync(extFile)) {
        config = JSON.parse(fs.readFileSync(extFile, "utf8"));
    } else {
        vscode.window.showInformationMessage("No extensions.json found. Creating one.");
    }

    const fileTypeToExtension = getFileTypeToExtensionMap();

    for (const file of files) {
        const ext = path.extname(file.fsPath);
        if (fileTypeToExtension[ext]) {
            for (const extId of fileTypeToExtension[ext]) {
                if (!config.recommendations.includes(extId)) {
                    config.recommendations.push(extId);
                }
            }
        }
    }

    // Save updated recommendations
    fs.mkdirSync(path.join(rootPath, ".vscode"), { recursive: true });
    fs.writeFileSync(extFile, JSON.stringify(config, null, 2));
    vscode.window.showInformationMessage("Extensions.json updated!");
}
