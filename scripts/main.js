var points = [];
var ctx;

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

    $("#canvas").click(function(e){
        canoffset = $(canvas).offset();
        var mouse_x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
        var mouse_y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1;
        points.push({x:mouse_x, y:mouse_y});
     });

    var canvas = document.getElementById('canvas');
    canvas.style.border = "red 2px solid";
    ctx = canvas.getContext('2d');
    ctx.FillStyle = "rgb(255,255,255)";

    MainLoop();
});

function wipeCanvas() {
    ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
}

function MainLoop() {

    Render();

    requestAnimationFrame(MainLoop);
}

function Render() {

    wipeCanvas();

    for (var i = 0; i < points.length; i++){
        var p = points[i];
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
    }

}

function Solve() {
    var center = GetCenterOfMass();
    GetAngles(center);
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
    c.x = sumx/n;
    c.y = sumy/n;
    return c;
}

function GetAngles(center) {
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var dx = p.x - center.x;
        var dy = p.y - center.y;
        p.a = Math.atan2(dy,dx);
    }
}
