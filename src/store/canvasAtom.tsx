import { atom } from 'jotai';

const canvasAtom = atom({
    canvas: null,
    workArea: null,
    backgroundImage: '',
    activeObject: null,
    zoomRatio: null,
    objects: null,
    brushShow:false
});

export default canvasAtom