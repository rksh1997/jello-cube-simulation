var Particle = function (x, y, vx, vy) {
  this.pos = new Vector(x, y)
  this.vel = new Vector(vx, vy)

  this.radius = 5
  this.friction = 0.99
}

Particle.prototype.update = function (dt) {
  this.pos.x += this.vel.x * dt
  this.pos.y += this.vel.y * dt

  this.vel.y += GRAVITY

  this.vel.x *= this.friction
  this.vel.y *= this.friction
}

Particle.prototype.clamp = function (minX, minY, maxX, maxY) {
  this.pos.x = Math.min(Math.max(this.pos.x, minX), maxX)
  this.pos.y = Math.min(Math.max(this.pos.y, minY), maxY)
}

Particle.prototype.draw = function (ctx) {
  ctx.beginPath()
    ctx.arc(
      this.pos.x,
      this.pos.y,
      this.radius,
      0,
      Math.PI * 2
    )
    ctx.fill()
  ctx.closePath()
}