const RecordCollector = require('../recordCollector');
const Record = require('../record')
const assert = require('assert');

describe('RecordCollector', function(){
  let collector;
  let record1, record2, record3;

  beforeEach(function(){
    collector = new RecordCollector();
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
  });

  it('should start with no funds', function(){
    const actual = collector.getFunds();
    assert.strictEqual(actual, 0);
  })

  it('should be able to add funds', function(){
    collector.addFunds(5000);
    const actual = collector.getFunds();
    assert.strictEqual(actual, 5000);
  })

  it('should be able to remove funds', function(){
    collector.addFunds(5000);
    collector.removeFunds(2000);
    const actual = collector.getFunds();
    assert.strictEqual(actual, 3000);
  })

  it('should start with empty collection', function(){
    const actual = collector.getRecords();
    assert.deepEqual(actual, []);
  })

  it('should be able to add a record to its collection', function(){
    collector.addRecord(record1);
    const actual = collector.getRecords()[0];
    assert.strictEqual(actual, record1);
  })

  it('should be able to find record by title', function(){
    collector.addRecord(record1);
    const actual = collector.recordByTitle('Made up album');
    assert.strictEqual(actual, record1);
  })

  it('should be able to remove record from collection', function(){
    collector.addRecord(record1);
    collector.removeBy('artist', 'Unknown');
    const actual = collector.getRecords();
    assert.deepEqual(actual, []);
  })

  // it('should be able to buy record if enough funds', function(){
  //   collector.buy
  // })

  it('should be able to sort records by artist', function(){
    collector.addRecord(record1);
    collector.addRecord(record2);
    collector.addRecord(record3);
    collector.sortByArtist();
    const actual = collector.getRecords()[0];
    assert.strictEqual(actual, record2);
  })
});
