document.addEventListener("DOMContentLoaded", function() {
    if (0 == 0) {
        var izquierda = false;
        var derecha = false;
        var arriba = false;
        var abajo = true;
        var en_el_aire = false;
        var salto = 0;
        var buttonPressed = {
            up1: false,
            down1: false,
            left1: false,
            right1: false,
        };
    }
    
    const config = {
    
        //escala, centrado y tamaño de pantalla//
        width: 256,
        height: 240,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            min: {
                width: 256,
                height: 240,
            },
    
            max: {
                width: 512,
                height: 480,
            }
        },
        //--------------------------------------//
    
        type: Phaser.AUTO,
    
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
    
        //desacrtiva el suabisado de pixeles para hacer pixel art//
        pixelArt: true,
        //---------------------------------------------------------
    
        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y:0,
                }
            },
        },
    }
    
    var game = new Phaser.Game(config)
    
    function preload() {
        this.load.image("background", "./background.png")
        this.load.image("mago", "./mago.png");
    }
    
    function create() {
    
        //background//
        this.background = this.add.image(160, 248, "background")
        //background//
    
        //personaje//
        this.mago = this.physics.add.image(128, 120, "mago");
        console.log("abajo" + abajo)
        this.mago.setScale(1); //escala o tamaño del personaje
        this.mago.setCollideWorldBounds(true); //colicionar con los bordes de la pantalla//
        this.mago.setAcceleration(0, salto)
        //personaje//
    
        this.cursors = this.input.keyboard.createCursorKeys();
        console.log(this.cursors);
    
    }
    
    function update(time, delta) {
    
        //combrobar si la pantalla esta en el borde del mapa// 
        //compara si se precionan botones en diagonal//
        if (this.cursors.left.isDown && this.cursors.down.isDown) { //diagonal inferior izquierda//
            
            if (this.background.y <= -8){
                this.mago.y += 0.7;
            }
            else{
                if (this.mago.y >= 120) {
                        this.background.y -= 0.7;
                }
    
                else{
                        this.mago.y += 0.7;
                }
            }
    
            if (this.background.x >= 160){
                this.mago.x -= 0.7;
            }
            else{
                if (this.mago.x <= 128) {
                    this.background.x ++;
                }
    
                else{
                    this.mago.x -= 0.7;
                }
    
            }
        }
    
        else if (this.cursors.right.isDown && this.cursors.up.isDown) { //diagonal superior derecha//
            if (this.background.y >= 248){
                this.mago.y -= 0.7;
            }
            else{
                if (this.mago.y <= 120) {
                    this.background.y += 0.7;
                }
    
                else{
                    this.mago.y -= 0.7;
                }
    
            }
    
            if (this.background.x <= 96){
                this.mago.x += 0.7;
            }
            else{
                if (this.mago.x >= 128) {
                    this.background.x -= 0.7;
                }
    
                else{
                    this.mago.x += 0.7;
                }
            }
        }
    
        else if (this.cursors.right.isDown && this.cursors.down.isDown) { //diagonal inferior derecha//
            if (this.background.x <= 96){
                this.mago.x += 0.7;
            }
            else{
                if (this.mago.x >= 128) {
                    this.background.x -= 0.7;
                }
    
                else{
                    this.mago.x += 0.7;
                }
            }
    
            if (this.background.y <= -8){
                this.mago.y += 0.7;
            }
            else{
                if (this.mago.y >= 120) {
                    this.background.y -= 0.7;
                }
    
                else{
                    this.mago.y += 0.7;
                }
            }
        }
    
        else if (this.cursors.left.isDown && this.cursors.up.isDown) { //diagonal superior izquierda//
            if (this.background.x >= 160){
                this.mago.x -= 0.7;
            }
            else{
                if (this.mago.x <= 128) {
                    this.background.x += 0.7;
                }
    
                else{
                    this.mago.x -= 0.7;
                }
            }
            
            if (this.background.y >= 248){
                this.mago.y -= 0.7;
            }
            else{
                if (this.mago.y <= 120) {
                    this.background.y += 0.7;
                }
    
                else{
                    this.mago.y -= 0.7;
                }
    
            }
        }
    
        //compara si se precionan botones en columnas y filas rectas//
        else {
            //compara si se precionan botones en linea recta//
            if (this.cursors.left.isDown || buttonPressed.left1) { //izquierda//
                if (this.background.x >= 160){
                    this.mago.x --;
                }
                else{
                    if (this.mago.x <= 128) {
                        this.background.x ++;
                    }
    
                    else{
                        this.mago.x --;
                    }
    
                }
                abajo = false;
                arriba = false;
                izquierda = true;
                derecha = false;
            }
    
            else if (this.cursors.right.isDown || buttonPressed.right1) { //derecha//
                if (this.background.x <= 96){
                    this.mago.x ++;
                }
                else{
                    if (this.mago.x >= 128) {
                        this.background.x --;
                    }
    
                    else{
                        this.mago.x ++;
                    }
                }
                abajo = false;
                arriba = false;
                izquierda = false;
                derecha = true;
            }
    
            else if (this.cursors.up.isDown || buttonPressed.up1) { //arriba//
                if (this.background.y >= 248){
                    this.mago.y --;
                }
                else{
                    if (this.mago.y <= 120) {
                        this.background.y ++;
                    }
    
                    else{
                        this.mago.y --;
                    }
    
                }
                abajo = false;
                arriba = true;
                izquierda = false;
                derecha = false;
            }
    
            else if (this.cursors.down.isDown || buttonPressed.down1) { //abajo//
                if (this.background.y <= -8){
                    this.mago.y ++;
                }
                else{
                    if (this.mago.y >= 120) {
                        this.background.y --;
                    }
    
                    else{
                        this.mago.y ++;
                    }
                }
                abajo = true;
                arriba = false;
                izquierda = false;
                derecha = false;
            }
        }
    
        //comprobar si esta en el aire (falta terminar pero el juego sigue funcionando)
        if (en_el_aire == false) {
            //si esta en el aire puede saltar
            if (this.cursors.space.isDown) {
                eje_Z = this.mago.y;
                this.mago.y -= 1
                en_el_aire = true;
                salto = 10;
                while (eje_Z <= this.mago.y) {
                    salto -= 1;
                }
                en_el_aire = false;
    
            }
        }
    
    }
    
    if (0 == 0) { //botones para celular//
        document.getElementById("button-up").addEventListener("touchstart", function() {
            buttonPressed.up1 = true;
        });
        
        document.getElementById("button-up").addEventListener("touchend", function() {
            buttonPressed.up1 = false;
        });
        
        document.getElementById("button-down").addEventListener("touchstart", function() {
            buttonPressed.down1 = true;
        });
        
        document.getElementById("button-down").addEventListener("touchend", function() {
            buttonPressed.down1 = false;
        });
        
        document.getElementById("button-left").addEventListener("touchstart", function() {
            buttonPressed.left1 = true;
        });
        
        document.getElementById("button-left").addEventListener("touchend", function() {
            buttonPressed.left1 = false;
        });
        
        document.getElementById("button-right").addEventListener("touchstart", function() {
            buttonPressed.right1 = true;
        });
        
        document.getElementById("button-right").addEventListener("touchend", function() {
            buttonPressed.right1= false;
        });
    
    }
});
