<style src="./prepared.scss" lang="scss"></style>
<script src="./prepared.js"></script>


<template>
	<section class="prepared">
		<spell-filters class="prepared__search"></spell-filters>
		<spell-list class="prepared__results"
								:spells="$store.state.spells"></spell-list>
		<casting-slot-status class="prepared__slots"></casting-slot-status>
	</section>
</template>

