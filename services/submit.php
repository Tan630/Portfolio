<?php
define('ROOTPATH', __DIR__."/..");

function logEmail(string $user = "Anonymous", string $content = ""): void {
    $time = gmdate("Y-m-d, H:i:s");
    file_put_contents(
        ROOTPATH . "/logs/emails.php",
        "$time | $user wrote: $content\n",
        FILE_APPEND
    );
}

# --- Output Below ---
$user = $_REQUEST["cemail"];
$message = $_REQUEST["ccontent"];
logEmail((is_null($user)) ? "Anonymous":$user 
       , (is_null($message)) ? "Nothing":$message);
#logEmail(implode(array_keys($_REQUEST)), !is_null($ccontent) ?: 'nothing');
    #!is_null($user) ?: "Anonymous", !is_null($ccontent) ?: 'nothing');
?>
