(function(){
Template.__checkName("indexMeteor");
Template["indexMeteor"] = new Template("Template.indexMeteor", (function() {
  var view = this;
  return [ Spacebars.With(function() {
    return Spacebars.call(view.lookup("Blockchain"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      "class": "container-fluid"
    }, "\n        ", HTML.DIV({
      "class": "row"
    }, "\n          ", HTML.DIV({
      "class": "col-xs-2 stat-holder"
    }, "\n            ", HTML.DIV({
      "class": "big-info bestblock text-info"
    }, "\n              ", HTML.DIV({
      "class": "pull-left icon-full-width"
    }, HTML.I({
      "class": "icon-block"
    })), "\n              ", HTML.DIV({
      "class": "big-details-holder"
    }, HTML.SPAN({
      "class": "small-title"
    }, "best block"), HTML.SPAN({
      "class": "big-details"
    }, Blaze.View("lookup:number", function() {
      return Spacebars.mustache(view.lookup("number"), view.lookup("bestBlock"));
    }))), "\n              ", HTML.DIV({
      "class": "clearfix"
    }), "\n            "), "\n          "), "\n          ", HTML.DIV({
      "class": "col-xs-2 stat-holder"
    }, "\n            ", HTML.DIV({
      "class": "big-info uncleCount text-info"
    }, "\n              ", HTML.DIV({
      "class": "pull-left icon-full-width"
    }, HTML.I({
      "class": "icon-uncle"
    })), "\n              ", HTML.DIV({
      "class": "big-details-holder"
    }, HTML.SPAN({
      "class": "small-title"
    }, "uncles", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.SPAN({
      "class": "small"
    }, "(current / last 50)")), HTML.SPAN({
      "class": "big-details"
    }, Blaze.View("lookup:bestStats.block.uncles.length", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("bestStats"), "block", "uncles", "length"));
    }), "/", Blaze.View("lookup:uncleCount", function() {
      return Spacebars.mustache(view.lookup("uncleCount"));
    }))), "\n              ", HTML.DIV({
      "class": "clearfix"
    }), "\n            "), "\n          "), "\n          ", HTML.DIV({
      "class": "col-xs-2 stat-holder"
    }, "\n            ", HTML.DIV({
      "class": function() {
        return [ "big-info blocktime ", Spacebars.mustache(view.lookup("timeClass"), view.lookup("lastBlock"), true) ];
      }
    }, "\n              ", HTML.DIV({
      "class": "pull-left icon-full-width"
    }, HTML.I({
      "class": "icon-time"
    })), "\n              ", HTML.DIV({
      "class": "big-details-holder"
    }, HTML.SPAN({
      "class": "small-title"
    }, "last block"), HTML.SPAN({
      "class": "big-details"
    }, Blaze.View("lookup:blockTimeFilter", function() {
      return Spacebars.mustache(view.lookup("blockTimeFilter"));
    })), "\n              "), "\n              ", HTML.DIV({
      "class": "clearfix"
    }), "\n            "), "\n          "), "\n          ", HTML.DIV({
      "class": "col-xs-2 stat-holder"
    }, "\n            ", HTML.DIV({
      "class": function() {
        return [ "big-info avgblocktime ", Spacebars.mustache(view.lookup("avgTimeClass"), view.lookup("avgBlockTime")) ];
      }
    }, "\n              ", HTML.DIV({
      "class": "pull-left icon-full-width"
    }, HTML.I({
      "class": "icon-gas"
    })), "\n              ", HTML.DIV({
      "class": "big-details-holder"
    }, HTML.SPAN({
      "class": "small-title"
    }, "avg block time"), HTML.SPAN({
      "class": "big-details"
    }, Blaze.View("lookup:avgTimeFilter", function() {
      return Spacebars.mustache(view.lookup("avgTimeFilter"));
    }))), "\n              ", HTML.DIV({
      "class": "clearfix"
    }), "\n            "), "\n          "), "\n          ", HTML.DIV({
      "class": "col-xs-2 stat-holder"
    }, "\n            ", HTML.DIV({
      "class": "big-info difficulty text-orange"
    }, "\n              ", HTML.DIV({
      "class": "pull-left icon-full-width"
    }, HTML.I({
      "class": "icon-hashrate"
    })), "\n              ", HTML.DIV({
      "class": "big-details-holder"
    }, HTML.SPAN({
      "class": "small-title"
    }, "avg network hashrate"), HTML.SPAN({
      "class": "big-details"
    }, Blaze.View("lookup:networkHashrateFilter", function() {
      return Spacebars.mustache(view.lookup("networkHashrateFilter"), view.lookup("avgHashrate"), false);
    }))), "\n              ", HTML.DIV({
      "class": "clearfix"
    }), "\n            "), "\n          "), "\n          ", HTML.DIV({
      "class": "col-xs-2 stat-holder"
    }, "\n            ", HTML.DIV({
      "class": "big-info difficulty text-danger"
    }, "\n              ", HTML.DIV({
      "class": "pull-left icon-full-width"
    }, HTML.I({
      "class": "icon-difficulty"
    })), "\n              ", HTML.DIV({
      "class": "big-details-holder"
    }, HTML.SPAN({
      "class": "small-title"
    }, "difficulty"), HTML.SPAN({
      "class": "big-details"
    }, HTML.SPAN({
      "class": "small-hash"
    }, Blaze.View("lookup:number", function() {
      return Spacebars.mustache(view.lookup("number"), view.lookup("lastDifficulty"));
    })))), "\n              ", HTML.DIV({
      "class": "clearfix"
    }), "\n            "), "\n          "), "\n\n          ", HTML.DIV({
      "class": "clearfix"
    }), "\n        "), "\n\n        ", HTML.DIV({
      "class": "row"
    }, "\n          ", HTML.DIV({
      style: "padding-top: 0px;",
      "class": "col-xs-8 stats-boxes"
    }, "\n            ", HTML.DIV({
      "class": "row second-row"
    }, "\n              ", HTML.DIV({
      "class": "col-xs-3 stat-holder box"
    }, "\n                ", HTML.DIV({
      "class": function() {
        return [ "active-nodes ", Spacebars.mustache(view.lookup("nodesActiveClass"), view.lookup("nodesActive"), view.lookup("nodesTotal")) ];
      }
    }, HTML.I({
      "class": "icon-node"
    }), HTML.SPAN({
      "class": "small-title"
    }, "active nodes"), HTML.SPAN({
      "class": "small-value"
    }, Blaze.View("lookup:nodesActive", function() {
      return Spacebars.mustache(view.lookup("nodesActive"));
    }), "/", Blaze.View("lookup:nodesTotal", function() {
      return Spacebars.mustache(view.lookup("nodesTotal"));
    }))), "\n              "), "\n              ", HTML.DIV({
      "class": "col-xs-3 stat-holder box"
    }, "\n                ", HTML.DIV({
      "class": "gasprice text-info"
    }, HTML.I({
      "class": "icon-gasprice"
    }), HTML.SPAN({
      "class": "small-title"
    }, "gas price"), HTML.SPAN({
      "class": "small-value"
    }, Blaze.View("lookup:gasPriceFilter", function() {
      return Spacebars.mustache(view.lookup("gasPriceFilter"), Spacebars.dot(view.lookup("bestStats"), "gasPrice", "toString"));
    }))), "\n              "), "\n              ", HTML.DIV({
      "class": "col-xs-3 stat-holder box"
    }, "\n                ", HTML.DIV({
      "class": function() {
        return [ "page-latency ", Spacebars.mustache(view.lookup("latencyClass"), true, view.lookup("latency")) ];
      }
    }, HTML.I({
      "class": "icon-clock"
    }), HTML.SPAN({
      "class": "small-title"
    }, "page latency"), HTML.SPAN({
      "class": "small-value"
    }, Blaze.View("lookup:latency", function() {
      return Spacebars.mustache(view.lookup("latency"));
    }), " ms")), "\n              "), "\n              ", HTML.DIV({
      "class": "col-xs-3 stat-holder box"
    }, "\n                ", HTML.DIV({
      "class": function() {
        return [ "uptime ", Spacebars.mustache(view.lookup("upTimeClass"), view.lookup("upTimeTotal"), true) ];
      }
    }, HTML.I({
      "class": "icon-bulb"
    }), HTML.SPAN({
      "class": "small-title"
    }, "uptime"), HTML.SPAN({
      "class": "small-value"
    }, Blaze.View("lookup:upTimeFilter", function() {
      return Spacebars.mustache(view.lookup("upTimeFilter"), view.lookup("upTimeTotal"));
    }))), "\n              "), "\n            "), "\n            ", HTML.DIV({
      "class": "row"
    }, "\n              ", HTML.DIV({
      "class": "col-xs-3 stat-holder"
    }, "\n                ", HTML.DIV({
      "class": function() {
        return [ "big-info chart ", Spacebars.mustache(view.lookup("avgTimeClass"), view.lookup("avgBlockTime")) ];
      }
    }, HTML.SPAN({
      "class": "small-title"
    }, "block time"), "\n                  ", HTML.getTag("sparkchart")({
      tooltipsuffix: "s",
      "class": "big-details spark-blocktimes"
    }), "\n                "), "\n              "), "\n              ", HTML.DIV({
      "class": "col-xs-3 stat-holder"
    }, "\n                ", HTML.DIV({
      "class": "big-info chart text-info"
    }, HTML.SPAN({
      "class": "small-title"
    }, "difficulty"), "\n                  ", HTML.getTag("sparkchart")({
      "class": "big-details spark-difficulty"
    }), "\n                "), "\n              "), "\n              ", HTML.DIV({
      "class": "col-xs-3 stat-holder xpull-right"
    }, "\n                ", HTML.DIV({
      "class": function() {
        return [ "big-info chart xdouble-chart ", Spacebars.mustache(view.lookup("propagationAvgTimeClass"), view.lookup("blockPropagationAvg"), true) ];
      }
    }, HTML.SPAN({
      "class": "small-title"
    }, "block propagation"), "\n                  ", HTML.getTag("histogram")({
      "class": "big-details d3-blockpropagation"
    }), "\n                "), "\n              "), "\n              ", HTML.DIV({
      "class": "col-xs-3 stat-holder pull-right"
    }, "\n                ", HTML.DIV({
      "class": "big-info chart double-chart"
    }, HTML.SPAN({
      "class": "small-title"
    }, "last blocks miners"), "\n                  ", HTML.DIV({
      "data-toggle": "tooltip",
      "data-placement": "right",
      "data-original-title": function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("miner"), "blocks"));
      },
      "class": "blocks-holder"
    }, "\n                    ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("miners"));
    }, function() {
      return [ "\n                      ", HTML.DIV({
        "class": function() {
          return [ "block-count ", Spacebars.mustache(view.lookup("minerBlocksClass"), view.lookup("blocks"), "text-") ];
        }
      }, Blaze.View("lookup:blocks", function() {
        return Spacebars.mustache(view.lookup("blocks"));
      })), "\n                      ", HTML.DIV({
        "class": "small-title-miner"
      }, Blaze.View("lookup:miner", function() {
        return Spacebars.mustache(view.lookup("miner"));
      })), "\n                      \n                        ", HTML.Comment(' <div class="block {{minerBlockClass ../blocks}}"></div> '), "\n                      \n                      ", HTML.DIV({
        "class": "clearfix"
      }), "\n                    " ];
    }), "\n                  "), "\n                "), "\n              "), "\n              ", HTML.DIV({
      "class": "col-xs-3 stat-holder"
    }, "\n                ", HTML.DIV({
      "class": "big-info chart text-info"
    }, HTML.SPAN({
      "class": "small-title"
    }, "uncle count", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.SPAN({
      "class": "small"
    }, "(25 blocks per bar)")), "\n                  ", HTML.getTag("sparkchart")({
      "class": "big-details spark-uncles"
    }), "\n                "), "\n              "), "\n              ", HTML.DIV({
      "class": "col-xs-3 stat-holder"
    }, "\n                ", HTML.DIV({
      "class": "big-info chart text-info"
    }, HTML.SPAN({
      "class": "small-title"
    }, "transactions"), "\n                  ", HTML.getTag("sparkchart")({
      "class": "big-details spark-transactions"
    }), "\n                "), "\n              "), "\n              ", HTML.DIV({
      "class": "col-xs-3 stat-holder"
    }, "\n                ", HTML.DIV({
      "class": "big-info chart text-info"
    }, HTML.SPAN({
      "class": "small-title"
    }, "gas spending"), "\n                  ", HTML.getTag("sparkchart")({
      "class": "big-details spark-gasspending"
    }), "\n                "), "\n              "), "\n            "), "\n          "), "\n          ", HTML.DIV({
      "class": "col-xs-4 stat-holder map-holder"
    }, "\n            ", HTML.getTag("nodemap")({
      id: "mapHolder"
    }), "\n          "), "\n\n          ", HTML.DIV({
      "class": "col-xs-12 stats-boxes"
    }, "\n            ", HTML.DIV({
      "class": "row second-row"
    }, "\n              ", HTML.DIV({
      "class": "col-xs-12 stat-holder box"
    }, "\n                ", HTML.DIV({
      "class": "active-nodes text-orange"
    }, HTML.I({
      "class": "icon-hashrate"
    }), HTML.SPAN({
      "class": "small-title"
    }, "Block #1028201 hash"), HTML.SPAN({
      "class": "small-value"
    }, Blaze.View("lookup:frontierHash", function() {
      return Spacebars.mustache(view.lookup("frontierHash"));
    }))), "\n              "), "\n            "), "\n          "), "\n\n          ", HTML.DIV({
      "class": "clearfix"
    }), "\n        "), "\n      "), "\n    " ];
  }), "\n\n    ", HTML.DIV({
    style: "padding-top: 10px",
    "class": "row"
  }, "\n      ", HTML.TABLE({
    "class": "table table-striped"
  }, "\n        ", HTML.THEAD("\n          ", HTML.TR({
    "class": "text-info"
  }, "\n            ", HTML.TH({
    "class": "th-nodecheck"
  }, HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Pin nodes to display first",
    "ng-click": "orderTable(['-stats.block.number', 'stats.block.propagation'], false)",
    "class": "icon-check-o"
  })), "\n            ", HTML.TH({
    "class": "th-nodename"
  }, HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Node name",
    "ng-click": "orderTable(['info.name'], false)",
    "class": "icon-node"
  })), "\n            ", HTML.TH({
    "class": "th-nodetype"
  }, HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Node type",
    "ng-click": "orderTable(['info.node'], false)",
    "class": "icon-laptop"
  })), "\n            ", HTML.TH({
    "class": "th-latency"
  }, HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Node latency",
    "ng-click": "orderTable(['stats.latency'], false)",
    "class": "icon-clock"
  })), "\n            ", HTML.TH(HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Is mining",
    "ng-click": "orderTable(['-stats.hashrate'], false)",
    "class": "icon-mining"
  })), "\n            ", HTML.TH(HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Peers",
    "ng-click": "orderTable(['-stats.peers'], false)",
    "class": "icon-group"
  })), "\n            ", HTML.TH(HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Pending transactions",
    "ng-click": "orderTable(['-stats.pending'], false)",
    "class": "icon-network"
  })), "\n            ", HTML.TH(HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Last block",
    "ng-click": "orderTable(['-stats.block.number', 'stats.block.propagation'], false)",
    "class": "icon-block"
  })), "\n            ", HTML.TH({
    "class": "th-blockhash"
  }, HTML.CharRef({
    html: "&nbsp;",
    str: " "
  })), "\n            ", HTML.TH({
    "class": "th-blockhash"
  }, HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Total difficulty",
    "ng-click": "orderTable(['-stats.block.totalDifficulty'], false)",
    "class": "icon-difficulty"
  })), "\n            ", HTML.TH(HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Block transactions",
    "ng-click": "orderTable(['-stats.block.transactions.length'], false)",
    "class": "icon-check-o"
  })), "\n            ", HTML.TH(HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Uncles",
    "ng-click": "orderTable(['-stats.block.uncles.length'], false)",
    "class": "icon-uncle"
  })), "\n            ", HTML.TH({
    "class": "th-blocktime"
  }, HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Last block time",
    "ng-click": "orderTable(['-stats.block.received'], false)",
    "class": "icon-time"
  })), "\n            ", HTML.TH({
    "class": "th-peerPropagationTime"
  }, HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Propagation time",
    "ng-click": "orderTable(['-stats.block.number', 'stats.block.propagation'], false)",
    "class": "icon-gas"
  })), "\n            ", HTML.TH({
    "class": "th-peerPropagationChart"
  }), "\n            ", HTML.TH({
    "class": "th-peerPropagationAvg"
  }, HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Average propagation time",
    "ng-click": "orderTable(['stats.propagationAvg'], false)",
    "class": "icon-gas"
  })), "\n            ", HTML.TH(HTML.I({
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Up-time",
    "ng-click": "orderTable(['-stats.uptime'], false)",
    "class": "icon-bulb"
  })), "\n          "), "\n        "), "\n        ", HTML.TBODY("\n          ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("nodes"));
  }, function() {
    return [ "\n            ", HTML.TR({
      "class": function() {
        return Spacebars.mustache(view.lookup("mainClass"), view.lookup("stats"), Spacebars.dot(view.lookup("Blockchain"), "bestBlock"));
      },
      id: function() {
        return [ "node_", Spacebars.mustache(view.lookup("id")) ];
      }
    }, "\n              ", HTML.TD({
      "class": "td-nodecheck"
    }, HTML.I({
      "ng-click": "pinNode(id)",
      "data-toggle": "tooltip",
      "data-placement": "right",
      "data-original-title": function() {
        return [ "Click to ", Blaze.If(function() {
          return Spacebars.call(view.lookup("pinned"));
        }, function() {
          return "'un'";
        }, function() {
          return "''";
        }), "pin" ];
      },
      "class": function() {
        return Spacebars.mustache(view.lookup("nodePinClass"), view.lookup("pinned"));
      }
    })), "\n              ", HTML.TD({
      rel: function() {
        return Spacebars.mustache(view.lookup("id"));
      },
      "class": "nodeInfo"
    }, HTML.SPAN({
      "data-toggle": "tooltip",
      "data-placement": "top",
      "data-html": "true",
      "data-original-title": function() {
        return Spacebars.mustache(view.lookup("geoTooltip"), view.lookup("."));
      },
      "class": "small"
    }, Blaze.View("lookup:info.name", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("info"), "name"));
    })), HTML.SPAN({
      "class": "small"
    }, HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), "(", Blaze.View("lookup:info.ip", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("info"), "ip"));
    }), ")"), HTML.A({
      href: "https://github.com/ethereum/wiki/wiki/Network-Status#updating",
      target: "_blank",
      "data-toggle": "tooltip",
      "data-placement": "top",
      "data-html": "true",
      "data-original-title": [ "Netstats client needs update.", HTML.CharRef({
        html: "&lt;",
        str: "<"
      }), "br", HTML.CharRef({
        html: "&gt;",
        str: ">"
      }), "Click this icon for instructions." ],
      "class": function() {
        return [ "small ", Spacebars.mustache(view.lookup("nodeClientClass"), view.lookup("info"), Spacebars.dot(view.lookup("Blockchain"), "currentApiVersion")) ];
      }
    }, HTML.I({
      "class": "icon-warning-o"
    }))), "\n              ", HTML.TD("\n                ", HTML.DIV({
      "class": "small"
    }, Blaze.View("lookup:nodeVersion", function() {
      return Spacebars.mustache(view.lookup("nodeVersion"), Spacebars.dot(view.lookup("info"), "node"));
    })), "\n              "), "\n              ", HTML.TD({
      "class": function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("readable"), "latencyClass"));
      }
    }, HTML.SPAN({
      "class": "small"
    }, Blaze.View("lookup:readable.latency", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("readable"), "latency"));
    }))), "\n              ", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("hashrateClass"), Spacebars.dot(view.lookup("stats"), "mining"), Spacebars.dot(view.lookup("stats"), "active"));
      }
    }, Blaze.View("lookup:hashrateFilter", function() {
      return Spacebars.mustache(view.lookup("hashrateFilter"), Spacebars.dot(view.lookup("stats"), "hashrate"), Spacebars.dot(view.lookup("stats"), "mining"));
    })), "\n              ", HTML.TD({
      style: "padding-left: 11px;",
      "class": function() {
        return Spacebars.mustache(view.lookup("peerClass"), Spacebars.dot(view.lookup("stats"), "peers"), Spacebars.dot(view.lookup("stats"), "active"));
      }
    }, Blaze.View("lookup:stats.peers", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("stats"), "peers"));
    })), "\n              ", HTML.TD({
      style: "padding-left: 15px;"
    }, Blaze.View("lookup:stats.pending", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("stats"), "pending"));
    })), "\n              ", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("blockClass"), view.lookup("stats"), Spacebars.dot(view.lookup("Blockchain"), "bestBlock"));
      }
    }, HTML.SPAN({
      "class": function() {
        return Blaze.If(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("readable"), "forkMessage"));
        }, function() {
          return [ " ", Blaze.View("lookup:readable.forkClass", function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("readable"), "forkClass"));
          }), " " ];
        }, function() {
          return " '' ";
        });
      }
    }, Blaze.View("lookup:number", function() {
      return Spacebars.mustache(view.lookup("number"), Spacebars.dot(view.lookup("stats"), "block", "number"));
    })), "\n              "), "\n              ", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("blockClass"), view.lookup("stats"), Spacebars.dot(view.lookup("Blockchain"), "bestBlock"));
      }
    }, HTML.SPAN({
      "class": "small"
    }, Blaze.View("lookup:hashFilter", function() {
      return Spacebars.mustache(view.lookup("hashFilter"), Spacebars.dot(view.lookup("stats"), "block", "hash"));
    }))), "\n              ", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("blockClass"), view.lookup("stats"), Spacebars.dot(view.lookup("Blockchain"), "bestBlock"));
      }
    }, HTML.SPAN({
      "class": "small"
    }, Blaze.View("lookup:number", function() {
      return Spacebars.mustache(view.lookup("number"), Spacebars.dot(view.lookup("stats"), "block", "totalDifficulty"));
    }))), "\n              ", HTML.TD({
      style: "padding-left: 14px;"
    }, Blaze.View("lookup:stats.block.transactions.length", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("stats"), "block", "transactions", "length"));
    })), "\n              ", HTML.TD({
      style: "padding-left: 14px;"
    }, Blaze.View("lookup:stats.block.uncles.length", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("stats"), "block", "uncles", "length"));
    })), "\n              ", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("timeClass"), Spacebars.dot(view.lookup("stats"), "block", "received"), Spacebars.dot(view.lookup("stats"), "active"));
      }
    }, Blaze.View("lookup:blockTimeFilter", function() {
      return Spacebars.mustache(view.lookup("blockTimeFilter"), Spacebars.dot(view.lookup("stats"), "block", "received"));
    })), "\n              ", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("propagationTimeClass"), view.lookup("stats"), Spacebars.dot(view.lookup("Blockchain"), "bestBlock"));
      }
    }, "\n                ", HTML.DIV({
      "class": "propagationBox"
    }), HTML.SPAN(Blaze.View("lookup:blockPropagationFilter", function() {
      return Spacebars.mustache(view.lookup("blockPropagationFilter"), Spacebars.dot(view.lookup("stats"), "block", "propagation"), false);
    })), "\n              "), "\n              ", HTML.TD({
      "class": function() {
        return [ "peerPropagationChart ", Spacebars.mustache(view.lookup("id")) ];
      }
    }, "\n              "), "\n              ", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("propagationNodeAvgTimeClass"), view.lookup("stats"), Spacebars.dot(view.lookup("Blockchain"), "bestBlock"));
      }
    }, Blaze.View("lookup:blockPropagationAvgFilter", function() {
      return Spacebars.mustache(view.lookup("blockPropagationAvgFilter"), view.lookup("stats"), Spacebars.dot(view.lookup("Blockchain"), "bestBlock"));
    })), "\n              ", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("upTimeClass"), Spacebars.dot(view.lookup("stats"), "uptime"), Spacebars.dot(view.lookup("stats"), "active"));
      }
    }, Blaze.View("lookup:upTimeFilter", function() {
      return Spacebars.mustache(view.lookup("upTimeFilter"), Spacebars.dot(view.lookup("stats"), "uptime"));
    })), "\n            "), "\n          " ];
  }), "\n        "), "\n      "), "\n    ") ];
}));

})();
