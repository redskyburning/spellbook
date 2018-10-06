<style src="./index.scss" lang="scss"></style>
<script src="./index.js"></script>


<template>
  <section class="spellbook">
		<spell-filters class="spellbook__search"></spell-filters>
		<spell-list class="spellbook__results"
								:spells="$store.state.spells"></spell-list>
		<casting-slot-status class="spellbook__slots"></casting-slot-status>
  </section>
</template>

