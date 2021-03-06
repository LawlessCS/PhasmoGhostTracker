let evidence;
let selected_evidence;
let ghost_data;

function setup() {
    // Load necessary data
    evidence = loadEvidence();
    selected_evidence = ["null", "null", "null"];    
    ghost_data = loadGhosts();

    console.log("Data loaded!")
    
    createComboBoxes();
    
    createShowAllButton();
    
    createClearButton();

    console.log("Combo boxes created!")
}

function loadEvidence() {
    // Data from https://phasmophobia.fandom.com/wiki/Evidence

    let evidence = [
        "DOTS Projector",
        "EMF Level 5",
        "Fingerprints",
        "Freezing Temperatures",
        "Ghost Orbs",
        "Ghost Writing",
        "Spirit Box",        
    ];

    console.log("Evidence loaded!");    
    return evidence;
}

function loadGhosts() {    
    // Data from https://phasmophobia.fandom.com/wiki/Ghosts

    let ghosts = new Map();    

    ghosts.set("Banshee", new Ghost(["Ghost Orbs", "Fingerprints", "DOTS Projector"], "A Banshee will only target one person at a time", "Banshees fear the Crucifix and will be less aggressive when near one"));
    ghosts.set("Demon", new Ghost(["Freezing Temperatures", "Ghost Writing", "Fingerprints"], "Demons will attack more often than any other Ghost", "Asking a Demon successful questions on the Ouija Board won't lower the user's sanity"));
    ghosts.set("Goryo", new Ghost(["EMF Level 5", "Fingerprints", "DOTS Projector"], "A Goryo will usually only show itself on camera if there are no people nearby", "They are rarely seen far from their place of death"));
    ghosts.set("Hantu", new Ghost(["Fingerprints", "Ghost Orbs", "Freezing Temperatures"], "Moves faster in colder areas", "Moves slower in warmer areas"));
    ghosts.set("Jinn", new Ghost(["EMF Level 5", "Freezing Temperatures", "Fingerprints"], "A Jinn will travel at a faster speed if its victim is far away", "Turning off the locations power source will prevent the Jinn from using its ability"));
    ghosts.set("Mare", new Ghost(["Ghost Orbs", "Ghost Writing", "Spirit Box"], "A Mare will have an increased chance to attack in the dark", "Turning the lights on around the Mare will lower its chance to attack"));
    ghosts.set("Myling", new Ghost(["EMF Level 5", "Fingerprints", "Ghost Writing"], "A Myling is known to be quieter when hunting", "Mylings more frequently make paranormal sounds"));
    ghosts.set("Oni", new Ghost(["EMF Level 5", "Freezing Temperatures", "DOTS Projector"], "Onis are more active when people are nearby and have been seen moving objects at great speed", "Being more active makes Onis easier to find and identify"));
    ghosts.set("Phantom", new Ghost(["Spirit Box", "Fingerprints", "DOTS Projector"], "Looking at a Phantom will considerably drop your sanity", "Taking a photo of the Phantom will make it temporarily disappear"));
    ghosts.set("Poltergeist", new Ghost(["Ghost Writing", "Spirit Box", "Fingerprints"], "A Poltergeist can throw huge amounts of objects at once", "A Poltergeist is almost ineffective in an empty room"));
    ghosts.set("Revenant", new Ghost(["Ghost Orbs", "Ghost Writing", "Freezing Temperatures"], "A Revenant will travel at a significantly faster speed when hunting a victim", "Hiding from the Revenant will cause it to move very slowly"));
    ghosts.set("Shade", new Ghost(["EMF Level 5", "Ghost Writing", "Freezing Temperatures"], "Being shy means the Ghost will be harder to find", "The Ghost will not enter hunting mode if there is multiple people nearby"));
    ghosts.set("Spirit", new Ghost(["EMF Level 5", "Ghost Writing", "Spirit Box"], "Nothing lol", "Using Smudge Sticks on a spirit will stop it attacking for a long period of time"));
    ghosts.set("Wraith", new Ghost(["EMF Level 5", "Spirit Box", "DOTS Projector"], "Wraiths almost never touch the ground meaning it can't be tracked by footsteps", "Wraiths have a toxic reaction to Salt"));
    ghosts.set("Yokai", new Ghost(["Ghost Orbs", "Spirit Box", "DOTS Projector"], "Talking near a Yokai will anger it and cause it to attack more often", "While hunting, it can only hear voices close to it"));
    ghosts.set("Yurei", new Ghost(["Ghost Orbs", "Freezing Temperatures", "DOTS Projector"], "Yureis have been known to have a stronger effect on people sanity", "Smudging the Yurei's room will cause it to not wander around the location for a long time"));

    console.log("Ghost data loaded!");
    return ghosts;
}

function createComboBoxes() {    
    // Find body element and create div for combo boxes
    body = document.getElementsByTagName("body")[0];
    comboBoxes = document.createElement("span");
    comboBoxes.id = "ComboBoxes";

    // Create combo boxes
    for (let i = 0; i < 3; i++) {
        createComboBox(i, comboBoxes);
    }

    // Display combo box div
    body.appendChild(comboBoxes);
}

// Creates combo box with evidence list under parent element
function createComboBox(id, parent) {
    // Find page body
    let body = document.getElementsByTagName("body")[0];
    // Create combo box
    let cb = document.createElement("select");

    // Run lambda function when combo box value is changed
    cb.addEventListener("change", (event) => {
        console.log(event);
        updateComboBoxes();
    });

    // Create placeholder text item
    let option = document.createElement("option");
    option.text = "Evidence #" + (id + 1);
    option.selected = "true";
    option.disabled = "true";
    
    // Add placeholder to combo-box
    cb.appendChild(option);

    // Create entry for each evidence type
    evidence.forEach((name) => {
        option = document.createElement("option");
        option.text = name;

        // Show option in combo box if not already selected
        if(!selected_evidence.includes(name)) {
            cb.appendChild(option);
        }
        // But show in combo box if it was selected in THIS box
        if (selected_evidence[id] == name) {  
            cb.appendChild(option);          
            option.selected = "true";
        }
    });

    // Show combo-box on page
    parent.appendChild(cb);
}

// Store selected combo box values and create new ones
function updateComboBoxes() {
    // Find all combo boxes on page
    boxes = document.getElementsByTagName("select");

    // Store value from each combo box
    for (let i = 0; i < boxes.length; i++) {
        if(!boxes[i].value.startsWith("Evidence")) {
            selected_evidence[i] = boxes[i].value;
        }      
    }
    
    console.log("Selected evidence: " + selected_evidence);

    // Delete all combo boxes
    let comboBoxes = document.getElementById("ComboBoxes");
    comboBoxes.innerHTML = "";

    console.log("Combo boxes cleared!");

    // Create new combo boxes
    for (let i = 0; i < 3; i++) {
        createComboBox(i, comboBoxes);
    }

    createTable();
}

// Create table showing remaining ghost types
function createTable(showAll = false) {
    tables = document.getElementsByTagName("table");
    if (tables.length != 0) {
        tables[0].parentElement.removeChild(tables[0]);
    }
    
    // Create table elements
    let body = document.getElementsByTagName("body")[0];
    let table = document.createElement("table");
    let tableHead = document.createElement("thead");
    let tableBody = document.createElement("tbody");
    let tableRow = document.createElement("tr");
    
    // Table header items
    addData(tableRow, "Ghost Type");
    addData(tableRow, "Evidence #1");
    addData(tableRow, "Evidence #2");
    addData(tableRow, "Evidence #3");

    if(screen.width > 500) {
        addData(tableRow, "Strength");
        addData(tableRow, "Weakness");
    }
    
    tableHead.append(tableRow);
    table.appendChild(tableHead);

    // Rows for each ghost
    ghost_data.forEach((attr, name) => {
        let skip = false;

        // Check if ghost matches evidence
        for (let i = 0; i < 3; i++) {
            if (selected_evidence[i] != "null") {
                if(!attr.evidence.includes(selected_evidence[i])) {
                    // If ghost doesn't match:
                    // skip adding it to the table
                    skip = true;
                }
                else {
                    let loc = attr.evidence.indexOf(selected_evidence[i]);
                    [attr.evidence[i], attr.evidence[loc]] = [attr.evidence[loc], attr.evidence[i]]
                }
            }
        }

        // Only add row if ghost matches evidence
        if (!skip || showAll) {
            tableRow = document.createElement("tr");

            // Ghost name
            addData(tableRow, name);

            // Ghost Evidence
            for (let i = 0; i < attr.evidence.length; i++) {
                addData(tableRow, attr.evidence[i]);
            }

            // Ghost strength and weakness
            if (screen.width > 500) {
                addData(tableRow, attr.strength);
                addData(tableRow, attr.weakness);
            }

            // Add row to table
            tableBody.appendChild(tableRow);
        }
    });

    // Append table body to table element
    table.appendChild(tableBody);

    // Show table on page
    body.appendChild(table);
}

function createShowAllButton() {
    let body = document.getElementsByTagName("body")[0];
    let clearBtn = document.createElement("button");
    clearBtn.textContent = "Show All";
    clearBtn.addEventListener("click", () => {createTable(true)});

    body.appendChild(clearBtn);
}

function createClearButton() {
    let body = document.getElementsByTagName("body")[0];
    let clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear";
    clearBtn.addEventListener("click", () => {location.reload()});

    body.appendChild(clearBtn);
}

function addData(row, data) {
    // Create table data element with text
    let td = document.createElement("td");
    let text = document.createTextNode(data);

    // Assign text to table data element
    td.appendChild(text);
    // Append table data element to row
    row.appendChild(td);
}