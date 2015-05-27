var points = [];
var ctx;
var can_draw_lines = false;

$(document).ready(function() {
    $('.button').hover(function() {
        $(this).stop().animate({
            width: '140px'
        }, 500);
    }, function() {
        $(this).stop().animate({
            width: '100px'
        }, 500);
    });

    $('.button').click(function() {
        Solve();
    });

    $("#canvas").click(function(e) {
        canoffset = $(canvas).offset();
        var mouse_x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
        var mouse_y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1;
        points.push({
            x: mouse_x,
            y: mouse_y
        });
    });

    var canvas = document.getElementById('canvas');
    canvas.style.border = "red 2px solid";
    ctx = canvas.getContext('2d');
    ctx.FillStyle = "rgb(255,255,255)";

    MainLoop();
});

function wipeCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function MainLoop() {
    Render();
    requestAnimationFrame(MainLoop);
}

function Render() {
    wipeCanvas();
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
    }
    if (can_draw_lines) {
        DrawLines();
    }
}

function Solve() {
    var center = GetCenterOfMass();
    GetAngles(center);
    SortByAngle();
    ToggleLineDraw();
}

function GetCenterOfMass() {
    var n = points.length;
    var c = {};
    var sumx = 0;
    var sumy = 0;
    for (var i = 0; i < n; i++) {
        sumx += points[i].x;
        sumy += points[i].y;
    }
    c.x = sumx / n;
    c.y = sumy / n;
    return c;
}

function GetAngles(center) {
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var dx = p.x - center.x;
        var dy = p.y - center.y;
        p.a = Math.atan2(dy, dx);
    }
}

function SortByAngle() {
    points.sort(CompareByAngle);
}

function CompareByAngle(p1, p2) {
    if (p1.a < p2.a)
        return -1;
    if (p1.a > p2.a)
        return 1;
    return 0;
}

function DrawLines() {
    var p0 = points[0];
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    for (var i = 1; i < points.length; i++) {
        var p = points[i];
        ctx.lineTo(p.x, p.y);
    }
    ctx.lineTo(p0.x, p0.y);
    ctx.stroke();
}

function ToggleLineDraw() {
    can_draw_lines = !can_draw_lines;
}
