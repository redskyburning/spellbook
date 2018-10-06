import Vue from 'vue';
import levelLabelFilter from '~/filters/level-label.filter';
import capitalizeFilter from '~/filters/capitalize.filter';

Vue.filter('json', value => { return JSON.stringify(value, null, 2) } );
Vue.filter('levelLabel', levelLabelFilter);
Vue.filter('capitalize', capitalizeFilter);
Vue.filter('schoolLevel', (spell) => {
	return `${capitalizeFilter(spell.school)} ${levelLabelFilter(spell.level)}`;
});
Vue.filter('emptySlotCount',(slots) => {
	return slots.reduce((count,slotValue) => {
		return slotValue === null ? count : ++count;
	},0);
});
Vue.filter('usedSlots',(slots) => {
	return slots.filter(slot => slot !== null);
});
Vue.filter('isEmpty',(value) => {
	if(Array.isArray(value)) {
		return value.length > 0;
	} else {
		return value == false;
	}
});
