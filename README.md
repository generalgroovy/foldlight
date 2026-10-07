# Foldlight

Draw one stroke and turn it into an original repeating image through rotation, reflection or tiling.

## Run and draw

Run `python -m http.server 8000`, then open http://localhost:8000. No build or dependencies. Drag on the paper, or choose **Add a curve**. **Rotate** uses 2–16 copies; **Mirror** uses four reflections; **Tile** repeats a 3 × 3 grid. Change the palette or line width at any point. These settings apply to the whole image; the three colors choose the next stroke.

For keyboard drawing, Tab to the paper. Arrow keys move the cross; Shift moves farther. Space begins or finishes a stroke. Escape cancels an unfinished stroke. Leaving the canvas completes a keyboard stroke. All other tools are ordinary keyboard-accessible controls.

Undo/Redo holds 20 changes in this session, including cleared paper and opened projects. A drawing has up to 60 source strokes and 512 points per stroke. Reaching the per-stroke point limit stops adding points until you finish that stroke. Rotated points outside the square are clipped by the paper.

**Save image** downloads a 1600 × 1600 PNG of the artwork without the pen cross. Browser storage keeps the current drawing when available. Download/open project uses validated editable JSON; downloads are the portable backup. No media is uploaded.

## Test and limits

Run `npm test` with Node 18+. Model tests cover transformation geometry, exact reflection/tiling coordinates, immutable stroke addition, keyboard bounds, invalid import rejection and stroke limits. Browser rendering and subjective artistic quality need separate visual acceptance.

## Originality and possible depth

Original code and generated artwork, inspired by Circuitbend's exploration of mathematical images. This is a direct drawing instrument, not a media-effects workstation. Future possibilities, not shipped: per-stroke transformations, editable control points, vector export and a pattern challenge mode.
