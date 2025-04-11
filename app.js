// app.js - JavaScript logic for Soda Comparison App

const options = ["Choose", "CocaCola", "Fanta", "7Up", "Dr.Pepper"];
const types = ["Choose", "classic", "diet", "zero"];

const logoImage = [
    "https://rb.gy/awc4pg", "https://rb.gy/wznllr", "https://rb.gy/wfvvuz", "https://rb.gy/bxkfni"
];

const typeImage = [
    "https://rb.gy/qldcf5", "https://rb.gy/gynywm", "https://rb.gy/72mhfl",
    "https://rb.gy/3fp537", "https://rb.gy/we36tc", "https://rb.gy/hicflk",
    "https://rb.gy/nckgpb", "https://rb.gy/ikt4b6", "https://rb.gy/rlor5e",
    "https://rb.gy/xxhnpf", "https://rb.gy/4zp53v", "https://rb.gy/be1tdx"
];

const sodaUPCMap = {
    "CocaCola-classic": "049000050103",
    "CocaCola-diet": "04965802",
    "CocaCola-zero": "049000042566",
    "Fanta-classic": "5449000214805",
    "Fanta-zero": "5449000120960",
    "7Up-classic": "8410494300074",
    "7Up-diet": "078000000757",
    "7Up-zero": "7044612876205",
    "Dr.Pepper-classic": "07831504",
    "Dr.Pepper-diet": "078000021714",
    "Dr.Pepper-zero": "8435185953711"
  };

/*const facts = [
    "140 calories\n39g Sugar\n0mg aspartame",
    "0 Calories\n0g Sugar\n188mg aspartame",
    "0 Calories\n0g Sugar\n87mg aspartame",
    "160 calories\n44g Sugar\n0mg aspartame",
    "N/A",
    "0 calories\n0g Sugar\n0mg aspartame",
    "165 calories\n47g Sugar\n0mg aspartame",
    "0 calories\n0g Sugar\nN/A mg aspartame",
    "0 calories\n0g Sugar\nN/A mg aspartame",
    "130 calories\n26g Sugar\n0mg aspartame",
    "0 calories\n0g Sugar\n133mg aspartame",
    "0 calories\n0g Sugar\n64mg aspartame"
];*/

//const calories = [140, 0, 0, 160, "N/A", 0, 165, 0, 0, 130, 0, 0];
//const sugar = [39, 0, 0, 44, "N/A", 0, 47, 0, 0, 26, 0, 0];
//const aspartame = [0, 188, 87, 0, "N/A", 0, 0, NaN, NaN, 0, 133, 64];

var totalIndex = [];

// Populate dropdowns
document.addEventListener("DOMContentLoaded", () => {
    populateDropdown("dropdown1", options);
    populateDropdown("dropdown2", options);
    populateDropdown("dropdown1b", types);
    populateDropdown("dropdown2b", types);
});

function populateDropdown(id, array) {
    const dropdown = document.getElementById(id);
    array.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.text = opt;
        dropdown.add(option);
    });
}

// Dropdown event handlers
document.getElementById("dropdown1").addEventListener("change", () => {
    const brand = document.getElementById("dropdown1").value;
    const logoIdx = options.indexOf(brand) - 1;
    document.getElementById("image1").src = logoImage[logoIdx];
});

document.getElementById("dropdown2").addEventListener("change", () => {
    const brand = document.getElementById("dropdown2").value;
    const logoIdx = options.indexOf(brand) - 1;
    document.getElementById("image2").src = logoImage[logoIdx];
});

document.getElementById("dropdown1b").addEventListener("change", () => {
    const brand = document.getElementById("dropdown1").value;
    const type = document.getElementById("dropdown1b").value;
    const imgIdx = findImageIndex(brand, type);
    totalIndex[0] = getUPC(brand, type);
    document.getElementById("image1").src = typeImage[imgIdx];
});

document.getElementById("dropdown2b").addEventListener("change", () => {
    const brand = document.getElementById("dropdown2").value;
    const type = document.getElementById("dropdown2b").value;
    const imgIdx = findImageIndex(brand, type);
    totalIndex[1] = getUPC(brand, type);
    document.getElementById("image2").src = typeImage[imgIdx];
});

// Compare button
document.getElementById("compareButton").addEventListener("click", () => {
    const fact1 = getNutrients(totalIndex[0]);
    const fact2 = getNutrients(totalIndex[1]);
    //const result = compare(totalIndex);

    document.getElementById("text_area1").textContent = fact1;
    document.getElementById("text_area2").textContent = fact2;
    document.getElementById("text_area3").textContent = result.join("\n");
});

// Helpers
function findImageIndex(brand, type) {
    const brandIndex = options.indexOf(brand) - 1;
    const typeIndex = types.indexOf(type) - 1;
    return (brandIndex * 3) + typeIndex;
}

function getUPC(brand, type) {
    return sodaUPCMap['${brand}-${type}'];
}

function getNutrients(UPC){
    fetch(`https://world.openfoodfacts.org/api/v0/product/${upc}.json`)
  .then(res => res.json())
  .then(data => {
    const nutrients = data.product.nutriments;
    var Calories = nutrients["energy-kcal"];
    var Sugar = nutrients["sugars"];
    var Caffeine = nutrients["caffeine"];
    var Salt = nutrients["salt"];
    var Aspartame = data.product.additives_tags || [].includes("en:e951");
    return productFacts = [Calories, Sugar, Caffeine, Salt, Aspartame];
  });
}

function compare(indexes) {
    const [i1, i2] = indexes;
    const results = [];

    // Calories
    if (calories[i1] == calories[i2]) {
        results.push("Same number of calories");
    } else if (calories[i1] > calories[i2]) {
        results.push("Drink 1 has more calories");
    } else {
        results.push("Drink 2 has more calories");
    }

    // Sugar
    if (sugar[i1] == sugar[i2]) {
        results.push("Same amount of sugar");
    } else if (sugar[i1] > sugar[i2]) {
        results.push("Drink 1 has more sugar");
    } else {
        results.push("Drink 2 has more sugar");
    }

    // Aspartame
    if (aspartame[i1] === aspartame[i2]) {
        results.push("Same amount of aspartame");
    } else if (aspartame[i1] > aspartame[i2]) {
        results.push("Drink 1 has more aspartame");
    } else {
        results.push("Drink 2 has more aspartame");
    }

    return results;
}
