function calculateMolarity() {
    const mass = parseFloat(document.getElementById("mass").value);
    const massUnit = document.getElementById("massUnit").value;
    const formulaWeight = parseFloat(document.getElementById("formulaWeight").value);
    const volume = parseFloat(document.getElementById("volume").value);
    const volumeUnit = document.getElementById("volumeUnit").value;

    if (isNaN(mass) || isNaN(formulaWeight) || isNaN(volume)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    let massInGrams;
    switch (massUnit) {
        case 'micrograms': massInGrams = mass * 1e-6; break;
        case 'milligrams': massInGrams = mass * 1e-3; break;
        case 'grams': massInGrams = mass; break;
        case 'kilograms': massInGrams = mass * 1e3; break;
    }

    let volumeInLiters;
    switch (volumeUnit) {
        case 'microliter': volumeInLiters = volume * 1e-6; break;
        case 'milliliter': volumeInLiters = volume * 1e-3; break;
        case 'liter': volumeInLiters = volume; break;
    }

    let molarity = massInGrams / (formulaWeight * volumeInLiters);
    let molarityUnit = "M";

    if (molarity < 1) {
        molarity *= 1e3;
        molarityUnit = "mM";
    }
    if (molarity < 1) {
        molarity *= 1e3;
        molarityUnit = "µM";
    }
    if (molarity < 1) {
        molarity *= 1e3;
        molarityUnit = "nM";
    }
    if (molarity < 1) {
        molarity *= 1e3;
        molarityUnit = "pM";
    }
    if (molarity < 1) {
        molarity *= 1e3;
        molarityUnit = "fM";
    }

    const resultElement = document.getElementById("result");
    resultElement.textContent = `Molarity | 摩尔浓度 = ${molarity.toFixed(3)} ${molarityUnit}`;
    resultElement.style.display = "block";
}
