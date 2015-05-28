var point_size = 10;
var growTime = 300;

$(document).ready(function() {
    MainLoop();
});

function MainLoop() {
    IsButtonEnabled();
    Render();
    requestAnimationFrame(MainLoop);
}

function IsButtonEnabled() {
    if (points.length > 1) {
        if (!solve_enabled) {
            solve_enabled = true;
            document.getElementById('button').innerHTML = '<h2>Solve</h2>';
            $("#button").stop().animate({
                height: '50px'
            }, 500);
        }
    } else if (solve_enabled) {
        solve_enabled = false;
        document.getElementById('button').innerHTML = '<h2>Make some points!</h2>';
        $("#button").stop().animate({
            height: '25px',
            width: '200px'
        }, 500);
    }
}

function Render() {
    wipeCanvas();
    ctx.fillText("Connect the Dots", ctx.canvas.width / 2, 50);
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        if (p.drawn) {
            draw(p.x - point_size / 2, p.y - point_size / 2, point_size);
        } else {
            if (!p.drawing) {
                p.s = performance.now();
                p.drawing = true;
            }
            GrowPoint(p);
        }
    }
    if (!solve_toggle) {
        DrawLines();
    }
}

function Solve() {
    if (points.length > 1) {
        var center = GetCenterOfMass();
        GetAngles(center);
        SortByAngle();
        ToggleSolve();
    }
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

function DrawLines() {
    if (points.length > 0) {
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
}

function ToggleSolve() {
    if (solve_toggle) {
        solve_toggle = false;
        document.getElementById('button').innerHTML = '<h2>Reset</h2>';
    } else {
        solve_toggle = true;
        document.getElementById('button').innerHTML = '<h2>Solve</h2>';
    }
}

function ResetAll() {
    points = [];
    ToggleSolve();
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

function wipeCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function GrowPoint(p) {
    var percent = (performance.now() - p.s) / growTime;
    var size = percent * point_size;
    draw(p.x - size / 2, p.y - size / 2, size);
    if (percent > 1) {
        p.drawn = true;
    }
}

function draw(x, y, w) {
    ctx.fillRect(x, y, w, w);
}