var Spring = function (p1, p2, restDistance) {
  this.p1 = p1
  this.p2 = p2
  this.restDistance = restDistance
}

Spring.prototype.update = function () {
  var dx = this.p2.pos.x - this.p1.pos.x
  var dy = this.p2.pos.y - this.p1.pos.y

  // get distance between the two particles
  var distance = new Vector(dx, dy)

  // subtract rest distance
  distance.setLength(distance.getLength() - this.restDistance)

  // F = k . x
  var force = new Vector(distance.x * STIFFNESS, distance.y * STIFFNESS)

  // add the force to the forst particles
  this.p1.vel.x += force.x
  this.p1.vel.y += force.y

  // add the opposite force to the second particle
  this.p2.vel.x -= force.x
  this.p2.vel.y -= force.y
}