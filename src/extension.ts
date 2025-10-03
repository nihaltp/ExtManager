import * as vscode from 'vscode';

import { scanWorkspace } from './commands/scanWorkspace';
import { addExtension } from './commands/addExtension';
import { showRecommendations } from './commands/showRecommendations';

export function activate(context: vscode.ExtensionContext) {
    // scan workspace
    context.subscriptions.push(
        vscode.commands.registerCommand('ExtManager.scanWorkspace', scanWorkspace)
    );

    // add extension
    context.subscriptions.push(
        vscode.commands.registerCommand('ExtManager.addExtension', addExtension)
    );

    // show recommendation file
    context.subscriptions.push(
        vscode.commands.registerCommand('ExtManager.showRecommendations', showRecommendations)
    );
}

export function deactivate() {}
