<template>
	<div class="spell-list">
		<spell-list-item v-for="spell in spells"
										 v-if="spells.length > 0"
										 class="spell-list__result"
										 :show-cast="showCast"
										 :show-select="showSelect"
										 @cast="openCastModal"
										 :spell="spell"
										 :key="spell._id"/>

		<div class="spell-list__no-results"
				 v-if="$store.state.spells.length < 1">No spells found!</div>

		<b-modal :active.sync="castModalActive">
			<div class="cast-modal" v-if="selectedSpell">
				<div class="cast-modal__title">
					Cast {{ selectedSpell.name }}?
				</div>
				<div class="cast-modal__level">
					<b-field>
						<p class="control">
							<span class="button is-static">@Level</span>
						</p>
						<b-select v-model="selectedLevel">
							<option v-for="(level, levelId) in getPossibleLevels(selectedSpell)"
											:key="levelId"
											:value="level">{{ level|levelLabel }}</option>
						</b-select>
					</b-field>
				</div>
				<div class="cast-modal__actions">
					<button class="cast-modal__action button is-large is-primary" @click="onCastClose()">Cast!</button>
				</div>
			</div>
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
			spells: Array,
			showCast: {
				type: Boolean,
				default: false
			},
			showSelect: {
				type: Boolean,
				default: false
			},
			showLevel: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				castModalActive: false,
				selectedSpell  : null,
				selectedLevel  : null
			}
		},
		methods   : {
			getPossibleLevels(spell) {
				let levels   = Object.keys(this.$store.state.castingSlots);
				let maxLevel = levels[levels.length - 1];

				return [1,2,3,4,5,6,7,8,9].slice(spell.level - 1, maxLevel);
			},
			onCastClose(level) {
				this.cast(this.selectedSpell,this.selectedLevel);
				this.castModalActive = false;
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
							duration: 1500,
							message : message,
							position: 'is-bottom',
							queue   : false,
							type    : 'is-success'
						})
					})
					.catch((error) => {
						this.$toast.open({
							duration: 1500,
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

