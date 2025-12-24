<?php
function logAudit($pdo, $userId, $action, $table, $recordId) {
    $stmt = $pdo->prepare("
        INSERT INTO audit_log (user_id, action, table_name, record_id)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->execute([$userId, $action, $table, $recordId]);
}
