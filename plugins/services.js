import Vue from 'vue';
import SpellService from '../services/spell.service';

Vue.prototype.$services = {
  spells : new SpellService()
};

export default ({ app }, inject) => {
  inject('services', {
    spells : new SpellService(app.$axios)
  });
}
