function calculateCellCulture() {
    const initialCells = parseFloat(document.getElementById("initialCells").value);
    const desiredCells = parseFloat(document.getElementById("desiredCells").value);
    const currentVolume = parseFloat(document.getElementById("currentVolume").value);
    const currentVolumeUnit = document.getElementById("currentVolumeUnit").value;

    if (isNaN(initialCells) || isNaN(desiredCells) || isNaN(currentVolume)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    let volumeInMilliliters;
    switch (currentVolumeUnit) {
        case 'milliliter': volumeInMilliliters = currentVolume; break;
        case 'liter': volumeInMilliliters = currentVolume * 1000; break;
    }

    const requiredVolume = (desiredCells / initialCells) * volumeInMilliliters;
    const additionalVolume = requiredVolume - volumeInMilliliters;

    const resultElement = document.getElementById("result");
    resultElement.textContent = `Add ${additionalVolume.toFixed(2)} mL to reach desired cell count. | 添加 ${additionalVolume.toFixed(2)} 毫升以达到所需细胞数。`;
    resultElement.style.display = "block";
}
