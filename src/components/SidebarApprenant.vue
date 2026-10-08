<template>

    <div class="sidebar">

        <!-- ================= LOGO ================= -->

        <RouterLink
            to="/"
            class="logo"
        >

            <img
                src="@/assets/images/logo cre.png"
                alt="Logo CRE"
                class="logo-image"
            >

            <h3>
                CRE Diougoup Peuhl
            </h3>

            <span class="role-label">
                Espace Apprenant
            </span>

        </RouterLink>


        <!-- ================= MENU ================= -->

        <ul class="nav-menu">


            <!-- ================= DASHBOARD ================= -->

            <li>

                <RouterLink
                    to="/espace-apprenant"
                    class="menu-link"
                    exact-active-class="active-menu"
                >

                    <i class="fas fa-home"></i>

                    Tableau de bord

                </RouterLink>

            </li>


            <!-- ================= PROFIL ================= -->

            <li>

                <RouterLink
                    to="/espace-apprenant/profil"
                    class="menu-link"
                    active-class="active-menu"
                >

                    <i class="fas fa-user"></i>

                    Mon Profil

                </RouterLink>

            </li>


            <!-- ================= FORMATIONS ================= -->

            <li>

                <RouterLink
                    to="/espace-apprenant/formations"
                    class="menu-link"
                    active-class="active-menu"
                >

                    <i class="fas fa-book-open"></i>

                    Formations

                </RouterLink>

            </li>


            <!-- ================= MES INSCRIPTIONS ================= -->

            <!-- <li>

                <RouterLink
                to="/espace-apprenant/inscriptions"
                    class="menu-link"
                    active-class="active-menu"
                >

                    <i class="fas fa-file-signature"></i>

                    Mes inscriptions

                </RouterLink>

            </li> -->


            <!-- ================= MES DIPLOMES ================= -->

            <li>

                <RouterLink
                    to="/espace-apprenant/diplomes"
                    class="menu-link"
                    active-class="active-menu"
                >

                    <i class="fas fa-award"></i>

                    Mes diplômes

                </RouterLink>

            </li>


            <!-- ================= BOITE A IDEES ================= -->

            <li>

                <RouterLink
                   to="/espace-apprenant/boite-idee"
                    class="menu-link"
                    active-class="active-menu"
                >

                    <i class="fas fa-lightbulb"></i>

                    Boîte à idées

                </RouterLink>

            </li>


            <!-- ================= STATISTIQUES ================= -->

            <li>

                <RouterLink
                    to="/dashboard/statistiques"
                    class="menu-link"
                    active-class="active-menu"
                >

                    <i class="fas fa-chart-bar"></i>

                    Mes statistiques

                </RouterLink>

            </li>


        </ul>


        <!-- ================= DECONNEXION ================= -->

        <button
            class="logout-btn"
            @click="logout"
        >

            <i class="fas fa-sign-out-alt"></i>

            Déconnexion

        </button>


    </div>

</template>


<script setup>

import {
    RouterLink,
    useRouter
} from "vue-router";

import {
    useAuthStore
} from "../stores/auth";


const router = useRouter();

const auth = useAuthStore();


const logout = async () => {

    await auth.logout();

    router.push("/login");

};

</script>


<style scoped>

/* =========================
   SIDEBAR
========================= */

.sidebar {

    width: 270px;

    height: 100vh;

    position: fixed;

    top: 0;

    left: 0;

    background: linear-gradient(
        180deg,
        #3B5998,
        #2E7D32
    );

    color: white;

    padding: 20px 18px;

    display: flex;

    flex-direction: column;

    box-sizing: border-box;

    overflow: hidden;

}


/* =========================
   LOGO
========================= */

.logo {

    text-align: center;

    text-decoration: none;

    color: white;

    flex-shrink: 0;

    margin-bottom: 25px;

}


.logo-image {

    width: 85px;

    height: 85px;

    object-fit: contain;

    background: white;

    padding: 8px;

    border-radius: 15px;

    box-shadow: 0 8px 20px rgba(0, 0, 0, .2);

}


.logo h3 {

    font-size: 17px;

    margin-top: 12px;

    margin-bottom: 6px;

    font-weight: 700;

}


/* =========================
   ROLE
========================= */

.role-label {

    display: inline-block;

    font-size: 12px;

    font-weight: 600;

    background: rgba(255, 255, 255, .15);

    padding: 5px 12px;

    border-radius: 20px;

}


/* =========================
   MENU
========================= */

.nav-menu {

    list-style: none;

    padding: 0;

    margin: 0;

    flex: 1;

    overflow-y: auto;

    padding-right: 6px;

}


/* =========================
   SCROLLBAR
========================= */

.nav-menu::-webkit-scrollbar {

    width: 5px;

}


.nav-menu::-webkit-scrollbar-track {

    background: rgba(255, 255, 255, .08);

    border-radius: 20px;

}


.nav-menu::-webkit-scrollbar-thumb {

    background: rgba(255, 255, 255, .45);

    border-radius: 20px;

}


.nav-menu::-webkit-scrollbar-thumb:hover {

    background: white;

}


/* =========================
   MENU ITEMS
========================= */

.nav-menu li {

    margin-bottom: 10px;

}


.menu-link {

    display: flex;

    align-items: center;

    gap: 12px;

    padding: 13px 15px;

    color: white;

    text-decoration: none;

    border-radius: 12px;

    font-size: 15px;

    transition: .3s;

}


.menu-link i {

    width: 20px;

    font-size: 16px;

}


.menu-link:hover {

    background: rgba(255, 255, 255, .15);

    transform: translateX(5px);

}


/* =========================
   MENU ACTIF
========================= */

.active-menu {

    background: white;

    color: #2E7D32;

    font-weight: 700;

    box-shadow: 0 5px 15px rgba(0, 0, 0, .15);

}


/* =========================
   DECONNEXION
========================= */

.logout-btn {

    flex-shrink: 0;

    margin-top: 15px;

    border: none;

    padding: 13px;

    border-radius: 12px;

    background: transparent;

    color: white;

    font-weight: 700;

    cursor: pointer;

    transition: .3s;

    border: 1px solid rgba(255, 255, 255, .4);

}


.logout-btn:hover {

    background: white;

    color: #B91C1C;

    transform: translateY(-2px);

}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 850px) {

    .sidebar {

        width: 230px;

    }

}

</style>
