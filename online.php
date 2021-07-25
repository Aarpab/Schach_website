<!DOCTYPE html>

<html>
    <head>
        <title>Schach online</title>
        <link rel="stylesheet" type="text/css" href="online.css">
    </head>

    <body>
        <!--<?php
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
            }
        ?>-->

        <?php
            echo $spieler1 . " gegen " . $spieler2;
        ?>

        <div id="div_feld">
            <form action="online.php" method="POST">
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
    </body>
</html>