<?php
// Configuration
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Email de destination
$to_email = 'contact@cartegriseone.fr';

// Vérifier que la requête est en POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// Récupérer les données du formulaire
$firstName = isset($_POST['firstName']) ? trim($_POST['firstName']) : '';
$lastName = isset($_POST['lastName']) ? trim($_POST['lastName']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$service = isset($_POST['service']) ? trim($_POST['service']) : '';
$vehicleType = isset($_POST['vehicleType']) ? trim($_POST['vehicleType']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validation des champs obligatoires
$errors = [];

if (empty($firstName)) {
    $errors[] = 'Le prénom est obligatoire';
}

if (empty($lastName)) {
    $errors[] = 'Le nom est obligatoire';
}

if (empty($email)) {
    $errors[] = 'L\'email est obligatoire';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'L\'email n\'est pas valide';
}

if (empty($phone)) {
    $errors[] = 'Le téléphone est obligatoire';
}

if (empty($service)) {
    $errors[] = 'Le service est obligatoire';
}

if (empty($message)) {
    $errors[] = 'Le message est obligatoire';
}

// Si des erreurs existent, les retourner
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

// Préparer le contenu de l'email
$subject = 'Nouvelle demande de contact - CARTE GRISE ONE';

// Corps de l'email en HTML
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #FFFF00; color: #000; padding: 20px; text-align: center; font-weight: bold; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #000; }
        .value { color: #555; margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Nouvelle demande de contact</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Nom complet :</div>
                <div class='value'>{$firstName} {$lastName}</div>
            </div>
            <div class='field'>
                <div class='label'>Email :</div>
                <div class='value'>{$email}</div>
            </div>
            <div class='field'>
                <div class='label'>Téléphone :</div>
                <div class='value'>{$phone}</div>
            </div>
            <div class='field'>
                <div class='label'>Service demandé :</div>
                <div class='value'>{$service}</div>
            </div>
            " . (!empty($vehicleType) ? "
            <div class='field'>
                <div class='label'>Type de véhicule :</div>
                <div class='value'>{$vehicleType}</div>
            </div>
            " : "") . "
            <div class='field'>
                <div class='label'>Message :</div>
                <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>Email envoyé depuis le formulaire de contact de cartegriseone.fr</p>
            <p>Date : " . date('d/m/Y à H:i') . "</p>
        </div>
    </div>
</body>
</html>
";

// Version texte simple pour les clients email qui ne supportent pas HTML
$email_body_text = "
Nouvelle demande de contact - CARTE GRISE ONE

Nom complet : {$firstName} {$lastName}
Email : {$email}
Téléphone : {$phone}
Service demandé : {$service}
" . (!empty($vehicleType) ? "Type de véhicule : {$vehicleType}\n" : "") . "
Message :
{$message}

---
Email envoyé depuis le formulaire de contact de cartegriseone.fr
Date : " . date('d/m/Y à H:i') . "
";

// En-têtes de l'email
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: CARTE GRISE ONE <noreply@cartegriseone.fr>\r\n";
$headers .= "Reply-To: {$firstName} {$lastName} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Envoyer l'email
$mail_sent = mail($to_email, $subject, $email_body, $headers);

if ($mail_sent) {
    // Optionnel : Envoyer un email de confirmation au client
    $confirmation_subject = 'Confirmation de votre demande - CARTE GRISE ONE';
    $confirmation_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #FFFF00; color: #000; padding: 20px; text-align: center; font-weight: bold; }
            .content { background: #f9f9f9; padding: 20px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>CARTE GRISE ONE</h2>
            </div>
            <div class='content'>
                <p>Bonjour {$firstName},</p>
                <p>Nous avons bien reçu votre demande concernant : <strong>{$service}</strong></p>
                <p>Notre équipe va examiner votre demande et vous répondra dans les plus brefs délais.</p>
                <p>En cas d'urgence, n'hésitez pas à nous appeler au <strong>03 88 97 18 60</strong>.</p>
                <p>Cordialement,<br>L'équipe CARTE GRISE ONE</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $confirmation_headers = "MIME-Version: 1.0\r\n";
    $confirmation_headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $confirmation_headers .= "From: CARTE GRISE ONE <noreply@cartegriseone.fr>\r\n";
    
    // Envoyer l'email de confirmation (optionnel)
    // mail($email, $confirmation_subject, $confirmation_body, $confirmation_headers);
    
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'Votre demande a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement par téléphone.'
    ]);
}
?>

