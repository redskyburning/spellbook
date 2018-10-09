import Vuex from 'vuex'

const createStore = () => {
	return new Vuex.Store({
		state    : {
			nameQuery                : '',
			level                    : 0,
			isRitual                 : false,
			concentration            : false,
			school                   : null,
			spellbooks               : [],
			spells                   : [],
			selectedPreparedSlotIndex: null,
			preparedSlots            : [
				{
					level     : 0,
					spellbooks: ['warlock', 'warlock--great_old_one'],
					selected  : {
						"name": "Chill Touch",
						"level": 0,
						"time": "1 action",
						"range": "120 feet",
						"duration": "1 round",
						"concentration": false,
						"description": [
							"You create a ghostly, skeletal hand in the space of a creature within range. Make a ranged spell attack against the creature to assail it with the chill of the grave. On a hit, the target takes 1d8 necrotic damage, and it can't regain hit points until the start of your next turn. Until then, the hand clings to the target.",
							"",
							"If you hit an undead target, it also has disadvantage on attack rolls against you until the end of your next turn.",
							"",
							"This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
						],
						"isRitual": false,
						"school": "necromancy",
						"components": {
							"verbal": true,
							"somatic": true,
							"material": false,
							"details": null
						},
						"spellbooks": {
							"artificer": false,
							"bard": false,
							"cleric": false,
							"cleric--arcana": false,
							"cleric--death": false,
							"cleric--knowledge": false,
							"cleric--life": false,
							"cleric--light": false,
							"cleric--nature": false,
							"cleric--tempest": false,
							"cleric--trickery": false,
							"cleric--war": false,
							"druid": false,
							"druid--arctic": false,
							"druid--coast": false,
							"druid--desert": false,
							"druid--forest": false,
							"druid--grassland": false,
							"druid--mountain": false,
							"druid--swamp": false,
							"druid--underdark": false,
							"fighter--eldritch_knight": false,
							"paladin": false,
							"paladin--ancients": false,
							"paladin--crown": false,
							"paladin--devotion": false,
							"paladin--oathbreaker": false,
							"paladin--vengeance": false,
							"ranger": false,
							"rogue--arcane_trickster": false,
							"sorcerer": true,
							"warlock": true,
							"warlock--archfey": false,
							"warlock--fiend": false,
							"warlock--great_old_one": false,
							"warlock--undying": false,
							"wizard": true
						},
						"_id": "chill_touch"
					}
				},
				{
					level     : 0,
					spellbooks: ['any'],
					selected  : null
				},
			],
			castingSlots             : {
				1: {
					level    : 1,
					max      : 4,
					remaining: 4,
					cast     : []
				},
				2: {
					level    : 2,
					max      : 3,
					remaining: 3,
					cast     : []
				},
				3: {
					level    : 3,
					max      : 3,
					remaining: 3,
					cast     : []
				},
				4: {
					level    : 4,
					max      : 3,
					remaining: 3,
					cast     : []
				},
				5: {
					level    : 5,
					max      : 2,
					remaining: 2,
					cast     : []
				},
			}
		},
		mutations: {
			setLevel(state, level) {
				state.level = level;
			},
			setNameQuery(state, nameQuery) {
				state.nameQuery = nameQuery;
			},
			setSpellbook(state, spellbook) {
				state.spellbook = spellbook;
			},
			setSpells(state, spells) {
				state.spells = spells;
			},
			setSchool(state, school) {
				state.school = school;
			},
			setIsRitual(state, isRitual) {
				state.isRitual = isRitual;
			},
			setConcentration(state, concentration) {
				state.concentration = concentration;
			},
			setSpellbooks(state, spellbooks) {
				state.spellbooks = spellbooks;
			},
			setSelectedPreparedSlotIndex(state, preparedSlotIndex) {
				state.selectedPreparedSlotIndex = preparedSlotIndex;
			},
			setSelectedSpellForPreparedSlot(state, {preparedSlotIndex, spell}) {
				state.preparedSlots[preparedSlotIndex].selected = spell;
			},
			addCast(state, {spell, level}) {
				let slot = state.castingSlots[level];

				if (slot) {
					slot.remaining--;
					slot.cast.push(spell);
				}
			}
		},
		actions  : {
			castSpell(store, {spell, level}) {
				return new Promise((resolve, reject) => {
					if (level > 0 && spell.level > 0) {
						if (store.state.castingSlots[level]) {
							if (store.state.castingSlots[level].remaining > 0) {
								store.commit('addCast', {spell, level});
								resolve();
							} else {
								reject(`You don't have any remaining level ${level} spell slots.`)
							}
						} else {
							reject(`You don't have any level ${level} spell slots.`)
						}
					} else {
						reject(`Missing params in castSpell! Level: ${level}, Spell: ${spell._id} `);
					}
				});
			},
			setLevel(store, level) {
				store.commit('setLevel', level);
				store.dispatch('query');
			},
			setSpellbook(store, spellbook) {
				store.commit('setSpellbook', spellbook);
				store.dispatch('query');
			},
			setNameQuery(store, nameQuery) {
				store.commit('setNameQuery', nameQuery);
				store.dispatch('query');
			},
			setIsRitual(store, isRitual) {
				store.commit('setIsRitual', isRitual);
				store.dispatch('query');
			},
			setConcentration(store, concentration) {
				store.commit('setConcentration', concentration);
				store.dispatch('query');
			},
			setSchool(store, school) {
				store.commit('setSchool', school);
				store.dispatch('query');
			},
			setSpellbooks(store, spellbooks) {
				store.commit('setSpellbooks', spellbooks);
				store.dispatch('query');
			},
			filterForPreparedSlot(store, {preparedSlot, preparedSlotIndex}) {
				store.commit('setSelectedPreparedSlotIndex', preparedSlotIndex);
				store.commit('setLevel', preparedSlot.level);
				store.commit('setSpellbooks', preparedSlot.spellbooks);
				store.dispatch('query');
			},
			setSelectedSpellForPreparedSlot(store, spell) {
				let index = store.state.selectedPreparedSlotIndex;
				if (store.state.preparedSlots[index]) {
					if(spell && spell._id) {
						store.commit('setSelectedSpellForPreparedSlot',{ spell : spell, preparedSlotIndex : index });
						store.commit('setSelectedPreparedSlotIndex', null);
						store.dispatch('clear');
					} else {
						console.error('Malformed spell in setSelectSpellForPreparedSlot!',spell);
					}
				} else {
					console.error(`Prepared slot '${index}' not found`);
				}
			},
			query(store) {
				let options = {
					spellbooks   : store.state.spellbooks,
					level        : store.state.level,
					nameQuery    : store.state.nameQuery,
					isRitual     : store.state.isRitual,
					concentration: store.state.concentration,
					school       : store.state.school
				};

				this.$services.spells.query(options)
					.then((spells) => {
						store.commit('setSpells', spells);
					})
					.catch((error) => {
						console.error(error);
					})
			},
			init(store) {
				if (store.state.spells.length < 1) {
					store.dispatch('query');
				}
			},
			clear(store) {
				store.commit('setSpells', []);
			}
		}
	})
};

export default createStore
