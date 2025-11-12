<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration de la base de données
$host = 'localhost';
$dbname = 'todo_app';
$username = 'root';
$password = '';

// Connexion à la base de données
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur de connexion à la base de données']);
    exit();
}

// Récupérer la méthode HTTP
$method = $_SERVER['REQUEST_METHOD'];

// Gérer les requêtes OPTIONS (preflight)
if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Récupérer l'ID si présent dans l'URL
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

// Traiter les différentes méthodes HTTP
switch ($method) {
    case 'GET':
        handleGet($pdo, $id);
        break;
    case 'POST':
        handlePost($pdo);
        break;
    case 'PUT':
        handlePut($pdo, $id);
        break;
    case 'DELETE':
        handleDelete($pdo, $id);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
}

// Fonction pour récupérer les tâches (GET)
function handleGet($pdo, $id) {
    if ($id) {
        // Récupérer une tâche spécifique
        $stmt = $pdo->prepare('SELECT * FROM tasks WHERE id = ?');
        $stmt->execute([$id]);
        $task = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($task) {
            echo json_encode($task);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Tâche non trouvée']);
        }
    } else {
        // Récupérer toutes les tâches
        $stmt = $pdo->query('SELECT * FROM tasks ORDER BY created_at DESC');
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($tasks);
    }
}

// Fonction pour créer une tâche (POST)
function handlePost($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['title']) || empty(trim($data['title']))) {
        http_response_code(400);
        echo json_encode(['error' => 'Le titre est requis']);
        return;
    }
    
    $title = trim($data['title']);
    $due_date = isset($data['due_date']) && !empty($data['due_date']) ? $data['due_date'] : null;
    $is_completed = isset($data['is_completed']) && $data['is_completed'] ? 1 : 0;
    
    $stmt = $pdo->prepare('INSERT INTO tasks (title, due_date, is_completed) VALUES (?, ?, ?)');
    $stmt->execute([$title, $due_date, $is_completed]);
    
    $newId = $pdo->lastInsertId();
    $stmt = $pdo->prepare('SELECT * FROM tasks WHERE id = ?');
    $stmt->execute([$newId]);
    $task = $stmt->fetch(PDO::FETCH_ASSOC);
    
    http_response_code(201);
    echo json_encode($task);
}

// Fonction pour modifier une tâche (PUT)
function handlePut($pdo, $id) {
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID requis']);
        return;
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Vérifier si la tâche existe
    $stmt = $pdo->prepare('SELECT * FROM tasks WHERE id = ?');
    $stmt->execute([$id]);
    $task = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$task) {
        http_response_code(404);
        echo json_encode(['error' => 'Tâche non trouvée']);
        return;
    }
    
    $title = isset($data['title']) ? trim($data['title']) : $task['title'];
    $due_date = isset($data['due_date']) && !empty($data['due_date']) ? $data['due_date'] : $task['due_date'];
    $is_completed = isset($data['is_completed']) ? ($data['is_completed'] ? 1 : 0) : $task['is_completed'];
    
    $stmt = $pdo->prepare('UPDATE tasks SET title = ?, due_date = ?, is_completed = ? WHERE id = ?');
    $stmt->execute([$title, $due_date, $is_completed, $id]);
    
    $stmt = $pdo->prepare('SELECT * FROM tasks WHERE id = ?');
    $stmt->execute([$id]);
    $updatedTask = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode($updatedTask);
}

// Fonction pour supprimer une tâche (DELETE)
function handleDelete($pdo, $id) {
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID requis']);
        return;
    }
    
    $stmt = $pdo->prepare('SELECT * FROM tasks WHERE id = ?');
    $stmt->execute([$id]);
    $task = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$task) {
        http_response_code(404);
        echo json_encode(['error' => 'Tâche non trouvée']);
        return;
    }
    
    $stmt = $pdo->prepare('DELETE FROM tasks WHERE id = ?');
    $stmt->execute([$id]);
    
    echo json_encode(['message' => 'Tâche supprimée avec succès']);
}
