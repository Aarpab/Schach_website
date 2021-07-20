<!DOCTYPE html>

<html>
    <head>
        <title>Registrierung</title>
    </head>

    <body>
        <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                if (!empty($_POST["name"]) && !empty($_POST["passwort"]) && !empty($_POST["passwort2"])) {
                    if ($_POST["passwort"] == $_POST["passwort2"]) {
                        $servername = "localhost";
                        $nutzername = "root";
                        $pw = "";
                        $dbname = "schach";

                        $conn = new mysqli($servername, $nutzername, $pw, $dbname);

                        if ($conn -> connect_error) {
                            echo "<script>window.alert('Bei der Verbindung zum Server ist ein Fehler aufgetreten')</script>";
                        }
                        else {
                            $sql = $conn -> prepare("SELECT Name FROM User WHERE Name=?");

                            $sql -> bind_param("s", $_POST["name"]);
                            $sql -> execute();

                            $sql -> bind_result($res_name);

                            if ($sql -> fetch()) {
                                echo "<script>window.alert('Der Name ist schon vorhanden')</script>";
                                $sql -> close();
                                $conn -> close();
                            }
                            else {
                                $sql -> close();

                                $hashed = password_hash($_POST["passwort"], PASSWORD_DEFAULT);

                                $sql = $conn -> prepare("INSERT INTO User (Name, Passwort) VALUES (?, ?)");

                                $sql -> bind_param("ss", $_POST["name"], $hashed);
                                $sql -> execute();

                                $sql -> close();

                                $sql = $conn -> prepare("SELECT Name FROM User WHERE Name=?");

                                $sql -> bind_param("s", $_POST["name"]);
                                $sql -> execute();

                                $sql -> bind_result($res_name);

                                if ($sql -> fetch()) {
                                    echo "<script>window.alert('Du hast dich erfolgreich registriert')</script>";
                                }
                                else {
                                    echo "<script>window.alert('Bei der Registrierung ist ein Fehler aufgetreten')</script>";
                                }

                                $sql -> close();
                                $conn -> close();
                            }
                        }
                    }
                }
            }
        ?>

        <form action="registrieren.php" method="POST">
            Name: <input type="text" name="name" autocomplete="off"><br>
            Passwort: <input type="password" name="passwort" autocomplete="off"><br>
            Passwort best&auml;tigen: <input type="password" name="passwort2" autocomplete="off"><br>
            <input type="submit" value="registrieren">
        </form>

        <a href="anmeldung.html">Zur&uuml;ck zur Anmeldung</a>
    </body>
</html>