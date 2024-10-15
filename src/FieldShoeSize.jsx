import { forwardRef, useState } from 'react';


const FieldShoeSize = forwardRef(({ isDisplayed, validation, onValidate }, ref) => {
    const [inputShoeSize, setInputShoeSize] = useState("");

    function onKeyPress(event) {
        if (event.key == "Enter") {
            onValidate(event.target.name, inputShoeSize);
        }
    }

    function onUnfocus(event) {
        onValidate(event.target.name, inputShoeSize)
    }

    return (
        <>
            {isDisplayed && <div>
                <label htmlFor='input-shoeSize'>Skostorlek</label>
                <input
                    ref={ref}
                    type="number"
                    name="shoeSize"
                    id="input-shoeSize"
                    value={inputShoeSize}
                    onChange={(evt) => setInputShoeSize(evt.target.value)}
                    onKeyUp={onKeyPress}
                    onBlur={onUnfocus}
                    className={(validation == "failed") ? "field-failed" : (validation == "valid") ? "field-valid" : ""}
                />
                {validation == "failed" && <div className="field-failed-msg">Ange din skostorlek, mellan 24-55.</div>}
            </div>}
        </>
    );
});

export default FieldShoeSize;