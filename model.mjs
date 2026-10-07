export const PALETTES={Ember:['#ffd28d','#ff836c','#fff1cf'],Lagoon:['#8ce6d7','#93b7f5','#e0ffed'],Orchid:['#e5a0ed','#bba6ff','#ffe0b3']};
export function initial(){return {version:1,mode:'rotate',copies:6,width:0.008,palette:'Ember',strokes:[{color:0,points:[[.5,.22],[.57,.25],[.62,.33],[.59,.39],[.52,.4]]}]};}
export function transform(points,mode,copies){
 if(mode==='mirror')return [[1,1],[-1,1],[1,-1],[-1,-1]].map(([sx,sy])=>points.map(([x,y])=>[.5+(x-.5)*sx,.5+(y-.5)*sy]));
 if(mode==='tile')return Array.from({length:9},(_,i)=>points.map(([x,y])=>[(x+i%3)/3,(y+Math.floor(i/3))/3]));
 if(mode!=='rotate'||!Number.isInteger(copies)||copies<2||copies>16)throw new Error('Choose 2–16 rotations.');
 return Array.from({length:copies},(_,i)=>{const a=i*2*Math.PI/copies,c=Math.cos(a),s=Math.sin(a);return points.map(([x,y])=>[.5+(x-.5)*c-(y-.5)*s,.5+(x-.5)*s+(y-.5)*c]);});
}
export function validate(x){
 if(!x||x.version!==1||!['rotate','mirror','tile'].includes(x.mode)||!Number.isInteger(x.copies)||x.copies<2||x.copies>16||!Number.isFinite(x.width)||x.width<.002||x.width>.035||!Object.hasOwn(PALETTES,x.palette)||!Array.isArray(x.strokes)||x.strokes.length>60)throw new Error('This is not a valid Foldlight project.');
 const strokes=x.strokes.map(s=>{if(!s||!Number.isInteger(s.color)||s.color<0||s.color>2||!Array.isArray(s.points)||s.points.length<1||s.points.length>512)throw new Error('A stroke has invalid points or color.');return {color:s.color,points:s.points.map(p=>{if(!Array.isArray(p)||p.length!==2||!p.every(n=>Number.isFinite(n)&&n>=0&&n<=1))throw new Error('Stroke points must stay inside the paper.');return [...p];})};});
 return {version:1,mode:x.mode,copies:x.copies,width:x.width,palette:x.palette,strokes};
}
export function addStroke(project,points,color){if(project.strokes.length>=60)throw new Error('This drawing has 60 strokes. Undo or clear before adding more.');return validate({...project,strokes:[...project.strokes,{color,points}]});}
export function keyboardMove(point,key,large=false){const d=large?.04:.01;const vectors={ArrowLeft:[-d,0],ArrowRight:[d,0],ArrowUp:[0,-d],ArrowDown:[0,d]};if(!vectors[key])return [...point];return point.map((v,i)=>Math.max(0,Math.min(1,Math.round((v+vectors[key][i])*10000)/10000)));}
