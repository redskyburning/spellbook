<style src="./index.scss" lang="scss"></style>
<script src="./index.js"></script>


<template>
  <section class="container spellbook">
		<div class="spellbook__results">
			<spell-list-item v-for="spell in $store.state.spells"
											 class="spellbook__result"
											 :spell="spell"
											 :key="spell._id"/>


			<!--<pre>{{ spells }}</pre>-->
		</div>
    <div class="spellbook__search">
      <b-field label="Name Search">
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
    </div>
  </section>
</template>

