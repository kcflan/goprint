import * as vscode from 'vscode';

const insertText = (val: string) => {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		vscode.window.showErrorMessage("Can't insert log because no document is open");
		return;
	}

	const selection = editor.selection;

	const range = new vscode.Range(selection.start, selection.end);

	editor.edit(editBuilder => {
		editBuilder.replace(range, val);
	});
};

export function activate(context: vscode.ExtensionContext) {
	console.log('"goprint" is now active');

	let disposable = vscode.commands.registerCommand('goprint.insertGoPrint', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const selection = editor.selection;
		const text = editor.document.getText(selection);

		text
			? vscode.commands.executeCommand('editor.action.insertLineAfter').then(() => {
					const logToInsert = `fmt.Println("${text}: ", ${text})`;
					insertText(logToInsert);
			  })
			: insertText('fmt.Println()');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
