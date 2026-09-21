<template>

    <div class="dashboard-apprenant">

        <div class="welcome-card">

            <div>

                <h2>
                    Bonjour {{ auth.user?.nom }} 👋
                </h2>

                <p>
                    Bienvenue dans votre espace apprenant du
                    <strong>CRE Diougoup Peuhl</strong>.
                </p>

            </div>

            <div class="welcome-icon">
                <i class="fas fa-user-graduate"></i>
            </div>

        </div>


        <div class="stats-grid">

            <div class="stat-card">

                <div class="icon blue">
                    <i class="fas fa-book"></i>
                </div>

                <div>
                    <h3>0</h3>
                    <p>Mes formations</p>
                </div>

            </div>


            <div class="stat-card">

                <div class="icon green">
                    <i class="fas fa-clipboard-check"></i>
                </div>

                <div>
                    <h3>0</h3>
                    <p>Mes inscriptions</p>
                </div>

            </div>


            <div class="stat-card">

                <div class="icon orange">
                    <i class="fas fa-award"></i>
                </div>

                <div>
                    <h3>0</h3>
                    <p>Diplômes / attestations</p>
                </div>

            </div>


            <div class="stat-card">

                <div class="icon purple">
                    <i class="fas fa-lightbulb"></i>
                </div>

                <div>
                    <h3>0</h3>
                    <p>Mes idées</p>
                </div>

            </div>

        </div>


        <div class="content-grid">

            <div class="activity-card">

                <h4>
                    <i class="fas fa-clock"></i>
                    Mes activités
                </h4>

                <p>
                    Aucune activité récente.
                </p>

            </div>


            <div class="info-card">

                <h4>
                    <i class="fas fa-circle-info"></i>
                    Mon espace
                </h4>

                <p>
                    Consultez vos formations, vos inscriptions,
                    vos diplômes et vos idées.
                </p>

            </div>

        </div>

    </div>

</template>


<script setup>

import { useAuthStore } from "../../stores/auth";

const auth = useAuthStore();

</script>


<style scoped>

.dashboard-apprenant {
    background: #F8FAFC;
}


/* ===================== BIENVENUE ===================== */

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

    margin-bottom: 25px;

    box-shadow: 0 10px 25px rgba(0,0,0,.08);

}

.welcome-card h2 {

    font-weight: 800;

    margin-bottom: 8px;

}

.welcome-card p {

    margin: 0;

    opacity: .95;

}

.welcome-icon {

    font-size: 55px;

    opacity: .25;

}


/* ===================== STATISTIQUES ===================== */

.stats-grid {

    display: grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(220px, 1fr)
        );

    gap: 20px;

    margin-bottom: 25px;

}

.stat-card {

    background: white;

    border-radius: 16px;

    padding: 20px;

    display: flex;

    align-items: center;

    gap: 18px;

    box-shadow: 0 8px 20px rgba(0,0,0,.06);

}

.icon {

    width: 60px;

    height: 60px;

    border-radius: 15px;

    display: flex;

    align-items: center;

    justify-content: center;

    color: white;

    font-size: 24px;

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

.stat-card h3 {

    margin: 0;

    font-size: 28px;

    color: #1F2937;

}

.stat-card p {

    margin: 5px 0 0;

    color: #6B7280;

}


/* ===================== CONTENU ===================== */

.content-grid {

    display: grid;

    grid-template-columns: 2fr 1fr;

    gap: 20px;

}

.activity-card,
.info-card {

    background: white;

    border-radius: 16px;

    padding: 25px;

    box-shadow: 0 8px 20px rgba(0,0,0,.06);

}

.activity-card h4,
.info-card h4 {

    color: #3B5998;

    font-weight: 700;

    margin-bottom: 18px;

}


/* ===================== RESPONSIVE ===================== */

@media (max-width: 900px) {

    .content-grid {

        grid-template-columns: 1fr;

    }

    .welcome-card {

        flex-direction: column;

        text-align: center;

        gap: 20px;

    }

}

</style>