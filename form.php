<?php
$captcha = $_POST["captcha"];
$secret_key = "YOUR_SECRET_KEY";
$url = "https://www.google.com/recaptcha/api/siteverify";
$data = http_build_query(array(
  "secret" => $secret_key,
  "response" => $captcha
));
$options = array(
  "http" => array(
    "method" => "POST",
    "header" => "Content-Type: application/x-www-form-urlencoded",
    "content" => $data
  )
);
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === false) {
  echo json_encode(array("success" => false));
} else {
  $result_json = json_decode($result);
  echo json_encode(array("success" => $result_json->success));
}
?>
