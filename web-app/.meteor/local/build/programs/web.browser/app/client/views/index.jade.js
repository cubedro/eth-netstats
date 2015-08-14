(function(){
Template.__checkName("index");
Template["index"] = new Template("Template.index", (function() {
  var view = this;
  return HTML.DIV({
    "class": "container-fluid",
    "ng-controller": "StatsCtrl"
  }, HTML.DIV({
    "class": "row"
  }, HTML.DIV({
    "class": [ "col-xs-2", " ", "stat-holder" ]
  }, HTML.DIV({
    "class": [ "big-info", " ", "bestblock", " ", "text-info" ]
  }, HTML.Raw('<div class="pull-left icon-full-width"><i class="icon-block"></i></div>'), "\n", HTML.DIV({
    "class": "big-details-holder"
  }, HTML.Raw('<span class="small-title">best block</span>'), "\n", HTML.SPAN({
    "class": "big-details"
  }, Blaze.View("lookup:number", function() {
    return Spacebars.mustache(view.lookup("number"), Spacebars.dot(view.lookup("Blockchain"), "bestBlock"));
  }))), "\n", HTML.Raw('<div class="clearfix"></div>'))), "\n", HTML.DIV({
    "class": [ "col-xs-2", " ", "stat-holder" ]
  }, HTML.DIV({
    "class": [ "big-info", " ", "uncleCount", " ", "text-info" ]
  }, HTML.Raw('<div class="pull-left icon-full-width"><i class="icon-uncle"></i></div>'), "\n", HTML.DIV({
    "class": "big-details-holder"
  }, HTML.Raw('<span class="small-title">uncles&nbsp;\n<span class="small">(current / last 50)</span></span>'), "\n", HTML.SPAN({
    "class": "big-details"
  }, Blaze.View("lookup:Blockchain.bestStats.block.uncles.length", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("Blockchain"), "bestStats", "block", "uncles", "length"));
  }), "/", Blaze.View("lookup:Blockchain.uncleCount", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("Blockchain"), "uncleCount"));
  }))), "\n", HTML.Raw('<div class="clearfix"></div>'))), "\n", HTML.DIV({
    "class": [ "col-xs-2", " ", "stat-holder" ]
  }, HTML.DIV({
    "class": function() {
      return [ "big-info", " ", "blocktime", " ", Spacebars.mustache(view.lookup("timeClass"), view.lookup("lastBlock"), true) ];
    }
  }, HTML.Raw('<div class="pull-left icon-full-width"><i class="icon-time"></i></div>'), "\n", HTML.DIV({
    "class": "big-details-holder"
  }, HTML.Raw('<span class="small-title">last block</span>'), "\n", HTML.SPAN({
    "class": "big-details"
  }, Blaze.View("lookup:blockTimeFilter", function() {
    return Spacebars.mustache(view.lookup("blockTimeFilter"), Spacebars.dot(view.lookup("Blockchain"), "lastBlock"));
  })), "\n", ""), "\n", HTML.Raw('<div class="clearfix"></div>'))), "\n", HTML.DIV({
    "class": [ "col-xs-2", " ", "stat-holder" ]
  }, HTML.DIV({
    "class": function() {
      return [ "big-info", " ", "avgblocktime", " ", Spacebars.mustache(view.lookup("avgTimeClass"), view.lookup("avgBlockTime")) ];
    }
  }, HTML.Raw('<div class="pull-left icon-full-width"><i class="icon-gas"></i></div>'), "\n", HTML.DIV({
    "class": "big-details-holder"
  }, HTML.Raw('<span class="small-title">avg block time</span>'), "\n", HTML.SPAN({
    "class": "big-details"
  }, Blaze.View("lookup:avgTimeFilter", function() {
    return Spacebars.mustache(view.lookup("avgTimeFilter"), Spacebars.dot(view.lookup("Blockchain"), "avgBlockTime"));
  }))), "\n", HTML.Raw('<div class="clearfix"></div>'))), "\n", HTML.DIV({
    "class": [ "col-xs-2", " ", "stat-holder" ]
  }, HTML.DIV({
    "class": [ "big-info", " ", "difficulty", " ", "text-orange" ]
  }, HTML.Raw('<div class="pull-left icon-full-width"><i class="icon-hashrate"></i></div>'), "\n", HTML.DIV({
    "class": "big-details-holder"
  }, HTML.Raw('<span class="small-title">avg network hashrate</span>'), "\n", HTML.SPAN({
    "class": "big-details"
  }, Blaze.View("lookup:networkHashrateFilter", function() {
    return Spacebars.mustache(view.lookup("networkHashrateFilter"), Spacebars.dot(view.lookup("Blockchain"), "avgHashrate"), false);
  }))), "\n", HTML.Raw('<div class="clearfix"></div>'))), "\n", HTML.DIV({
    "class": [ "col-xs-2", " ", "stat-holder" ]
  }, HTML.DIV({
    "class": [ "big-info", " ", "difficulty", " ", "text-danger" ]
  }, HTML.Raw('<div class="pull-left icon-full-width"><i class="icon-difficulty"></i></div>'), "\n", HTML.DIV({
    "class": "big-details-holder"
  }, HTML.Raw('<span class="small-title">difficulty</span>'), "\n", HTML.SPAN({
    "class": "big-details"
  }, HTML.SPAN({
    "class": "small-hash"
  }, Blaze.View("lookup:number", function() {
    return Spacebars.mustache(view.lookup("number"), Spacebars.dot(view.lookup("Blockchain"), "lastDifficulty"));
  })))), "\n", HTML.Raw('<div class="clearfix"></div>'))), "\n", HTML.Raw('<div class="clearfix"></div>')), "\n", HTML.DIV({
    "class": "row"
  }, HTML.DIV({
    "class": [ "col-xs-8", " ", "stats-boxes" ],
    style: "padding-top: 0px;"
  }, HTML.DIV({
    "class": [ "row", " ", "second-row" ]
  }, HTML.DIV({
    "class": [ "col-xs-3", " ", "stat-holder", " ", "box" ]
  }, HTML.DIV({
    "class": function() {
      return [ "active-nodes", " ", Spacebars.mustache(view.lookup("nodesActiveClass"), Spacebars.dot(view.lookup("Blockchain"), "nodesActive"), Spacebars.dot(view.lookup("Blockchain"), "nodesTotal")) ];
    }
  }, HTML.Raw('<i class="icon-node"></i>'), "\n", HTML.Raw('<span class="small-title">active nodes</span>'), "\n", HTML.SPAN({
    "class": "small-value"
  }, Blaze.View("lookup:Blockchain.nodesActive", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("Blockchain"), "nodesActive"));
  }), "/", Blaze.View("lookup:Blockchain.nodesTotal", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("Blockchain"), "nodesTotal"));
  })))), "\n", "", "\n", "", "\n", "", "\n", "", "\n", "", "\n", HTML.DIV({
    "class": [ "col-xs-3", " ", "stat-holder", " ", "box" ]
  }, HTML.DIV({
    "class": [ "gasprice", " ", "text-info" ]
  }, HTML.Raw('<i class="icon-gasprice"></i>'), "\n", HTML.Raw('<span class="small-title">gas price</span>'), "\n", HTML.SPAN({
    "class": "small-value"
  }, Blaze.View("lookup:gasPriceFilter", function() {
    return Spacebars.mustache(view.lookup("gasPriceFilter"), Spacebars.dot(view.lookup("Blockchain"), "bestStats", "gasPrice", "toString"));
  })))), "\n", HTML.DIV({
    "class": [ "col-xs-3", " ", "stat-holder", " ", "box" ]
  }, HTML.DIV({
    "class": function() {
      return [ "page-latency", " ", Spacebars.mustache(view.lookup("latencyClass"), true, Spacebars.dot(view.lookup("Blockchain"), "latency")) ];
    }
  }, HTML.Raw('<i class="icon-clock"></i>'), "\n", HTML.Raw('<span class="small-title">page latency</span>'), "\n", HTML.SPAN({
    "class": "small-value"
  }, Blaze.View("lookup:Blockchain.latency", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("Blockchain"), "latency"));
  }), " ms"))), "\n", HTML.DIV({
    "class": [ "col-xs-3", " ", "stat-holder", " ", "box" ]
  }, HTML.DIV({
    "class": function() {
      return [ "uptime", " ", Spacebars.mustache(view.lookup("upTimeClass"), view.lookup("upTimeTotal"), true) ];
    }
  }, HTML.Raw('<i class="icon-bulb"></i>'), "\n", HTML.Raw('<span class="small-title">uptime</span>'), "\n", HTML.SPAN({
    "class": "small-value"
  }, Blaze.View("lookup:upTimeFilter", function() {
    return Spacebars.mustache(view.lookup("upTimeFilter"), Spacebars.dot(view.lookup("Blockchain"), "upTimeTotal"));
  }))))), "\n", HTML.DIV({
    "class": "row"
  }, HTML.DIV({
    "class": [ "col-xs-3", " ", "stat-holder" ]
  }, HTML.DIV({
    "class": function() {
      return [ "big-info", " ", "chart", " ", Spacebars.mustache(view.lookup("avgTimeClass"), Spacebars.dot(view.lookup("Blockchain"), "avgBlockTime")) ];
    }
  }, "", "\n", HTML.Raw('<span class="small-title">block time</span>'), "\n", "", "\n", HTML.getTag("sparkchart")({
    "class": [ "big-details", " ", "spark-blocktimes" ],
    data: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("Blockchain"), "lastBlocksTime", "join"));
    },
    tooltipsuffix: "s"
  }))), "\n", HTML.DIV({
    "class": [ "col-xs-3", " ", "stat-holder" ]
  }, HTML.DIV({
    "class": [ "big-info", " ", "chart", " ", "text-info" ]
  }, "", "\n", HTML.Raw('<span class="small-title">difficulty</span>'), "\n", "", "\n", HTML.getTag("sparkchart")({
    "class": [ "big-details", " ", "spark-difficulty" ],
    data: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("Blockchain"), "difficultyChart", "join"));
    }
  }))), "\n", HTML.DIV({
    "class": [ "col-xs-3", " ", "stat-holder", " ", "xpull-right" ]
  }, HTML.DIV({
    "class": function() {
      return [ "big-info", " ", "chart", " ", "xdouble-chart", " ", Spacebars.mustache(view.lookup("propagationAvgTimeClass"), Spacebars.dot(view.lookup("Blockchain"), "blockPropagationAvg"), true) ];
    }
  }, "", "\n", HTML.Raw('<span class="small-title">block propagation</span>'), "\n", "", "\n", HTML.getTag("histogram")({
    "class": [ "big-details", " ", "d3-blockpropagation" ],
    data: "blockPropagationChart"
  }))), "\n", HTML.DIV({
    "class": [ "col-xs-3", " ", "stat-holder", " ", "pull-right" ]
  }, HTML.DIV({
    "class": [ "big-info", " ", "chart", " ", "double-chart" ]
  }, HTML.Raw('<span class="small-title">last blocks miners</span>'), "\n", HTML.DIV({
    "class": "blocks-holder",
    "ng-repeat": "miner in miners track by miner.miner",
    "data-toggle": "tooltip",
    "data-placement": "right",
    "data-original-title": function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("Blockchain"), "miner", "blocks"));
    }
  }, HTML.DIV({
    "class": function() {
      return [ "block-count", " ", Spacebars.mustache(view.lookup("minerBlocksClass"), Spacebars.dot(view.lookup("Blockchain"), "miner", "blocks"), "text-") ];
    }
  }, Blaze.View("lookup:miner.blocks", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("miner"), "blocks"));
  })), "\n", "", "\n", HTML.DIV({
    "class": "small-title-miner"
  }, Blaze.View("lookup:miner.miner", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("miner"), "miner"));
  })), "\n", HTML.getTag("minerblock")({
    blocks: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("Blockchain"), "miner", "blocks"));
    }
  }), "\n", HTML.Raw('<div class="clearfix"></div>')))), "\n", HTML.DIV({
    "class": [ "col-xs-3", " ", "stat-holder" ]
  }, HTML.DIV({
    "class": [ "big-info", " ", "chart", " ", "text-info" ]
  }, "", "\n", HTML.Raw('<span class="small-title">uncle count&nbsp;\n<span class="small">(25 blocks per bar)</span></span>'), "\n", "", "\n", HTML.getTag("sparkchart")({
    "class": [ "big-details", " ", "spark-uncles" ],
    data: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("Blockchain"), "uncleCountChart", "join"));
    }
  }))), "\n", HTML.DIV({
    "class": [ "col-xs-3", " ", "stat-holder" ]
  }, HTML.DIV({
    "class": [ "big-info", " ", "chart", " ", "text-info" ]
  }, "", "\n", HTML.Raw('<span class="small-title">transactions</span>'), "\n", HTML.getTag("sparkchart")({
    "class": [ "big-details", " ", "spark-transactions" ],
    data: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("Blockchain"), "transactionDensity"));
    }
  }))), "\n", HTML.DIV({
    "class": [ "col-xs-3", " ", "stat-holder" ]
  }, HTML.DIV({
    "class": [ "big-info", " ", "chart", " ", "text-info" ]
  }, "", "\n", HTML.Raw('<span class="small-title">gas spending</span>'), "\n", HTML.getTag("sparkchart")({
    "class": [ "big-details", " ", "spark-gasspending" ],
    data: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("Blockchain"), "gasSpending", "join"));
    }
  }))))), "\n", HTML.DIV({
    "class": [ "col-xs-4", " ", "stat-holder", " ", "map-holder" ]
  }, "", "\n", HTML.getTag("nodemap")({
    id: "mapHolder",
    data: "map"
  })), "\n", HTML.DIV({
    "class": [ "col-xs-12", " ", "stats-boxes" ]
  }, HTML.DIV({
    "class": [ "row", " ", "second-row" ]
  }, HTML.DIV({
    "class": [ "col-xs-12", " ", "stat-holder", " ", "box" ]
  }, HTML.DIV({
    "class": [ "active-nodes", " ", "text-orange" ]
  }, HTML.Raw('<i class="icon-hashrate"></i>'), "\n", HTML.Raw('<span class="small-title">Block #1028201 hash</span>'), "\n", HTML.SPAN({
    "class": "small-value"
  }, Blaze.View("lookup:Blockchain.frontierHash", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("Blockchain"), "frontierHash"));
  })))))), "\n", HTML.Raw('<div class="clearfix"></div>')), "\n", HTML.DIV({
    "class": "row",
    style: "padding-top: 10px"
  }, HTML.TABLE({
    "class": [ "table", " ", "table-striped" ]
  }, HTML.THEAD(HTML.TR({
    "class": "text-info"
  }, HTML.TH({
    "class": "th-nodecheck"
  }, HTML.I({
    "class": "icon-check-o",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Pin nodes to display first",
    "ng-click": "orderTable(['-stats.block.number', 'stats.block.propagation'], false)"
  })), "\n", HTML.TH({
    "class": "th-nodename"
  }, HTML.I({
    "class": "icon-node",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Node name",
    "ng-click": "orderTable(['info.name'], false)"
  })), "\n", HTML.TH({
    "class": "th-nodetype"
  }, HTML.I({
    "class": "icon-laptop",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Node type",
    "ng-click": "orderTable(['info.node'], false)"
  })), "\n", HTML.TH({
    "class": "th-latency"
  }, HTML.I({
    "class": "icon-clock",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Node latency",
    "ng-click": "orderTable(['stats.latency'], false)"
  })), "\n", HTML.TH(HTML.I({
    "class": "icon-mining",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Is mining",
    "ng-click": "orderTable(['-stats.hashrate'], false)"
  })), "\n", HTML.TH(HTML.I({
    "class": "icon-group",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Peers",
    "ng-click": "orderTable(['-stats.peers'], false)"
  })), "\n", HTML.TH(HTML.I({
    "class": "icon-network",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Pending transactions",
    "ng-click": "orderTable(['-stats.pending'], false)"
  })), "\n", HTML.TH(HTML.I({
    "class": "icon-block",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Last block",
    "ng-click": "orderTable(['-stats.block.number', 'stats.block.propagation'], false)"
  })), "\n", HTML.TH({
    "class": "th-blockhash"
  }, HTML.CharRef({
    html: "&nbsp;",
    str: " "
  })), "\n", HTML.TH({
    "class": "th-blockhash"
  }, HTML.I({
    "class": "icon-difficulty",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Total difficulty",
    "ng-click": "orderTable(['-stats.block.totalDifficulty'], false)"
  })), "\n", HTML.TH(HTML.I({
    "class": "icon-check-o",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Block transactions",
    "ng-click": "orderTable(['-stats.block.transactions.length'], false)"
  })), "\n", HTML.TH(HTML.I({
    "class": "icon-uncle",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Uncles",
    "ng-click": "orderTable(['-stats.block.uncles.length'], false)"
  })), "\n", HTML.TH({
    "class": "th-blocktime"
  }, HTML.I({
    "class": "icon-time",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Last block time",
    "ng-click": "orderTable(['-stats.block.received'], false)"
  })), "\n", HTML.TH({
    "class": "th-peerPropagationTime"
  }, HTML.I({
    "class": "icon-gas",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Propagation time",
    "ng-click": "orderTable(['-stats.block.number', 'stats.block.propagation'], false)"
  })), "\n", HTML.TH({
    "class": "th-peerPropagationChart"
  }), "\n", HTML.TH({
    "class": "th-peerPropagationAvg"
  }, HTML.I({
    "class": "icon-gas",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Average propagation time",
    "ng-click": "orderTable(['stats.propagationAvg'], false)"
  })), "\n", HTML.TH(HTML.I({
    "class": "icon-bulb",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Up-time",
    "ng-click": "orderTable(['-stats.uptime'], false)"
  })))), "\n", HTML.TBODY(Blaze.Each(function() {
    return Spacebars.call(view.lookup("nodes"));
  }, function() {
    return HTML.TR({
      "ng-repeat": "node in nodes | orderBy:predicate track by node.id",
      "class": function() {
        return Spacebars.mustache(view.lookup("mainClass"), view.lookup("stats"), Spacebars.dot(view.lookup("Blockchain"), "bestBlock"));
      },
      id: function() {
        return [ "node_", Spacebars.mustache(view.lookup("id")) ];
      }
    }, HTML.TD({
      "class": "td-nodecheck"
    }, HTML.I({
      "ng-click": "pinNode(id)",
      "class": function() {
        return Spacebars.mustache(view.lookup("nodePinClass"), view.lookup("pinned"));
      },
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
      }
    })), "\n", HTML.TD({
      "class": "nodeInfo",
      rel: function() {
        return Spacebars.mustache(view.lookup("id"));
      }
    }, HTML.SPAN({
      "class": "small",
      "data-toggle": "tooltip",
      "data-placement": "top",
      "data-html": "true",
      "data-original-title": function() {
        return Spacebars.mustache(view.lookup("geoTooltip"), view.lookup("."));
      }
    }, Blaze.View("lookup:info.name", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("info"), "name"));
    })), "\n", HTML.SPAN({
      "class": "small"
    }, HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), "(", Blaze.View("lookup:info.ip", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("info"), "ip"));
    }), ")"), "\n", HTML.A({
      "class": function() {
        return [ "small", " ", Spacebars.mustache(view.lookup("nodeClientClass"), view.lookup("info"), Spacebars.dot(view.lookup("Blockchain"), "currentApiVersion")) ];
      },
      href: "https://github.com/ethereum/wiki/wiki/Network-Status#updating",
      target: "_blank",
      "data-toggle": "tooltip",
      "data-placement": "top",
      "data-html": "true",
      "data-original-title": "Netstats client needs update.<br>Click this icon for instructions."
    }, HTML.I({
      "class": "icon-warning-o"
    }))), "\n", HTML.TD(HTML.DIV({
      "class": "small"
    }, Blaze.View("lookup:nodeVersion", function() {
      return Spacebars.mustache(view.lookup("nodeVersion"), Spacebars.dot(view.lookup("info"), "node"));
    }))), "\n", HTML.TD({
      "class": function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("readable"), "latencyClass"));
      }
    }, HTML.SPAN({
      "class": "small"
    }, Blaze.View("lookup:readable.latency", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("readable"), "latency"));
    }))), "\n", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("hashrateClass"), Spacebars.dot(view.lookup("stats"), "mining"), Spacebars.dot(view.lookup("stats"), "active"));
      }
    }, Blaze.View("lookup:hashrateFilter", function() {
      return Spacebars.mustache(view.lookup("hashrateFilter"), Spacebars.dot(view.lookup("stats"), "hashrate"), Spacebars.dot(view.lookup("stats"), "mining"));
    })), "\n", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("peerClass"), Spacebars.dot(view.lookup("stats"), "peers"), Spacebars.dot(view.lookup("stats"), "active"));
      },
      style: "padding-left: 11px;"
    }, Blaze.View("lookup:stats.peers", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("stats"), "peers"));
    })), "\n", HTML.TD({
      style: "padding-left: 15px;"
    }, Blaze.View("lookup:stats.pending", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("stats"), "pending"));
    })), "\n", HTML.TD({
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
    })), "\n", null), "\n", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("blockClass"), view.lookup("stats"), Spacebars.dot(view.lookup("Blockchain"), "bestBlock"));
      }
    }, HTML.SPAN({
      "class": "small"
    }, Blaze.View("lookup:hashFilter", function() {
      return Spacebars.mustache(view.lookup("hashFilter"), Spacebars.dot(view.lookup("stats"), "block", "hash"));
    }))), "\n", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("blockClass"), view.lookup("stats"), Spacebars.dot(view.lookup("Blockchain"), "bestBlock"));
      }
    }, HTML.SPAN({
      "class": "small"
    }, Blaze.View("lookup:number", function() {
      return Spacebars.mustache(view.lookup("number"), Spacebars.dot(view.lookup("stats"), "block", "totalDifficulty"));
    }))), "\n", HTML.TD({
      style: "padding-left: 14px;"
    }, Blaze.View("lookup:stats.block.transactions.length", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("stats"), "block", "transactions", "length"));
    })), "\n", HTML.TD({
      style: "padding-left: 14px;"
    }, Blaze.View("lookup:stats.block.uncles.length", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("stats"), "block", "uncles", "length"));
    })), "\n", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("timeClass"), Spacebars.dot(view.lookup("stats"), "block", "received"), Spacebars.dot(view.lookup("stats"), "active"));
      }
    }, Blaze.View("lookup:blockTimeFilter", function() {
      return Spacebars.mustache(view.lookup("blockTimeFilter"), Spacebars.dot(view.lookup("stats"), "block", "received"));
    })), "\n", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("propagationTimeClass"), view.lookup("stats"), Spacebars.dot(view.lookup("Blockchain"), "bestBlock"));
      }
    }, HTML.DIV({
      "class": "propagationBox"
    }), "\n", HTML.SPAN(Blaze.View("lookup:blockPropagationFilter", function() {
      return Spacebars.mustache(view.lookup("blockPropagationFilter"), Spacebars.dot(view.lookup("stats"), "block", "propagation"), false);
    }))), "\n", HTML.TD({
      "class": function() {
        return [ "peerPropagationChart", " ", Spacebars.mustache(view.lookup("id")) ];
      }
    }), "\n", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("propagationNodeAvgTimeClass"), view.lookup("stats"), Spacebars.dot(view.lookup("Blockchain"), "bestBlock"));
      }
    }, Blaze.View("lookup:blockPropagationAvgFilter", function() {
      return Spacebars.mustache(view.lookup("blockPropagationAvgFilter"), view.lookup("stats"), Spacebars.dot(view.lookup("Blockchain"), "bestBlock"));
    })), "\n", HTML.TD({
      "class": function() {
        return Spacebars.mustache(view.lookup("upTimeClass"), Spacebars.dot(view.lookup("stats"), "uptime"), Spacebars.dot(view.lookup("stats"), "active"));
      }
    }, Blaze.View("lookup:upTimeFilter", function() {
      return Spacebars.mustache(view.lookup("upTimeFilter"), Spacebars.dot(view.lookup("stats"), "uptime"));
    })));
  })))));
}));

})();
