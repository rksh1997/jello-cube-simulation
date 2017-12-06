window.onload = function () {
  var canvas = document.getElementById('canvas')
  var ctx = canvas.getContext('2d')
  var width = canvas.width = window.innerWidth
  var height = canvas.height = window.innerHeight


  // timing stuff
  var deltaTime = 0
  var lastFrameTime = 0
  var fps = 60
  var timeStep = 1000 / fps
  var physicsStep = 1 / timeStep

  // CONSTANTS
  GRAVITY = 1
  STIFFNESS = 0.3
  DIST = 50
  DIST_SQ = Math.sqrt((DIST ** 2) * 2)

  // entities
  var particles = []
  createParticles()

  var springs = []
  createSprings()

  var p1 = new Particle(50, 50, 0, 0)
  var p2 = new Particle(200, 200, 0, 0)
  var spring = new Spring(p1, p2, 50)

  function loop(now) {
    deltaTime += now - lastFrameTime
    lastFrameTime = now
    while(deltaTime >= timeStep) {
      update(physicsStep)
      deltaTime -= timeStep
    }

    draw()
    requestAnimationFrame(loop)
  }

  function update(dt) {
    for(var i = 0; i < springs.length; i++) {
      springs[i].update()
    }

    for(var i = 0; i < particles.length; i++) {
      var row = particles[i]
      for(var j = 0; j < row.length; j++) {
        var p = particles[i][j]
        p.update(dt)

        // don't let particles get out of the screen
        p.clamp(0, 0, width, height - 50)
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height)

    // to visualize particles, uncomment this code

    // for(var i = 0; i < particles.length; i++) {
    //   var row = particles[i]
    //   for(var j = 0; j < row.length; j++) {
    //     particles[i][j].draw(ctx)
    //   }
    // }

    var len = particles.length
    var rowLen = particles[0].length

    ctx.beginPath()
      ctx.moveTo(particles[0][0].pos.x, particles[0][0].pos.y)

      // draw lines between top edge's particles
      for(var i = 1; i < rowLen; i++) {
        ctx.lineTo(particles[0][i].pos.x, particles[0][i].pos.y)
      }

      // draw lines between right edge's particles
      for(var i = 1; i < len; i++) {
        ctx.lineTo(particles[i][len - 1].pos.x, particles[i][len - 1].pos.y)
      }

      // draw lines between bottom edge's particles
      for(var i = rowLen - 1; i >= 0; i--) {
        ctx.lineTo(particles[len - 1][i].pos.x, particles[len - 1][i].pos.y)
      }

      // draw lines between left edge's particles
      for(var i = len - 1; i >= 0; i--) {
        ctx.lineTo(particles[i][0].pos.x, particles[i][0].pos.y)
      }
      ctx.fill()
    ctx.closePath()
  }


  function createParticles() {
    for(var i = 0; i < 10; i++) {
      particles[i] = []
      for(var j = 0; j < 10; j++) {
        particles[i].push(
          new Particle(
            200 + j * DIST,
            100 + i * DIST,
            0,
            0
          )
        )
      }
    }
  }

  function createSprings() {
    var len = particles.length

    // each particle will have 8 springs to the 8 particles around it
    for(var i = 0; i < len; i++) {
      for (var j = 0; j < particles[i].length; j++) {
        // spring to left
        if (j > 0) {
          springs.push(
            new Spring(particles[i][j], particles[i][j-1], DIST)
          )
        }

        // spring to right
        if (j < particles[i].length - 1) {
          springs.push(
            new Spring(particles[i][j], particles[i][j+1], DIST)
          )
        }

        // spring to top
        if (i > 0) {
          springs.push(
            new Spring(particles[i][j], particles[i-1][j], DIST)
          )
        }

        // spring to bottom
        if (i < len - 1) {
          springs.push(
            new Spring(particles[i][j], particles[i+1][j], DIST)
          )
        }

        // a spring to the top-left particle
        if (i > 0 && j > 0) {
          springs.push(
            new Spring(particles[i][j], particles[i-1][j-1], DIST_SQ)
          )
        }

        // a spring to the top-right particle
        if (i > 0 && j < particles[i].length-1) {
          springs.push(
            new Spring(particles[i][j], particles[i-1][j+1], DIST_SQ)
          )
        }

        // a spring to the bottom-left particle
        if (i < len - 1 && j > 0) {
          springs.push(
            new Spring(particles[i][j], particles[i+1][j-1], DIST_SQ)
          )
        }

        // a spring to the bottom-right particle
        if (i < len - 1 && j < particles[i].length - 1) {
          springs.push(
            new Spring(particles[i][j], particles[i+1][j+1], DIST_SQ)
          )
        }
      }
    }
  }

  requestAnimationFrame(loop)
}