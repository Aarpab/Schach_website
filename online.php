<!DOCTYPE html>

<html>
    <head>
        <title>Schach online</title>
        <link rel="stylesheet" type="text/css" href="online.css">
    </head>

    <body>
        <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                if (!empty($_POST["name"]) && !empty($_POST["passwort"])) {
                    $servername = "localhost";
                    $nutzername = "root";
                    $pw = "";
                    $dbname = "schach";

                    $conn = new mysqli($servername, $nutzername, $pw, $dbname);

                    if ($conn -> connect_error) {
                        echo "<script>window.alert('Bei der Verbindung zum Server ist ein Fehler aufgetreten')</script>";
                    }
                    else {
                        $sql = $conn -> prepare("SELECT Passwort FROM User WHERE Name=?");

                        $sql -> bind_param("s", $_POST["name"]);
                        $sql -> execute();

                        $sql -> bind_result($res_passwort);

                        $richtig = false;

                        while ($sql -> fetch()) {
                            if (password_verify($_POST["passwort"], $res_passwort)) {
                                $richtig = true;
                                break;
                            }
                        }

                        $sql -> close();
                        $conn -> close();

                        if ($richtig === false) {
                            header("Location: anmeldung.html");
                        }
                    }
                }
                else {
                    header("Location: anmeldung.html");
                }
            }
            else {
                header("Location: anmeldung.html");
            }

            $servername = "localhost";
            $nutzername = "root";
            $pw = "";
            $dbname = "schach";

            $conn = new mysqli($servername, $nutzername, $pw, $dbname);

            if ($conn -> connect_error) {
                echo "<script>window.alert('Bei der Verbindung zum Server ist ein Fehler aufgetreten')</script>";
            }
            else {
                $sql = $conn -> prepare("SELECT spielend FROM User WHERE Name=?");

                $sql -> bind_param("s", $_POST["name"]);
                $sql -> execute();

                $sql -> bind_result($res_spielend);

                if ($sql -> fetch()) {
                    if ($res_spielend === 0) {
                        $sql -> close();

                        $sql = $conn -> prepare("SELECT * FROM Spiele WHERE Spieler2 IS Null");

                        $sql -> execute();

                        $sql -> bind_result($res_id, $res_spieler1, $res_spieler2);

                        if ($sql -> fetch()) {
                            $id = $res_id;
                            $spieler1 = $res_spieler1;
                            $spieler2 = $_POST["name"];
                            $sqieler_nummer = 2;

                            $sql -> close();

                            $sql = $conn -> prepare("UPDATE Spiele SET Spieler2=? WHERE spiele.ID=?;");

                            $sql -> bind_param("si", $_POST["name"], $id);
                            $sql -> execute();

                            $sql -> close();

                            $sql = $conn -> prepare("UPDATE User SET spielend=true WHERE User.Name=?");

                            $sql -> bind_param("s", $_POST["name"]);
                            $sql -> execute();

                            $sql -> close();
                        }
                        else {
                            $sql -> close();

                            $sql = $conn -> prepare("INSERT INTO Spiele (Spieler1) VALUES(?)");

                            $sql -> bind_param("s", $_POST["name"]);
                            $sql -> execute();

                            $sql -> close();

                            $sql = $conn -> prepare("SELECT ID FROM Spiele WHERE Spieler1=?");

                            $sql -> bind_param("s", $_POST["name"]);
                            $sql -> execute();

                            $sql -> bind_result($res_id);

                            if ($sql -> fetch()) {
                                $file = fopen("Spiele/" . $res_id . ".txt", "w");

                                fwrite($file, "bauer_weiss1\na2\nbauer_weiss2\nb2\nbauer_weiss3\nc3\nbauer_weiss4\nd2\nbauer_weiss5\ne2\nbauer_weiss6\nf2\nbauer_weiss7\ng2\nbauer_weiss8\nh2\nlaefer_weiss1\nc1\nlaefer_weiss2\nf1\nspringer_weiss1\nb1\nspringer_weiss2\ng1\nturm_weiss1\na1\nturm_weiss2\nh1\ndame_weiss\nd1\nkoenig_weiss\ne1\nbauer_schwarz1\na7\nbauer_schwarz2\nb7\nbauer_schwarz3\nc7\nbauer_schwarz4\nd7\nbauer_schwarz5\ne7\nbauer_schwarz6\nf7\nbauer_schwarz7\ng7\nbauer_schwarz8\nh7\nlaefer_schwarz1\nc8\nlaefer_schwarz2\nf8\nspringer_schwarz1\nb8\nspringer_schwarz2\ng8\nturm_schwarz1\na8\nturm_schwarz2\nh8\ndame_schwarz\nd8\nkoenig_schwarz\ne8\n");

                                fclose($file);
                            }

                            $sql -> close();

                            while (true) {
                                $sql = $conn -> prepare("SELECT Spieler1, Spieler2 FROM Spiele WHERE Spieler1=? AND NOT Spieler2 IS NULL");

                                $sql -> bind_param("s", $_POST["name"]);
                                $sql -> execute();

                                $sql -> bind_result($res_spieler1, $res_spieler2);

                                if ($sql -> fetch()) {
                                    $spieler1 = $_POST["name"];
                                    $spieler2 = $res_spieler2;
                                    $sqieler_nummer = 1;

                                    $sql -> close();
                                    break;
                                }

                                $sql -> close();

                                sleep(3);
                            }

                            $sql = $conn -> prepare("UPDATE User SET spielend=true WHERE User.Name=?");

                            $sql -> bind_param("s", $_POST["name"]);
                            $sql -> execute();

                            $sql-> close();
                        }

                        $amZug = 1;
                    }
                    else {
                        $spieler1 = $_POST["spieler1_name"];
                        $spieler2 = $_POST["spieler2_name"];
                        $spieler_nummer = $_POST["spieler_nummer"];
                    }
                }

                $sql = $conn -> prepare("SELECT ID FROM Spiele WHERE Spieler1=? OR Spieler2=?");

                $sql -> bind_param("ss", $_POST["name"], $_POST["name"]);
                $sql -> execute();

                $sql -> bind_result($res_id);

                if ($sql -> fetch()) {
                    $file = fopen("Spiele/" . $res_id . ".txt", "r");
                    $zeilen = array();

                    while (!feof($file)) {
                        $zeile = fgets($file);
                        $neu = "";

                        for ($i = 0; $i < strlen($zeile) - 1; $i++) {
                            $neu = $neu . $zeile[$i];
                        }

                        if ($neu != "") {
                            array_push($zeilen, $neu);
                        }
                    }

                    fclose($file);

                    echo "<script>var felder = [];\n";

                    for ($i = 0; $i < count($zeilen); $i++) {
                        echo "felder.push('" . $zeilen[$i] . "');\n";
                    }

                    echo "</script>";
                }
            }
        ?>

        <?php
            echo $spieler1 . " gegen " . $spieler2;
        ?>

        <div id="div_feld">
            <form action="online.php" method="POST">
                <table>
                    <tr>
                        <td id="a8" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="b8" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="c8" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="d8" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="e8" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="f8" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="g8" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="h8" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>
                    </tr>

                    <tr>
                        <td id="a7" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="b7" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="c7" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="d7" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="e7" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="f7" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="g7" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="h7" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>
                    </tr>

                    <tr>
                        <td id="a6" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="b6" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="c6" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="d6" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="e6" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="f6" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="g6" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="h6" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>
                    </tr>

                    <tr>
                        <td id="a5" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="b5" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="c5" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="d5" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="e5" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="f5" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="g5" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="h5" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="feld_dame" onclick="funk_verwandeln(this)">
                            <img>
                        </td>

                        <td id="feld_turm" onclick="funk_verwandeln(this)">
                            <img>
                        </td>
                    </tr>

                    <tr>
                        <td id="a4" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="b4" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="c4" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="d4" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="e4" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="f4" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="g4" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="h4" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="feld_springer" onclick="funk_verwandeln(this)">
                            <img>
                        </td>

                        <td id="feld_läufer" onclick="funk_verwandeln(this)">
                            <img>
                        </td>
                    </tr>

                    <tr>
                        <td id="a3" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="b3" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="c3" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="d3" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="e3" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="f3" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="g3" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="h3" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>
                    </tr>

                    <tr>
                        <td id="a2" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="b2" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="c2" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="d2" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="e2" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="f2" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="g2" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="h2" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>
                    </tr>

                    <tr>
                        <td id="a1" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="b1" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="c1" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="d1" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="e1" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="f1" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="g1" class="schwarz feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>

                        <td id="h1" class="weiß feld" onclick="gedrueckt(this)">
                            <img class="bild">
                        </td>
                    </tr>
                </table>

                <input type="hidden" name="name" value="<?php echo htmlspecialchars(stripslashes(trim($_POST["name"])));?>">
                <input type="hidden" name="passwort" value="<?php echo htmlspecialchars(stripslashes(trim($_POST["passwort"])));?>">
                <input type="hidden" name="spieler1_name" value="<?php echo $spieler1;?>">
                <input type="hidden" name="spieler2_name" value="<?php echo $spieler2;?>">
                <input type="hidden" name="spieler_nummer" value="<?php echo $spieler_nummer;?>">
                <input type="hidden" name="amZug" value="<?php echo $amZug;?>">
                <input type="hidden" name="feld">
                <input type="submit" id="submit">
            </form>
        </div>

        <script src="online.js"></script>
    </body>
</html>