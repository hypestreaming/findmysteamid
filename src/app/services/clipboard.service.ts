import {Injectable} from '@angular/core';

@Injectable()
export class ClipboardService {

	// the following code was copied from clipboard-copy framework on npmjs
	private static copyUsingNavigator(navigator: any, text: string): boolean {

		// Use the Async Clipboard API when available
		if (navigator.clipboard) {
			return navigator.clipboard.writeText(text);
		}

		// ...Otherwise, use document.execCommand() fallback

		// Put the text to copy into a <span>
		const span = document.createElement('span');
		span.textContent = text;
		span.style.whiteSpace = 'pre';

		// An <iframe> isolates the <span> from the page's styles
		const iframe: any = document.createElement('iframe');
		iframe.sandbox = 'allow-same-origin';
		document.body.appendChild(iframe);

		let win = iframe.contentWindow;
		win.document.body.appendChild(span);

		// Get a Selection object representing the range of text selected by the user
		let selection = win.getSelection();

		// Fallback for Firefox which fails to get a selection from an <iframe>
		if (!selection) {
			win = window;
			selection = win.getSelection();
			document.body.appendChild(span);
		}

		const range = win.document.createRange();
		selection.removeAllRanges();
		range.selectNode(span);
		selection.addRange(range);

		let success = false;
		try {
			success = win.document.execCommand('copy');
		} catch (err) {
			// ignored
		}

		selection.removeAllRanges();
		win.document.body.removeChild(span);
		document.body.removeChild(iframe);

		return success;
	}

	public copyToClipboard(text: string): boolean {
		return ClipboardService.copyUsingNavigator(navigator, text);
	}
}
