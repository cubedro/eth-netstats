(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var numeral;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/numeral:numeral/numeral.js                                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/*!                                                                                                                 // 1
 * numeral.js                                                                                                       // 2
 * version : 1.5.3                                                                                                  // 3
 * author : Adam Draper                                                                                             // 4
 * license : MIT                                                                                                    // 5
 * http://adamwdraper.github.com/Numeral-js/                                                                        // 6
 */                                                                                                                 // 7
                                                                                                                    // 8
(function() {                                                                                                       // 9
                                                                                                                    // 10
    /************************************                                                                           // 11
        Constants                                                                                                   // 12
    ************************************/                                                                           // 13
                                                                                                                    // 14
    var numeral,                                                                                                    // 15
        VERSION = '1.5.3',                                                                                          // 16
        // internal storage for language config files                                                               // 17
        languages = {},                                                                                             // 18
        currentLanguage = 'en',                                                                                     // 19
        zeroFormat = null,                                                                                          // 20
        defaultFormat = '0,0',                                                                                      // 21
        // check for nodeJS                                                                                         // 22
        hasModule = (typeof module !== 'undefined' && module.exports);                                              // 23
                                                                                                                    // 24
                                                                                                                    // 25
    /************************************                                                                           // 26
        Constructors                                                                                                // 27
    ************************************/                                                                           // 28
                                                                                                                    // 29
                                                                                                                    // 30
    // Numeral prototype object                                                                                     // 31
    function Numeral(number) {                                                                                      // 32
        this._value = number;                                                                                       // 33
    }                                                                                                               // 34
                                                                                                                    // 35
    /**                                                                                                             // 36
     * Implementation of toFixed() that treats floats more like decimals                                            // 37
     *                                                                                                              // 38
     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present                                // 39
     * problems for accounting- and finance-related software.                                                       // 40
     */                                                                                                             // 41
    function toFixed(value, precision, roundingFunction, optionals) {                                               // 42
        var power = Math.pow(10, precision),                                                                        // 43
            optionalsRegExp,                                                                                        // 44
            output;                                                                                                 // 45
                                                                                                                    // 46
        //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);                      // 47
        // Multiply up by precision, round accurately, then divide and use native toFixed():                        // 48
        output = (roundingFunction(value * power) / power).toFixed(precision);                                      // 49
                                                                                                                    // 50
        if (optionals) {                                                                                            // 51
            optionalsRegExp = new RegExp('0{1,' + optionals + '}$');                                                // 52
            output = output.replace(optionalsRegExp, '');                                                           // 53
        }                                                                                                           // 54
                                                                                                                    // 55
        return output;                                                                                              // 56
    }                                                                                                               // 57
                                                                                                                    // 58
    /************************************                                                                           // 59
        Formatting                                                                                                  // 60
    ************************************/                                                                           // 61
                                                                                                                    // 62
    // determine what type of formatting we need to do                                                              // 63
    function formatNumeral(n, format, roundingFunction) {                                                           // 64
        var output;                                                                                                 // 65
                                                                                                                    // 66
        // figure out what kind of format we are dealing with                                                       // 67
        if (format.indexOf('$') > -1) { // currency!!!!!                                                            // 68
            output = formatCurrency(n, format, roundingFunction);                                                   // 69
        } else if (format.indexOf('%') > -1) { // percentage                                                        // 70
            output = formatPercentage(n, format, roundingFunction);                                                 // 71
        } else if (format.indexOf(':') > -1) { // time                                                              // 72
            output = formatTime(n, format);                                                                         // 73
        } else { // plain ol' numbers or bytes                                                                      // 74
            output = formatNumber(n._value, format, roundingFunction);                                              // 75
        }                                                                                                           // 76
                                                                                                                    // 77
        // return string                                                                                            // 78
        return output;                                                                                              // 79
    }                                                                                                               // 80
                                                                                                                    // 81
    // revert to number                                                                                             // 82
    function unformatNumeral(n, string) {                                                                           // 83
        var stringOriginal = string,                                                                                // 84
            thousandRegExp,                                                                                         // 85
            millionRegExp,                                                                                          // 86
            billionRegExp,                                                                                          // 87
            trillionRegExp,                                                                                         // 88
            suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],                                            // 89
            bytesMultiplier = false,                                                                                // 90
            power;                                                                                                  // 91
                                                                                                                    // 92
        if (string.indexOf(':') > -1) {                                                                             // 93
            n._value = unformatTime(string);                                                                        // 94
        } else {                                                                                                    // 95
            if (string === zeroFormat) {                                                                            // 96
                n._value = 0;                                                                                       // 97
            } else {                                                                                                // 98
                if (languages[currentLanguage].delimiters.decimal !== '.') {                                        // 99
                    string = string.replace(/\./g, '').replace(languages[currentLanguage].delimiters.decimal, '.'); // 100
                }                                                                                                   // 101
                                                                                                                    // 102
                // see if abbreviations are there so that we can multiply to the correct number                     // 103
                thousandRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.thousand + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                millionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.million + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                billionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.billion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                trillionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.trillion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                                                                                                                    // 108
                // see if bytes are there so that we can multiply to the correct number                             // 109
                for (power = 0; power <= suffixes.length; power++) {                                                // 110
                    bytesMultiplier = (string.indexOf(suffixes[power]) > -1) ? Math.pow(1024, power + 1) : false;   // 111
                                                                                                                    // 112
                    if (bytesMultiplier) {                                                                          // 113
                        break;                                                                                      // 114
                    }                                                                                               // 115
                }                                                                                                   // 116
                                                                                                                    // 117
                // do some math to create our number                                                                // 118
                n._value = ((bytesMultiplier) ? bytesMultiplier : 1) * ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) * ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) * ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) * ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) * ((string.indexOf('%') > -1) ? 0.01 : 1) * (((string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2) ? 1 : -1) * Number(string.replace(/[^0-9\.]+/g, ''));
                                                                                                                    // 120
                // round if we are talking about bytes                                                              // 121
                n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;                                      // 122
            }                                                                                                       // 123
        }                                                                                                           // 124
        return n._value;                                                                                            // 125
    }                                                                                                               // 126
                                                                                                                    // 127
    function formatCurrency(n, format, roundingFunction) {                                                          // 128
        var symbolIndex = format.indexOf('$'),                                                                      // 129
            openParenIndex = format.indexOf('('),                                                                   // 130
            minusSignIndex = format.indexOf('-'),                                                                   // 131
            space = '',                                                                                             // 132
            spliceIndex,                                                                                            // 133
            output;                                                                                                 // 134
                                                                                                                    // 135
        // check for space before or after currency                                                                 // 136
        if (format.indexOf(' $') > -1) {                                                                            // 137
            space = ' ';                                                                                            // 138
            format = format.replace(' $', '');                                                                      // 139
        } else if (format.indexOf('$ ') > -1) {                                                                     // 140
            space = ' ';                                                                                            // 141
            format = format.replace('$ ', '');                                                                      // 142
        } else {                                                                                                    // 143
            format = format.replace('$', '');                                                                       // 144
        }                                                                                                           // 145
                                                                                                                    // 146
        // format the number                                                                                        // 147
        output = formatNumber(n._value, format, roundingFunction);                                                  // 148
                                                                                                                    // 149
        // position the symbol                                                                                      // 150
        if (symbolIndex <= 1) {                                                                                     // 151
            if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {                                             // 152
                output = output.split('');                                                                          // 153
                spliceIndex = 1;                                                                                    // 154
                if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex) {                                 // 155
                    // the symbol appears before the "(" or "-"                                                     // 156
                    spliceIndex = 0;                                                                                // 157
                }                                                                                                   // 158
                output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);                  // 159
                output = output.join('');                                                                           // 160
            } else {                                                                                                // 161
                output = languages[currentLanguage].currency.symbol + space + output;                               // 162
            }                                                                                                       // 163
        } else {                                                                                                    // 164
            if (output.indexOf(')') > -1) {                                                                         // 165
                output = output.split('');                                                                          // 166
                output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);                           // 167
                output = output.join('');                                                                           // 168
            } else {                                                                                                // 169
                output = output + space + languages[currentLanguage].currency.symbol;                               // 170
            }                                                                                                       // 171
        }                                                                                                           // 172
                                                                                                                    // 173
        return output;                                                                                              // 174
    }                                                                                                               // 175
                                                                                                                    // 176
    function formatPercentage(n, format, roundingFunction) {                                                        // 177
        var space = '',                                                                                             // 178
            output,                                                                                                 // 179
            value = n._value * 100;                                                                                 // 180
                                                                                                                    // 181
        // check for space before %                                                                                 // 182
        if (format.indexOf(' %') > -1) {                                                                            // 183
            space = ' ';                                                                                            // 184
            format = format.replace(' %', '');                                                                      // 185
        } else {                                                                                                    // 186
            format = format.replace('%', '');                                                                       // 187
        }                                                                                                           // 188
                                                                                                                    // 189
        output = formatNumber(value, format, roundingFunction);                                                     // 190
                                                                                                                    // 191
        if (output.indexOf(')') > -1) {                                                                             // 192
            output = output.split('');                                                                              // 193
            output.splice(-1, 0, space + '%');                                                                      // 194
            output = output.join('');                                                                               // 195
        } else {                                                                                                    // 196
            output = output + space + '%';                                                                          // 197
        }                                                                                                           // 198
                                                                                                                    // 199
        return output;                                                                                              // 200
    }                                                                                                               // 201
                                                                                                                    // 202
    function formatTime(n) {                                                                                        // 203
        var hours = Math.floor(n._value / 60 / 60),                                                                 // 204
            minutes = Math.floor((n._value - (hours * 60 * 60)) / 60),                                              // 205
            seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));                                    // 206
        return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
    }                                                                                                               // 208
                                                                                                                    // 209
    function unformatTime(string) {                                                                                 // 210
        var timeArray = string.split(':'),                                                                          // 211
            seconds = 0;                                                                                            // 212
        // turn hours and minutes into seconds and add them all up                                                  // 213
        if (timeArray.length === 3) {                                                                               // 214
            // hours                                                                                                // 215
            seconds = seconds + (Number(timeArray[0]) * 60 * 60);                                                   // 216
            // minutes                                                                                              // 217
            seconds = seconds + (Number(timeArray[1]) * 60);                                                        // 218
            // seconds                                                                                              // 219
            seconds = seconds + Number(timeArray[2]);                                                               // 220
        } else if (timeArray.length === 2) {                                                                        // 221
            // minutes                                                                                              // 222
            seconds = seconds + (Number(timeArray[0]) * 60);                                                        // 223
            // seconds                                                                                              // 224
            seconds = seconds + Number(timeArray[1]);                                                               // 225
        }                                                                                                           // 226
        return Number(seconds);                                                                                     // 227
    }                                                                                                               // 228
                                                                                                                    // 229
    function formatNumber(value, format, roundingFunction) {                                                        // 230
        var negP = false,                                                                                           // 231
            signed = false,                                                                                         // 232
            optDec = false,                                                                                         // 233
            abbr = '',                                                                                              // 234
            abbrK = false, // force abbreviation to thousands                                                       // 235
            abbrM = false, // force abbreviation to millions                                                        // 236
            abbrB = false, // force abbreviation to billions                                                        // 237
            abbrT = false, // force abbreviation to trillions                                                       // 238
            abbrForce = false, // force abbreviation                                                                // 239
            bytes = '',                                                                                             // 240
            ord = '',                                                                                               // 241
            abs = Math.abs(value),                                                                                  // 242
            suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],                                       // 243
            min,                                                                                                    // 244
            max,                                                                                                    // 245
            power,                                                                                                  // 246
            w,                                                                                                      // 247
            precision,                                                                                              // 248
            thousands,                                                                                              // 249
            d = '',                                                                                                 // 250
            neg = false;                                                                                            // 251
                                                                                                                    // 252
        // check if number is zero and a custom zero format has been set                                            // 253
        if (value === 0 && zeroFormat !== null) {                                                                   // 254
            return zeroFormat;                                                                                      // 255
        } else {                                                                                                    // 256
            // see if we should use parentheses for negative number or if we should prefix with a sign              // 257
            // if both are present we default to parentheses                                                        // 258
            if (format.indexOf('(') > -1) {                                                                         // 259
                negP = true;                                                                                        // 260
                format = format.slice(1, -1);                                                                       // 261
            } else if (format.indexOf('+') > -1) {                                                                  // 262
                signed = true;                                                                                      // 263
                format = format.replace(/\+/g, '');                                                                 // 264
            }                                                                                                       // 265
                                                                                                                    // 266
            // see if abbreviation is wanted                                                                        // 267
            if (format.indexOf('a') > -1) {                                                                         // 268
                // check if abbreviation is specified                                                               // 269
                abbrK = format.indexOf('aK') >= 0;                                                                  // 270
                abbrM = format.indexOf('aM') >= 0;                                                                  // 271
                abbrB = format.indexOf('aB') >= 0;                                                                  // 272
                abbrT = format.indexOf('aT') >= 0;                                                                  // 273
                abbrForce = abbrK || abbrM || abbrB || abbrT;                                                       // 274
                                                                                                                    // 275
                // check for space before abbreviation                                                              // 276
                if (format.indexOf(' a') > -1) {                                                                    // 277
                    abbr = ' ';                                                                                     // 278
                    format = format.replace(' a', '');                                                              // 279
                } else {                                                                                            // 280
                    format = format.replace('a', '');                                                               // 281
                }                                                                                                   // 282
                                                                                                                    // 283
                if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {                                               // 284
                    // trillion                                                                                     // 285
                    abbr = abbr + languages[currentLanguage].abbreviations.trillion;                                // 286
                    value = value / Math.pow(10, 12);                                                               // 287
                } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {               // 288
                    // billion                                                                                      // 289
                    abbr = abbr + languages[currentLanguage].abbreviations.billion;                                 // 290
                    value = value / Math.pow(10, 9);                                                                // 291
                } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {                // 292
                    // million                                                                                      // 293
                    abbr = abbr + languages[currentLanguage].abbreviations.million;                                 // 294
                    value = value / Math.pow(10, 6);                                                                // 295
                } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {                // 296
                    // thousand                                                                                     // 297
                    abbr = abbr + languages[currentLanguage].abbreviations.thousand;                                // 298
                    value = value / Math.pow(10, 3);                                                                // 299
                }                                                                                                   // 300
            }                                                                                                       // 301
                                                                                                                    // 302
            // see if we are formatting bytes                                                                       // 303
            if (format.indexOf('b') > -1) {                                                                         // 304
                // check for space before                                                                           // 305
                if (format.indexOf(' b') > -1) {                                                                    // 306
                    bytes = ' ';                                                                                    // 307
                    format = format.replace(' b', '');                                                              // 308
                } else {                                                                                            // 309
                    format = format.replace('b', '');                                                               // 310
                }                                                                                                   // 311
                                                                                                                    // 312
                for (power = 0; power <= suffixes.length; power++) {                                                // 313
                    min = Math.pow(1024, power);                                                                    // 314
                    max = Math.pow(1024, power + 1);                                                                // 315
                                                                                                                    // 316
                    if (value >= min && value < max) {                                                              // 317
                        bytes = bytes + suffixes[power];                                                            // 318
                        if (min > 0) {                                                                              // 319
                            value = value / min;                                                                    // 320
                        }                                                                                           // 321
                        break;                                                                                      // 322
                    }                                                                                               // 323
                }                                                                                                   // 324
            }                                                                                                       // 325
                                                                                                                    // 326
            // see if ordinal is wanted                                                                             // 327
            if (format.indexOf('o') > -1) {                                                                         // 328
                // check for space before                                                                           // 329
                if (format.indexOf(' o') > -1) {                                                                    // 330
                    ord = ' ';                                                                                      // 331
                    format = format.replace(' o', '');                                                              // 332
                } else {                                                                                            // 333
                    format = format.replace('o', '');                                                               // 334
                }                                                                                                   // 335
                                                                                                                    // 336
                ord = ord + languages[currentLanguage].ordinal(value);                                              // 337
            }                                                                                                       // 338
                                                                                                                    // 339
            if (format.indexOf('[.]') > -1) {                                                                       // 340
                optDec = true;                                                                                      // 341
                format = format.replace('[.]', '.');                                                                // 342
            }                                                                                                       // 343
                                                                                                                    // 344
            w = value.toString().split('.')[0];                                                                     // 345
            precision = format.split('.')[1];                                                                       // 346
            thousands = format.indexOf(',');                                                                        // 347
                                                                                                                    // 348
            if (precision) {                                                                                        // 349
                if (precision.indexOf('[') > -1) {                                                                  // 350
                    precision = precision.replace(']', '');                                                         // 351
                    precision = precision.split('[');                                                               // 352
                    d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
                } else {                                                                                            // 354
                    d = toFixed(value, precision.length, roundingFunction);                                         // 355
                }                                                                                                   // 356
                                                                                                                    // 357
                w = d.split('.')[0];                                                                                // 358
                                                                                                                    // 359
                if (d.split('.')[1].length) {                                                                       // 360
                    d = languages[currentLanguage].delimiters.decimal + d.split('.')[1];                            // 361
                } else {                                                                                            // 362
                    d = '';                                                                                         // 363
                }                                                                                                   // 364
                                                                                                                    // 365
                if (optDec && Number(d.slice(1)) === 0) {                                                           // 366
                    d = '';                                                                                         // 367
                }                                                                                                   // 368
            } else {                                                                                                // 369
                w = toFixed(value, null, roundingFunction);                                                         // 370
            }                                                                                                       // 371
                                                                                                                    // 372
            // format number                                                                                        // 373
            if (w.indexOf('-') > -1) {                                                                              // 374
                w = w.slice(1);                                                                                     // 375
                neg = true;                                                                                         // 376
            }                                                                                                       // 377
                                                                                                                    // 378
            if (thousands > -1) {                                                                                   // 379
                w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[currentLanguage].delimiters.thousands);
            }                                                                                                       // 381
                                                                                                                    // 382
            if (format.indexOf('.') === 0) {                                                                        // 383
                w = '';                                                                                             // 384
            }                                                                                                       // 385
                                                                                                                    // 386
            return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((ord) ? ord : '') + ((abbr) ? abbr : '') + ((bytes) ? bytes : '') + ((negP && neg) ? ')' : '');
        }                                                                                                           // 388
    }                                                                                                               // 389
                                                                                                                    // 390
    /************************************                                                                           // 391
        Top Level Functions                                                                                         // 392
    ************************************/                                                                           // 393
                                                                                                                    // 394
    numeral = function(input) {                                                                                     // 395
        if (numeral.isNumeral(input)) {                                                                             // 396
            input = input.value();                                                                                  // 397
        } else if (input === 0 || typeof input === 'undefined') {                                                   // 398
            input = 0;                                                                                              // 399
        } else if (!Number(input)) {                                                                                // 400
            input = numeral.fn.unformat(input);                                                                     // 401
        }                                                                                                           // 402
                                                                                                                    // 403
        return new Numeral(Number(input));                                                                          // 404
    };                                                                                                              // 405
                                                                                                                    // 406
    // version number                                                                                               // 407
    numeral.version = VERSION;                                                                                      // 408
                                                                                                                    // 409
    // compare numeral object                                                                                       // 410
    numeral.isNumeral = function(obj) {                                                                             // 411
        return obj instanceof Numeral;                                                                              // 412
    };                                                                                                              // 413
                                                                                                                    // 414
    // This function will load languages and then set the global language.  If                                      // 415
    // no arguments are passed in, it will simply return the current global                                         // 416
    // language key.                                                                                                // 417
    numeral.language = function(key, values) {                                                                      // 418
        if (!key) {                                                                                                 // 419
            return currentLanguage;                                                                                 // 420
        }                                                                                                           // 421
                                                                                                                    // 422
        key = key.toLowerCase();                                                                                    // 423
                                                                                                                    // 424
        if (key && !values) {                                                                                       // 425
            if (!languages[key]) {                                                                                  // 426
                throw new Error('Unknown language : ' + key);                                                       // 427
            }                                                                                                       // 428
            currentLanguage = key;                                                                                  // 429
        }                                                                                                           // 430
                                                                                                                    // 431
        if (values || !languages[key]) {                                                                            // 432
            loadLanguage(key, values);                                                                              // 433
        }                                                                                                           // 434
                                                                                                                    // 435
        return numeral;                                                                                             // 436
    };                                                                                                              // 437
                                                                                                                    // 438
    // This function provides access to the loaded language data.  If                                               // 439
    // no arguments are passed in, it will simply return the current                                                // 440
    // global language object.                                                                                      // 441
    numeral.languageData = function(key) {                                                                          // 442
        if (!key) {                                                                                                 // 443
            return languages[currentLanguage];                                                                      // 444
        }                                                                                                           // 445
                                                                                                                    // 446
        if (!languages[key]) {                                                                                      // 447
            throw new Error('Unknown language : ' + key);                                                           // 448
        }                                                                                                           // 449
                                                                                                                    // 450
        return languages[key];                                                                                      // 451
    };                                                                                                              // 452
                                                                                                                    // 453
    numeral.language('en', {                                                                                        // 454
        delimiters: {                                                                                               // 455
            thousands: ',',                                                                                         // 456
            decimal: '.'                                                                                            // 457
        },                                                                                                          // 458
        abbreviations: {                                                                                            // 459
            thousand: 'k',                                                                                          // 460
            million: 'm',                                                                                           // 461
            billion: 'b',                                                                                           // 462
            trillion: 't'                                                                                           // 463
        },                                                                                                          // 464
        ordinal: function(number) {                                                                                 // 465
            var b = number % 10;                                                                                    // 466
            return (~~(number % 100 / 10) === 1) ? 'th' :                                                           // 467
                (b === 1) ? 'st' :                                                                                  // 468
                (b === 2) ? 'nd' :                                                                                  // 469
                (b === 3) ? 'rd' : 'th';                                                                            // 470
        },                                                                                                          // 471
        currency: {                                                                                                 // 472
            symbol: '$'                                                                                             // 473
        }                                                                                                           // 474
    });                                                                                                             // 475
                                                                                                                    // 476
    numeral.zeroFormat = function(format) {                                                                         // 477
        zeroFormat = typeof(format) === 'string' ? format : null;                                                   // 478
    };                                                                                                              // 479
                                                                                                                    // 480
    numeral.defaultFormat = function(format) {                                                                      // 481
        defaultFormat = typeof(format) === 'string' ? format : '0.0';                                               // 482
    };                                                                                                              // 483
                                                                                                                    // 484
    numeral.validate = function(val, culture) {                                                                     // 485
                                                                                                                    // 486
        var _decimalSep,                                                                                            // 487
            _thousandSep,                                                                                           // 488
            _currSymbol,                                                                                            // 489
            _valArray,                                                                                              // 490
            _abbrObj,                                                                                               // 491
            _thousandRegEx,                                                                                         // 492
            languageData,                                                                                           // 493
            temp;                                                                                                   // 494
                                                                                                                    // 495
        //coerce val to string                                                                                      // 496
        if (typeof val !== 'string') {                                                                              // 497
            val += '';                                                                                              // 498
            if (console.warn) {                                                                                     // 499
                console.warn('Numeral.js: Value is not string. It has been co-erced to: ', val);                    // 500
            }                                                                                                       // 501
        }                                                                                                           // 502
                                                                                                                    // 503
        //trim whitespaces from either sides                                                                        // 504
        val = val.trim();                                                                                           // 505
                                                                                                                    // 506
        //if val is just digits return true                                                                         // 507
        if ( !! val.match(/^\d+$/)) {                                                                               // 508
            return true;                                                                                            // 509
        }                                                                                                           // 510
                                                                                                                    // 511
        //if val is empty return false                                                                              // 512
        if (val === '') {                                                                                           // 513
            return false;                                                                                           // 514
        }                                                                                                           // 515
                                                                                                                    // 516
        //get the decimal and thousands separator from numeral.languageData                                         // 517
        try {                                                                                                       // 518
            //check if the culture is understood by numeral. if not, default it to current language                 // 519
            languageData = numeral.languageData(culture);                                                           // 520
        } catch (e) {                                                                                               // 521
            languageData = numeral.languageData(numeral.language());                                                // 522
        }                                                                                                           // 523
                                                                                                                    // 524
        //setup the delimiters and currency symbol based on culture/language                                        // 525
        _currSymbol = languageData.currency.symbol;                                                                 // 526
        _abbrObj = languageData.abbreviations;                                                                      // 527
        _decimalSep = languageData.delimiters.decimal;                                                              // 528
        if (languageData.delimiters.thousands === '.') {                                                            // 529
            _thousandSep = '\\.';                                                                                   // 530
        } else {                                                                                                    // 531
            _thousandSep = languageData.delimiters.thousands;                                                       // 532
        }                                                                                                           // 533
                                                                                                                    // 534
        // validating currency symbol                                                                               // 535
        temp = val.match(/^[^\d]+/);                                                                                // 536
        if (temp !== null) {                                                                                        // 537
            val = val.substr(1);                                                                                    // 538
            if (temp[0] !== _currSymbol) {                                                                          // 539
                return false;                                                                                       // 540
            }                                                                                                       // 541
        }                                                                                                           // 542
                                                                                                                    // 543
        //validating abbreviation symbol                                                                            // 544
        temp = val.match(/[^\d]+$/);                                                                                // 545
        if (temp !== null) {                                                                                        // 546
            val = val.slice(0, -1);                                                                                 // 547
            if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
                return false;                                                                                       // 549
            }                                                                                                       // 550
        }                                                                                                           // 551
                                                                                                                    // 552
        _thousandRegEx = new RegExp(_thousandSep + '{2}');                                                          // 553
                                                                                                                    // 554
        if (!val.match(/[^\d.,]/g)) {                                                                               // 555
            _valArray = val.split(_decimalSep);                                                                     // 556
            if (_valArray.length > 2) {                                                                             // 557
                return false;                                                                                       // 558
            } else {                                                                                                // 559
                if (_valArray.length < 2) {                                                                         // 560
                    return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx));            // 561
                } else {                                                                                            // 562
                    if (_valArray[0].length === 1) {                                                                // 563
                        return ( !! _valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
                    } else {                                                                                        // 565
                        return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
                    }                                                                                               // 567
                }                                                                                                   // 568
            }                                                                                                       // 569
        }                                                                                                           // 570
                                                                                                                    // 571
        return false;                                                                                               // 572
    };                                                                                                              // 573
                                                                                                                    // 574
    /************************************                                                                           // 575
        Helpers                                                                                                     // 576
    ************************************/                                                                           // 577
                                                                                                                    // 578
    function loadLanguage(key, values) {                                                                            // 579
        languages[key] = values;                                                                                    // 580
    }                                                                                                               // 581
                                                                                                                    // 582
    /************************************                                                                           // 583
        Floating-point helpers                                                                                      // 584
    ************************************/                                                                           // 585
                                                                                                                    // 586
    // The floating-point helper functions and implementation                                                       // 587
    // borrows heavily from sinful.js: http://guipn.github.io/sinful.js/                                            // 588
                                                                                                                    // 589
    /**                                                                                                             // 590
     * Array.prototype.reduce for browsers that don't support it                                                    // 591
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Compatibility  // 592
     */                                                                                                             // 593
    if ('function' !== typeof Array.prototype.reduce) {                                                             // 594
        Array.prototype.reduce = function(callback, opt_initialValue) {                                             // 595
            'use strict';                                                                                           // 596
                                                                                                                    // 597
            if (null === this || 'undefined' === typeof this) {                                                     // 598
                // At the moment all modern browsers, that support strict mode, have                                // 599
                // native implementation of Array.prototype.reduce. For instance, IE8                               // 600
                // does not support strict mode, so this check is actually useless.                                 // 601
                throw new TypeError('Array.prototype.reduce called on null or undefined');                          // 602
            }                                                                                                       // 603
                                                                                                                    // 604
            if ('function' !== typeof callback) {                                                                   // 605
                throw new TypeError(callback + ' is not a function');                                               // 606
            }                                                                                                       // 607
                                                                                                                    // 608
            var index,                                                                                              // 609
                value,                                                                                              // 610
                length = this.length >>> 0,                                                                         // 611
                isValueSet = false;                                                                                 // 612
                                                                                                                    // 613
            if (1 < arguments.length) {                                                                             // 614
                value = opt_initialValue;                                                                           // 615
                isValueSet = true;                                                                                  // 616
            }                                                                                                       // 617
                                                                                                                    // 618
            for (index = 0; length > index; ++index) {                                                              // 619
                if (this.hasOwnProperty(index)) {                                                                   // 620
                    if (isValueSet) {                                                                               // 621
                        value = callback(value, this[index], index, this);                                          // 622
                    } else {                                                                                        // 623
                        value = this[index];                                                                        // 624
                        isValueSet = true;                                                                          // 625
                    }                                                                                               // 626
                }                                                                                                   // 627
            }                                                                                                       // 628
                                                                                                                    // 629
            if (!isValueSet) {                                                                                      // 630
                throw new TypeError('Reduce of empty array with no initial value');                                 // 631
            }                                                                                                       // 632
                                                                                                                    // 633
            return value;                                                                                           // 634
        };                                                                                                          // 635
    }                                                                                                               // 636
                                                                                                                    // 637
                                                                                                                    // 638
    /**                                                                                                             // 639
     * Computes the multiplier necessary to make x >= 1,                                                            // 640
     * effectively eliminating miscalculations caused by                                                            // 641
     * finite precision.                                                                                            // 642
     */                                                                                                             // 643
    function multiplier(x) {                                                                                        // 644
        var parts = x.toString().split('.');                                                                        // 645
        if (parts.length < 2) {                                                                                     // 646
            return 1;                                                                                               // 647
        }                                                                                                           // 648
        return Math.pow(10, parts[1].length);                                                                       // 649
    }                                                                                                               // 650
                                                                                                                    // 651
    /**                                                                                                             // 652
     * Given a variable number of arguments, returns the maximum                                                    // 653
     * multiplier that must be used to normalize an operation involving                                             // 654
     * all of them.                                                                                                 // 655
     */                                                                                                             // 656
    function correctionFactor() {                                                                                   // 657
        var args = Array.prototype.slice.call(arguments);                                                           // 658
        return args.reduce(function(prev, next) {                                                                   // 659
            var mp = multiplier(prev),                                                                              // 660
                mn = multiplier(next);                                                                              // 661
            return mp > mn ? mp : mn;                                                                               // 662
        }, -Infinity);                                                                                              // 663
    }                                                                                                               // 664
                                                                                                                    // 665
                                                                                                                    // 666
    /************************************                                                                           // 667
        Numeral Prototype                                                                                           // 668
    ************************************/                                                                           // 669
                                                                                                                    // 670
                                                                                                                    // 671
    numeral.fn = Numeral.prototype = {                                                                              // 672
                                                                                                                    // 673
        clone: function() {                                                                                         // 674
            return numeral(this);                                                                                   // 675
        },                                                                                                          // 676
                                                                                                                    // 677
        format: function(inputString, roundingFunction) {                                                           // 678
            return formatNumeral(this,                                                                              // 679
                inputString ? inputString : defaultFormat, (roundingFunction !== undefined) ? roundingFunction : Math.round
            );                                                                                                      // 681
        },                                                                                                          // 682
                                                                                                                    // 683
        unformat: function(inputString) {                                                                           // 684
            if (Object.prototype.toString.call(inputString) === '[object Number]') {                                // 685
                return inputString;                                                                                 // 686
            }                                                                                                       // 687
            return unformatNumeral(this, inputString ? inputString : defaultFormat);                                // 688
        },                                                                                                          // 689
                                                                                                                    // 690
        value: function() {                                                                                         // 691
            return this._value;                                                                                     // 692
        },                                                                                                          // 693
                                                                                                                    // 694
        valueOf: function() {                                                                                       // 695
            return this._value;                                                                                     // 696
        },                                                                                                          // 697
                                                                                                                    // 698
        set: function(value) {                                                                                      // 699
            this._value = Number(value);                                                                            // 700
            return this;                                                                                            // 701
        },                                                                                                          // 702
                                                                                                                    // 703
        add: function(value) {                                                                                      // 704
            var corrFactor = correctionFactor.call(null, this._value, value);                                       // 705
                                                                                                                    // 706
            function cback(accum, curr, currI, O) {                                                                 // 707
                return accum + corrFactor * curr;                                                                   // 708
            }                                                                                                       // 709
            this._value = [this._value, value].reduce(cback, 0) / corrFactor;                                       // 710
            return this;                                                                                            // 711
        },                                                                                                          // 712
                                                                                                                    // 713
        subtract: function(value) {                                                                                 // 714
            var corrFactor = correctionFactor.call(null, this._value, value);                                       // 715
                                                                                                                    // 716
            function cback(accum, curr, currI, O) {                                                                 // 717
                return accum - corrFactor * curr;                                                                   // 718
            }                                                                                                       // 719
            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;                             // 720
            return this;                                                                                            // 721
        },                                                                                                          // 722
                                                                                                                    // 723
        multiply: function(value) {                                                                                 // 724
            function cback(accum, curr, currI, O) {                                                                 // 725
                var corrFactor = correctionFactor(accum, curr);                                                     // 726
                return (accum * corrFactor) * (curr * corrFactor) /                                                 // 727
                    (corrFactor * corrFactor);                                                                      // 728
            }                                                                                                       // 729
            this._value = [this._value, value].reduce(cback, 1);                                                    // 730
            return this;                                                                                            // 731
        },                                                                                                          // 732
                                                                                                                    // 733
        divide: function(value) {                                                                                   // 734
            function cback(accum, curr, currI, O) {                                                                 // 735
                var corrFactor = correctionFactor(accum, curr);                                                     // 736
                return (accum * corrFactor) / (curr * corrFactor);                                                  // 737
            }                                                                                                       // 738
            this._value = [this._value, value].reduce(cback);                                                       // 739
            return this;                                                                                            // 740
        },                                                                                                          // 741
                                                                                                                    // 742
        difference: function(value) {                                                                               // 743
            return Math.abs(numeral(this._value).subtract(value).value());                                          // 744
        }                                                                                                           // 745
                                                                                                                    // 746
    };                                                                                                              // 747
                                                                                                                    // 748
    /************************************                                                                           // 749
        Exposing Numeral                                                                                            // 750
    ************************************/                                                                           // 751
                                                                                                                    // 752
    // CommonJS module is defined                                                                                   // 753
    if (hasModule) {                                                                                                // 754
        module.exports = numeral;                                                                                   // 755
    }                                                                                                               // 756
                                                                                                                    // 757
    /*global ender:false */                                                                                         // 758
    if (typeof ender === 'undefined') {                                                                             // 759
        // here, `this` means `window` in the browser, or `global` on the server                                    // 760
        // add `numeral` as a global object via a string identifier,                                                // 761
        // for Closure Compiler 'advanced' mode                                                                     // 762
        this['numeral'] = numeral;                                                                                  // 763
    }                                                                                                               // 764
                                                                                                                    // 765
    /*global define:false */                                                                                        // 766
    if (typeof define === 'function' && define.amd) {                                                               // 767
        define([], function() {                                                                                     // 768
            return numeral;                                                                                         // 769
        });                                                                                                         // 770
    }                                                                                                               // 771
}).call(this);                                                                                                      // 772
                                                                                                                    // 773
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/numeral:numeral/min/languages.min.js                                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/*!                                                                                                                 // 1
 * numeral.js language configuration                                                                                // 2
 * language : belgium-dutch (be-nl)                                                                                 // 3
 * author : Dieter Luypaert : https://github.com/moeriki                                                            // 4
 */                                                                                                                 // 5
!function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:" mln",billion:" mld",trillion:" bln"},ordinal:function(a){var b=a%100;return 0!==a&&1>=b||8===b||b>=20?"ste":"de"},currency:{symbol:"€ "}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("be-nl",a)}(),/*! 
 * numeral.js language configuration                                                                                // 7
 * language : simplified chinese                                                                                    // 8
 * author : badplum : https://github.com/badplum                                                                    // 9
 */                                                                                                                 // 10
function(){var a={delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"千",million:"百万",billion:"十亿",trillion:"兆"},ordinal:function(){return"."},currency:{symbol:"¥"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("chs",a)}(),/*!
 * numeral.js language configuration                                                                                // 12
 * language : czech (cs)                                                                                            // 13
 * author : Anatoli Papirovski : https://github.com/apapirovski                                                     // 14
 */                                                                                                                 // 15
function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"tis.",million:"mil.",billion:"b",trillion:"t"},ordinal:function(){return"."},currency:{symbol:"Kč"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("cs",a)}(),/*! 
 * numeral.js language configuration                                                                                // 17
 * language : danish denmark (dk)                                                                                   // 18
 * author : Michael Storgaard : https://github.com/mstorgaard                                                       // 19
 */                                                                                                                 // 20
function(){var a={delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"k",million:"mio",billion:"mia",trillion:"b"},ordinal:function(){return"."},currency:{symbol:"DKK"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("da-dk",a)}(),/*! 
 * numeral.js language configuration                                                                                // 22
 * language : German in Switzerland (de-ch)                                                                         // 23
 * author : Michael Piefel : https://github.com/piefel (based on work from Marco Krage : https://github.com/sinky)  // 24
 */                                                                                                                 // 25
function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(){return"."},currency:{symbol:"CHF"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("de-ch",a)}(),/*! 
 * numeral.js language configuration                                                                                // 27
 * language : German (de) – generally useful in Germany, Austria, Luxembourg, Belgium                               // 28
 * author : Marco Krage : https://github.com/sinky                                                                  // 29
 */                                                                                                                 // 30
function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(){return"."},currency:{symbol:"€"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("de",a)}(),/*! 
 * numeral.js language configuration                                                                                // 32
 * language : english united kingdom (uk)                                                                           // 33
 * author : Dan Ristic : https://github.com/dristic                                                                 // 34
 */                                                                                                                 // 35
function(){var a={delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(a){var b=a%10;return 1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th"},currency:{symbol:"£"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("en-gb",a)}(),/*! 
 * numeral.js language configuration                                                                                // 37
 * language : spanish Spain                                                                                         // 38
 * author : Hernan Garcia : https://github.com/hgarcia                                                              // 39
 */                                                                                                                 // 40
function(){var a={delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"k",million:"mm",billion:"b",trillion:"t"},ordinal:function(a){var b=a%10;return 1===b||3===b?"er":2===b?"do":7===b||0===b?"mo":8===b?"vo":9===b?"no":"to"},currency:{symbol:"€"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("es",a)}(),/*! 
 * numeral.js language configuration                                                                                // 42
 * language : spanish                                                                                               // 43
 * author : Hernan Garcia : https://github.com/hgarcia                                                              // 44
 */                                                                                                                 // 45
function(){var a={delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"k",million:"mm",billion:"b",trillion:"t"},ordinal:function(a){var b=a%10;return 1===b||3===b?"er":2===b?"do":7===b||0===b?"mo":8===b?"vo":9===b?"no":"to"},currency:{symbol:"$"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("es",a)}(),/*! 
 * numeral.js language configuration                                                                                // 47
 * language : Estonian                                                                                              // 48
 * author : Illimar Tambek : https://github.com/ragulka                                                             // 49
 *                                                                                                                  // 50
 * Note: in Estonian, abbreviations are always separated                                                            // 51
 * from numbers with a space                                                                                        // 52
 */                                                                                                                 // 53
function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:" tuh",million:" mln",billion:" mld",trillion:" trl"},ordinal:function(){return"."},currency:{symbol:"€"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("et",a)}(),/*! 
 * numeral.js language configuration                                                                                // 55
 * language : Finnish                                                                                               // 56
 * author : Sami Saada : https://github.com/samitheberber                                                           // 57
 */                                                                                                                 // 58
function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"M",billion:"G",trillion:"T"},ordinal:function(){return"."},currency:{symbol:"€"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("fi",a)}(),/*!
 * numeral.js language configuration                                                                                // 60
 * language : french (Canada) (fr-CA)                                                                               // 61
 * author : Léo Renaud-Allaire : https://github.com/renaudleo                                                       // 62
 */                                                                                                                 // 63
function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"M",billion:"G",trillion:"T"},ordinal:function(a){return 1===a?"er":"e"},currency:{symbol:"$"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("fr-CA",a)}(),/*! 
 * numeral.js language configuration                                                                                // 65
 * language : french (fr-ch)                                                                                        // 66
 * author : Adam Draper : https://github.com/adamwdraper                                                            // 67
 */                                                                                                                 // 68
function(){var a={delimiters:{thousands:"'",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(a){return 1===a?"er":"e"},currency:{symbol:"CHF"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("fr-ch",a)}(),/*! 
 * numeral.js language configuration                                                                                // 70
 * language : french (fr)                                                                                           // 71
 * author : Adam Draper : https://github.com/adamwdraper                                                            // 72
 */                                                                                                                 // 73
function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(a){return 1===a?"er":"e"},currency:{symbol:"€"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("fr",a)}(),/*!
 * numeral.js language configuration                                                                                // 75
 * language : Hungarian (hu)                                                                                        // 76
 * author : Peter Bakondy : https://github.com/pbakondy                                                             // 77
 */                                                                                                                 // 78
function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"E",million:"M",billion:"Mrd",trillion:"T"},ordinal:function(){return"."},currency:{symbol:" Ft"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("hu",a)}(),/*! 
 * numeral.js language configuration                                                                                // 80
 * language : italian Italy (it)                                                                                    // 81
 * author : Giacomo Trombi : http://cinquepunti.it                                                                  // 82
 */                                                                                                                 // 83
function(){var a={delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"mila",million:"mil",billion:"b",trillion:"t"},ordinal:function(){return"º"},currency:{symbol:"€"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("it",a)}(),/*! 
 * numeral.js language configuration                                                                                // 85
 * language : japanese                                                                                              // 86
 * author : teppeis : https://github.com/teppeis                                                                    // 87
 */                                                                                                                 // 88
function(){var a={delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"千",million:"百万",billion:"十億",trillion:"兆"},ordinal:function(){return"."},currency:{symbol:"¥"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("ja",a)}(),/*!
 * numeral.js language configuration                                                                                // 90
 * language : Latvian (lv)                                                                                          // 91
 * author : Lauris Bukšis-Haberkorns : https://github.com/Lafriks                                                   // 92
 */                                                                                                                 // 93
function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:" tūkst.",million:" milj.",billion:" mljrd.",trillion:" trilj."},ordinal:function(){return"."},currency:{symbol:"€"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("lv",a)}(),/*! 
 * numeral.js language configuration                                                                                // 95
 * language : netherlands-dutch (nl-nl)                                                                             // 96
 * author : Dave Clayton : https://github.com/davedx                                                                // 97
 */                                                                                                                 // 98
function(){var a={delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"k",million:"mln",billion:"mrd",trillion:"bln"},ordinal:function(a){var b=a%100;return 0!==a&&1>=b||8===b||b>=20?"ste":"de"},currency:{symbol:"€ "}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("nl-nl",a)}(),/*! 
 * numeral.js language configuration                                                                                // 100
 * language : polish (pl)                                                                                           // 101
 * author : Dominik Bulaj : https://github.com/dominikbulaj                                                         // 102
 */                                                                                                                 // 103
function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"tys.",million:"mln",billion:"mld",trillion:"bln"},ordinal:function(){return"."},currency:{symbol:"PLN"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("pl",a)}(),/*! 
 * numeral.js language configuration                                                                                // 105
 * language : portuguese brazil (pt-br)                                                                             // 106
 * author : Ramiro Varandas Jr : https://github.com/ramirovjr                                                       // 107
 */                                                                                                                 // 108
function(){var a={delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"mil",million:"milhões",billion:"b",trillion:"t"},ordinal:function(){return"º"},currency:{symbol:"R$"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("pt-br",a)}(),/*! 
 * numeral.js language configuration                                                                                // 110
 * language : portuguese (pt-pt)                                                                                    // 111
 * author : Diogo Resende : https://github.com/dresende                                                             // 112
 */                                                                                                                 // 113
function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(){return"º"},currency:{symbol:"€"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("pt-pt",a)}(),function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"тыс.",million:"млн",billion:"b",trillion:"t"},ordinal:function(){return"."},currency:{symbol:"₴"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("ru-UA",a)}(),/*! 
 * numeral.js language configuration                                                                                // 115
 * language : russian (ru)                                                                                          // 116
 * author : Anatoli Papirovski : https://github.com/apapirovski                                                     // 117
 */                                                                                                                 // 118
function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"тыс.",million:"млн",billion:"b",trillion:"t"},ordinal:function(){return"."},currency:{symbol:"руб."}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("ru",a)}(),/*!
 * numeral.js language configuration                                                                                // 120
 * language : slovak (sk)                                                                                           // 121
 * author : Ahmed Al Hafoudh : http://www.freevision.sk                                                             // 122
 */                                                                                                                 // 123
function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"tis.",million:"mil.",billion:"b",trillion:"t"},ordinal:function(){return"."},currency:{symbol:"€"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("sk",a)}(),/*! 
 * numeral.js language configuration                                                                                // 125
 * language : thai (th)                                                                                             // 126
 * author : Sathit Jittanupat : https://github.com/jojosati                                                         // 127
 */                                                                                                                 // 128
function(){var a={delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"พัน",million:"ล้าน",billion:"พันล้าน",trillion:"ล้านล้าน"},ordinal:function(){return"."},currency:{symbol:"฿"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("th",a)}(),/*! 
 * numeral.js language configuration                                                                                // 130
 * language : turkish (tr)                                                                                          // 131
 * author : Ecmel Ercan : https://github.com/ecmel, Erhan Gundogan : https://github.com/erhangundogan, Burak Yiğit Kaya: https://github.com/BYK
 */                                                                                                                 // 133
function(){var a={1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'üncü",4:"'üncü",100:"'üncü",6:"'ncı",9:"'uncu",10:"'uncu",30:"'uncu",60:"'ıncı",90:"'ıncı"},b={delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"bin",million:"milyon",billion:"milyar",trillion:"trilyon"},ordinal:function(b){if(0===b)return"'ıncı";var c=b%10,d=b%100-c,e=b>=100?100:null;return a[c]||a[d]||a[e]},currency:{symbol:"₺"}};"undefined"!=typeof module&&module.exports&&(module.exports=b),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("tr",b)}(),function(){var a={delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"тис.",million:"млн",billion:"млрд",trillion:"блн"},ordinal:function(){return""},currency:{symbol:"₴"}};"undefined"!=typeof module&&module.exports&&(module.exports=a),"undefined"!=typeof window&&this.numeral&&this.numeral.language&&this.numeral.language("uk-UA",a)}();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/numeral:numeral/meteor/export.js                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
if ( Meteor.isClient ) {                                                                                            // 1
  numeral = window.numeral;                                                                                         // 2
  delete window.numeral;                                                                                            // 3
}                                                                                                                   // 4
                                                                                                                    // 5
if ( Meteor.isServer ) {                                                                                            // 6
  numeral = Npm.require('numeral');                                                                                 // 7
}                                                                                                                   // 8
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['numeral:numeral'] = {
  numeral: numeral
};

})();

//# sourceMappingURL=numeral_numeral.js.map
