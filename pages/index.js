import SpellListItem from '~/components/SpellListItem.vue'

export default {
  components: {
    SpellListItem
  },
  data() {
    return {
      query: '',
      spells: []
    }
  },
  watch: {
    query: function() {
      this.searchByName(this.query);
    }
  },
  methods: {
    searchByName: function(query) {
      this.$services.spells.searchSpellsByName(query)
        .then((spells) => {
          this.spells = spells;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  asyncData({ app }) {
    return new Promise((resolve,reject) => {
      app.$services.spells.searchSpellsByName('a')
        .then((spells) => {
          resolve({
            spells : spells
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
