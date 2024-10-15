import { forwardRef, useState, useEffect } from 'react';


const FieldColor = forwardRef(({ isDisplayed, validation, onValidate, colorOptions }, ref) => {
    const [inputColor, setInputColor] = useState("");

    // Validate color select when changed. 
    useEffect(() => {
        onValidate("color", inputColor);
    }, [inputColor]);


    function onUnfocus(event) {
        onValidate(event.target.name, inputColor)
    }

    return (
        <>
            {isDisplayed && <div>
                <label htmlFor="input-color">Favoritfärg</label>
                <select
                    ref={ref}
                    name="color"
                    id="input-color"
                    onChange={(evt) => setInputColor(evt.target.value)}
                    value={inputColor}
                    onBlur={onUnfocus}
                    className={(validation == "failed") ? "field-failed" : (validation == "valid") ? "field-valid" : ""}
                >
                    {colorOptions.map((opt, idx) => <option key={idx} value={opt.value}>{opt.label}</option>)}
                </select>
            </div>}
        </>
    );
});

export default FieldColor;