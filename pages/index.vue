<style src="./index.scss" lang="scss"></style>
<script src="./index.js"></script>


<template>
  <section class="container">
    <div>
      <b-field>
        <b-input placeholder="No label"
                 v-model="query"
                 rounded></b-input>
      </b-field>
    </div>
    <br/>
    <hr/>
    <br/>
    <div>
      <spell-list-item v-for="spell in spells"
                       :spell="spell"
                       :key="spell._id"/>


      <!--<pre>{{ spells }}</pre>-->
    </div>
  </section>
</template>

