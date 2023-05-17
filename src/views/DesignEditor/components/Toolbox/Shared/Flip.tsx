import React from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { Button, SIZE, KIND } from "baseui/button"
import { PLACEMENT, StatefulPopover } from "baseui/popover"
import FlipHorizontal from "~/components/Icons/FlipHorizontal"
import FlipVertical from "~/components/Icons/FlipVertical"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
const Flip = ({ type }: any) => {
  const editor = useEditor()
  const activeObject = useActiveObject() as any
  const [state, setState] = React.useState({ flipX: false, flipY: false })

  React.useEffect(() => {
    if (activeObject) {
      setState({
        flipX: activeObject.flipX,
        flipY: activeObject.flipY,
      })
    }
  }, [activeObject])

  const flipHorizontally = React.useCallback(() => {
    editor.objects.update({ flipX: !state.flipX })
    setState({ ...state, flipX: !state.flipX })
  }, [editor, state])

  const flipVertically = React.useCallback(() => {
    editor.objects.update({ flipY: !state.flipY })
    setState({ ...state, flipY: !state.flipY })
  }, [editor, state])

  return (
    <StatefulPopover
      placement={PLACEMENT.bottom}
      content={() =>
        type === "lock" ? null : (
          <Block width="180px" padding="12px" backgroundColor="#ffffff">
            <Block>
              <Button
                $style={{ width: "100%", justifyContent: "flex-start" }}
                startEnhancer={<FlipHorizontal size={24} />}
                onClick={flipHorizontally}
                kind={KIND.tertiary}
                size={SIZE.mini}
              >
                Flip horizontally
              </Button>
            </Block>
            <Button
              $style={{ width: "100%", justifyContent: "flex-start" }}
              startEnhancer={<FlipVertical size={24} />}
              onClick={flipVertically}
              kind={KIND.tertiary}
              size={SIZE.mini}
            >
              Flip vertically
            </Button>
          </Block>
        )
      }
    >
      <Block>
        <button
          disabled={type === "lock" ? true : false}
          className={clsx(
            "d-flex justify-content-center align-items-center flex-column ml-1",
            classes.flipBtn,
            type === "lock" && classes.disabledBtn
          )}
        >
          <div>
            <Icons.Flip />
          </div>
          <p className={classes.subHeadingText}>Flip</p>
        </button>
      </Block>
    </StatefulPopover>
  )
}

export default Flip
