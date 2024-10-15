import { forwardRef, useState } from 'react';


const FieldName = forwardRef(({ isDisplayed, validation, onValidate }, ref) => {
    const [inputName, setInputName] = useState("");

    function onKeyPress(event) {
        if (event.key == "Enter") {
            onValidate(event.target.name, inputName);
        }
    }

    function onUnfocus(event) {
        onValidate(event.target.name, inputName)
    }

    return (
        <>
            {isDisplayed && <div>
                <label htmlFor='input-name'>Namn</label>
                <input
                    ref={ref}
                    type="text"
                    name="name"
                    id="input-name"
                    value={inputName}
                    onChange={(evt) => setInputName(evt.target.value)}
                    onKeyUp={onKeyPress}
                    onBlur={onUnfocus}
                    className={(validation == "failed") ? "field-failed" : (validation == "valid") ? "field-valid" : ""}
                />
                {validation == "failed" && <div className="field-failed-msg">Namn måste vara mellan 3-50 tecken.</div>}
            </div>}
        </>
    );
});

export default FieldName;