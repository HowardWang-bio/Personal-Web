function convertGlucose() {
    const glucoseValue = parseFloat(document.getElementById("glucoseValue").value);
    const glucoseUnit = document.getElementById("glucoseUnit").value;

    if (isNaN(glucoseValue)) {
        alert("Please enter a valid glucose value.");
        return;
    }

    let convertedValue, convertedUnit;

    if (glucoseUnit === "mg/dL") {
        convertedValue = glucoseValue / 18.0182;
        convertedUnit = "mmol/L";
    } else {
        convertedValue = glucoseValue * 18.0182;
        convertedUnit = "mg/dL";
    }

    const resultElement = document.getElementById("result");
    resultElement.textContent = `Converted Value | 转换后的值: ${convertedValue.toFixed(2)} ${convertedUnit}`;
    resultElement.style.display = "block";
}
