import Model from './model'

// class die furniture aanmaakt adhv een array
export default class Furniture {
    constructor(scene:any, roomWidth:number, roomLength:number) {
        let backOfRoom = -4 - (roomLength * 2)
        let leftSideOfRoom =  1 - roomWidth

        // furniture array (asset-name, x, y, z, rotation, scale)
        let furniture : [string, number, number, number, number, number][] = [
            ['kitchenFridgeBuiltIn', leftSideOfRoom - 0.3, 0, backOfRoom + 1, -90, 0.2],
            ['kitchenCabinet', leftSideOfRoom, 0, backOfRoom + 1.85, -90, 0.2],
            ['kitchenStove', leftSideOfRoom, 0, backOfRoom + 2.7, -90, 0.2],
            ['kitchenSink', leftSideOfRoom, 0, backOfRoom + 3.55, -90, 0.2],
            ['kitchenCabinet', leftSideOfRoom, 0, backOfRoom + 4.4, -90, 0.2],
        ]
        
        // loop door furniture array en maak de models
        furniture.forEach(element => {
            let item = new Model(scene, element[0], element[1], element[2], element[3], element[4], element[5])
        });
    }
}