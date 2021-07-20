<!DOCTYPE html>

<html>
    <head>
        <title>Account löschen</title>
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
                        $sql = $conn -> prepare("SELECT * FROM User WHERE Name=?");

                        $sql -> bind_param("s",$_POST["name"]);
                        $sql -> execute();

                        $sql -> bind_result($res_id, $res_name, $res_passwort);

                        $richtig = false;

                        while ($sql -> fetch()) {
                            if (password_verify($_POST["passwort"], $res_passwort)) {
                                $richtig = true;
                            }
                        }

                        $sql -> close();

                        if ($richtig === true) {
                            $sql = $conn -> prepare("DELETE FROM User WHERE Name=?");

                            $sql -> bind_param("s", $_POST["name"]);
                            $sql -> execute();

                            $sql -> close();

                            $sql = $conn -> prepare("SELECT * FROM User WHERE Name=?");

                            $sql -> bind_param("s", $_POST["name"]);
                            $sql -> execute();

                            $sql -> bind_result($res_id, $res_name, $res_passwort);

                            if ($sql -> fetch()) {
                                echo "<script>window.alert('Bei dem Löschen des Accounts ist ein Fehler aufgetreten')</script>";
                            }
                            else {
                                echo "<script>window.alert('Du hast deinen Account erfolgreich gelöscht')</script>";
                            }

                            $sql -> close();
                            $conn -> close();
                        }
                    }
                }
            }
        ?>

        <form action="löschen.php" method="POST">
            Name: <input type="text" name="name" autocomplete="off"><br>
            Passwort: <input type="password" name="passwort" autocomplete="off"><br>
            <input type="submit" value="löschen">
        </form>

        <a href="finden.php">Zur&uuml;ck</a>
    </body>
</html>