import { useState, useEffect, useRef } from "react";
import FieldName from "./FieldName";
import FieldEmail from "./FieldEmail";
import FieldShoeSize from "./FieldShoeSize";
import FieldColor from "./FieldColor";


export default function DynamicForm() {
    const colorOptions = [
        { value: "", label: "-- Välj en färg --" },
        { value: "lightseagreen", label: "Light Sea Green" },
        { value: "lightsalmon", label: "Light Salmon" },
        { value: "black", label: "Black" },
        { value: "white", label: "White" },
        { value: "orange", label: "Orange" },
        { value: "yellow", label: "Yellow" },
        { value: "blue", label: "Blue" },
        { value: "green", label: "Green" },
        { value: "red", label: "Red" }
    ];

    // Track field validation
    const [validFields, setValidFields] = useState({ name: "pending", email: "pending", color: "pending", shoeSize: "pending" });

    // Refs to input components, used to pass focus to the next one. 
    const fieldRefs = {
        name: useRef(null),
        email: useRef(null),
        color: useRef(null),
        shoeSize: useRef(null)
    };

    // Set focus depending on what fields are shown... 
    useEffect(() => {
        if (validFields.name == "valid" && validFields.email == "valid" && validFields.color == "valid" && validFields.shoeSize == "valid") {
            // fieldRefs.color.current.focus();
        }
        else if (validFields.name == "valid" && validFields.email == "valid" && validFields.color == "valid" && validFields.shoeSize != "valid") {
            fieldRefs.shoeSize.current.focus();
        }
        else if (validFields.name == "valid" && validFields.email == "valid" && validFields.color != "valid" && validFields.shoeSize != "valid") {
            fieldRefs.color.current.focus();
        }
        else if (validFields.name == "valid" && validFields.email != "valid" && validFields.color != "valid" && validFields.shoeSize != "valid") {
            console.log("REF!", fieldRefs.email.current);
            fieldRefs.email.current.focus();
        }
    }, [validFields]);


    // Click on The Final Button...
    function onButtonClick(event) {
        console.log("SUBMIT!");
        alert("Bra jobbat!");
    }

    // Validation of field input.
    function validateField(element, value) {
        console.log("VALIDATE=", element, ", value=", value);
        switch (element) {
            case "name":
                // Check name length
                if ((value.length > 3) && (value.length <= 50)) {
                    console.log("Name is valid!");
                    setValidFields((curr) => { return { ...curr, name: "valid" } });
                }
                else {
                    setValidFields((curr) => { return { ...curr, name: "failed" } });
                }
                break;
            case "email":
                // Pattern similar to HTML5 email input type, since React seems to disable HTML form constraints?  
                if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
                    console.log("Email is valid!");
                    setValidFields((curr) => { return { ...curr, email: "valid" } });
                }
                else {
                    setValidFields((curr) => { return { ...curr, email: "failed" } });
                }
                break;
            case "color":
                // Check if input is one of the valid options
                if (value.length && colorOptions.map((opt) => opt.value).includes(value)) {
                    console.log("Color is valid!");
                    setValidFields((curr) => { return { ...curr, color: "valid" } });
                }
                else {
                    setValidFields((curr) => { return { ...curr, color: "failed" } });
                }
                break;
            case "shoeSize":
                // Check shoe size number constraints. 
                value = Number(value);
                if (!isNaN(value) && (value >= 24) && (value <= 55)) {
                    console.log("Shoe Size is valid!");
                    setValidFields((curr) => { return { ...curr, shoeSize: "valid" } });
                }
                else {
                    setValidFields((curr) => { return { ...curr, shoeSize: "failed" } });
                }
                break;
        }
    }

    function getFieldsAreValid(fields) {
        for (const field of fields) {
            if (!validFields[field] || validFields[field] != "valid") {
                return false;
            }
        }
        return true;
    }


    return (<>
        <FieldName ref={fieldRefs.name} isDisplayed={true} validation={validFields.name} onValidate={validateField} />
        <FieldEmail ref={fieldRefs.email} isDisplayed={getFieldsAreValid(["name"])} validation={validFields.email} onValidate={validateField} />
        <FieldColor ref={fieldRefs.color} isDisplayed={getFieldsAreValid(["name", "email"])} validation={validFields.color} onValidate={validateField} colorOptions={colorOptions} />
        <FieldShoeSize ref={fieldRefs.shoeSize} isDisplayed={getFieldsAreValid(["name", "email", "color"])} validation={validFields.shoeSize} onValidate={validateField} />
        {getFieldsAreValid(["name", "email", "color", "shoeSize"]) && <button onClick={onButtonClick}>Spara!</button>}
    </>);
}