<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $firstName = filter_var(trim($_POST["first-name"]), FILTER_SANITIZE_STRING);
    $lastName = filter_var(trim($_POST["last-name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);
    $recaptcha = filter_var(trim($_POST["g-recaptcha-response"]), FILTER_SANITIZE_STRING);

    // Check if any field is empty
    if (empty($firstName) || empty($lastName) || empty($email) || empty($message) || empty($recaptcha)) {
        echo "All fields are required.";
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        exit;
    }

    // Verify reCAPTCHA
    $secret = '6LeTfhIqAAAAAJDDgbY3B0a_p_QVAT8M_lqI1mLM';
    $recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $response = file_get_contents($recaptchaUrl . '?secret=' . $secret . '&response=' . $recaptcha);
    $responseKeys = json_decode($response, true);

    if (!$responseKeys["success"]) {
        echo "reCAPTCHA verification failed.";
        exit;
    }

    // Send email
    $to = "support@raw-tech.co.uk";
    $subject = "New Contact Form Submission";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $emailBody = "First Name: $firstName\n";
    $emailBody .= "Last Name: $lastName\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "Message:\n$message\n";

    if (mail($to, $subject, $emailBody, $headers)) {
        echo "Thank you for your message!";
    } else {
        echo "Oops! Something went wrong, please try again.";
    }
} else {
    echo "Invalid request method.";
}
?>