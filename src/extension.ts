import * as vscode from 'vscode';

import { scanWorkspace } from './commands/scanWorkspace';
import { addExtension } from './commands/addExtension';

export function activate(context: vscode.ExtensionContext) {
    // scan workspace
    context.subscriptions.push(
        vscode.commands.registerCommand('ExtManager.scanWorkspace', scanWorkspace)
    );

    // add extension
    context.subscriptions.push(
        vscode.commands.registerCommand('ExtManager.addExtension', addExtension)
    );
}

export function deactivate() {}
