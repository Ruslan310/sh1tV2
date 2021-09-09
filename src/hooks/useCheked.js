import {useState} from "react";

export default function useChecked(initialValue) {
    const [checked, setValue] = useState(initialValue)

    const onChange = e => {
        setValue(e.target ? e.target.checked : e);
        console.log(e)
    }

    return {
        checked, onChange
    }
}