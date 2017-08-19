(function(){
Template.__checkName("error");
Template["error"] = new Template("Template.error", (function() {
  var view = this;
  return [ HTML.H1(Blaze.View("lookup:message", function() {
    return Spacebars.mustache(view.lookup("message"));
  })), HTML.H2(Blaze.View("lookup:error.status", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("error"), "status"));
  })), HTML.PRE(Blaze.View("lookup:error.stack", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("error"), "stack"));
  })) ];
}));

})();
