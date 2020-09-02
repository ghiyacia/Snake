window.onload = function(){
    var canva = document.getElementById("canvas");       
    var ctx = canva.getContext("2d");

    var canvaW = canva.width;
    var canvaH = canva.height;
    var direction = "right";
    var snakeW = 10;
    var snakeH = 10;


    // controlled snake event
    document.addEventListener("keydown",getDirection);
    
    // controlled snake function
    function getDirection(e){
        if (e.keyCode == 37 && direction != "right"){
            direction = "left";
        }else if (e.keyCode == 38 && direction != "down") {
            direction = "up";
        }else if (e.keyCode == 39 && direction != "left"){
            direction = "right";
        }else if (e.keyCode == 40 && direction != "up"){
            direction = "down";
        }
    }
    // deaw snake
    function drawSnake(x, y){
    // size cel
    //snake style 
    ctx.fillStyle = "#FFF";
    ctx.fillRect(x*snakeW, y*snakeH,snakeW, snakeH);

    ctx.fillStyle = "#000";
    ctx.strokeRect(x*snakeW, y*snakeH, snakeW, snakeH);
    }


    var lenS = 4;
    var snake = [];

    for (let i = lenS -1; i >= 0 ; i--) {
        snake.push(
            {
                x:i,
                y:0
            }
        );
    }
    //    creat food object
    food = {
        x: Math.round(Math.random()*(canvaW/snakeW-1)+1),
        y: Math.round(Math.random()*(canvaH/snakeH-1)+1)
    }

    function drawfood(x, y){
        // size food and style 
        ctx.fillStyle = "red";
        ctx.fillRect(x*snakeW, y*snakeH,snakeW, snakeH);
        ctx.fillStyle = "red";
        ctx.strokeRect(x*snakeW, y*snakeH, snakeW, snakeH);
    }

    function checkCollision(x, y, array){
        for (let i = 0; i < array.length; i++) {
            if (x == array[i].x && y == array[i].y) {
                return true;
            }           
        }
        return false;
    }
    function draw(){
        ctx.clearRect(0, 0, canvaW, canvaH);
        for (let i = 0; i < snake.length; i++) {
            var x = snake[i].x;
            var y = snake[i].y;
            drawSnake(x, y);
        }

        drawfood(food.x, food.y);
        
        var snakeX = snake[0].x
        var snakeY = snake[0].y
        // console.log(checkCollision(snakeX, snakeY, snake))

        // hits the wall
        if(snakeX < 0 || snakeY < 0 || snakeX >= canvaW/snakeW || snakeY >= canvaH/snakeH || checkCollision(snakeX, snakeY, snake) != false){
            // location.reload();
            console.log ("sa fait mal")
        }

        //remove the snake tail
        // snake.pop();

        // creat the new head 
        if (direction == 'left')snakeX--;
        else if (direction == "up")snakeY--; 
        else if (direction == "right")snakeX++;
        else if (direction == "down")snakeY++

        // eats the food
        if (snakeX == food.x && snakeY == food.y){
            food = {
                x: Math.round(Math.random()*(canvaW/snakeW-1)+1),
                y: Math.round(Math.random()*(canvaH/snakeH-1)+1)
            }
            var newHead = {
                x:snakeX,
                y:snakeY
            };
        }else{
            snake.pop();
            var newHead = {
                x:snakeX,
                y:snakeY
            };
        }
        snake.unshift(newHead);
    }
    setInterval(draw,60)


}