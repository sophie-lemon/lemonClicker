let clickCount = 0;
let pickerCount = 0;
let pickerAuto = 0;
let standCount = 0;
let standAuto = 0;
let treeCount = 0;
let treeAuto = 0;
let factoryCount = 0;
let factoryAuto = 0;
let labCount = 0;


//klicks und bounce-----------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    let lemon = document.getElementById('lemon');

    //musik
    document.getElementById('bgMusic').addEventListener('pause', () =>
    {
        document.getElementById('bgMusic').play();
    })

    lemon.addEventListener("click", function() {
        clickCount++;
        document.getElementById('click-count').textContent = clickCount;
        document.getElementById('click-count').innerText = clickCount.toFixed(1); // Rundet auf 1 Nachkommastelle
        console.log(clickCount);

        // Entferne die Animation, falls sie bereits läuft
        lemon.style.animation = "none";

        // Erzwinge einen Reflow, um die Animation zurückzusetzen
        lemon.offsetHeight; // Dieser Zugriff erzwingt einen Reflow

        // Füge die Bounce-Animation wieder hinzu
        lemon.style.animation = "bounce 0.2s"; // Kürzere Animationsdauer
    });
});


//shop ein- und ausfahren-----------------------------------------------------------------------------------------------
function toggleShopItems() {
    let shopItems = document.getElementById('shopItems');

    if (shopItems.style.display === 'none') {
        shopItems.style.display = 'block';

    } else {
        shopItems.style.display = 'none';
    }
}

//----------------------------------------------------------------------------------------------------------------------
//Lemon Picker----------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('shop1').addEventListener('click', function() {
        if (clickCount >= 20) {
            clickCount -= 20;
            pickerCount++;
            pickerAuto += 0.1;
            document.getElementById('picker-count').innerText = pickerCount.toFixed(0); // Anzeige der Picker-Anzahl aktualisieren
            addRandomPicker();

            // Speichern der Daten im Local Storage
            saveDataToLocalStorage();
        }
    });

    // Beim Laden der Seite überprüfen, ob gespeicherte Daten vorhanden sind
    loadDataFromLocalStorage();
});

function addRandomPicker() {
    const pickerContainer = document.getElementById('picker-container');
    const picker = document.createElement('img');
    picker.src = 'img/lemonPicker.png';
    picker.alt = 'Lemon Picker';
    picker.style.position = 'absolute';

    // Zufällige Position innerhalb des Containers berechnen
    const containerRect = pickerContainer.getBoundingClientRect();
    const pickerWidth = 50; // Breite des Pickers, muss mit CSS übereinstimmen
    const pickerHeight = 50; // Höhe des Pickers, muss mit CSS übereinstimmen
    const maxX = containerRect.width - pickerWidth;
    const maxY = containerRect.height - pickerHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    picker.style.left = `${randomX}px`;
    picker.style.top = `${randomY}px`;

    pickerContainer.appendChild(picker);
}


// Funktion zum Speichern der Daten im Local Storage
function saveDataToLocalStorage() {
    localStorage.setItem('pickerCount', pickerCount);
    localStorage.setItem('pickerAuto', pickerAuto);

    // Speichern der Picker-Positionen
    const pickerPositions = [];
    const pickerElements = document.querySelectorAll('#picker-container img');
    pickerElements.forEach(picker => {
        pickerPositions.push({
            left: picker.style.left,
            top: picker.style.top
        });
    });
    localStorage.setItem('pickerPositions', JSON.stringify(pickerPositions));
}

// Funktion zum Laden der Daten aus dem Local Storage
function loadDataFromLocalStorage() {
    let savedClickCount = localStorage.getItem('clickCount');
    if (savedClickCount) {
        clickCount = parseInt(savedClickCount);
    }

    let savedPickerCount = localStorage.getItem('pickerCount');
    if (savedPickerCount) {
        pickerCount = parseInt(savedPickerCount);
        document.getElementById('picker-count').innerText = pickerCount.toFixed(0);
    }

    let savedPickerAuto = localStorage.getItem('pickerAuto');
    if (savedPickerAuto !== null) {
        pickerAuto = parseFloat(savedPickerAuto);
    }

    let savedPickerPositions = localStorage.getItem('pickerPositions');
    if (savedPickerPositions) {
        let pickerPositions = JSON.parse(savedPickerPositions);
        pickerPositions.forEach(position => {
            addPickerFromSavedPosition(position.left, position.top);
        });
    }
}

// Funktion zum Hinzufügen eines Pickers basierend auf gespeicherten Positionen
function addPickerFromSavedPosition(left, top) {
    const pickerContainer = document.getElementById('picker-container');
    const picker = document.createElement('img');
    picker.src = 'img/lemonPicker.png';
    picker.alt = 'Lemon Picker';
    picker.style.position = 'absolute';
    picker.style.left = left;
    picker.style.top = top;
    pickerContainer.appendChild(picker);
}

//----------------------------------------------------------------------------------------------------------------------
//Lemon Stand----------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('shop2').addEventListener('click', function() {
        if(clickCount >= 200) {
            clickCount -= 200;
            standCount++;
            standAuto += 1;
            document.getElementById('stand-count').innerText = standCount.toFixed(0); // Rundet auf 1 Nachkommastelle
            addRandomStand();
            saveDataToLocalStorage2();
        }
    });
    loadDataFromLocalStorage2();
});

//random placen
function addRandomStand() {
    const standContainer = document.getElementById('stand-container');
    const stand = document.createElement('img');
    stand.src = 'img/lemonStand.png';
    stand.alt = 'Lemon Stand';
    stand.style.position = 'absolute';

    // Zufällige Position innerhalb des Containers berechnen
    const containerStand = standContainer.getBoundingClientRect();
    const standWidth = 50;
    const standHeight = 60;
    const maxX = containerStand.width - standWidth;
    const maxY = containerStand.height - standHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    stand.style.left = `${randomX}px`;
    stand.style.top = `${randomY}px`;

    standContainer.appendChild(stand);
}

// Funktion zum Speichern der Daten im Local Storage
function saveDataToLocalStorage2() {
    localStorage.setItem('standCount', standCount);
    localStorage.setItem('standAuto', standAuto);

    // Speichern der Positionen
    const standPositions = [];
    const standElements = document.querySelectorAll('#stand-container img');
    standElements.forEach(stand => {
        standPositions.push({
            left: stand.style.left,
            top: stand.style.top
        });
    });
    localStorage.setItem('standPositions', JSON.stringify(standPositions));
}

// Funktion zum Laden der Daten aus dem Local Storage
function loadDataFromLocalStorage2() {

    let savedStandCount = localStorage.getItem('standCount');
    if (savedStandCount) {
        standCount = parseInt(savedStandCount);
        document.getElementById('stand-count').innerText = standCount.toFixed(0);
    }

    let savedStandAuto = localStorage.getItem('standAuto');
    if (savedStandAuto !== null) {
        standAuto = parseFloat(savedStandAuto);
    }

    let savedStandPositions = localStorage.getItem('standPositions');
    if (savedStandPositions) {
        let standPositions = JSON.parse(savedStandPositions);
        standPositions.forEach(position => {
            addStandFromSavedPosition(position.left, position.top);
        });
    }
}

// Funktion zum Hinzufügen eines Pickers basierend auf gespeicherten Positionen
function addStandFromSavedPosition(left, top) {
    const standContainer = document.getElementById('stand-container');
    const stand = document.createElement('img');
    stand.src = 'img/lemonStand.png';
    stand.alt = 'Lemon stand';
    stand.style.position = 'absolute';
    stand.style.left = left;
    stand.style.top = top;
    standContainer.appendChild(stand);
}

//----------------------------------------------------------------------------------------------------------------------
//Lemon tree----------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('shop3').addEventListener('click', function() {
        if(clickCount >= 5000) {
            clickCount = clickCount - 5000;
            treeCount = treeCount + 1;
            treeAuto += 40;
            document.getElementById('tree-count').innerText = treeCount.toFixed(0); // Rundet auf 1 Nachkommastelle
            addRandomTree();
            saveDataToLocalStorage3();
        }
    });
    loadDataFromLocalStorage3();
});

//random placen
function addRandomTree() {
    const treeContainer = document.getElementById('tree-container');
    const tree = document.createElement('img');
    tree.src = 'img/lemonTree.png';
    tree.alt = 'Lemon Stand';
    tree.style.position = 'absolute';

    // Zufällige Position innerhalb des Containers berechnen
    const containerTree = treeContainer.getBoundingClientRect();
    const treeWidth = 50;
    const treeHeight = 107;
    const maxX = containerTree.width - treeWidth;
    const maxY = containerTree.height - treeHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    tree.style.left = `${randomX}px`;
    tree.style.top = `${randomY}px`;

    treeContainer.appendChild(tree);
}

// Funktion zum Speichern der Daten im Local Storage
function saveDataToLocalStorage3() {
    localStorage.setItem('treeCount', treeCount);
    localStorage.setItem('treeAuto', treeAuto);

    // Speichern der Positionen
    const treePositions = [];
    const treeElements = document.querySelectorAll('#tree-container img');
    treeElements.forEach(tree => {
        treePositions.push({
            left: tree.style.left,
            top: tree.style.top
        });
    });
    localStorage.setItem('treePositions', JSON.stringify(treePositions));
}

// Funktion zum Laden der Daten aus dem Local Storage
function loadDataFromLocalStorage3() {

    let savedTreeCount = localStorage.getItem('treeCount');
    if (savedTreeCount) {
        treeCount = parseInt(savedTreeCount);
        document.getElementById('tree-count').innerText = treeCount.toFixed(0);
    }

    let savedTreeAuto = localStorage.getItem('treeAuto');
    if (savedTreeAuto !== null) {
        treeAuto = parseFloat(savedTreeAuto);
    }

    let savedTreePositions = localStorage.getItem('treePositions');
    if (savedTreePositions) {
        let treePositions = JSON.parse(savedTreePositions);
        treePositions.forEach(position => {
            addTreeFromSavedPosition(position.left, position.top);
        });
    }
}

// Funktion zum Hinzufügen eines Pickers basierend auf gespeicherten Positionen
function addTreeFromSavedPosition(left, top) {
    const treeContainer = document.getElementById('tree-container');
    const tree = document.createElement('img');
    tree.src = 'img/lemonTree.png';
    tree.alt = 'Lemon Tree';
    tree.style.position = 'absolute';
    tree.style.left = left;
    tree.style.top = top;
    treeContainer.appendChild(tree);
}
//----------------------------------------------------------------------------------------------------------------------
//Lemon Factory----------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('shop4').addEventListener('click', function() {
        if(clickCount >= 100000) {
            clickCount = clickCount - 100000;
            factoryCount = factoryCount + 1;
            factoryAuto += 300;
            document.getElementById('factory-count').innerText = factoryCount.toFixed(0); // Rundet auf 1 Nachkommastelle
            addRandomFactory();
            saveDataToLocalStorage4();
        }
    });
    loadDataFromLocalStorage4();
});

//random placen
function addRandomFactory() {
    const factoryContainer = document.getElementById('factory-container');
    const factory = document.createElement('img');
    factory.src = 'img/lemonFactory.png';
    factory.alt = 'Lemon Factory';
    factory.style.position = 'absolute';

    // Zufällige Position innerhalb des Containers berechnen
    const containerFactory = factoryContainer.getBoundingClientRect();
    const factoryWidth = 50;
    const factoryHeight = 107;
    const maxX = containerFactory.width - factoryWidth;
    const maxY = containerFactory.height - factoryHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    factory.style.left = `${randomX}px`;
    factory.style.top = `${randomY}px`;

    factoryContainer.appendChild(factory);
}

// Funktion zum Speichern der Daten im Local Storage
function saveDataToLocalStorage4() {
    localStorage.setItem('factoryCount', factoryCount);
    localStorage.setItem('factoryAuto', factoryAuto);

    // Speichern der Positionen
    const factoryPositions = [];
    const factoryElements = document.querySelectorAll('#factory-container img');
    factoryElements.forEach(factory => {
        factoryPositions.push({
            left: factory.style.left,
            top: factory.style.top
        });
    });
    localStorage.setItem('factoryPositions', JSON.stringify(factoryPositions));
}

// Funktion zum Laden der Daten aus dem Local Storage
function loadDataFromLocalStorage4() {

    let savedFactoryCount = localStorage.getItem('factoryCount');
    if (savedFactoryCount) {
        factoryCount = parseInt(savedFactoryCount);
        document.getElementById('factory-count').innerText = factoryCount.toFixed(0);
    }

    let savedFactoryAuto = localStorage.getItem('factoryAuto');
    if (savedFactoryAuto !== null) {
        factoryAuto = parseFloat(savedFactoryAuto);
    }

    let savedFactoryPositions = localStorage.getItem('factoryPositions');
    if (savedFactoryPositions) {
        let factoryPositions = JSON.parse(savedFactoryPositions);
        factoryPositions.forEach(position => {
            addFactoryFromSavedPosition(position.left, position.top);
        });
    }
}

// Funktion zum Hinzufügen eines Pickers basierend auf gespeicherten Positionen
function addFactoryFromSavedPosition(left, top) {
    const factoryContainer = document.getElementById('factory-container');
    const factory = document.createElement('img');
    factory.src = 'img/lemonFactory.png';
    factory.alt = 'Lemon Factory';
    factory.style.position = 'absolute';
    factory.style.left = left;
    factory.style.top = top;
    factoryContainer.appendChild(factory);
}

//----------------------------------------------------------------------------------------------------------------------
//Research Lab----------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('labBought') === 'true') {
        labCount = 1;
        addLab();
    }

    document.getElementById('shop5').addEventListener('click', function() {
        if ((clickCount >= 1000000) && (labCount === 0)) {
            labCount = 1;
            clickCount -= 1000000;
            localStorage.setItem('labBought', 'true');
            addLab();
        } else {
            clickCount -= 1000000;
            alert('You already bought a Lab'); //Lemon Tree lauter machen
        }
    });
});

function addLab() {
    const labContainer = document.getElementById('lab-container');
    const lab = document.createElement('img');
    lab.src = 'img/researchLab.png';
    lab.alt = 'Lemon Lab';
    lab.style.position = 'absolute';

    lab.addEventListener('click', function() {
        window.location.href = 'lab.html'; // Link to the new page
    });

    labContainer.appendChild(lab);
}



//----------------------------------------------------------------------------------------------------------------------
//raufzählen & speichern------------------------------------------------------------------------------------------------
setInterval(function() {
    localStorage.setItem('clickCount', clickCount);//clickcount speichern
    //gespeicherter clickcount aktualisieren

    clickCount += pickerAuto + standAuto + treeAuto + factoryAuto; // Automatische Zitronensammlung pro Sekunde
    document.getElementById('click-count').innerText = clickCount.toFixed(1); // Rundet auf 1 Nachkommastelle
}, 500);



//----------------------------------------------------------------------------------------------------------------------
//alles resetten--------------------------------------------------------------------------------------------------------
function resetGame() {
    // Variablen auf ihren Anfangswert setzen
    clickCount = 100000000;
    pickerCount = 0;
    pickerAuto = 0.0;
    standCount = 0;
    standAuto = 0;
    treeCount = 0;
    treeAuto = 0;
    factoryCount = 0;
    factoryAuto = 0;
    labCount = 0;

    // Anzeigen aktualisieren
    document.getElementById('picker-count').innerText = pickerCount.toFixed(0);
    document.getElementById('stand-count').innerText = standCount.toFixed(0);
    document.getElementById('tree-count').innerText = treeCount.toFixed(0);
    document.getElementById('factory-count').innerText = factoryCount.toFixed(0);


    // Picker-Container leeren
    const pickerContainer = document.getElementById('picker-container');
    pickerContainer.innerHTML = '';
    const standContainer = document.getElementById('stand-container');
    standContainer.innerHTML = '';
    const treeContainer = document.getElementById('tree-container');
    treeContainer.innerHTML = '';
    const factoryContainer = document.getElementById('factory-container');
    factoryContainer.innerHTML = '';
    const labContainer = document.getElementById('lab-container');
    labContainer.innerHTML = '';

    // Local Storage leeren
    localStorage.clear();
}


//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

//zurück gehen
back.src = 'labimg/goBack.png';


back.addEventListener('click', function() {
    window.location.href = 'index.html'; // Link to the new page
});

window.addEventListener('beforeunload', function() {
    localStorage.setItem('clickCount', clickCount);
});

document.addEventListener('DOMContentLoaded', function() {
    let savedClickCount = localStorage.getItem('clickCount');
    if (savedClickCount !== null) {
        clickCount = parseInt(savedClickCount, 10);
        document.getElementById('click-count').textContent = clickCount.toFixed(1);
    }
});



document.addEventListener("DOMContentLoaded", function() {
    let potion1 = document.getElementById('potion1');
    potion1.addEventListener("click", function() {
        alert('Potion1');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    let potion2 = document.getElementById('potion2');
    potion2.addEventListener("click", function() {
        alert('Potion2');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    let potion3 = document.getElementById('potion3');
    potion3.addEventListener("click", function() {
        alert('Potion3');
    });
});
