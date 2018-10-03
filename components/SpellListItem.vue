<template>
  <div class="spell-list-item" :class="{ 'is-expanded' : isExpanded }">
    <!--<div class="spell-list-item__secondary"></div>-->
    <div class="spell-list-item__primary" @click="isExpanded = !isExpanded">
			<div class="spell-list-item__name">{{ spell.name }}</div>
			<div class="spell-list-item__level">
				<span>{{ spell.level || 'C' }}</span>
			</div>
		</div>
		<div class="spell-list-item__secondary">
			<p v-for="(p, pIndex) in spell.description"
				 :key="pIndex">{{ p }}</p>
		</div>
  </div>
</template>

<script>
  export default {
    props: {
      spell : Object
    },
		data() {
    	return {
    		isExpanded: true
			}
		}
  }
</script>

<style lang="scss">
	@import "../global-styles/includes";

  .spell-list-item {
		font-family:$sanchez;

		&__primary {
			display:flex;
			flex-direction:row;
			align-items:center;
			font-size:1.5rem;
			justify-content: space-between;

			> * + * {
				margin-left:.5rem;
			}
		}

		&__level {
			font-size:.8em;
			$size:1.5em;
			background-color:$grey-dark;
			color:$white;
			line-height:1em;
			text-align:center;
			width:$size;
			height:$size;
			border-radius:$size / 2;
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content: center;
		}

		&__name {
			&:first-letter {
				font-size:1.2em;
			}
		}

		&__secondary {
			display:none;
			margin-top:$app-spacing;

			p {
				text-align:justify;
				font-family:$raleway-medium;
			}

			p + p {
				margin-top:$app-spacing;
			}

			@at-root .is-expanded & {
				display:block;
			}
		}
  }
</style>

