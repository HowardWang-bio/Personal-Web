function calculateDilution() {
    const stockConcentration = parseFloat(document.getElementById("stockConcentration").value);
    const stockUnit = document.getElementById("stockUnit").value;
    const finalConcentration = parseFloat(document.getElementById("finalConcentration").value);
    const finalUnit = document.getElementById("finalUnit").value;
    const finalVolume = parseFloat(document.getElementById("finalVolume").value);
    const finalVolumeUnit = document.getElementById("finalVolumeUnit").value;

    if (isNaN(stockConcentration) || isNaN(finalConcentration) || isNaN(finalVolume)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    const convertToMolar = (concentration, unit) => {
        switch (unit) {
            case "M": return concentration;
            case "mM": return concentration * 1e-3;
            case "µM": return concentration * 1e-6;
        }
    };

    const convertToLiters = (volume, unit) => {
        switch (unit) {
            case "microliter": return volume * 1e-6;
            case "milliliter": return volume * 1e-3;
            case "liter": return volume;
        }
    };

    const stockConcMolar = convertToMolar(stockConcentration, stockUnit);
    const finalConcMolar = convertToMolar(finalConcentration, finalUnit);
    const finalVolLiters = convertToLiters(finalVolume, finalVolumeUnit);

    const requiredStockVolume = (finalConcMolar * finalVolLiters) / stockConcMolar;
    const requiredDiluentVolume = finalVolLiters - requiredStockVolume;

    const resultElement = document.getElementById("result");
    resultElement.textContent = `Mix ${requiredStockVolume.toFixed(3)} L of stock solution with ${requiredDiluentVolume.toFixed(3)} L diluent. | 将 ${requiredStockVolume.toFixed(3)} 升储备液与 ${requiredDiluentVolume.toFixed(3)} 升稀释液混合。`;
    resultElement.style.display = "block";
}
