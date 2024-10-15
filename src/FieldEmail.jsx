import { forwardRef, useState } from 'react';


const FieldEmail = forwardRef(({ isDisplayed, validation, onValidate }, ref) => {
    const [inputEmail, setInputEmail] = useState("");

    function onKeyPress(event) {
        if (event.key == "Enter") {
            onValidate(event.target.name, inputEmail);
        }
    }

    function onUnfocus(event) {
        onValidate(event.target.name, inputEmail)
    }

    return (
        <>
            {isDisplayed && <div>
                <label htmlFor='input-email'>E-postadress</label>
                <input
                    ref={ref}
                    type="email"
                    name="email"
                    id="input-email"
                    value={inputEmail}
                    onChange={(evt) => setInputEmail(evt.target.value)}
                    onKeyUp={onKeyPress}
                    onBlur={onUnfocus}
                    className={(validation == "failed") ? "field-failed" : (validation == "valid") ? "field-valid" : ""}
                />
                {validation == "failed" && <div className="field-failed-msg">Måste vara en giltig e-postadress.</div>}
            </div>}
        </>
    );
});

export default FieldEmail;