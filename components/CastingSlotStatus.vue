<template>
	<div class="casting-slot-status">
		<div class="casting-slot-status__level"
				 v-for="(slots,level) in $store.state.castingSlots"
				 :key="level">
			<div class="casting-slot-status__meta">
				<div class="casting-slot-status__level__name">{{ level|levelLabel }}</div>
				<div class="casting-slot-status__level__count">{{ slots|emptySlotCount }}/{{ slots.length }}</div>
			</div>
			<div class="casting-slot-status__used-slots" >
				<div class="casting-slot-status__used-slot"
						 :key="spellIndex"
						 v-for="(spell, spellIndex) in getUsedSlots(slots)">{{ spell }}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isExpanded: false
			}
		},
		methods: {
			getUsedSlots(slots) {
				return slots.filter(slot => slot !== null);
			}
		}
	}
</script>

<style lang="scss">
	.casting-slot-status {
		font-size:1.2rem;

		&__meta {
			display:flex;
			flex-direction:row;
			justify-content: space-between;

			> * + * {
				margin-left:$app-spacing;
			}
		}
	}
</style>

