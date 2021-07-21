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
                        echo "<script>window.alert('Bei der Verbindung zum Se4rver ist ein Fehler aufgetreten')</script>";
                    }
                    else {
                        $sql = $conn -> prepare("SELECT * FROM User WHERE Name=?");

                        $sql -> bind_param("s", $_POST["name"]);
                        $sql -> execute();

                        $sql -> bind_result($res_id, $res_name, $res_passwort, $res_suchend);

                        $richtig = false;

                        while ($sql -> fetch()) {
                            if (password_verify($_POST["passwort"], $res_passwort)) {
                                $richtig = true;
                                break;
                            }
                        }

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
        ?>

        <div id="menü">
            <a id="online" href="anmeldung.html">Online</a><br>
            <a id="offline" href="offline.html">Offline</a><br>
            <a href="löschen.php">Account löschen</a>
        </div>

        <form action="online.php" method="POST">
            <input type="hidden" name="name" value="<?php echo htmlspecialchars(stripslashes(trim($_POST["name"])));?>">
            <input type="hidden" name="passwort" value="<?php echo htmlspecialchars(stripslashes(trim($_POST["passwort"])));?>">
            <input type="submit" value="Spiel finden">
        </form>
    </body>
</html>