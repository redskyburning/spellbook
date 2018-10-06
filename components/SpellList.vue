<template>
	<div class="spell-list">
		<spell-list-item v-for="spell in spells"
										 v-if="spells.length > 0"
										 class="spell-list__result"
										 :spell="spell"
										 :key="spell._id"/>

		<div class="spell-list__no-results" v-if="$store.state.spells.length < 1">No spells found!</div>
	</div>
</template>

<script>
	import SpellListItem from '~/components/SpellListItem.vue';

	export default {
		components: {
			SpellListItem
		},
		props   : {
			spells: Array
		}
	}
</script>

<style lang="scss">
	.spell-list {
		&__result {

			&.is-expanded {
				border-bottom:$app-border;
				padding-bottom:$app-padding;
			}

			& + & {
				margin-top:$app-padding;
			}
		}

		&__no-results {
			text-align:center;
			font-size:1.5rem;
		}
	}
</style>

