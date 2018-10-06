<template>
	<div class="spell-list">
		<spell-list-item v-for="spell in spells"
										 v-if="spells.length > 0"
										 class="spell-list__result"
										 @cast="openCastModal"
										 :spell="spell"
										 :key="spell._id"/>

		<div class="spell-list__no-results" v-if="$store.state.spells.length < 1">No spells found!</div>

		<b-modal :active.sync="castModalActive">
			<cast-modal :spell="selectedSpell"
									@close-modal="onCastClose"></cast-modal>
		</b-modal>
	</div>
</template>

<script>
	import SpellListItem from '~/components/SpellListItem.vue';
	import CastModal from '~/components/CastModal.vue';

	export default {
		components: {
			SpellListItem,
			CastModal
		},
		props     : {
			spells: Array
		},
		data() {
			return {
				castModalActive: false,
				selectedSpell  : null,
				selectedLevel  : null
			}
		},
		methods   : {
			onCastClose(level) {
				console.warn('???',level);
			},
			openCastModal(spell) {
				this.selectedSpell   = spell;
				this.selectedLevel   = Number(spell.level);
				this.castModalActive = true;
			},
			cast(spell, level) {
				this.$store.dispatch('castSpell', {
					spell,
					level
				})
					.then(() => {
						let message = `${spell.name} cast` + ((spell.level !== level) ? ` at level ${level}` : '');

						this.$toast.open({
							duration: 1000,
							message : message,
							position: 'is-bottom',
							queue   : false,
							type    : 'is-success'
						})
					})
					.catch((error) => {
						this.$toast.open({
							duration: 1000,
							message : error,
							position: 'is-bottom',
							queue   : false,
							type    : 'is-danger'
						})
					});
			},
		}
	}
</script>

<style lang="scss">
	.spell-list {
		&__result {

			&.is-expanded {
				border-bottom: $app-border;
				padding-bottom: $app-padding;
			}

			& + & {
				margin-top: $app-padding;
			}
		}

		&__no-results {
			text-align: center;
			font-size: 1.5rem;
		}
	}
</style>

