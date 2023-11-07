// Склонение существительных в зависимости от числа
// Пример: nounsDeclension(12, ['рубль', 'рубля', 'рублей'])
export default function nounsDeclension(number, wordsArray) {
	const absNumber = Math.abs(number);
	const twoDecimalPlaces = absNumber % 100;
	const oneDecimalPlaces = absNumber % 10;

	if (twoDecimalPlaces > 10 && twoDecimalPlaces < 20) return wordsArray[2];
	if (oneDecimalPlaces > 1 && oneDecimalPlaces < 5) return wordsArray[1];
	if (oneDecimalPlaces === 1) return wordsArray[0];

	return wordsArray[2];
}
