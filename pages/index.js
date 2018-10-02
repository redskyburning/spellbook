import SpellListItem from '~/components/SpellListItem.vue'

export default {
	components: {
		SpellListItem
	},
	data() {
		return {
			query         : '',
			spells        : [],
			selectedLevel : 0,
			isRitual      : false,
			levels        : [
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
			schools       : {
				any          : 'Any',
				abjuration   : 'Abjuration',
				conjuration  : 'Conjuration',
				divination   : 'Divination',
				enchantment  : 'Enchantment',
				evocation    : 'Evocation',
				illusion     : 'Illusion',
				transmutation: 'Transmutation'
			},
			selectedSchool: 'any',
			selectedSpellBook: 'any',
			selectedBooks: [],
			spellbooks       : [
				'any',
				'bard',
				'cleric',
				'cleric--arcana',
				'cleric--death',
				'cleric--knowledge',
				'cleric--life',
				'cleric--light',
				'cleric--nature',
				'cleric--tempest',
				'cleric--trickery',
				'cleric--war',
				'druid',
				'druid--arctic',
				'druid--coast',
				'druid--desert',
				'druid--forest',
				'druid--grassland',
				'druid--mountain',
				'druid--swamp',
				'druid--underdark',
				'fighter--eldritch_knight',
				'paladin',
				'paladin--ancients',
				'paladin--crown',
				'paladin--devotion',
				'paladin--oathbreaker',
				'paladin--vengeance',
				'ranger',
				'rogue--arcane_trickster',
				'sorcerer',
				'warlock',
				'warlock--archfey',
				'warlock--fiend',
				'warlock--great_old_one',
				'warlock--undying',
				'wizard'
			]
		}
	},
	watch     : {
		query         : function() {
			this.$store.dispatch('setNameQuery', this.query);
		},
		selectedLevel : function() {
			let level = this.selectedLevel === 0 ? null : this.selectedLevel - 1;
			this.$store.dispatch('setLevel', level);
		},
		isRitual      : function() {
			this.$store.dispatch('setIsRitual', this.isRitual);
		},
		selectedSchool: function() {
			this.$store.dispatch('setSchool', this.selectedSchool === 'any' ? null : this.selectedSchool);
		},
		selectedSpellBooks: function() {
			console.warn('???');
			this.$store.dispatch('setSpellbooks', this.selectedSpellBook === 'any' ? null : this.selectedSpellBooks);
		},
		selectedBooks: function() {
			this.$store.dispatch('setSpellbooks', this.selectedBooks);
		}
	},
	methods   : {
		searchByName: function(query) {
			this.$services.spells.searchSpellsByName(query)
				.then((spells) => {
					this.spells = spells;
				})
				.catch((error) => {
					console.error(error);
				});
		},
		parseSpellbookKey(key) {
			return key.replace(/--(\w+)/,' ($1)')
				.replace(/_/g,' ')
				.replace(/([\s|(])(\w)/g,(a,b,c) => {
					return `${b}${c.toUpperCase()}`;
				})
				.replace(/^(\w)/g,(a) => {
					return a.toUpperCase();
				});
		}
	},
	fetch(context) {
		context.store.dispatch('init');
	}
}
