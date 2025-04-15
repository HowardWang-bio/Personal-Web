// 控制显示指定数量的片段输入字段
function showFragmentFields() {
    let fragmentCount = document.getElementById("fragmentCount").value;
    for (let i = 1; i <= 5; i++) {
        document.getElementById("fragment" + i).style.display = i <= fragmentCount ? "block" : "none";
    }
    document.getElementById("results").style.display = "none";
}

// 计算Gibson Assembly所需的各片段量
function calculate() {
    let fragmentCount = document.getElementById("fragmentCount").value;
    let lmolArray = [];
    let totalLmol = 0;

    // 计算每个片段的L/mol值和总L/mol
    for (let i = 1; i <= fragmentCount; i++) {
        let size = parseFloat(document.getElementById("size" + i).value);
        let conc = parseFloat(document.getElementById("conc" + i).value);

        if (isNaN(size) || isNaN(conc)) {
            document.getElementById("results").innerHTML = "Please fill in all fields with valid numbers | 请为所有字段输入有效数字";
            document.getElementById("results").style.display = "block";
            return;
        }

        // 正确计算L/mol
        let lmol = size / conc;
        lmolArray.push(lmol);
        totalLmol += lmol;
    }

    let resultsHTML = "<h3>Results | 结果</h3>";

    // 根据比例计算5 µL和1 µL的所需量
    for (let i = 1; i <= fragmentCount; i++) {
        let lmol = lmolArray[i - 1];
        let for5ul = (lmol / totalLmol) * 5;
        let for1ul = for5ul / 5;

        resultsHTML += `<p><strong>Fragment ${i} | 片段 ${i}</strong></p>
                        <p>L/mol: ${lmol.toFixed(2)}</p>
                        <p>Amount for 5 µL | 5 µL所需量: ${for5ul.toFixed(2)} µL</p>
                        <p>Amount for 1 µL | 1 µL所需量: ${for1ul.toFixed(2)} µL</p>
                        <hr>`;
    }

    document.getElementById("results").innerHTML = resultsHTML;
    document.getElementById("results").style.display = "block";
} 