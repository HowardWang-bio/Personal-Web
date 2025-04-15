// 将浓度转换为统一单位（mM）| Convert concentration to unified units (mM)
function convertToMillimolar(value, unit) {
    if (unit === 'M') return value * 1000;
    if (unit === 'uM') return value / 1000;
    return value; // 默认为mM | Default is mM
}

// 将体积转换为统一单位（μL）| Convert volume to unified units (μL)
function convertToMicroliter(value, unit) {
    if (unit === 'mL') return value * 1000;
    if (unit === 'L') return value * 1_000_000;
    return value; // 默认为μL | Default is μL
}

// 格式化体积显示 | Format volume display
function formatVolume(value) {
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(4) + ' L';
    if (value >= 1000) return (value / 1000).toFixed(4) + ' mL';
    return value.toFixed(4) + ' μL';
}

// 计算混合液 | Calculate mixture
function calculateMix() {
    // 获取输入值 | Get input values
    const initialGlucose = parseFloat(document.getElementById('initialGlucose').value) || 0;
    const finalGlucose = parseFloat(document.getElementById('finalGlucose').value) || 0;
    const initialBHB = parseFloat(document.getElementById('initialBHB').value) || 0;
    const finalBHB = parseFloat(document.getElementById('finalBHB').value) || 0;
    const finalVolume = parseFloat(document.getElementById('finalVolume').value) || 0;
    const wellCount = parseFloat(document.getElementById('wellCount').value) || 0;
    const stockGlucose = parseFloat(document.getElementById('stockGlucose').value) || 0;
    const stockBHB = parseFloat(document.getElementById('stockBHB').value) || 0;
    
    // 获取单位 | Get units
    const unitInitialGlucose = document.getElementById('unitInitialGlucose').value;
    const unitFinalGlucose = document.getElementById('unitFinalGlucose').value;
    const unitInitialBHB = document.getElementById('unitInitialBHB').value;
    const unitFinalBHB = document.getElementById('unitFinalBHB').value;
    const unitVolume = document.getElementById('unitVolume').value;
    const unitStockGlucose = document.getElementById('unitStockGlucose').value;
    const unitStockBHB = document.getElementById('unitStockBHB').value;
    
    // 验证输入 | Validate inputs
    if (finalVolume <= 0 || wellCount <= 0) {
        document.getElementById('results').innerHTML = 
            '<p class="error">Please enter valid volume and well count values | 请输入有效的体积和孔数值</p>';
        return;
    }
    
    if (stockGlucose <= 0 || stockBHB <= 0) {
        document.getElementById('results').innerHTML = 
            '<p class="error">Please enter valid stock concentrations | 请输入有效的储备液浓度</p>';
        return;
    }
    
    // 浓度单位转换为统一单位 (mM) | Convert concentrations to unified units (mM)
    const initialGlucoseInMM = convertToMillimolar(initialGlucose, unitInitialGlucose);
    const finalGlucoseInMM = convertToMillimolar(finalGlucose, unitFinalGlucose);
    const initialBHBInMM = convertToMillimolar(initialBHB, unitInitialBHB);
    const finalBHBInMM = convertToMillimolar(finalBHB, unitFinalBHB);
    const stockGlucoseInMM = convertToMillimolar(stockGlucose, unitStockGlucose);
    const stockBHBInMM = convertToMillimolar(stockBHB, unitStockBHB);
    
    // 体积单位转换为统一单位 (μL) | Convert volumes to unified units (μL)
    const finalVolumeInUL = convertToMicroliter(finalVolume, unitVolume);
    const totalVolume = finalVolumeInUL * wellCount;
    
    // 计算需要添加的葡萄糖量 | Calculate glucose to add
    const glucoseToAddPerWell = (finalGlucoseInMM - initialGlucoseInMM) * finalVolumeInUL / stockGlucoseInMM;
    const totalGlucoseToAdd = glucoseToAddPerWell * wellCount;
    
    // 计算需要添加的BHB量 | Calculate BHB to add
    const bhbToAddPerWell = (finalBHBInMM - initialBHBInMM) * finalVolumeInUL / stockBHBInMM;
    const totalBHBToAdd = bhbToAddPerWell * wellCount;
    
    // 计算混合液中的培养基量 | Calculate media in the mixture
    const mediaPerWell = finalVolumeInUL - glucoseToAddPerWell - bhbToAddPerWell;
    const totalMedia = mediaPerWell * wellCount;
    
    // 格式化输出结果 | Format output results
    let resultsHTML = '<h3>Calculation Results | 计算结果</h3>' +
        '<div class="result-section">' +
        '<h4>For Each Well | 每孔需要</h4>' +
        '<p>Glucose solution to add | 需添加葡萄糖溶液: <strong>' + formatVolume(glucoseToAddPerWell) + '</strong></p>' +
        '<p>BHB solution to add | 需添加BHB溶液: <strong>' + formatVolume(bhbToAddPerWell) + '</strong></p>' +
        '<p>Media to add | 需添加培养基: <strong>' + formatVolume(mediaPerWell) + '</strong></p>' +
        '</div>' +
        '<div class="result-section">' +
        '<h4>Total for ' + wellCount + ' Wells | ' + wellCount + '孔总需要</h4>' +
        '<p>Total glucose solution | 总葡萄糖溶液: <strong>' + formatVolume(totalGlucoseToAdd) + '</strong></p>' +
        '<p>Total BHB solution | 总BHB溶液: <strong>' + formatVolume(totalBHBToAdd) + '</strong></p>' +
        '<p>Total media | 总培养基: <strong>' + formatVolume(totalMedia) + '</strong></p>' +
        '<p>Master mix total volume | 主混合液总体积: <strong>' + formatVolume(totalVolume) + '</strong></p>' +
        '</div>';
    
    // 显示结果 | Display results
    document.getElementById('results').innerHTML = resultsHTML;
} 