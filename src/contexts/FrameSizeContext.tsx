import React from 'react';

const FrameSizeContext = React.createContext({
    frameData: {
        width: 0,
        height: 0,

    },
    setFrameData: (item: any) => {
        console.log('Dummy Initializer for ', item);
    },
});

export default FrameSizeContext;
