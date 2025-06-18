# Vibe Parking Lot Simulator

A simple browser-based parking lot simulator built with vanilla JavaScript and HTML5 Canvas. Drive a car around a bird’s-eye view parking lot, practice reverse and parallel parking, and see collision detection in action!

## Features

- **Bird’s-eye view** parking lot with marked spaces and driving lanes
- **Driveable car** using arrow keys (or click to rotate car direction)
- **Randomly placed parked cars** (including parallel and reverse parking)
- **Collision detection** with visual feedback
- **Instruction buttons** for reverse and parallel parking tips
- **Responsive UI** with instruction overlays

## Controls

- **Arrow keys:**  
  - Up/Down: Move forward/backward  
  - Left/Right: Steer left/right (while moving)
- **Mouse:**  
  - Click anywhere on the lot to instantly rotate the car to face that point

## How to Use

1. Open `index.html` in your browser.
2. Use the arrow keys to drive the blue car.
3. Try to park without hitting other cars!
4. Click the **How to Reverse Park** or **How to Parallel Park** buttons (top right) for step-by-step instructions.

## Project Structure

```
vibe/
├── index.html
├── script.js
```

- `index.html` – Main HTML file, includes UI and canvas
- `script.js` – All simulation logic and rendering

## Customization

- **Change number of parked cars:**  
  Edit the `while (parkedCars.length < 4)` line in `script.js`.
- **Adjust parking lot size/layout:**  
  Modify the drawing code in `drawParkingLot()`.

## Credits

Created for Adam's Workshop educational purposes. 

---
Enjoy practicing your parking skills!
