Array.prototype.contains = function(obj) {
  for(i = 0; i < this.length; i++) {
    if(this[i] == obj) return true;
  }
  return false;
}

Array.prototype.remove = function(obj) {
  const index = this.indexOf(obj);
  if(index > -1) this.splice(index, 1);
}

Array.prototype.rotate = function(steps) {
  return this.slice(steps, this.length).concat(this.slice(0, steps));
}

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}
