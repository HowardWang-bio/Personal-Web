function calculateMixture() {
    const volume1 = parseFloat(document.getElementById("volume1").value);
    const volumeUnit1 = document.getElementById("volumeUnit1").value;
    const concentration1 = parseFloat(document.getElementById("concentration1").value);
    const concentrationUnit1 = document.getElementById("concentrationUnit1").value;

    const volume2 = parseFloat(document.getElementById("volume2").value);
    const volumeUnit2 = document.getElementById("volumeUnit2").value;
    const concentration2 = parseFloat(document.getElementById("concentration2").value);
    const concentrationUnit2 = document.getElementById("concentrationUnit2").value;

    if (isNaN(volume1) || isNaN(concentration1) || isNaN(volume2) || isNaN(concentration2)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Convert volumes to liters
    const convertVolumeToLiters = (volume, unit) => {
        switch (unit) {
            case "milliliter": return volume / 1000;
            case "liter": return volume;
        }
    };

    // Convert concentrations to grams per liter
    const convertConcentrationToGramsPerLiter = (concentration, unit) => {
        switch (unit) {
            case "g/L": return concentration;
            case "mg/mL": return concentration; // 1 mg/mL = 1 g/L
        }
    };

    const vol1Liters = convertVolumeToLiters(volume1, volumeUnit1);
    const vol2Liters = convertVolumeToLiters(volume2, volumeUnit2);
    const conc1GramsPerLiter = convertConcentrationToGramsPerLiter(concentration1, concentrationUnit1);
    const conc2GramsPerLiter = convertConcentrationToGramsPerLiter(concentration2, concentrationUnit2);

    const totalMass = (vol1Liters * conc1GramsPerLiter) + (vol2Liters * conc2GramsPerLiter);
    const totalVolume = vol1Liters + vol2Liters;
    const finalConcentration = totalVolume > 0 ? totalMass / totalVolume : 0;

    const resultElement = document.getElementById("result");
    resultElement.textContent = `Final Concentration | 最终浓度: ${finalConcentration.toFixed(2)} g/L`;
    resultElement.style.display = "block";
}
