import Vue from 'vue';
import SpellService from '../services/spell.service';

Vue.prototype.$foo = {
  spells : 'foo'
};

export default ({ $axios }, inject) => {
  inject('services', {
    spells : new SpellService($axios)
  });
}
