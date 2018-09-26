import PouchDB from 'pouchdb';

export default class SpellService {
  constructor($axios) {
    this.$axios = $axios;

    this.DB_NAME = 'db/spells';
    this.db      = new PouchDB(this.DB_NAME);

    this.db.info()
      .then((info) => {
        if(info.doc_count === 0) {
          this.initDB()
            .then(() => {
              console.warn('DB initialized');
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
              response.data.forEach((spell) => {
                this.db.put(spell);
              });

              /*Object.keys(response.data).forEach((key) => {
                let spell = response.data[key];

                this.db.put(spell);
              });*/

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
}
