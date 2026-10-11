<?php
/**
 * SICABA - Logout
 */
require_once __DIR__ . '/../config/config.php';

if (isLoggedIn()) {
    logActivity('LOGOUT', 'users', $_SESSION['user_id'], 'User logout');
}

session_destroy();
redirect(BASE_URL . '/index.php');
