# Plan de Développement - Application Gestion Financière

## Architecture Générale

L'application suit une architecture en couches avec séparation des responsabilités :

```
Backend: Models → Services → Controllers → Resources → Routes
Frontend: Types → Hooks → Shared Components → Pages
```

## Phase 1: Base de Données [✓ TERMINÉ]

### Migrations [✓ TERMINÉ]
Créer toutes les migrations dans l'ordre de dépendances :

1. ✓ `create_statut_table.php` - Table statut (Payé/Impayé)
2. ✓ `create_client_table.php` - Table client
3. ✓ `create_charge_fixe_type_table.php` - Types de charges fixes
4. ✓ `create_charge_fixe_table.php` - Historique charges fixes
5. ✓ `create_charge_variable_type_table.php` - Types de charges variables
6. ✓ `create_charge_variable_table.php` - Historique charges variables
7. ✓ `create_revenus_table.php` - Table revenus (avec `statut_id` et `note`)
8. ✓ `create_benefice_table.php` - Snapshots quotidiens (optionnel)
9. ✓ `create_views_for_reporting.php` - Vues SQL pour rapports
10. ✓ Seeder pour initialiser `statut` avec "Payé" et "Impayé"

**Fichiers:** `database/migrations/*.php`, `database/seeders/StatutSeeder.php`

---

## Phase 2: Backend - Modèles (Ordre d'implémentation) [✓ TERMINÉ]

### Modèle 1: Statut [✓]
**Fichier:** `app/Models/Statut.php`
- ✓ Soft deletes (Laravel 12 syntax)
- ✓ Relations: `hasMany(Revenu::class)`
- ✓ Accessor pour badge coloré

### Modèle 2: Client [✓]
**Fichier:** `app/Models/Client.php`
- ✓ Soft deletes
- ✓ Relations: `hasMany(Revenu::class)`
- ✓ Scopes pour filtrage (nom, téléphone)
- ✓ Mutator pour format téléphone
- ✓ Accessor nom complet

### Modèle 3: ChargeFixeType & ChargeVariableType [✓]
**Fichiers:** `app/Models/ChargeFixeType.php`, `app/Models/ChargeVariableType.php`
- ✓ Soft deletes
- ✓ Relations: `hasMany(ChargeFixe::class)` / `hasMany(ChargeVariable::class)`

### Modèle 4: Revenus [✓]
**Fichier:** `app/Models/Revenu.php` (note: singulier)
- ✓ Soft deletes
- ✓ Relations: `belongsTo(Client::class)`, `belongsTo(Statut::class)`
- ✓ Scopes: `paye()`, `impaye()`, `parDate()`, `parPeriode()`
- ✓ Accessor pour montant formaté

### Modèles 5-6: ChargeFixe & ChargeVariable [✓]
**Fichiers:** `app/Models/ChargeFixe.php`, `app/Models/ChargeVariable.php`
- ✓ Soft deletes
- ✓ Relations: `belongsTo(ChargeFixeType::class)` / `belongsTo(ChargeVariableType::class)`
- ✓ Accessors pour totaux formatés

### Modèle 7: Benefice [✓]
**Fichier:** `app/Models/Benefice.php`
- ✓ Pas de soft deletes (données calculées)
- ✓ Scopes pour dates et périodes
- ✓ Accessor bénéfice formaté

---

## Phase 3: Backend - Services (Logique Métier) [✓ TERMINÉ]

**Dossier:** `app/Services/`

Services pour la logique complexe (éviter la logique métier dans les controllers) :

1. ✓ `BeneficeService.php` - Calcul des bénéfices quotidiens
   - ✓ Méthode `calculerBeneficeDuJour($date)`
   - ✓ Méthode `calculerBeneficePeriode($dateDebut, $dateFin)`

2. `RevenuService.php` (si logique complexe nécessaire) - Non nécessaire
   - Validation des montants → Géré dans FormRequests
   - Calculs liés aux statuts → Géré dans les scopes du modèle

**Pattern:** Services injectés dans les controllers via Dependency Injection (Laravel 12)

---

## Phase 4: Backend - Controllers & Resources

### Structure par modèle
Pour chaque modèle : Controller + Resource (pour API JSON propre)

**Exemple pour Client:**
- `app/Http/Controllers/ClientController.php`
  - `index()` - Liste avec filtres + pagination
  - `store()` - Création
  - `show()` - Détails (pour modal view)
  - Utilisation de Query Builder avec `with()` pour éviter N+1
  - Utilisation de Laravel Resource pour format JSON

- `app/Http/Resources/ClientResource.php`
  - Formatage JSON avec relations chargées

### Optimisations N+1
- Toujours utiliser `with()` pour eager loading
- Utiliser `select()` pour limiter les colonnes si nécessaire
- Index database déjà définis dans le schéma

### Filtres & Pagination
- Utiliser `Request` classes pour validation
- Filtres: `Filterable` trait (réutilisable)
- Pagination: Laravel paginate avec `LengthAwarePaginator`

**Fichiers:**
- `app/Http/Controllers/{Client,Statut,Revenu,ChargeFixe,ChargeVariable,ChargeFixeType,ChargeVariableType}Controller.php`
- `app/Http/Resources/{Client,Statut,Revenu,ChargeFixe,ChargeVariable,ChargeFixeType,ChargeVariableType}Resource.php`
- `app/Http/Requests/{Client,Revenu,ChargeFixeType,ChargeVariableType}StoreRequest.php` (validation)

### Controllers terminés
- ✓ `ChargeFixeTypeController.php` - Controller complet avec Request Forms, Resource, filtres, pagination, Inertia ready
  - ✓ `ChargeFixeTypeStoreRequest.php` - Validation création
  - ✓ `ChargeFixeTypeUpdateRequest.php` - Validation mise à jour
  - ✓ `ChargeFixeTypeResource.php` - Formatage JSON
  - ✓ Routes ajoutées dans `web.php`

---

## Phase 5: Backend - Routes

**Fichier:** `routes/web.php`

Routes Inertia avec resource routing (Laravel 12 syntax) :
```php
Route::resource('clients', ClientController::class);
Route::resource('revenus', RevenuController::class);
// etc.
```

---

## Phase 6: Frontend - Types TypeScript

**Dossier:** `resources/js/types/`

Créer des interfaces TypeScript pour tous les modèles :

1. `types/models/Statut.ts`
2. `types/models/Client.ts`
3. `types/models/Revenu.ts`
4. `types/models/ChargeFixe.ts`
5. `types/models/ChargeVariable.ts`
6. `types/models/ChargeFixeType.ts`
7. `types/models/ChargeVariableType.ts`
8. `types/models/Benefice.ts`

**Fichier central:** `types/models/index.ts` - Exports de tous les types

**Fichier:** `types/api.ts` - Types pour les réponses API (PaginatedResponse, etc.)

---

## Phase 7: Frontend - Hooks Réutilisables

**Dossier:** `resources/js/hooks/`

Hooks centralisés pour éviter la duplication :

1. `useModal.ts` - Gestion d'ouverture/fermeture modals
2. `usePagination.ts` - Gestion pagination Inertia
3. `useFilter.ts` - Gestion filtres avec query params
4. `useForm.ts` - Wrapper autour de `useForm` d'Inertia avec validation
5. `useDelete.ts` - Hook pour confirmations de suppression

**Pattern:** Hooks réutilisables avec TypeScript strict

---

## Phase 8: Frontend - Composants Partagés

**Dossier:** `resources/js/components/`

Composants centralisés (pas de duplication de code) :

### Composants UI de base
1. `ui/Button.tsx` - Bouton réutilisable avec variants
2. `ui/Modal.tsx` - Modal générique (headless UI ou custom)
3. `ui/Input.tsx` - Input avec validation
4. `ui/Select.tsx` - Select dropdown
5. `ui/Table.tsx` - Table avec sorting/pagination
6. `ui/Badge.tsx` - Badge pour statuts
7. `ui/Loading.tsx` - Spinner/loading

### Composants métier réutilisables
1. `forms/ClientForm.tsx` - Formulaire client (création/édition)
2. `forms/RevenuForm.tsx` - Formulaire revenu
3. `tables/ClientTable.tsx` - Table client avec actions
4. `modals/CreateModal.tsx` - Modal générique pour création
5. `modals/ViewModal.tsx` - Modal générique pour visualisation

**Pattern:** Composants petits et focalisés, composition over duplication

---

## Phase 9: Frontend - Pages

**Dossier:** `resources/js/pages/`

Pages Inertia pour chaque ressource :

1. `clients/Index.tsx` - Liste clients avec filtres
2. `revenus/Index.tsx` - Liste revenus
3. `charges-fixes/Index.tsx` - Liste charges fixes
4. `charges-variables/Index.tsx` - Liste charges variables
5. `dashboard/Index.tsx` - Tableau de bord avec bénéfices

**Features par page:**
- Liste avec pagination
- Modal de création (popup)
- Modal de visualisation (view)
- Filtres intégrés
- Actions (edit/delete) - si nécessaire

---

## Phase 10: Layout & Navigation

**Fichiers:**
- `resources/js/components/Layout.tsx` - Layout principal avec navigation
- `resources/js/components/Navigation.tsx` - Menu de navigation

---

## Ordre d'Implémentation Détaillé

### Sprint 1: Fondations (Statut + Client)
1. ✓ Migrations: statut, client (+ toutes les autres migrations)
2. ✓ Models: Statut, Client
3. Controllers + Resources: Statut, Client
4. Types TS: Statut, Client
5. Hooks: useModal, useForm
6. Composants UI: Button, Modal, Input, Table
7. Pages: Clients Index (liste + create modal + view modal)

### Sprint 2: Types de Charges
1. ✓ Migrations: charge_fixe_type, charge_variable_type
2. ✓ Models: ChargeFixeType, ChargeVariableType
3. ✓ Controllers + Resources: ChargeFixeType (terminé)
   - ✓ ChargeFixeTypeController avec index, store, show, update, destroy
   - ✓ ChargeFixeTypeStoreRequest et UpdateRequest
   - ✓ ChargeFixeTypeResource
   - ✓ Routes ajoutées
4. Types TS
5. Pages: Index pour chaque type

### Sprint 3: Revenus
1. ✓ Migration: revenus (avec statut_id et note)
2. ✓ Model: Revenu
3. Controller + Resource: Revenu
4. Types TS: Revenu
5. Composants: RevenuForm, RevenuTable
6. Page: Revenus Index (liste + create modal + view modal)

### Sprint 4: Charges
1. ✓ Migrations: charge_fixe, charge_variable
2. ✓ Models: ChargeFixe, ChargeVariable
3. Controllers + Resources
4. Types TS
5. Composants: Forms et Tables
6. Pages: Index pour chaque type

### Sprint 5: Bénéfices & Dashboard
1. ✓ Migration + Model: Benefice (migration terminée)
2. ✓ Model: Benefice
3. ✓ Service: BeneficeService
4. Controller + Resource
5. Page: Dashboard avec graphiques (optionnel)

---

## Standards de Code

### Backend (Laravel 12)
- Pas de syntaxe ancienne (utiliser nouvelles features PHP 8.2+)
- Type hints stricts partout
- Commentaires pour logique complexe
- Pas de duplication (traits si nécessaire)
- Validation dans Form Requests

### Frontend (React 19 + TypeScript)
- TypeScript strict
- Hooks pour logique réutilisable
- Composants petits et focalisés
- Pas de code dupliqué (composants partagés)
- Commentaires pour logique complexe

### Performance
- Eager loading (with()) pour éviter N+1
- Pagination côté serveur
- Index database optimisés
- Lazy loading modals (si gros composants)

---

## Structure Finale des Dossiers

```
app/
  Http/
    Controllers/
      ClientController.php
      StatutController.php
      RevenuController.php
      ChargeFixeController.php
      ChargeVariableController.php
      BeneficeController.php
    Requests/
      ClientStoreRequest.php
      RevenuStoreRequest.php
      ...
    Resources/
      ClientResource.php
      StatutResource.php
      ...
  Models/
    Client.php
    Statut.php
    Revenu.php
    ChargeFixe.php
    ChargeVariable.php
    ChargeFixeType.php
    ChargeVariableType.php
    Benefice.php
  Services/
    BeneficeService.php
    RevenuService.php (si nécessaire)
  Observers/
    RevenuObserver.php (si calcul auto bénéfice)

resources/js/
  components/
    ui/
      Button.tsx
      Modal.tsx
      Input.tsx
      Select.tsx
      Table.tsx
      Badge.tsx
    forms/
      ClientForm.tsx
      RevenuForm.tsx
    modals/
      CreateModal.tsx
      ViewModal.tsx
    Layout.tsx
    Navigation.tsx
  hooks/
    useModal.ts
    usePagination.ts
    useFilter.ts
    useForm.ts
    useDelete.ts
  pages/
    clients/
      Index.tsx
    revenus/
      Index.tsx
    charges-fixes/
      Index.tsx
    charges-variables/
      Index.tsx
    dashboard/
      Index.tsx
  types/
    models/
      index.ts
      Client.ts
      Statut.ts
      Revenu.ts
      ...
    api.ts
```