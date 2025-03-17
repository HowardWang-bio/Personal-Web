function calculateMass() {
    const concentration = parseFloat(document.getElementById("concentration").value);
    const concentrationUnit = document.getElementById("concentrationUnit").value;
    const formulaWeight = parseFloat(document.getElementById("formulaWeight").value);
    const volume = parseFloat(document.getElementById("volume").value);
    const volumeUnit = document.getElementById("volumeUnit").value;

    if (isNaN(concentration) || isNaN(formulaWeight) || isNaN(volume)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    let concentrationInMolar;
    switch (concentrationUnit) {
        case "M": concentrationInMolar = concentration; break;
        case "mM": concentrationInMolar = concentration * 1e-3; break;
        case "µM": concentrationInMolar = concentration * 1e-6; break;
        case "nM": concentrationInMolar = concentration * 1e-9; break;
    }

    let volumeInLiters;
    switch (volumeUnit) {
        case "microliter": volumeInLiters = volume * 1e-6; break;
        case "milliliter": volumeInLiters = volume * 1e-3; break;
        case "liter": volumeInLiters = volume; break;
    }

    const massInGrams = concentrationInMolar * volumeInLiters * formulaWeight;

    let mass, unit;
    if (massInGrams >= 1) {
        mass = massInGrams;
        unit = "g";
    } else if (massInGrams >= 1e-3) {
        mass = massInGrams * 1e3;
        unit = "mg";
    } else if (massInGrams >= 1e-6) {
        mass = massInGrams * 1e6;
        unit = "µg";
    } else if (massInGrams >= 1e-9) {
        mass = massInGrams * 1e9;
        unit = "ng";
    } else {
        mass = massInGrams * 1e12;
        unit = "pg";
    }

    const resultElement = document.getElementById("result");
    resultElement.textContent = `Mass | 质量 = ${mass.toFixed(3)} ${unit}`;
    resultElement.style.display = "block";
}
