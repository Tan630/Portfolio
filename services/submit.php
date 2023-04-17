<?php
# ini_set('display_errors', 0);

define('ROOTPATH', __DIR__."/..");

function logEmail(string $user = "Anonymous", string $content = ""): void {
    $time = gmdate("Y-m-d, H:i:s");
    file_put_contents(
        ROOTPATH . "/logs/emails.log",
        "$time | $user wrote: $content\n",
        FILE_APPEND
    );
}

function isValidUserName(?string $mif): bool {
    return (filter_var("$mif", FILTER_VALIDATE_EMAIL));
}

function isValidContent(?string $mif): bool {
    return ($mif != "");
}

# --- Output Below ---
$user = urldecode($_REQUEST["cemail"]);
$message = urldecode($_REQUEST["ccontent"]);
$faviconPath = ROOTPATH . "/media/favicon.svg";
if (isValidUserName($user) && isValidContent($message)) {
    logEmail((is_null($user)) ? "Anonymous":$user
           , (is_null($message)) ? "Nothing":$message);
    echo "Request Successful!";
} else {
    http_response_code(500);
    echo "Malformed input detected; caused by: $user, $message";
}






#logEmail(implode(array_keys($_REQUEST)), !is_null($ccontent) ?: 'nothing');
#!is_null($user) ?: "Anonymous", !is_null($ccontent) ?: 'nothing');




