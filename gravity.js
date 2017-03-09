var working = true;

function gravityCheck() {
    if (!jumping && working) {
        var temp = parseInt(level[CurY + 1][CurX]);
        if (temp === 0 || temp === 2 || temp === 6 || temp === 4) {
            CurY++;
            playerObject.animate({
                top: 50 * CurY + "px"
            }, 50)
        }else if(temp === 9){
            var newbody = document.createElement("body");
            
            $(document.body).remove();
            
            $("html").append(newbody);
            working = false;
            
            $("body").append('<div id="GameOver"></div>')
            $('body').css('background-image', 'url(gameover.gif)')

            $('body').css('background-repeat', 'no-repeat')
            }
        
        
    }
    timer = setTimeout(gravityCheck, 100);
}