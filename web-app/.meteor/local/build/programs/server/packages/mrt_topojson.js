(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var topojson;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/mrt:topojson/meteor-topojson.js                          //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
topojson = Npm.require('topojson');                                  // 1
                                                                     // 2
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:topojson'] = {
  topojson: topojson
};

})();

//# sourceMappingURL=mrt_topojson.js.map
