function Figur (name, farbe, feld, bild, nummer=0) {
    this.name = name;
    this.farbe = farbe;
    this.feld = feld;
    this.bild = bild;
    this.nummer = nummer;
}

var figuren = [];

for (i = 0; i < felder.length; i += 2) {
    var art = ""; farbe = "", nummer = 0, farbe_bool = false, zahlen = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (i2 = 0; i2 < felder[i].length; i2++) {
        if (felder[i][i2] == "_") {
            farbe_bool = true;
        }
        else {
            if (farbe_bool === false) {
                art += felder[i][i2];
            }
            else {
                if (!zahlen.includes(felder[i][i2])) {
                    farbe += felder[i][i2];
                }
                else {
                    nummer = parseInt(felder[i][i2]);
                }
            }
        }
    }

    figuren.push(new Figur(art, farbe, figuren[i + 1], "Bilder/" + art + "_" + farbe + ".png", nummer));
}

for (i=0; i < figuren.length; i++) {
    document.getElementById(figuren[i].feld).children[0].src = figuren[i].bild;

    if (figuren[i].name == "bauer") {
        document.getElementById(figuren[i].feld).children[0].style.marginLeft = "17px";
    }
    else if (figuren[i].name == "turm") {
        document.getElementById(figuren[i].feld).children[0].style.marginLeft = "13px";
    }
}

var ausgewaelt = "";

function gedrueckt (feld) {
    if (ausgewaelt === "") {
        for (i = 0; i < figuren.length; i++) {
            if (figuren[i].feld == feld.id) {
                ausgewaelt = figuren[i];
                document.getElementById(figuren.feld).style.backgroundColor = "yellow";
            }
        }
    }
    else {
        document.getElementById("input_figur").value = ausgewaelt.name + "_" + ausgewaelt.farbe + ausgewaelt.nummer;
        document.getElementById("input_feld").value = feld.id;
        document.getElementById("submit").click();
    }
}