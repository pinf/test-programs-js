
require("jquery");
var JQUERY = jQuery.noConflict(true);

require("raphaeljs");
var RAPHAEL = Raphael.ninja();


exports.main = function(env)
{
	JQUERY(function()
	{
		exports.loadNewData();
	});
}

exports.loadNewData = function()
{
	var statusDiv = JQUERY("#status");
	
	statusDiv.html("Loading ...");

	JQUERY.getJSON("/data", function(data)
	{
		statusDiv.html("");

		render(data);
	}); 
}


function render(data)
{
    var values = [],
    	labels = [];

	for (var label in data)
	{
		labels.push(label);
		values.push(data[label]);
	}
	
	JQUERY("#content").html("");
	
	RAPHAEL("content", 350, 325).pieChart(175, 150, 100, values, labels, "#fff");
}


RAPHAEL.fn.pieChart = function (cx, cy, r, values, labels, stroke) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }
    var angle = 0,
        total = 0,
        start = 0,
        process = function (j) {
            var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                color = "hsb(" + start + ", 1, .5)",
                ms = 500,
                delta = 30,
                bcolor = "hsb(" + start + ", 1, 1)",
                p = sector(cx, cy, r, angle, angle + angleplus, {gradient: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 3}),
                txt = paper.text(cx + (r + delta + 15) * Math.cos(-popangle * rad), cy + (r + delta + 5) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-family": 'Fontin-Sans, Arial', "font-size": "16px"});
            p.mouseover(function () {
                p.animate({scale: [1.1, 1.1, cx, cy]}, ms, "elastic");
                txt.animate({opacity: 1}, ms, "elastic");
            }).mouseout(function () {
                p.animate({scale: [1, 1, cx, cy]}, ms, "elastic");
                txt.animate({opacity: 0}, ms);
            });
            angle += angleplus;
            chart.push(p);
            chart.push(txt);
            start += .1;
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (var i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};
