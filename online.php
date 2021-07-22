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
                        }
                    }
                }
            }
        ?>

        <div id="menü">
            <a id="online" href="anmeldung.html">Online</a><br>
            <a id="offline" href="offline.html">Offline</a><br>
            <a href="löschen.php">Account löschen</a>
        </div>
    </body>
</html>