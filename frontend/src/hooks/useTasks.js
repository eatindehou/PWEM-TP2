import React from "react";

export function useTasks() {
    const [tasks, setTasks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    let taskChart = null;
    // Charger toutes les tâches
    const loadTasks = React.useCallback(async () => {
        try {
            console.log('fggg')
            setLoading(true);
            // TODO: Appeler l'API pour récupérer les tâches
            const response = await fetch('http://localhost:8888/PWEM-TP2/api/tasks.php');

            if (!response.ok) {
                throw new Error('Erreur lors du chargement des tâches');
            }

            const json = await response.json();
            // console.log(json);
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
    //  Ajouter une tâche
    const addTask = React.useCallback(async (title, dueDate) => {
        // console.log({ title, dueDate })
        // TODO: Valider les données
        let letitleEntree = null;

        // 3. Valider les données
        if (title !== "") {
            // console.log(title)
            letitleEntree = title;
        }
        else {
            console.log('il est completement vide !')
        }
        let laDateEntree = dueDate;

        // 4. Préparer les données à envoyer
        const taskData = {
            title: letitleEntree,
            due_date: laDateEntree || null,
            is_completed: false
        };
        // TODO: Appeler l'API POST
        try {
            // 5. Envoyer la requête POST
            // console.log(taskData);
            const response = await fetch('http://localhost:8888/PWEM-TP2/api/tasks.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de la tâche');
            }

            // 6. Réinitialiser le formulaire
            title = "";
            laDateEntree = "";
            // 7. Recharger la liste des tâches (appeler la fonction loadTasks)
            // console.log("la tâche à été ajoutée !")
            loadTasks()
        } catch (error) {
            console.error('Erreur:', error);
            alert('Impossible d\'ajouter la tâche ! Veuillez entrer un nom de tâche !');
        }
        // TODO: Rafraîchir la liste
    }, []);
    
    // Modifier le statut d'une tâche
    const toggleTask = React.useCallback(async (taskId) => {
        try {

            const task = tasks.find(task => task.id === taskId);
            if (!task) return;

            const newStatus = task.is_completed ? 0 : 1;

            const response = await fetch(`http://localhost:8888/PWEM-TP2/api/tasks.php?id=${taskId}`, {
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
                        date: task.date,
                        is_completed: newStatus
                    } : task
                )
            );

        } catch (error) {
            console.error("Erreur:", error);
            alert("Impossible de modifier la tâche");
        }
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