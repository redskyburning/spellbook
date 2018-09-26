import Vue from 'vue';

Vue.filter('json', value => { return JSON.stringify(value, null, 2) } );
