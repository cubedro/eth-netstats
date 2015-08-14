//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var topojson, n;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/mrt:topojson/topojson.js                                                                        //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
!function() {                                                                                               // 1
  topojson = {                                                                                              // 2
    version: "1.6.8",                                                                                       // 3
    mesh: function(topology) { return object(topology, meshArcs.apply(this, arguments)); },                 // 4
    meshArcs: meshArcs,                                                                                     // 5
    merge: function(topology) { return object(topology, mergeArcs.apply(this, arguments)); },               // 6
    mergeArcs: mergeArcs,                                                                                   // 7
    feature: featureOrCollection,                                                                           // 8
    neighbors: neighbors,                                                                                   // 9
    presimplify: presimplify                                                                                // 10
  };                                                                                                        // 11
                                                                                                            // 12
  function stitchArcs(topology, arcs) {                                                                     // 13
    var stitchedArcs = {},                                                                                  // 14
        fragmentByStart = {},                                                                               // 15
        fragmentByEnd = {},                                                                                 // 16
        fragments = [],                                                                                     // 17
        emptyIndex = -1;                                                                                    // 18
                                                                                                            // 19
    // Stitch empty arcs first, since they may be subsumed by other arcs.                                   // 20
    arcs.forEach(function(i, j) {                                                                           // 21
      var arc = topology.arcs[i < 0 ? ~i : i], t;                                                           // 22
      if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {                                                     // 23
        t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;                                          // 24
      }                                                                                                     // 25
    });                                                                                                     // 26
                                                                                                            // 27
    arcs.forEach(function(i) {                                                                              // 28
      var e = ends(i),                                                                                      // 29
          start = e[0],                                                                                     // 30
          end = e[1],                                                                                       // 31
          f, g;                                                                                             // 32
                                                                                                            // 33
      if (f = fragmentByEnd[start]) {                                                                       // 34
        delete fragmentByEnd[f.end];                                                                        // 35
        f.push(i);                                                                                          // 36
        f.end = end;                                                                                        // 37
        if (g = fragmentByStart[end]) {                                                                     // 38
          delete fragmentByStart[g.start];                                                                  // 39
          var fg = g === f ? f : f.concat(g);                                                               // 40
          fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;                         // 41
        } else {                                                                                            // 42
          fragmentByStart[f.start] = fragmentByEnd[f.end] = f;                                              // 43
        }                                                                                                   // 44
      } else if (f = fragmentByStart[end]) {                                                                // 45
        delete fragmentByStart[f.start];                                                                    // 46
        f.unshift(i);                                                                                       // 47
        f.start = start;                                                                                    // 48
        if (g = fragmentByEnd[start]) {                                                                     // 49
          delete fragmentByEnd[g.end];                                                                      // 50
          var gf = g === f ? f : g.concat(f);                                                               // 51
          fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;                         // 52
        } else {                                                                                            // 53
          fragmentByStart[f.start] = fragmentByEnd[f.end] = f;                                              // 54
        }                                                                                                   // 55
      } else {                                                                                              // 56
        f = [i];                                                                                            // 57
        fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;                                  // 58
      }                                                                                                     // 59
    });                                                                                                     // 60
                                                                                                            // 61
    function ends(i) {                                                                                      // 62
      var arc = topology.arcs[i < 0 ? ~i : i], p0 = arc[0], p1;                                             // 63
      if (topology.transform) p1 = [0, 0], arc.forEach(function(dp) { p1[0] += dp[0], p1[1] += dp[1]; });   // 64
      else p1 = arc[arc.length - 1];                                                                        // 65
      return i < 0 ? [p1, p0] : [p0, p1];                                                                   // 66
    }                                                                                                       // 67
                                                                                                            // 68
    function flush(fragmentByEnd, fragmentByStart) {                                                        // 69
      for (var k in fragmentByEnd) {                                                                        // 70
        var f = fragmentByEnd[k];                                                                           // 71
        delete fragmentByStart[f.start];                                                                    // 72
        delete f.start;                                                                                     // 73
        delete f.end;                                                                                       // 74
        f.forEach(function(i) { stitchedArcs[i < 0 ? ~i : i] = 1; });                                       // 75
        fragments.push(f);                                                                                  // 76
      }                                                                                                     // 77
    }                                                                                                       // 78
                                                                                                            // 79
    flush(fragmentByEnd, fragmentByStart);                                                                  // 80
    flush(fragmentByStart, fragmentByEnd);                                                                  // 81
    arcs.forEach(function(i) { if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]); });                  // 82
                                                                                                            // 83
    return fragments;                                                                                       // 84
  }                                                                                                         // 85
                                                                                                            // 86
  function meshArcs(topology, o, filter) {                                                                  // 87
    var arcs = [];                                                                                          // 88
                                                                                                            // 89
    if (arguments.length > 1) {                                                                             // 90
      var geomsByArc = [],                                                                                  // 91
          geom;                                                                                             // 92
                                                                                                            // 93
      function arc(i) {                                                                                     // 94
        var j = i < 0 ? ~i : i;                                                                             // 95
        (geomsByArc[j] || (geomsByArc[j] = [])).push({i: i, g: geom});                                      // 96
      }                                                                                                     // 97
                                                                                                            // 98
      function line(arcs) {                                                                                 // 99
        arcs.forEach(arc);                                                                                  // 100
      }                                                                                                     // 101
                                                                                                            // 102
      function polygon(arcs) {                                                                              // 103
        arcs.forEach(line);                                                                                 // 104
      }                                                                                                     // 105
                                                                                                            // 106
      function geometry(o) {                                                                                // 107
        if (o.type === "GeometryCollection") o.geometries.forEach(geometry);                                // 108
        else if (o.type in geometryType) geom = o, geometryType[o.type](o.arcs);                            // 109
      }                                                                                                     // 110
                                                                                                            // 111
      var geometryType = {                                                                                  // 112
        LineString: line,                                                                                   // 113
        MultiLineString: polygon,                                                                           // 114
        Polygon: polygon,                                                                                   // 115
        MultiPolygon: function(arcs) { arcs.forEach(polygon); }                                             // 116
      };                                                                                                    // 117
                                                                                                            // 118
      geometry(o);                                                                                          // 119
                                                                                                            // 120
      geomsByArc.forEach(arguments.length < 3                                                               // 121
          ? function(geoms) { arcs.push(geoms[0].i); }                                                      // 122
          : function(geoms) { if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i); }); // 123
    } else {                                                                                                // 124
      for (var i = 0, n = topology.arcs.length; i < n; ++i) arcs.push(i);                                   // 125
    }                                                                                                       // 126
                                                                                                            // 127
    return {type: "MultiLineString", arcs: stitchArcs(topology, arcs)};                                     // 128
  }                                                                                                         // 129
                                                                                                            // 130
  function mergeArcs(topology, objects) {                                                                   // 131
    var polygonsByArc = {},                                                                                 // 132
        polygons = [],                                                                                      // 133
        components = [];                                                                                    // 134
                                                                                                            // 135
    objects.forEach(function(o) {                                                                           // 136
      if (o.type === "Polygon") register(o.arcs);                                                           // 137
      else if (o.type === "MultiPolygon") o.arcs.forEach(register);                                         // 138
    });                                                                                                     // 139
                                                                                                            // 140
    function register(polygon) {                                                                            // 141
      polygon.forEach(function(ring) {                                                                      // 142
        ring.forEach(function(arc) {                                                                        // 143
          (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);           // 144
        });                                                                                                 // 145
      });                                                                                                   // 146
      polygons.push(polygon);                                                                               // 147
    }                                                                                                       // 148
                                                                                                            // 149
    function exterior(ring) {                                                                               // 150
      return cartesianRingArea(object(topology, {type: "Polygon", arcs: [ring]}).coordinates[0]) > 0; // TODO allow spherical?
    }                                                                                                       // 152
                                                                                                            // 153
    polygons.forEach(function(polygon) {                                                                    // 154
      if (!polygon._) {                                                                                     // 155
        var component = [],                                                                                 // 156
            neighbors = [polygon];                                                                          // 157
        polygon._ = 1;                                                                                      // 158
        components.push(component);                                                                         // 159
        while (polygon = neighbors.pop()) {                                                                 // 160
          component.push(polygon);                                                                          // 161
          polygon.forEach(function(ring) {                                                                  // 162
            ring.forEach(function(arc) {                                                                    // 163
              polygonsByArc[arc < 0 ? ~arc : arc].forEach(function(polygon) {                               // 164
                if (!polygon._) {                                                                           // 165
                  polygon._ = 1;                                                                            // 166
                  neighbors.push(polygon);                                                                  // 167
                }                                                                                           // 168
              });                                                                                           // 169
            });                                                                                             // 170
          });                                                                                               // 171
        }                                                                                                   // 172
      }                                                                                                     // 173
    });                                                                                                     // 174
                                                                                                            // 175
    polygons.forEach(function(polygon) {                                                                    // 176
      delete polygon._;                                                                                     // 177
    });                                                                                                     // 178
                                                                                                            // 179
    return {                                                                                                // 180
      type: "MultiPolygon",                                                                                 // 181
      arcs: components.map(function(polygons) {                                                             // 182
        var arcs = [];                                                                                      // 183
                                                                                                            // 184
        // Extract the exterior (unique) arcs.                                                              // 185
        polygons.forEach(function(polygon) {                                                                // 186
          polygon.forEach(function(ring) {                                                                  // 187
            ring.forEach(function(arc) {                                                                    // 188
              if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {                                         // 189
                arcs.push(arc);                                                                             // 190
              }                                                                                             // 191
            });                                                                                             // 192
          });                                                                                               // 193
        });                                                                                                 // 194
                                                                                                            // 195
        // Stitch the arcs into one or more rings.                                                          // 196
        arcs = stitchArcs(topology, arcs);                                                                  // 197
                                                                                                            // 198
        // If more than one ring is returned,                                                               // 199
        // at most one of these rings can be the exterior;                                                  // 200
        // this exterior ring has the same winding order                                                    // 201
        // as any exterior ring in the original polygons.                                                   // 202
        if ((n = arcs.length) > 1) {                                                                        // 203
          var sgn = exterior(polygons[0][0]);                                                               // 204
          for (var i = 0, t; i < n; ++i) {                                                                  // 205
            if (sgn === exterior(arcs[i])) {                                                                // 206
              t = arcs[0], arcs[0] = arcs[i], arcs[i] = t;                                                  // 207
              break;                                                                                        // 208
            }                                                                                               // 209
          }                                                                                                 // 210
        }                                                                                                   // 211
                                                                                                            // 212
        return arcs;                                                                                        // 213
      })                                                                                                    // 214
    };                                                                                                      // 215
  }                                                                                                         // 216
                                                                                                            // 217
  function featureOrCollection(topology, o) {                                                               // 218
    return o.type === "GeometryCollection" ? {                                                              // 219
      type: "FeatureCollection",                                                                            // 220
      features: o.geometries.map(function(o) { return feature(topology, o); })                              // 221
    } : feature(topology, o);                                                                               // 222
  }                                                                                                         // 223
                                                                                                            // 224
  function feature(topology, o) {                                                                           // 225
    var f = {                                                                                               // 226
      type: "Feature",                                                                                      // 227
      id: o.id,                                                                                             // 228
      properties: o.properties || {},                                                                       // 229
      geometry: object(topology, o)                                                                         // 230
    };                                                                                                      // 231
    if (o.id == null) delete f.id;                                                                          // 232
    return f;                                                                                               // 233
  }                                                                                                         // 234
                                                                                                            // 235
  function object(topology, o) {                                                                            // 236
    var absolute = transformAbsolute(topology.transform),                                                   // 237
        arcs = topology.arcs;                                                                               // 238
                                                                                                            // 239
    function arc(i, points) {                                                                               // 240
      if (points.length) points.pop();                                                                      // 241
      for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length, p; k < n; ++k) {                              // 242
        points.push(p = a[k].slice());                                                                      // 243
        absolute(p, k);                                                                                     // 244
      }                                                                                                     // 245
      if (i < 0) reverse(points, n);                                                                        // 246
    }                                                                                                       // 247
                                                                                                            // 248
    function point(p) {                                                                                     // 249
      p = p.slice();                                                                                        // 250
      absolute(p, 0);                                                                                       // 251
      return p;                                                                                             // 252
    }                                                                                                       // 253
                                                                                                            // 254
    function line(arcs) {                                                                                   // 255
      var points = [];                                                                                      // 256
      for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);                                    // 257
      if (points.length < 2) points.push(points[0].slice());                                                // 258
      return points;                                                                                        // 259
    }                                                                                                       // 260
                                                                                                            // 261
    function ring(arcs) {                                                                                   // 262
      var points = line(arcs);                                                                              // 263
      while (points.length < 4) points.push(points[0].slice());                                             // 264
      return points;                                                                                        // 265
    }                                                                                                       // 266
                                                                                                            // 267
    function polygon(arcs) {                                                                                // 268
      return arcs.map(ring);                                                                                // 269
    }                                                                                                       // 270
                                                                                                            // 271
    function geometry(o) {                                                                                  // 272
      var t = o.type;                                                                                       // 273
      return t === "GeometryCollection" ? {type: t, geometries: o.geometries.map(geometry)}                 // 274
          : t in geometryType ? {type: t, coordinates: geometryType[t](o)}                                  // 275
          : null;                                                                                           // 276
    }                                                                                                       // 277
                                                                                                            // 278
    var geometryType = {                                                                                    // 279
      Point: function(o) { return point(o.coordinates); },                                                  // 280
      MultiPoint: function(o) { return o.coordinates.map(point); },                                         // 281
      LineString: function(o) { return line(o.arcs); },                                                     // 282
      MultiLineString: function(o) { return o.arcs.map(line); },                                            // 283
      Polygon: function(o) { return polygon(o.arcs); },                                                     // 284
      MultiPolygon: function(o) { return o.arcs.map(polygon); }                                             // 285
    };                                                                                                      // 286
                                                                                                            // 287
    return geometry(o);                                                                                     // 288
  }                                                                                                         // 289
                                                                                                            // 290
  function reverse(array, n) {                                                                              // 291
    var t, j = array.length, i = j - n; while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;  // 292
  }                                                                                                         // 293
                                                                                                            // 294
  function bisect(a, x) {                                                                                   // 295
    var lo = 0, hi = a.length;                                                                              // 296
    while (lo < hi) {                                                                                       // 297
      var mid = lo + hi >>> 1;                                                                              // 298
      if (a[mid] < x) lo = mid + 1;                                                                         // 299
      else hi = mid;                                                                                        // 300
    }                                                                                                       // 301
    return lo;                                                                                              // 302
  }                                                                                                         // 303
                                                                                                            // 304
  function neighbors(objects) {                                                                             // 305
    var indexesByArc = {}, // arc index -> array of object indexes                                          // 306
        neighbors = objects.map(function() { return []; });                                                 // 307
                                                                                                            // 308
    function line(arcs, i) {                                                                                // 309
      arcs.forEach(function(a) {                                                                            // 310
        if (a < 0) a = ~a;                                                                                  // 311
        var o = indexesByArc[a];                                                                            // 312
        if (o) o.push(i);                                                                                   // 313
        else indexesByArc[a] = [i];                                                                         // 314
      });                                                                                                   // 315
    }                                                                                                       // 316
                                                                                                            // 317
    function polygon(arcs, i) {                                                                             // 318
      arcs.forEach(function(arc) { line(arc, i); });                                                        // 319
    }                                                                                                       // 320
                                                                                                            // 321
    function geometry(o, i) {                                                                               // 322
      if (o.type === "GeometryCollection") o.geometries.forEach(function(o) { geometry(o, i); });           // 323
      else if (o.type in geometryType) geometryType[o.type](o.arcs, i);                                     // 324
    }                                                                                                       // 325
                                                                                                            // 326
    var geometryType = {                                                                                    // 327
      LineString: line,                                                                                     // 328
      MultiLineString: polygon,                                                                             // 329
      Polygon: polygon,                                                                                     // 330
      MultiPolygon: function(arcs, i) { arcs.forEach(function(arc) { polygon(arc, i); }); }                 // 331
    };                                                                                                      // 332
                                                                                                            // 333
    objects.forEach(geometry);                                                                              // 334
                                                                                                            // 335
    for (var i in indexesByArc) {                                                                           // 336
      for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {                          // 337
        for (var k = j + 1; k < m; ++k) {                                                                   // 338
          var ij = indexes[j], ik = indexes[k], n;                                                          // 339
          if ((n = neighbors[ij])[i = bisect(n, ik)] !== ik) n.splice(i, 0, ik);                            // 340
          if ((n = neighbors[ik])[i = bisect(n, ij)] !== ij) n.splice(i, 0, ij);                            // 341
        }                                                                                                   // 342
      }                                                                                                     // 343
    }                                                                                                       // 344
                                                                                                            // 345
    return neighbors;                                                                                       // 346
  }                                                                                                         // 347
                                                                                                            // 348
  function presimplify(topology, triangleArea) {                                                            // 349
    var absolute = transformAbsolute(topology.transform),                                                   // 350
        relative = transformRelative(topology.transform),                                                   // 351
        heap = minAreaHeap(),                                                                               // 352
        maxArea = 0,                                                                                        // 353
        triangle;                                                                                           // 354
                                                                                                            // 355
    if (!triangleArea) triangleArea = cartesianTriangleArea;                                                // 356
                                                                                                            // 357
    topology.arcs.forEach(function(arc) {                                                                   // 358
      var triangles = [];                                                                                   // 359
                                                                                                            // 360
      arc.forEach(absolute);                                                                                // 361
                                                                                                            // 362
      for (var i = 1, n = arc.length - 1; i < n; ++i) {                                                     // 363
        triangle = arc.slice(i - 1, i + 2);                                                                 // 364
        triangle[1][2] = triangleArea(triangle);                                                            // 365
        triangles.push(triangle);                                                                           // 366
        heap.push(triangle);                                                                                // 367
      }                                                                                                     // 368
                                                                                                            // 369
      // Always keep the arc endpoints!                                                                     // 370
      arc[0][2] = arc[n][2] = Infinity;                                                                     // 371
                                                                                                            // 372
      for (var i = 0, n = triangles.length; i < n; ++i) {                                                   // 373
        triangle = triangles[i];                                                                            // 374
        triangle.previous = triangles[i - 1];                                                               // 375
        triangle.next = triangles[i + 1];                                                                   // 376
      }                                                                                                     // 377
    });                                                                                                     // 378
                                                                                                            // 379
    while (triangle = heap.pop()) {                                                                         // 380
      var previous = triangle.previous,                                                                     // 381
          next = triangle.next;                                                                             // 382
                                                                                                            // 383
      // If the area of the current point is less than that of the previous point                           // 384
      // to be eliminated, use the latter's area instead. This ensures that the                             // 385
      // current point cannot be eliminated without eliminating previously-                                 // 386
      // eliminated points.                                                                                 // 387
      if (triangle[1][2] < maxArea) triangle[1][2] = maxArea;                                               // 388
      else maxArea = triangle[1][2];                                                                        // 389
                                                                                                            // 390
      if (previous) {                                                                                       // 391
        previous.next = next;                                                                               // 392
        previous[2] = triangle[2];                                                                          // 393
        update(previous);                                                                                   // 394
      }                                                                                                     // 395
                                                                                                            // 396
      if (next) {                                                                                           // 397
        next.previous = previous;                                                                           // 398
        next[0] = triangle[0];                                                                              // 399
        update(next);                                                                                       // 400
      }                                                                                                     // 401
    }                                                                                                       // 402
                                                                                                            // 403
    topology.arcs.forEach(function(arc) {                                                                   // 404
      arc.forEach(relative);                                                                                // 405
    });                                                                                                     // 406
                                                                                                            // 407
    function update(triangle) {                                                                             // 408
      heap.remove(triangle);                                                                                // 409
      triangle[1][2] = triangleArea(triangle);                                                              // 410
      heap.push(triangle);                                                                                  // 411
    }                                                                                                       // 412
                                                                                                            // 413
    return topology;                                                                                        // 414
  };                                                                                                        // 415
                                                                                                            // 416
  function cartesianRingArea(ring) {                                                                        // 417
    var i = -1,                                                                                             // 418
        n = ring.length,                                                                                    // 419
        a,                                                                                                  // 420
        b = ring[n - 1],                                                                                    // 421
        area = 0;                                                                                           // 422
                                                                                                            // 423
    while (++i < n) {                                                                                       // 424
      a = b;                                                                                                // 425
      b = ring[i];                                                                                          // 426
      area += a[0] * b[1] - a[1] * b[0];                                                                    // 427
    }                                                                                                       // 428
                                                                                                            // 429
    return area * .5;                                                                                       // 430
  }                                                                                                         // 431
                                                                                                            // 432
  function cartesianTriangleArea(triangle) {                                                                // 433
    var a = triangle[0], b = triangle[1], c = triangle[2];                                                  // 434
    return Math.abs((a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]));                         // 435
  }                                                                                                         // 436
                                                                                                            // 437
  function compareArea(a, b) {                                                                              // 438
    return a[1][2] - b[1][2];                                                                               // 439
  }                                                                                                         // 440
                                                                                                            // 441
  function minAreaHeap() {                                                                                  // 442
    var heap = {},                                                                                          // 443
        array = [],                                                                                         // 444
        size = 0;                                                                                           // 445
                                                                                                            // 446
    heap.push = function(object) {                                                                          // 447
      up(array[object._ = size] = object, size++);                                                          // 448
      return size;                                                                                          // 449
    };                                                                                                      // 450
                                                                                                            // 451
    heap.pop = function() {                                                                                 // 452
      if (size <= 0) return;                                                                                // 453
      var removed = array[0], object;                                                                       // 454
      if (--size > 0) object = array[size], down(array[object._ = 0] = object, 0);                          // 455
      return removed;                                                                                       // 456
    };                                                                                                      // 457
                                                                                                            // 458
    heap.remove = function(removed) {                                                                       // 459
      var i = removed._, object;                                                                            // 460
      if (array[i] !== removed) return; // invalid request                                                  // 461
      if (i !== --size) object = array[size], (compareArea(object, removed) < 0 ? up : down)(array[object._ = i] = object, i);
      return i;                                                                                             // 463
    };                                                                                                      // 464
                                                                                                            // 465
    function up(object, i) {                                                                                // 466
      while (i > 0) {                                                                                       // 467
        var j = ((i + 1) >> 1) - 1,                                                                         // 468
            parent = array[j];                                                                              // 469
        if (compareArea(object, parent) >= 0) break;                                                        // 470
        array[parent._ = i] = parent;                                                                       // 471
        array[object._ = i = j] = object;                                                                   // 472
      }                                                                                                     // 473
    }                                                                                                       // 474
                                                                                                            // 475
    function down(object, i) {                                                                              // 476
      while (true) {                                                                                        // 477
        var r = (i + 1) << 1,                                                                               // 478
            l = r - 1,                                                                                      // 479
            j = i,                                                                                          // 480
            child = array[j];                                                                               // 481
        if (l < size && compareArea(array[l], child) < 0) child = array[j = l];                             // 482
        if (r < size && compareArea(array[r], child) < 0) child = array[j = r];                             // 483
        if (j === i) break;                                                                                 // 484
        array[child._ = i] = child;                                                                         // 485
        array[object._ = i = j] = object;                                                                   // 486
      }                                                                                                     // 487
    }                                                                                                       // 488
                                                                                                            // 489
    return heap;                                                                                            // 490
  }                                                                                                         // 491
                                                                                                            // 492
  function transformAbsolute(transform) {                                                                   // 493
    if (!transform) return noop;                                                                            // 494
    var x0,                                                                                                 // 495
        y0,                                                                                                 // 496
        kx = transform.scale[0],                                                                            // 497
        ky = transform.scale[1],                                                                            // 498
        dx = transform.translate[0],                                                                        // 499
        dy = transform.translate[1];                                                                        // 500
    return function(point, i) {                                                                             // 501
      if (!i) x0 = y0 = 0;                                                                                  // 502
      point[0] = (x0 += point[0]) * kx + dx;                                                                // 503
      point[1] = (y0 += point[1]) * ky + dy;                                                                // 504
    };                                                                                                      // 505
  }                                                                                                         // 506
                                                                                                            // 507
  function transformRelative(transform) {                                                                   // 508
    if (!transform) return noop;                                                                            // 509
    var x0,                                                                                                 // 510
        y0,                                                                                                 // 511
        kx = transform.scale[0],                                                                            // 512
        ky = transform.scale[1],                                                                            // 513
        dx = transform.translate[0],                                                                        // 514
        dy = transform.translate[1];                                                                        // 515
    return function(point, i) {                                                                             // 516
      if (!i) x0 = y0 = 0;                                                                                  // 517
      var x1 = (point[0] - dx) / kx | 0,                                                                    // 518
          y1 = (point[1] - dy) / ky | 0;                                                                    // 519
      point[0] = x1 - x0;                                                                                   // 520
      point[1] = y1 - y0;                                                                                   // 521
      x0 = x1;                                                                                              // 522
      y0 = y1;                                                                                              // 523
    };                                                                                                      // 524
  }                                                                                                         // 525
                                                                                                            // 526
  function noop() {}                                                                                        // 527
                                                                                                            // 528
  if (typeof define === "function" && define.amd) define(topojson);                                         // 529
  else if (typeof module === "object" && module.exports) module.exports = topojson;                         // 530
  else this.topojson = topojson;                                                                            // 531
}();                                                                                                        // 532
                                                                                                            // 533
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:topojson'] = {
  topojson: topojson
};

})();
