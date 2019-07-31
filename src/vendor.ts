// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// Angular 2
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';

import 'hammerjs';
import 'rxjs/Rx';


//Issue on loading snapsvg: https://github.com/negomi/react-burger-menu/commit/1b4a99906601c04d13c8ae27f13e77eaa1cc559a
require('imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');
