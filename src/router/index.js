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
// import FormulaireInscription from "../views/public/FormulaireInscription.vue";


// Auth
import { useAuthStore } from "../stores/auth";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

// Dashboard
import Dashboard from "../views/dashboard/Dashboard.vue";
import Profil from "../views/dashboard/Profil.vue";
import Apprenants from "../views/dashboard/Apprenants.vue";
import Diplomes from "../views/dashboard/Diplomes.vue";
import BoiteIdees from "../views/dashboard/BoiteIdees.vue";
import Users from "../views/dashboard/Users.vue";
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
            }

        ]
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
    // a enlever apres 
    // =========================
    //  {
    //     path: "/inscription",
    //     name: "Inscription",
    //     component: FormulaireInscription
    // },

    // =========================
    // DASHBOARD ADMIN
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

        {
            path: "apprenants",
            name: "apprenants",
            component: Apprenants
        },

        {
            path: "diplomes",
            name: "diplomes",
            component: Diplomes
        },

        {
            path: "boite-idees",
            name: "boite-idees",
            component: BoiteIdees
        },

        {
            path: "users",
            name: "users",
            component: Users
        },

        {
            path: "statistiques",
            name: "statistiques",
            component: Statistiques
        }

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

router.beforeEach((to, from, next) => {

    const auth = useAuthStore();

    // Vérifie si la route nécessite une authentification
    if (to.matched.some(record => record.meta.requiresAuth) && !auth.isAuthenticated) {
        return next("/login");
    }

    // Empêcher un utilisateur connecté d'aller sur login/register
    if (
        (to.name === "login" || to.name === "register") &&
        auth.isAuthenticated
    ) {
        return next("/dashboard");
    }

    next();

});
export default router;