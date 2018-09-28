import Vuex from 'vuex'

const createStore = () => {
	return new Vuex.Store({
		state    : {
			nameQuery: '',
			level    : null,
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
			query(store) {
				let options = {
					level    : store.state.level,
					nameQuery: store.state.nameQuery
				};

				this.$services.spells.query(options)
					.then((spells) => {
						store.commit('setSpells', spells);
					})
					.catch((error) => {
						console.error(error);
					})
			}
		}
	})
};

export default createStore
