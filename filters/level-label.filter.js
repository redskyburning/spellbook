export default function levelLabelFilter(level) {
	level = Number(level);
	let levelString = '';

	switch (level) {
		case 0 :
			levelString = 'Cantrip';
			break;
		case 1 :
			levelString = '1st Level';
			break;
		case 2 :
			levelString = '2nd Level';
			break;
		case 3 :
			levelString = '3rd Level';
			break;
		default :
			levelString = `${level}th Level`;
			break;
	}
	
	return levelString;
}
