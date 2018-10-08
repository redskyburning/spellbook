<template>
	<div class="spell-filters">
		<div class="spell-filters__inner">
			<b-field label="Name">
				<b-input v-model="query"></b-input>
			</b-field>

			<b-field label="Spell Level">
				<b-select placeholder="Spell Level"
									v-model="selectedLevel">
					<option v-for="(level, levelIndex) in levels"
									:key="levelIndex"
									:value="levelIndex">{{ level }}</option>
				</b-select>
			</b-field>

			<b-field label="Arcane School">
				<b-select v-model="selectedSchool">
					<option v-for="(schoolLabel, schoolKey) in schools"
									:key="schoolKey"
									:value="schoolKey">{{ schoolLabel }}</option>
				</b-select>
			</b-field>

			<b-field label="Ritual">
				<b-switch v-model="isRitual">
					{{ isRitual ? 'Only Rituals' : '' }}
				</b-switch>
			</b-field>

			<b-field label="Concentration">
				<b-switch v-model="concentration"></b-switch>
			</b-field>

			<b-field label="Filter By Spellbook?">
				<b-switch v-model="filterBooks">
					{{ filterBooks ? 'Yes' : 'No' }}
				</b-switch>
			</b-field>

			<div v-if="filterBooks">
				<div class="label">Spellbooks</div>
				<div v-for="bookKey in spellbooks"
						 :key="bookKey">
					<b-checkbox v-model="selectedBooks"
											:native-value="bookKey">
						{{ bookKey|spellbookLabel }}
					</b-checkbox>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import supportedSpellbooks from '../constants/supported-spellbooks';

	export default {
		data() {
			return {
				query         : this.$store.state.nameQuery,
				selectedLevel : this.$store.state.level,
				isRitual      : this.$store.state.isRitual,
				concentration : this.$store.state.level,
				levels        : [
					'Any',
					'Cantrip',
					'Level 1',
					'Level 2',
					'Level 3',
					'Level 4',
					'Level 5',
					'Level 6',
					'Level 7',
					'Level 8',
					'Level 9',
				],
				schools       : {
					any          : 'Any',
					abjuration   : 'Abjuration',
					conjuration  : 'Conjuration',
					divination   : 'Divination',
					enchantment  : 'Enchantment',
					evocation    : 'Evocation',
					illusion     : 'Illusion',
					necromancy   : 'Necromancy',
					transmutation: 'Transmutation'
				},
				selectedSchool: 'any',
				selectedBooks : this.$store.state.spellbooks,
				spellbooks    : supportedSpellbooks,
				filterBooks   : false
			}
		},
		watch     : {
			query         : function() {
				this.$store.dispatch('setNameQuery', this.query);
			},
			selectedLevel : function() {
				let level = this.selectedLevel === 0 ? null : this.selectedLevel - 1;
				this.$store.dispatch('setLevel', level);
			},
			isRitual      : function() {
				this.$store.dispatch('setIsRitual', this.isRitual);
			},
			concentration : function() {
				this.$store.dispatch('setConcentration', this.concentration);
			},
			selectedSchool: function() {
				this.$store.dispatch('setSchool', this.selectedSchool === 'any' ? null : this.selectedSchool);
			},
			selectedBooks : function() {
				this.$store.dispatch('setSpellbooks', this.selectedBooks);
			},
			filterBooks   : function() {
				if (!this.filterBooks) {
					this.selectedBooks.splice(0, this.selectedBooks.length);
				}
			}
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

