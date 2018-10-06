import SpellFilters from '~/components/SpellFilters.vue';
import SpellList from '~/components/SpellList.vue';

export default {
	components: {
		SpellFilters,
		SpellList
	},
	data() {
		return {
		}
	},
	fetch(context) {
		context.store.dispatch('init');
	}
}
