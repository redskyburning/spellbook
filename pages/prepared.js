import SpellFilters from '~/components/SpellFilters.vue';
import SpellList from '~/components/SpellList.vue';
import CastingSlotStatus from '~/components/CastingSlotStatus.vue';

export default {
	components: {
		SpellFilters,
		SpellList,
		CastingSlotStatus
	},
	data() {
		return {
		}
	},
	methods : {
		selectPreparedSlot(preparedSlot) {
			this.$store.dispatch('filterForPreparedSlot',preparedSlot);
		}
	},
	fetch(context) {
		context.store.dispatch('init');
	}
}
