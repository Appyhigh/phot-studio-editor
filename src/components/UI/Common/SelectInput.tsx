const SelectInput = ({ handleChange }: any) => {
  return (
    <select
      onChange={(e:any)=>{
        handleChange(e.target.value)
      }}
      name="downloadOption"
      id="downloadOption"
      style={{
        position: "relative",
        border: "1px solid #F1F1F5",
        borderRadius: "4px",
        padding: "12px 20px 16px 12px",
        width: "428px",
        color: "#696974",
        fontFamily: "Rubik",
      }}
    >
      <option value="jpg">JPG</option>
      <option value="png">PNG</option>
      <option value="jpeg">JPEG</option>
      <option value="svg">SVG</option>

    </select>
  )
}

export default SelectInput
