import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import * as model from '../model.mjs';

// Actual app handlers with a minimal DOM/canvas double; no browser rendering.
function app(){
 const elements=new Map();let document;
 const context=new Proxy({}, {get:(target,key)=>target[key]??(()=>{}),set:(target,key,value)=>{target[key]=value;return true;}});
 class Element{
  constructor(){this.children=[];this.style={setProperty(){}};this.classList={toggle(){},add(){}};this.value='';this.width=900;this.height=900;this.dataset={};}
  set id(value){this._id=value;elements.set(value,this);}get id(){return this._id;}
  setAttribute(key,value){this[key]=value;}append(...items){this.children.push(...items);}replaceChildren(...items){this.children=items;}
  focus(){document.activeElement=this;this.onfocus?.();}getContext(){return context;}
 }
 const get=id=>{if(!elements.has(id)){const e=new Element();e.id=id;}return elements.get(id);};
 const modes=['rotate','mirror','tile'].map(mode=>{const e=new Element();e.dataset.mode=mode;return e;});
 document={activeElement:null,querySelector:s=>get(s.slice(1)),querySelectorAll:s=>s==='[data-mode]'?modes:[],createElement:()=>new Element(),addEventListener(){}};
 const source=readFileSync(new URL('../app.mjs',import.meta.url),'utf8').replace(/^import\s*\{[^}]+\}\s*from\s*'\.\/model\.mjs';/,'');
 vm.runInNewContext(source,{...model,document,structuredClone,localStorage:{getItem:()=>null,setItem:()=>{}},setTimeout,Blob,URL});
 return {get,modes,input(id,value){const e=get(id);e.value=String(value);e.oninput({target:e});}};
}
test('continuous repeat preview is one undoable gesture and redo restores its final value',()=>{
 const a=app();a.input('copies',8);assert.equal(a.get('copies-value').textContent,8);a.input('copies',11);a.get('copies').onchange();a.get('copies').onblur();a.get('undo').onclick();assert.equal(a.get('copies').value,6);assert.equal(a.get('undo').disabled,true);a.get('redo').onclick();assert.equal(a.get('copies').value,11);
});
test('input without focus can be undone while the setting gesture is active',()=>{
 const a=app();a.input('width',20);assert.equal(a.get('width-value').textContent,'2.0%');assert.equal(a.get('undo').disabled,false);a.get('undo').onclick();assert.equal(a.get('width').value,8);assert.equal(a.get('undo').disabled,true);
});
test('switching sliders without blur preserves both values and separate history entries',()=>{
 const a=app();a.input('width',20);a.input('copies',9);assert.equal(a.get('width').value,20);assert.equal(a.get('copies').value,9);a.get('undo').onclick();assert.equal(a.get('width').value,20);assert.equal(a.get('copies').value,6);a.get('undo').onclick();assert.equal(a.get('width').value,8);
});
test('repeat-mode change preserves the prior slider edit as a separate undo step',()=>{
 const a=app();a.input('copies',9);a.modes[1].onclick();assert.equal(a.get('copies-label').hidden,true);a.get('undo').onclick();assert.equal(a.get('copies-label').hidden,false);assert.equal(a.get('copies').value,9);a.get('undo').onclick();assert.equal(a.get('copies').value,6);
});
