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
		selectPreparedSlot(preparedSlot, preparedSlotIndex) {
			console.warn('Selecting!');
			this.$store.dispatch('filterForPreparedSlot',{ preparedSlot : preparedSlot, preparedSlotIndex : preparedSlotIndex });
		}
	},
	fetch(context) {
		context.store.dispatch('clear');
	}
}
