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
       // var mouse_x = Math.floor((e.pageX-$("#canvas").offset().left));
        //var mouse_y = Math.floor((e.pageY-$("#canvas").offset().top));
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