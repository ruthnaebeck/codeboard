'use strict'

/* global whiteboard draws */

window.EventEmitter = function() {
  this.subscribers = {}
}

window.whiteboard = new window.EventEmitter();

(function() {
    // Ultimately, the color of our stroke;
  var color

    // The color selection elements on the DOM.
  var colorElements = [].slice.call(document.querySelectorAll('.marker'))

  colorElements.forEach(function(el) {
        // Set the background color of this element
        // to its id (purple, red, blue, etc).
    el.style.backgroundColor = el.id

        // Attach a click handler that will set our color variable to
        // the elements id, remove the selected class from all colors,
        // and then add the selected class to the clicked color.
    el.addEventListener('click', function() {
      color = this.id
      document.querySelector('.selected').classList.remove('selected')
      this.classList.add('selected')
    })
  })

  var canvas = document.getElementById('paint')

  if (canvas) var ctx = canvas.getContext('2d')

  function resize() {
        // Unscale the canvas (if it was previously scaled)
    ctx.setTransform(1, 0, 0, 1, 0, 0)

        // The device pixel ratio is the multiplier between CSS pixels
        // and device pixels
    var pixelRatio = window.devicePixelRatio || 1

        // Allocate backing store large enough to give us a 1:1 device pixel
        // to canvas pixel ratio.
    var w = (canvas.clientWidth || 1) * pixelRatio,
      h = (canvas.clientHeight || 1) * pixelRatio
    if (w !== canvas.width || h !== canvas.height) {
            // Resizing the canvas destroys the current content.
            // So, save it...
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      canvas.width = w; canvas.height = h

            // ...then restore it.
      ctx.putImageData(imgData, 0, 0)
    }

        // Scale the canvas' internal coordinate system by the device pixel
        // ratio to ensure that 1 canvas unit = 1 css pixel, even though our
        // backing store is larger.
    ctx.scale(pixelRatio, pixelRatio)
    ctx.lineWidth = 5
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    // console.log('W', w, 'H', h)
  }

  resize()
  window.addEventListener('resize', resize)

  var currentMousePosition = {
    x: 0,
    y: 0
  }

  var lastMousePosition = {
    x: 0,
    y: 0
  }

  var drawing = false

  canvas.addEventListener('mousedown', function(e) {
    drawing = true
    currentMousePosition.x = e.offsetX
    currentMousePosition.y = e.offsetY
  })

  canvas.addEventListener('mouseup', function() {
    drawing = false
  })

  canvas.addEventListener('mousemove', function(e) {
    if (!drawing) return

    lastMousePosition.x = currentMousePosition.x
    lastMousePosition.y = currentMousePosition.y

    currentMousePosition.x = e.offsetX
    currentMousePosition.y = e.offsetY

    whiteboard.draw(lastMousePosition, currentMousePosition, color, true)
  })

  canvas.addEventListener('touchstart', function(e) {
    e.preventDefault()
    drawing = true
    currentMousePosition.x = e.changedTouches[0].pageX
    currentMousePosition.y = e.changedTouches[0].pageX
  })

  canvas.addEventListener('touchend', function(e) {
    e.preventDefault()
    drawing = false
  })

  canvas.addEventListener('touchmove', function(e) {
    if (!drawing) return

    lastMousePosition.x = currentMousePosition.x
    lastMousePosition.y = currentMousePosition.y

    currentMousePosition.x = e.changedTouches[0].pageX
    currentMousePosition.y = e.changedTouches[0].pageX

    whiteboard.draw(lastMousePosition, currentMousePosition, color, true)
  })

  whiteboard.draw = function(start, end, strokeColor) {
        // Draw the line between the start and end positions
        // that is colored with the given color.
    ctx.beginPath()
    ctx.strokeStyle = strokeColor || 'black'
    if (strokeColor === 'white') ctx.lineWidth = 15
    else ctx.lineWidth = 5
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    draws.push({
      start: {x: start.x, y: start.y},
      end: {x: end.x, y: end.y},
      color: strokeColor })
    ctx.closePath()
    ctx.stroke()
  }

  whiteboard.clear = function() {
    draws.length = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
})()
