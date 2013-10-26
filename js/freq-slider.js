var margin = {top: 0, right: 50, bottom: 0, left: 50},
width = 800 - margin.left - margin.right,
height = 80 - margin.bottom - margin.top;

var x = d3.scale.linear()
    .domain([0, 22000])
    .range([0, width])
    .clamp(true);

var brush = d3.svg.brush()
    .x(x)
    .extent([22000, 22000])
    .on("brush", brushed);

var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height / 4 + ")")
    .call(d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickFormat(function (d) { return d + " Hz"; })
          .tickSize(0)
          .tickPadding(30))
    .select(".domain")
    .select(function () { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "halo");

var slider = svg.append("g")
    .attr("class", "slider")
    .call(brush);

slider.selectAll(".extent,.resize")
    .remove();

slider.select(".background")
    .attr("height", height);

var handle = slider.append("circle")
    .attr("class", "handle")
    .attr("transform", "translate(0," + height / 4 + ")")
    .attr("r", 17);

var freq = 440;

slider.call(brush.event)
    .transition()
    .duration(1200)
    .ease("bounce")
    .call(brush.extent([440, 440]))
    .call(brush.event);

function brushed() {
    var value = brush.extent()[0];

    if (d3.event.sourceEvent) {
        value = x.invert(d3.mouse(this)[0]);
        brush.extent([value, value]);
    }

    handle.attr("cx", x(value));

    freq = Math.ceil(value / 5) * 5;
    d3.select("#freq").text(freq + " Hz");
}

var tobj = null;
d3.select("#play").on("click", clickPlay);
function clickPlay() {
    if (tobj) {
        tobj.pause();
        tobj = null;

        d3.select("#play").text("Play");
    } else {
        tobj = T("sin").play();
        tobj.set({freq:freq});

        d3.select("#play").text("Stop");
    }
}
