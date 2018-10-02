<style src="./index.scss" lang="scss"></style>
<script src="./index.js"></script>


<template>
  <section class="spellbook">
    <div class="spellbook__search">
      <b-field label="Name">
        <b-input v-model="query"
                 rounded></b-input>
      </b-field>

			<b-field label="Spell Level">
				<b-select placeholder="Spell Level"
									v-model="selectedLevel"
									rounded>
					<option v-for="(level, levelIndex) in levels"
									:key="levelIndex"
									:value="levelIndex">{{ level }}</option>
				</b-select>
			</b-field>

			<b-field label="Arcane School">
				<b-select v-model="selectedSchool"
									rounded>
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

			<a class="button is-primary">Primary</a>
    </div>
		<div class="spellbook__results">
			<spell-list-item v-for="spell in $store.state.spells"
											 class="spellbook__result"
											 :spell="spell"
											 :key="spell._id"/>


			<!--<pre>{{ spells }}</pre>-->
		</div>
  </section>
</template>

