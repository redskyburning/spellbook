import Vuex from 'vuex'

const createStore = () => {
	return new Vuex.Store({
		state    : {
			nameQuery: '',
			level    : null,
			isRitual   : false,
			spells   : []
		},
		mutations: {
			setLevel(state, level) {
				state.level = level;
			},
			setNameQuery(state, nameQuery) {
				state.nameQuery = nameQuery;
			},
			setSpells(state, spells) {
				state.spells = spells;
			},
			setIsRitual(state, isRitual) {
				state.isRitual = isRitual;
			}
		},
		actions  : {
			setLevel(store, level) {
				store.commit('setLevel', level);
				store.dispatch('query');
			},
			setNameQuery(store, nameQuery) {
				store.commit('setNameQuery', nameQuery);
				store.dispatch('query');
			},
			setIsRitual(store,isRitual) {
				store.commit('setIsRitual',isRitual);
				store.dispatch('query');
			},
			query(store) {
				let options = {
					level    : store.state.level,
					nameQuery: store.state.nameQuery,
					isRitual   : store.state.isRitual
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
