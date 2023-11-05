import { useStyletron, styled } from "baseui"
import { Block } from "baseui/block"
import Icons from "~/components/Icons"

const ButtonContainer = styled("div", () => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px",
}))

const Button = styled("button", ({ $theme }) => {
  return {
    backgroundColor: $theme.colors.grey4,
    ":hover": { backgroundColor: $theme.colors.grey4 },
    borderRadius: "50%",
    padding: "11px",
    marginBottom: "5px",
  }
})

const Text = styled("button", ({ $theme }) => {
  return {
    fontSize: "12px",
    color: $theme.colors.backgroundSecondary,
    backgroundColor: "transparent",
  }
})

const Sidebar = () => {
  const [css, theme] = useStyletron()

  return (
    <Block className={css({ backgroundColor: theme.colors.white, width: "100px ", height: "100vh", padding: "22px" })}>
      <ButtonContainer>
        <Button>
          <Icons.Templates2 />
        </Button>
        <Text>Templates</Text>
      </ButtonContainer>
      <ButtonContainer>
        <Button>
          <Icons.Assets size={20} color={theme.colors.grey3} />
        </Button>
        <Text>Assets</Text>
      </ButtonContainer>
      <ButtonContainer>
        <Button>
          <Icons.TextTool />
        </Button>
        <Text>Text</Text>
      </ButtonContainer>
      <ButtonContainer>
        <Button>
          <Icons.Elements size={20} />
        </Button>
        <Text>Elements</Text>
      </ButtonContainer>
      <ButtonContainer>
        <Button>
          <Icons.Media />
        </Button>
        <Text>Media</Text>
      </ButtonContainer>
      <ButtonContainer>
        <Button>
          <Icons.AiTools size={20} color={theme.colors.grey3} />
        </Button>
        <Text>Ai Images</Text>
      </ButtonContainer>
      <ButtonContainer>
        <Button>
          <Icons.Shortcut />
        </Button>
        <Text>Shortcuts</Text>
      </ButtonContainer>
    </Block>
  )
}

export default Sidebar
