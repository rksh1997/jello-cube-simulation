var Vector = function (x, y) {
  this.x = x || 0
  this.y = y || 0
}

Vector.prototype.getLength = function () {
  return Math.sqrt(this.x ** 2 + this.y ** 2)
}

Vector.prototype.getAngle = function () {
  return Math.atan2(this.y, this.x)
}

Vector.prototype.setLength = function (length) {
  var angle = this.getAngle()
  this.x = Math.cos(angle) * length
  this.y = Math.sin(angle) * length
}


Vector.prototype.distanceTo = function (v2) {
  var dx = this.x - v2.x
  var dy = this.y - v2.y
  return Math.sqrt(dx ** 2 + dy ** 2)
}