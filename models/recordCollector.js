
const RecordCollector = function(){
  this.funds = 0;
  this.records = [];
}

RecordCollector.prototype.getFunds = function () {
  return this.funds;
};

RecordCollector.prototype.addFunds = function(amount){
  this.funds += amount;
}

RecordCollector.prototype.removeFunds = function (amount) {
  this.funds -= amount;
};

RecordCollector.prototype.getRecords = function () {
  return this.records;
};

RecordCollector.prototype.addRecord = function(record){
  this.records.push(record);
}

RecordCollector.prototype.recordByTitle = function (title) {
  return this.records.filter(record => record.title === title)[0];
};

RecordCollector.prototype.removeBy = function (attribute, value) {
  for(let i = 0; i < this.records.length; i++){
    if(this.records[i][attribute] === value){
      this.records.splice(i,1);
      i--;
    }
  }
};

RecordCollector.prototype.sortByArtist = function () {
  this.records.sort(function(a, b){
    for(const i = 0; i < a.artist.length; i++){
      if(a.artist[i] < b.artist[i])
        return -1;
      else if(a.artist[i] > b.artist[i])
        return 1;
    };
    return 0;
  });
};

module.exports = RecordCollector;
