<template>
  <div class="spell-list-item">
    <!--<div class="spell-list-item__secondary"></div>-->
    <div class="spell-list-item__primary">{{ spell.name }}</div>
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
    }
  }
</style>

