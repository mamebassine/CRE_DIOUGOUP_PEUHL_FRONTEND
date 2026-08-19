import { createRouter, createWebHistory } from "vue-router";

// Layouts
import PublicLayout from "../components/layouts/PublicLayout.vue";
import DashboardLayout from "../components/layouts/DashboardLayout.vue";

// Pages publiques
import Accueil from "../views/public/Accueil.vue";
import Centre from "../views/public/Centre.vue";
import Formations from "../views/public/Formations.vue";
import Horaires from "../views/public/Horaires.vue";
import Actualites from "../views/public/Actualites.vue";
import Galerie from "../views/public/Galerie.vue";
import Contact from "../views/public/Contact.vue";
import Partenaires from "../views/public/Partenaires.vue";

import InscriptionFormation from "../views/public/InscriptionFormation.vue";


// Auth
import { useAuthStore } from "../stores/auth";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

// Dashboard
import Dashboard from "../views/dashboard/Dashboard.vue";
import Profil from "../views/dashboard/Profil.vue";
import Statistiques from "../views/dashboard/Statistiques.vue";

const routes = [


// =========================
    // ESPACE PUBLIC
    // =========================
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
            },
          

        ]
    },



// =========================
// INSCRIPTION FORMATION
// =========================

{
    path: "/inscription-formation",
    name: "InscriptionFormation",
    component: InscriptionFormation
},




    // =========================
    // AUTHENTIFICATION
    // =========================
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

    // =========================
    // DASHBOARD
    // =========================
    {
        path: "/dashboard",
        component: DashboardLayout,
        meta: {
            requiresAuth: true
        },

        children: [

            {
                path: "",
                name: "dashboard",
                component: Dashboard
            },

            {
                path: "profil",
                name: "profil",
                component: Profil
            },

            // ================= APPRENANTS =================

            {
                path: "apprenants",
                name: "liste-apprenants",
                component: () =>
                    import("../views/dashboard/apprenants/ListeApprenants.vue")
            },

            {
                path: "apprenants/ajouter",
                name: "ajouter-apprenant",
                component: () =>
                    import("../views/dashboard/apprenants/AjouterApprenant.vue")
            },

            {
                path: "apprenants/:id",
                name: "detail-apprenant",
                component: () =>
                    import("../views/dashboard/apprenants/DetailApprenant.vue")
            },

            {
                path: "apprenants/:id/modifier",
                name: "modifier-apprenant",
                component: () =>
                    import("../views/dashboard/apprenants/ModifierApprenant.vue")
            },

           // ================= FORMATIONS =================


{
    path: "formations",
    name: "liste-formations",
    component: () =>
        import("../views/dashboard/formations/ListeFormations.vue")
},


{
    path: "formations/ajouter",
    name: "ajouter-formation",
    component: () =>
        import("../views/dashboard/formations/AjouterFormation.vue")
},


{
    path: "formations/:id",
    name: "detail-formation",
    component: () =>
        import("../views/dashboard/formations/DetailFormation.vue")
},


{
    path: "formations/:id/modifier",
    name: "modifier-formation",
    component: () =>
        import("../views/dashboard/formations/ModifierFormation.vue")
},






// ================= INSCRIPTIONS =================


{
    path: "inscriptions",
    name: "liste-inscriptions",
    component: () =>
        import("../views/dashboard/inscriptions/ListeInscriptions.vue")
},


{
    path: "inscriptions/ajouter",
    name: "ajouter-inscription",
    component: () =>
        import("../views/dashboard/inscriptions/AjouterInscription.vue")
},


{
    path: "inscriptions/:id",
    name: "detail-inscription",
    component: () =>
        import("../views/dashboard/inscriptions/DetailInscription.vue")
},


{
    path: "inscriptions/:id/modifier",
    name: "modifier-inscription",
    component: () =>
        import("../views/dashboard/inscriptions/ModifierInscription.vue")
},




// ================= STATISTIQUES =================

{
    path: "statistiques",
    name: "statistiques",
    component: Statistiques
}

            /*
            ====================================================
            CES ROUTES SERONT DÉCOMMENTÉES PLUS TARD
            QUAND LES DOSSIERS SERONT CRÉÉS
            ====================================================

            // ================= DIPLOMES =================

            {
                path: "diplomes",
                component: () => import("../views/dashboard/diplomes/ListeDiplomes.vue")
            },

            {
                path: "diplomes/ajouter",
                component: () => import("../views/dashboard/diplomes/AjouterDiplome.vue")
            },

            {
                path: "diplomes/:id",
                component: () => import("../views/dashboard/diplomes/DetailDiplome.vue")
            },

            {
                path: "diplomes/:id/modifier",
                component: () => import("../views/dashboard/diplomes/ModifierDiplome.vue")
            },

            // ================= BOITE IDEES =================

            {
                path: "boite-idees",
                component: () => import("../views/dashboard/boite-idees/ListeBoiteIdees.vue")
            },

            {
                path: "boite-idees/ajouter",
                component: () => import("../views/dashboard/boite-idees/AjouterBoiteIdee.vue")
            },

            {
                path: "boite-idees/:id",
                component: () => import("../views/dashboard/boite-idees/DetailBoiteIdee.vue")
            },

            {
                path: "boite-idees/:id/modifier",
                component: () => import("../views/dashboard/boite-idees/ModifierBoiteIdee.vue")
            },

            // ================= USERS =================

            {
                path: "users",
                component: () => import("../views/dashboard/users/ListeUsers.vue")
            },

            {
                path: "users/ajouter",
                component: () => import("../views/dashboard/users/AjouterUser.vue")
            },

            {
                path: "users/:id",
                component: () => import("../views/dashboard/users/DetailUser.vue")
            },

            {
                path: "users/:id/modifier",
                component: () => import("../views/dashboard/users/ModifierUser.vue")
            }

            */

        ]
    },

    // =========================
    // PAGE 404
    // =========================
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: {
            template: `
                <div style="text-align:center;margin-top:50px">
                    <h1>404</h1>
                    <p>Page introuvable</p>
                </div>
            `
        }
    }

];

const router = createRouter({

    history: createWebHistory(),

    routes,

    scrollBehavior() {

        return {
            top: 0
        };

    }

});

router.beforeEach((to) => {

    const auth = useAuthStore();


    if(
        to.matched.some(record => record.meta.requiresAuth)
        &&
        !auth.isAuthenticated
    ){

        return "/login";

    }



    if(
        (to.name === "login" || to.name === "register")
        &&
        auth.isAuthenticated
    ){

        return "/dashboard";

    }



    return true;


});
export default router;