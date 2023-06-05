import React from "react";

const ImagesContext=React.createContext({
    imagesCt:0,
    setImagesCt:(item:any)=>{
    console.log("Dummy Initializer for ", item)
    }

})

export default ImagesContext;