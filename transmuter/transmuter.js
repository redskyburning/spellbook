// Spell source : https://github.com/ceryliae/DnDAppFiles/blob/master/Spells/PHB%20Spells.xml

var fs     = require('fs');
var xml2js = require('xml2js');


var parser = new xml2js.Parser();

function parseSchool(schoolInput) {
	const dict = {
		C : 'conjuration',
		EV: 'evocation',
		EN: 'enchantment',
		D : 'divination',
		A : 'abjuration',
		T : 'transmutation',
		I : 'illusion',
		N : 'necromancy'
	};

	if (dict[schoolInput]) {
		return dict[schoolInput];
	} else {
		console.error('Unknown key in parseSchool!', schoolInput);
		return null;
	}
}

function parseComponents(input) {
	const regex    = /\((.+)\)/;
	const noDetail = input.replace(regex, '') || '';
	const matches  = input.match(regex);

	return {
		verbal  : noDetail.includes('V') || false,
		somatic : noDetail.includes('S') || false,
		material: noDetail.includes('M') || false,
		details : Array.isArray(matches) && matches[1] ? matches[1] : null
	}
}

function parseClasses(input) {
	let classes = [];

	if (typeof input === 'string') {
		let classArr = input.split(', ');
		const regex  = /\s+\((.+)\)/;

		classes = classArr.map((classStr) => {
			let key            = classStr.toLowerCase().replace(regex, '');
			let variantMatches = classStr.toLowerCase().match(regex);

			if (Array.isArray(variantMatches) && typeof variantMatches[1] === 'string') {
				key += `--${variantMatches[1].replace(/\s/g, '_')}`;
			}

			return key;
		});
	} else {
		console.error('Invalid input in parseClasses()!', input);
	}

	return classes;
}

function parseClassesBool(input) {
	let defaultBooks = {
		'artificer' : false,
		'bard' : false,
		'cleric' : false,
		'cleric--arcana' : false,
		'cleric--death' : false,
		'cleric--knowledge' : false,
		'cleric--life' : false,
		'cleric--light' : false,
		'cleric--nature' : false,
		'cleric--tempest' : false,
		'cleric--trickery' : false,
		'cleric--war' : false,
		'druid' : false,
		'druid--arctic' : false,
		'druid--coast' : false,
		'druid--desert' : false,
		'druid--forest' : false,
		'druid--grassland' : false,
		'druid--mountain' : false,
		'druid--swamp' : false,
		'druid--underdark' : false,
		'fighter--eldritch_knight' : false,
		'paladin' : false,
		'paladin--ancients' : false,
		'paladin--crown' : false,
		'paladin--devotion' : false,
		'paladin--oathbreaker' : false,
		'paladin--vengeance' : false,
		'ranger' : false,
		'rogue--arcane_trickster' : false,
		'sorcerer' : false,
		'warlock' : false,
		'warlock--archfey' : false,
		'warlock--fiend' : false,
		'warlock--great_old_one' : false,
		'warlock--undying' : false,
		'wizard' : false,
	};

	if (typeof input === 'string') {
		let classArr = input.split(', ');
		const regex  = /\s+\((.+)\)/;

		classArr.forEach((classStr) => {
			let key            = classStr.toLowerCase().replace(regex, '');
			let variantMatches = classStr.toLowerCase().match(regex);

			if (Array.isArray(variantMatches) && typeof variantMatches[1] === 'string') {
				key += `--${variantMatches[1].replace(/\s/g, '_')}`;
			}

			defaultBooks[key] = true;
		});
	} else {
		console.error('Invalid input in parseClassesBool()!', input);
	}

	return defaultBooks;
}

function parseSpell(spell) {
	let json = {
		name       : spell.name[0] || null,
		level      : Number(spell.level[0]) || null,
		time       : spell.time[0] || null,
		range      : spell.range[0] || null,
		duration   : spell.duration[0] || null,
		description: spell.text || [],
		isRitual   : (Array.isArray(spell.ritual) && spell.ritual[0] === 'YES'),
		school     : parseSchool(spell.school[0]),
		components : parseComponents(spell.components[0]),
		spellbooks : parseClasses(spell.classes[0]),
		spellbooksBool : parseClassesBool(spell.classes[0]),
	};

	json._id = json.name
		.toLowerCase()
		.replace(/[^a-zA-Z0-1\s]/g, '')
		.replace(/\s/g, '_');

	return json;
}

function parseSpells(input) {
	let spells = [];

	if (input.compendium && Array.isArray(input.compendium.spell)) {
		input.compendium.spell.forEach((spellInput) => {
			spells.push(parseSpell(spellInput));
		});
	} else {
		console.error('Malformed input in parseSpells()!');
	}

	/*let bookList = [];

	spells.forEach((spell) => {
		spell.spellbooks.forEach((book) => {
			if(!bookList.includes(book)) {
				bookList.push(book);
			}
		});
	});

	console.warn('books',bookList.sort());*/

	return spells;
}

function processSpells() {
	fs.readFile(__dirname + '/source/spells.xml', function(err, data) {
		parser.parseString(data, function(err, result) {
			const parsed = parseSpells(result);

			fs.writeFile('../static/data/spells.json', JSON.stringify(parsed), 'utf8', (err) => {
				if (err) throw err;
				console.log('Spells processed');
			});

		});
	});
}

try {
	processSpells();
} catch (e) {
	console.error(e);
}
