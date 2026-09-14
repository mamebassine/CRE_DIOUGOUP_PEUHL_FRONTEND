<script setup>

defineProps({

    inscriptions: {

        type: Array,

        default: () => []

    }

});


defineEmits([

    "voir",

    "modifier",

    "supprimer"

]);


/* =========================================================
   CLASSE STATUT
========================================================= */

function classeStatut(statut) {

    if (!statut) {

        return "statut-default";

    }


    const valeur = statut.toLowerCase();


    if (

        valeur.includes("valid")

        ||

        valeur.includes("accept")

        ||

        valeur.includes("inscrit")

    ) {

        return "statut-valide";

    }


    if (

        valeur.includes("attente")

        ||

        valeur.includes("pending")

    ) {

        return "statut-attente";

    }


    if (

        valeur.includes("refus")

        ||

        valeur.includes("annul")

    ) {

        return "statut-refuse";

    }


    return "statut-default";

}

</script>


<template>

<div class="inscriptions-wrapper">


    <!-- =====================================================
         CARTE TABLEAU
    ====================================================== -->

    <div class="table-card">


        <!-- =================================================
             EN-TÊTE
        ================================================== -->

        <div class="table-top">

            <div class="table-title">

                <div class="title-icon">

                    <i class="fas fa-user-graduate"></i>

                </div>


                <div>

                    <h3>

                        Liste des inscriptions

                    </h3>


                    <p>

                        {{ inscriptions.length }}

                        {{

                            inscriptions.length > 1

                                ? "inscriptions"

                                : "inscription"

                        }}

                    </p>

                </div>

            </div>

        </div>



        <!-- =================================================
             CONTENEUR TABLE
        ================================================== -->

        <div class="table-container">


            <!-- =================================================
                 TABLEAU
            ================================================== -->

            <table>


                <!-- =================================================
                     EN-TÊTE
                ================================================== -->

                <thead>

                    <tr>

                        <th>

                            APPRENANT

                        </th>


                        <th>

                            FORMATION

                        </th>


                        <th>

                            STATUT

                        </th>


                        <th class="actions-header">

                            ACTIONS

                        </th>

                    </tr>

                </thead>



                <!-- =================================================
                     CORPS
                ================================================== -->

                <tbody>


                    <!-- =================================================
                         INSCRIPTIONS
                    ================================================== -->

                    <tr

                        v-for="inscription in inscriptions"

                        :key="inscription.id"

                    >


                        <!-- =========================================
                             APPRENANT
                        ========================================== -->

                        <td>

                            <div class="apprenant-info">


                                <!-- AVATAR -->

                                <div class="avatar">

                                    {{

                                        inscription.apprenant?.user?.prenom

                                            ?.charAt(0)

                                            ?.toUpperCase()

                                        ||

                                        inscription.apprenant?.user?.nom

                                            ?.charAt(0)

                                            ?.toUpperCase()

                                        ||

                                        "A"

                                    }}

                                </div>



                                <!-- INFORMATIONS -->

                                <div class="apprenant-details">

                                    <strong>

                                        {{

                                            inscription.apprenant?.user?.prenom

                                            || ""

                                        }}

                                        {{

                                            inscription.apprenant?.user?.nom

                                            || ""

                                        }}

                                    </strong>


                                    <span>

                                        Inscription #{{ inscription.id }}

                                    </span>

                                </div>

                            </div>

                        </td>



                        <!-- =========================================
                             FORMATION
                        ========================================== -->

                        <td>

                            <div class="formation-info">


                                <div class="formation-icon">

                                    <i class="fas fa-graduation-cap"></i>

                                </div>


                                <div class="formation-details">

                                    <strong>

                                        {{

                                            inscription.formation?.nom

                                            ||

                                            "Formation non définie"

                                        }}

                                    </strong>


                                    <span>

                                        Formation professionnelle

                                    </span>

                                </div>

                            </div>

                        </td>



                        <!-- =========================================
                             STATUT
                        ========================================== -->

                        <td>

                            <span

                                class="badge"

                                :class="classeStatut(inscription.statut)"

                            >

                                <span class="status-dot"></span>

                                {{

                                    inscription.statut

                                    ||

                                    "Non défini"

                                }}

                            </span>

                        </td>



                        <!-- =========================================
                             ACTIONS
                        ========================================== -->

                        <td>

                            <div class="actions">


                                <!-- VOIR -->

                                <button

                                    type="button"

                                    class="action-btn view"

                                    title="Voir l'inscription"

                                    @click="$emit('voir', inscription.id)"

                                >

                                    <i class="fas fa-eye"></i>

                                </button>



                                <!-- MODIFIER -->

                                <button

                                    type="button"

                                    class="action-btn edit"

                                    title="Modifier l'inscription"

                                    @click="$emit('modifier', inscription.id)"

                                >

                                    <i class="fas fa-pen"></i>

                                </button>



                                <!-- SUPPRIMER -->

                                <button

                                    type="button"

                                    class="action-btn delete"

                                    title="Supprimer l'inscription"

                                    @click="$emit('supprimer', inscription.id)"

                                >

                                    <i class="fas fa-trash-alt"></i>

                                </button>

                            </div>

                        </td>

                    </tr>



                    <!-- =================================================
                         AUCUNE INSCRIPTION
                    ================================================== -->

                    <tr v-if="inscriptions.length === 0">

                        <td

                            colspan="4"

                            class="empty-state"

                        >

                            <div class="empty-icon">

                                <i class="fas fa-user-graduate"></i>

                            </div>


                            <h4>

                                Aucune inscription trouvée

                            </h4>


                            <p>

                                Aucune inscription n'est disponible pour le moment.

                            </p>

                        </td>

                    </tr>


                </tbody>

            </table>

        </div>

    </div>

</div>

</template>


<style scoped>

/* =========================================================
   CONTENEUR GLOBAL
========================================================= */

.inscriptions-wrapper {

    width: 100%;

}


/* =========================================================
   CARTE
========================================================= */

.table-card {

    width: 100%;

    background: #ffffff;

    border-radius: 20px;

    border: 1px solid #e8edf5;

    box-shadow:

        0 8px 30px rgba(15, 23, 42, 0.06);

    overflow: hidden;

}


/* =========================================================
   EN-TÊTE
========================================================= */

.table-top {

    padding: 25px 30px;

    border-bottom: 1px solid #edf1f7;

    background: #ffffff;

}


.table-title {

    display: flex;

    align-items: center;

    gap: 15px;

}


.title-icon {

    width: 55px;

    height: 55px;

    border-radius: 14px;

    display: flex;

    align-items: center;

    justify-content: center;

    background: #eef2ff;

    color: #3B5998;

    font-size: 21px;

}


.table-title h3 {

    margin: 0;

    color: #172554;

    font-size: 21px;

    font-weight: 800;

}


.table-title p {

    margin: 5px 0 0;

    color: #94a3b8;

    font-size: 14px;

}


/* =========================================================
   CONTENEUR TABLE
========================================================= */

.table-container {

    width: 100%;

    overflow-x: auto;

}


/* =========================================================
   TABLE
========================================================= */

table {

    width: 100%;

    min-width: 850px;

    border-collapse: collapse;

}


/* =========================================================
   HEADER TABLE
========================================================= */

thead {

    background: #f8fafc;

}


th {

    padding: 18px 25px;

    color: #64748b;

    font-size: 12px;

    font-weight: 800;

    letter-spacing: .7px;

    text-align: left;

    border-bottom: 1px solid #e9eef5;

    white-space: nowrap;

}


.actions-header {

    text-align: center;

}


/* =========================================================
   CELLULES
========================================================= */

td {

    padding: 20px 25px;

    border-bottom: 1px solid #f0f2f6;

    color: #334155;

    vertical-align: middle;

}


tbody tr {

    transition: .2s ease;

}


tbody tr:hover {

    background: #f8faff;

}


tbody tr:last-child td {

    border-bottom: none;

}


/* =========================================================
   APPRENANT
========================================================= */

.apprenant-info {

    display: flex;

    align-items: center;

    gap: 14px;

    min-width: 220px;

}


.avatar {

    width: 45px;

    height: 45px;

    border-radius: 50%;

    background: #eef2ff;

    color: #3B5998;

    display: flex;

    align-items: center;

    justify-content: center;

    flex-shrink: 0;

    font-size: 15px;

    font-weight: 800;

}


.apprenant-details {

    display: flex;

    flex-direction: column;

    gap: 5px;

}


.apprenant-details strong {

    color: #172554;

    font-size: 14px;

    font-weight: 750;

}


.apprenant-details span {

    color: #94a3b8;

    font-size: 12px;

}


/* =========================================================
   FORMATION
========================================================= */

.formation-info {

    display: flex;

    align-items: center;

    gap: 12px;

    min-width: 220px;

}


.formation-icon {

    width: 42px;

    height: 42px;

    border-radius: 11px;

    background: #eef2ff;

    color: #3B5998;

    display: flex;

    align-items: center;

    justify-content: center;

    flex-shrink: 0;

    font-size: 16px;

}


.formation-details {

    display: flex;

    flex-direction: column;

    gap: 5px;

}


.formation-details strong {

    color: #172554;

    font-size: 14px;

    font-weight: 750;

}


.formation-details span {

    color: #94a3b8;

    font-size: 12px;

}


/* =========================================================
   BADGES
========================================================= */

.badge {

    display: inline-flex;

    align-items: center;

    gap: 7px;

    padding: 8px 13px;

    border-radius: 30px;

    font-size: 11px;

    font-weight: 800;

    white-space: nowrap;

}


.status-dot {

    width: 7px;

    height: 7px;

    border-radius: 50%;

}


/* =========================================================
   STATUT VALIDE
========================================================= */

.statut-valide {

    background: #ecfdf3;

    color: #15803d;

}


.statut-valide .status-dot {

    background: #22c55e;

}


/* =========================================================
   STATUT ATTENTE
========================================================= */

.statut-attente {

    background: #fff7df;

    color: #a66a00;

}


.statut-attente .status-dot {

    background: #f59e0b;

}


/* =========================================================
   STATUT REFUSE
========================================================= */

.statut-refuse {

    background: #fff1f2;

    color: #dc2626;

}


.statut-refuse .status-dot {

    background: #ef4444;

}


/* =========================================================
   STATUT DEFAULT
========================================================= */

.statut-default {

    background: #f1f5f9;

    color: #64748b;

}


.statut-default .status-dot {

    background: #94a3b8;

}


/* =========================================================
   ACTIONS
========================================================= */

.actions {

    display: flex;

    justify-content: center;

    align-items: center;

    gap: 9px;

    white-space: nowrap;

}


.action-btn {

    width: 38px;

    height: 38px;

    border: none;

    border-radius: 10px;

    display: flex;

    align-items: center;

    justify-content: center;

    cursor: pointer;

    transition: .2s ease;

    font-size: 14px;

}


.action-btn:hover {

    transform: translateY(-2px);

}


/* =========================================================
   VOIR
========================================================= */

.view {

    background: #eef2ff;

    color: #3B5998;

}


.view:hover {

    background: #3B5998;

    color: #ffffff;

}


/* =========================================================
   MODIFIER
========================================================= */

.edit {

    background: #ecfdf3;

    color: #15803d;

}


.edit:hover {

    background: #2E7D32;

    color: #ffffff;

}


/* =========================================================
   SUPPRIMER
========================================================= */

.delete {

    background: #fff1f2;

    color: #dc2626;

}


.delete:hover {

    background: #dc2626;

    color: #ffffff;

}


/* =========================================================
   ETAT VIDE
========================================================= */

.empty-state {

    text-align: center;

    padding: 65px 20px !important;

}


.empty-icon {

    width: 65px;

    height: 65px;

    margin: 0 auto 16px;

    border-radius: 50%;

    display: flex;

    align-items: center;

    justify-content: center;

    background: #f1f5f9;

    color: #94a3b8;

    font-size: 24px;

}


.empty-state h4 {

    margin: 0 0 7px;

    color: #334155;

    font-size: 16px;

}


.empty-state p {

    margin: 0;

    color: #94a3b8;

    font-size: 13px;

}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 900px) {

    .table-top {

        padding: 20px;

    }


    th,

    td {

        padding: 16px 18px;

    }

}


@media (max-width: 600px) {

    .table-card {

        border-radius: 15px;

    }


    .table-title h3 {

        font-size: 18px;

    }


    .title-icon {

        width: 45px;

        height: 45px;

        font-size: 18px;

    }

}

</style>