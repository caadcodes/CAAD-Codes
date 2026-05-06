var st;

var g = '#587E66'; // green
var gg = '#B1C9B9'; //grey green
var gb = '#BED6D5'; //grey blue
var r = '#FF1C20'; //red
var p = '#F58ADE'; // pink
var pp = '#CDA8D8'; // purple pink
var b = '#2968B2'; // blue
var lb = '#81A3CB'; // lighter blue
var y = '#F7EE96'; // yellow
var dp = '#ED3C89'; // yellow

var cols = 51;
var rows = 51;

var grid = [
  [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0], 
  [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   g,   g,   g,   g,   g,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   g,   g,  gg,  gb,  gb,  gb,  gb,  gb,  gg,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   g,   g,  gg,  gg,  gb,  gb,  gb,  gb,  gb,  gb,   b,   b,  gb,  gb,  gb,  gb,  gg,   g,   0,   0,   0,   0,   0,   g,   g,   g,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   g,   g,  gg,  gb,  gb,  gb,  gb,  gb,   b,  lb,  lb,  lb,  lb,  lb,  lb,  lb,  lb,   b,  gb,  gb,  gg,  gg,   g,   g,   g,   g,  gg,  gg,  gb,  gb,  gb,  gb,  gg,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,  gg,  gb,  gb,  gb,   b,  lb,  pp,  pp,   p,   p,   p,   p,   p,  pp,  pp,  pp,  pp,  pp,  lb,   b,  gb,  gb,  gg,  gg,  gg,  gg,  gg,  gg,   b,  lb,  lb,  gb,  gb,  gg,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,  gg,  gg,  gb,   b,  lb,  pp,   p,   p,   p,   0,   0,   0,   p,   p,   p,   p,   p,   p,   p,  pp,  pp,  lb,  lb,   b,  gb,  gb,  gg,  gb,  gb,  lb,  lb,  lb,  gb,  gb,  gg,  gg,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   g,  gg,  gb,  gb,   b,  lb,  pp,   p,   p,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   p,   p,   p,  pp,  pp,  lb,   b,  gb,  gb,  gg,  gb,  gb,  gb,  gb,  gb,  gb,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   g,  gg,  gb,  gb,   b,  pp,   p,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   p,  pp,  lb,   b,  gb,  gb,  gg,  gb,  gb,  gb,  gb,  gb,  gb,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   g,  gg,  gb,  gb,   b,  pp,   p,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   p,  pp,  lb,  gb,  gb,  gb,  gg,  gb,  gb,   b,  lb,  lb,   b,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   g,  gg,  gb,  gb,  gb,   b,  pp,   p,   0,   0,   0,   0,   r,   r,   r,   r,   r,   r,   r,   0,   0,   0,   0,   0,   0,   p,  pp,   b,  gb,  gb,  gg,  gb,  lb,   p,   p,   p,   p,   b,  gg,   g,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,  gg,  gb,  gb,  gb,  gb,   b,  pp,   p,   0,   0,   0,   0,   r,   r,   r,   r,   r,   r,   r,   r,   r,   r,   0,   0,   0,   p,  pp,   b,  gb,  gg,  gb,   b,   p,   p,   p,   0,   0,   p,  gb,  gg,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,  gg,  gb,  gb,  gb,  gb,   b,  lb,  pp,  pp,   p,   0,   0,   0,   r,   r,   r,   r,   r,   r,   r,   0,   0,   p,   p,   p,  pp,  lb,  gb,  gb,  gg,  gb,  lb,   p,   0,   0,   0,   0,   0,  lb,  gg,   g,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,  gg,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,   b,  lb,   p,   0,   0,   0,   r,   r,   r,   0,   0,   p,  lb,   b,   b,  lb,  lb,  gb,  gb,  gb,  gg,  gb,   b,   p,   0,   0,   r,   r,   0,   p,   b,  gg,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,  gg,  gb,  gb,  gb,  gb,  gb,  gg,  gg,  gg,  gb,  gb,   b,  lb,   p,   0,   0,   0,   0,   p,  lb,  gb,  gg,  gg,  gg,  gb,  gb,  gb,  gb,  gg,   g,  gg,  gb,  pp,   p,   0,   r,   r,   r,   0,   p,  gb,  gg,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   g,  gg,  gg,  gg,  gg,  gg,   g,   g,   g,  gg,  gg,  gb,  gb,   b,   p,   0,   0,   p,   b,  gb,  gg,   g,   g,   g,   g,  gg,  gg,   g,   0,   0,  gg,  gb,   b,  pp,   p,   0,   0,   0,   0,   p,   b,  gb,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   g,   g,   g,   g,   g,   g,   g,   g,  gg,  gg,  gg,  gg,  gb,  gb,   p,   0,   0,   p,  gb,  gg,  gg,  gg,   g,   g,   g,   g,   g,   0,   0,   0,   g,  gb,  gb,  lb,  pp,   p,   p,   p,  pp,   b,  gb,  gg,   g,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   g,   g,   g,   g,   g,   g,   g,  gg,  gg,  gb,  gb,   b,   p,   0,   p,  pp,  gb,  gb,  gb,  gb,  gb,  gb,  gg,   g,   g,   0,   g,  gg,  gg,  gb,  gb,   b,  lb,  lb,   b,  gb,  gb,  gb,  gg,   g,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   g,   g,   g,   g,   g,   g,  gg,  gb,  gb,   b,  lb,   p,   0,   0,   p,  lb,  lb,   p,   p,  lb,  gb,  gb,  gg,  gg,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  lb,   b,  gb,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   g,  gg,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  lb,   p,   p,   0,   0,   0,   p,  pp,  pp,   p,   p,   p,   p,  lb,   b,   b,   b,   b,  lb,   b,  gb,  gg,  gb,  gb,  gb,  gg,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   g,  gg,  gb,  gb,   b,   b,   b,  lb,  pp,   p,   p,   p,   0,   r,   0,   0,   p,   p,   p,   p,   0,   0,   p,   p,   p,   p,   p,  pp,   b,  gb,  gg,  gg,  gg,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,  gg,  gb,   b,  lb,  pp,  pp,   p,   0,   0,   0,   0,   0,   y,   y,   0,   p,  lb,  lb,   p,   0,   0,   0,   0,   0,   0,   p,  pp,  gb,  gg,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,  gg,  gb,   b,  pp,  pp,   p,   0,   0,   0,   p,   p,   0,   r,   r,   0,  lb,  gb,  gb,   p,   0,   r,   r,   r,   0,   0,   p,  lb,  gb,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   g,  gb,   b,  lb,   p,   0,   0,   0,   p,  pp,  pp,   p,   p,   p,  lb,  gb,  gb,  gb,  lb,   p,   r,   r,   r,   r,   0,   p,   p,   b,  gg,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   g,  gg,  gb,  lb,   p,   0,   0,   0,   p,  lb,  gb,  gb,  gb,  gb,  gb,  gg,   g,  gb,   b,   p,   r,   y,   y,   r,   0,   p,  pp,   b,  gg,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   g,  gg,  gg,  gb,  pp,   p,   0,   0,   0,   0,  pp,  gb,  gb,  gg,   g,   0,   0,   g,  gb,   b,   0,   r,   y,   y,   r,   0,   p,  pp,  gb,  gg,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   g,  gb,  gb,  pp,   p,   0,   0,   0,   0,   p,   b,  gb,  gg,   0,   0,   0,   g,  gb,  lb,   0,   r,   y,   y,   r,   0,  pp,   b,  gb,  gg,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   g,  gg,  gb,   b,  pp,   p,   0,   p,   p,  lb,  gb,  gb,  gg,   0,   0,   0,   g,  gb,   b,   p,   0,  dp,   r,  dp,   p,  lb,  gb,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   g,  gb,  gb,   b,  lb,  lb,   b,  gb,  gb,  gb,  gg,   g,   0,   0,   0,   0,   g,  gg,  gb,   b,   p,   p,   p,  lb,  gb,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   0,   g,  gb,  gb,  gb,  gb,  gg,   g,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   g,  gg,  gb,  gb,  gb,  gb,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   g,  gg,  gg,   g,   0,   0,   0,   0,   0,   0,   g,   g,   g,   g,   g,   g,   g,   g,   g,   g,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   g,   g,  gg,  gg,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   g,  gg,  gb,  gb,  lb,  pp,   p,   p,   p,   p,   p,  pp,  lb,   b,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   g,  gb,  gb,   b,   p,   p,   0,   0,   0,   p,   p,   p,  lb,  gb,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   g,  gb,  gb,   b,  lb,  lb,  lb,  lb,   b,   b,  gb,  gb,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   g,   0,   0,   0,   0,   0,   0,   0,   g,  gg,  gg,  gb,  gb,  gb,  gg,  gg,  gg,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   g,   g,  gg,  gg,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   g,   g,  gg,  gg,  gg,  gg,  gg,  gg,  gg,   g,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   g,   g,   g,   g,   g,   g,   g,   0],
  [g,  gg,  gg,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gg,   g,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   g,   g,   g,   g,   g,   g,  gg,   g,   g,   g,  gg,  gg,  gg],
  [gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gg,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   g,  gg,  gg,  gb,  gb,  gg,  gg,  gg,  gg,  gg,   g,  gg,  gg,  gb,  gb],
  [gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,   b,   b,  gb,  gb,  gb,  gb,  gb,  gb,  gg,  gg,  gg,   g,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   g,   g,  gg,  gb,  gb,  gb,  gb,  gb,  gg,  gg,  gg,  gg,  gg,  gb,  gb,  gb],
  [gb,  gb,   b,   b,  gb,  gb,  gb,  gb,  gb,  gb,   b,   b,   b,   b,   b,   b,   b,  gb,  gb,  gb,  gb,  gg,   g,   g,   0,   0,   0,   0,   0,   0,   g,   g,   g,   g,   g,  gg,  gg,  gg,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gg,  gg,  gg,  gg,  gb,  gb],
  [gb,  gb,   b,   b,   b,   b,  gb,  gb,  gb,  gb,  gb,  gb,   b,   b,   b,   b,   b,   b,   b,   b,  gb,  gb,  gg,   g,   g,   0,   0,   0,   0,   g,  gg,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gg,  gg,  gb,  gb,  gb,  gg,  gg,  gg,  gg,  gg,  gg,  gb,  gb],
  [gb,   b,   b,   b,   b,   b,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,  gb,   b,   b,   b,   b,  gb,  gb,   g,   g,   0,   0,   0,   g,  gg,  gg,  gg,  gb,  gb,  gb,  gb,  gb,  gg,  gg,  gb,  gb,  gg,  gg,   g,   g,  gg,  gg,  gg,  gg,  gg,  gb]
];

function drawShape(x, y, s1, s2, type) { // parenthesis has attributes for drawShape

  var cx = x + s1 * 0.5;
  var cy = y + s2 * 0.5;

  if (type == 0) {
    // Square
    rectMode(CENTER);
    rect(cx, cy, s1, s2);
  } 
  else if (type == 1) {
    // Circle
    ellipse(cx, cy, s1, s2);
  }
  else if (type == 2) {
    // Plus
    rectMode(CENTER);
    rect(cx, cy, s1 * 0.2, s2);
    rect(cx, cy, s1, s2 * 0.2);
  }
}

function setup() {
  createCanvas(1000, 1000);
  frameRate(25);
}

function draw() {
  background(0);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j] == g) {
        noStroke();
        fill(g);
        st = int(random(3));
        drawShape(j*17, i*20, 17, 20, st);
      } else if (grid[i][j] == gg) {
          noStroke();
          fill(gg);
          st = int(random(3));
          drawShape(j*17, i*20, 17, 20, st);
      } else if (grid[i][j] == gb) {
          noStroke();
          fill(gb);
          st = int(random(3));
          drawShape(j*17, i*20, 17, 20, st);
      } else if (grid[i][j] == b) {
          noStroke();
          fill(b);
          st = int(random(3));
          drawShape(j*17, i*20, 17, 20, st);
      } else if (grid[i][j] == lb) {
          noStroke();
          fill(lb);
          st = int(random(3));
          drawShape(j*17, i*20, 17, 20, st);
      } else if (grid[i][j] == p) {
          noStroke();
          fill(p);
          st = int(random(3));
          drawShape(j*17, i*20, 17, 20, st);
      } else if (grid[i][j] == pp) {
          noStroke();
          fill(pp);
          st = int(random(3));
          drawShape(j*17, i*20, 17, 20, st);
      } else if (grid[i][j] == r) {
          noStroke();
          fill(r);
          st = int(random(3));
          drawShape(j*17, i*20, 17, 20, st);
      } else if (grid[i][j] == y) {
          noStroke();
          fill(y);
          st = int(random(3));
          drawShape(j*17, i*20, 17, 20, st);
      } else if (grid[i][j] == dp) {
          noStroke();
          fill(dp);
          st = int(random(3));
          drawShape(j*17, i*20, 17, 20, st);
      }
    }
  }
  
  for (var k = 0; k < 1000; k += 2){
    stroke(0, 70);
    line(0, k, 867, k);
  }
}