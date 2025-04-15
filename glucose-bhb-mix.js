// 将浓度转换为统一单位（mM）
function convertToMillimolar(value, unit) {
    if (unit === 'M') return value * 1000;
    if (unit === 'uM') return value / 1000;
    return value; // 默认为mM
}

// 将体积转换为统一单位（μL）
function convertToMicroliter(value, unit) {
    if (unit === 'mL') return value * 1000;
    if (unit === 'L') return value * 1_000_000;
    return value; // 默认为μL
}

// 格式化体积显示
function formatVolume(value) {
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(4) + ' L';
    if (value >= 1000) return (value / 1000).toFixed(4) + ' mL';
    return value.toFixed(4) + ' μL';
}

// 计算混合液
function calculateMix() {
    // 获取输入值并转换为统一单位
    const g0 = convertToMillimolar(parseFloat(document.getElementById('initialGlucose').value), document.getElementById('unitInitialGlucose').value);
    const g1 = convertToMillimolar(parseFloat(document.getElementById('finalGlucose').value), document.getElementById('unitFinalGlucose').value);
    const b0 = convertToMillimolar(parseFloat(document.getElementById('initialBHB').value), document.getElementById('unitInitialBHB').value);
    const b1 = convertToMillimolar(parseFloat(document.getElementById('finalBHB').value), document.getElementById('unitFinalBHB').value);
    const V = convertToMicroliter(parseFloat(document.getElementById('finalVolume').value), document.getElementById('unitVolume').value);
    const N = parseInt(document.getElementById('wellCount').value);
    const gs = convertToMillimolar(parseFloat(document.getElementById('stockGlucose').value), document.getElementById('unitStockGlucose').value);
    const bs = convertToMillimolar(parseFloat(document.getElementById('stockBHB').value), document.getElementById('unitStockBHB').value);

    // 验证输入
    if (isNaN(g0) || isNaN(g1) || isNaN(b0) || isNaN(b1) || isNaN(V) || isNaN(N) || isNaN(gs) || isNaN(bs)) {
        alert("Please enter valid numbers for all fields | 请为所有字段输入有效数字");
        return;
    }
    
    if (gs <= g0 || gs <= g1) {
        alert("Glucose stock concentration must be higher than initial and final concentrations | 葡萄糖储备液浓度必须高于初始和最终浓度");
        return;
    }
    
    if (bs <= b0 || bs <= b1) {
        alert("BHB stock concentration must be higher than initial and final concentrations | BHB储备液浓度必须高于初始和最终浓度");
        return;
    }

    // 计算方程系数
    const A1 = gs;
    const B1 = -g0;
    const C1 = g1 * V - g0 * V;

    const A2 = -bs;
    const B2 = -b0 + bs;
    const C2 = b1 * V - b0 * V;

    // 解线性方程组
    const denom = A1 * B2 - A2 * B1;
    const a = (C1 * B2 - C2 * B1) / denom;
    const x = (A1 * C2 - A2 * C1) / denom;
    const bhbVol = x - a;
    const totalMix = a + bhbVol;

    // 计算主混合液总量
    const totalGlucose = a * N;
    const totalBHB = bhbVol * N;
    const totalMixPerWell = totalMix;

    // 显示结果
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = `
        <h3>Results | 结果</h3>
        <p><strong>Required Volumes per Well | 每孔所需体积:</strong></p>
        <p>Volume of Glucose from Stock | 储备液中葡萄糖体积: ${formatVolume(a)}</p>
        <p>Volume of BHB from Stock | 储备液中BHB体积: ${formatVolume(bhbVol)}</p>
        <p>Total Volume of Additive Mix per Well | 每孔添加混合液总体积: ${formatVolume(totalMixPerWell)}</p>
        
        <p><strong>Master Mix for ${N} Wells | ${N}孔主混合液:</strong></p>
        <p>Total Glucose Volume from Stock | 储备液中葡萄糖总体积: ${formatVolume(totalGlucose)}</p>
        <p>Total BHB Volume from Stock | 储备液中BHB总体积: ${formatVolume(totalBHB)}</p>
        <p>Total Master Mix Volume | 主混合液总体积: ${formatVolume(totalGlucose + totalBHB)}</p>
    `;
    resultsElement.style.display = "block";
} 