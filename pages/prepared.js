import SpellListItem from '~/components/SpellListItem.vue'
import supportedSpellbooks from '../constants/supported-spellbooks';

export default {
	components: {
		SpellListItem
	},
	data() {
		return {
			query         : '',
			selectedLevel : 0,
			isRitual      : false,
			concentration : false,
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
				necromancy   : 'Necromancy',
				transmutation: 'Transmutation'
			},
			selectedSchool: 'any',
			selectedBooks : [],
			spellbooks    : supportedSpellbooks,
			filterBooks   : false
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
		concentration : function() {
			this.$store.dispatch('setConcentration', this.concentration);
		},
		selectedSchool: function() {
			this.$store.dispatch('setSchool', this.selectedSchool === 'any' ? null : this.selectedSchool);
		},
		selectedBooks : function() {
			this.$store.dispatch('setSpellbooks', this.selectedBooks);
		},
		filterBooks   : function() {
			if (!this.filterBooks) {
				this.selectedBooks.splice(0, this.selectedBooks.length);
			}
		}
	},
	methods   : {
		parseSpellbookKey(key) {
			return key.replace(/--(\w+)/, ' ($1)')
				.replace(/_/g, ' ')
				.replace(/([\s|(])(\w)/g, (a, b, c) => {
					return `${b}${c.toUpperCase()}`;
				})
				.replace(/^(\w)/g, (a) => {
					return a.toUpperCase();
				});
		}
	},
	fetch(context) {
		context.store.dispatch('init');
	}
}
