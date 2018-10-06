<template>
	<div class="spell-list-item" :class="[
  isExpanded ? 'is-expanded' : '',
  `is-${this.spell.school}`
  ]">
		<!--<div class="spell-list-item__secondary"></div>-->
		<div class="spell-list-item__primary" @click="isExpanded = !isExpanded">
			<b-tooltip :label="spell|schoolLevel"
								 type="is-white"
								 position="is-left">
				<div class="spell-list-item__level">
					<span>{{ spell.level || 'C' }}</span>
				</div>
			</b-tooltip>
			<div class="spell-list-item__name">{{ spell.name }}</div>
			<button class="button is-primary"
							v-if="canCast(spell,$store.state.castingSlots)"
							@click="cast(spell,spell.level)">Cast</button>
		</div>
		<div class="spell-list-item__secondary">
			<div class="spell-list-item__meta">
				<div class="spell-list-item__range"><strong>Range:</strong> {{spell.range}}</div>
				<div class="spell-list-item__duration"><strong>Duration:</strong> {{spell.duration}}</div>
				<div class="spell-list-item__time"><strong>Cast:</strong> {{spell.time}}</div>
				<div class="spell-list-item__school"><strong>School:</strong> {{spell.school}}</div>
			</div>
			<b-taglist class="spell-list-item__tags">
				<b-tag type="is-info"
							 v-if="spell.components.verbal">V</b-tag>
				<b-tag type="is-info"
							 v-if="spell.components.somatic">S</b-tag>
				<b-tag type="is-info"
							 v-if="spell.components.material">
					<b-tooltip :label="materialString"
										 multilined
										 type="is-info"
										 position="is-top">M</b-tooltip>
				</b-tag>
				<b-tag type="is-info"
							 v-if="spell.concentration">Concentration</b-tag>
				<b-tag type="is-info"
							 v-if="spell.isRitual">Ritual</b-tag>
			</b-taglist>
			<p v-for="(p, pIndex) in spell.description"
				 :key="pIndex">{{ p }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		props   : {
			spell: Object
		},
		computed: {
			materialString() {
				return `Material Component: ${this.spell.components.details}`;
			}
		},
		data() {
			return {
				isExpanded: false
			}
		},
		methods: {
			cast(spell,level) {
				this.$store.dispatch('castSpell',spell,level);
			},
			canCast(spell,castingSlots) {
				if(spell.level === 0) {
					return true;
				}

				let canI = false;
				let levels = Object.keys(castingSlots);
				let maxLevel = levels[levels.length - 1];

				for(let i = Number(spell.level); i <= maxLevel; i++) {
					if(Array.isArray(castingSlots[i])) {
						if(castingSlots[i].filter(slot => slot !== null).length > 0) {
							canI = true;
						}
					} else {
						console.error('???',castingSlots[i],castingSlots,i);
					}
				}

				return canI;
			}
		}
	}
</script>

<style lang="scss">
	@import "../global-styles/includes";

	.spell-list-item {
		font-family: $sanchez;

		&__primary {
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 1.5rem;
			justify-content: space-between;
			cursor:pointer;

			> * + * {
				margin-left: .5rem;
			}
		}

		&__level {
			font-size: .8em;
			$size: 1.75em;
			line-height: 1em;
			text-align: center;
			width: $size;
			height: $size;
			border-radius: $size / 2;
			background-color: $grey-dark;
			color: $white;
			font-weight: bold;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}

		&__name {
			&:first-letter {
				font-size: 1.2em;
			}
		}

		&__meta {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap:wrap;
		}

		&__school {
			text-transform: capitalize;
		}

		&__tags {
			margin-top:$app-spacing;
			font-weight:bold;
			font-family:$family-sans-serif;
		}

		&__components {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			> * + * {
				margin-left: $app-spacing;
			}
		}

		&__component-item {
			font-size: .8em;
			$size: 1.85em;
			line-height: 1em;
			text-align: center;
			width: $size;
			height: $size;
			border-radius: $size / 2;
			background-color: $grey-dark;
			color: $white;
			font-weight: bold;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}

		&__secondary {
			display: none;
			margin-top: $app-spacing;

			p {
				text-align: justify;
				font-family: $raleway-medium;
			}

			p + p {
				margin-top: $app-spacing;
			}

			@at-root .is-expanded & {
				display: block;
			}
		}
	}
</style>

