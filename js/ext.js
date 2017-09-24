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
