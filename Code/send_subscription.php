<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

    // Check if email field is empty
    if (empty($email)) {
        echo "Email address is required.";
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        exit;
    }

    // Send subscription email
    $to = "support@raw-tech.co.uk";
    $subject = "New Subscription Request";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $emailBody = "Email: $email\n";

    if (mail($to, $subject, $emailBody, $headers)) {
        echo "Thank you for subscribing!";
    } else {
        echo "Oops! Something went wrong, please try again.";
    }
} else {
    echo "Invalid request method.";
}
?>