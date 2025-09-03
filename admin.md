## Identité

Vous êtes un ingénieur logiciel de haut niveau, expert en Angular.

## Instructions

* Veuillez créer SVP dans le dossier admin une application Angular (Simple page application) utilisant une API REST pour gérer les modules d'une bibliothèque.
* L'application doit être responsive.

# Maquette graphique

* Utiliser SVP l'exemple de la page index.html dans le dossier maquette pour la création des écrans
* Garder que le haut et le bas de page, le milieu changera selon le module

# Écrans
* Écran d'authentification où l'utilisateur doit saisir son identifiant et son mot de passe pour accéder à l'application
* Écran d'accueil avec le logo de la bibliothèque en haut à gauche et des liens vers les modules de gestion (Maisons d'édition, Auteurs, Livres, Contacts et Utilisateurs) au centre
* Écran interne pour chaque module avec une liste d'éléments et des liens pour ajouter, modifier et supprimer des éléments

# Authentification

* Le premier écran affiché est un écran d'authentification, mettre dans le milieu de page un formulaire avec les champs identifiant et mot de passe pour s'authentifier, l'url d'authentification est http://localhost:8080/api/utilisateurs/auth, cette URL retourne un utilisateur ou une exception

# API REST à utiliser (l'API rest est démarrée)
* L'API est protégée par une basic authentification, identifiant : rachid, mot de passe : rachid123
* L'API REST est composée de cinq modules : maisons d'édition, auteurs, livres, contacts et utilisateurs.
* URL de base du module maisons d'édition : http://localhost:8080/api/maisons-edition
* URL de base du module auteurs : http://localhost:8080/api/auteurs
* URL de base du module livres : http://localhost:8080/api/livres
* URL de base du module contacts : http://localhost:8080/api/contacts
* URL de base du module utilisateurs : http://localhost:8080/api/utilisateurs

# Exemples JSON
* Exemple de code JSON pour une maison d'édition : {"id":1,"nom":"maison 1"}
* Exemple de code JSON pour un auteur : {"id":1,"nom":"assa","prenom":"rachid"}
* Exemple de code JSON pour un livre : {"id":1,"titre":"livre 1","datePublication":"2025-07-01","maisonEdition":{"id":1,"nom":"maison 1"},"auteurs":[]}
* Exemple de code JSON pour un contact : {"id":1,"nom":"rachid","email":"rassanane@gmail.com","message":"ceci est un test, a garder ..."}
* Exemple de code JSON pour un utilisateur : {"id":1,"nom":"assa","prenom":"rachid","identifiant":"rach","motPasse":"rach123"}

# Authentification
* Pour l'authentification pour accéder à l'application, les informations saisies par l'utilisateur doivent être vérifiées en appelant le service http://localhost:8080/api/utilisateurs/auth, si le service retourne une erreur 401 ne pas autoriser l'accès, si le service retourne un objet utilisateur autoriser l'accès


# Relations
Un auteur a un ou plusieurs livres
Un livre a un ou plusieurs auteurs
Un livre a une maison d'édition

# Formulaires
* Champs du formulaire de la maison d'édition : nom (obligatoire)
* Champs du formulaire de l'auteur : prénom (obligatoire), nom (obligatoire), livres (liste)
Enregistrer uniquement le nom du fichier dans la propriété biographie
* Champs du formulaire du livre : titre (obligatoire), date de publication (obligatoire), maison d'édition (liste) (obligatoire), auteurs (liste avec sélection multiple)
* Champs du formulaire du contact : nom (obligatoire), email (obligatoire avec vérification du format avant de mettre à jour la base), message
* Champs du formulaire de l'utilisateur : nom (obligatoire), prenom (obligatoire), identifiant (obligatoire), mot de passe (obligatoire)

# Tests
* Créer des tests unitaires pour toutes les opérations de CRUD
* Lancer l'application et s'assurer que tous les tests unitaires sont corrects

Prendre votre temps pour réfléchir






