import Vue from 'vue';
import levelLabelFilter from '~/filters/level-label.filter';
import capitalizeFilter from '~/filters/capitalize.filter';

function spellbookLabel(key) {
	return key.replace(/--(\w+)/, ' ($1)')
		.replace(/_/g, ' ')
		.replace(/([\s|(])(\w)/g, (a, b, c) => {
			return `${b}${c.toUpperCase()}`;
		})
		.replace(/^(\w)/g, (a) => {
			return a.toUpperCase();
		});
}

Vue.filter('json', value => { return JSON.stringify(value, null, 2) } );
Vue.filter('levelLabel', levelLabelFilter);
Vue.filter('capitalize', capitalizeFilter);
Vue.filter('schoolLevel', (spell) => {
	return `${capitalizeFilter(spell.school)} ${levelLabelFilter(spell.level)}`;
});
Vue.filter('isEmpty',(value) => {
	if(Array.isArray(value)) {
		return value.length > 0;
	} else {
		return value == false;
	}
});
Vue.filter('spellbookLabel',spellbookLabel);
Vue.filter('spellbookList', (spellbookList) => {
	return spellbookList.map(spellbookLabel).join(',\n');
});
