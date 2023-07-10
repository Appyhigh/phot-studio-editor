import { Block } from "baseui/block"
import classes from "./style.module.css"

const Prompt = ({ stateInfo, setStateInfo, placeholder }: any) => {
  return (
    <Block className={classes.itemContainer}>
      <Block className={classes.itemHeading}>Prompt</Block>
      <Block className={classes.itemDesc}>
        What do you want to see, you can use a single word or complete sentence.
      </Block>
      <textarea
        className={classes.promptInput}
        placeholder={placeholder ?? "Write here..."}
        onChange={(e) => {
          setStateInfo && setStateInfo({ ...stateInfo, prompt: e.target.value })
        }}
        value={(stateInfo && stateInfo.prompt) ?? ""}
      ></textarea>
    </Block>
  )
}

export default Prompt
