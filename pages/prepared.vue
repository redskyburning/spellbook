<style src="./prepared.scss" lang="scss"></style>
<script src="./prepared.js"></script>


<template>
	<section class="prepared">
		<div class="prepared__slots">
			<div class=""
					 v-for="(preparedSlot,preparedIndex) in $store.state.preparedSlots"
					 :key="preparedIndex">
				<div class="prepared__slot prepared__slot--filled"
						 v-if="preparedSlot.selected !== null">
					<div class="prepared__slot__title">{{ preparedSlot.selected.name }}</div>
					<div class="prepared__slot__actions">
						<button class="button is-primary is-small">
							<i class="fas fa-exchange-alt"
								 @click="selectPreparedSlot(preparedSlot, preparedIndex)"></i>
						</button>
					</div>
				</div>
				<div class="prepared__slot prepared__slot--empty"
						 v-if="preparedSlot.selected === null"
						 @click="selectPreparedSlot(preparedSlot, preparedIndex)">
					<div class="prepared__slot__title">
						<span>Empty slot</span>
						<span>- {{ preparedSlot.level|levelLabel }}</span>
					</div>
				</div>
			</div>
		</div>
		<spell-list class="prepared__results"
								:show-select="true"
								:spells="$store.state.spells"></spell-list>
	</section>
</template>

