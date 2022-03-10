import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { useState } from "react"

interface Props {

    items:string[]
    checked ?:string[]
    onChange:(items:string[])=>void
}
const CheckBoxButtons = ({items, checked, onChange}:Props) => {

    const [checkedItems, setcheckedItems]= useState(checked || [])

    const handleChecked=(value:string)=>{

        const currentIndex=checkedItems.findIndex(item=>item===value)
        let newChecked:string[]=[]

        if (currentIndex == -1) newChecked=[...checkedItems,value]
        else newChecked= checkedItems.filter(item=>item !==value)
        setcheckedItems(newChecked)
        onChange(newChecked)
    }

    return (

        <FormGroup sx={{ mb: 2, p: 2 }}>
            {items.map(item => (
                <FormControlLabel 
                control={<Checkbox 
                            checked={checkedItems.indexOf(item) !==-1 }
                            onClick={()=>handleChecked(item)}/>} 
                label={item} 
                key={item} />
            ))}
        </FormGroup>
    )
}

export default CheckBoxButtons