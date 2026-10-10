# Foldlight

Draw repeating images with rotation, reflection or tiling. Export a PNG or keep an editable project.

## Run and draw

Run `python -m http.server 8000`, then open http://localhost:8000. No build or dependencies. Drag on the paper, or choose **Add a curve**. **Rotate** uses 2–16 copies; **Mirror** uses four reflections; **Tile** repeats a 3 × 3 grid. **Style** holds the palette, line width and next-stroke colors; essential repeat, Undo and export controls remain on the work surface. Copies and line width preview continuously as you move their sliders, and each finished gesture is one Undo step. Undo also works before releasing or leaving a slider. These settings apply to the whole image; the three colors choose the next stroke.

For keyboard drawing, Tab to the paper. Arrow keys move the cross; Shift moves farther. Space begins or finishes a stroke. Escape cancels an unfinished stroke. Leaving the canvas completes a keyboard stroke. All other tools are ordinary keyboard-accessible controls.

Undo/Redo holds 20 changes in this session, including cleared paper and opened projects. A drawing has up to 60 source strokes and 512 points per stroke. Reaching the per-stroke point limit stops adding points until you finish that stroke. Rotated points outside the square are clipped by the paper.

**Save PNG** downloads a 1600 × 1600 PNG of the artwork without the pen cross. Browser storage keeps the current drawing when available. Download/open project uses validated editable JSON; downloads are the portable backup. No media is uploaded.

## Test and limits

Run `npm test` with Node 18+. Model tests cover transformation geometry, exact reflection/tiling coordinates, immutable stroke addition, keyboard bounds, invalid import rejection and stroke limits. Additional actual-handler tests with a minimal DOM/canvas double cover live setting gestures, single-step Undo/Redo, no-focus input and transitions between a setting and a repeat-mode action. These tests do not render a browser. Browser rendering and subjective artistic quality need separate visual acceptance.

## Originality and possible depth

Original code and generated artwork, inspired by Circuitbend's exploration of mathematical images. This is a direct drawing instrument, not a media-effects workstation. Future possibilities, not shipped: per-stroke transformations, editable control points, vector export and a pattern challenge mode.
