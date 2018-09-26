import SpellListItem from '~/components/SpellListItem.vue'

export default {
  components: {
    SpellListItem
  },
  asyncData({ app }) {
    return new Promise((resolve,reject) => {
      app.$services.spells.getAllSpells()
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
