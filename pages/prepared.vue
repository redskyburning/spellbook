<style src="./prepared.scss" lang="scss"></style>
<script src="./prepared.js"></script>


<template>
	<section class="prepared">
		<div class="prepared__slots">
			<div class="prepared__slot"
					 v-for="(preparedSlot,preparedIndex) in $store.state.preparedSlots"
					 :key="preparedIndex">
				<div class="prepared__slot__no-results"
						 @click="selectPreparedSlot(preparedSlot)">
					Empty slot
				</div>
			</div>
		</div>
		<spell-list class="prepared__results"
								:show-cast="false"
								:spells="$store.state.spells"></spell-list>
	</section>
</template>

