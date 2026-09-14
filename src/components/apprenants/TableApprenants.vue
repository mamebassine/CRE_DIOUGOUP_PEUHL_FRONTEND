<template>

    <div class="table-card">

        <!-- ================= EN-TÊTE DU TABLEAU ================= -->

        <div class="table-top">

            <div class="table-title">

                <div class="title-icon">
                    <i class="fas fa-users"></i>
                </div>

                <div>
                    <h3>Liste des apprenants</h3>

                    <p>
                        {{ apprenants.length }}
                        {{ apprenants.length > 1 ? "apprenants" : "apprenant" }}
                    </p>
                </div>

            </div>

        </div>


        <!-- ================= TABLEAU ================= -->

        <div class="table-container">

            <table>

                <thead>

                    <tr>

                        <th>APPRENANT</th>

                        <th>EMAIL</th>

                        <th>STATUT</th>

                        <th class="actions-header">
                            ACTIONS
                        </th>

                    </tr>

                </thead>


                <tbody>

                    <!-- ================= APPRENANTS ================= -->

                    <tr
                        v-for="apprenant in apprenants"
                        :key="apprenant.id"
                    >

                        <!-- APPRENANT -->

                        <td>

                            <div class="student-info">

                                <div class="photo-container">

                                    <img
                                        v-if="apprenant.photo"
                                        :src="`http://127.0.0.1:8000/storage/${apprenant.photo}`"
                                        class="photo"
                                        alt="Photo apprenant"
                                    >

                                    <img
                                        v-else
                                        src="http://127.0.0.1:8000/storage/default.png"
                                        class="photo"
                                        alt="Photo par défaut"
                                    >

                                </div>


                                <div class="student-details">

                                    <strong>
                                        {{ apprenant.user?.nom || "-" }}
                                        {{ apprenant.user?.prenom || "" }}
                                    </strong>

                                    <span>
                                        Matricule :
                                        {{ apprenant.matricule || "-" }}
                                    </span>

                                </div>

                            </div>

                        </td>


                        <!-- EMAIL -->

                        <td>

                            <div class="email">

                                <i class="fas fa-envelope"></i>

                                <span>
                                    {{ apprenant.user?.email || "-" }}
                                </span>

                            </div>

                        </td>


                        <!-- STATUT -->

                        <td>

                            <span
                                :class="statutClass(apprenant.statut)"
                            >

                                <span class="status-dot"></span>

                                {{ apprenant.statut || "En attente" }}

                            </span>

                        </td>


                        <!-- ACTIONS -->

                        <td>

                            <div class="actions">

                                <!-- VOIR -->

                                <button
                                    class="action-btn view"
                                    title="Voir le profil"
                                    @click="$emit('voir', apprenant.id)"
                                >

                                    <i class="fas fa-eye"></i>

                                </button>


                                <!-- MODIFIER -->

                                <button
                                    class="action-btn edit"
                                    title="Modifier"
                                    @click="$emit('modifier', apprenant.id)"
                                >

                                    <i class="fas fa-pen"></i>

                                </button>


                                <!-- SUPPRIMER -->

                                <button
                                    class="action-btn delete"
                                    title="Supprimer"
                                    @click="$emit('supprimer', apprenant.id)"
                                >

                                    <i class="fas fa-trash-alt"></i>

                                </button>

                            </div>

                        </td>

                    </tr>


                    <!-- ================= AUCUN APPRENANT ================= -->

                    <tr v-if="apprenants.length === 0">

                        <td
                            colspan="4"
                            class="empty-state"
                        >

                            <div class="empty-icon">

                                <i class="fas fa-user-graduate"></i>

                            </div>

                            <h4>Aucun apprenant trouvé</h4>

                            <p>
                                Aucun apprenant ne correspond à votre recherche.
                            </p>

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>

</template>


<script setup>

defineProps({

    apprenants: {
        type: Array,
        default: () => []
    }

});


defineEmits([
    "voir",
    "modifier",
    "supprimer"
]);


/* ================= STATUT ================= */

const statutClass = (statut) => {

    if (statut === "Valide") {
        return "badge valide";
    }

    if (statut === "Refuse") {
        return "badge refuse";
    }

    return "badge attente";

};

</script>


<style scoped>

/* ================================================= */
/* CARTE PRINCIPALE */
/* ================================================= */

.table-card {

    width: 100%;

    background: #ffffff;

    border-radius: 18px;

    border: 1px solid #e8edf5;

    box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);

    overflow: hidden;

}


/* ================================================= */
/* EN-TÊTE */
/* ================================================= */

.table-top {

    padding: 22px 25px;

    border-bottom: 1px solid #edf1f7;

    background: #ffffff;

}


.table-title {

    display: flex;

    align-items: center;

    gap: 14px;

}


.title-icon {

    width: 45px;

    height: 45px;

    border-radius: 12px;

    display: flex;

    align-items: center;

    justify-content: center;

    background: #eef2ff;

    color: #3B5998;

    font-size: 18px;

}


.table-title h3 {

    margin: 0;

    color: #1e293b;

    font-size: 18px;

    font-weight: 800;

}


.table-title p {

    margin: 4px 0 0;

    color: #94a3b8;

    font-size: 13px;

}


/* ================================================= */
/* CONTENEUR */
/* ================================================= */

.table-container {

    width: 100%;

    overflow-x: auto;

}


/* ================================================= */
/* TABLE */
/* ================================================= */

table {

    width: 100%;

    min-width: 750px;

    border-collapse: collapse;

}


thead {

    background: #f8fafc;

}


th {

    padding: 15px 22px;

    color: #64748b;

    font-size: 11px;

    font-weight: 800;

    letter-spacing: .7px;

    text-align: left;

    border-bottom: 1px solid #e9eef5;

}


.actions-header {

    text-align: center;

}


td {

    padding: 17px 22px;

    border-bottom: 1px solid #f0f2f6;

    color: #334155;

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


/* ================================================= */
/* INFORMATIONS APPRENANT */
/* ================================================= */

.student-info {

    display: flex;

    align-items: center;

    gap: 13px;

}


.photo-container {

    position: relative;

}


.photo {

    width: 48px;

    height: 48px;

    border-radius: 14px;

    object-fit: cover;

    border: 2px solid #e7ecf5;

    display: block;

}


.student-details {

    display: flex;

    flex-direction: column;

    gap: 5px;

}


.student-details strong {

    color: #1e293b;

    font-size: 14px;

    font-weight: 750;

}


.student-details span {

    color: #94a3b8;

    font-size: 11px;

}


/* ================================================= */
/* EMAIL */
/* ================================================= */

.email {

    display: flex;

    align-items: center;

    gap: 9px;

    color: #64748b;

    font-size: 13px;

}


.email i {

    color: #3B5998;

    font-size: 13px;

}


/* ================================================= */
/* STATUT */
/* ================================================= */

.badge {

    display: inline-flex;

    align-items: center;

    gap: 7px;

    padding: 7px 12px;

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


.valide {

    background: #ecfdf3;

    color: #15803d;

}


.valide .status-dot {

    background: #22c55e;

}


.refuse {

    background: #fff1f2;

    color: #dc2626;

}


.refuse .status-dot {

    background: #ef4444;

}


.attente {

    background: #fff8e6;

    color: #b45309;

}


.attente .status-dot {

    background: #f59e0b;

}


/* ================================================= */
/* ACTIONS */
/* ================================================= */

.actions {

    display: flex;

    justify-content: center;

    align-items: center;

    gap: 7px;

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


.view {

    background: #eef2ff;

    color: #3B5998;

}


.view:hover {

    background: #3B5998;

    color: white;

}


.edit {

    background: #ecfdf3;

    color: #15803d;

}


.edit:hover {

    background: #2E7D32;

    color: white;

}


.delete {

    background: #fff1f2;

    color: #dc2626;

}


.delete:hover {

    background: #dc2626;

    color: white;

}


/* ================================================= */
/* ÉTAT VIDE */
/* ================================================= */

.empty-state {

    text-align: center;

    padding: 55px 20px !important;

}


.empty-icon {

    width: 60px;

    height: 60px;

    margin: 0 auto 15px;

    border-radius: 50%;

    display: flex;

    align-items: center;

    justify-content: center;

    background: #f1f5f9;

    color: #94a3b8;

    font-size: 23px;

}


.empty-state h4 {

    margin: 0 0 6px;

    color: #334155;

    font-size: 15px;

}


.empty-state p {

    margin: 0;

    color: #94a3b8;

    font-size: 13px;

}


/* ================================================= */
/* RESPONSIVE */
/* ================================================= */

@media (max-width: 700px) {

    .table-top {

        padding: 18px;

    }

    th,
    td {

        padding: 14px 15px;

    }

    .table-card {

        border-radius: 14px;

    }

}

</style>
