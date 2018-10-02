import Vuex from 'vuex'

const createStore = () => {
	return new Vuex.Store({
		state    : {
			nameQuery : '',
			level     : null,
			isRitual  : false,
			school    : null,
			spellbooks: [],
			spells    : []
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
			setSpellbooks(state, spellbooks) {
				state.spellbooks = spellbooks;
			}
		},
		actions  : {
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
			setSchool(store, school) {
				store.commit('setSchool', school);
				store.dispatch('query');
			},
			setSpellbooks(store, spellbooks) {
				store.commit('setSpellbooks', spellbooks);
				store.dispatch('query');
			},
			query(store) {
				let options = {
					//spellbook: store.state.spellbook,
					spellbooks: store.state.spellbooks,
					level     : store.state.level,
					nameQuery : store.state.nameQuery,
					isRitual  : store.state.isRitual,
					school    : store.state.school
				};

				this.$services.spells.query(options)
					.then((spells) => {
						console.error('setting',spells);
						store.commit('setSpells', spells);
					})
					.catch((error) => {
						console.error(error);
					})
			},
			init(store) {
				if (store.state.spells.length < 1) {
					this.$services.spells.getAllSpells()
						.then((spells) => {
							store.commit('setSpells', spells);
						})
						.catch((error) => {
							console.error(error);
						});
				}
			}
		}
	})
};

export default createStore
