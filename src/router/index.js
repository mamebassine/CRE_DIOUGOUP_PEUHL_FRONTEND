import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/NotFound.vue";

// =========================
// LAYOUTS
// =========================

import PublicLayout from "../components/layouts/PublicLayout.vue";
import DashboardLayout from "../components/layouts/DashboardLayout.vue";

// =========================
// PAGES PUBLIQUES
// =========================

import Accueil from "../views/public/Accueil.vue";
import Centre from "../views/public/Centre.vue";
import Formations from "../views/public/Formations.vue";
import Horaires from "../views/public/Horaires.vue";
import Actualites from "../views/public/Actualites.vue";
import Galerie from "../views/public/Galerie.vue";
import Contact from "../views/public/Contact.vue";
import Partenaires from "../views/public/Partenaires.vue";
import InscriptionFormation from "../views/public/InscriptionFormation.vue";

// =========================
// AUTHENTIFICATION
// =========================

import { useAuthStore } from "../stores/auth";

import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

// =========================
// DASHBOARD ADMIN
// =========================

import Dashboard from "../views/dashboard/Dashboard.vue";
import Statistiques from "../views/dashboard/Statistiques.vue";
import ProfilAdmin from "../views/dashboard/Admin/Profil.vue";

// =========================
// ESPACE APPRENANT
// =========================

import ProfilApprenant from "../views/dashboard/Apprenants/Profil.vue";
import EspaceApprenant from "../views/dashboard/EspaceApprenant.vue";

// =========================================================
// ROUTES
// =========================================================

const routes = [

    // =====================================================
    // ESPACE PUBLIC
    // =====================================================

    {
        path: "/",
        component: PublicLayout,

        children: [

            {
                path: "",
                name: "accueil",
                component: Accueil
            },

            {
                path: "centre",
                name: "centre",
                component: Centre
            },

            {
                path: "formations",
                name: "formations",
                component: Formations
            },

            {
                path: "horaires",
                name: "horaires",
                component: Horaires
            },

            {
                path: "actualites",
                name: "actualites",
                component: Actualites
            },

            {
                path: "galerie",
                name: "galerie",
                component: Galerie
            },

            {
                path: "contact",
                name: "contact",
                component: Contact
            },

            {
                path: "partenaires",
                name: "partenaires",
                component: Partenaires
            }

        ]
    },

    // =====================================================
    // INSCRIPTION FORMATION
    // =====================================================

    {
        path: "/inscription-formation",
        name: "InscriptionFormation",
        component: InscriptionFormation
    },

    // =====================================================
    // AUTHENTIFICATION
    // =====================================================

    {
        path: "/login",
        name: "login",
        component: Login
    },

    {
        path: "/register",
        name: "register",
        component: Register
    },

    // =====================================================
    // DASHBOARD ADMIN / GESTIONNAIRE
    // =====================================================

    {
        path: "/dashboard",

        component: DashboardLayout,

        meta: {
            requiresAuth: true,
            roles: ["admin", "gestionnaire"]
        },

        children: [

            // =========================
            // ACCUEIL
            // =========================

            {
                path: "",
                name: "dashboard",
                component: Dashboard
            },

            // =========================
            // PROFIL
            // =========================

            {
                path: "profil",
                name: "profil-admin",
                component: ProfilAdmin
            },

            // =========================
            // APPRENANTS
            // =========================

            {
                path: "apprenants",
                name: "liste-apprenants",
                component: () =>
                    import(
                        "../views/dashboard/Admin/apprenants/ListeApprenants.vue"
                    )
            },

            {
                path: "apprenants/:id",
                name: "detail-apprenant",
                component: () =>
                    import(
                        "../views/dashboard/Admin/apprenants/DetailApprenant.vue"
                    )
            },

            {
                path: "apprenants/:id/modifier",
                name: "modifier-apprenant",
                component: () =>
                    import(
                        "../views/dashboard/Admin/apprenants/ModifierApprenant.vue"
                    )
            },

            // =========================
            // FORMATIONS
            // =========================

            {
                path: "formations",
                name: "liste-formations",
                component: () =>
                    import(
                        "../views/dashboard/Admin/formations/ListeFormations.vue"
                    )
            },

            {
                path: "formations/ajouter",
                name: "ajouter-formation",
                component: () =>
                    import(
                        "../views/dashboard/Admin/formations/AjouterFormation.vue"
                    )
            },

            {
                path: "formations/:id",
                name: "detail-formation",
                component: () =>
                    import(
                        "../views/dashboard/Admin/formations/DetailFormation.vue"
                    )
            },

            {
                path: "formations/:id/inscrire",
                name: "inscrire-apprenant",
                component: () =>
                    import(
                        "../views/dashboard/Admin/formations/InscrireApprenant.vue"
                    )
            },

            {
                path: "formations/:id/modifier",
                name: "modifier-formation",
                component: () =>
                    import(
                        "../views/dashboard/Admin/formations/ModifierFormation.vue"
                    )
            },

            // =========================
            // INSCRIPTIONS
            // =========================

            {
                path: "inscriptions",
                name: "liste-inscriptions",
                component: () =>
                    import(
                        "../views/dashboard/Admin/inscriptions/ListeInscriptions.vue"
                    )
            },

            {
                path: "inscriptions/ajouter",
                name: "ajouter-inscription",
                component: () =>
                    import(
                        "../views/dashboard/Admin/inscriptions/AjouterInscription.vue"
                    )
            },

            {
                path: "inscriptions/:id",
                name: "detail-inscription",
                component: () =>
                    import(
                        "../views/dashboard/Admin/inscriptions/DetailInscription.vue"
                    )
            },

            {
                path: "inscriptions/:id/modifier",
                name: "modifier-inscription",
                component: () =>
                    import(
                        "../views/dashboard/Admin/inscriptions/ModifierInscription.vue"
                    )
            },

            // =========================
            // STATISTIQUES
            // =========================

            {
                path: "statistiques",
                name: "statistiques",
                component: Statistiques
            }

        ]
    },

    // =====================================================
    // ESPACE APPRENANT
    // =====================================================

    {
        path: "/espace-apprenant",

        component: DashboardLayout,

        meta: {
            requiresAuth: true,
            roles: ["apprenant"]
        },

        children: [

            // =========================
            // ACCUEIL APPRENANT
            // =========================

            {
                path: "",
                name: "espace-apprenant",
                component: EspaceApprenant
            },

            // =========================
            // PROFIL
            // =========================

            {
                path: "profil",
                name: "profil-apprenant",
                component: ProfilApprenant
            },

            // =========================
            // FORMATIONS
            // =========================

            {
                path: "formations",
                name: "formations-apprenant",
                component: () =>
                    import(
                        "../views/dashboard/Apprenants/formations/Liste.vue"
                    )
            },

            // =========================
            // INSCRIPTIONS
            // =========================

            {
                path: "inscriptions",
                name: "inscriptions-apprenant",
                component: () =>
                    import(
                        "../views/dashboard/Apprenants/inscriptions/Listes.vue"
                    )
            },

            {
                path: "inscriptions/:id/modifier",
                name: "modifier-inscription-apprenant",
                component: () =>
                    import(
                        "../views/dashboard/Apprenants/inscriptions/Modifier.vue"
                    )
            },

            // =========================
            // DIPLOMES
            // =========================

            {
                path: "diplomes",
                name: "diplomes-apprenant",
                component: () =>
                    import(
                        "../views/dashboard/Apprenants/diplomes/ListeDiplomes.vue"
                    )
            },

            {
                path: "diplomes/demander",
                name: "demande-diplome-apprenant",
                component: () =>
                    import(
                        "../views/dashboard/Apprenants/diplomes/DemandeDiplomes.vue"
                    )
            },

            // =========================
            // BOITE À IDÉES
            // =========================

            {
                path: "boite-idee",
                name: "boite-idee-apprenant",
                component: () =>
                    import(
                        "../views/dashboard/Apprenants/boiteIdees/ListeIdee.vue"
                    )
            },

            {
                path: "boite-idee/:id/modifier",
                name: "modifier-boite-idee-apprenant",
                component: () =>
                    import(
                        "../views/dashboard/Apprenants/boiteIdees/Modifier.vue"
                    )
            }

        ]
    },

    // =====================================================
    // PAGE 404
    // =====================================================

    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFound
    }

];

// =========================================================
// CRÉATION DU ROUTER
// =========================================================

const router = createRouter({

    history: createWebHistory(),

    routes,

    scrollBehavior() {

        return {
            top: 0
        };

    }

});

// =========================================================
// PROTECTION DES ROUTES
// =========================================================

router.beforeEach((to) => {

    const auth = useAuthStore();

    // =====================================================
    // UTILISATEUR NON CONNECTÉ
    // =====================================================

    if (
        to.matched.some(record => record.meta.requiresAuth) &&
        !auth.isAuthenticated
    ) {

        return {
            name: "login"
        };

    }

    // =====================================================
    // UTILISATEUR DÉJÀ CONNECTÉ
    // =====================================================

    if (
        (to.name === "login" || to.name === "register") &&
        auth.isAuthenticated
    ) {

        if (auth.user?.role === "apprenant") {

            return {
                name: "espace-apprenant"
            };

        }

        if (
            auth.user?.role === "admin" ||
            auth.user?.role === "gestionnaire"
        ) {

            return {
                name: "dashboard"
            };

        }

    }

    // =====================================================
    // VÉRIFICATION DU RÔLE
    // =====================================================

    const requiredRoles = to.matched
        .map(record => record.meta.roles)
        .find(roles => roles);

    if (
        requiredRoles &&
        auth.user &&
        !requiredRoles.includes(auth.user.role)
    ) {

        if (auth.user.role === "apprenant") {

            return {
                name: "espace-apprenant"
            };

        }

        if (
            auth.user.role === "admin" ||
            auth.user.role === "gestionnaire"
        ) {

            return {
                name: "dashboard"
            };

        }

    }

    return true;

});

export default router;