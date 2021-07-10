function Figur (name, farbe, feld, bild, nummer=0) {
    this.name = name;
    this.farbe = farbe;
    this.feld = feld;
    this.bild = bild;
    this.nummer = nummer;
}

var bauer_weiss_1 = new Figur("bauer", "weiß", "a2", "Bilder/bauer_weiss.png", 1),
bauer_weiß_2 = new Figur("bauer", "weiß", "b2", "Bilder/bauer_weiss.png", 2),
bauer_weiß_3 = new Figur("bauer", "weiß", "c2", "Bilder/bauer_weiss.png", 3),
bauer_weiß_4 = new Figur("bauer", "weiß", "d2", "Bilder/bauer_weiss.png", 4),
bauer_weiß_5 = new Figur("bauer", "weiß", "e2", "Bilder/bauer_weiss.png", 5),
bauer_weiß_6 = new Figur("bauer", "weiß", "f2", "Bilder/bauer_weiss.png", 6),
bauer_weiß_7 = new Figur("bauer", "weiß", "g2", "Bilder/bauer_weiss.png", 7),
bauer_weiß_8 = new Figur("bauer", "weiß", "h2", "Bilder/bauer_weiss.png", 8),
laeufer_weiß_1 = new Figur("läufer", "weiß", "c1", "Bilder/laeufer_weiss.png", 1),
laeufer_weiß_2 = new Figur("läufer", "weiß", "f1", "Bilder/laeufer_weiss.png", 2),
springer_weiß_1 = new Figur("springer", "weiß", "b1", "Bilder/springer_weiss.png", 1),
springer_weiß_2 = new Figur("springer", "weiß", "g1", "Bilder/springer_weiss.png", 2),
turm_weiß_1 = new Figur("turm", "weiß", "a1", "Bilder/turm_weiss.png", 1),
turm_weiß_2 = new Figur("turm", "weiß", "h1", "Bilder/turm_weiss.png", 2),
dame_weiß = new Figur("dame", "weiß", "d1", "Bilder/dame_weiss.png"),
koenig_weiß = new Figur("könig", "weiß", "e1", "Bilder/koenig_weiss.png"),

bauer_schwarz_1 = new Figur("bauer", "schwarz", "a7", "Bilder/bauer_schwarz.png", 1),
bauer_schwarz_2 = new Figur("bauer", "schwarz", "b7", "Bilder/bauer_schwarz.png", 2),
bauer_schwarz_3 = new Figur("bauer", "schwarz", "c7", "Bilder/bauer_schwarz.png", 3),
bauer_schwarz_4 = new Figur("bauer", "schwarz", "d7", "Bilder/bauer_schwarz.png", 4),
bauer_schwarz_5 = new Figur("bauer", "schwarz", "e7", "Bilder/bauer_schwarz.png", 5),
bauer_schwarz_6 = new Figur("bauer", "schwarz", "f7", "Bilder/bauer_schwarz.png", 6),
bauer_schwarz_7 = new Figur("bauer", "schwarz", "g7", "Bilder/bauer_schwarz.png", 7),
bauer_schwarz_8 = new Figur("bauer", "schwarz", "h7", "Bilder/bauer_schwarz.png", 8),
laeufer_schwarz_1 = new Figur("läufer", "schwarz", "c8", "Bilder/laeufer_schwarz.png", 1),
laeufer_schwarz_2 = new Figur("läufer", "schwarz", "f8", "Bilder/laeufer_schwarz.png", 2),
springer_schwarz_1 = new Figur("springer", "schwarz", "b8", "Bilder/springer_schwarz.png", 1),
springer_schwarz_2 = new Figur("springer", "schwarz", "g8", "Bilder/springer_schwarz.png", 2),
turm_schwarz_1 = new Figur("turm", "schwarz", "a8", "Bilder/turm_schwarz.png", 1),
turm_schwarz_2 = new Figur("turm", "schwarz", "h8", "Bilder/turm_schwarz.png", 2),
dame_schwarz = new Figur("dame", "schwarz", "d8", "Bilder/dame_schwarz.png"),
koenig_schwarz = new Figur("könig", "schwarz", "e8", "Bilder/koenig_schwarz.png"),

figuren = [bauer_weiss_1, bauer_weiß_2, bauer_weiß_3, bauer_weiß_4, bauer_weiß_5, bauer_weiß_6, bauer_weiß_7, bauer_weiß_8, laeufer_weiß_1, laeufer_weiß_2, springer_weiß_1, springer_weiß_2, turm_weiß_1, turm_weiß_2, dame_weiß, koenig_weiß, bauer_schwarz_1, bauer_schwarz_2, bauer_schwarz_3, bauer_schwarz_4, bauer_schwarz_5, bauer_schwarz_6, bauer_schwarz_7, bauer_schwarz_8, laeufer_schwarz_1, laeufer_schwarz_2, springer_schwarz_1, springer_schwarz_2, turm_schwarz_1, turm_schwarz_2, dame_schwarz, koenig_schwarz];

for (i=0; i < figuren.length; i++) {
    document.getElementById(figuren[i].feld).children[0].src = figuren[i].bild;

    if (figuren[i].name == "bauer") {
        document.getElementById(figuren[i].feld).children[0].style.marginLeft = "17px";
    }
    else if (figuren[i].name == "turm") {
        document.getElementById(figuren[i].feld).children[0].style.marginLeft = "13px";
    }
}

var ausgewaehlt = "", moeglich = [], amZug = 1, schach = false, schach_figur = null, figur_bedroht = null;

var buchstaben = ["a", "b", "c", "d", "e", "f", "g", "h"], senkrechten = [], waagerechten = [], diagonalen_1 = [], diagonalen_2 = [];

//senkrechte

for (i = 0; i <= 7; i++) {
    var senkrechte = [];

    for (i2 = 1; i2 <= 8; i2++) {
        senkrechte.push(buchstaben[i] + i2);
    }

    senkrechten.push(senkrechte);
}

//waagerechte

for (i = 0; i <= 8; i++) {
    var waagerechte = [];

    for (i2 = 0; i2 <= 7; i2++) {
        waagerechte.push(buchstaben[i2] + i);
    }

    waagerechten.push(waagerechte);
}

//diagonalen1

for (i = 8; i > 0; i--) {
    var diagonale = [], buchstabe_index = 0;

    for (i2 = i; i2 <= 8; i2++) {
        diagonale.push(buchstaben[buchstabe_index] + i2);
        buchstabe_index += 1;
    }

    diagonalen_1.push(diagonale);
}

for (i = 1; i <= 7; i++) {
    var diagonale = [], zahl = 1;

    for (i2 = i; i2 <= 7; i2++) {
        diagonale.push(buchstaben[i2] + zahl);
        zahl += 1;
    }

    diagonalen_1.push(diagonale);
}

//diagonalen2

for (i = 0; i <= 7; i++) {
    var diagonale = [], zahl = 1;

    for (i2 = i; i2 >= 0; i2--) {
        diagonale.push(buchstaben[i2] + zahl);
        zahl += 1;
    }

    diagonalen_2.push(diagonale);
}

for (i = 2; i <= 8; i++) {
    var diagonale = [], buchstabe_index = 7;

    for (i2 = i; i2 <= 8; i2++) {
        diagonale.push(buchstaben[buchstabe_index] + i2);
        buchstabe_index -= 1;
    }

    diagonalen_2.push(diagonale);
}

function felder_moeglich_laeufer (fig) {
    var moeglich_l = [];

    for (i = 0; i < diagonalen_1.length; i++) {
        if (diagonalen_1[i].includes(fig.feld)) {
            for (i2 = 0; i2 < diagonalen_1[i].length; i2++) {
                if (diagonalen_1[i][i2] == fig.feld) {
                    for (i3 = i2; i3 < diagonalen_1.length; i3++) {
                        var frei = true, schlagen = false, selbst = false;

                        for (f = 0; f < figuren.length; f++) {
                            if (figuren[f].feld == diagonalen_1[i][i3]) {
                                if (figuren[f] != fig) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                                else {
                                    selbst = true;
                                }
                            }
                        }

                        if (frei === true) {
                            if (selbst === false) {
                                moeglich_l.push(diagonalen_1[i][i3]);
                            }
                        }
                        else {
                            if (schlagen === true) {
                                moeglich_l.push(diagonalen_1[i][i3]);
                            }

                            break;
                        }
                    }

                    for (i3 = i2; i3 >= 0; i3--) {
                        var frei = true, schlagen = false, selbst = false;

                        for (f = 0; f < figuren.length; f++) {
                            if (figuren[f].feld == diagonalen_1[i][i3]) {
                                if (figuren[f] != fig) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                                else {
                                    selbst = true;
                                }
                            }
                        }

                        if (frei === true) {
                            if (selbst === false) {
                                moeglich_l.push(diagonalen_1[i][i3]);
                            }
                        }
                        else {
                            if (schlagen === true) {
                                moeglich_l.push(diagonalen_1[i][i3]);
                            }

                            break;
                        }
                    }
                }
            }
        }
    }

    for (i = 0; i < diagonalen_2.length; i++) {
        if (diagonalen_2[i].includes(fig.feld)) {
            for (i2 = 0; i2 < diagonalen_2[i].length; i2++) {
                if (diagonalen_2[i][i2] == fig.feld) {
                    for (i3 = i2; i3 < diagonalen_2.length; i3++) {
                        var frei = true, schlagen = false, selbst = false;

                        for (f = 0; f < figuren.length; f++) {
                            if (figuren[f].feld == diagonalen_2[i][i3]) {
                                if (figuren[f] != fig) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                                else {
                                    selbst = true;
                                }
                            }
                        }

                        if (frei === true) {
                            if (selbst === false) {
                                moeglich_l.push(diagonalen_2[i][i3]);
                            }
                        }
                        else {
                            if (schlagen === true) {
                                moeglich_l.push(diagonalen_2[i][i3]);
                            }

                            break;
                        }
                    }

                    for (i3 = i2; i3 >= 0; i3--) {
                        var frei = true, schlagen = false, selbst = false;

                        for (f = 0; f < figuren.length; f++) {
                            if (figuren[f].feld == diagonalen_2[i][i3]) {
                                if (figuren[f] != fig) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                                else {
                                    selbst = true;
                                }
                            }
                        }

                        if (frei === true) {
                            if (selbst === false) {
                                moeglich_l.push(diagonalen_2[i][i3]);
                            }
                        }
                        else {
                            if (schlagen === true) {
                                moeglich_l.push(diagonalen_2[i][i3]);
                            }

                            break;
                        }
                    }
                }
            }
        }
    }

    return moeglich_l;
}

function felder_moeglich_turm (fig) {
    var moeglich_l = [];

    for (i = 0; i < senkrechten.length; i++) {
        if (senkrechten[i].includes(fig.feld)) {
            for (i2 = 0; i2 < senkrechten[i].length; i2++) {
                if (senkrechten[i][i2] == fig.feld) {
                    for (i3 = i2; i3 < senkrechten[i].length; i3++) {
                        var frei = true, schlagen = false, selbst = false;

                        for (f = 0; f < figuren.length; f++) {
                            if (figuren[f].feld == senkrechten[i][i3]) {
                                if (figuren[f] != fig) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                                else {
                                    selbst = true;
                                }
                            }
                        }

                        if (frei === true) {
                            if (selbst === false) {
                                moeglich_l.push(senkrechten[i][i3]);
                            }
                        }
                        else {
                            if (schlagen === true) {
                                moeglich_l.push(senkrechten[i][i3]);
                            }

                            break;
                        }
                    }

                    for (i3 = i2; i3 >= 0; i3--) {
                        var frei = true, schlagen = false, selbst = false;

                        for (f = 0; f < figuren.length; f++) {
                            if (figuren[f].feld == senkrechten[i][i3]) {
                                if (figuren[f] != fig) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                                else {
                                    selbst = true;
                                }
                            }
                        }

                        if (frei === true) {
                            if (selbst === false) {
                                moeglich_l.push(senkrechten[i][i3]);
                            }
                        }
                        else {
                            if (schlagen === true) {
                                moeglich_l.push(senkrechten[i][i3]);
                            }

                            break;
                        }
                    }
                }
            }
        }
    }

    for (i = 0; i < waagerechten.length; i++) {
        if (waagerechten[i].includes(fig.feld)) {
            for (i2 = 0; i2 < waagerechten[i].length; i2++) {
                if (waagerechten[i][i2] == fig.feld) {
                    for (i3 = i2; i3 < waagerechten[i].length; i3++) {
                        var frei = true, schlagen = false, selbst = false;

                        for (f = 0; f < figuren.length; f++) {
                            if (figuren[f].feld == waagerechten[i][i3]) {
                                if (figuren[f] != fig) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                                else {
                                    selbst = true;
                                }
                            }
                        }

                        if (frei === true) {
                            if (selbst === false) {
                                moeglich_l.push(waagerechten[i][i3]);
                            }
                        }
                        else {
                            if (schlagen === true) {
                                moeglich_l.push(waagerechten[i][i3]);
                            }

                            break;
                        }
                    }

                    for (i3 = i2; i3 >= 0; i3--) {
                        var frei = true, schlagen = false, selbst = false;

                        for (f = 0; f < figuren.length; f++) {
                            if (figuren[f].feld == waagerechten[i][i3]) {
                                if (figuren[f] != fig) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                                else {
                                    selbst = true;
                                }
                            }
                        }

                        if (frei === true) {
                            if (selbst === false) {
                                moeglich_l.push(waagerechten[i][i3]);
                            }
                        }
                        else {
                            if (schlagen === true) {
                                moeglich_l.push(waagerechten[i][i3]);
                            }

                            break;
                        }
                    }
                }
            }
        }
    }

    return moeglich_l;
}

function felder_moeglich (fig, bedroht=false) {
    var moeglich_l = [];

    if (fig.name == "bauer") {
        if (fig.farbe == "weiß") {
            if (bedroht === false) {
                for (i = 0; i < senkrechten.length; i++) {
                    if (senkrechten[i].includes(fig.feld)) {
                        for (i2 = 0; i2 < senkrechten[i].length; i2++) {
                            if (senkrechten[i][i2] == fig.feld) {
                                var frei = true;

                                for (i3 = 0; i3 < figuren.length; i3++) {
                                    if (figuren[i3].feld == senkrechten[i][i2 + 1]) {
                                        frei = false;
                                    }
                                }

                                if (frei === true) {
                                    if (fig.feld[1] == "2") {
                                        var frei2 = true;

                                        for (i3 = 0; i3 < figuren.length; i3++) {
                                            if (figuren[i3].feld == senkrechten[i][i2 + 2]) {
                                                frei2 = false;
                                            }
                                        }

                                        if (frei === true) {
                                            moeglich_l.push(senkrechten[i][i2 + 1]);
                                        }

                                        if (frei2 === true) {
                                            moeglich_l.push(senkrechten[i][i2 + 2]);
                                        }
                                    }
                                    else {
                                        moeglich_l.push(senkrechten[i][i2 + 1]);
                                    }
                                }
                            }
                        }

                        for (b = 0; b < buchstaben.length; b++) {
                            if (buchstaben[b] == fig.feld[0]) {
                                for (i2 = 0; i2 < figuren.length; i2++) {
                                    if (parseInt(figuren[i2].feld[1]) == parseInt(fig.feld[1]) + 1 && figuren[i2].feld[0] == buchstaben[b + 1] || parseInt(figuren[i2].feld[1]) == parseInt(fig.feld[1]) + 1 && figuren[i2].feld[0] == buchstaben[b - 1]) {
                                        moeglich_l.push(figuren[i2].feld);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            else {
                for (i = 0; i < senkrechten.length; i++) {
                    if (senkrechten[i].includes(fig.feld)) {
                        for (i2 = 0; i2 < senkrechten[i].length; i2++) {
                            if (senkrechten[i][i2] == fig.feld) {
                                if (i > 0) {
                                    moeglich_l.push(senkrechten[i - 1][i2 + 1]);
                                }

                                if (i < 7) {
                                    moeglich_l.push(senkrechten[i + 1][i2 + 1]);
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            if (bedroht === false) {
                for (i = 0; i < senkrechten.length; i++) {
                    if (senkrechten[i].includes(fig.feld)) {
                        for (i2 = 0; i2 < senkrechten[i].length; i2++) {
                            if (senkrechten[i][i2] == fig.feld) {
                                var frei = true;

                                for (i3 = 0; i3 < figuren.length; i3++) {
                                    if (figuren[i3].feld == senkrechten[i][i2 - 1]) {
                                        frei = false;
                                    }
                                }

                                if (frei === true) {
                                    if (fig.feld[1] == "7") {
                                        for (i3 = 0; i3 < figuren.length; i3++) {
                                            if (figuren[i3].feld == senkrechten[i][i2 - 2]) {
                                                frei = false;
                                            }
                                        }

                                        if (frei === true) {
                                            moeglich_l.push(senkrechten[i][i2 - 1], senkrechten[i][i2 - 2]);
                                        }
                                    }
                                    else {
                                        moeglich_l.push(senkrechten[i][i2 - 1]);
                                    }
                                }
                            }
                        }

                        for (b = 0; b < buchstaben.length; b++) {
                            if (buchstaben[b] == fig.feld[0]) {
                                for (i2 = 0; i2 < figuren.length; i2++) {
                                    if (parseInt(figuren[i2].feld[1]) == parseInt(fig.feld[1]) - 1 && figuren[i2].feld[0] == buchstaben[b + 1] || parseInt(figuren[i2].feld[1]) == parseInt(fig.feld[1]) - 1 && figuren[i2].feld[0] == buchstaben[b - 1]) {
                                        moeglich_l.push(figuren[i2].feld);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            else {
                for (i = 0; i < senkrechten.length; i++) {
                    if (senkrechten[i].includes(fig.feld)) {
                        for (i2 = 0; i2 < senkrechten[i].length; i2++) {
                            if (senkrechten[i][i2] == fig.feld) {
                                if (i > 0) {
                                    moeglich_l.push(senkrechten[i - 1][i2 - 1]);
                                }

                                if (i < 7) {
                                    moeglich_l.push(senkrechten[i + 1][i2 - 1]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    else if (fig.name == "läufer") {
        moeglich_l = felder_moeglich_laeufer(fig);
    }

    else if (fig.name == "springer") {
        for (i = 0; i < senkrechten.length; i++) {
            if (senkrechten[i].includes(fig.feld)) {
                for (i2 = 0; i2 < senkrechten[i].length; i2++) {
                    if (senkrechten[i][i2] == fig.feld) {
                        if (i < 7 && i2 < 6) {
                            var frei = true;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i + 1][i2 + 2] && figuren[f].farbe == fig.farbe) {
                                    frei = false;
                                }
                            }

                            if (frei === true) {
                                moeglich_l.push(senkrechten[i + 1][i2 + 2]);
                            }
                        }

                        if (i < 6 && i2 < 7) {
                            var frei = true;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i + 2][i2 + 1] && figuren[f].farbe == fig.farbe) {
                                    frei = false;
                                }
                            }

                            if (frei === true) {
                                moeglich_l.push(senkrechten[i + 2][i2 + 1]);
                            }
                        }

                        if (i < 6 && i2 > 0) {
                            var frei = true;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i + 2][i2 - 1] && figuren[f].farbe == fig.farbe) {
                                    frei = false;
                                }
                            }

                            if (frei === true) {
                                moeglich_l.push(senkrechten[i + 2][i2 - 1]);
                            }
                        }

                        if (i < 7 && i2 > 1) {
                            var frei = true;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i + 1][i2 - 2] && figuren[f].farbe == fig.farbe) {
                                    frei = false;
                                }
                            }

                            if (frei === true) {
                                moeglich_l.push(senkrechten[i + 1][i2 - 2]);
                            }
                        }

                        if (i > 0 && i2 > 1) {
                            var frei = true;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i - 1][i2 - 2] && figuren[f].farbe == fig.farbe) {
                                    frei = false;
                                }
                            }

                            if (frei === true) {
                                moeglich_l.push(senkrechten[i - 1][i2 - 2]);
                            }
                        }

                        if (i > 1 && i2 > 0) {
                            var frei = true;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i - 2][i2 - 1] && figuren[f].farbe == fig.farbe) {
                                    frei = false;
                                }
                            }

                            if (frei === true) {
                                moeglich_l.push(senkrechten[i - 2][i2 - 1]);
                            }
                        }

                        if (i > 1 && i2 < 7) {
                            var frei = true;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i - 2][i2 + 1] && figuren[f].farbe == fig.farbe) {
                                    frei = false;
                                }
                            }

                            if (frei === true) {
                                moeglich_l.push(senkrechten[i - 2][i2 + 1]);
                            }
                        }

                        if (i > 0 && i2 < 6) {
                            var frei = true;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i - 1][i2 + 2] && figuren[f].farbe == fig.farbe) {
                                    frei = false;
                                }
                            }

                            if (frei === true) {
                                moeglich_l.push(senkrechten[i - 1][i2 + 2]);
                            }
                        }
                    }
                }
            }
        }
    }

    else if (fig.name == "turm") {
        moeglich_l = felder_moeglich_turm(fig);
    }

    else if (fig.name == "dame") {
        moeglich_l = felder_moeglich_laeufer(fig);

        var moeglich_turm = felder_moeglich_turm(fig);

        for (i = 0; i < moeglich_turm.length; i++) {
            moeglich_l.push(moeglich_turm[i]);
        }
    }

    else if (fig.name == "könig") {
        for (i = 0; i < senkrechten.length; i++) {
            if (senkrechten[i].includes(fig.feld)) {
                for (i2 = 0; i2 < senkrechten[i].length; i2++) {
                    if (senkrechten[i][i2] == fig.feld) {
                        if (i2 < 7) {
                            var frei = true, schlagen = false;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i][i2 + 1]) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                            }

                            if (frei === true || schlagen === true) {
                                moeglich_l.push(senkrechten[i][i2 + 1]);
                            }
                        }

                        if (i < 7 && i2 < 7) {
                            var frei = true, schlagen = false;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i + 1][i2 + 1]) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                            }

                            if (frei === true || schlagen === true) {
                                moeglich_l.push(senkrechten[i + 1][i2 + 1]);
                            }
                        }

                        if (i < 7) {
                            var frei = true, schlagen = false;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i + 1][i2]) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                            }
                            
                            if (frei === true || schlagen === true) {
                                moeglich_l.push(senkrechten[i + 1][i2]);
                            }
                        }

                        if (i < 7 && i2 > 0) {
                            var frei = true, schlagen = false;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i + 1][i2 - 1]) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                            }

                            if (frei === true || schlagen === true) {
                                moeglich_l.push(senkrechten[i + 1][i2 - 1]);
                            }
                        }

                        if (i2 > 0) {
                            var frei = true, schlagen = false;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i][i2 - 1]) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                            }

                            if (frei === true || schlagen === true) {
                                moeglich_l.push(senkrechten[i][i2 - 1]);
                            }
                        }

                        if (i > 0 && i2 > 0) {
                            var frei = true, schlagen = false;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i - 1][i2 - 1]) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                            }

                            if (frei === true || schlagen === true) {
                                moeglich_l.push(senkrechten[i - 1][i2 - 1]);
                            }
                        }

                        if (i > 0) {
                            var frei = true, schlagen = false;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i - 1][i2]) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                            }

                            if (frei === true || schlagen === true) {
                                moeglich_l.push(senkrechten[i - 1][i2]);
                            }
                        }

                        if (i > 0 && i2 < 7) {
                            var frei = true, schlagen = false;

                            for (f = 0; f < figuren.length; f++) {
                                if (figuren[f].feld == senkrechten[i - 1][i2 + 1]) {
                                    frei = false;

                                    if (figuren[f].farbe != fig.farbe) {
                                        schlagen = true;
                                    }
                                }
                            }

                            if (frei === true || schlagen === true) {
                                moeglich_l.push(senkrechten[i - 1][i2 + 1]);
                            }
                        }
                    }
                }
            }
        }
    }

    return moeglich_l;
}

function felder_moeglich_schach () {
    var moeglich_l = [schach_figur.feld], pos_x = null, pos_y = null;

    if (schach_figur.name == "läufer" || schach_figur.name == "dame") {
        for (s = 0; s < senkrechten.length; s++) {
            if (senkrechten[s].includes(schach_figur.feld)) {
                for (s2 = 0; s2 < senkrechten.length; s2++) {
                    if (senkrechten[s2].includes(figur_bedroht.feld)) {
                        if (s < s2) {
                            pos_x = "rechts";
                        }

                        else if (s > s2) {
                            pos_x = "links";
                        }
                    }
                }
            }
        }

        for (w = 0; w < waagerechten.length; w++) {
            if (waagerechten[w].includes(schach_figur.feld)) {
                for (w2 = 0; w2 < waagerechten.length; w2++) {
                    if (waagerechten[w2].includes(figur_bedroht.feld)) {
                        if (w < w2) {
                            pos_y = "oben";
                        }

                        else if (w > w2) {
                            pos_y = "unten";
                        }
                    }
                }
            }
        }

        if (pos_x != null && pos_y != null) {
            if (pos_x == "rechts") {
                if (pos_y == "oben") {
                    var s2 = 0, w2 = 0;

                    for (s = 0; s < senkrechten.length; s++) {
                        if (senkrechten[s].includes(schach_figur.feld)) {
                            s2 = s;
                        }
                    }

                    for (w = 0; w < senkrechten[s2].length; w++) {
                        if (senkrechten[s2][w] == schach_figur.feld) {
                            w2 = w;
                        }
                    }

                    while (true) {
                        if (figur_bedroht.feld == senkrechten[s2][w2]) {
                            break;
                        }
                        else {
                            moeglich_l.push(senkrechten[s2][w2]);
                        }

                        s2++;
                        w2++;
                    }
                }
                else {
                    var s2 = 0, w2 = 0;

                    for (s = 0; s < senkrechten.length; s++) {
                        if (senkrechten[s].includes(schach_figur.feld)) {
                            s2 = s;
                        }
                    }

                    for (w = 0; w < senkrechten[s2].length; w++) {
                        if (senkrechten[s2][w] == schach_figur.feld) {
                            w2 = w;
                        }
                    }

                    while (true) {
                        if (figur_bedroht.feld == senkrechten[s2][w2]) {
                            break;
                        }
                        else {
                            moeglich_l.push(senkrechten[s2][w2]);
                        }

                        s2++;
                        w2--;
                    }
                }
            }
            else {
                if (pos_y == "oben") {
                    var s2 = 0, w2 = 0;

                    for (s = 0; s < senkrechten.length; s++) {
                        if (senkrechten[s].includes(schach_figur.feld)) {
                            s2 = s;
                        }
                    }

                    for (w = 0; w < senkrechten[s2].length; w++) {
                        if (senkrechten[s2][w] == schach_figur.feld) {
                            w2 = w;
                        }
                    }

                    while (true) {
                        if (figur_bedroht.feld == senkrechten[s2][w2]) {
                            break;
                        }
                        else {
                            moeglich_l.push(senkrechten[s2][w2]);
                        }

                        s2--;
                        w2++;
                    }
                }
                else {
                    var s2 = 0, w2 = 0;

                    for (s = 0; s < senkrechten.length; s++) {
                        if (senkrechten[s].includes(schach_figur.feld)) {
                            s2 = s;
                        }
                    }

                    for (w = 0; w < senkrechten[s2].length; w++) {
                        if (senkrechten[s2][w] == schach_figur.feld) {
                            w2 = w;
                        }
                    }

                    while (true) {
                        if (figur_bedroht.feld == senkrechten[s2][w2]) {
                            break;
                        }
                        else {
                            moeglich_l.push(senkrechten[s2][w2]);
                        }

                        s2--;
                        w2--;
                    }
                }
            }
        }
    }

    if (schach_figur.name == "turm" || schach_figur.name == "dame") {
        for (s = 0; s < senkrechten.length; s++) {
            if (senkrechten[s].includes(schach_figur.feld)) {
                for (s2 = 0; s2 < senkrechten.length; s2++) {
                    if (senkrechten[s2].includes(figur_bedroht.feld)) {
                        if (s < s2) {
                            pos_x = "rechts";
                        }

                        else if (s > s2) {
                            pos_x = "links";
                        }
                    }
                }
            }
        }

        if (pos_x == null) {
            for (w = 0; w < waagerechten.length; w++) {
                if (waagerechten[w].includes(schach_figur.feld)) {
                    for (w2 = 0; w2 < waagerechten.length; w2++) {
                        if (waagerechten[w2].includes(figur_bedroht.feld)) {
                            if (w < w2) {
                                pos_y = "oben";
                            }

                            else if (w > w2) {
                                pos_y = "unten";
                            }
                        }
                    }
                }
            }
        }

        if (pos_x == "rechts") {
            var s2 = 0, w2 = 0;

            for (s = 0; s < senkrechten.length; s++) {
                if (senkrechten[s].includes(schach_figur.feld)) {
                    s2 = s;
                }
            }

            for (w = 0; w < senkrechten[s2].length; w++) {
                if (senkrechten[s2][w] == schach_figur.feld) {
                    w2 = w;
                }
            }

            while (true) {
                if (figur_bedroht.feld == senkrechten[s2][w2]) {
                    break;
                }
                else {
                    moeglich_l.push(senkrechten[s2][w2]);
                }

                s2++;
            }
        }
        else if (pos_x == "links") {
            var s2 = 0, w2 = 0;

            for (s = 0; s < senkrechten.length; s++) {
                if (senkrechten[s].includes(schach_figur.feld)) {
                    s2 = s;
                }
            }

            for (w = 0; w < senkrechten[s2].length; w++) {
                if (senkrechten[s2][w] == schach_figur.feld) {
                    w2 = w;
                }
            }

            while (true) {
                if (figur_bedroht.feld == senkrechten[s2][w2]) {
                    break;
                }
                else {
                    moeglich_l.push(senkrechten[s2][w2]);
                }

                s2--;
            }
        }
        else if (pos_y == "oben") {
            var s2 = 0, w2 = 0;

            for (s = 0; s < senkrechten.length; s++) {
                if (senkrechten[s].includes(schach_figur.feld)) {
                    s2 = s;
                }
            }

            for (w = 0; w < senkrechten[s2].length; w++) {
                if (senkrechten[s2][w] == schach_figur.feld) {
                    w2 = w;
                }
            }

            while (true) {
                if (figur_bedroht.feld == senkrechten[s2][w2]) {
                    break;
                }
                else {
                    moeglich_l.push(senkrechten[s2][w2]);
                }

                w2++;
            }
        }
        else if (pos_y == "unten") {
            var s2 = 0, w2 = 0;

            for (s = 0; s < senkrechten.length; s++) {
                if (senkrechten[s].includes(schach_figur.feld)) {
                    s2 = s;
                }
            }

            for (w = 0; w < senkrechten[s2].length; w++) {
                if (senkrechten[s2][w] == schach_figur.feld) {
                    w2 = w;
                }
            }

            while (true) {
                if (figur_bedroht.feld == senkrechten[s2][w2]) {
                    break;
                }
                else {
                    moeglich_l.push(senkrechten[s2][w2]);
                }

                w2--;
            }
        }
    }

    return moeglich_l;
}

function gedrueckt (feld) {
    if (ausgewaehlt === "") {
        for (i=0; i < figuren.length; i++) {
            if (figuren[i].feld == feld.id) {
                if (figuren[i].farbe == "weiß" && amZug == 1 || figuren[i].farbe == "schwarz" && amZug == 2) {
                    ausgewaehlt = figuren[i];

                    for (x = 0; x < figuren.length; x++) {
                        if (figuren[x].name == "könig") {
                            for (f2 = 0; f2 < figuren.length; f2++) {
                                if (figuren[f2].farbe != figuren[x].farbe) {
                                    if (felder_moeglich(figuren[f2]).includes(figuren[x].feld)) {
                                        schach = true;
                                        schach_figur = figuren[f2];
                                        figur_bedroht = figuren[x];
                                    }
                                }
                            }
                        }
                    }
                        
                    moeglich = felder_moeglich(ausgewaehlt);

                    if (schach === true && ausgewaehlt.name != "könig") {
                        var moeglich_schach = felder_moeglich_schach();

                        for (x = 0; x < moeglich.length; x++) {
                            if (!moeglich_schach.includes(moeglich[x])) {
                                moeglich.splice(x, 1);
                                x--;
                            }
                        }
                    }

                    if (ausgewaehlt.name == "könig") {
                        for (x = 0; x < figuren.length; x++) {
                            if (figuren[x].farbe != ausgewaehlt.farbe) {
                                var moeglich_figur = felder_moeglich(figuren[x], true);

                                for (m = 0; m < moeglich_figur.length; m++) {
                                    for (m2 = 0; m2 < moeglich.length; m2++) {
                                        if (moeglich_figur.includes(moeglich[m2])) {
                                            moeglich.splice(m2, 1);
                                            m2--;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    feld.style.backgroundColor = "yellow";

                    for (i2 = 0; i2 < moeglich.length; i2++) {
                        if (moeglich[i2] != null) {
                            document.getElementById(moeglich[i2]).style.backgroundColor = "blue";
                        }
                        else {
                            moeglich.splice(i2, 1);
                            i2--;
                        }
                    }

                    break;
                }
            }
        }
    }
    else {
        for (i=0; i < figuren.length; i++) {
            if (figuren[i].feld == feld.id) {
                if (figuren[i] == ausgewaehlt) {
                    ausgewaehlt = "";
                    
                    if (feld.classList.contains("weiß")) {
                        feld.style.backgroundColor = "white";
                    }
                    else {
                        feld.style.backgroundColor = "green";
                    }

                    for (i2 = 0; i2 < document.getElementsByClassName("feld").length; i2++) {
                        if (document.getElementsByClassName("feld")[i2].style.backgroundColor = "blue") {
                            if (document.getElementsByClassName("feld")[i2].classList.contains("weiß")) {
                                document.getElementsByClassName("feld")[i2].style.backgroundColor = "white";
                            }
                            else {
                                document.getElementsByClassName("feld")[i2].style.backgroundColor = "green";
                            }
                        }
                    }
                }
            }
        }

        if (ausgewaehlt != "") {
            if (moeglich.includes(feld.id)) {
                document.getElementById(ausgewaehlt.feld).children[0].src = "";
                document.getElementById(ausgewaehlt.feld).children[0].style.marginLeft = "0px";

                if (document.getElementById(ausgewaehlt.feld).classList.contains("weiß")) {
                    document.getElementById(ausgewaehlt.feld).style.backgroundColor = "white";
                }
                else {
                    document.getElementById(ausgewaehlt.feld).style.backgroundColor = "green";
                }

                for (i=0; i < figuren.length; i++) {
                    if (figuren[i].feld == feld.id) {
                        if (ausgewaehlt.farbe != figuren[i].farbe) {
                            figuren.splice(i, 1);
                        }
                    }
                }

                ausgewaehlt.feld = feld.id;
                feld.children[0].src = ausgewaehlt.bild;

                for (i2 = 0; i2 < document.getElementsByClassName("feld").length; i2++) {
                    if (document.getElementsByClassName("feld")[i2].style.backgroundColor = "blue") {
                        if (document.getElementsByClassName("feld")[i2].classList.contains("weiß")) {
                            document.getElementsByClassName("feld")[i2].style.backgroundColor = "white";
                        }
                        else {
                            document.getElementsByClassName("feld")[i2].style.backgroundColor = "green";
                        }
                    }
                }

                if (ausgewaehlt.name == "bauer") {
                    feld.children[0].style.marginLeft = "17px";
                }
                else if (ausgewaehlt.name == "turm") {
                    feld.children[0].style.marginLeft = "13px";
                }
                else {
                    feld.children[0].style.marginLeft = "0px";
                }

                if (amZug == 1) {
                    amZug += 1;
                }
                else {
                    amZug -= 1;
                }

                schach = false;
                ausgewaehlt = "";
            }
        }
    }
}