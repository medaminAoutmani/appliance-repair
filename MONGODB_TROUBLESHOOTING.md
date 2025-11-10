# MongoDB Connection Troubleshooting Guide

## Error: "bad auth : authentication failed"

Cette erreur signifie que les identifiants MongoDB sont incorrects. Voici comment résoudre le problème :

### 1. Vérifier vos identifiants MongoDB Atlas

1. Connectez-vous à [MongoDB Atlas](https://cloud.mongodb.com/)
2. Allez dans **Database Access** (menu de gauche)
3. Vérifiez le nom d'utilisateur (actuellement : `admin`)
4. Si vous avez oublié le mot de passe, créez un nouvel utilisateur ou réinitialisez le mot de passe

### 2. Format correct de MONGODB_URI

Le format doit être :
```
mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/?appName=app-name
```

### 3. Encoder les caractères spéciaux dans le mot de passe

Si votre mot de passe contient des caractères spéciaux, vous devez les encoder en URL :

| Caractère | Encodage |
|-----------|----------|
| `@` | `%40` |
| `#` | `%23` |
| `$` | `%24` |
| `%` | `%25` |
| `&` | `%26` |
| `+` | `%2B` |
| `=` | `%3D` |
| `?` | `%3F` |
| `/` | `%2F` |
| `:` | `%3A` |
| `;` | `%3B` |
| ` ` (espace) | `%20` |

**Exemple :**
- Mot de passe : `MyP@ss#123`
- Encodé : `MyP%40ss%23123`
- URI complète : `mongodb+srv://admin:MyP%40ss%23123@cluster.mongodb.net/?appName=app-name`

### 4. Vérifier l'accès réseau (Network Access)

1. Dans MongoDB Atlas, allez dans **Network Access**
2. Assurez-vous que votre IP est autorisée, ou ajoutez `0.0.0.0/0` pour autoriser toutes les IPs (développement uniquement)

### 5. Vérifier le nom du cluster

Assurez-vous que le nom du cluster dans l'URI correspond à votre cluster réel dans MongoDB Atlas.

### 6. Créer un nouvel utilisateur (si nécessaire)

Si vous ne pouvez pas récupérer le mot de passe :

1. Allez dans **Database Access**
2. Cliquez sur **Add New Database User**
3. Choisissez **Password** comme méthode d'authentification
4. Créez un mot de passe simple (sans caractères spéciaux pour éviter les problèmes d'encodage)
5. Donnez les permissions **Read and write to any database**
6. Utilisez ce nouvel utilisateur dans votre `.env.local`

### 7. Exemple de .env.local correct

```env
MONGODB_URI=mongodb+srv://admin:VotreMotDePasse123@appliance-repair-cluste.8fooyrx.mongodb.net/?appName=appliance-repair-cluster
```

**Important :**
- Pas d'espaces autour du `=`
- Pas de guillemets autour de la valeur
- Si le mot de passe contient des caractères spéciaux, encodez-les (voir section 3)

### 8. Tester la connexion

Après avoir mis à jour `.env.local` :

1. **Redémarrez votre serveur Next.js** (très important !)
2. Soumettez un formulaire
3. Vérifiez les logs dans la console du serveur

Vous devriez voir :
```
✅ MongoDB connected successfully
```

Si vous voyez toujours l'erreur, vérifiez :
- Le nom d'utilisateur est correct
- Le mot de passe est correct (et encodé si nécessaire)
- Le serveur a été redémarré après la modification de `.env.local`



