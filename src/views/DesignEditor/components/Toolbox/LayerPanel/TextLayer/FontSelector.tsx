import clsx from "clsx"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import React, { useState } from "react"
import { queryFonts } from "~/store/slices/fonts/actions"
import { useSelector } from "react-redux"
import useAppContext from "~/hooks/useAppContext"
import { useDebounce } from "use-debounce"
import { useStyletron } from "styletron-react"
import { useAppDispatch } from "~/store/store"
import { useEditor } from "@layerhub-io/react"
import { groupBy } from "lodash"
import { selectAllFonts } from "~/store/slices/fonts/selectors"
import { loadFonts } from "~/utils/fonts"
import { Block } from "baseui/block"
import InfiniteScrolling from "~/components/InfiniteScrolling/InfiniteScrolling"
const FontSelector = () => {
  const [activeState, setActiveState] = useState(false)
  const [currentFont, setCurrenFont] = useState("OpenSans-Regular")
  const [hasMore, setHasMore] = React.useState(true)
  const [pageNumber, setPageNumber] = React.useState(1)
  const [query] = React.useState("")
  const fonts = useSelector(selectAllFonts)
  const [commonFonts, setCommonFonts] = React.useState<any[]>([])
  const [searchQuery] = useDebounce(query, 250)
  const [css] = useStyletron()
  const editor = useEditor()

  const dispath = useAppDispatch()

  React.useEffect(() => {
    const grouped = groupBy(fonts, "family")
    const standardFonts = Object.keys(grouped).map((key) => {
      const familyFonts = grouped[key]
      const standardFont = familyFonts.find((familyFont) => familyFont.postScriptName.includes("-Regular"))
      if (standardFont) {
        return standardFont
      }
      return familyFonts[familyFonts.length - 1]
    })
    setCommonFonts(standardFonts)
  }, [fonts])

  const handleFontFamilyChange = async (x: any) => {
    if (editor) {
      const font = {
        name: x.postScriptName,
        url: x.url,
      }
      setCurrenFont(x.postScriptName)
      await loadFonts([font])

      editor.objects.update({
        fontFamily: x.postScriptName,
        fontURL: font.url,
      })
    }
  }

  React.useEffect(() => {
    dispath(
      queryFonts({
        query: searchQuery,
        skip: pageNumber,
        take: 100,
      })
    )
    setHasMore(false)
    if (!searchQuery) {
      setHasMore(true)
    } else {
      setHasMore(false)
    }
  }, [searchQuery])

  const fetchData = React.useCallback(() => {
    if (!searchQuery) {
      dispath(
        queryFonts({
          query: searchQuery,
          skip: pageNumber,
          take: 100,
        })
      )
    }

    setPageNumber(pageNumber + 1)
  }, [pageNumber, searchQuery])

  return (
    <div className={classes.dropdownWrapper}>
      <div
        className={clsx(classes.dropDownHeader, "d-flex flex-1 pointer")}
        onClick={() => {
          setActiveState(!activeState)
        }}
      >
        <div className="d-flex align-items-center justify-content-start">
          <p className={classes.dropdownHeading}>{currentFont}</p>
        </div>
        <div className="flex-1"></div>
        <div className={activeState ? classes.reverseArrow : ""}>
          <Icons.ChevronDown size={"14"} />
        </div>
      </div>
      <div className={activeState ? classes.expandedDropDowon : classes.collapseDropDown}>
        <>
          <Block $style={{ display: "grid", gap: "0.2rem", width: "230px" }}>
            <InfiniteScrolling fetchData={fetchData} hasMore={hasMore}>
              <Block $style={{ display: "grid" }}>
                {commonFonts.map((font, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleFontFamilyChange(font)}
                      className={css({
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        fontSize: "14px",
                        padding: "0 12px",
                        width: "232px",
                        ":hover": {
                          backgroundColor: "rgb(245,246,247)",
                        },
                      })}
                      id={font.id}
                    >
                      <img src={font.preview} />
                      {/* <LazyLoadImage url={font.preview} /> */}
                    </div>
                  )
                })}
              </Block>
            </InfiniteScrolling>
          </Block>
        </>{" "}
      </div>
    </div>
  )
}

export default FontSelector
