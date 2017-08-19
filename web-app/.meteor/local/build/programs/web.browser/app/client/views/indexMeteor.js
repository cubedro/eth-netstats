(function(){
/**
Update the spark chart

@method sparkChart
@param {String} property the property name with the chart data
@param {String} className the class name of the sparkchart element
*/ 
var sparkChart = function(template, property, className){
    var fields = {};
    fields[property] = 1;
    var meta = Blockchain.findOne('meta', fields);

    var element = template.$('sparkchart.'+ className);
    element.html(meta[property].join(','));
    element.addClass("big-details");
    element.sparkline('html', {
        type: 'bar',
        tooltipSuffix: (element.attr('tooltipsuffix') || '')
    });
};

Template['indexMeteor'].onRendered(function(){
    var template = this;

    // map
    this.autorun(function(){
        var data = Map.find({}).fetch();
        var element = template.$('#mapHolder');
        var scope = {};

        if(data.length === 0)
            return;

        var bubbleConfig = {
            borderWidth: 0,
            highlightOnHover: false,
            popupOnHover: true,
            popupTemplate: function(geo, data) {
                return ['<div class="tooltip-arrow"></div>',
                        '<div class="hoverinfo ' + data.fillClass + '">',
                            '<div class="propagationBox"></div>',
                            '<strong>',
                            data.nodeName,
                            '</strong>',
                        '</div>'].join('');
            }
        };

        element.empty();

        var width = 628,
            height = 244;

        var map = new Datamap({
            element: element[0],
            scope: 'world',
            width: width,
            height: 300,
            fills: {
                success: '#7BCC3A',
                info: '#10A0DE',
                warning: '#FFD162',
                orange: '#FF8A00',
                danger: '#F74B4B',
                defaultFill: '#282828'
            },
            geographyConfig: {
                borderWidth: 0,
                borderColor: '#000',
                highlightOnHover: false,
                popupOnHover: false
            },
            bubblesConfig: {
                borderWidth: 0,
                highlightOnHover: false,
                popupOnHover: true
            },
            done: function(datamap) {
                var ev;

                var zoomListener = d3.behavior.zoom()
                    .size([width, height])
                    .scaleExtent([1, 3])
                    .on("zoom", redraw)
                    .on("zoomend", animadraw);

                function redraw() {
                    datamap.svg.select(".datamaps-subunits").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                    datamap.svg.select(".bubbles").selectAll("circle")
                        .attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
                        .attr("r", 3/d3.event.scale);

                    ev = d3.event;
                }

                zoomListener(datamap.svg);

                function animadraw() {
                    var x = Math.min(0, Math.max(ev.translate[0], (-1) * width * (ev.scale-1)));
                    var y = Math.min(0, Math.max(ev.translate[1], (-1) * height * (ev.scale-1)));

                    datamap.svg.select(".datamaps-subunits")
                        .transition()
                        .delay(150)
                        .duration(750)
                        .attr("transform", "translate(" + x  + "," + y + ")scale(" + ev.scale + ")");

                    datamap.svg.select(".bubbles").selectAll("circle")
                        .transition()
                        .delay(150)
                        .duration(750)
                        .attr("transform", "translate(" + x  + "," + y + ")scale(" + ev.scale + ")")
                        .attr("r", 3/ev.scale);

                    zoomListener.translate([x,y]);
                }
            }
        });

        map.bubbles(data, bubbleConfig);
    });

    // block propagation times chart
    this.autorun(function(){
        var element = template.$('histogram.d3-blockpropagation');

        var margin = {top: 0, right: 0, bottom: 0, left: 0};
        var width = 280 - margin.left - margin.right,
            height = 63 - margin.top - margin.bottom;

        var TICKS = 40;

        var x = d3.scale.linear()
            .domain([0, 10000])
            .rangeRound([0, width])
            .interpolate(d3.interpolateRound);

        var y = d3.scale.linear()
            .range([height, 0])
            .interpolate(d3.interpolateRound);

        var color = d3.scale.linear()
            .domain([1000, 3000, 7000, 10000])
            .range(["#7bcc3a", "#FFD162", "#ff8a00", "#F74B4B"]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(4, ",.1s")
            .tickFormat(function(t){ return t/1000 + "s"});

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(3)
            .tickFormat(d3.format("%"));

        var line = d3.svg.line()
            .x(function(d) { return x(d.x + d.dx/2) - 1; })
            .y(function(d) { return y(d.y) - 2; })
            .interpolate('basis');

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([10, 0])
            .direction('s')
            .html(function(d) {
                return '<div class="tooltip-arrow"></div><div class="tooltip-inner"><b>' + (d.x/1000) + 's - ' + ((d.x + d.dx)/1000) + 's</b><div class="small">Percent: <b>' + Math.round(d.y * 100) + '%</b>' + '<br>Frequency: <b>' + d.frequency + '</b><br>Cumulative: <b>' + Math.round(d.cumpercent*100) + '%</b></div></div>';
            })

        var data = Blockchain.findOne('meta', {fields: {blockPropagationChart: 1}}).blockPropagationChart;

        if(data.length === 0)
            return;

        // Adjust y axis
        y.domain([0, d3.max(data, function(d) { return d.y; })]);

        // Delete previous histogram
        element.empty();

        /* Start drawing */
        var svg = d3.select(".d3-blockpropagation").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.call(tip);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
              .attr("y", 6);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + width + ", 0)")
            .call(yAxis);


        var bar = svg.append("g")
            .attr("class", "bars")
          .selectAll("g")
          .data(data)
          .enter().append("g")
            .attr("transform", function(d) { return "translate(" + x(d.x) + ",0)"; })
            .on('mouseover', function(d) { tip.show(d, d3.select(this).select('.bar').node()); })
            .on('mouseout', tip.hide);

        bar.insert("rect")
            .attr("class", "handle")
            .attr("y", 0)
            .attr("width", x(data[0].dx + data[0].x) - x(data[0].x))
            .attr("height", function(d) { return height; });

        bar.insert("rect")
            .attr("class", "bar")
            .attr("y", function(d) { return y(d.y); })
            .attr("rx", 1)
            .attr("ry", 1)
            .attr("fill", function(d) { return color(d.x); })
            .attr("width", x(data[0].dx + data[0].x) - x(data[0].x) - 1)
            .attr("height", function(d) { return height - y(d.y) + 1; });

        bar.insert("rect")
            .attr("class", "highlight")
            .attr("y", function(d) { return y(d.y); })
            .attr("fill", function(d) { return d3.rgb(color(d.x)).brighter(.7).toString(); })
            .attr("rx", 1)
            .attr("ry", 1)
            .attr("width", x(data[0].dx + data[0].x) - x(data[0].x) - 1)
            .attr("height", function(d) { return height - y(d.y) + 1; });

        svg.append("path")
            .attr("class", "line")
            .attr("d", line(data));
    });

    // blocktimes chart
    this.autorun(function(){
        sparkChart(template, 'lastBlocksTime', 'spark-blocktimes');
    });

    // difficulty chart
    this.autorun(function(){
        sparkChart(template, 'difficultyChart', 'spark-difficulty');
    });

    // uncles chart
    this.autorun(function(){
        sparkChart(template, 'uncleCountChart', 'spark-uncles');
    });

    // transactions chart
    this.autorun(function(){
        sparkChart(template, 'transactionDensity', 'spark-transactions');
    });

    // gasspending chart
    this.autorun(function(){
        sparkChart(template, 'gasSpending', 'spark-gasspending');
    });
});


Template['indexMeteor'].helpers({
    'Blockchain': function(){
        return Blockchain.findOne('meta');
    },

    'nodes': function(uptime) {
        return Nodes.find({stats: {$exists: true}},{limit: 10, sort: {'stats.block.number': -1, 'info.name': 1, 'stats.active': -1}});
    },

    'blockTimeFilter': function() {
        var timestamp = this.lastBlock;

        if(timestamp === 0)
            return '∞';

        // var time = Math.floor((new Date()).getTime() / 1000);
        var time = (new Date()).getTime();
        var diff = Math.floor((time - timestamp)/1000);

        if(diff < 60)
            return Math.round(diff) + ' s ago';

        return moment.duration(Math.round(diff), 's').humanize() + ' ago';
    },

    'avgTimeFilter': function() {
        var time = this.avgBlockTime;

        if(time < 60)
            return parseFloat(time).toFixed(2) + ' s';

        return moment.duration(Math.round(time), 's').humanize();
    },

    'minerBlocks': function(){
        var array = [];

        for (var i = 1; i <= this.blocks; i++) {
            array.push('');
        };

        return array;
    },

    'minerBlockClass': function (value) {
        if(value <= 6)
            return 'success';

        if(value <= 12)
            return 'info';

        if(value <= 18)
            return 'warning';

        if(value <= 24)
            return 'orange';

        return 'danger';
    }
});

})();
