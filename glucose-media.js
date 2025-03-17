function calculateMedia() {
    const volume = parseFloat(document.getElementById("volume").value);
    const volumeUnit = document.getElementById("volumeUnit").value;
    const concentration = parseFloat(document.getElementById("concentration").value);
    const concentrationUnit = document.getElementById("concentrationUnit").value;

    if (isNaN(volume) || isNaN(concentration)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    let volumeInLiters;
    switch (volumeUnit) {
        case "microliter":
            volumeInLiters = volume * 1e-6;
            break;
        case "milliliter":
            volumeInLiters = volume * 1e-3;
            break;
        case "liter":
            volumeInLiters = volume;
            break;
    }

    let concentrationInGramsPerLiter;
    switch (concentrationUnit) {
        case "g/L":
            concentrationInGramsPerLiter = concentration;
            break;
        case "mg/mL":
            concentrationInGramsPerLiter = concentration; // 1 mg/mL = 1 g/L
            break;
    }

    const glucoseMass = concentrationInGramsPerLiter * volumeInLiters;

    const resultElement = document.getElementById("result");
    resultElement.textContent = `Glucose required | 所需葡萄糖: ${glucoseMass.toFixed(2)} g`;
    resultElement.style.display = "block";
}
