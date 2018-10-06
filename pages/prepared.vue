<style src="./index.scss" lang="scss"></style>
<script src="./index.js"></script>


<template>
  <section class="spellbook">
    <div class="spellbook__search">
			<div class="spellbook__search__inner">
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
							{{ parseSpellbookKey(bookKey) }}
						</b-checkbox>
					</div>
				</div>
			</div>
    </div>
		<div class="spellbook__results">
			<spell-list-item v-for="spell in $store.state.spells"
											 v-if="$store.state.spells.length > 0"
											 class="spellbook__result"
											 :spell="spell"
											 :key="spell._id"/>

			<div class="spellbook__no-results" v-if="$store.state.spells.length < 1">No spells found!</div>


			<!--<pre>{{ spells }}</pre>-->
		</div>
  </section>
</template>

