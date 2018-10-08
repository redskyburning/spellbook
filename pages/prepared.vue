<style src="./prepared.scss" lang="scss"></style>
<script src="./prepared.js"></script>


<template>
	<section class="prepared">
		<div class="prepared__slots">
			<div class="prepared__slot"
					 v-for="(preparedSlot,preparedIndex) in $store.state.preparedSlots"
					 :key="preparedIndex">
				<div class="prepared__empty-slot"
						 v-if="preparedSlot.selected === null"
						 @click="selectPreparedSlot(preparedSlot)">
					<div class="prepared__empty-slot__title">
						<span>Empty slot</span>
						<span>- {{ preparedSlot.level|levelLabel }}</span>
						<!--<b-tooltip :label="preparedSlot.spellbooks|spellbookList"
											 multilined
											 position="is-left"
											 :always="false"
											 size="is-small"
											 type="is-info">
							<i class="fas fa-book"></i>
						</b-tooltip>-->
					</div>
					<div class="prepared__empty-slot__meta">
					</div>
				</div>
			</div>
		</div>
		<spell-list class="prepared__results"
								:show-select="true"
								:spells="$store.state.spells"></spell-list>
	</section>
</template>

