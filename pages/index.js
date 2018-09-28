import SpellListItem from '~/components/SpellListItem.vue'

export default {
  components: {
    SpellListItem
  },
  data() {
    return {
      query: '',
      spells: [],
	    selectedLevel: 0,
	    isRitual: false,
	    levels: [
	    	'Any',
	    	'Cantrip',
	    	'Level 1',
	    	'Level 2',
	    	'Level 3',
	    	'Level 4',
	    	'Level 5',
	    	'Level 6',
	    	'Level 7',
	    	'Level 8',
	    	'Level 9',
	    ],
	    schools: {
      	any : 'Any',
		    abjuration : 'Abjuration',
		    conjuration : 'Conjuration',
		    divination : 'Divination',
		    enchantment : 'Enchantment',
		    evocation : 'Evocation',
		    illusion : 'Illusion',
		    transmutation : 'Transmutation'
	    },
	    selectedSchool : 'any'
    }
  },
  watch: {
    query: function() {
      this.searchByName(this.query);
      this.$store.dispatch('setNameQuery',this.query);
    },
	  selectedLevel: function() {
    	let level = this.selectedLevel === 0 ? null : this.selectedLevel - 1;
			this.$store.dispatch('setLevel',level);
	  },
	  isRitual: function() {
    	this.$store.dispatch('setIsRitual',this.isRitual);
	  },
	  selectedSchool: function() {
    	this.$store.dispatch('setSchool',this.selectedSchool === 'any' ? null : this.selectedSchool);
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
  },
  fetch(context) {
		context.store.dispatch('init');
  }
}
