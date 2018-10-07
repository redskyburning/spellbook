import Vuex from 'vuex'

const createStore = () => {
	return new Vuex.Store({
		state    : {
			nameQuery    : '',
			level        : null,
			isRitual     : false,
			concentration: false,
			school       : null,
			spellbooks   : [],
			spells       : [],
			preparedSlots: [
				{
					level : 3,
					spellbooks : ['cleric','cleric--death'],
					selected : null
				}
			],
			castingSlots: {
				1 : {
					level: 1,
					max : 4,
					remaining : 4,
					cast : []
				},
				2 : {
					level: 2,
					max : 3,
					remaining : 3,
					cast : []
				},
				3 : {
					level: 3,
					max : 3,
					remaining : 3,
					cast : []
				},
				4 : {
					level: 4,
					max : 3,
					remaining : 3,
					cast : []
				},
				5 : {
					level: 5,
					max : 2,
					remaining : 2,
					cast : []
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
			addCast(state, { spell, level }) {
				let slot = state.castingSlots[level];

				if(slot) {
					slot.remaining--;
					slot.cast.push(spell);
				}
			}
		},
		actions  : {
			castSpell(store, { spell, level }) {
				return new Promise((resolve,reject) => {
					if(level > 0 && spell.level > 0){
						if(store.state.castingSlots[level]) {
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
			filterForPreparedSlot(store, { level, spellbooks }) {
				store.commit('setLevel', level);
				store.commit('setSpellbooks', spellbooks);
				store.dispatch('query');
			},
			query(store) {
				let options = {
					//spellbook: store.state.spellbook,
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
			}
		}
	})
};

export default createStore
