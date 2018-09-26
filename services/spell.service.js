import PouchDB from 'pouchdb';
import * as find from 'pouchdb-find';

export default class SpellService {
  constructor($axios) {
    this.$axios = $axios;

    PouchDB.plugin(find);

    this.DB_NAME = 'db/spells';
    this.db      = new PouchDB(this.DB_NAME);

    this.db.info()
      .then((info) => {
        if(info.doc_count === 0) {
          this.initDB()
            .then(() => {
              console.info('DB initialized');
            })
            .catch((error) => {
              console.error('Error initing db', error);
            });
        } else {
          console.info('DB already initialized, moving on.');
        }
      })
      .catch((error) => {
        console.error('Error getting db info', error);
      });

  }

  initDB(){
    return new Promise((resolve,reject) => {
      if(this.$axios) {
        this.$axios.get('/data/spells.json')
          .then((response) => {
            if(response && response.data) {
              this.db.bulkDocs(response.data);

              resolve();
            } else {
              reject('Malformed response in initDB()');
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject('Wtf, where is axios?!');
      }
    })
  }

  getSpellByKey(key) {
    return this.db.get(key);
  }

  getAllSpells() {
    return new Promise((resolve,reject) => {
      this.db.allDocs({include_docs: true})
        .then((results) => {
          if(results && Array.isArray(results.rows)) {
            resolve(results.rows.map(row => row.doc));
          } else {
            reject('Malformed response in getAllSpells()');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
