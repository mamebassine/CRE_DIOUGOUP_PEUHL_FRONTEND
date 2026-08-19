<script setup>

import { onMounted } from "vue";

import {
    useFormationStore
} from "../../../stores/formation";

import { useRouter } from "vue-router";


const store =
    useFormationStore();

const router =
    useRouter();


// =====================================================
// CHARGER LES FORMATIONS
// =====================================================

onMounted(() => {

    store.fetchFormations();

});


// =====================================================
// SUPPRIMER
// =====================================================

async function supprimer(id) {

    if (
        confirm(
            "Supprimer cette formation ?"
        )
    ) {

        await store.supprimerFormation(id);

    }

}


// =====================================================
// VÉRIFIER UNE URL
// =====================================================

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


// =====================================================
// URL DE L'IMAGE
// =====================================================

function getImageUrl(icone) {

    if (!icone) {

        return null;

    }


    /*
     * =================================================
     * IMAGE EN LIGNE
     * =================================================
     *
     * Exemple :
     * https://site.com/image.jpg
     */

    if (isUrl(icone)) {

        return icone;

    }


    /*
     * =================================================
     * IMAGE LOCALE
     * =================================================
     *
     * Laravel enregistre par exemple :
     *
     * formations/abc123.jpg
     *
     * L'image est accessible via :
     *
     * http://127.0.0.1:8000/storage/formations/abc123.jpg
     */

    return `http://127.0.0.1:8000/storage/${icone}`;

}


// =====================================================
// ERREUR IMAGE
// =====================================================

function imageError(event) {

    /*
     * Si l'image n'existe pas,
     * on la cache.
     */

    event.target.style.display = "none";


    /*
     * Afficher le bloc "Image indisponible".
     */

    const parent =
        event.target.parentElement;

    if (parent) {

        parent.classList.add(
            "image-error"
        );

        parent.innerHTML =
            "<span>Image indisponible</span>";

    }

}

</script>


<template>

    <div class="formations-page">


        <!-- ================================================= -->
        <!-- TITRE -->
        <!-- ================================================= -->

        <div class="page-header">

            <h1>
                Liste des formations
            </h1>


            <button
                class="btn-add"
                @click="
                    router.push(
                        '/dashboard/formations/ajouter'
                    )
                "
            >
                Ajouter une formation
            </button>

        </div>


        <!-- ================================================= -->
        <!-- CHARGEMENT -->
        <!-- ================================================= -->

        <div
            v-if="store.loading"
            class="loading"
        >

            Chargement...

        </div>


        <!-- ================================================= -->
        <!-- TABLE -->
        <!-- ================================================= -->

        <div
            v-else
            class="table-container"
        >

            <table>

                <thead>

                    <tr>

                        <th>
                            Image
                        </th>

                        <th>
                            Nom
                        </th>

                        <th>
                            Durée
                        </th>

                        <th>
                            Actions
                        </th>

                    </tr>

                </thead>


                <tbody>

                    <tr
                        v-for="
                            formation in store.formations
                        "
                        :key="formation.id"
                    >


                        <!-- ================================= -->
                        <!-- IMAGE -->
                        <!-- ================================= -->

                        <td>

                            <div
                                class="formation-image"
                            >

                                <img
                                    v-if="
                                        formation.icone
                                    "
                                    :src="
                                        getImageUrl(
                                            formation.icone
                                        )
                                    "
                                    :alt="
                                        formation.nom
                                    "
                                    @error="imageError"
                                >


                                <div
                                    v-else
                                    class="no-image"
                                >

                                    Aucune image

                                </div>

                            </div>

                        </td>


                        <!-- ================================= -->
                        <!-- NOM -->
                        <!-- ================================= -->

                        <td>

                            {{ formation.nom }}

                        </td>


                        <!-- ================================= -->
                        <!-- DURÉE -->
                        <!-- ================================= -->

                        <td>

                            {{ formation.duree }}

                        </td>


                        <!-- ================================= -->
                        <!-- ACTIONS -->
                        <!-- ================================= -->

                        <td>

                            <div class="actions">


                                <!-- ========================= -->
                                <!-- VOIR -->
                                <!-- ========================= -->

                                <button
                                    class="btn-view"
                                    @click="
                                        router.push(
                                            `/dashboard/formations/${formation.id}`
                                        )
                                    "
                                >

                                    Voir

                                </button>


                                <!-- ========================= -->
                                <!-- MODIFIER -->
                                <!-- ========================= -->

                                <button
                                    class="btn-edit"
                                    @click="
                                        router.push(
                                            `/dashboard/formations/${formation.id}/modifier`
                                        )
                                    "
                                >

                                    Modifier

                                </button>


                                <!-- ========================= -->
                                <!-- SUPPRIMER -->
                                <!-- ========================= -->

                                <button
                                    class="btn-delete"
                                    @click="
                                        supprimer(
                                            formation.id
                                        )
                                    "
                                >

                                    Supprimer

                                </button>


                            </div>

                        </td>

                    </tr>


                    <!-- ===================================== -->
                    <!-- AUCUNE FORMATION -->
                    <!-- ===================================== -->

                    <tr
                        v-if="
                            store.formations.length === 0
                        "
                    >

                        <td
                            colspan="4"
                            class="empty"
                        >

                            Aucune formation disponible.

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>

</template>


<style scoped>

.formations-page {

    width: 100%;

}


.page-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 25px;

    gap: 15px;

}


.page-header h1 {

    margin: 0;

}


.btn-add {

    padding: 11px 18px;

    background: #3B5998;

    color: white;

    border: none;

    border-radius: 8px;

    cursor: pointer;

    font-weight: 600;

}


.btn-add:hover {

    background: #2E7D32;

}


.loading {

    padding: 30px;

    text-align: center;

    color: #666;

}


.table-container {

    width: 100%;

    overflow-x: auto;

}


table {

    width: 100%;

    border-collapse: collapse;

    background: white;

}


th,
td {

    padding: 14px;

    border-bottom: 1px solid #eee;

    text-align: left;

    vertical-align: middle;

}


th {

    background: #f8f9fa;

    font-weight: 600;

}


.formation-image {

    width: 65px;

    height: 65px;

    border-radius: 10px;

    overflow: hidden;

    border: 1px solid #ddd;

    background: #f5f5f5;

    display: flex;

    align-items: center;

    justify-content: center;

}


.formation-image img {

    width: 100%;

    height: 100%;

    object-fit: cover;

}


.no-image {

    padding: 5px;

    font-size: 11px;

    text-align: center;

    color: #777;

}


.image-error {

    padding: 5px;

    font-size: 11px;

    text-align: center;

    color: #c62828;

    background: #fff5f5;

}


.actions {

    display: flex;

    gap: 8px;

    flex-wrap: wrap;

}


.actions button {

    padding: 8px 12px;

    border: none;

    border-radius: 7px;

    cursor: pointer;

    font-size: 13px;

}


.btn-view {

    background: #e8f3ff;

    color: #2563eb;

}


.btn-edit {

    background: #fff4d6;

    color: #9a6700;

}


.btn-delete {

    background: #ffe5e5;

    color: #c62828;

}


.empty {

    text-align: center;

    padding: 30px;

    color: #777;

}


@media (max-width: 700px) {

    .page-header {

        flex-direction: column;

        align-items: stretch;

    }


    .btn-add {

        width: 100%;

    }

}

</style>