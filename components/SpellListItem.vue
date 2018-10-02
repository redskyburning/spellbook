<template>
  <div class="spell-list-item">
    <!--<div class="spell-list-item__secondary"></div>-->
    <div class="spell-list-item__primary">{{ spell.name }} </div>
  </div>
</template>

<script>
  export default {
    props: {
      spell : Object
    }
  }
</script>

<style lang="scss">
	@import "../global-styles/includes";

  .spell-list-item {
    display:flex;
    flex-direction:row;
    align-items:stretch;

    &__secondary {
      flex:0 0 auto;
      width:25%;
    }

    &__primary {
      flex:1 1 auto;

			&:first-letter {
				font-size:1.2em;
				color:#fff;
				//background:$primary;
				display:inline-block;
				padding:.2em .5em;
				margin-right:.1em;
			}
    }
  }
</style>

