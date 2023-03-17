interface ErrorModel {
	errorType: string;
	errorTitle: string;
	errorMessage: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ErrorMessageBuilder(err: any): ErrorModel {
	let errorType = '';
	let errorTitle = '';
	let errorMessage = '';
	if (err.code === 'ACTION_REJECTED') {
		errorType = 'cancel';
		errorTitle = 'Sorry, the transaction failed';
		errorMessage = 'User cancelled transaction.';
	} else if (err.message && err.message.includes('unknown account')) {
		errorType = 'locked';
		errorTitle = 'Account locked';
		errorMessage = 'Account locked, please unlock Metamask to continue.';
	} else {
		errorType = 'accept';
		errorTitle = '';
		errorMessage = err.message || 'Please try again or reconnect wallet.';
	}
	return {
		errorType: errorType,
		errorTitle: errorTitle,
		errorMessage: errorMessage,
	};
}

export { ErrorModel, ErrorMessageBuilder };
