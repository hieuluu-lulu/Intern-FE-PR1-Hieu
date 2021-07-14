/** @format */
/** @format */

// toastr.options = {
// 	closeButton: true,
// 	newestOnTop: false,
// 	progressBar: true,
// 	positionClass: 'toast-top-right',
// 	preventDuplicates: false,
// 	onclick: null,
// 	showDuration: '300',
// 	hideDuration: '1000',
// 	timeOut: '5000',
// 	extendedTimeOut: '1000',
// 	showEasing: 'swing',
// 	hideEasing: 'linear',
// 	showMethod: 'fadeIn',
// 	hideMethod: 'fadeOut',
// };

const toastSuccess = (message) => {
	Toastify({
		text: message,
		duration: 2000,
		close: true,
		gravity: 'top',
		position: 'right',
		stopOnFocus: true,
		backgroundColor: '#51a351',
	}).showToast();
};

// const toastError = (message) => {
// 	toastr.error(message);
// };
