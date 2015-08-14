(function(){
Template.body.addContent((function() {
  var view = this;
  return [ "\n  ", Spacebars.include(view.lookupTemplate("indexMeteor")), "\n  " ];
}));
Meteor.startup(Template.body.renderToDocument);

})();
