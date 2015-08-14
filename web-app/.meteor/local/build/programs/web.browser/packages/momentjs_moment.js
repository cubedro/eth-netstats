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
var moment;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/momentjs:moment/moment.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
//! moment.js                                                                                                          // 1
//! version : 2.10.6                                                                                                   // 2
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors                                                         // 3
//! license : MIT                                                                                                      // 4
//! momentjs.com                                                                                                       // 5
                                                                                                                       // 6
(function (global, factory) {                                                                                          // 7
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :                        // 8
    typeof define === 'function' && define.amd ? define(factory) :                                                     // 9
    global.moment = factory()                                                                                          // 10
}(this, function () { 'use strict';                                                                                    // 11
                                                                                                                       // 12
    var hookCallback;                                                                                                  // 13
                                                                                                                       // 14
    function utils_hooks__hooks () {                                                                                   // 15
        return hookCallback.apply(null, arguments);                                                                    // 16
    }                                                                                                                  // 17
                                                                                                                       // 18
    // This is done to register the method called with moment()                                                        // 19
    // without creating circular dependencies.                                                                         // 20
    function setHookCallback (callback) {                                                                              // 21
        hookCallback = callback;                                                                                       // 22
    }                                                                                                                  // 23
                                                                                                                       // 24
    function isArray(input) {                                                                                          // 25
        return Object.prototype.toString.call(input) === '[object Array]';                                             // 26
    }                                                                                                                  // 27
                                                                                                                       // 28
    function isDate(input) {                                                                                           // 29
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';                     // 30
    }                                                                                                                  // 31
                                                                                                                       // 32
    function map(arr, fn) {                                                                                            // 33
        var res = [], i;                                                                                               // 34
        for (i = 0; i < arr.length; ++i) {                                                                             // 35
            res.push(fn(arr[i], i));                                                                                   // 36
        }                                                                                                              // 37
        return res;                                                                                                    // 38
    }                                                                                                                  // 39
                                                                                                                       // 40
    function hasOwnProp(a, b) {                                                                                        // 41
        return Object.prototype.hasOwnProperty.call(a, b);                                                             // 42
    }                                                                                                                  // 43
                                                                                                                       // 44
    function extend(a, b) {                                                                                            // 45
        for (var i in b) {                                                                                             // 46
            if (hasOwnProp(b, i)) {                                                                                    // 47
                a[i] = b[i];                                                                                           // 48
            }                                                                                                          // 49
        }                                                                                                              // 50
                                                                                                                       // 51
        if (hasOwnProp(b, 'toString')) {                                                                               // 52
            a.toString = b.toString;                                                                                   // 53
        }                                                                                                              // 54
                                                                                                                       // 55
        if (hasOwnProp(b, 'valueOf')) {                                                                                // 56
            a.valueOf = b.valueOf;                                                                                     // 57
        }                                                                                                              // 58
                                                                                                                       // 59
        return a;                                                                                                      // 60
    }                                                                                                                  // 61
                                                                                                                       // 62
    function create_utc__createUTC (input, format, locale, strict) {                                                   // 63
        return createLocalOrUTC(input, format, locale, strict, true).utc();                                            // 64
    }                                                                                                                  // 65
                                                                                                                       // 66
    function defaultParsingFlags() {                                                                                   // 67
        // We need to deep clone this object.                                                                          // 68
        return {                                                                                                       // 69
            empty           : false,                                                                                   // 70
            unusedTokens    : [],                                                                                      // 71
            unusedInput     : [],                                                                                      // 72
            overflow        : -2,                                                                                      // 73
            charsLeftOver   : 0,                                                                                       // 74
            nullInput       : false,                                                                                   // 75
            invalidMonth    : null,                                                                                    // 76
            invalidFormat   : false,                                                                                   // 77
            userInvalidated : false,                                                                                   // 78
            iso             : false                                                                                    // 79
        };                                                                                                             // 80
    }                                                                                                                  // 81
                                                                                                                       // 82
    function getParsingFlags(m) {                                                                                      // 83
        if (m._pf == null) {                                                                                           // 84
            m._pf = defaultParsingFlags();                                                                             // 85
        }                                                                                                              // 86
        return m._pf;                                                                                                  // 87
    }                                                                                                                  // 88
                                                                                                                       // 89
    function valid__isValid(m) {                                                                                       // 90
        if (m._isValid == null) {                                                                                      // 91
            var flags = getParsingFlags(m);                                                                            // 92
            m._isValid = !isNaN(m._d.getTime()) &&                                                                     // 93
                flags.overflow < 0 &&                                                                                  // 94
                !flags.empty &&                                                                                        // 95
                !flags.invalidMonth &&                                                                                 // 96
                !flags.invalidWeekday &&                                                                               // 97
                !flags.nullInput &&                                                                                    // 98
                !flags.invalidFormat &&                                                                                // 99
                !flags.userInvalidated;                                                                                // 100
                                                                                                                       // 101
            if (m._strict) {                                                                                           // 102
                m._isValid = m._isValid &&                                                                             // 103
                    flags.charsLeftOver === 0 &&                                                                       // 104
                    flags.unusedTokens.length === 0 &&                                                                 // 105
                    flags.bigHour === undefined;                                                                       // 106
            }                                                                                                          // 107
        }                                                                                                              // 108
        return m._isValid;                                                                                             // 109
    }                                                                                                                  // 110
                                                                                                                       // 111
    function valid__createInvalid (flags) {                                                                            // 112
        var m = create_utc__createUTC(NaN);                                                                            // 113
        if (flags != null) {                                                                                           // 114
            extend(getParsingFlags(m), flags);                                                                         // 115
        }                                                                                                              // 116
        else {                                                                                                         // 117
            getParsingFlags(m).userInvalidated = true;                                                                 // 118
        }                                                                                                              // 119
                                                                                                                       // 120
        return m;                                                                                                      // 121
    }                                                                                                                  // 122
                                                                                                                       // 123
    var momentProperties = utils_hooks__hooks.momentProperties = [];                                                   // 124
                                                                                                                       // 125
    function copyConfig(to, from) {                                                                                    // 126
        var i, prop, val;                                                                                              // 127
                                                                                                                       // 128
        if (typeof from._isAMomentObject !== 'undefined') {                                                            // 129
            to._isAMomentObject = from._isAMomentObject;                                                               // 130
        }                                                                                                              // 131
        if (typeof from._i !== 'undefined') {                                                                          // 132
            to._i = from._i;                                                                                           // 133
        }                                                                                                              // 134
        if (typeof from._f !== 'undefined') {                                                                          // 135
            to._f = from._f;                                                                                           // 136
        }                                                                                                              // 137
        if (typeof from._l !== 'undefined') {                                                                          // 138
            to._l = from._l;                                                                                           // 139
        }                                                                                                              // 140
        if (typeof from._strict !== 'undefined') {                                                                     // 141
            to._strict = from._strict;                                                                                 // 142
        }                                                                                                              // 143
        if (typeof from._tzm !== 'undefined') {                                                                        // 144
            to._tzm = from._tzm;                                                                                       // 145
        }                                                                                                              // 146
        if (typeof from._isUTC !== 'undefined') {                                                                      // 147
            to._isUTC = from._isUTC;                                                                                   // 148
        }                                                                                                              // 149
        if (typeof from._offset !== 'undefined') {                                                                     // 150
            to._offset = from._offset;                                                                                 // 151
        }                                                                                                              // 152
        if (typeof from._pf !== 'undefined') {                                                                         // 153
            to._pf = getParsingFlags(from);                                                                            // 154
        }                                                                                                              // 155
        if (typeof from._locale !== 'undefined') {                                                                     // 156
            to._locale = from._locale;                                                                                 // 157
        }                                                                                                              // 158
                                                                                                                       // 159
        if (momentProperties.length > 0) {                                                                             // 160
            for (i in momentProperties) {                                                                              // 161
                prop = momentProperties[i];                                                                            // 162
                val = from[prop];                                                                                      // 163
                if (typeof val !== 'undefined') {                                                                      // 164
                    to[prop] = val;                                                                                    // 165
                }                                                                                                      // 166
            }                                                                                                          // 167
        }                                                                                                              // 168
                                                                                                                       // 169
        return to;                                                                                                     // 170
    }                                                                                                                  // 171
                                                                                                                       // 172
    var updateInProgress = false;                                                                                      // 173
                                                                                                                       // 174
    // Moment prototype object                                                                                         // 175
    function Moment(config) {                                                                                          // 176
        copyConfig(this, config);                                                                                      // 177
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);                                             // 178
        // Prevent infinite loop in case updateOffset creates new moment                                               // 179
        // objects.                                                                                                    // 180
        if (updateInProgress === false) {                                                                              // 181
            updateInProgress = true;                                                                                   // 182
            utils_hooks__hooks.updateOffset(this);                                                                     // 183
            updateInProgress = false;                                                                                  // 184
        }                                                                                                              // 185
    }                                                                                                                  // 186
                                                                                                                       // 187
    function isMoment (obj) {                                                                                          // 188
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);                                 // 189
    }                                                                                                                  // 190
                                                                                                                       // 191
    function absFloor (number) {                                                                                       // 192
        if (number < 0) {                                                                                              // 193
            return Math.ceil(number);                                                                                  // 194
        } else {                                                                                                       // 195
            return Math.floor(number);                                                                                 // 196
        }                                                                                                              // 197
    }                                                                                                                  // 198
                                                                                                                       // 199
    function toInt(argumentForCoercion) {                                                                              // 200
        var coercedNumber = +argumentForCoercion,                                                                      // 201
            value = 0;                                                                                                 // 202
                                                                                                                       // 203
        if (coercedNumber !== 0 && isFinite(coercedNumber)) {                                                          // 204
            value = absFloor(coercedNumber);                                                                           // 205
        }                                                                                                              // 206
                                                                                                                       // 207
        return value;                                                                                                  // 208
    }                                                                                                                  // 209
                                                                                                                       // 210
    function compareArrays(array1, array2, dontConvert) {                                                              // 211
        var len = Math.min(array1.length, array2.length),                                                              // 212
            lengthDiff = Math.abs(array1.length - array2.length),                                                      // 213
            diffs = 0,                                                                                                 // 214
            i;                                                                                                         // 215
        for (i = 0; i < len; i++) {                                                                                    // 216
            if ((dontConvert && array1[i] !== array2[i]) ||                                                            // 217
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {                                             // 218
                diffs++;                                                                                               // 219
            }                                                                                                          // 220
        }                                                                                                              // 221
        return diffs + lengthDiff;                                                                                     // 222
    }                                                                                                                  // 223
                                                                                                                       // 224
    function Locale() {                                                                                                // 225
    }                                                                                                                  // 226
                                                                                                                       // 227
    var locales = {};                                                                                                  // 228
    var globalLocale;                                                                                                  // 229
                                                                                                                       // 230
    function normalizeLocale(key) {                                                                                    // 231
        return key ? key.toLowerCase().replace('_', '-') : key;                                                        // 232
    }                                                                                                                  // 233
                                                                                                                       // 234
    // pick the locale from the array                                                                                  // 235
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each                       // 236
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {                                                                                     // 238
        var i = 0, j, next, locale, split;                                                                             // 239
                                                                                                                       // 240
        while (i < names.length) {                                                                                     // 241
            split = normalizeLocale(names[i]).split('-');                                                              // 242
            j = split.length;                                                                                          // 243
            next = normalizeLocale(names[i + 1]);                                                                      // 244
            next = next ? next.split('-') : null;                                                                      // 245
            while (j > 0) {                                                                                            // 246
                locale = loadLocale(split.slice(0, j).join('-'));                                                      // 247
                if (locale) {                                                                                          // 248
                    return locale;                                                                                     // 249
                }                                                                                                      // 250
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {                           // 251
                    //the next array item is better than a shallower substring of this one                             // 252
                    break;                                                                                             // 253
                }                                                                                                      // 254
                j--;                                                                                                   // 255
            }                                                                                                          // 256
            i++;                                                                                                       // 257
        }                                                                                                              // 258
        return null;                                                                                                   // 259
    }                                                                                                                  // 260
                                                                                                                       // 261
    function loadLocale(name) {                                                                                        // 262
        var oldLocale = null;                                                                                          // 263
        // TODO: Find a better way to register and load all the locales in Node                                        // 264
        if (!locales[name] && typeof module !== 'undefined' &&                                                         // 265
                module && module.exports) {                                                                            // 266
            try {                                                                                                      // 267
                oldLocale = globalLocale._abbr;                                                                        // 268
                require('./locale/' + name);                                                                           // 269
                // because defineLocale currently also sets the global locale, we                                      // 270
                // want to undo that for lazy loaded locales                                                           // 271
                locale_locales__getSetGlobalLocale(oldLocale);                                                         // 272
            } catch (e) { }                                                                                            // 273
        }                                                                                                              // 274
        return locales[name];                                                                                          // 275
    }                                                                                                                  // 276
                                                                                                                       // 277
    // This function will load locale and then set the global locale.  If                                              // 278
    // no arguments are passed in, it will simply return the current global                                            // 279
    // locale key.                                                                                                     // 280
    function locale_locales__getSetGlobalLocale (key, values) {                                                        // 281
        var data;                                                                                                      // 282
        if (key) {                                                                                                     // 283
            if (typeof values === 'undefined') {                                                                       // 284
                data = locale_locales__getLocale(key);                                                                 // 285
            }                                                                                                          // 286
            else {                                                                                                     // 287
                data = defineLocale(key, values);                                                                      // 288
            }                                                                                                          // 289
                                                                                                                       // 290
            if (data) {                                                                                                // 291
                // moment.duration._locale = moment._locale = data;                                                    // 292
                globalLocale = data;                                                                                   // 293
            }                                                                                                          // 294
        }                                                                                                              // 295
                                                                                                                       // 296
        return globalLocale._abbr;                                                                                     // 297
    }                                                                                                                  // 298
                                                                                                                       // 299
    function defineLocale (name, values) {                                                                             // 300
        if (values !== null) {                                                                                         // 301
            values.abbr = name;                                                                                        // 302
            locales[name] = locales[name] || new Locale();                                                             // 303
            locales[name].set(values);                                                                                 // 304
                                                                                                                       // 305
            // backwards compat for now: also set the locale                                                           // 306
            locale_locales__getSetGlobalLocale(name);                                                                  // 307
                                                                                                                       // 308
            return locales[name];                                                                                      // 309
        } else {                                                                                                       // 310
            // useful for testing                                                                                      // 311
            delete locales[name];                                                                                      // 312
            return null;                                                                                               // 313
        }                                                                                                              // 314
    }                                                                                                                  // 315
                                                                                                                       // 316
    // returns locale data                                                                                             // 317
    function locale_locales__getLocale (key) {                                                                         // 318
        var locale;                                                                                                    // 319
                                                                                                                       // 320
        if (key && key._locale && key._locale._abbr) {                                                                 // 321
            key = key._locale._abbr;                                                                                   // 322
        }                                                                                                              // 323
                                                                                                                       // 324
        if (!key) {                                                                                                    // 325
            return globalLocale;                                                                                       // 326
        }                                                                                                              // 327
                                                                                                                       // 328
        if (!isArray(key)) {                                                                                           // 329
            //short-circuit everything else                                                                            // 330
            locale = loadLocale(key);                                                                                  // 331
            if (locale) {                                                                                              // 332
                return locale;                                                                                         // 333
            }                                                                                                          // 334
            key = [key];                                                                                               // 335
        }                                                                                                              // 336
                                                                                                                       // 337
        return chooseLocale(key);                                                                                      // 338
    }                                                                                                                  // 339
                                                                                                                       // 340
    var aliases = {};                                                                                                  // 341
                                                                                                                       // 342
    function addUnitAlias (unit, shorthand) {                                                                          // 343
        var lowerCase = unit.toLowerCase();                                                                            // 344
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;                                     // 345
    }                                                                                                                  // 346
                                                                                                                       // 347
    function normalizeUnits(units) {                                                                                   // 348
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;                 // 349
    }                                                                                                                  // 350
                                                                                                                       // 351
    function normalizeObjectUnits(inputObject) {                                                                       // 352
        var normalizedInput = {},                                                                                      // 353
            normalizedProp,                                                                                            // 354
            prop;                                                                                                      // 355
                                                                                                                       // 356
        for (prop in inputObject) {                                                                                    // 357
            if (hasOwnProp(inputObject, prop)) {                                                                       // 358
                normalizedProp = normalizeUnits(prop);                                                                 // 359
                if (normalizedProp) {                                                                                  // 360
                    normalizedInput[normalizedProp] = inputObject[prop];                                               // 361
                }                                                                                                      // 362
            }                                                                                                          // 363
        }                                                                                                              // 364
                                                                                                                       // 365
        return normalizedInput;                                                                                        // 366
    }                                                                                                                  // 367
                                                                                                                       // 368
    function makeGetSet (unit, keepTime) {                                                                             // 369
        return function (value) {                                                                                      // 370
            if (value != null) {                                                                                       // 371
                get_set__set(this, unit, value);                                                                       // 372
                utils_hooks__hooks.updateOffset(this, keepTime);                                                       // 373
                return this;                                                                                           // 374
            } else {                                                                                                   // 375
                return get_set__get(this, unit);                                                                       // 376
            }                                                                                                          // 377
        };                                                                                                             // 378
    }                                                                                                                  // 379
                                                                                                                       // 380
    function get_set__get (mom, unit) {                                                                                // 381
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();                                                     // 382
    }                                                                                                                  // 383
                                                                                                                       // 384
    function get_set__set (mom, unit, value) {                                                                         // 385
        return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);                                                // 386
    }                                                                                                                  // 387
                                                                                                                       // 388
    // MOMENTS                                                                                                         // 389
                                                                                                                       // 390
    function getSet (units, value) {                                                                                   // 391
        var unit;                                                                                                      // 392
        if (typeof units === 'object') {                                                                               // 393
            for (unit in units) {                                                                                      // 394
                this.set(unit, units[unit]);                                                                           // 395
            }                                                                                                          // 396
        } else {                                                                                                       // 397
            units = normalizeUnits(units);                                                                             // 398
            if (typeof this[units] === 'function') {                                                                   // 399
                return this[units](value);                                                                             // 400
            }                                                                                                          // 401
        }                                                                                                              // 402
        return this;                                                                                                   // 403
    }                                                                                                                  // 404
                                                                                                                       // 405
    function zeroFill(number, targetLength, forceSign) {                                                               // 406
        var absNumber = '' + Math.abs(number),                                                                         // 407
            zerosToFill = targetLength - absNumber.length,                                                             // 408
            sign = number >= 0;                                                                                        // 409
        return (sign ? (forceSign ? '+' : '') : '-') +                                                                 // 410
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;                                   // 411
    }                                                                                                                  // 412
                                                                                                                       // 413
    var formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
                                                                                                                       // 415
    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;                                          // 416
                                                                                                                       // 417
    var formatFunctions = {};                                                                                          // 418
                                                                                                                       // 419
    var formatTokenFunctions = {};                                                                                     // 420
                                                                                                                       // 421
    // token:    'M'                                                                                                   // 422
    // padded:   ['MM', 2]                                                                                             // 423
    // ordinal:  'Mo'                                                                                                  // 424
    // callback: function () { this.month() + 1 }                                                                      // 425
    function addFormatToken (token, padded, ordinal, callback) {                                                       // 426
        var func = callback;                                                                                           // 427
        if (typeof callback === 'string') {                                                                            // 428
            func = function () {                                                                                       // 429
                return this[callback]();                                                                               // 430
            };                                                                                                         // 431
        }                                                                                                              // 432
        if (token) {                                                                                                   // 433
            formatTokenFunctions[token] = func;                                                                        // 434
        }                                                                                                              // 435
        if (padded) {                                                                                                  // 436
            formatTokenFunctions[padded[0]] = function () {                                                            // 437
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);                                    // 438
            };                                                                                                         // 439
        }                                                                                                              // 440
        if (ordinal) {                                                                                                 // 441
            formatTokenFunctions[ordinal] = function () {                                                              // 442
                return this.localeData().ordinal(func.apply(this, arguments), token);                                  // 443
            };                                                                                                         // 444
        }                                                                                                              // 445
    }                                                                                                                  // 446
                                                                                                                       // 447
    function removeFormattingTokens(input) {                                                                           // 448
        if (input.match(/\[[\s\S]/)) {                                                                                 // 449
            return input.replace(/^\[|\]$/g, '');                                                                      // 450
        }                                                                                                              // 451
        return input.replace(/\\/g, '');                                                                               // 452
    }                                                                                                                  // 453
                                                                                                                       // 454
    function makeFormatFunction(format) {                                                                              // 455
        var array = format.match(formattingTokens), i, length;                                                         // 456
                                                                                                                       // 457
        for (i = 0, length = array.length; i < length; i++) {                                                          // 458
            if (formatTokenFunctions[array[i]]) {                                                                      // 459
                array[i] = formatTokenFunctions[array[i]];                                                             // 460
            } else {                                                                                                   // 461
                array[i] = removeFormattingTokens(array[i]);                                                           // 462
            }                                                                                                          // 463
        }                                                                                                              // 464
                                                                                                                       // 465
        return function (mom) {                                                                                        // 466
            var output = '';                                                                                           // 467
            for (i = 0; i < length; i++) {                                                                             // 468
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];                        // 469
            }                                                                                                          // 470
            return output;                                                                                             // 471
        };                                                                                                             // 472
    }                                                                                                                  // 473
                                                                                                                       // 474
    // format date using native date object                                                                            // 475
    function formatMoment(m, format) {                                                                                 // 476
        if (!m.isValid()) {                                                                                            // 477
            return m.localeData().invalidDate();                                                                       // 478
        }                                                                                                              // 479
                                                                                                                       // 480
        format = expandFormat(format, m.localeData());                                                                 // 481
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);                               // 482
                                                                                                                       // 483
        return formatFunctions[format](m);                                                                             // 484
    }                                                                                                                  // 485
                                                                                                                       // 486
    function expandFormat(format, locale) {                                                                            // 487
        var i = 5;                                                                                                     // 488
                                                                                                                       // 489
        function replaceLongDateFormatTokens(input) {                                                                  // 490
            return locale.longDateFormat(input) || input;                                                              // 491
        }                                                                                                              // 492
                                                                                                                       // 493
        localFormattingTokens.lastIndex = 0;                                                                           // 494
        while (i >= 0 && localFormattingTokens.test(format)) {                                                         // 495
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);                               // 496
            localFormattingTokens.lastIndex = 0;                                                                       // 497
            i -= 1;                                                                                                    // 498
        }                                                                                                              // 499
                                                                                                                       // 500
        return format;                                                                                                 // 501
    }                                                                                                                  // 502
                                                                                                                       // 503
    var match1         = /\d/;            //       0 - 9                                                               // 504
    var match2         = /\d\d/;          //      00 - 99                                                              // 505
    var match3         = /\d{3}/;         //     000 - 999                                                             // 506
    var match4         = /\d{4}/;         //    0000 - 9999                                                            // 507
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999                                                          // 508
    var match1to2      = /\d\d?/;         //       0 - 99                                                              // 509
    var match1to3      = /\d{1,3}/;       //       0 - 999                                                             // 510
    var match1to4      = /\d{1,4}/;       //       0 - 9999                                                            // 511
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999                                                          // 512
                                                                                                                       // 513
    var matchUnsigned  = /\d+/;           //       0 - inf                                                             // 514
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf                                                             // 515
                                                                                                                       // 516
    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z                                       // 517
                                                                                                                       // 518
    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123                                            // 519
                                                                                                                       // 520
    // any word (or two) characters or numbers including two/three word month in arabic.                               // 521
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
                                                                                                                       // 523
    var regexes = {};                                                                                                  // 524
                                                                                                                       // 525
    function isFunction (sth) {                                                                                        // 526
        // https://github.com/moment/moment/issues/2325                                                                // 527
        return typeof sth === 'function' &&                                                                            // 528
            Object.prototype.toString.call(sth) === '[object Function]';                                               // 529
    }                                                                                                                  // 530
                                                                                                                       // 531
                                                                                                                       // 532
    function addRegexToken (token, regex, strictRegex) {                                                               // 533
        regexes[token] = isFunction(regex) ? regex : function (isStrict) {                                             // 534
            return (isStrict && strictRegex) ? strictRegex : regex;                                                    // 535
        };                                                                                                             // 536
    }                                                                                                                  // 537
                                                                                                                       // 538
    function getParseRegexForToken (token, config) {                                                                   // 539
        if (!hasOwnProp(regexes, token)) {                                                                             // 540
            return new RegExp(unescapeFormat(token));                                                                  // 541
        }                                                                                                              // 542
                                                                                                                       // 543
        return regexes[token](config._strict, config._locale);                                                         // 544
    }                                                                                                                  // 545
                                                                                                                       // 546
    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript            // 547
    function unescapeFormat(s) {                                                                                       // 548
        return s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) { // 549
            return p1 || p2 || p3 || p4;                                                                               // 550
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');                                                                  // 551
    }                                                                                                                  // 552
                                                                                                                       // 553
    var tokens = {};                                                                                                   // 554
                                                                                                                       // 555
    function addParseToken (token, callback) {                                                                         // 556
        var i, func = callback;                                                                                        // 557
        if (typeof token === 'string') {                                                                               // 558
            token = [token];                                                                                           // 559
        }                                                                                                              // 560
        if (typeof callback === 'number') {                                                                            // 561
            func = function (input, array) {                                                                           // 562
                array[callback] = toInt(input);                                                                        // 563
            };                                                                                                         // 564
        }                                                                                                              // 565
        for (i = 0; i < token.length; i++) {                                                                           // 566
            tokens[token[i]] = func;                                                                                   // 567
        }                                                                                                              // 568
    }                                                                                                                  // 569
                                                                                                                       // 570
    function addWeekParseToken (token, callback) {                                                                     // 571
        addParseToken(token, function (input, array, config, token) {                                                  // 572
            config._w = config._w || {};                                                                               // 573
            callback(input, config._w, config, token);                                                                 // 574
        });                                                                                                            // 575
    }                                                                                                                  // 576
                                                                                                                       // 577
    function addTimeToArrayFromToken(token, input, config) {                                                           // 578
        if (input != null && hasOwnProp(tokens, token)) {                                                              // 579
            tokens[token](input, config._a, config, token);                                                            // 580
        }                                                                                                              // 581
    }                                                                                                                  // 582
                                                                                                                       // 583
    var YEAR = 0;                                                                                                      // 584
    var MONTH = 1;                                                                                                     // 585
    var DATE = 2;                                                                                                      // 586
    var HOUR = 3;                                                                                                      // 587
    var MINUTE = 4;                                                                                                    // 588
    var SECOND = 5;                                                                                                    // 589
    var MILLISECOND = 6;                                                                                               // 590
                                                                                                                       // 591
    function daysInMonth(year, month) {                                                                                // 592
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();                                                    // 593
    }                                                                                                                  // 594
                                                                                                                       // 595
    // FORMATTING                                                                                                      // 596
                                                                                                                       // 597
    addFormatToken('M', ['MM', 2], 'Mo', function () {                                                                 // 598
        return this.month() + 1;                                                                                       // 599
    });                                                                                                                // 600
                                                                                                                       // 601
    addFormatToken('MMM', 0, 0, function (format) {                                                                    // 602
        return this.localeData().monthsShort(this, format);                                                            // 603
    });                                                                                                                // 604
                                                                                                                       // 605
    addFormatToken('MMMM', 0, 0, function (format) {                                                                   // 606
        return this.localeData().months(this, format);                                                                 // 607
    });                                                                                                                // 608
                                                                                                                       // 609
    // ALIASES                                                                                                         // 610
                                                                                                                       // 611
    addUnitAlias('month', 'M');                                                                                        // 612
                                                                                                                       // 613
    // PARSING                                                                                                         // 614
                                                                                                                       // 615
    addRegexToken('M',    match1to2);                                                                                  // 616
    addRegexToken('MM',   match1to2, match2);                                                                          // 617
    addRegexToken('MMM',  matchWord);                                                                                  // 618
    addRegexToken('MMMM', matchWord);                                                                                  // 619
                                                                                                                       // 620
    addParseToken(['M', 'MM'], function (input, array) {                                                               // 621
        array[MONTH] = toInt(input) - 1;                                                                               // 622
    });                                                                                                                // 623
                                                                                                                       // 624
    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {                                            // 625
        var month = config._locale.monthsParse(input, token, config._strict);                                          // 626
        // if we didn't find a month name, mark the date as invalid.                                                   // 627
        if (month != null) {                                                                                           // 628
            array[MONTH] = month;                                                                                      // 629
        } else {                                                                                                       // 630
            getParsingFlags(config).invalidMonth = input;                                                              // 631
        }                                                                                                              // 632
    });                                                                                                                // 633
                                                                                                                       // 634
    // LOCALES                                                                                                         // 635
                                                                                                                       // 636
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m) {                                                                                        // 638
        return this._months[m.month()];                                                                                // 639
    }                                                                                                                  // 640
                                                                                                                       // 641
    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');                       // 642
    function localeMonthsShort (m) {                                                                                   // 643
        return this._monthsShort[m.month()];                                                                           // 644
    }                                                                                                                  // 645
                                                                                                                       // 646
    function localeMonthsParse (monthName, format, strict) {                                                           // 647
        var i, mom, regex;                                                                                             // 648
                                                                                                                       // 649
        if (!this._monthsParse) {                                                                                      // 650
            this._monthsParse = [];                                                                                    // 651
            this._longMonthsParse = [];                                                                                // 652
            this._shortMonthsParse = [];                                                                               // 653
        }                                                                                                              // 654
                                                                                                                       // 655
        for (i = 0; i < 12; i++) {                                                                                     // 656
            // make the regex if we don't have it already                                                              // 657
            mom = create_utc__createUTC([2000, i]);                                                                    // 658
            if (strict && !this._longMonthsParse[i]) {                                                                 // 659
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');         // 660
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');   // 661
            }                                                                                                          // 662
            if (!strict && !this._monthsParse[i]) {                                                                    // 663
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');                                 // 664
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');                                        // 665
            }                                                                                                          // 666
            // test the regex                                                                                          // 667
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {                             // 668
                return i;                                                                                              // 669
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {                      // 670
                return i;                                                                                              // 671
            } else if (!strict && this._monthsParse[i].test(monthName)) {                                              // 672
                return i;                                                                                              // 673
            }                                                                                                          // 674
        }                                                                                                              // 675
    }                                                                                                                  // 676
                                                                                                                       // 677
    // MOMENTS                                                                                                         // 678
                                                                                                                       // 679
    function setMonth (mom, value) {                                                                                   // 680
        var dayOfMonth;                                                                                                // 681
                                                                                                                       // 682
        // TODO: Move this out of here!                                                                                // 683
        if (typeof value === 'string') {                                                                               // 684
            value = mom.localeData().monthsParse(value);                                                               // 685
            // TODO: Another silent failure?                                                                           // 686
            if (typeof value !== 'number') {                                                                           // 687
                return mom;                                                                                            // 688
            }                                                                                                          // 689
        }                                                                                                              // 690
                                                                                                                       // 691
        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));                                             // 692
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);                                        // 693
        return mom;                                                                                                    // 694
    }                                                                                                                  // 695
                                                                                                                       // 696
    function getSetMonth (value) {                                                                                     // 697
        if (value != null) {                                                                                           // 698
            setMonth(this, value);                                                                                     // 699
            utils_hooks__hooks.updateOffset(this, true);                                                               // 700
            return this;                                                                                               // 701
        } else {                                                                                                       // 702
            return get_set__get(this, 'Month');                                                                        // 703
        }                                                                                                              // 704
    }                                                                                                                  // 705
                                                                                                                       // 706
    function getDaysInMonth () {                                                                                       // 707
        return daysInMonth(this.year(), this.month());                                                                 // 708
    }                                                                                                                  // 709
                                                                                                                       // 710
    function checkOverflow (m) {                                                                                       // 711
        var overflow;                                                                                                  // 712
        var a = m._a;                                                                                                  // 713
                                                                                                                       // 714
        if (a && getParsingFlags(m).overflow === -2) {                                                                 // 715
            overflow =                                                                                                 // 716
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :                                                   // 717
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :                         // 718
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :                                                  // 720
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :                                                  // 721
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :                                             // 722
                -1;                                                                                                    // 723
                                                                                                                       // 724
            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {                       // 725
                overflow = DATE;                                                                                       // 726
            }                                                                                                          // 727
                                                                                                                       // 728
            getParsingFlags(m).overflow = overflow;                                                                    // 729
        }                                                                                                              // 730
                                                                                                                       // 731
        return m;                                                                                                      // 732
    }                                                                                                                  // 733
                                                                                                                       // 734
    function warn(msg) {                                                                                               // 735
        if (utils_hooks__hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);                                                               // 737
        }                                                                                                              // 738
    }                                                                                                                  // 739
                                                                                                                       // 740
    function deprecate(msg, fn) {                                                                                      // 741
        var firstTime = true;                                                                                          // 742
                                                                                                                       // 743
        return extend(function () {                                                                                    // 744
            if (firstTime) {                                                                                           // 745
                warn(msg + '\n' + (new Error()).stack);                                                                // 746
                firstTime = false;                                                                                     // 747
            }                                                                                                          // 748
            return fn.apply(this, arguments);                                                                          // 749
        }, fn);                                                                                                        // 750
    }                                                                                                                  // 751
                                                                                                                       // 752
    var deprecations = {};                                                                                             // 753
                                                                                                                       // 754
    function deprecateSimple(name, msg) {                                                                              // 755
        if (!deprecations[name]) {                                                                                     // 756
            warn(msg);                                                                                                 // 757
            deprecations[name] = true;                                                                                 // 758
        }                                                                                                              // 759
    }                                                                                                                  // 760
                                                                                                                       // 761
    utils_hooks__hooks.suppressDeprecationWarnings = false;                                                            // 762
                                                                                                                       // 763
    var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
                                                                                                                       // 765
    var isoDates = [                                                                                                   // 766
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],                                                                     // 767
        ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],                                                                           // 768
        ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],                                                                           // 769
        ['GGGG-[W]WW', /\d{4}-W\d{2}/],                                                                                // 770
        ['YYYY-DDD', /\d{4}-\d{3}/]                                                                                    // 771
    ];                                                                                                                 // 772
                                                                                                                       // 773
    // iso time formats and regexes                                                                                    // 774
    var isoTimes = [                                                                                                   // 775
        ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],                                                                 // 776
        ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],                                                                           // 777
        ['HH:mm', /(T| )\d\d:\d\d/],                                                                                   // 778
        ['HH', /(T| )\d\d/]                                                                                            // 779
    ];                                                                                                                 // 780
                                                                                                                       // 781
    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;                                                                       // 782
                                                                                                                       // 783
    // date from iso format                                                                                            // 784
    function configFromISO(config) {                                                                                   // 785
        var i, l,                                                                                                      // 786
            string = config._i,                                                                                        // 787
            match = from_string__isoRegex.exec(string);                                                                // 788
                                                                                                                       // 789
        if (match) {                                                                                                   // 790
            getParsingFlags(config).iso = true;                                                                        // 791
            for (i = 0, l = isoDates.length; i < l; i++) {                                                             // 792
                if (isoDates[i][1].exec(string)) {                                                                     // 793
                    config._f = isoDates[i][0];                                                                        // 794
                    break;                                                                                             // 795
                }                                                                                                      // 796
            }                                                                                                          // 797
            for (i = 0, l = isoTimes.length; i < l; i++) {                                                             // 798
                if (isoTimes[i][1].exec(string)) {                                                                     // 799
                    // match[6] should be 'T' or space                                                                 // 800
                    config._f += (match[6] || ' ') + isoTimes[i][0];                                                   // 801
                    break;                                                                                             // 802
                }                                                                                                      // 803
            }                                                                                                          // 804
            if (string.match(matchOffset)) {                                                                           // 805
                config._f += 'Z';                                                                                      // 806
            }                                                                                                          // 807
            configFromStringAndFormat(config);                                                                         // 808
        } else {                                                                                                       // 809
            config._isValid = false;                                                                                   // 810
        }                                                                                                              // 811
    }                                                                                                                  // 812
                                                                                                                       // 813
    // date from iso format or fallback                                                                                // 814
    function configFromString(config) {                                                                                // 815
        var matched = aspNetJsonRegex.exec(config._i);                                                                 // 816
                                                                                                                       // 817
        if (matched !== null) {                                                                                        // 818
            config._d = new Date(+matched[1]);                                                                         // 819
            return;                                                                                                    // 820
        }                                                                                                              // 821
                                                                                                                       // 822
        configFromISO(config);                                                                                         // 823
        if (config._isValid === false) {                                                                               // 824
            delete config._isValid;                                                                                    // 825
            utils_hooks__hooks.createFromInputFallback(config);                                                        // 826
        }                                                                                                              // 827
    }                                                                                                                  // 828
                                                                                                                       // 829
    utils_hooks__hooks.createFromInputFallback = deprecate(                                                            // 830
        'moment construction falls back to js Date. This is ' +                                                        // 831
        'discouraged and will be removed in upcoming major ' +                                                         // 832
        'release. Please refer to ' +                                                                                  // 833
        'https://github.com/moment/moment/issues/1407 for more info.',                                                 // 834
        function (config) {                                                                                            // 835
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));                                          // 836
        }                                                                                                              // 837
    );                                                                                                                 // 838
                                                                                                                       // 839
    function createDate (y, m, d, h, M, s, ms) {                                                                       // 840
        //can't just apply() to create a date:                                                                         // 841
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);                                                                     // 843
                                                                                                                       // 844
        //the date constructor doesn't accept years < 1970                                                             // 845
        if (y < 1970) {                                                                                                // 846
            date.setFullYear(y);                                                                                       // 847
        }                                                                                                              // 848
        return date;                                                                                                   // 849
    }                                                                                                                  // 850
                                                                                                                       // 851
    function createUTCDate (y) {                                                                                       // 852
        var date = new Date(Date.UTC.apply(null, arguments));                                                          // 853
        if (y < 1970) {                                                                                                // 854
            date.setUTCFullYear(y);                                                                                    // 855
        }                                                                                                              // 856
        return date;                                                                                                   // 857
    }                                                                                                                  // 858
                                                                                                                       // 859
    addFormatToken(0, ['YY', 2], 0, function () {                                                                      // 860
        return this.year() % 100;                                                                                      // 861
    });                                                                                                                // 862
                                                                                                                       // 863
    addFormatToken(0, ['YYYY',   4],       0, 'year');                                                                 // 864
    addFormatToken(0, ['YYYYY',  5],       0, 'year');                                                                 // 865
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');                                                                 // 866
                                                                                                                       // 867
    // ALIASES                                                                                                         // 868
                                                                                                                       // 869
    addUnitAlias('year', 'y');                                                                                         // 870
                                                                                                                       // 871
    // PARSING                                                                                                         // 872
                                                                                                                       // 873
    addRegexToken('Y',      matchSigned);                                                                              // 874
    addRegexToken('YY',     match1to2, match2);                                                                        // 875
    addRegexToken('YYYY',   match1to4, match4);                                                                        // 876
    addRegexToken('YYYYY',  match1to6, match6);                                                                        // 877
    addRegexToken('YYYYYY', match1to6, match6);                                                                        // 878
                                                                                                                       // 879
    addParseToken(['YYYYY', 'YYYYYY'], YEAR);                                                                          // 880
    addParseToken('YYYY', function (input, array) {                                                                    // 881
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);                 // 882
    });                                                                                                                // 883
    addParseToken('YY', function (input, array) {                                                                      // 884
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);                                                     // 885
    });                                                                                                                // 886
                                                                                                                       // 887
    // HELPERS                                                                                                         // 888
                                                                                                                       // 889
    function daysInYear(year) {                                                                                        // 890
        return isLeapYear(year) ? 366 : 365;                                                                           // 891
    }                                                                                                                  // 892
                                                                                                                       // 893
    function isLeapYear(year) {                                                                                        // 894
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;                                               // 895
    }                                                                                                                  // 896
                                                                                                                       // 897
    // HOOKS                                                                                                           // 898
                                                                                                                       // 899
    utils_hooks__hooks.parseTwoDigitYear = function (input) {                                                          // 900
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);                                                       // 901
    };                                                                                                                 // 902
                                                                                                                       // 903
    // MOMENTS                                                                                                         // 904
                                                                                                                       // 905
    var getSetYear = makeGetSet('FullYear', false);                                                                    // 906
                                                                                                                       // 907
    function getIsLeapYear () {                                                                                        // 908
        return isLeapYear(this.year());                                                                                // 909
    }                                                                                                                  // 910
                                                                                                                       // 911
    addFormatToken('w', ['ww', 2], 'wo', 'week');                                                                      // 912
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');                                                                   // 913
                                                                                                                       // 914
    // ALIASES                                                                                                         // 915
                                                                                                                       // 916
    addUnitAlias('week', 'w');                                                                                         // 917
    addUnitAlias('isoWeek', 'W');                                                                                      // 918
                                                                                                                       // 919
    // PARSING                                                                                                         // 920
                                                                                                                       // 921
    addRegexToken('w',  match1to2);                                                                                    // 922
    addRegexToken('ww', match1to2, match2);                                                                            // 923
    addRegexToken('W',  match1to2);                                                                                    // 924
    addRegexToken('WW', match1to2, match2);                                                                            // 925
                                                                                                                       // 926
    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {                                  // 927
        week[token.substr(0, 1)] = toInt(input);                                                                       // 928
    });                                                                                                                // 929
                                                                                                                       // 930
    // HELPERS                                                                                                         // 931
                                                                                                                       // 932
    // firstDayOfWeek       0 = sun, 6 = sat                                                                           // 933
    //                      the day of the week that starts the week                                                   // 934
    //                      (usually sunday or monday)                                                                 // 935
    // firstDayOfWeekOfYear 0 = sun, 6 = sat                                                                           // 936
    //                      the first week is the week that contains the first                                         // 937
    //                      of this day of the week                                                                    // 938
    //                      (eg. ISO weeks use thursday (4))                                                           // 939
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {                                                   // 940
        var end = firstDayOfWeekOfYear - firstDayOfWeek,                                                               // 941
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),                                                        // 942
            adjustedMoment;                                                                                            // 943
                                                                                                                       // 944
                                                                                                                       // 945
        if (daysToDayOfWeek > end) {                                                                                   // 946
            daysToDayOfWeek -= 7;                                                                                      // 947
        }                                                                                                              // 948
                                                                                                                       // 949
        if (daysToDayOfWeek < end - 7) {                                                                               // 950
            daysToDayOfWeek += 7;                                                                                      // 951
        }                                                                                                              // 952
                                                                                                                       // 953
        adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, 'd');                                            // 954
        return {                                                                                                       // 955
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),                                                           // 956
            year: adjustedMoment.year()                                                                                // 957
        };                                                                                                             // 958
    }                                                                                                                  // 959
                                                                                                                       // 960
    // LOCALES                                                                                                         // 961
                                                                                                                       // 962
    function localeWeek (mom) {                                                                                        // 963
        return weekOfYear(mom, this._week.dow, this._week.doy).week;                                                   // 964
    }                                                                                                                  // 965
                                                                                                                       // 966
    var defaultLocaleWeek = {                                                                                          // 967
        dow : 0, // Sunday is the first day of the week.                                                               // 968
        doy : 6  // The week that contains Jan 1st is the first week of the year.                                      // 969
    };                                                                                                                 // 970
                                                                                                                       // 971
    function localeFirstDayOfWeek () {                                                                                 // 972
        return this._week.dow;                                                                                         // 973
    }                                                                                                                  // 974
                                                                                                                       // 975
    function localeFirstDayOfYear () {                                                                                 // 976
        return this._week.doy;                                                                                         // 977
    }                                                                                                                  // 978
                                                                                                                       // 979
    // MOMENTS                                                                                                         // 980
                                                                                                                       // 981
    function getSetWeek (input) {                                                                                      // 982
        var week = this.localeData().week(this);                                                                       // 983
        return input == null ? week : this.add((input - week) * 7, 'd');                                               // 984
    }                                                                                                                  // 985
                                                                                                                       // 986
    function getSetISOWeek (input) {                                                                                   // 987
        var week = weekOfYear(this, 1, 4).week;                                                                        // 988
        return input == null ? week : this.add((input - week) * 7, 'd');                                               // 989
    }                                                                                                                  // 990
                                                                                                                       // 991
    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');                                                           // 992
                                                                                                                       // 993
    // ALIASES                                                                                                         // 994
                                                                                                                       // 995
    addUnitAlias('dayOfYear', 'DDD');                                                                                  // 996
                                                                                                                       // 997
    // PARSING                                                                                                         // 998
                                                                                                                       // 999
    addRegexToken('DDD',  match1to3);                                                                                  // 1000
    addRegexToken('DDDD', match3);                                                                                     // 1001
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {                                                   // 1002
        config._dayOfYear = toInt(input);                                                                              // 1003
    });                                                                                                                // 1004
                                                                                                                       // 1005
    // HELPERS                                                                                                         // 1006
                                                                                                                       // 1007
    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday          // 1008
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {                           // 1009
        var week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear, janX = createUTCDate(year, 0, 1 + week1Jan), d = janX.getUTCDay(), dayOfYear;
        if (d < firstDayOfWeek) {                                                                                      // 1011
            d += 7;                                                                                                    // 1012
        }                                                                                                              // 1013
                                                                                                                       // 1014
        weekday = weekday != null ? 1 * weekday : firstDayOfWeek;                                                      // 1015
                                                                                                                       // 1016
        dayOfYear = 1 + week1Jan + 7 * (week - 1) - d + weekday;                                                       // 1017
                                                                                                                       // 1018
        return {                                                                                                       // 1019
            year: dayOfYear > 0 ? year : year - 1,                                                                     // 1020
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear                                   // 1021
        };                                                                                                             // 1022
    }                                                                                                                  // 1023
                                                                                                                       // 1024
    // MOMENTS                                                                                                         // 1025
                                                                                                                       // 1026
    function getSetDayOfYear (input) {                                                                                 // 1027
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;          // 1028
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');                                         // 1029
    }                                                                                                                  // 1030
                                                                                                                       // 1031
    // Pick the first defined of two or three arguments.                                                               // 1032
    function defaults(a, b, c) {                                                                                       // 1033
        if (a != null) {                                                                                               // 1034
            return a;                                                                                                  // 1035
        }                                                                                                              // 1036
        if (b != null) {                                                                                               // 1037
            return b;                                                                                                  // 1038
        }                                                                                                              // 1039
        return c;                                                                                                      // 1040
    }                                                                                                                  // 1041
                                                                                                                       // 1042
    function currentDateArray(config) {                                                                                // 1043
        var now = new Date();                                                                                          // 1044
        if (config._useUTC) {                                                                                          // 1045
            return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];                                        // 1046
        }                                                                                                              // 1047
        return [now.getFullYear(), now.getMonth(), now.getDate()];                                                     // 1048
    }                                                                                                                  // 1049
                                                                                                                       // 1050
    // convert an array to a date.                                                                                     // 1051
    // the array should mirror the parameters below                                                                    // 1052
    // note: all values past the year are optional and will default to the lowest possible value.                      // 1053
    // [year, month, day , hour, minute, second, millisecond]                                                          // 1054
    function configFromArray (config) {                                                                                // 1055
        var i, date, input = [], currentDate, yearToUse;                                                               // 1056
                                                                                                                       // 1057
        if (config._d) {                                                                                               // 1058
            return;                                                                                                    // 1059
        }                                                                                                              // 1060
                                                                                                                       // 1061
        currentDate = currentDateArray(config);                                                                        // 1062
                                                                                                                       // 1063
        //compute day of the year from weeks and weekdays                                                              // 1064
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {                                        // 1065
            dayOfYearFromWeekInfo(config);                                                                             // 1066
        }                                                                                                              // 1067
                                                                                                                       // 1068
        //if the day of the year is set, figure out what it is                                                         // 1069
        if (config._dayOfYear) {                                                                                       // 1070
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);                                                  // 1071
                                                                                                                       // 1072
            if (config._dayOfYear > daysInYear(yearToUse)) {                                                           // 1073
                getParsingFlags(config)._overflowDayOfYear = true;                                                     // 1074
            }                                                                                                          // 1075
                                                                                                                       // 1076
            date = createUTCDate(yearToUse, 0, config._dayOfYear);                                                     // 1077
            config._a[MONTH] = date.getUTCMonth();                                                                     // 1078
            config._a[DATE] = date.getUTCDate();                                                                       // 1079
        }                                                                                                              // 1080
                                                                                                                       // 1081
        // Default to current date.                                                                                    // 1082
        // * if no year, month, day of month are given, default to today                                               // 1083
        // * if day of month is given, default month and year                                                          // 1084
        // * if month is given, default only year                                                                      // 1085
        // * if year is given, don't default anything                                                                  // 1086
        for (i = 0; i < 3 && config._a[i] == null; ++i) {                                                              // 1087
            config._a[i] = input[i] = currentDate[i];                                                                  // 1088
        }                                                                                                              // 1089
                                                                                                                       // 1090
        // Zero out whatever was not defaulted, including time                                                         // 1091
        for (; i < 7; i++) {                                                                                           // 1092
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];                       // 1093
        }                                                                                                              // 1094
                                                                                                                       // 1095
        // Check for 24:00:00.000                                                                                      // 1096
        if (config._a[HOUR] === 24 &&                                                                                  // 1097
                config._a[MINUTE] === 0 &&                                                                             // 1098
                config._a[SECOND] === 0 &&                                                                             // 1099
                config._a[MILLISECOND] === 0) {                                                                        // 1100
            config._nextDay = true;                                                                                    // 1101
            config._a[HOUR] = 0;                                                                                       // 1102
        }                                                                                                              // 1103
                                                                                                                       // 1104
        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);                                  // 1105
        // Apply timezone offset from input. The actual utcOffset can be changed                                       // 1106
        // with parseZone.                                                                                             // 1107
        if (config._tzm != null) {                                                                                     // 1108
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);                                          // 1109
        }                                                                                                              // 1110
                                                                                                                       // 1111
        if (config._nextDay) {                                                                                         // 1112
            config._a[HOUR] = 24;                                                                                      // 1113
        }                                                                                                              // 1114
    }                                                                                                                  // 1115
                                                                                                                       // 1116
    function dayOfYearFromWeekInfo(config) {                                                                           // 1117
        var w, weekYear, week, weekday, dow, doy, temp;                                                                // 1118
                                                                                                                       // 1119
        w = config._w;                                                                                                 // 1120
        if (w.GG != null || w.W != null || w.E != null) {                                                              // 1121
            dow = 1;                                                                                                   // 1122
            doy = 4;                                                                                                   // 1123
                                                                                                                       // 1124
            // TODO: We need to take the current isoWeekYear, but that depends on                                      // 1125
            // how we interpret now (local, utc, fixed offset). So create                                              // 1126
            // a now version of current config (take local/utc/offset flags, and                                       // 1127
            // create now).                                                                                            // 1128
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);                   // 1129
            week = defaults(w.W, 1);                                                                                   // 1130
            weekday = defaults(w.E, 1);                                                                                // 1131
        } else {                                                                                                       // 1132
            dow = config._locale._week.dow;                                                                            // 1133
            doy = config._locale._week.doy;                                                                            // 1134
                                                                                                                       // 1135
            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);               // 1136
            week = defaults(w.w, 1);                                                                                   // 1137
                                                                                                                       // 1138
            if (w.d != null) {                                                                                         // 1139
                // weekday -- low day numbers are considered next week                                                 // 1140
                weekday = w.d;                                                                                         // 1141
                if (weekday < dow) {                                                                                   // 1142
                    ++week;                                                                                            // 1143
                }                                                                                                      // 1144
            } else if (w.e != null) {                                                                                  // 1145
                // local weekday -- counting starts from begining of week                                              // 1146
                weekday = w.e + dow;                                                                                   // 1147
            } else {                                                                                                   // 1148
                // default to begining of week                                                                         // 1149
                weekday = dow;                                                                                         // 1150
            }                                                                                                          // 1151
        }                                                                                                              // 1152
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);                                                  // 1153
                                                                                                                       // 1154
        config._a[YEAR] = temp.year;                                                                                   // 1155
        config._dayOfYear = temp.dayOfYear;                                                                            // 1156
    }                                                                                                                  // 1157
                                                                                                                       // 1158
    utils_hooks__hooks.ISO_8601 = function () {};                                                                      // 1159
                                                                                                                       // 1160
    // date from string and format string                                                                              // 1161
    function configFromStringAndFormat(config) {                                                                       // 1162
        // TODO: Move this to another part of the creation flow to prevent circular deps                               // 1163
        if (config._f === utils_hooks__hooks.ISO_8601) {                                                               // 1164
            configFromISO(config);                                                                                     // 1165
            return;                                                                                                    // 1166
        }                                                                                                              // 1167
                                                                                                                       // 1168
        config._a = [];                                                                                                // 1169
        getParsingFlags(config).empty = true;                                                                          // 1170
                                                                                                                       // 1171
        // This array is used to make a Date, either with `new Date` or `Date.UTC`                                     // 1172
        var string = '' + config._i,                                                                                   // 1173
            i, parsedInput, tokens, token, skipped,                                                                    // 1174
            stringLength = string.length,                                                                              // 1175
            totalParsedInputLength = 0;                                                                                // 1176
                                                                                                                       // 1177
        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];                                // 1178
                                                                                                                       // 1179
        for (i = 0; i < tokens.length; i++) {                                                                          // 1180
            token = tokens[i];                                                                                         // 1181
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];                               // 1182
            if (parsedInput) {                                                                                         // 1183
                skipped = string.substr(0, string.indexOf(parsedInput));                                               // 1184
                if (skipped.length > 0) {                                                                              // 1185
                    getParsingFlags(config).unusedInput.push(skipped);                                                 // 1186
                }                                                                                                      // 1187
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);                               // 1188
                totalParsedInputLength += parsedInput.length;                                                          // 1189
            }                                                                                                          // 1190
            // don't parse if it's not a known token                                                                   // 1191
            if (formatTokenFunctions[token]) {                                                                         // 1192
                if (parsedInput) {                                                                                     // 1193
                    getParsingFlags(config).empty = false;                                                             // 1194
                }                                                                                                      // 1195
                else {                                                                                                 // 1196
                    getParsingFlags(config).unusedTokens.push(token);                                                  // 1197
                }                                                                                                      // 1198
                addTimeToArrayFromToken(token, parsedInput, config);                                                   // 1199
            }                                                                                                          // 1200
            else if (config._strict && !parsedInput) {                                                                 // 1201
                getParsingFlags(config).unusedTokens.push(token);                                                      // 1202
            }                                                                                                          // 1203
        }                                                                                                              // 1204
                                                                                                                       // 1205
        // add remaining unparsed input length to the string                                                           // 1206
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;                                 // 1207
        if (string.length > 0) {                                                                                       // 1208
            getParsingFlags(config).unusedInput.push(string);                                                          // 1209
        }                                                                                                              // 1210
                                                                                                                       // 1211
        // clear _12h flag if hour is <= 12                                                                            // 1212
        if (getParsingFlags(config).bigHour === true &&                                                                // 1213
                config._a[HOUR] <= 12 &&                                                                               // 1214
                config._a[HOUR] > 0) {                                                                                 // 1215
            getParsingFlags(config).bigHour = undefined;                                                               // 1216
        }                                                                                                              // 1217
        // handle meridiem                                                                                             // 1218
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);                          // 1219
                                                                                                                       // 1220
        configFromArray(config);                                                                                       // 1221
        checkOverflow(config);                                                                                         // 1222
    }                                                                                                                  // 1223
                                                                                                                       // 1224
                                                                                                                       // 1225
    function meridiemFixWrap (locale, hour, meridiem) {                                                                // 1226
        var isPm;                                                                                                      // 1227
                                                                                                                       // 1228
        if (meridiem == null) {                                                                                        // 1229
            // nothing to do                                                                                           // 1230
            return hour;                                                                                               // 1231
        }                                                                                                              // 1232
        if (locale.meridiemHour != null) {                                                                             // 1233
            return locale.meridiemHour(hour, meridiem);                                                                // 1234
        } else if (locale.isPM != null) {                                                                              // 1235
            // Fallback                                                                                                // 1236
            isPm = locale.isPM(meridiem);                                                                              // 1237
            if (isPm && hour < 12) {                                                                                   // 1238
                hour += 12;                                                                                            // 1239
            }                                                                                                          // 1240
            if (!isPm && hour === 12) {                                                                                // 1241
                hour = 0;                                                                                              // 1242
            }                                                                                                          // 1243
            return hour;                                                                                               // 1244
        } else {                                                                                                       // 1245
            // this is not supposed to happen                                                                          // 1246
            return hour;                                                                                               // 1247
        }                                                                                                              // 1248
    }                                                                                                                  // 1249
                                                                                                                       // 1250
    function configFromStringAndArray(config) {                                                                        // 1251
        var tempConfig,                                                                                                // 1252
            bestMoment,                                                                                                // 1253
                                                                                                                       // 1254
            scoreToBeat,                                                                                               // 1255
            i,                                                                                                         // 1256
            currentScore;                                                                                              // 1257
                                                                                                                       // 1258
        if (config._f.length === 0) {                                                                                  // 1259
            getParsingFlags(config).invalidFormat = true;                                                              // 1260
            config._d = new Date(NaN);                                                                                 // 1261
            return;                                                                                                    // 1262
        }                                                                                                              // 1263
                                                                                                                       // 1264
        for (i = 0; i < config._f.length; i++) {                                                                       // 1265
            currentScore = 0;                                                                                          // 1266
            tempConfig = copyConfig({}, config);                                                                       // 1267
            if (config._useUTC != null) {                                                                              // 1268
                tempConfig._useUTC = config._useUTC;                                                                   // 1269
            }                                                                                                          // 1270
            tempConfig._f = config._f[i];                                                                              // 1271
            configFromStringAndFormat(tempConfig);                                                                     // 1272
                                                                                                                       // 1273
            if (!valid__isValid(tempConfig)) {                                                                         // 1274
                continue;                                                                                              // 1275
            }                                                                                                          // 1276
                                                                                                                       // 1277
            // if there is any input that was not parsed add a penalty for that format                                 // 1278
            currentScore += getParsingFlags(tempConfig).charsLeftOver;                                                 // 1279
                                                                                                                       // 1280
            //or tokens                                                                                                // 1281
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;                                      // 1282
                                                                                                                       // 1283
            getParsingFlags(tempConfig).score = currentScore;                                                          // 1284
                                                                                                                       // 1285
            if (scoreToBeat == null || currentScore < scoreToBeat) {                                                   // 1286
                scoreToBeat = currentScore;                                                                            // 1287
                bestMoment = tempConfig;                                                                               // 1288
            }                                                                                                          // 1289
        }                                                                                                              // 1290
                                                                                                                       // 1291
        extend(config, bestMoment || tempConfig);                                                                      // 1292
    }                                                                                                                  // 1293
                                                                                                                       // 1294
    function configFromObject(config) {                                                                                // 1295
        if (config._d) {                                                                                               // 1296
            return;                                                                                                    // 1297
        }                                                                                                              // 1298
                                                                                                                       // 1299
        var i = normalizeObjectUnits(config._i);                                                                       // 1300
        config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond];                     // 1301
                                                                                                                       // 1302
        configFromArray(config);                                                                                       // 1303
    }                                                                                                                  // 1304
                                                                                                                       // 1305
    function createFromConfig (config) {                                                                               // 1306
        var res = new Moment(checkOverflow(prepareConfig(config)));                                                    // 1307
        if (res._nextDay) {                                                                                            // 1308
            // Adding is smart enough around DST                                                                       // 1309
            res.add(1, 'd');                                                                                           // 1310
            res._nextDay = undefined;                                                                                  // 1311
        }                                                                                                              // 1312
                                                                                                                       // 1313
        return res;                                                                                                    // 1314
    }                                                                                                                  // 1315
                                                                                                                       // 1316
    function prepareConfig (config) {                                                                                  // 1317
        var input = config._i,                                                                                         // 1318
            format = config._f;                                                                                        // 1319
                                                                                                                       // 1320
        config._locale = config._locale || locale_locales__getLocale(config._l);                                       // 1321
                                                                                                                       // 1322
        if (input === null || (format === undefined && input === '')) {                                                // 1323
            return valid__createInvalid({nullInput: true});                                                            // 1324
        }                                                                                                              // 1325
                                                                                                                       // 1326
        if (typeof input === 'string') {                                                                               // 1327
            config._i = input = config._locale.preparse(input);                                                        // 1328
        }                                                                                                              // 1329
                                                                                                                       // 1330
        if (isMoment(input)) {                                                                                         // 1331
            return new Moment(checkOverflow(input));                                                                   // 1332
        } else if (isArray(format)) {                                                                                  // 1333
            configFromStringAndArray(config);                                                                          // 1334
        } else if (format) {                                                                                           // 1335
            configFromStringAndFormat(config);                                                                         // 1336
        } else if (isDate(input)) {                                                                                    // 1337
            config._d = input;                                                                                         // 1338
        } else {                                                                                                       // 1339
            configFromInput(config);                                                                                   // 1340
        }                                                                                                              // 1341
                                                                                                                       // 1342
        return config;                                                                                                 // 1343
    }                                                                                                                  // 1344
                                                                                                                       // 1345
    function configFromInput(config) {                                                                                 // 1346
        var input = config._i;                                                                                         // 1347
        if (input === undefined) {                                                                                     // 1348
            config._d = new Date();                                                                                    // 1349
        } else if (isDate(input)) {                                                                                    // 1350
            config._d = new Date(+input);                                                                              // 1351
        } else if (typeof input === 'string') {                                                                        // 1352
            configFromString(config);                                                                                  // 1353
        } else if (isArray(input)) {                                                                                   // 1354
            config._a = map(input.slice(0), function (obj) {                                                           // 1355
                return parseInt(obj, 10);                                                                              // 1356
            });                                                                                                        // 1357
            configFromArray(config);                                                                                   // 1358
        } else if (typeof(input) === 'object') {                                                                       // 1359
            configFromObject(config);                                                                                  // 1360
        } else if (typeof(input) === 'number') {                                                                       // 1361
            // from milliseconds                                                                                       // 1362
            config._d = new Date(input);                                                                               // 1363
        } else {                                                                                                       // 1364
            utils_hooks__hooks.createFromInputFallback(config);                                                        // 1365
        }                                                                                                              // 1366
    }                                                                                                                  // 1367
                                                                                                                       // 1368
    function createLocalOrUTC (input, format, locale, strict, isUTC) {                                                 // 1369
        var c = {};                                                                                                    // 1370
                                                                                                                       // 1371
        if (typeof(locale) === 'boolean') {                                                                            // 1372
            strict = locale;                                                                                           // 1373
            locale = undefined;                                                                                        // 1374
        }                                                                                                              // 1375
        // object construction must be done this way.                                                                  // 1376
        // https://github.com/moment/moment/issues/1423                                                                // 1377
        c._isAMomentObject = true;                                                                                     // 1378
        c._useUTC = c._isUTC = isUTC;                                                                                  // 1379
        c._l = locale;                                                                                                 // 1380
        c._i = input;                                                                                                  // 1381
        c._f = format;                                                                                                 // 1382
        c._strict = strict;                                                                                            // 1383
                                                                                                                       // 1384
        return createFromConfig(c);                                                                                    // 1385
    }                                                                                                                  // 1386
                                                                                                                       // 1387
    function local__createLocal (input, format, locale, strict) {                                                      // 1388
        return createLocalOrUTC(input, format, locale, strict, false);                                                 // 1389
    }                                                                                                                  // 1390
                                                                                                                       // 1391
    var prototypeMin = deprecate(                                                                                      // 1392
         'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',           // 1393
         function () {                                                                                                 // 1394
             var other = local__createLocal.apply(null, arguments);                                                    // 1395
             return other < this ? this : other;                                                                       // 1396
         }                                                                                                             // 1397
     );                                                                                                                // 1398
                                                                                                                       // 1399
    var prototypeMax = deprecate(                                                                                      // 1400
        'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',            // 1401
        function () {                                                                                                  // 1402
            var other = local__createLocal.apply(null, arguments);                                                     // 1403
            return other > this ? this : other;                                                                        // 1404
        }                                                                                                              // 1405
    );                                                                                                                 // 1406
                                                                                                                       // 1407
    // Pick a moment m from moments so that m[fn](other) is true for all                                               // 1408
    // other. This relies on the function fn to be transitive.                                                         // 1409
    //                                                                                                                 // 1410
    // moments should either be an array of moment objects or an array, whose                                          // 1411
    // first element is an array of moment objects.                                                                    // 1412
    function pickBy(fn, moments) {                                                                                     // 1413
        var res, i;                                                                                                    // 1414
        if (moments.length === 1 && isArray(moments[0])) {                                                             // 1415
            moments = moments[0];                                                                                      // 1416
        }                                                                                                              // 1417
        if (!moments.length) {                                                                                         // 1418
            return local__createLocal();                                                                               // 1419
        }                                                                                                              // 1420
        res = moments[0];                                                                                              // 1421
        for (i = 1; i < moments.length; ++i) {                                                                         // 1422
            if (!moments[i].isValid() || moments[i][fn](res)) {                                                        // 1423
                res = moments[i];                                                                                      // 1424
            }                                                                                                          // 1425
        }                                                                                                              // 1426
        return res;                                                                                                    // 1427
    }                                                                                                                  // 1428
                                                                                                                       // 1429
    // TODO: Use [].sort instead?                                                                                      // 1430
    function min () {                                                                                                  // 1431
        var args = [].slice.call(arguments, 0);                                                                        // 1432
                                                                                                                       // 1433
        return pickBy('isBefore', args);                                                                               // 1434
    }                                                                                                                  // 1435
                                                                                                                       // 1436
    function max () {                                                                                                  // 1437
        var args = [].slice.call(arguments, 0);                                                                        // 1438
                                                                                                                       // 1439
        return pickBy('isAfter', args);                                                                                // 1440
    }                                                                                                                  // 1441
                                                                                                                       // 1442
    function Duration (duration) {                                                                                     // 1443
        var normalizedInput = normalizeObjectUnits(duration),                                                          // 1444
            years = normalizedInput.year || 0,                                                                         // 1445
            quarters = normalizedInput.quarter || 0,                                                                   // 1446
            months = normalizedInput.month || 0,                                                                       // 1447
            weeks = normalizedInput.week || 0,                                                                         // 1448
            days = normalizedInput.day || 0,                                                                           // 1449
            hours = normalizedInput.hour || 0,                                                                         // 1450
            minutes = normalizedInput.minute || 0,                                                                     // 1451
            seconds = normalizedInput.second || 0,                                                                     // 1452
            milliseconds = normalizedInput.millisecond || 0;                                                           // 1453
                                                                                                                       // 1454
        // representation for dateAddRemove                                                                            // 1455
        this._milliseconds = +milliseconds +                                                                           // 1456
            seconds * 1e3 + // 1000                                                                                    // 1457
            minutes * 6e4 + // 1000 * 60                                                                               // 1458
            hours * 36e5; // 1000 * 60 * 60                                                                            // 1459
        // Because of dateAddRemove treats 24 hours as different from a                                                // 1460
        // day when working around DST, we need to store them separately                                               // 1461
        this._days = +days +                                                                                           // 1462
            weeks * 7;                                                                                                 // 1463
        // It is impossible translate months into days without knowing                                                 // 1464
        // which months you are are talking about, so we have to store                                                 // 1465
        // it separately.                                                                                              // 1466
        this._months = +months +                                                                                       // 1467
            quarters * 3 +                                                                                             // 1468
            years * 12;                                                                                                // 1469
                                                                                                                       // 1470
        this._data = {};                                                                                               // 1471
                                                                                                                       // 1472
        this._locale = locale_locales__getLocale();                                                                    // 1473
                                                                                                                       // 1474
        this._bubble();                                                                                                // 1475
    }                                                                                                                  // 1476
                                                                                                                       // 1477
    function isDuration (obj) {                                                                                        // 1478
        return obj instanceof Duration;                                                                                // 1479
    }                                                                                                                  // 1480
                                                                                                                       // 1481
    function offset (token, separator) {                                                                               // 1482
        addFormatToken(token, 0, 0, function () {                                                                      // 1483
            var offset = this.utcOffset();                                                                             // 1484
            var sign = '+';                                                                                            // 1485
            if (offset < 0) {                                                                                          // 1486
                offset = -offset;                                                                                      // 1487
                sign = '-';                                                                                            // 1488
            }                                                                                                          // 1489
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);                     // 1490
        });                                                                                                            // 1491
    }                                                                                                                  // 1492
                                                                                                                       // 1493
    offset('Z', ':');                                                                                                  // 1494
    offset('ZZ', '');                                                                                                  // 1495
                                                                                                                       // 1496
    // PARSING                                                                                                         // 1497
                                                                                                                       // 1498
    addRegexToken('Z',  matchOffset);                                                                                  // 1499
    addRegexToken('ZZ', matchOffset);                                                                                  // 1500
    addParseToken(['Z', 'ZZ'], function (input, array, config) {                                                       // 1501
        config._useUTC = true;                                                                                         // 1502
        config._tzm = offsetFromString(input);                                                                         // 1503
    });                                                                                                                // 1504
                                                                                                                       // 1505
    // HELPERS                                                                                                         // 1506
                                                                                                                       // 1507
    // timezone chunker                                                                                                // 1508
    // '+10:00' > ['10',  '00']                                                                                        // 1509
    // '-1530'  > ['-15', '30']                                                                                        // 1510
    var chunkOffset = /([\+\-]|\d\d)/gi;                                                                               // 1511
                                                                                                                       // 1512
    function offsetFromString(string) {                                                                                // 1513
        var matches = ((string || '').match(matchOffset) || []);                                                       // 1514
        var chunk   = matches[matches.length - 1] || [];                                                               // 1515
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];                                                  // 1516
        var minutes = +(parts[1] * 60) + toInt(parts[2]);                                                              // 1517
                                                                                                                       // 1518
        return parts[0] === '+' ? minutes : -minutes;                                                                  // 1519
    }                                                                                                                  // 1520
                                                                                                                       // 1521
    // Return a moment from input, that is local/utc/zone equivalent to model.                                         // 1522
    function cloneWithOffset(input, model) {                                                                           // 1523
        var res, diff;                                                                                                 // 1524
        if (model._isUTC) {                                                                                            // 1525
            res = model.clone();                                                                                       // 1526
            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);                  // 1527
            // Use low-level api, because this fn is low-level api.                                                    // 1528
            res._d.setTime(+res._d + diff);                                                                            // 1529
            utils_hooks__hooks.updateOffset(res, false);                                                               // 1530
            return res;                                                                                                // 1531
        } else {                                                                                                       // 1532
            return local__createLocal(input).local();                                                                  // 1533
        }                                                                                                              // 1534
    }                                                                                                                  // 1535
                                                                                                                       // 1536
    function getDateOffset (m) {                                                                                       // 1537
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.                                              // 1538
        // https://github.com/moment/moment/pull/1871                                                                  // 1539
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;                                                        // 1540
    }                                                                                                                  // 1541
                                                                                                                       // 1542
    // HOOKS                                                                                                           // 1543
                                                                                                                       // 1544
    // This function will be called whenever a moment is mutated.                                                      // 1545
    // It is intended to keep the offset in sync with the timezone.                                                    // 1546
    utils_hooks__hooks.updateOffset = function () {};                                                                  // 1547
                                                                                                                       // 1548
    // MOMENTS                                                                                                         // 1549
                                                                                                                       // 1550
    // keepLocalTime = true means only change the timezone, without                                                    // 1551
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->                                            // 1552
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset                                             // 1553
    // +0200, so we adjust the time as needed, to be valid.                                                            // 1554
    //                                                                                                                 // 1555
    // Keeping the time actually adds/subtracts (one hour)                                                             // 1556
    // from the actual represented time. That is why we call updateOffset                                              // 1557
    // a second time. In case it wants us to change the offset again                                                   // 1558
    // _changeInProgress == true case, then we have to adjust, because                                                 // 1559
    // there is no such time in the given timezone.                                                                    // 1560
    function getSetOffset (input, keepLocalTime) {                                                                     // 1561
        var offset = this._offset || 0,                                                                                // 1562
            localAdjust;                                                                                               // 1563
        if (input != null) {                                                                                           // 1564
            if (typeof input === 'string') {                                                                           // 1565
                input = offsetFromString(input);                                                                       // 1566
            }                                                                                                          // 1567
            if (Math.abs(input) < 16) {                                                                                // 1568
                input = input * 60;                                                                                    // 1569
            }                                                                                                          // 1570
            if (!this._isUTC && keepLocalTime) {                                                                       // 1571
                localAdjust = getDateOffset(this);                                                                     // 1572
            }                                                                                                          // 1573
            this._offset = input;                                                                                      // 1574
            this._isUTC = true;                                                                                        // 1575
            if (localAdjust != null) {                                                                                 // 1576
                this.add(localAdjust, 'm');                                                                            // 1577
            }                                                                                                          // 1578
            if (offset !== input) {                                                                                    // 1579
                if (!keepLocalTime || this._changeInProgress) {                                                        // 1580
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);            // 1581
                } else if (!this._changeInProgress) {                                                                  // 1582
                    this._changeInProgress = true;                                                                     // 1583
                    utils_hooks__hooks.updateOffset(this, true);                                                       // 1584
                    this._changeInProgress = null;                                                                     // 1585
                }                                                                                                      // 1586
            }                                                                                                          // 1587
            return this;                                                                                               // 1588
        } else {                                                                                                       // 1589
            return this._isUTC ? offset : getDateOffset(this);                                                         // 1590
        }                                                                                                              // 1591
    }                                                                                                                  // 1592
                                                                                                                       // 1593
    function getSetZone (input, keepLocalTime) {                                                                       // 1594
        if (input != null) {                                                                                           // 1595
            if (typeof input !== 'string') {                                                                           // 1596
                input = -input;                                                                                        // 1597
            }                                                                                                          // 1598
                                                                                                                       // 1599
            this.utcOffset(input, keepLocalTime);                                                                      // 1600
                                                                                                                       // 1601
            return this;                                                                                               // 1602
        } else {                                                                                                       // 1603
            return -this.utcOffset();                                                                                  // 1604
        }                                                                                                              // 1605
    }                                                                                                                  // 1606
                                                                                                                       // 1607
    function setOffsetToUTC (keepLocalTime) {                                                                          // 1608
        return this.utcOffset(0, keepLocalTime);                                                                       // 1609
    }                                                                                                                  // 1610
                                                                                                                       // 1611
    function setOffsetToLocal (keepLocalTime) {                                                                        // 1612
        if (this._isUTC) {                                                                                             // 1613
            this.utcOffset(0, keepLocalTime);                                                                          // 1614
            this._isUTC = false;                                                                                       // 1615
                                                                                                                       // 1616
            if (keepLocalTime) {                                                                                       // 1617
                this.subtract(getDateOffset(this), 'm');                                                               // 1618
            }                                                                                                          // 1619
        }                                                                                                              // 1620
        return this;                                                                                                   // 1621
    }                                                                                                                  // 1622
                                                                                                                       // 1623
    function setOffsetToParsedOffset () {                                                                              // 1624
        if (this._tzm) {                                                                                               // 1625
            this.utcOffset(this._tzm);                                                                                 // 1626
        } else if (typeof this._i === 'string') {                                                                      // 1627
            this.utcOffset(offsetFromString(this._i));                                                                 // 1628
        }                                                                                                              // 1629
        return this;                                                                                                   // 1630
    }                                                                                                                  // 1631
                                                                                                                       // 1632
    function hasAlignedHourOffset (input) {                                                                            // 1633
        input = input ? local__createLocal(input).utcOffset() : 0;                                                     // 1634
                                                                                                                       // 1635
        return (this.utcOffset() - input) % 60 === 0;                                                                  // 1636
    }                                                                                                                  // 1637
                                                                                                                       // 1638
    function isDaylightSavingTime () {                                                                                 // 1639
        return (                                                                                                       // 1640
            this.utcOffset() > this.clone().month(0).utcOffset() ||                                                    // 1641
            this.utcOffset() > this.clone().month(5).utcOffset()                                                       // 1642
        );                                                                                                             // 1643
    }                                                                                                                  // 1644
                                                                                                                       // 1645
    function isDaylightSavingTimeShifted () {                                                                          // 1646
        if (typeof this._isDSTShifted !== 'undefined') {                                                               // 1647
            return this._isDSTShifted;                                                                                 // 1648
        }                                                                                                              // 1649
                                                                                                                       // 1650
        var c = {};                                                                                                    // 1651
                                                                                                                       // 1652
        copyConfig(c, this);                                                                                           // 1653
        c = prepareConfig(c);                                                                                          // 1654
                                                                                                                       // 1655
        if (c._a) {                                                                                                    // 1656
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);                             // 1657
            this._isDSTShifted = this.isValid() &&                                                                     // 1658
                compareArrays(c._a, other.toArray()) > 0;                                                              // 1659
        } else {                                                                                                       // 1660
            this._isDSTShifted = false;                                                                                // 1661
        }                                                                                                              // 1662
                                                                                                                       // 1663
        return this._isDSTShifted;                                                                                     // 1664
    }                                                                                                                  // 1665
                                                                                                                       // 1666
    function isLocal () {                                                                                              // 1667
        return !this._isUTC;                                                                                           // 1668
    }                                                                                                                  // 1669
                                                                                                                       // 1670
    function isUtcOffset () {                                                                                          // 1671
        return this._isUTC;                                                                                            // 1672
    }                                                                                                                  // 1673
                                                                                                                       // 1674
    function isUtc () {                                                                                                // 1675
        return this._isUTC && this._offset === 0;                                                                      // 1676
    }                                                                                                                  // 1677
                                                                                                                       // 1678
    var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;                                          // 1679
                                                                                                                       // 1680
    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html                       // 1681
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere                                       // 1682
    var create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
                                                                                                                       // 1684
    function create__createDuration (input, key) {                                                                     // 1685
        var duration = input,                                                                                          // 1686
            // matching against regexp is expensive, do it on demand                                                   // 1687
            match = null,                                                                                              // 1688
            sign,                                                                                                      // 1689
            ret,                                                                                                       // 1690
            diffRes;                                                                                                   // 1691
                                                                                                                       // 1692
        if (isDuration(input)) {                                                                                       // 1693
            duration = {                                                                                               // 1694
                ms : input._milliseconds,                                                                              // 1695
                d  : input._days,                                                                                      // 1696
                M  : input._months                                                                                     // 1697
            };                                                                                                         // 1698
        } else if (typeof input === 'number') {                                                                        // 1699
            duration = {};                                                                                             // 1700
            if (key) {                                                                                                 // 1701
                duration[key] = input;                                                                                 // 1702
            } else {                                                                                                   // 1703
                duration.milliseconds = input;                                                                         // 1704
            }                                                                                                          // 1705
        } else if (!!(match = aspNetRegex.exec(input))) {                                                              // 1706
            sign = (match[1] === '-') ? -1 : 1;                                                                        // 1707
            duration = {                                                                                               // 1708
                y  : 0,                                                                                                // 1709
                d  : toInt(match[DATE])        * sign,                                                                 // 1710
                h  : toInt(match[HOUR])        * sign,                                                                 // 1711
                m  : toInt(match[MINUTE])      * sign,                                                                 // 1712
                s  : toInt(match[SECOND])      * sign,                                                                 // 1713
                ms : toInt(match[MILLISECOND]) * sign                                                                  // 1714
            };                                                                                                         // 1715
        } else if (!!(match = create__isoRegex.exec(input))) {                                                         // 1716
            sign = (match[1] === '-') ? -1 : 1;                                                                        // 1717
            duration = {                                                                                               // 1718
                y : parseIso(match[2], sign),                                                                          // 1719
                M : parseIso(match[3], sign),                                                                          // 1720
                d : parseIso(match[4], sign),                                                                          // 1721
                h : parseIso(match[5], sign),                                                                          // 1722
                m : parseIso(match[6], sign),                                                                          // 1723
                s : parseIso(match[7], sign),                                                                          // 1724
                w : parseIso(match[8], sign)                                                                           // 1725
            };                                                                                                         // 1726
        } else if (duration == null) {// checks for null or undefined                                                  // 1727
            duration = {};                                                                                             // 1728
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {                         // 1729
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));           // 1730
                                                                                                                       // 1731
            duration = {};                                                                                             // 1732
            duration.ms = diffRes.milliseconds;                                                                        // 1733
            duration.M = diffRes.months;                                                                               // 1734
        }                                                                                                              // 1735
                                                                                                                       // 1736
        ret = new Duration(duration);                                                                                  // 1737
                                                                                                                       // 1738
        if (isDuration(input) && hasOwnProp(input, '_locale')) {                                                       // 1739
            ret._locale = input._locale;                                                                               // 1740
        }                                                                                                              // 1741
                                                                                                                       // 1742
        return ret;                                                                                                    // 1743
    }                                                                                                                  // 1744
                                                                                                                       // 1745
    create__createDuration.fn = Duration.prototype;                                                                    // 1746
                                                                                                                       // 1747
    function parseIso (inp, sign) {                                                                                    // 1748
        // We'd normally use ~~inp for this, but unfortunately it also                                                 // 1749
        // converts floats to ints.                                                                                    // 1750
        // inp may be undefined, so careful calling replace on it.                                                     // 1751
        var res = inp && parseFloat(inp.replace(',', '.'));                                                            // 1752
        // apply sign while we're at it                                                                                // 1753
        return (isNaN(res) ? 0 : res) * sign;                                                                          // 1754
    }                                                                                                                  // 1755
                                                                                                                       // 1756
    function positiveMomentsDifference(base, other) {                                                                  // 1757
        var res = {milliseconds: 0, months: 0};                                                                        // 1758
                                                                                                                       // 1759
        res.months = other.month() - base.month() +                                                                    // 1760
            (other.year() - base.year()) * 12;                                                                         // 1761
        if (base.clone().add(res.months, 'M').isAfter(other)) {                                                        // 1762
            --res.months;                                                                                              // 1763
        }                                                                                                              // 1764
                                                                                                                       // 1765
        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));                                              // 1766
                                                                                                                       // 1767
        return res;                                                                                                    // 1768
    }                                                                                                                  // 1769
                                                                                                                       // 1770
    function momentsDifference(base, other) {                                                                          // 1771
        var res;                                                                                                       // 1772
        other = cloneWithOffset(other, base);                                                                          // 1773
        if (base.isBefore(other)) {                                                                                    // 1774
            res = positiveMomentsDifference(base, other);                                                              // 1775
        } else {                                                                                                       // 1776
            res = positiveMomentsDifference(other, base);                                                              // 1777
            res.milliseconds = -res.milliseconds;                                                                      // 1778
            res.months = -res.months;                                                                                  // 1779
        }                                                                                                              // 1780
                                                                                                                       // 1781
        return res;                                                                                                    // 1782
    }                                                                                                                  // 1783
                                                                                                                       // 1784
    function createAdder(direction, name) {                                                                            // 1785
        return function (val, period) {                                                                                // 1786
            var dur, tmp;                                                                                              // 1787
            //invert the arguments, but complain about it                                                              // 1788
            if (period !== null && !isNaN(+period)) {                                                                  // 1789
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;                                                                 // 1791
            }                                                                                                          // 1792
                                                                                                                       // 1793
            val = typeof val === 'string' ? +val : val;                                                                // 1794
            dur = create__createDuration(val, period);                                                                 // 1795
            add_subtract__addSubtract(this, dur, direction);                                                           // 1796
            return this;                                                                                               // 1797
        };                                                                                                             // 1798
    }                                                                                                                  // 1799
                                                                                                                       // 1800
    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {                                       // 1801
        var milliseconds = duration._milliseconds,                                                                     // 1802
            days = duration._days,                                                                                     // 1803
            months = duration._months;                                                                                 // 1804
        updateOffset = updateOffset == null ? true : updateOffset;                                                     // 1805
                                                                                                                       // 1806
        if (milliseconds) {                                                                                            // 1807
            mom._d.setTime(+mom._d + milliseconds * isAdding);                                                         // 1808
        }                                                                                                              // 1809
        if (days) {                                                                                                    // 1810
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);                                    // 1811
        }                                                                                                              // 1812
        if (months) {                                                                                                  // 1813
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);                                             // 1814
        }                                                                                                              // 1815
        if (updateOffset) {                                                                                            // 1816
            utils_hooks__hooks.updateOffset(mom, days || months);                                                      // 1817
        }                                                                                                              // 1818
    }                                                                                                                  // 1819
                                                                                                                       // 1820
    var add_subtract__add      = createAdder(1, 'add');                                                                // 1821
    var add_subtract__subtract = createAdder(-1, 'subtract');                                                          // 1822
                                                                                                                       // 1823
    function moment_calendar__calendar (time, formats) {                                                               // 1824
        // We want to compare the start of today, vs this.                                                             // 1825
        // Getting start-of-today depends on whether we're local/utc/offset or not.                                    // 1826
        var now = time || local__createLocal(),                                                                        // 1827
            sod = cloneWithOffset(now, this).startOf('day'),                                                           // 1828
            diff = this.diff(sod, 'days', true),                                                                       // 1829
            format = diff < -6 ? 'sameElse' :                                                                          // 1830
                diff < -1 ? 'lastWeek' :                                                                               // 1831
                diff < 0 ? 'lastDay' :                                                                                 // 1832
                diff < 1 ? 'sameDay' :                                                                                 // 1833
                diff < 2 ? 'nextDay' :                                                                                 // 1834
                diff < 7 ? 'nextWeek' : 'sameElse';                                                                    // 1835
        return this.format(formats && formats[format] || this.localeData().calendar(format, this, local__createLocal(now)));
    }                                                                                                                  // 1837
                                                                                                                       // 1838
    function clone () {                                                                                                // 1839
        return new Moment(this);                                                                                       // 1840
    }                                                                                                                  // 1841
                                                                                                                       // 1842
    function isAfter (input, units) {                                                                                  // 1843
        var inputMs;                                                                                                   // 1844
        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');                                  // 1845
        if (units === 'millisecond') {                                                                                 // 1846
            input = isMoment(input) ? input : local__createLocal(input);                                               // 1847
            return +this > +input;                                                                                     // 1848
        } else {                                                                                                       // 1849
            inputMs = isMoment(input) ? +input : +local__createLocal(input);                                           // 1850
            return inputMs < +this.clone().startOf(units);                                                             // 1851
        }                                                                                                              // 1852
    }                                                                                                                  // 1853
                                                                                                                       // 1854
    function isBefore (input, units) {                                                                                 // 1855
        var inputMs;                                                                                                   // 1856
        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');                                  // 1857
        if (units === 'millisecond') {                                                                                 // 1858
            input = isMoment(input) ? input : local__createLocal(input);                                               // 1859
            return +this < +input;                                                                                     // 1860
        } else {                                                                                                       // 1861
            inputMs = isMoment(input) ? +input : +local__createLocal(input);                                           // 1862
            return +this.clone().endOf(units) < inputMs;                                                               // 1863
        }                                                                                                              // 1864
    }                                                                                                                  // 1865
                                                                                                                       // 1866
    function isBetween (from, to, units) {                                                                             // 1867
        return this.isAfter(from, units) && this.isBefore(to, units);                                                  // 1868
    }                                                                                                                  // 1869
                                                                                                                       // 1870
    function isSame (input, units) {                                                                                   // 1871
        var inputMs;                                                                                                   // 1872
        units = normalizeUnits(units || 'millisecond');                                                                // 1873
        if (units === 'millisecond') {                                                                                 // 1874
            input = isMoment(input) ? input : local__createLocal(input);                                               // 1875
            return +this === +input;                                                                                   // 1876
        } else {                                                                                                       // 1877
            inputMs = +local__createLocal(input);                                                                      // 1878
            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));               // 1879
        }                                                                                                              // 1880
    }                                                                                                                  // 1881
                                                                                                                       // 1882
    function diff (input, units, asFloat) {                                                                            // 1883
        var that = cloneWithOffset(input, this),                                                                       // 1884
            zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4,                                                   // 1885
            delta, output;                                                                                             // 1886
                                                                                                                       // 1887
        units = normalizeUnits(units);                                                                                 // 1888
                                                                                                                       // 1889
        if (units === 'year' || units === 'month' || units === 'quarter') {                                            // 1890
            output = monthDiff(this, that);                                                                            // 1891
            if (units === 'quarter') {                                                                                 // 1892
                output = output / 3;                                                                                   // 1893
            } else if (units === 'year') {                                                                             // 1894
                output = output / 12;                                                                                  // 1895
            }                                                                                                          // 1896
        } else {                                                                                                       // 1897
            delta = this - that;                                                                                       // 1898
            output = units === 'second' ? delta / 1e3 : // 1000                                                        // 1899
                units === 'minute' ? delta / 6e4 : // 1000 * 60                                                        // 1900
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60                                                    // 1901
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst                     // 1902
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst               // 1903
                delta;                                                                                                 // 1904
        }                                                                                                              // 1905
        return asFloat ? output : absFloor(output);                                                                    // 1906
    }                                                                                                                  // 1907
                                                                                                                       // 1908
    function monthDiff (a, b) {                                                                                        // 1909
        // difference in months                                                                                        // 1910
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),                                   // 1911
            // b is in (anchor - 1 month, anchor + 1 month)                                                            // 1912
            anchor = a.clone().add(wholeMonthDiff, 'months'),                                                          // 1913
            anchor2, adjust;                                                                                           // 1914
                                                                                                                       // 1915
        if (b - anchor < 0) {                                                                                          // 1916
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');                                                     // 1917
            // linear across the month                                                                                 // 1918
            adjust = (b - anchor) / (anchor - anchor2);                                                                // 1919
        } else {                                                                                                       // 1920
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');                                                     // 1921
            // linear across the month                                                                                 // 1922
            adjust = (b - anchor) / (anchor2 - anchor);                                                                // 1923
        }                                                                                                              // 1924
                                                                                                                       // 1925
        return -(wholeMonthDiff + adjust);                                                                             // 1926
    }                                                                                                                  // 1927
                                                                                                                       // 1928
    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';                                                         // 1929
                                                                                                                       // 1930
    function toString () {                                                                                             // 1931
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');                                   // 1932
    }                                                                                                                  // 1933
                                                                                                                       // 1934
    function moment_format__toISOString () {                                                                           // 1935
        var m = this.clone().utc();                                                                                    // 1936
        if (0 < m.year() && m.year() <= 9999) {                                                                        // 1937
            if ('function' === typeof Date.prototype.toISOString) {                                                    // 1938
                // native implementation is ~50x faster, use it when we can                                            // 1939
                return this.toDate().toISOString();                                                                    // 1940
            } else {                                                                                                   // 1941
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');                                                // 1942
            }                                                                                                          // 1943
        } else {                                                                                                       // 1944
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');                                                  // 1945
        }                                                                                                              // 1946
    }                                                                                                                  // 1947
                                                                                                                       // 1948
    function format (inputString) {                                                                                    // 1949
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);                              // 1950
        return this.localeData().postformat(output);                                                                   // 1951
    }                                                                                                                  // 1952
                                                                                                                       // 1953
    function from (time, withoutSuffix) {                                                                              // 1954
        if (!this.isValid()) {                                                                                         // 1955
            return this.localeData().invalidDate();                                                                    // 1956
        }                                                                                                              // 1957
        return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);          // 1958
    }                                                                                                                  // 1959
                                                                                                                       // 1960
    function fromNow (withoutSuffix) {                                                                                 // 1961
        return this.from(local__createLocal(), withoutSuffix);                                                         // 1962
    }                                                                                                                  // 1963
                                                                                                                       // 1964
    function to (time, withoutSuffix) {                                                                                // 1965
        if (!this.isValid()) {                                                                                         // 1966
            return this.localeData().invalidDate();                                                                    // 1967
        }                                                                                                              // 1968
        return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);          // 1969
    }                                                                                                                  // 1970
                                                                                                                       // 1971
    function toNow (withoutSuffix) {                                                                                   // 1972
        return this.to(local__createLocal(), withoutSuffix);                                                           // 1973
    }                                                                                                                  // 1974
                                                                                                                       // 1975
    function locale (key) {                                                                                            // 1976
        var newLocaleData;                                                                                             // 1977
                                                                                                                       // 1978
        if (key === undefined) {                                                                                       // 1979
            return this._locale._abbr;                                                                                 // 1980
        } else {                                                                                                       // 1981
            newLocaleData = locale_locales__getLocale(key);                                                            // 1982
            if (newLocaleData != null) {                                                                               // 1983
                this._locale = newLocaleData;                                                                          // 1984
            }                                                                                                          // 1985
            return this;                                                                                               // 1986
        }                                                                                                              // 1987
    }                                                                                                                  // 1988
                                                                                                                       // 1989
    var lang = deprecate(                                                                                              // 1990
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {                                                                                               // 1992
            if (key === undefined) {                                                                                   // 1993
                return this.localeData();                                                                              // 1994
            } else {                                                                                                   // 1995
                return this.locale(key);                                                                               // 1996
            }                                                                                                          // 1997
        }                                                                                                              // 1998
    );                                                                                                                 // 1999
                                                                                                                       // 2000
    function localeData () {                                                                                           // 2001
        return this._locale;                                                                                           // 2002
    }                                                                                                                  // 2003
                                                                                                                       // 2004
    function startOf (units) {                                                                                         // 2005
        units = normalizeUnits(units);                                                                                 // 2006
        // the following switch intentionally omits break keywords                                                     // 2007
        // to utilize falling through the cases.                                                                       // 2008
        switch (units) {                                                                                               // 2009
        case 'year':                                                                                                   // 2010
            this.month(0);                                                                                             // 2011
            /* falls through */                                                                                        // 2012
        case 'quarter':                                                                                                // 2013
        case 'month':                                                                                                  // 2014
            this.date(1);                                                                                              // 2015
            /* falls through */                                                                                        // 2016
        case 'week':                                                                                                   // 2017
        case 'isoWeek':                                                                                                // 2018
        case 'day':                                                                                                    // 2019
            this.hours(0);                                                                                             // 2020
            /* falls through */                                                                                        // 2021
        case 'hour':                                                                                                   // 2022
            this.minutes(0);                                                                                           // 2023
            /* falls through */                                                                                        // 2024
        case 'minute':                                                                                                 // 2025
            this.seconds(0);                                                                                           // 2026
            /* falls through */                                                                                        // 2027
        case 'second':                                                                                                 // 2028
            this.milliseconds(0);                                                                                      // 2029
        }                                                                                                              // 2030
                                                                                                                       // 2031
        // weeks are a special case                                                                                    // 2032
        if (units === 'week') {                                                                                        // 2033
            this.weekday(0);                                                                                           // 2034
        }                                                                                                              // 2035
        if (units === 'isoWeek') {                                                                                     // 2036
            this.isoWeekday(1);                                                                                        // 2037
        }                                                                                                              // 2038
                                                                                                                       // 2039
        // quarters are also special                                                                                   // 2040
        if (units === 'quarter') {                                                                                     // 2041
            this.month(Math.floor(this.month() / 3) * 3);                                                              // 2042
        }                                                                                                              // 2043
                                                                                                                       // 2044
        return this;                                                                                                   // 2045
    }                                                                                                                  // 2046
                                                                                                                       // 2047
    function endOf (units) {                                                                                           // 2048
        units = normalizeUnits(units);                                                                                 // 2049
        if (units === undefined || units === 'millisecond') {                                                          // 2050
            return this;                                                                                               // 2051
        }                                                                                                              // 2052
        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');                   // 2053
    }                                                                                                                  // 2054
                                                                                                                       // 2055
    function to_type__valueOf () {                                                                                     // 2056
        return +this._d - ((this._offset || 0) * 60000);                                                               // 2057
    }                                                                                                                  // 2058
                                                                                                                       // 2059
    function unix () {                                                                                                 // 2060
        return Math.floor(+this / 1000);                                                                               // 2061
    }                                                                                                                  // 2062
                                                                                                                       // 2063
    function toDate () {                                                                                               // 2064
        return this._offset ? new Date(+this) : this._d;                                                               // 2065
    }                                                                                                                  // 2066
                                                                                                                       // 2067
    function toArray () {                                                                                              // 2068
        var m = this;                                                                                                  // 2069
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];                     // 2070
    }                                                                                                                  // 2071
                                                                                                                       // 2072
    function toObject () {                                                                                             // 2073
        var m = this;                                                                                                  // 2074
        return {                                                                                                       // 2075
            years: m.year(),                                                                                           // 2076
            months: m.month(),                                                                                         // 2077
            date: m.date(),                                                                                            // 2078
            hours: m.hours(),                                                                                          // 2079
            minutes: m.minutes(),                                                                                      // 2080
            seconds: m.seconds(),                                                                                      // 2081
            milliseconds: m.milliseconds()                                                                             // 2082
        };                                                                                                             // 2083
    }                                                                                                                  // 2084
                                                                                                                       // 2085
    function moment_valid__isValid () {                                                                                // 2086
        return valid__isValid(this);                                                                                   // 2087
    }                                                                                                                  // 2088
                                                                                                                       // 2089
    function parsingFlags () {                                                                                         // 2090
        return extend({}, getParsingFlags(this));                                                                      // 2091
    }                                                                                                                  // 2092
                                                                                                                       // 2093
    function invalidAt () {                                                                                            // 2094
        return getParsingFlags(this).overflow;                                                                         // 2095
    }                                                                                                                  // 2096
                                                                                                                       // 2097
    addFormatToken(0, ['gg', 2], 0, function () {                                                                      // 2098
        return this.weekYear() % 100;                                                                                  // 2099
    });                                                                                                                // 2100
                                                                                                                       // 2101
    addFormatToken(0, ['GG', 2], 0, function () {                                                                      // 2102
        return this.isoWeekYear() % 100;                                                                               // 2103
    });                                                                                                                // 2104
                                                                                                                       // 2105
    function addWeekYearFormatToken (token, getter) {                                                                  // 2106
        addFormatToken(0, [token, token.length], 0, getter);                                                           // 2107
    }                                                                                                                  // 2108
                                                                                                                       // 2109
    addWeekYearFormatToken('gggg',     'weekYear');                                                                    // 2110
    addWeekYearFormatToken('ggggg',    'weekYear');                                                                    // 2111
    addWeekYearFormatToken('GGGG',  'isoWeekYear');                                                                    // 2112
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');                                                                    // 2113
                                                                                                                       // 2114
    // ALIASES                                                                                                         // 2115
                                                                                                                       // 2116
    addUnitAlias('weekYear', 'gg');                                                                                    // 2117
    addUnitAlias('isoWeekYear', 'GG');                                                                                 // 2118
                                                                                                                       // 2119
    // PARSING                                                                                                         // 2120
                                                                                                                       // 2121
    addRegexToken('G',      matchSigned);                                                                              // 2122
    addRegexToken('g',      matchSigned);                                                                              // 2123
    addRegexToken('GG',     match1to2, match2);                                                                        // 2124
    addRegexToken('gg',     match1to2, match2);                                                                        // 2125
    addRegexToken('GGGG',   match1to4, match4);                                                                        // 2126
    addRegexToken('gggg',   match1to4, match4);                                                                        // 2127
    addRegexToken('GGGGG',  match1to6, match6);                                                                        // 2128
    addRegexToken('ggggg',  match1to6, match6);                                                                        // 2129
                                                                                                                       // 2130
    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {                      // 2131
        week[token.substr(0, 2)] = toInt(input);                                                                       // 2132
    });                                                                                                                // 2133
                                                                                                                       // 2134
    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {                                            // 2135
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);                                                     // 2136
    });                                                                                                                // 2137
                                                                                                                       // 2138
    // HELPERS                                                                                                         // 2139
                                                                                                                       // 2140
    function weeksInYear(year, dow, doy) {                                                                             // 2141
        return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week;                              // 2142
    }                                                                                                                  // 2143
                                                                                                                       // 2144
    // MOMENTS                                                                                                         // 2145
                                                                                                                       // 2146
    function getSetWeekYear (input) {                                                                                  // 2147
        var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;                    // 2148
        return input == null ? year : this.add((input - year), 'y');                                                   // 2149
    }                                                                                                                  // 2150
                                                                                                                       // 2151
    function getSetISOWeekYear (input) {                                                                               // 2152
        var year = weekOfYear(this, 1, 4).year;                                                                        // 2153
        return input == null ? year : this.add((input - year), 'y');                                                   // 2154
    }                                                                                                                  // 2155
                                                                                                                       // 2156
    function getISOWeeksInYear () {                                                                                    // 2157
        return weeksInYear(this.year(), 1, 4);                                                                         // 2158
    }                                                                                                                  // 2159
                                                                                                                       // 2160
    function getWeeksInYear () {                                                                                       // 2161
        var weekInfo = this.localeData()._week;                                                                        // 2162
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);                                                   // 2163
    }                                                                                                                  // 2164
                                                                                                                       // 2165
    addFormatToken('Q', 0, 0, 'quarter');                                                                              // 2166
                                                                                                                       // 2167
    // ALIASES                                                                                                         // 2168
                                                                                                                       // 2169
    addUnitAlias('quarter', 'Q');                                                                                      // 2170
                                                                                                                       // 2171
    // PARSING                                                                                                         // 2172
                                                                                                                       // 2173
    addRegexToken('Q', match1);                                                                                        // 2174
    addParseToken('Q', function (input, array) {                                                                       // 2175
        array[MONTH] = (toInt(input) - 1) * 3;                                                                         // 2176
    });                                                                                                                // 2177
                                                                                                                       // 2178
    // MOMENTS                                                                                                         // 2179
                                                                                                                       // 2180
    function getSetQuarter (input) {                                                                                   // 2181
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);     // 2182
    }                                                                                                                  // 2183
                                                                                                                       // 2184
    addFormatToken('D', ['DD', 2], 'Do', 'date');                                                                      // 2185
                                                                                                                       // 2186
    // ALIASES                                                                                                         // 2187
                                                                                                                       // 2188
    addUnitAlias('date', 'D');                                                                                         // 2189
                                                                                                                       // 2190
    // PARSING                                                                                                         // 2191
                                                                                                                       // 2192
    addRegexToken('D',  match1to2);                                                                                    // 2193
    addRegexToken('DD', match1to2, match2);                                                                            // 2194
    addRegexToken('Do', function (isStrict, locale) {                                                                  // 2195
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;                                          // 2196
    });                                                                                                                // 2197
                                                                                                                       // 2198
    addParseToken(['D', 'DD'], DATE);                                                                                  // 2199
    addParseToken('Do', function (input, array) {                                                                      // 2200
        array[DATE] = toInt(input.match(match1to2)[0], 10);                                                            // 2201
    });                                                                                                                // 2202
                                                                                                                       // 2203
    // MOMENTS                                                                                                         // 2204
                                                                                                                       // 2205
    var getSetDayOfMonth = makeGetSet('Date', true);                                                                   // 2206
                                                                                                                       // 2207
    addFormatToken('d', 0, 'do', 'day');                                                                               // 2208
                                                                                                                       // 2209
    addFormatToken('dd', 0, 0, function (format) {                                                                     // 2210
        return this.localeData().weekdaysMin(this, format);                                                            // 2211
    });                                                                                                                // 2212
                                                                                                                       // 2213
    addFormatToken('ddd', 0, 0, function (format) {                                                                    // 2214
        return this.localeData().weekdaysShort(this, format);                                                          // 2215
    });                                                                                                                // 2216
                                                                                                                       // 2217
    addFormatToken('dddd', 0, 0, function (format) {                                                                   // 2218
        return this.localeData().weekdays(this, format);                                                               // 2219
    });                                                                                                                // 2220
                                                                                                                       // 2221
    addFormatToken('e', 0, 0, 'weekday');                                                                              // 2222
    addFormatToken('E', 0, 0, 'isoWeekday');                                                                           // 2223
                                                                                                                       // 2224
    // ALIASES                                                                                                         // 2225
                                                                                                                       // 2226
    addUnitAlias('day', 'd');                                                                                          // 2227
    addUnitAlias('weekday', 'e');                                                                                      // 2228
    addUnitAlias('isoWeekday', 'E');                                                                                   // 2229
                                                                                                                       // 2230
    // PARSING                                                                                                         // 2231
                                                                                                                       // 2232
    addRegexToken('d',    match1to2);                                                                                  // 2233
    addRegexToken('e',    match1to2);                                                                                  // 2234
    addRegexToken('E',    match1to2);                                                                                  // 2235
    addRegexToken('dd',   matchWord);                                                                                  // 2236
    addRegexToken('ddd',  matchWord);                                                                                  // 2237
    addRegexToken('dddd', matchWord);                                                                                  // 2238
                                                                                                                       // 2239
    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config) {                                          // 2240
        var weekday = config._locale.weekdaysParse(input);                                                             // 2241
        // if we didn't get a weekday name, mark the date as invalid                                                   // 2242
        if (weekday != null) {                                                                                         // 2243
            week.d = weekday;                                                                                          // 2244
        } else {                                                                                                       // 2245
            getParsingFlags(config).invalidWeekday = input;                                                            // 2246
        }                                                                                                              // 2247
    });                                                                                                                // 2248
                                                                                                                       // 2249
    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {                                         // 2250
        week[token] = toInt(input);                                                                                    // 2251
    });                                                                                                                // 2252
                                                                                                                       // 2253
    // HELPERS                                                                                                         // 2254
                                                                                                                       // 2255
    function parseWeekday(input, locale) {                                                                             // 2256
        if (typeof input !== 'string') {                                                                               // 2257
            return input;                                                                                              // 2258
        }                                                                                                              // 2259
                                                                                                                       // 2260
        if (!isNaN(input)) {                                                                                           // 2261
            return parseInt(input, 10);                                                                                // 2262
        }                                                                                                              // 2263
                                                                                                                       // 2264
        input = locale.weekdaysParse(input);                                                                           // 2265
        if (typeof input === 'number') {                                                                               // 2266
            return input;                                                                                              // 2267
        }                                                                                                              // 2268
                                                                                                                       // 2269
        return null;                                                                                                   // 2270
    }                                                                                                                  // 2271
                                                                                                                       // 2272
    // LOCALES                                                                                                         // 2273
                                                                                                                       // 2274
    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');                 // 2275
    function localeWeekdays (m) {                                                                                      // 2276
        return this._weekdays[m.day()];                                                                                // 2277
    }                                                                                                                  // 2278
                                                                                                                       // 2279
    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');                                         // 2280
    function localeWeekdaysShort (m) {                                                                                 // 2281
        return this._weekdaysShort[m.day()];                                                                           // 2282
    }                                                                                                                  // 2283
                                                                                                                       // 2284
    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');                                                  // 2285
    function localeWeekdaysMin (m) {                                                                                   // 2286
        return this._weekdaysMin[m.day()];                                                                             // 2287
    }                                                                                                                  // 2288
                                                                                                                       // 2289
    function localeWeekdaysParse (weekdayName) {                                                                       // 2290
        var i, mom, regex;                                                                                             // 2291
                                                                                                                       // 2292
        this._weekdaysParse = this._weekdaysParse || [];                                                               // 2293
                                                                                                                       // 2294
        for (i = 0; i < 7; i++) {                                                                                      // 2295
            // make the regex if we don't have it already                                                              // 2296
            if (!this._weekdaysParse[i]) {                                                                             // 2297
                mom = local__createLocal([2000, 1]).day(i);                                                            // 2298
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');                                      // 2300
            }                                                                                                          // 2301
            // test the regex                                                                                          // 2302
            if (this._weekdaysParse[i].test(weekdayName)) {                                                            // 2303
                return i;                                                                                              // 2304
            }                                                                                                          // 2305
        }                                                                                                              // 2306
    }                                                                                                                  // 2307
                                                                                                                       // 2308
    // MOMENTS                                                                                                         // 2309
                                                                                                                       // 2310
    function getSetDayOfWeek (input) {                                                                                 // 2311
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();                                                // 2312
        if (input != null) {                                                                                           // 2313
            input = parseWeekday(input, this.localeData());                                                            // 2314
            return this.add(input - day, 'd');                                                                         // 2315
        } else {                                                                                                       // 2316
            return day;                                                                                                // 2317
        }                                                                                                              // 2318
    }                                                                                                                  // 2319
                                                                                                                       // 2320
    function getSetLocaleDayOfWeek (input) {                                                                           // 2321
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;                                              // 2322
        return input == null ? weekday : this.add(input - weekday, 'd');                                               // 2323
    }                                                                                                                  // 2324
                                                                                                                       // 2325
    function getSetISODayOfWeek (input) {                                                                              // 2326
        // behaves the same as moment#day except                                                                       // 2327
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)                                              // 2328
        // as a setter, sunday should belong to the previous week.                                                     // 2329
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);                         // 2330
    }                                                                                                                  // 2331
                                                                                                                       // 2332
    addFormatToken('H', ['HH', 2], 0, 'hour');                                                                         // 2333
    addFormatToken('h', ['hh', 2], 0, function () {                                                                    // 2334
        return this.hours() % 12 || 12;                                                                                // 2335
    });                                                                                                                // 2336
                                                                                                                       // 2337
    function meridiem (token, lowercase) {                                                                             // 2338
        addFormatToken(token, 0, 0, function () {                                                                      // 2339
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);                                // 2340
        });                                                                                                            // 2341
    }                                                                                                                  // 2342
                                                                                                                       // 2343
    meridiem('a', true);                                                                                               // 2344
    meridiem('A', false);                                                                                              // 2345
                                                                                                                       // 2346
    // ALIASES                                                                                                         // 2347
                                                                                                                       // 2348
    addUnitAlias('hour', 'h');                                                                                         // 2349
                                                                                                                       // 2350
    // PARSING                                                                                                         // 2351
                                                                                                                       // 2352
    function matchMeridiem (isStrict, locale) {                                                                        // 2353
        return locale._meridiemParse;                                                                                  // 2354
    }                                                                                                                  // 2355
                                                                                                                       // 2356
    addRegexToken('a',  matchMeridiem);                                                                                // 2357
    addRegexToken('A',  matchMeridiem);                                                                                // 2358
    addRegexToken('H',  match1to2);                                                                                    // 2359
    addRegexToken('h',  match1to2);                                                                                    // 2360
    addRegexToken('HH', match1to2, match2);                                                                            // 2361
    addRegexToken('hh', match1to2, match2);                                                                            // 2362
                                                                                                                       // 2363
    addParseToken(['H', 'HH'], HOUR);                                                                                  // 2364
    addParseToken(['a', 'A'], function (input, array, config) {                                                        // 2365
        config._isPm = config._locale.isPM(input);                                                                     // 2366
        config._meridiem = input;                                                                                      // 2367
    });                                                                                                                // 2368
    addParseToken(['h', 'hh'], function (input, array, config) {                                                       // 2369
        array[HOUR] = toInt(input);                                                                                    // 2370
        getParsingFlags(config).bigHour = true;                                                                        // 2371
    });                                                                                                                // 2372
                                                                                                                       // 2373
    // LOCALES                                                                                                         // 2374
                                                                                                                       // 2375
    function localeIsPM (input) {                                                                                      // 2376
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays                             // 2377
        // Using charAt should be more compatible.                                                                     // 2378
        return ((input + '').toLowerCase().charAt(0) === 'p');                                                         // 2379
    }                                                                                                                  // 2380
                                                                                                                       // 2381
    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;                                                                  // 2382
    function localeMeridiem (hours, minutes, isLower) {                                                                // 2383
        if (hours > 11) {                                                                                              // 2384
            return isLower ? 'pm' : 'PM';                                                                              // 2385
        } else {                                                                                                       // 2386
            return isLower ? 'am' : 'AM';                                                                              // 2387
        }                                                                                                              // 2388
    }                                                                                                                  // 2389
                                                                                                                       // 2390
                                                                                                                       // 2391
    // MOMENTS                                                                                                         // 2392
                                                                                                                       // 2393
    // Setting the hour should keep the time, because the user explicitly                                              // 2394
    // specified which hour he wants. So trying to maintain the same hour (in                                          // 2395
    // a new timezone) makes sense. Adding/subtracting hours does not follow                                           // 2396
    // this rule.                                                                                                      // 2397
    var getSetHour = makeGetSet('Hours', true);                                                                        // 2398
                                                                                                                       // 2399
    addFormatToken('m', ['mm', 2], 0, 'minute');                                                                       // 2400
                                                                                                                       // 2401
    // ALIASES                                                                                                         // 2402
                                                                                                                       // 2403
    addUnitAlias('minute', 'm');                                                                                       // 2404
                                                                                                                       // 2405
    // PARSING                                                                                                         // 2406
                                                                                                                       // 2407
    addRegexToken('m',  match1to2);                                                                                    // 2408
    addRegexToken('mm', match1to2, match2);                                                                            // 2409
    addParseToken(['m', 'mm'], MINUTE);                                                                                // 2410
                                                                                                                       // 2411
    // MOMENTS                                                                                                         // 2412
                                                                                                                       // 2413
    var getSetMinute = makeGetSet('Minutes', false);                                                                   // 2414
                                                                                                                       // 2415
    addFormatToken('s', ['ss', 2], 0, 'second');                                                                       // 2416
                                                                                                                       // 2417
    // ALIASES                                                                                                         // 2418
                                                                                                                       // 2419
    addUnitAlias('second', 's');                                                                                       // 2420
                                                                                                                       // 2421
    // PARSING                                                                                                         // 2422
                                                                                                                       // 2423
    addRegexToken('s',  match1to2);                                                                                    // 2424
    addRegexToken('ss', match1to2, match2);                                                                            // 2425
    addParseToken(['s', 'ss'], SECOND);                                                                                // 2426
                                                                                                                       // 2427
    // MOMENTS                                                                                                         // 2428
                                                                                                                       // 2429
    var getSetSecond = makeGetSet('Seconds', false);                                                                   // 2430
                                                                                                                       // 2431
    addFormatToken('S', 0, 0, function () {                                                                            // 2432
        return ~~(this.millisecond() / 100);                                                                           // 2433
    });                                                                                                                // 2434
                                                                                                                       // 2435
    addFormatToken(0, ['SS', 2], 0, function () {                                                                      // 2436
        return ~~(this.millisecond() / 10);                                                                            // 2437
    });                                                                                                                // 2438
                                                                                                                       // 2439
    addFormatToken(0, ['SSS', 3], 0, 'millisecond');                                                                   // 2440
    addFormatToken(0, ['SSSS', 4], 0, function () {                                                                    // 2441
        return this.millisecond() * 10;                                                                                // 2442
    });                                                                                                                // 2443
    addFormatToken(0, ['SSSSS', 5], 0, function () {                                                                   // 2444
        return this.millisecond() * 100;                                                                               // 2445
    });                                                                                                                // 2446
    addFormatToken(0, ['SSSSSS', 6], 0, function () {                                                                  // 2447
        return this.millisecond() * 1000;                                                                              // 2448
    });                                                                                                                // 2449
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {                                                                 // 2450
        return this.millisecond() * 10000;                                                                             // 2451
    });                                                                                                                // 2452
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {                                                                // 2453
        return this.millisecond() * 100000;                                                                            // 2454
    });                                                                                                                // 2455
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {                                                               // 2456
        return this.millisecond() * 1000000;                                                                           // 2457
    });                                                                                                                // 2458
                                                                                                                       // 2459
                                                                                                                       // 2460
    // ALIASES                                                                                                         // 2461
                                                                                                                       // 2462
    addUnitAlias('millisecond', 'ms');                                                                                 // 2463
                                                                                                                       // 2464
    // PARSING                                                                                                         // 2465
                                                                                                                       // 2466
    addRegexToken('S',    match1to3, match1);                                                                          // 2467
    addRegexToken('SS',   match1to3, match2);                                                                          // 2468
    addRegexToken('SSS',  match1to3, match3);                                                                          // 2469
                                                                                                                       // 2470
    var token;                                                                                                         // 2471
    for (token = 'SSSS'; token.length <= 9; token += 'S') {                                                            // 2472
        addRegexToken(token, matchUnsigned);                                                                           // 2473
    }                                                                                                                  // 2474
                                                                                                                       // 2475
    function parseMs(input, array) {                                                                                   // 2476
        array[MILLISECOND] = toInt(('0.' + input) * 1000);                                                             // 2477
    }                                                                                                                  // 2478
                                                                                                                       // 2479
    for (token = 'S'; token.length <= 9; token += 'S') {                                                               // 2480
        addParseToken(token, parseMs);                                                                                 // 2481
    }                                                                                                                  // 2482
    // MOMENTS                                                                                                         // 2483
                                                                                                                       // 2484
    var getSetMillisecond = makeGetSet('Milliseconds', false);                                                         // 2485
                                                                                                                       // 2486
    addFormatToken('z',  0, 0, 'zoneAbbr');                                                                            // 2487
    addFormatToken('zz', 0, 0, 'zoneName');                                                                            // 2488
                                                                                                                       // 2489
    // MOMENTS                                                                                                         // 2490
                                                                                                                       // 2491
    function getZoneAbbr () {                                                                                          // 2492
        return this._isUTC ? 'UTC' : '';                                                                               // 2493
    }                                                                                                                  // 2494
                                                                                                                       // 2495
    function getZoneName () {                                                                                          // 2496
        return this._isUTC ? 'Coordinated Universal Time' : '';                                                        // 2497
    }                                                                                                                  // 2498
                                                                                                                       // 2499
    var momentPrototype__proto = Moment.prototype;                                                                     // 2500
                                                                                                                       // 2501
    momentPrototype__proto.add          = add_subtract__add;                                                           // 2502
    momentPrototype__proto.calendar     = moment_calendar__calendar;                                                   // 2503
    momentPrototype__proto.clone        = clone;                                                                       // 2504
    momentPrototype__proto.diff         = diff;                                                                        // 2505
    momentPrototype__proto.endOf        = endOf;                                                                       // 2506
    momentPrototype__proto.format       = format;                                                                      // 2507
    momentPrototype__proto.from         = from;                                                                        // 2508
    momentPrototype__proto.fromNow      = fromNow;                                                                     // 2509
    momentPrototype__proto.to           = to;                                                                          // 2510
    momentPrototype__proto.toNow        = toNow;                                                                       // 2511
    momentPrototype__proto.get          = getSet;                                                                      // 2512
    momentPrototype__proto.invalidAt    = invalidAt;                                                                   // 2513
    momentPrototype__proto.isAfter      = isAfter;                                                                     // 2514
    momentPrototype__proto.isBefore     = isBefore;                                                                    // 2515
    momentPrototype__proto.isBetween    = isBetween;                                                                   // 2516
    momentPrototype__proto.isSame       = isSame;                                                                      // 2517
    momentPrototype__proto.isValid      = moment_valid__isValid;                                                       // 2518
    momentPrototype__proto.lang         = lang;                                                                        // 2519
    momentPrototype__proto.locale       = locale;                                                                      // 2520
    momentPrototype__proto.localeData   = localeData;                                                                  // 2521
    momentPrototype__proto.max          = prototypeMax;                                                                // 2522
    momentPrototype__proto.min          = prototypeMin;                                                                // 2523
    momentPrototype__proto.parsingFlags = parsingFlags;                                                                // 2524
    momentPrototype__proto.set          = getSet;                                                                      // 2525
    momentPrototype__proto.startOf      = startOf;                                                                     // 2526
    momentPrototype__proto.subtract     = add_subtract__subtract;                                                      // 2527
    momentPrototype__proto.toArray      = toArray;                                                                     // 2528
    momentPrototype__proto.toObject     = toObject;                                                                    // 2529
    momentPrototype__proto.toDate       = toDate;                                                                      // 2530
    momentPrototype__proto.toISOString  = moment_format__toISOString;                                                  // 2531
    momentPrototype__proto.toJSON       = moment_format__toISOString;                                                  // 2532
    momentPrototype__proto.toString     = toString;                                                                    // 2533
    momentPrototype__proto.unix         = unix;                                                                        // 2534
    momentPrototype__proto.valueOf      = to_type__valueOf;                                                            // 2535
                                                                                                                       // 2536
    // Year                                                                                                            // 2537
    momentPrototype__proto.year       = getSetYear;                                                                    // 2538
    momentPrototype__proto.isLeapYear = getIsLeapYear;                                                                 // 2539
                                                                                                                       // 2540
    // Week Year                                                                                                       // 2541
    momentPrototype__proto.weekYear    = getSetWeekYear;                                                               // 2542
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;                                                            // 2543
                                                                                                                       // 2544
    // Quarter                                                                                                         // 2545
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;                                  // 2546
                                                                                                                       // 2547
    // Month                                                                                                           // 2548
    momentPrototype__proto.month       = getSetMonth;                                                                  // 2549
    momentPrototype__proto.daysInMonth = getDaysInMonth;                                                               // 2550
                                                                                                                       // 2551
    // Week                                                                                                            // 2552
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;                          // 2553
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;                       // 2554
    momentPrototype__proto.weeksInYear    = getWeeksInYear;                                                            // 2555
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;                                                         // 2556
                                                                                                                       // 2557
    // Day                                                                                                             // 2558
    momentPrototype__proto.date       = getSetDayOfMonth;                                                              // 2559
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;                     // 2560
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;                                                         // 2561
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;                                                            // 2562
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;                                                               // 2563
                                                                                                                       // 2564
    // Hour                                                                                                            // 2565
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;                                           // 2566
                                                                                                                       // 2567
    // Minute                                                                                                          // 2568
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;                                     // 2569
                                                                                                                       // 2570
    // Second                                                                                                          // 2571
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;                                     // 2572
                                                                                                                       // 2573
    // Millisecond                                                                                                     // 2574
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;                      // 2575
                                                                                                                       // 2576
    // Offset                                                                                                          // 2577
    momentPrototype__proto.utcOffset            = getSetOffset;                                                        // 2578
    momentPrototype__proto.utc                  = setOffsetToUTC;                                                      // 2579
    momentPrototype__proto.local                = setOffsetToLocal;                                                    // 2580
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;                                             // 2581
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;                                                // 2582
    momentPrototype__proto.isDST                = isDaylightSavingTime;                                                // 2583
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;                                         // 2584
    momentPrototype__proto.isLocal              = isLocal;                                                             // 2585
    momentPrototype__proto.isUtcOffset          = isUtcOffset;                                                         // 2586
    momentPrototype__proto.isUtc                = isUtc;                                                               // 2587
    momentPrototype__proto.isUTC                = isUtc;                                                               // 2588
                                                                                                                       // 2589
    // Timezone                                                                                                        // 2590
    momentPrototype__proto.zoneAbbr = getZoneAbbr;                                                                     // 2591
    momentPrototype__proto.zoneName = getZoneName;                                                                     // 2592
                                                                                                                       // 2593
    // Deprecations                                                                                                    // 2594
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);    // 2595
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);        // 2596
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);           // 2597
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);
                                                                                                                       // 2599
    var momentPrototype = momentPrototype__proto;                                                                      // 2600
                                                                                                                       // 2601
    function moment__createUnix (input) {                                                                              // 2602
        return local__createLocal(input * 1000);                                                                       // 2603
    }                                                                                                                  // 2604
                                                                                                                       // 2605
    function moment__createInZone () {                                                                                 // 2606
        return local__createLocal.apply(null, arguments).parseZone();                                                  // 2607
    }                                                                                                                  // 2608
                                                                                                                       // 2609
    var defaultCalendar = {                                                                                            // 2610
        sameDay : '[Today at] LT',                                                                                     // 2611
        nextDay : '[Tomorrow at] LT',                                                                                  // 2612
        nextWeek : 'dddd [at] LT',                                                                                     // 2613
        lastDay : '[Yesterday at] LT',                                                                                 // 2614
        lastWeek : '[Last] dddd [at] LT',                                                                              // 2615
        sameElse : 'L'                                                                                                 // 2616
    };                                                                                                                 // 2617
                                                                                                                       // 2618
    function locale_calendar__calendar (key, mom, now) {                                                               // 2619
        var output = this._calendar[key];                                                                              // 2620
        return typeof output === 'function' ? output.call(mom, now) : output;                                          // 2621
    }                                                                                                                  // 2622
                                                                                                                       // 2623
    var defaultLongDateFormat = {                                                                                      // 2624
        LTS  : 'h:mm:ss A',                                                                                            // 2625
        LT   : 'h:mm A',                                                                                               // 2626
        L    : 'MM/DD/YYYY',                                                                                           // 2627
        LL   : 'MMMM D, YYYY',                                                                                         // 2628
        LLL  : 'MMMM D, YYYY h:mm A',                                                                                  // 2629
        LLLL : 'dddd, MMMM D, YYYY h:mm A'                                                                             // 2630
    };                                                                                                                 // 2631
                                                                                                                       // 2632
    function longDateFormat (key) {                                                                                    // 2633
        var format = this._longDateFormat[key],                                                                        // 2634
            formatUpper = this._longDateFormat[key.toUpperCase()];                                                     // 2635
                                                                                                                       // 2636
        if (format || !formatUpper) {                                                                                  // 2637
            return format;                                                                                             // 2638
        }                                                                                                              // 2639
                                                                                                                       // 2640
        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {                           // 2641
            return val.slice(1);                                                                                       // 2642
        });                                                                                                            // 2643
                                                                                                                       // 2644
        return this._longDateFormat[key];                                                                              // 2645
    }                                                                                                                  // 2646
                                                                                                                       // 2647
    var defaultInvalidDate = 'Invalid date';                                                                           // 2648
                                                                                                                       // 2649
    function invalidDate () {                                                                                          // 2650
        return this._invalidDate;                                                                                      // 2651
    }                                                                                                                  // 2652
                                                                                                                       // 2653
    var defaultOrdinal = '%d';                                                                                         // 2654
    var defaultOrdinalParse = /\d{1,2}/;                                                                               // 2655
                                                                                                                       // 2656
    function ordinal (number) {                                                                                        // 2657
        return this._ordinal.replace('%d', number);                                                                    // 2658
    }                                                                                                                  // 2659
                                                                                                                       // 2660
    function preParsePostFormat (string) {                                                                             // 2661
        return string;                                                                                                 // 2662
    }                                                                                                                  // 2663
                                                                                                                       // 2664
    var defaultRelativeTime = {                                                                                        // 2665
        future : 'in %s',                                                                                              // 2666
        past   : '%s ago',                                                                                             // 2667
        s  : 'a few seconds',                                                                                          // 2668
        m  : 'a minute',                                                                                               // 2669
        mm : '%d minutes',                                                                                             // 2670
        h  : 'an hour',                                                                                                // 2671
        hh : '%d hours',                                                                                               // 2672
        d  : 'a day',                                                                                                  // 2673
        dd : '%d days',                                                                                                // 2674
        M  : 'a month',                                                                                                // 2675
        MM : '%d months',                                                                                              // 2676
        y  : 'a year',                                                                                                 // 2677
        yy : '%d years'                                                                                                // 2678
    };                                                                                                                 // 2679
                                                                                                                       // 2680
    function relative__relativeTime (number, withoutSuffix, string, isFuture) {                                        // 2681
        var output = this._relativeTime[string];                                                                       // 2682
        return (typeof output === 'function') ?                                                                        // 2683
            output(number, withoutSuffix, string, isFuture) :                                                          // 2684
            output.replace(/%d/i, number);                                                                             // 2685
    }                                                                                                                  // 2686
                                                                                                                       // 2687
    function pastFuture (diff, output) {                                                                               // 2688
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];                                                 // 2689
        return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);                          // 2690
    }                                                                                                                  // 2691
                                                                                                                       // 2692
    function locale_set__set (config) {                                                                                // 2693
        var prop, i;                                                                                                   // 2694
        for (i in config) {                                                                                            // 2695
            prop = config[i];                                                                                          // 2696
            if (typeof prop === 'function') {                                                                          // 2697
                this[i] = prop;                                                                                        // 2698
            } else {                                                                                                   // 2699
                this['_' + i] = prop;                                                                                  // 2700
            }                                                                                                          // 2701
        }                                                                                                              // 2702
        // Lenient ordinal parsing accepts just a number in addition to                                                // 2703
        // number + (possibly) stuff coming from _ordinalParseLenient.                                                 // 2704
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);                  // 2705
    }                                                                                                                  // 2706
                                                                                                                       // 2707
    var prototype__proto = Locale.prototype;                                                                           // 2708
                                                                                                                       // 2709
    prototype__proto._calendar       = defaultCalendar;                                                                // 2710
    prototype__proto.calendar        = locale_calendar__calendar;                                                      // 2711
    prototype__proto._longDateFormat = defaultLongDateFormat;                                                          // 2712
    prototype__proto.longDateFormat  = longDateFormat;                                                                 // 2713
    prototype__proto._invalidDate    = defaultInvalidDate;                                                             // 2714
    prototype__proto.invalidDate     = invalidDate;                                                                    // 2715
    prototype__proto._ordinal        = defaultOrdinal;                                                                 // 2716
    prototype__proto.ordinal         = ordinal;                                                                        // 2717
    prototype__proto._ordinalParse   = defaultOrdinalParse;                                                            // 2718
    prototype__proto.preparse        = preParsePostFormat;                                                             // 2719
    prototype__proto.postformat      = preParsePostFormat;                                                             // 2720
    prototype__proto._relativeTime   = defaultRelativeTime;                                                            // 2721
    prototype__proto.relativeTime    = relative__relativeTime;                                                         // 2722
    prototype__proto.pastFuture      = pastFuture;                                                                     // 2723
    prototype__proto.set             = locale_set__set;                                                                // 2724
                                                                                                                       // 2725
    // Month                                                                                                           // 2726
    prototype__proto.months       =        localeMonths;                                                               // 2727
    prototype__proto._months      = defaultLocaleMonths;                                                               // 2728
    prototype__proto.monthsShort  =        localeMonthsShort;                                                          // 2729
    prototype__proto._monthsShort = defaultLocaleMonthsShort;                                                          // 2730
    prototype__proto.monthsParse  =        localeMonthsParse;                                                          // 2731
                                                                                                                       // 2732
    // Week                                                                                                            // 2733
    prototype__proto.week = localeWeek;                                                                                // 2734
    prototype__proto._week = defaultLocaleWeek;                                                                        // 2735
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;                                                            // 2736
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;                                                            // 2737
                                                                                                                       // 2738
    // Day of Week                                                                                                     // 2739
    prototype__proto.weekdays       =        localeWeekdays;                                                           // 2740
    prototype__proto._weekdays      = defaultLocaleWeekdays;                                                           // 2741
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;                                                        // 2742
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;                                                        // 2743
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;                                                      // 2744
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;                                                      // 2745
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;                                                      // 2746
                                                                                                                       // 2747
    // Hours                                                                                                           // 2748
    prototype__proto.isPM = localeIsPM;                                                                                // 2749
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;                                                      // 2750
    prototype__proto.meridiem = localeMeridiem;                                                                        // 2751
                                                                                                                       // 2752
    function lists__get (format, index, field, setter) {                                                               // 2753
        var locale = locale_locales__getLocale();                                                                      // 2754
        var utc = create_utc__createUTC().set(setter, index);                                                          // 2755
        return locale[field](utc, format);                                                                             // 2756
    }                                                                                                                  // 2757
                                                                                                                       // 2758
    function list (format, index, field, count, setter) {                                                              // 2759
        if (typeof format === 'number') {                                                                              // 2760
            index = format;                                                                                            // 2761
            format = undefined;                                                                                        // 2762
        }                                                                                                              // 2763
                                                                                                                       // 2764
        format = format || '';                                                                                         // 2765
                                                                                                                       // 2766
        if (index != null) {                                                                                           // 2767
            return lists__get(format, index, field, setter);                                                           // 2768
        }                                                                                                              // 2769
                                                                                                                       // 2770
        var i;                                                                                                         // 2771
        var out = [];                                                                                                  // 2772
        for (i = 0; i < count; i++) {                                                                                  // 2773
            out[i] = lists__get(format, i, field, setter);                                                             // 2774
        }                                                                                                              // 2775
        return out;                                                                                                    // 2776
    }                                                                                                                  // 2777
                                                                                                                       // 2778
    function lists__listMonths (format, index) {                                                                       // 2779
        return list(format, index, 'months', 12, 'month');                                                             // 2780
    }                                                                                                                  // 2781
                                                                                                                       // 2782
    function lists__listMonthsShort (format, index) {                                                                  // 2783
        return list(format, index, 'monthsShort', 12, 'month');                                                        // 2784
    }                                                                                                                  // 2785
                                                                                                                       // 2786
    function lists__listWeekdays (format, index) {                                                                     // 2787
        return list(format, index, 'weekdays', 7, 'day');                                                              // 2788
    }                                                                                                                  // 2789
                                                                                                                       // 2790
    function lists__listWeekdaysShort (format, index) {                                                                // 2791
        return list(format, index, 'weekdaysShort', 7, 'day');                                                         // 2792
    }                                                                                                                  // 2793
                                                                                                                       // 2794
    function lists__listWeekdaysMin (format, index) {                                                                  // 2795
        return list(format, index, 'weekdaysMin', 7, 'day');                                                           // 2796
    }                                                                                                                  // 2797
                                                                                                                       // 2798
    locale_locales__getSetGlobalLocale('en', {                                                                         // 2799
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,                                                                          // 2800
        ordinal : function (number) {                                                                                  // 2801
            var b = number % 10,                                                                                       // 2802
                output = (toInt(number % 100 / 10) === 1) ? 'th' :                                                     // 2803
                (b === 1) ? 'st' :                                                                                     // 2804
                (b === 2) ? 'nd' :                                                                                     // 2805
                (b === 3) ? 'rd' : 'th';                                                                               // 2806
            return number + output;                                                                                    // 2807
        }                                                                                                              // 2808
    });                                                                                                                // 2809
                                                                                                                       // 2810
    // Side effect imports                                                                                             // 2811
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);
                                                                                                                       // 2814
    var mathAbs = Math.abs;                                                                                            // 2815
                                                                                                                       // 2816
    function duration_abs__abs () {                                                                                    // 2817
        var data           = this._data;                                                                               // 2818
                                                                                                                       // 2819
        this._milliseconds = mathAbs(this._milliseconds);                                                              // 2820
        this._days         = mathAbs(this._days);                                                                      // 2821
        this._months       = mathAbs(this._months);                                                                    // 2822
                                                                                                                       // 2823
        data.milliseconds  = mathAbs(data.milliseconds);                                                               // 2824
        data.seconds       = mathAbs(data.seconds);                                                                    // 2825
        data.minutes       = mathAbs(data.minutes);                                                                    // 2826
        data.hours         = mathAbs(data.hours);                                                                      // 2827
        data.months        = mathAbs(data.months);                                                                     // 2828
        data.years         = mathAbs(data.years);                                                                      // 2829
                                                                                                                       // 2830
        return this;                                                                                                   // 2831
    }                                                                                                                  // 2832
                                                                                                                       // 2833
    function duration_add_subtract__addSubtract (duration, input, value, direction) {                                  // 2834
        var other = create__createDuration(input, value);                                                              // 2835
                                                                                                                       // 2836
        duration._milliseconds += direction * other._milliseconds;                                                     // 2837
        duration._days         += direction * other._days;                                                             // 2838
        duration._months       += direction * other._months;                                                           // 2839
                                                                                                                       // 2840
        return duration._bubble();                                                                                     // 2841
    }                                                                                                                  // 2842
                                                                                                                       // 2843
    // supports only 2.0-style add(1, 's') or add(duration)                                                            // 2844
    function duration_add_subtract__add (input, value) {                                                               // 2845
        return duration_add_subtract__addSubtract(this, input, value, 1);                                              // 2846
    }                                                                                                                  // 2847
                                                                                                                       // 2848
    // supports only 2.0-style subtract(1, 's') or subtract(duration)                                                  // 2849
    function duration_add_subtract__subtract (input, value) {                                                          // 2850
        return duration_add_subtract__addSubtract(this, input, value, -1);                                             // 2851
    }                                                                                                                  // 2852
                                                                                                                       // 2853
    function absCeil (number) {                                                                                        // 2854
        if (number < 0) {                                                                                              // 2855
            return Math.floor(number);                                                                                 // 2856
        } else {                                                                                                       // 2857
            return Math.ceil(number);                                                                                  // 2858
        }                                                                                                              // 2859
    }                                                                                                                  // 2860
                                                                                                                       // 2861
    function bubble () {                                                                                               // 2862
        var milliseconds = this._milliseconds;                                                                         // 2863
        var days         = this._days;                                                                                 // 2864
        var months       = this._months;                                                                               // 2865
        var data         = this._data;                                                                                 // 2866
        var seconds, minutes, hours, years, monthsFromDays;                                                            // 2867
                                                                                                                       // 2868
        // if we have a mix of positive and negative values, bubble down first                                         // 2869
        // check: https://github.com/moment/moment/issues/2166                                                         // 2870
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||                                                       // 2871
                (milliseconds <= 0 && days <= 0 && months <= 0))) {                                                    // 2872
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;                                              // 2873
            days = 0;                                                                                                  // 2874
            months = 0;                                                                                                // 2875
        }                                                                                                              // 2876
                                                                                                                       // 2877
        // The following code bubbles up values, see the tests for                                                     // 2878
        // examples of what that means.                                                                                // 2879
        data.milliseconds = milliseconds % 1000;                                                                       // 2880
                                                                                                                       // 2881
        seconds           = absFloor(milliseconds / 1000);                                                             // 2882
        data.seconds      = seconds % 60;                                                                              // 2883
                                                                                                                       // 2884
        minutes           = absFloor(seconds / 60);                                                                    // 2885
        data.minutes      = minutes % 60;                                                                              // 2886
                                                                                                                       // 2887
        hours             = absFloor(minutes / 60);                                                                    // 2888
        data.hours        = hours % 24;                                                                                // 2889
                                                                                                                       // 2890
        days += absFloor(hours / 24);                                                                                  // 2891
                                                                                                                       // 2892
        // convert days to months                                                                                      // 2893
        monthsFromDays = absFloor(daysToMonths(days));                                                                 // 2894
        months += monthsFromDays;                                                                                      // 2895
        days -= absCeil(monthsToDays(monthsFromDays));                                                                 // 2896
                                                                                                                       // 2897
        // 12 months -> 1 year                                                                                         // 2898
        years = absFloor(months / 12);                                                                                 // 2899
        months %= 12;                                                                                                  // 2900
                                                                                                                       // 2901
        data.days   = days;                                                                                            // 2902
        data.months = months;                                                                                          // 2903
        data.years  = years;                                                                                           // 2904
                                                                                                                       // 2905
        return this;                                                                                                   // 2906
    }                                                                                                                  // 2907
                                                                                                                       // 2908
    function daysToMonths (days) {                                                                                     // 2909
        // 400 years have 146097 days (taking into account leap year rules)                                            // 2910
        // 400 years have 12 months === 4800                                                                           // 2911
        return days * 4800 / 146097;                                                                                   // 2912
    }                                                                                                                  // 2913
                                                                                                                       // 2914
    function monthsToDays (months) {                                                                                   // 2915
        // the reverse of daysToMonths                                                                                 // 2916
        return months * 146097 / 4800;                                                                                 // 2917
    }                                                                                                                  // 2918
                                                                                                                       // 2919
    function as (units) {                                                                                              // 2920
        var days;                                                                                                      // 2921
        var months;                                                                                                    // 2922
        var milliseconds = this._milliseconds;                                                                         // 2923
                                                                                                                       // 2924
        units = normalizeUnits(units);                                                                                 // 2925
                                                                                                                       // 2926
        if (units === 'month' || units === 'year') {                                                                   // 2927
            days   = this._days   + milliseconds / 864e5;                                                              // 2928
            months = this._months + daysToMonths(days);                                                                // 2929
            return units === 'month' ? months : months / 12;                                                           // 2930
        } else {                                                                                                       // 2931
            // handle milliseconds separately because of floating point math errors (issue #1867)                      // 2932
            days = this._days + Math.round(monthsToDays(this._months));                                                // 2933
            switch (units) {                                                                                           // 2934
                case 'week'   : return days / 7     + milliseconds / 6048e5;                                           // 2935
                case 'day'    : return days         + milliseconds / 864e5;                                            // 2936
                case 'hour'   : return days * 24    + milliseconds / 36e5;                                             // 2937
                case 'minute' : return days * 1440  + milliseconds / 6e4;                                              // 2938
                case 'second' : return days * 86400 + milliseconds / 1000;                                             // 2939
                // Math.floor prevents floating point math errors here                                                 // 2940
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;                                    // 2941
                default: throw new Error('Unknown unit ' + units);                                                     // 2942
            }                                                                                                          // 2943
        }                                                                                                              // 2944
    }                                                                                                                  // 2945
                                                                                                                       // 2946
    // TODO: Use this.as('ms')?                                                                                        // 2947
    function duration_as__valueOf () {                                                                                 // 2948
        return (                                                                                                       // 2949
            this._milliseconds +                                                                                       // 2950
            this._days * 864e5 +                                                                                       // 2951
            (this._months % 12) * 2592e6 +                                                                             // 2952
            toInt(this._months / 12) * 31536e6                                                                         // 2953
        );                                                                                                             // 2954
    }                                                                                                                  // 2955
                                                                                                                       // 2956
    function makeAs (alias) {                                                                                          // 2957
        return function () {                                                                                           // 2958
            return this.as(alias);                                                                                     // 2959
        };                                                                                                             // 2960
    }                                                                                                                  // 2961
                                                                                                                       // 2962
    var asMilliseconds = makeAs('ms');                                                                                 // 2963
    var asSeconds      = makeAs('s');                                                                                  // 2964
    var asMinutes      = makeAs('m');                                                                                  // 2965
    var asHours        = makeAs('h');                                                                                  // 2966
    var asDays         = makeAs('d');                                                                                  // 2967
    var asWeeks        = makeAs('w');                                                                                  // 2968
    var asMonths       = makeAs('M');                                                                                  // 2969
    var asYears        = makeAs('y');                                                                                  // 2970
                                                                                                                       // 2971
    function duration_get__get (units) {                                                                               // 2972
        units = normalizeUnits(units);                                                                                 // 2973
        return this[units + 's']();                                                                                    // 2974
    }                                                                                                                  // 2975
                                                                                                                       // 2976
    function makeGetter(name) {                                                                                        // 2977
        return function () {                                                                                           // 2978
            return this._data[name];                                                                                   // 2979
        };                                                                                                             // 2980
    }                                                                                                                  // 2981
                                                                                                                       // 2982
    var milliseconds = makeGetter('milliseconds');                                                                     // 2983
    var seconds      = makeGetter('seconds');                                                                          // 2984
    var minutes      = makeGetter('minutes');                                                                          // 2985
    var hours        = makeGetter('hours');                                                                            // 2986
    var days         = makeGetter('days');                                                                             // 2987
    var months       = makeGetter('months');                                                                           // 2988
    var years        = makeGetter('years');                                                                            // 2989
                                                                                                                       // 2990
    function weeks () {                                                                                                // 2991
        return absFloor(this.days() / 7);                                                                              // 2992
    }                                                                                                                  // 2993
                                                                                                                       // 2994
    var round = Math.round;                                                                                            // 2995
    var thresholds = {                                                                                                 // 2996
        s: 45,  // seconds to minute                                                                                   // 2997
        m: 45,  // minutes to hour                                                                                     // 2998
        h: 22,  // hours to day                                                                                        // 2999
        d: 26,  // days to month                                                                                       // 3000
        M: 11   // months to year                                                                                      // 3001
    };                                                                                                                 // 3002
                                                                                                                       // 3003
    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize                          // 3004
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {                                      // 3005
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);                                    // 3006
    }                                                                                                                  // 3007
                                                                                                                       // 3008
    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {                                 // 3009
        var duration = create__createDuration(posNegDuration).abs();                                                   // 3010
        var seconds  = round(duration.as('s'));                                                                        // 3011
        var minutes  = round(duration.as('m'));                                                                        // 3012
        var hours    = round(duration.as('h'));                                                                        // 3013
        var days     = round(duration.as('d'));                                                                        // 3014
        var months   = round(duration.as('M'));                                                                        // 3015
        var years    = round(duration.as('y'));                                                                        // 3016
                                                                                                                       // 3017
        var a = seconds < thresholds.s && ['s', seconds]  ||                                                           // 3018
                minutes === 1          && ['m']           ||                                                           // 3019
                minutes < thresholds.m && ['mm', minutes] ||                                                           // 3020
                hours   === 1          && ['h']           ||                                                           // 3021
                hours   < thresholds.h && ['hh', hours]   ||                                                           // 3022
                days    === 1          && ['d']           ||                                                           // 3023
                days    < thresholds.d && ['dd', days]    ||                                                           // 3024
                months  === 1          && ['M']           ||                                                           // 3025
                months  < thresholds.M && ['MM', months]  ||                                                           // 3026
                years   === 1          && ['y']           || ['yy', years];                                            // 3027
                                                                                                                       // 3028
        a[2] = withoutSuffix;                                                                                          // 3029
        a[3] = +posNegDuration > 0;                                                                                    // 3030
        a[4] = locale;                                                                                                 // 3031
        return substituteTimeAgo.apply(null, a);                                                                       // 3032
    }                                                                                                                  // 3033
                                                                                                                       // 3034
    // This function allows you to set a threshold for relative time strings                                           // 3035
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {                                       // 3036
        if (thresholds[threshold] === undefined) {                                                                     // 3037
            return false;                                                                                              // 3038
        }                                                                                                              // 3039
        if (limit === undefined) {                                                                                     // 3040
            return thresholds[threshold];                                                                              // 3041
        }                                                                                                              // 3042
        thresholds[threshold] = limit;                                                                                 // 3043
        return true;                                                                                                   // 3044
    }                                                                                                                  // 3045
                                                                                                                       // 3046
    function humanize (withSuffix) {                                                                                   // 3047
        var locale = this.localeData();                                                                                // 3048
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);                                       // 3049
                                                                                                                       // 3050
        if (withSuffix) {                                                                                              // 3051
            output = locale.pastFuture(+this, output);                                                                 // 3052
        }                                                                                                              // 3053
                                                                                                                       // 3054
        return locale.postformat(output);                                                                              // 3055
    }                                                                                                                  // 3056
                                                                                                                       // 3057
    var iso_string__abs = Math.abs;                                                                                    // 3058
                                                                                                                       // 3059
    function iso_string__toISOString() {                                                                               // 3060
        // for ISO strings we do not use the normal bubbling rules:                                                    // 3061
        //  * milliseconds bubble up until they become hours                                                           // 3062
        //  * days do not bubble at all                                                                                // 3063
        //  * months bubble up until they become years                                                                 // 3064
        // This is because there is no context-free conversion between hours and days                                  // 3065
        // (think of clock changes)                                                                                    // 3066
        // and also not between days and months (28-31 days per month)                                                 // 3067
        var seconds = iso_string__abs(this._milliseconds) / 1000;                                                      // 3068
        var days         = iso_string__abs(this._days);                                                                // 3069
        var months       = iso_string__abs(this._months);                                                              // 3070
        var minutes, hours, years;                                                                                     // 3071
                                                                                                                       // 3072
        // 3600 seconds -> 60 minutes -> 1 hour                                                                        // 3073
        minutes           = absFloor(seconds / 60);                                                                    // 3074
        hours             = absFloor(minutes / 60);                                                                    // 3075
        seconds %= 60;                                                                                                 // 3076
        minutes %= 60;                                                                                                 // 3077
                                                                                                                       // 3078
        // 12 months -> 1 year                                                                                         // 3079
        years  = absFloor(months / 12);                                                                                // 3080
        months %= 12;                                                                                                  // 3081
                                                                                                                       // 3082
                                                                                                                       // 3083
        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js                // 3084
        var Y = years;                                                                                                 // 3085
        var M = months;                                                                                                // 3086
        var D = days;                                                                                                  // 3087
        var h = hours;                                                                                                 // 3088
        var m = minutes;                                                                                               // 3089
        var s = seconds;                                                                                               // 3090
        var total = this.asSeconds();                                                                                  // 3091
                                                                                                                       // 3092
        if (!total) {                                                                                                  // 3093
            // this is the same as C#'s (Noda) and python (isodate)...                                                 // 3094
            // but not other JS (goog.date)                                                                            // 3095
            return 'P0D';                                                                                              // 3096
        }                                                                                                              // 3097
                                                                                                                       // 3098
        return (total < 0 ? '-' : '') +                                                                                // 3099
            'P' +                                                                                                      // 3100
            (Y ? Y + 'Y' : '') +                                                                                       // 3101
            (M ? M + 'M' : '') +                                                                                       // 3102
            (D ? D + 'D' : '') +                                                                                       // 3103
            ((h || m || s) ? 'T' : '') +                                                                               // 3104
            (h ? h + 'H' : '') +                                                                                       // 3105
            (m ? m + 'M' : '') +                                                                                       // 3106
            (s ? s + 'S' : '');                                                                                        // 3107
    }                                                                                                                  // 3108
                                                                                                                       // 3109
    var duration_prototype__proto = Duration.prototype;                                                                // 3110
                                                                                                                       // 3111
    duration_prototype__proto.abs            = duration_abs__abs;                                                      // 3112
    duration_prototype__proto.add            = duration_add_subtract__add;                                             // 3113
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;                                        // 3114
    duration_prototype__proto.as             = as;                                                                     // 3115
    duration_prototype__proto.asMilliseconds = asMilliseconds;                                                         // 3116
    duration_prototype__proto.asSeconds      = asSeconds;                                                              // 3117
    duration_prototype__proto.asMinutes      = asMinutes;                                                              // 3118
    duration_prototype__proto.asHours        = asHours;                                                                // 3119
    duration_prototype__proto.asDays         = asDays;                                                                 // 3120
    duration_prototype__proto.asWeeks        = asWeeks;                                                                // 3121
    duration_prototype__proto.asMonths       = asMonths;                                                               // 3122
    duration_prototype__proto.asYears        = asYears;                                                                // 3123
    duration_prototype__proto.valueOf        = duration_as__valueOf;                                                   // 3124
    duration_prototype__proto._bubble        = bubble;                                                                 // 3125
    duration_prototype__proto.get            = duration_get__get;                                                      // 3126
    duration_prototype__proto.milliseconds   = milliseconds;                                                           // 3127
    duration_prototype__proto.seconds        = seconds;                                                                // 3128
    duration_prototype__proto.minutes        = minutes;                                                                // 3129
    duration_prototype__proto.hours          = hours;                                                                  // 3130
    duration_prototype__proto.days           = days;                                                                   // 3131
    duration_prototype__proto.weeks          = weeks;                                                                  // 3132
    duration_prototype__proto.months         = months;                                                                 // 3133
    duration_prototype__proto.years          = years;                                                                  // 3134
    duration_prototype__proto.humanize       = humanize;                                                               // 3135
    duration_prototype__proto.toISOString    = iso_string__toISOString;                                                // 3136
    duration_prototype__proto.toString       = iso_string__toISOString;                                                // 3137
    duration_prototype__proto.toJSON         = iso_string__toISOString;                                                // 3138
    duration_prototype__proto.locale         = locale;                                                                 // 3139
    duration_prototype__proto.localeData     = localeData;                                                             // 3140
                                                                                                                       // 3141
    // Deprecations                                                                                                    // 3142
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;                                                                             // 3144
                                                                                                                       // 3145
    // Side effect imports                                                                                             // 3146
                                                                                                                       // 3147
    addFormatToken('X', 0, 0, 'unix');                                                                                 // 3148
    addFormatToken('x', 0, 0, 'valueOf');                                                                              // 3149
                                                                                                                       // 3150
    // PARSING                                                                                                         // 3151
                                                                                                                       // 3152
    addRegexToken('x', matchSigned);                                                                                   // 3153
    addRegexToken('X', matchTimestamp);                                                                                // 3154
    addParseToken('X', function (input, array, config) {                                                               // 3155
        config._d = new Date(parseFloat(input, 10) * 1000);                                                            // 3156
    });                                                                                                                // 3157
    addParseToken('x', function (input, array, config) {                                                               // 3158
        config._d = new Date(toInt(input));                                                                            // 3159
    });                                                                                                                // 3160
                                                                                                                       // 3161
    // Side effect imports                                                                                             // 3162
                                                                                                                       // 3163
                                                                                                                       // 3164
    utils_hooks__hooks.version = '2.10.6';                                                                             // 3165
                                                                                                                       // 3166
    setHookCallback(local__createLocal);                                                                               // 3167
                                                                                                                       // 3168
    utils_hooks__hooks.fn                    = momentPrototype;                                                        // 3169
    utils_hooks__hooks.min                   = min;                                                                    // 3170
    utils_hooks__hooks.max                   = max;                                                                    // 3171
    utils_hooks__hooks.utc                   = create_utc__createUTC;                                                  // 3172
    utils_hooks__hooks.unix                  = moment__createUnix;                                                     // 3173
    utils_hooks__hooks.months                = lists__listMonths;                                                      // 3174
    utils_hooks__hooks.isDate                = isDate;                                                                 // 3175
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;                                     // 3176
    utils_hooks__hooks.invalid               = valid__createInvalid;                                                   // 3177
    utils_hooks__hooks.duration              = create__createDuration;                                                 // 3178
    utils_hooks__hooks.isMoment              = isMoment;                                                               // 3179
    utils_hooks__hooks.weekdays              = lists__listWeekdays;                                                    // 3180
    utils_hooks__hooks.parseZone             = moment__createInZone;                                                   // 3181
    utils_hooks__hooks.localeData            = locale_locales__getLocale;                                              // 3182
    utils_hooks__hooks.isDuration            = isDuration;                                                             // 3183
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;                                                 // 3184
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;                                                 // 3185
    utils_hooks__hooks.defineLocale          = defineLocale;                                                           // 3186
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;                                               // 3187
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;                                                         // 3188
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;                         // 3189
                                                                                                                       // 3190
    var _moment = utils_hooks__hooks;                                                                                  // 3191
                                                                                                                       // 3192
    return _moment;                                                                                                    // 3193
                                                                                                                       // 3194
}));                                                                                                                   // 3195
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/momentjs:moment/meteor/export.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// moment.js makes `moment` global on the window (or global) object, while Meteor expects a file-scoped global variable
moment = this.moment;                                                                                                  // 2
try {                                                                                                                  // 3
    delete this.moment;                                                                                                // 4
} catch (e) {                                                                                                          // 5
}                                                                                                                      // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['momentjs:moment'] = {
  moment: moment
};

})();
