<?php
// CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

require "../config/db.php";
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $event_id = $_GET["event_id"] ?? null;

    if (!$event_id) {
        echo json_encode([]);
        exit;
    }

    $stmt = $pdo->prepare("
        SELECT 
            ep.student_id,
            s.full_name AS student_name,
            ep.participation_status
        FROM event_participants ep
        JOIN students s ON ep.student_id = s.student_id
        WHERE ep.event_id = ?
        ORDER BY s.full_name
    ");

    $stmt->execute([$event_id]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}


/* ---------------- POST ---------------- */

elseif ($_SERVER["REQUEST_METHOD"] === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    try {
        $stmt = $pdo->prepare("
            INSERT INTO event_participants (event_id, student_id, participation_status)
            VALUES (?, ?, ?)
        ");
        $stmt->execute([
            $data["event_id"],
            $data["student_id"],
            $data["participation_status"] ?? 'Registered'
        ]);

        echo json_encode(["success" => true]);

    } catch (PDOException $e) {
        echo json_encode([
            "success" => false,
            "error" => "Student already registered for this event"
        ]);
    }
}

/* ---------------- PUT ---------------- */

elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {

    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $pdo->prepare("
        UPDATE event_participants
        SET participation_status = ?
        WHERE event_id = ? AND student_id = ?
    ");
    $stmt->execute([
        $data["participation_status"],
        $data["event_id"],
        $data["student_id"]
    ]);

    echo json_encode(["success" => true]);
}

/* ---------------- DELETE ---------------- */

elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {

    $event_id = $_GET["event_id"];
    $student_id = $_GET["student_id"];

    $stmt = $pdo->prepare("
        DELETE FROM event_participants
        WHERE event_id = ? AND student_id = ?
    ");
    $stmt->execute([$event_id, $student_id]);

    echo json_encode(["success" => true]);
}
