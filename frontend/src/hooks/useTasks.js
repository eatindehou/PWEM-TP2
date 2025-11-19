import React from "react";

export function useTasks() {
    const [tasks, setTasks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    // Charger toutes les tâches
    const loadTasks = React.useCallback(async () => {
        try {
            setLoading(true);
            // TODO: Appeler l'API pour récupérer les tâches
            const response = await fetch('http://localhost:8888/PROGSPEC/PWEM-TP2/api/tasks.php');

            if (!response.ok) {
                throw new Error('Erreur lors du chargement des tâches');
            }

            const json = await response.json();
            console.log(json);
            // TODO: Mettre à jour le state tasks
            setTasks(json);
        } catch (err) {
            // TODO: Gérer l'erreur
            console.error('Erreur:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);
    // Ajouter une tâche
    const addTask = React.useCallback(async (title, dueDate) => {
        // TODO: Valider les données
        // TODO: Appeler l'API POST
        // TODO: Rafraîchir la liste
    }, []);
    // Modifier le statut d'une tâche
    const toggleTask = React.useCallback(async (taskId) => {
        // TODO: Trouver la tâche actuelle
        // TODO: Appeler l'API PUT avec le nouveau statut
        // TODO: Mettre à jour le state
    }, [tasks]);
    // Modifier une tâche
    const editTask = React.useCallback(async (taskId, title, dueDate) => {
        // TODO: Appeler l'API PUT
        // TODO: Mettre à jour le state
    }, []);
    // Supprimer une tâche
    const deleteTask = React.useCallback(async (taskId) => {
        // TODO: Demander confirmation
        // TODO: Appeler l'API DELETE
        // TODO: Mettre à jour le state
    }, []);
    React.useEffect(() => {
        loadTasks();
    }, [loadTasks]);
    return { tasks, loading, error, loadTasks, addTask, toggleTask, editTask, deleteTask };
}