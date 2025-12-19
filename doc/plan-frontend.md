# Plan Frontend - Application Gestion Financière

## Vue d'Ensemble

Frontend en React + TypeScript + Inertia.js avec composants UI existants (shadcn/ui).

---

## Phase 1: Types TypeScript

**Dossier:** `resources/js/features/types/`

Créer les interfaces TypeScript pour chaque modèle backend :

1. `Client.ts` - Interface Client
2. `Revenu.ts` - Interface Revenu
3. `ChargeFixe.ts` - Interface ChargeFixe
4. `ChargeVariable.ts` - Interface ChargeVariable
5. `ChargeFixeType.ts` - Interface ChargeFixeType
6. `ChargeVariableType.ts` - Interface ChargeVariableType
7. `Benefice.ts` - Interface Benefice

**Fichier central:** `features/types/index.ts` - Exports de tous les types

**Fichier:** `features/types/api.ts` - Types pour pagination (PaginatedResponse, etc.)

---

## Phase 2: Hooks Réutilisables

**Dossier:** `resources/js/features/hooks/`

Hooks centralisés pour éviter duplication :

1. `useModal.ts` - Gestion ouverture/fermeture modals
2. `usePagination.ts` - Gestion pagination Inertia
3. `useFilter.ts` - Gestion filtres avec query params
4. `useDelete.ts` - Confirmation suppression avec Inertia

**Note:** `useForm` existe déjà dans Inertia, pas besoin de wrapper.

---

## Phase 3: Composants Partagés (Shares)

**Dossier:** `resources/js/features/shares/`

Composants réutilisables entre toutes les features :

### Composants de Modals (dans `shares/modal/`)

1. `CreateModal.tsx` - Modal générique pour création
2. `ViewModal.tsx` - Modal générique pour visualisation
3. `EditModal.tsx` - Modal générique pour édition

### Composants de Buttons (dans `shares/butons/`)

1. Boutons réutilisables spécifiques aux fonctionnalités si nécessaire

### Composants de Layouts (dans `shares/layouts/`)

1. Layouts spécifiques aux fonctionnalités si nécessaire

**Note:** Composants UI de base existants dans `components/ui/` (Button, Input, Select, Dialog, Table, Badge, etc.)

---

## Phase 3b: Composants par Feature

**Structure:** Chaque feature a son propre dossier avec ses composants

### Feature: Clients
**Dossier:** `resources/js/features/clients/components/`

1. `forms/ClientForm.tsx` - Formulaire client (création/édition)
2. `tables/ClientTable.tsx` - Table client avec actions
3. `modal/` - Modals spécifiques (si nécessaire)

### Feature: Revenus
**Dossier:** `resources/js/features/revenus/components/`

1. `forms/RevenuForm.tsx` - Formulaire revenu
2. `tables/RevenuTable.tsx` - Table revenu avec actions
3. `modal/` - Modals spécifiques (si nécessaire)

### Feature: Charges Fixes
**Dossier:** `resources/js/features/chargesfixes/components/`

1. `forms/ChargeFixeForm.tsx` - Formulaire charge fixe
2. `tables/ChargeFixeTable.tsx` - Table charge fixe avec actions
3. `modal/` - Modals spécifiques (si nécessaire)

### Feature: Charges Variables
**Dossier:** `resources/js/features/chargesvariables/components/`

1. `forms/ChargeVariableForm.tsx` - Formulaire charge variable
2. `tables/ChargeVariableTable.tsx` - Table charge variable avec actions
3. `modal/` - Modals spécifiques (si nécessaire)

### Feature: Charge Fixe Types
**Dossier:** `resources/js/features/chargefixetypes/components/`

1. `forms/ChargeFixeTypeForm.tsx` - Formulaire type charge fixe
2. `tables/ChargeFixeTypeTable.tsx` - Table type charge fixe avec actions
3. `modal/` - Modals spécifiques (si nécessaire)

### Feature: Charge Variable Types
**Dossier:** `resources/js/features/chargevariabletypes/components/`

1. `forms/ChargeVariableTypeForm.tsx` - Formulaire type charge variable
2. `tables/ChargeVariableTypeTable.tsx` - Table type charge variable avec actions
3. `modal/` - Modals spécifiques (si nécessaire)

### Feature: Benefices
**Dossier:** `resources/js/features/benefices/components/`

1. `tables/BeneficeTable.tsx` - Table bénéfices (read-only)
2. `modal/` - Modals spécifiques (si nécessaire)

---

## Phase 4: Pages

**Dossier:** `resources/js/pages/`

Pages Inertia pour chaque ressource :

1. `clients/Index.tsx` - Liste clients avec filtres
2. `revenus/Index.tsx` - Liste revenus avec filtres
3. `charges-fixes/Index.tsx` - Liste charges fixes avec filtres
4. `charges-variables/Index.tsx` - Liste charges variables avec filtres
5. `charge-fixe-types/Index.tsx` - Liste types charges fixes (déjà peut-être fait)
6. `charge-variable-types/Index.tsx` - Liste types charges variables
7. `benefices/Index.tsx` - Liste bénéfices avec filtres

**Features par page:**
- Liste avec pagination
- Modal de création (popup)
- Modal de visualisation (view)
- Modal d'édition (edit)
- Filtres intégrés
- Actions (edit/delete)
- Messages de succès/erreur

---

## Phase 5: Navigation & Layout

**Fichiers:**
- Modifier `components/app-sidebar.tsx` - Ajouter liens vers nouvelles pages
- Modifier `routes/` - Ajouter routes TypeScript pour navigation

---

## Ordre d'Implémentation Recommandé

### Étape 1: Types & Hooks (Fondations)
1. Créer tous les types TypeScript
2. Créer hooks réutilisables (useModal, usePagination, useFilter, useDelete)

### Étape 2: Composants Partagés (features/shares)
1. Créer modals génériques dans `features/shares/modal/` (CreateModal, ViewModal, EditModal)

### Étape 3: Feature - Clients
1. Créer `features/clients/components/forms/ClientForm.tsx`
2. Créer `features/clients/components/tables/ClientTable.tsx`
3. Créer page `pages/clients/Index.tsx`

### Étape 4: Feature - Revenus
1. Créer `features/revenus/components/forms/RevenuForm.tsx`
2. Créer `features/revenus/components/tables/RevenuTable.tsx`
3. Créer page `pages/revenus/Index.tsx`

### Étape 5: Feature - Charges Fixes
1. Créer `features/chargesfixes/components/forms/ChargeFixeForm.tsx`
2. Créer `features/chargesfixes/components/tables/ChargeFixeTable.tsx`
3. Créer page `pages/charges-fixes/Index.tsx`

### Étape 6: Feature - Charges Variables
1. Créer `features/chargesvariables/components/forms/ChargeVariableForm.tsx`
2. Créer `features/chargesvariables/components/tables/ChargeVariableTable.tsx`
3. Créer page `pages/charges-variables/Index.tsx`

### Étape 7: Feature - Charge Fixe Types
1. Créer `features/chargefixetypes/components/forms/ChargeFixeTypeForm.tsx`
2. Créer `features/chargefixetypes/components/tables/ChargeFixeTypeTable.tsx`
3. Créer page `pages/charge-fixe-types/Index.tsx`

### Étape 8: Feature - Charge Variable Types
1. Créer `features/chargevariabletypes/components/forms/ChargeVariableTypeForm.tsx`
2. Créer `features/chargevariabletypes/components/tables/ChargeVariableTypeTable.tsx`
3. Créer page `pages/charge-variable-types/Index.tsx`

### Étape 9: Feature - Bénéfices
1. Créer `features/benefices/components/tables/BeneficeTable.tsx`
2. Créer page `pages/benefices/Index.tsx` (read-only)

### Étape 10: Navigation
1. Mettre à jour sidebar avec liens
2. Ajouter routes TypeScript

---

## Structure des Fichiers

```
resources/js/
├── features/
│   ├── types/
│   │   ├── index.ts
│   │   ├── Client.ts
│   │   ├── Revenu.ts
│   │   ├── ChargeFixe.ts
│   │   ├── ChargeVariable.ts
│   │   ├── ChargeFixeType.ts
│   │   ├── ChargeVariableType.ts
│   │   ├── Benefice.ts
│   │   └── api.ts
│   ├── hooks/
│   │   ├── useModal.ts
│   │   ├── usePagination.ts
│   │   ├── useFilter.ts
│   │   └── useDelete.ts
│   ├── shares/
│   │   ├── modal/
│   │   │   ├── CreateModal.tsx
│   │   │   ├── ViewModal.tsx
│   │   │   └── EditModal.tsx
│   │   ├── butons/
│   │   └── layouts/
│   ├── clients/
│   │   └── components/
│   │       ├── forms/
│   │       │   └── ClientForm.tsx
│   │       ├── tables/
│   │       │   └── ClientTable.tsx
│   │       └── modal/
│   ├── revenus/
│   │   └── components/
│   │       ├── forms/
│   │       │   └── RevenuForm.tsx
│   │       ├── tables/
│   │       │   └── RevenuTable.tsx
│   │       └── modal/
│   ├── chargesfixes/
│   │   └── components/
│   │       ├── forms/
│   │       │   └── ChargeFixeForm.tsx
│   │       ├── tables/
│   │       │   └── ChargeFixeTable.tsx
│   │       └── modal/
│   ├── chargesvariables/
│   │   └── components/
│   │       ├── forms/
│   │       │   └── ChargeVariableForm.tsx
│   │       ├── tables/
│   │       │   └── ChargeVariableTable.tsx
│   │       └── modal/
│   ├── chargefixetypes/
│   │   └── components/
│   │       ├── forms/
│   │       │   └── ChargeFixeTypeForm.tsx
│   │       ├── tables/
│   │       │   └── ChargeFixeTypeTable.tsx
│   │       └── modal/
│   ├── chargevariabletypes/
│   │   └── components/
│   │       ├── forms/
│   │       │   └── ChargeVariableTypeForm.tsx
│   │       ├── tables/
│   │       │   └── ChargeVariableTypeTable.tsx
│   │       └── modal/
│   └── benefices/
│       └── components/
│           ├── tables/
│           │   └── BeneficeTable.tsx
│           └── modal/
├── components/
│   └── ui/ (déjà existant - shadcn/ui)
└── pages/
    ├── clients/
    │   └── Index.tsx
    ├── revenus/
    │   └── Index.tsx
    ├── charges-fixes/
    │   └── Index.tsx
    ├── charges-variables/
    │   └── Index.tsx
    ├── charge-fixe-types/
    │   └── Index.tsx
    ├── charge-variable-types/
    │   └── Index.tsx
    └── benefices/
        └── Index.tsx
```

---

## Notes Importantes

- Utiliser les composants UI existants (Button, Input, Select, Dialog, Table, Badge)
- Utiliser Inertia `useForm` pour les formulaires
- Utiliser Inertia `router` pour navigation
- TypeScript strict partout
- Pas de duplication de code (composants réutilisables)
- Messages en français

