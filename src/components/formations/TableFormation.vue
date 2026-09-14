<template>

    <div class="formations-wrapper">

        <!-- =====================================================
             RECHERCHE
        ====================================================== -->

        <div class="search-box">

            <i class="fas fa-search"></i>

            <input
                type="text"
                :value="search"
                placeholder="Rechercher une formation..."
                @input="$emit('update:search', $event.target.value)"
            >

        </div>


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

                        <i class="fas fa-graduation-cap"></i>

                    </div>


                    <div>

                        <h3>
                            Liste des formations
                        </h3>

                        <p>

                            {{ formations.length }}

                            {{
                                formations.length > 1
                                    ? "formations"
                                    : "formation"
                            }}

                        </p>

                    </div>

                </div>

            </div>


            <!-- =================================================
                 TABLEAU
            ================================================== -->

            <div class="table-container">

                <table>

                    <thead>

                        <tr>

                            <!-- FORMATION -->

                            <th>
                                FORMATION
                            </th>


                            <!-- STATUT -->

                            <th>
                                STATUT
                            </th>


                            <!-- ACTIONS -->

                            <th class="actions-header">
                                ACTIONS
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        <!-- =================================================
                             FORMATIONS
                        ================================================== -->

                        <tr
                            v-for="formation in formations"
                            :key="formation.id"
                        >

                            <!-- =============================================
                                 FORMATION
                            ============================================== -->

                            <td>

                                <div class="formation-info">

                                    <!-- IMAGE -->

                                    <div class="formation-image">

                                        <img
                                            v-if="getImageUrl(formation.icone)"
                                            :src="getImageUrl(formation.icone)"
                                            :alt="formation.nom"
                                            @error="imageError"
                                        >

                                        <div
                                            v-else
                                            class="default-icon"
                                        >

                                            <i class="fas fa-book-open"></i>

                                        </div>

                                    </div>


                                    <!-- INFORMATIONS -->

                                    <div class="formation-details">

                                        <strong>
                                            {{ formation.nom || "-" }}
                                        </strong>

                                        <span>
                                            Formation professionnelle
                                        </span>

                                    </div>

                                </div>

                            </td>


                            <!-- =============================================
                                 STATUT
                            ============================================== -->

                            <td>

                                <span
                                    :class="statutClass(formation.is_active)"
                                >

                                    <span class="status-dot"></span>

                                    {{
                                        formation.is_active
                                            ? "Active"
                                            : "Inactive"
                                    }}

                                </span>

                            </td>


                            <!-- =============================================
                                 ACTIONS
                            ============================================== -->

                            <td>

                                <div class="actions">

                                    <!-- VOIR -->

                                    <button
                                        type="button"
                                        class="action-btn view"
                                        title="Voir la formation"
                                        @click="$emit('voir', formation.id)"
                                    >

                                        <i class="fas fa-eye"></i>

                                    </button>


                                    <!-- MODIFIER -->

                                    <button
                                        type="button"
                                        class="action-btn edit"
                                        title="Modifier la formation"
                                        @click="$emit('modifier', formation.id)"
                                    >

                                        <i class="fas fa-pen"></i>

                                    </button>


                                    <!-- SUPPRIMER -->

                                    <button
                                        type="button"
                                        class="action-btn delete"
                                        title="Supprimer la formation"
                                        @click="$emit('supprimer', formation.id)"
                                    >

                                        <i class="fas fa-trash-alt"></i>

                                    </button>


                                    <!-- INSCRIRE APPRENANT -->

                                    <button
                                        type="button"
                                        class="btn-inscrire"
                                        title="Inscrire un apprenant"
                                        @click="$emit('inscrire', formation.id)"
                                    >

                                        <i class="fas fa-user-plus"></i>

                                        <span>
                                            Inscrire apprenant
                                        </span>

                                    </button>

                                </div>

                            </td>

                        </tr>


                        <!-- =================================================
                             AUCUNE FORMATION
                        ================================================== -->

                        <tr
                            v-if="formations.length === 0"
                        >

                            <td
                                colspan="3"
                                class="empty-state"
                            >

                                <div class="empty-icon">

                                    <i class="fas fa-graduation-cap"></i>

                                </div>


                                <h4>
                                    Aucune formation trouvée
                                </h4>


                                <p>
                                    Aucune formation n'est disponible pour le moment.
                                </p>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    </div>

</template>


<script setup>

import {
    defineProps,
    defineEmits
} from "vue";


/* =====================================================
   PROPS
===================================================== */

defineProps({

    formations: {

        type: Array,

        default: () => []

    },

    search: {

        type: String,

        default: ""

    }

});


/* =====================================================
   EVENEMENTS
===================================================== */

defineEmits([

    "voir",

    "modifier",

    "supprimer",

    "inscrire",

    "update:search"

]);


/* =====================================================
   URL API
===================================================== */

const API_URL =

    import.meta.env.VITE_API_URL ||

    "http://127.0.0.1:8000";


/* =====================================================
   VERIFIER URL
===================================================== */

function isUrl(value) {

    if (!value) {

        return false;

    }

    try {

        new URL(value);

        return true;

    }

    catch {

        return false;

    }

}


/* =====================================================
   URL IMAGE
===================================================== */

function getImageUrl(icone) {

    if (!icone) {

        return null;

    }


    /*
     * Si Laravel renvoie déjà une URL complète
     */

    if (isUrl(icone)) {

        return icone;

    }


    /*
     * Si Laravel renvoie :
     * formations/image.jpg
     */

    return `${API_URL}/storage/${icone}`;

}


/* =====================================================
   ERREUR IMAGE
===================================================== */

function imageError(event) {

    event.target.style.display = "none";

}


/* =====================================================
   STATUT
===================================================== */

function statutClass(active) {

    return active

        ? "badge active"

        : "badge inactive";

}

</script>


<style scoped>

/* =========================================================
   CONTENEUR GLOBAL
========================================================= */

.formations-wrapper {

    width: 100%;

}


/* =========================================================
   RECHERCHE
========================================================= */

.search-box {

    width: 100%;

    height: 70px;

    background: #ffffff;

    border-radius: 18px;

    display: flex;

    align-items: center;

    padding: 0 24px;

    margin-bottom: 30px;

    box-shadow:
        0 8px 30px rgba(15, 23, 42, 0.06);

    border: 1px solid #edf1f7;

}


.search-box i {

    font-size: 22px;

    color: #3B5998;

    margin-right: 15px;

}


.search-box input {

    width: 100%;

    border: none;

    outline: none;

    font-size: 16px;

    color: #334155;

    background: transparent;

}


.search-box input::placeholder {

    color: #a0aec0;

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

    padding: 22px 25px;

    border-bottom: 1px solid #edf1f7;

    background: #ffffff;

}


.table-title {

    display: flex;

    align-items: center;

    gap: 13px;

}


.title-icon {

    width: 50px;

    height: 50px;

    border-radius: 13px;

    display: flex;

    align-items: center;

    justify-content: center;

    background: #eef2ff;

    color: #3B5998;

    font-size: 20px;

}


.table-title h3 {

    margin: 0;

    color: #172554;

    font-size: 20px;

    font-weight: 800;

}


.table-title p {

    margin: 4px 0 0;

    color: #94a3b8;

    font-size: 13px;

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

    min-width: 0;

    border-collapse: collapse;

    table-layout: auto;

}


/* =========================================================
   HEADER TABLE
========================================================= */

thead {

    background: #f8fafc;

}


th {

    padding: 15px 14px;

    color: #64748b;

    font-size: 11px;

    font-weight: 800;

    letter-spacing: .5px;

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

    padding: 16px 14px;

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
   FORMATION
========================================================= */

.formation-info {

    display: flex;

    align-items: center;

    gap: 10px;

    min-width: 0;

}


.formation-image {

    width: 50px;

    height: 50px;

    border-radius: 12px;

    overflow: hidden;

    border: 1px solid #e2e8f0;

    background: #f1f5f9;

    display: flex;

    align-items: center;

    justify-content: center;

    flex-shrink: 0;

}


.formation-image img {

    width: 100%;

    height: 100%;

    object-fit: cover;

}


.default-icon {

    width: 100%;

    height: 100%;

    display: flex;

    align-items: center;

    justify-content: center;

    color: #3B5998;

    background: #eef2ff;

    font-size: 19px;

}


.formation-details {

    display: flex;

    flex-direction: column;

    gap: 4px;

    min-width: 0;

}


.formation-details strong {

    color: #172554;

    font-size: 14px;

    font-weight: 750;

    max-width: 220px;

    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;

}


.formation-details span {

    color: #94a3b8;

    font-size: 11px;

}


/* =========================================================
   STATUT
========================================================= */

.badge {

    display: inline-flex;

    align-items: center;

    gap: 6px;

    padding: 7px 11px;

    border-radius: 30px;

    font-size: 11px;

    font-weight: 800;

    white-space: nowrap;

}


.status-dot {

    width: 7px;

    height: 7px;

    border-radius: 50%;

    flex-shrink: 0;

}


.active {

    background: #ecfdf3;

    color: #15803d;

}


.active .status-dot {

    background: #22c55e;

}


.inactive {

    background: #fff1f2;

    color: #dc2626;

}


.inactive .status-dot {

    background: #ef4444;

}


/* =========================================================
   ACTIONS
========================================================= */

.actions {

    display: flex;

    justify-content: center;

    align-items: center;

    gap: 6px;

    white-space: nowrap;

}


.action-btn {

    width: 34px;

    height: 34px;

    border: none;

    border-radius: 9px;

    display: flex;

    align-items: center;

    justify-content: center;

    cursor: pointer;

    transition: .2s ease;

    font-size: 13px;

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
   INSCRIRE APPRENANT
========================================================= */

.btn-inscrire {

    height: 34px;

    padding: 0 11px;

    border: none;

    border-radius: 9px;

    background: #3B5998;

    color: #ffffff;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 6px;

    cursor: pointer;

    font-size: 11px;

    font-weight: 700;

    transition: .2s ease;

    white-space: nowrap;

}


.btn-inscrire:hover {

    background: #2E7D32;

    transform: translateY(-2px);

}


.btn-inscrire i {

    font-size: 11px;

}


/* =========================================================
   ETAT VIDE
========================================================= */

.empty-state {

    text-align: center;

    padding: 60px 20px !important;

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

@media (max-width: 1100px) {

    th,
    td {

        padding: 14px 10px;

    }


    .formation-image {

        width: 45px;

        height: 45px;

    }


    .formation-details strong {

        max-width: 180px;

    }


    .btn-inscrire {

        padding: 0 9px;

    }

}


@media (max-width: 900px) {

    .table-container {

        overflow-x: auto;

    }


    table {

        min-width: 700px;

    }


    th,
    td {

        padding: 12px 8px;

    }


    .formation-info {

        gap: 8px;

    }


    .formation-image {

        width: 42px;

        height: 42px;

    }


    .formation-details strong {

        max-width: 150px;

    }


    .actions {

        gap: 5px;

    }


    .action-btn {

        width: 32px;

        height: 32px;

    }


    .btn-inscrire {

        height: 32px;

        padding: 0 8px;

        font-size: 10px;

    }

}


@media (max-width: 600px) {

    .search-box {

        height: 60px;

        border-radius: 14px;

        padding: 0 18px;

    }


    .search-box i {

        font-size: 19px;

        margin-right: 12px;

    }


    .search-box input {

        font-size: 14px;

    }


    .table-card {

        border-radius: 15px;

    }


    .table-top {

        padding: 18px;

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