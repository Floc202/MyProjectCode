# Snake Game

## Overview
A fully-featured web-based Snake game built with HTML5 Canvas, CSS, and vanilla JavaScript. No dependencies required.

## Features
- **Controls**: Arrow keys (↑ ↓ ← →) to change direction (cannot reverse directly into self).
- **Gameplay**: Eat red food to grow and increase score. Avoid walls and self-collision.
- **UI**: Real-time score, game over screen with final score, restart button.
- **Visuals**: Dark theme, green snake, glowing border, 20x20 grid (400x400 canvas).
- **Performance**: Smooth 100ms game loop using `setTimeout`.

## Files
- `index.html`: Game structure, canvas, UI elements.
- `style.css`: Styling and responsive overlay.
- `script.js`: Core logic (movement, collisions, drawing, game state).
- `TODO.md`: Development progress (completed).

## How to Run
1. Open `index.html` in any modern web browser.
   - Windows CLI: `start index.html`
   - Or right-click → Open with Live Server (VSCode extension) for auto-reload.

## How to Play
1. Use arrow keys to steer the green snake.
2. Eat red food squares to grow and score points.
3. Avoid hitting walls or your own body.
4. On game over, click **Restart** to play again.

## Customization
- Adjust speed: Change `100` in `setTimeout(main, 100)`.
- Grid size: Modify `gridSize` and `canvas` dimensions.
- Colors: Update `fillStyle` values.

Enjoy the classic Snake game!
