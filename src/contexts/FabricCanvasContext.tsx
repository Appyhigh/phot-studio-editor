import React from "react";

const FabricCanvasContext=React.createContext({
    fabricCanvas:{
        width:400,
        height:400,
        scale:1
    }
    ,setFabricCanvas:(item:any)=>{
    console.log("Dummy Initializer for ", item)
    }
})

export default FabricCanvasContext;