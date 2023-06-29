import React, { useEffect } from 'react'
import useFabricEditor from '../../../../hooks/useFabricEditor'
import { fabric } from 'fabric'
const useGrid = () => {
  const { fabricEditor } = useFabricEditor()
  const { canvas, workArea } = fabricEditor

  var options = {
    distance: 25,
    param: {
      stroke: 'rgba(43, 255, 1)',
      strokeWidth: 0.25,
      selectable: false,
      type: 'grid',
    },
  }

  useEffect(() => {
    if (workArea && canvas) {
      var gridLenX = Math.floor(workArea.width / options.distance)
      var gridLenY = Math.floor(workArea.height / options.distance)

      var offsetX = (workArea.width - gridLenX * options.distance) / 2
      var offsetY = (workArea.height - gridLenY * options.distance) / 2

      for (var i = 0; i < gridLenX; i++) {
        var distanceX = workArea.left + i * options.distance + offsetX
        var vertical = new fabric.Line(
          [distanceX, workArea.top, distanceX, workArea.top + workArea.height],
          options.param
        )
        if (i % 5 === 0) {
          vertical.set({ stroke: options.param.stroke })
        }
       if(i==0 || i==gridLenX-1){
        canvas.add(vertical)

       }
      }

      for (var j = 0; j < gridLenY; j++) {
        var distanceY = workArea.top + j * options.distance + offsetY
        var horizontal = new fabric.Line(
          [workArea.left, distanceY, workArea.left + workArea.width, distanceY],
          options.param
        )
        if (j % 5 === 0) {
          horizontal.set({ stroke: options.param.stroke })
         
        }
        
        if(j==0 || j==gridLenY-1){
          canvas.add(horizontal)
  
         }
      }
      canvas.on('object:moving', handleObjectMoving)

      return () => {
        canvas.off('object:moving', handleObjectMoving)
      }
    }
  }, [workArea, canvas])

  const handleObjectMoving = (event:any) => {
    var target = event.target
    var left = Math.round(target.left / options.distance) * options.distance
    var top = Math.round(target.top / options.distance) * options.distance

    target.set({
      left: left,
      top: top,
    })
  }

  return {}
}

export default useGrid
