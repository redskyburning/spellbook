import Vuex from 'vuex'

const createStore = () => {
	return new Vuex.Store({
		state: {
			nameQuery : '',
			level : null,
			spells : []
		},
		mutations: {
			setLevel (state,level) {
				state.level = level;
			},
			setSpells(state,spells) {
				state.spells = spells;
			}
		},
		actions: {
			setLevel (store, level) {
				store.commit('setLevel',level);
				store.dispatch('query');
			},
			query (store) {
				let options = {
					level : store.state.level
				};

				this.$services.spells.query(options)
					.then((spells) => {
						store.commit('setSpells',spells);
					})
					.catch((error) => {
						console.error(error);
					})
			}
		}
	})
};

export default createStore
