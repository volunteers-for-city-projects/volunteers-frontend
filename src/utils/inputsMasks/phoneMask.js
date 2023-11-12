export const phoneMask = (input) => {
	let mask;
	if (input[0] === '9') {
		mask = '+7 (___) ___-__-__';
	} else if (input[0] === '8') {
		mask = '_ (___) ___-__-__';
	} else {
		mask = '+_ (___) ___-__-__';
	}
	return { mask };
};
