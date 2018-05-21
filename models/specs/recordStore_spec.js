const RecordStore = require('../recordStore');
const RecordCollector = require('../recordCollector');
const Record = require('../record')
const assert = require('assert');

describe('RecordStore', function(){
  let collector, store, record1, record2, record3;

  beforeEach(function(){
    record1 = new Record({
      title: 'Made up album',
      artist: 'Unknown',
      genre: 'Metal',
      price: 50
    });
    record2 = new Record({
      title: 'Their Greatest Hits 1971 - 1975',
      artist: 'Eagles',
      genre: 'rock',
      price: 1000
    });
    record3 = new Record({
      title: 'Good album',
      artist: 'Mediocre Band',
      genre: 'Polka',
      price: 200
    });

    collector = new RecordCollector();
    store = new RecordStore('Disc Emporium');
  });

  it('should have a name', function(){
    const actual = store.name;
    assert.strictEqual(actual, 'Disc Emporium');
  })

  it('should start with no funds', function(){
    const actual = store.funds;
    assert.strictEqual(actual, 0);
  })

  it('should be able to add funds', function(){
    store.addFunds(5000);
    const actual = store.funds;
    assert.strictEqual(actual, 5000);
  })

  it('should be able to add a record to the collection', function(){
    store.addRecord(record1);
    const actual = store.records[0];
    assert.strictEqual(actual, record1);
  })

  it('should be able to remove a record by attribute', function(){
    store.addRecord(record1);
    store.addRecord(record2);
    store.addRecord(record3);
    store.removeBy('genre', 'rock');
    const actual = store.records;
    assert.deepEqual(actual, [record1, record3]);
  })

  it('should be able to sell a record if available', function(){
    store.addRecord(record1);      store.addRecord(record2);
    store.addRecord(record3);
    const actual = store.sellRecord('Good album');
    assert.strictEqual(actual, record3);
    assert.strictEqual(store.records.length, 2);
  });

  it('should be able to find all records matching multiple arguments', function(){
    store.addRecord(record1);      store.addRecord(record2);
    store.addRecord(record3);
    const actual = store.findByQueryObject({
      album: 'Good album',
      genre: 'Polka'
    });
    assert.deepEqual(actual, [record3]);
  })

})
