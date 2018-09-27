import PouchDB from 'pouchdb';
import Find from 'pouchdb-find';

export default class SpellService {
  constructor($axios) {
    this.$axios = $axios;

    PouchDB.plugin(Find);

    this.DB_NAME     = 'db/spells';
    this.db          = new PouchDB(this.DB_NAME);
    this.initPromise = null;

    this.initDB()
      .then((message) => {
        console.info(message);
      })
      .catch((error) => {
        console.error('error');
      });
  }

  initDB() {
    if (this.initPromise === null) {
      this.initPromise = new Promise((resolve, reject) => {
        this.db.info()
          .then((info) => {
            if (info.doc_count === 0) {
              this.populateDB()
                .then(() => {
                  this.db.createIndex({
                    index: {fields: ['name']}
                  })
                    .then(() => {
                      resolve('DB initialized');
                    })
                    .catch((error) => {
                      reject(error);
                    });
                })
                .catch((error) => {
                  console.error('Error initing db');
                  reject(error);
                });
            } else {
              resolve('DB already initialized, moving on.');
            }
          })
          .catch((error) => {
            console.error('Error getting db info');
            reject(error);
          });
      });
    }

    return this.initPromise;
  }

  populateDB() {
    return new Promise((resolve, reject) => {
      if (this.$axios) {
        this.$axios.get('/data/spells.json')
          .then((response) => {
            if (response && response.data) {
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
    return new Promise((resolve, reject) => {
      this.initDB()
        .then(() => {
          this.db.get(key)
            .then((spell) => {
              resolve(spell);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getAllSpells() {
    return new Promise((resolve, reject) => {
      this.initDB()
        .then(() => {
          this.db.allDocs({include_docs: true})
            .then((results) => {
              if (results && Array.isArray(results.rows)) {
                resolve(results.rows.map(row => row.doc));
              } else {
                reject('Malformed response in getAllSpells()');
              }
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  searchSpellsByName(startsWith) {
    return new Promise((resolve, reject) => {
      this.initDB()
        .then(() => {
          this.db.find({
            selector: {
              name: {$regex: RegExp(startsWith,'i') }
            }
          })
            .then((results) => {
              //console.warn('???',results);
              resolve(results.docs);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
