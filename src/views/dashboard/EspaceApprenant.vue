<template>

    <div class="dashboard-apprenant">

        <!-- ===================== BIENVENUE ===================== -->

        <div class="welcome-card">

            <div class="welcome-content">

                <span class="welcome-label">
                    ESPACE APPRENANT
                </span>

                <h2>
                    Bonjour {{ auth.user?.nom || "Apprenant" }} 👋
                </h2>

                <p>
                    Bienvenue dans votre espace personnel du
                    <strong>CRE Diougoup Peuhl</strong>.
                </p>

                <div class="welcome-date">
                    <i class="fas fa-calendar-day"></i>

                    {{ currentDate }}
                </div>

            </div>


            <div class="welcome-icon">

                <i class="fas fa-user-graduate"></i>

            </div>

        </div>


        <!-- ===================== MES INFORMATIONS ===================== -->

        <div class="section-title">

            <div>

                <h3>
                    Mon espace
                </h3>

                <p>
                    Retrouvez rapidement vos informations principales.
                </p>

            </div>

        </div>


        <!-- ===================== STATISTIQUES ===================== -->

        <div class="stats-grid">


            <!-- FORMATIONS -->

            <div class="stat-card">

                <div class="icon blue">

                    <i class="fas fa-book-open"></i>

                </div>

                <div>

                    <span>
                        Formations
                    </span>

                    <h3>
                        {{ stats.formations }}
                    </h3>

                </div>

            </div>


            <!-- INSCRIPTIONS -->

            <div class="stat-card">

                <div class="icon green">

                    <i class="fas fa-file-signature"></i>

                </div>

                <div>

                    <span>
                        Inscriptions
                    </span>

                    <h3>
                        {{ stats.inscriptions }}
                    </h3>

                </div>

            </div>


            <!-- DIPLOMES -->

            <div class="stat-card">

                <div class="icon orange">

                    <i class="fas fa-award"></i>

                </div>

                <div>

                    <span>
                        Diplômes
                    </span>

                    <h3>
                        {{ stats.diplomes }}
                    </h3>

                </div>

            </div>


            <!-- IDEES -->

            <div class="stat-card">

                <div class="icon purple">

                    <i class="fas fa-lightbulb"></i>

                </div>

                <div>

                    <span>
                        Mes idées
                    </span>

                    <h3>
                        {{ stats.idees }}
                    </h3>

                </div>

            </div>


        </div>


        <!-- ===================== CONTENU ===================== -->

        <div class="content-grid">


            <!-- ===================== ACTIONS RAPIDES ===================== -->

            <div class="activity-card">

                <div class="card-header">

                    <div>

                        <h4>
                            <i class="fas fa-bolt"></i>

                            Accès rapides
                        </h4>

                        <p>
                            Accédez facilement à vos principales fonctionnalités.
                        </p>

                    </div>

                </div>


                <div class="quick-actions">


                    <RouterLink
                        to="/dashboard/formations"
                        class="quick-action"
                    >

                        <div class="quick-icon blue">

                            <i class="fas fa-book-open"></i>

                        </div>

                        <div>

                            <strong>
                                Formations
                            </strong>

                            <small>
                                Consulter les formations
                            </small>

                        </div>

                        <i class="fas fa-chevron-right arrow"></i>

                    </RouterLink>


                    <RouterLink
                        to="/dashboard/inscriptions"
                        class="quick-action"
                    >

                        <div class="quick-icon green">

                            <i class="fas fa-file-signature"></i>

                        </div>

                        <div>

                            <strong>
                                Mes inscriptions
                            </strong>

                            <small>
                                Suivre mes inscriptions
                            </small>

                        </div>

                        <i class="fas fa-chevron-right arrow"></i>

                    </RouterLink>


                    <RouterLink
                        to="/dashboard/profil"
                        class="quick-action"
                    >

                        <div class="quick-icon orange">

                            <i class="fas fa-user"></i>

                        </div>

                        <div>

                            <strong>
                                Mon profil
                            </strong>

                            <small>
                                Consulter mes informations
                            </small>

                        </div>

                        <i class="fas fa-chevron-right arrow"></i>

                    </RouterLink>


                    <RouterLink
                        to="/dashboard/diplomes"
                        class="quick-action"
                    >

                        <div class="quick-icon purple">

                            <i class="fas fa-award"></i>

                        </div>

                        <div>

                            <strong>
                                Mes diplômes
                            </strong>

                            <small>
                                Consulter mes diplômes
                            </small>

                        </div>

                        <i class="fas fa-chevron-right arrow"></i>

                    </RouterLink>


                </div>

            </div>


            <!-- ===================== MON PROFIL ===================== -->

            <div class="info-card">

                <div class="card-header">

                    <h4>

                        <i class="fas fa-user-circle"></i>

                        Mon profil

                    </h4>

                </div>


                <div class="profile-mini">


                    <div class="profile-avatar">

                        <img
                            v-if="auth.user?.photo"
                            :src="`http://127.0.0.1:8000/storage/${auth.user.photo}`"
                            alt="Photo de profil"
                        >

                        <i
                            v-else
                            class="fas fa-user"
                        ></i>

                    </div>


                    <div class="profile-details">

                        <strong>
                            {{ auth.user?.nom || "Apprenant" }}
                        </strong>

                        <span>
                            {{ auth.user?.email || "Email non renseigné" }}
                        </span>

                        <small>

                            <i class="fas fa-user-graduate"></i>

                            {{ auth.user?.role || "Apprenant" }}

                        </small>

                    </div>

                </div>


                <RouterLink
                    to="/dashboard/profil"
                    class="profile-button"
                >

                    Voir mon profil

                    <i class="fas fa-arrow-right"></i>

                </RouterLink>


            </div>


        </div>


        <!-- ===================== MESSAGE ===================== -->

        <div class="info-banner">

            <div class="banner-icon">

                <i class="fas fa-circle-info"></i>

            </div>

            <div>

                <strong>
                    Votre espace personnel
                </strong>

                <p>
                    Consultez vos formations, suivez vos inscriptions
                    et gardez vos informations à jour.
                </p>

            </div>

        </div>


    </div>

</template>


<script setup>

import {
    computed
} from "vue";

import {
    RouterLink
} from "vue-router";

import {
    useAuthStore
} from "../../stores/auth";


const auth = useAuthStore();


/* =========================
   DATE ACTUELLE
========================= */

const currentDate = computed(() => {

    return new Date().toLocaleDateString(
        "fr-FR",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

});


/* =========================
   STATISTIQUES
   Valeurs temporaires
   à remplacer par les API
========================= */

const stats = {

    formations: 0,

    inscriptions: 0,

    diplomes: 0,

    idees: 0

};

</script>


<style scoped>

/* =========================
   PAGE
========================= */

.dashboard-apprenant {

    background: #F8FAFC;

}


/* =========================
   BIENVENUE
========================= */

.welcome-card {

    background: linear-gradient(
        135deg,
        #3B5998,
        #2E7D32
    );

    color: white;

    border-radius: 18px;

    padding: 30px;

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 30px;

    box-shadow:
        0 10px 25px rgba(0,0,0,.08);

}


.welcome-content {

    max-width: 700px;

}


.welcome-label {

    display: inline-block;

    font-size: 11px;

    font-weight: 800;

    letter-spacing: 1px;

    background: rgba(255,255,255,.15);

    padding: 6px 12px;

    border-radius: 20px;

    margin-bottom: 12px;

}


.welcome-card h2 {

    font-weight: 800;

    margin: 0 0 8px;

}


.welcome-card p {

    margin: 0 0 15px;

    opacity: .95;

}


.welcome-date {

    display: flex;

    align-items: center;

    gap: 8px;

    font-size: 13px;

    opacity: .9;

}


.welcome-icon {

    font-size: 70px;

    opacity: .20;

    padding-right: 20px;

}


/* =========================
   TITRE SECTION
========================= */

.section-title {

    margin-bottom: 18px;

}


.section-title h3 {

    margin: 0;

    color: #1F2937;

    font-size: 21px;

    font-weight: 800;

}


.section-title p {

    margin: 5px 0 0;

    color: #6B7280;

    font-size: 14px;

}


/* =========================
   STATISTIQUES
========================= */

.stats-grid {

    display: grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(210px, 1fr)
        );

    gap: 18px;

    margin-bottom: 30px;

}


.stat-card {

    background: white;

    border-radius: 16px;

    padding: 20px;

    display: flex;

    align-items: center;

    gap: 15px;

    box-shadow:
        0 8px 20px rgba(0,0,0,.06);

    transition: .3s;

}


.stat-card:hover {

    transform: translateY(-4px);

    box-shadow:
        0 12px 25px rgba(0,0,0,.09);

}


.icon {

    width: 55px;

    height: 55px;

    border-radius: 14px;

    display: flex;

    align-items: center;

    justify-content: center;

    color: white;

    font-size: 21px;

    flex-shrink: 0;

}


.blue {

    background: #3B5998;

}


.green {

    background: #2E7D32;

}


.orange {

    background: #F59E0B;

}


.purple {

    background: #7C3AED;

}


.stat-card span {

    display: block;

    color: #6B7280;

    font-size: 13px;

    margin-bottom: 4px;

}


.stat-card h3 {

    margin: 0;

    font-size: 27px;

    color: #1F2937;

    font-weight: 800;

}


/* =========================
   CONTENU
========================= */

.content-grid {

    display: grid;

    grid-template-columns: 2fr 1fr;

    gap: 20px;

    margin-bottom: 20px;

}


.activity-card,
.info-card {

    background: white;

    border-radius: 16px;

    padding: 25px;

    box-shadow:
        0 8px 20px rgba(0,0,0,.06);

}


.card-header {

    margin-bottom: 20px;

}


.card-header h4 {

    margin: 0;

    color: #3B5998;

    font-weight: 700;

}


.card-header h4 i {

    margin-right: 8px;

}


.card-header p {

    margin: 6px 0 0;

    color: #6B7280;

    font-size: 13px;

}


/* =========================
   ACCES RAPIDES
========================= */

.quick-actions {

    display: flex;

    flex-direction: column;

    gap: 10px;

}


.quick-action {

    display: flex;

    align-items: center;

    gap: 12px;

    padding: 12px;

    border-radius: 12px;

    text-decoration: none;

    color: #1F2937;

    transition: .3s;

    border: 1px solid #F1F5F9;

}


.quick-action:hover {

    background: #F8FAFC;

    transform: translateX(4px);

}


.quick-icon {

    width: 42px;

    height: 42px;

    border-radius: 11px;

    display: flex;

    align-items: center;

    justify-content: center;

    color: white;

    flex-shrink: 0;

}


.quick-action strong {

    display: block;

    font-size: 14px;

}


.quick-action small {

    display: block;

    color: #6B7280;

    margin-top: 2px;

}


.arrow {

    margin-left: auto;

    color: #9CA3AF;

    font-size: 12px;

}


/* =========================
   PROFIL
========================= */

.profile-mini {

    display: flex;

    align-items: center;

    gap: 15px;

    margin-bottom: 20px;

}


.profile-avatar {

    width: 65px;

    height: 65px;

    border-radius: 50%;

    background: #F1F5F9;

    border: 3px solid #2E7D32;

    display: flex;

    align-items: center;

    justify-content: center;

    overflow: hidden;

    color: #3B5998;

    font-size: 25px;

    flex-shrink: 0;

}


.profile-avatar img {

    width: 100%;

    height: 100%;

    object-fit: cover;

}


.profile-details {

    display: flex;

    flex-direction: column;

    gap: 4px;

    min-width: 0;

}


.profile-details strong {

    color: #1F2937;

    font-size: 15px;

}


.profile-details span {

    color: #6B7280;

    font-size: 12px;

    overflow: hidden;

    text-overflow: ellipsis;

}


.profile-details small {

    color: #2E7D32;

    font-weight: 700;

    font-size: 12px;

}


.profile-details small i {

    margin-right: 4px;

}


.profile-button {

    display: flex;

    align-items: center;

    justify-content: space-between;

    width: 100%;

    box-sizing: border-box;

    padding: 11px 14px;

    border-radius: 10px;

    background: #F8FAFC;

    color: #3B5998;

    text-decoration: none;

    font-size: 13px;

    font-weight: 700;

    transition: .3s;

}


.profile-button:hover {

    background: #3B5998;

    color: white;

}


/* =========================
   MESSAGE
========================= */

.info-banner {

    background: white;

    border-left: 4px solid #2E7D32;

    border-radius: 12px;

    padding: 17px 20px;

    display: flex;

    align-items: center;

    gap: 14px;

    box-shadow:
        0 6px 15px rgba(0,0,0,.05);

}


.banner-icon {

    width: 40px;

    height: 40px;

    border-radius: 50%;

    background: #DCFCE7;

    color: #2E7D32;

    display: flex;

    align-items: center;

    justify-content: center;

    flex-shrink: 0;

}


.info-banner strong {

    color: #1F2937;

    font-size: 14px;

}


.info-banner p {

    margin: 3px 0 0;

    color: #6B7280;

    font-size: 13px;

}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 900px) {

    .content-grid {

        grid-template-columns: 1fr;

    }


    .welcome-card {

        flex-direction: column;

        text-align: center;

        gap: 20px;

    }


    .welcome-date {

        justify-content: center;

    }


    .welcome-icon {

        padding-right: 0;

    }

}


@media (max-width: 600px) {

    .stats-grid {

        grid-template-columns: 1fr;

    }


    .welcome-card {

        padding: 22px;

    }


    .activity-card,
    .info-card {

        padding: 18px;

    }

}

</style>
