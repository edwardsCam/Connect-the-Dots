var ctx;
var solve_toggle = true;
var solve_enabled = false;
var points = [];

$(document).ready(function() {

    $("#button").hover(function() {
        if (solve_enabled) {
            $(this).stop().animate({
                width: '700px'
            }, 500);
        }
    }, function() {
        if (solve_enabled) {
            $(this).stop().animate({
                width: '600px'
            }, 500);
        }
    });

    $("#button").click(function() {
        if (solve_toggle) {
            Solve();
        } else {
            ResetAll();
        }
    });

    $("#canvas").click(function(e) {
        if (solve_toggle) {
            var offset = $(this).offset();
            points.push({
                x: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(offset.left),
                y: e.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(offset.top) + 1,
                drawing: false,
                drawn: false
            });
        }
    });

    var canvas = document.getElementById('canvas');
    canvas.style.border = "black 3px solid";
    ctx = canvas.getContext('2d');
    ctx.FillStyle = "rgb(255,255,255)";

});