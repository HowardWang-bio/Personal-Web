function calculateVolume() {
    const mass = parseFloat(document.getElementById("mass").value);
    const massUnit = document.getElementById("massUnit").value;
    const molarity = parseFloat(document.getElementById("molarity").value);
    const molarityUnit = document.getElementById("molarityUnit").value;
    const formulaWeight = parseFloat(document.getElementById("formulaWeight").value);

    if (isNaN(mass) || isNaN(molarity) || isNaN(formulaWeight)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    let massInGrams;
    switch (massUnit) {
        case "micrograms": massInGrams = mass * 1e-6; break;
        case "milligrams": massInGrams = mass * 1e-3; break;
        case "grams": massInGrams = mass; break;
        case "kilograms": massInGrams = mass * 1e3; break;
    }

    let molarityInMolar;
    switch (molarityUnit) {
        case "M": molarityInMolar = molarity; break;
        case "mM": molarityInMolar = molarity * 1e-3; break;
        case "µM": molarityInMolar = molarity * 1e-6; break;
    }

    const volumeInLiters = massInGrams / (molarityInMolar * formulaWeight);

    let volume, unit;
    if (volumeInLiters >= 1) {
        volume = volumeInLiters;
        unit = "L";
    } else if (volumeInLiters >= 1e-3) {
        volume = volumeInLiters * 1e3;
        unit = "mL";
    } else {
        volume = volumeInLiters * 1e6;
        unit = "µL";
    }

    const resultElement = document.getElementById("result");
    resultElement.textContent = `Volume | 体积 = ${volume.toFixed(3)} ${unit}`;
    resultElement.style.display = "block";
}
