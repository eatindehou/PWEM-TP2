import React from "react";

export function useTasks() {
    const [tasks, setTasks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    let taskChart = null;
    // Charger toutes les tâches
    const loadTasks = React.useCallback(async () => {
        try {
            setLoading(true);
            // TODO: Appeler l'API pour récupérer les tâches
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8888/PWEM-TP2/api';
            const response = await fetch(`${API_URL}/tasks.php`);

            if (!response.ok) {
                throw new Error('Erreur lors du chargement des tâches');
            }

            const json = await response.json();
            // TODO: Mettre à jour le state tasks
            setTasks(json);
            const dateElements = document.querySelectorAll('.todo-item__date');
            dateElements.forEach((date, index) => {
                const dateDeRemise = json[index].due_date;
                if (!json[index].due_date) {
                    date.textContent = "Aucune échéance"
                }
                else {
                    date.textContent = formatDate(dateDeRemise);
                }
            });

        } catch (err) {
            // TODO: Gérer l'erreur
            console.error('Erreur:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);
    //  Ajouter une tâche
    const addTask = React.useCallback(async (title, dueDate) => {
        // TODO: Valider les données

        // 1. Préparer les données à envoyer
        const taskData = {
            title: title,
            due_date: dueDate || null,
            is_completed: false
        };
        // TODO: Appeler l'API POST
        try {
            // 2. Envoyer la requête POST
            const response = await fetch(`${API_URL}/tasks.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de la tâche');
            }
            // 3. Recharger la liste des tâches (appeler la fonction loadTasks)
            // console.log("la tâche à été ajoutée !")
            loadTasks();
        } catch (error) {
            console.error('Erreur:', error);
            alert('Impossible d\'ajouter la tâche ! Veuillez entrer un nom de tâche !');
        }
        // TODO: Rafraîchir la liste
    }, []);

    /**
     * Formate une date au format YYYY-MM-DD en format lisible
     * @param {string} dateString - Date au format YYYY-MM-DD
     * @returns {string} Date formatée
     */
    function formatDate(dateString) {
        if (!dateString) return '';

        const date = new Date(dateString + 'T00:00:00'); // Ajouter l'heure pour éviter les problèmes de fuseau horaire
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('fr-CA', options);
    }
    // Modifier le statut d'une tâche
    const toggleTask = React.useCallback(async (taskId) => {
        try {

            const task = tasks.find(task => task.id === taskId);
            if (!task) return;

            const newStatus = task.is_completed ? 0 : 1;

            const response = await fetch(`${API_URL}/tasks.php?id=${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ is_completed: newStatus })
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la modification");
            }

            setTasks(Tasks =>
                Tasks.map(task =>
                    task.id === taskId ? {
                        id: task.id,
                        title: task.title,
                        due_date: task.date,
                        is_completed: newStatus
                    } : task
                )
            );
            loadTasks();
        } catch (error) {
            console.error("Erreur:", error);
            alert("Impossible de modifier la tâche");
        }
    }, [tasks]);

    // Modifier une tâche
    const editTask = React.useCallback(async (taskId, title, dueDate) => {
        // TODO: Appeler l'API PUT
        // TODO: Mettre à jour le state
        const newTitle = prompt('Nouveau titre:', title);

        if (newTitle === null || newTitle.trim() === '') {
            return; // L'utilisateur a annulé
        }

        const newDate = prompt('Nouvelle date (YYYY-MM-DD):', dueDate || '');
        try {
            const response = await fetch(`${API_URL}/tasks.php?id=${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newTitle.trim(),
                    due_date: newDate || null
                })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la modification');
            }

            loadTasks();
        } catch (error) {
            console.error('Erreur:', error);
            alert('Impossible de modifier la tâche');
        }


    }, []);
    // Supprimer une tâche
    const deleteTask = React.useCallback(async (taskId) => {

        if (!confirm("Êtes-vous certain de vouloir supprimer cette tâche?")) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/tasks.php?id=${taskId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression : ' + text);
            }

            setTasks(prev => prev.filter(task => task.id !== taskId));

        } catch (error) {
            console.error('Erreur:', error);
            alert('Impossible de supprimer la tâche');
        }



    }, []);

    React.useEffect(() => {
        loadTasks();
    }, [loadTasks]);
    return { tasks, loading, error, loadTasks, addTask, toggleTask, editTask, deleteTask };
}