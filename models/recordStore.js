
const RecordStore = function(name){
  this.name = name;
  this.funds = 0;
  this.records = [];
}

RecordStore.prototype.addFunds = function (amount) {
  this.funds += amount;
};

RecordStore.prototype.addRecord = function (record) {
  this.records.push(record);
};

RecordStore.prototype.removeBy = function (attribute, value) {
  let itemsRemoved = [];
  for(let i = 0; i < this.records.length; i++){
    if(this.records[i][attribute] === value){
      itemsRemoved.push(this.records.splice(i,1));
      i--;
    }
  }
  return itemsRemoved;
};

RecordStore.prototype.isAvailable = function (title) {
  for(let i = 0; i < records.length; i++){
    if(records[i].title === title) return true;
  }
};

RecordStore.prototype.sellRecord = function (title) {
  if(this.isAvailable){
    return this.removeBy('title', title)[0][0];
  }
};

RecordStore.prototype.findByQueryObject = function (query) {
  var match = true;
  var list = [];
  for(record of this.records){
    Object.entries(query).forEach(([key, val]) => {
      match = record[key] !== val ? false : true;
    });
    if(match === true) list.push(record);
  };
  return list;
};

module.exports = RecordStore;
