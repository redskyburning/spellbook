import Vue from 'vue';
import SpellService from '../services/spell.service';

Vue.prototype.$foo = {
  spells : 'foo'
};

export default ({ app }, inject) => {
  inject('services', {
    spells : new SpellService(app.$axios)
  });
}
