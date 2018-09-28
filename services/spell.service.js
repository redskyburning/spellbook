import PouchDB from 'pouchdb';
import Find from 'pouchdb-find';

export default class SpellService {
	constructor($axios) {
		this.$axios = $axios;

		PouchDB.plugin(Find);

		this.DB_NAME     = 'db/spells';
		this.INDEX_NAME  = 'query';
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
									resolve('DB initialized');
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
							name: {$regex: RegExp(startsWith, 'i')}
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

	query(options) {
		return new Promise((resolve, reject) => {
			this.initDB()
				.then(() => {
					let selectors = {};
					let fields = [];
					let bookFilters = [];

					options.nameQuery = options.nameQuery.trim();

					if (options.level && Number.isInteger(options.level) && options.level >= 0) {
						selectors.level = options.level;
						fields.push('level');
					}

					if (options.nameQuery && typeof options.nameQuery === 'string') {
						selectors.name = {$regex: RegExp(options.nameQuery, 'i')};
						fields.push('name');
					}

					if (options.school && typeof options.school === 'string') {
						selectors.school = options.school;
						fields.push('school');
					}

					if (options.spellbook && typeof options.spellbook === 'string') {
						let arr = [options.spellbook];

						if(options.spellbook.indexOf('--') > -1) {
							arr = [options.spellbook,options.spellbook.split('--')[0]];
						}

						console.warn('???',arr);

						selectors.spellbook = { $all : arr };
						fields.push('spellbook');
					}

					if (options.isRitual) {
						selectors.isRitual = true;
						fields.push('isRitual');
					}

					let createParams = {
						index : {
							fields : fields
						}
					};

					let findParams = {
						selector: selectors
					};

					this.db.createIndex(createParams)
						.then((result) => {
							this.db.find(findParams)
								.then((results) => {
									if (results.warning) {
										console.warn('Find Warning:', results.warning);
									}

									let spellbooks = [];

									results.docs.forEach((spell) => {
										spell.spellbooks.forEach((key) => {
											if(!spellbooks.includes(key)) {
												spellbooks.push(key);
											}
										})
									});

									console.warn('???',spellbooks.sort());

									resolve(results.docs);
								})
								.catch((error) => {
									reject(error);
								});
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
