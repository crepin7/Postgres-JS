const { Client } = require('pg');

// Configuration de la connexion à la base de données
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'entreprise',
    password: 'crepin007',
    port: 5432, // Par défaut pour PostgreSQL
});

// Fonction pour exécuter une requête SQL
async function queryDatabase() {
    try {
        await client.connect(); // Connexion à la base de données
        console.log('Connecté à la base de données PostgreSQL.');

        // Exécution d'une requête SQL
        const queryResult = await client.query('SELECT last_name || \' -> \' || email AS info FROM employees');

        // Affichage des résultats
        console.log('Résultats de la requête :', queryResult.rows);
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données :', error);
    } finally {
        await client.end(); // Fermeture de la connexion à la base de données
        console.log('Connexion à la base de données fermée.');
    }
}

// Appel de la fonction pour exécuter la requête SQL
queryDatabase();
