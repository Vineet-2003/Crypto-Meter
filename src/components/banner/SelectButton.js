import React from 'react'

const SelectButton = ({children, selected, onClick }) => {
    console.log(children)
  return (
    <div>
        <span
        onClick={onClick}
        style={{
            border: "1px solid yellow",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            cursor: "pointer",
            fontFamily: "var(--font-family)",
            backgroundColor: (selected ? "yellow" : " "),
            color: (selected ? "black" : " "),
            fontWeight: (selected ? "800" : "500"),
            "&:hover": {
                backgroundColor: 'yellow',
                color: "black",
            },
            width: "22%",
            marginTop: 20,

        }}
        >{children}</span>
    </div>
  )
}

export default SelectButton