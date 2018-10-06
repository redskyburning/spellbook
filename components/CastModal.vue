<template>
	<div class="cast-modal">
		<div class="cast-modal__title">
			Cast {{ spell.name }}?
		</div>
		<div class="cast-modal__level">
			<b-field>
				<p class="control">
					<span class="button is-static">@Level</span>
				</p>
				<b-select v-model="selectedLevel">
					<option v-for="(level, levelId) in possibleLevels"
									:key="levelId"
									:value="level">{{ level|levelLabel }}</option>
				</b-select>
			</b-field>
		</div>
		<div class="cast-modal__actions">
			<button class="cast-modal__action button is-large is-primary" @click="$parent.close(selectedLevel)">Cast!</button>
		</div>
	</div>
</template>

<script>
	export default {
		props   : {
			spell: Object
		},
		data() {
			return {
				selectedLevel : this.spell.level,
			}
		},
		computed : {
			possibleLevels() {
				let levels   = Object.keys(this.$store.state.castingSlots);
				let maxLevel = levels[levels.length - 1];

				return [1,2,3,4,5,6,7,8,9].slice(this.spell.level - 1, maxLevel);
			}
		}
	}
</script>

<style lang="scss">
	.cast-modal {
		padding:2rem;
		background:$white;
		border-radius:1rem;

		&__title {
			text-align:center;
			font-size:1.8rem;
		}

		&__level {
			display:flex;
			flex-direction:row;
			justify-content: center;
			margin:2rem 0;
		}

		&__actions {
			text-align:center;
		}
	}
</style>

