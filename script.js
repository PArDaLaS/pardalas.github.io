function createFallingFlowers() {
    // Create a PixiJS application


    let hex="#f827f2";
    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: hex,

    });
    document.body.appendChild(app.view);

    // Load an image of a flower
    PIXI.Loader.shared.add("flower", './flower.png').load(setup);

    function setup() {
        // Create an array to store the falling flowers
        const flowers = [];

        // Create a container to hold the flowers
        const flowersContainer = new PIXI.Container();
        app.stage.addChild(flowersContainer);

        // Create a loop to add new flowers to the stage
        app.ticker.add((delta) => {
            // Create a new flower sprite
            const flower = new PIXI.Sprite(PIXI.Loader.shared.resources.flower.texture);

            // Set the flower's position and scale
            flower.x = Math.random() * app.screen.width;
            flower.y = -Math.random() * app.renderer.screen.height;
            flower.scale.x = flower.scale.y = 0.1 + Math.random() * 0.3;
            flower.height=50;
            flower.width=50;
            // Add the flower to the stage and the flowers array
            flower.tint = Math.random() * 0xFFFFFF;
            flowersContainer.addChild(flower);
            flowers.push(flower);
        });

        // Create a loop to update the position of each flower
        app.ticker.add((delta) => {
            for (let i = 0; i < flowers.length; i++) {
                const flower = flowers[i];
                flower.y += 5;
                flower.rotation += 0.02;

                // Remove the flower if it goes off the bottom of the screen
                if (flower.y > (app.screen.height+60)) {
                    flowersContainer.removeChild(flower);
                    flowers.splice(i, 1);
                    i--;
                }
            }
        });
    }
}
