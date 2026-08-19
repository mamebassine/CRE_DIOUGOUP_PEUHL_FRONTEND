```vue
<script setup>

import {
    ref,
    watch,
    onBeforeUnmount,
    markRaw
} from "vue";


// =====================================================
// PROPS
// =====================================================

const props = defineProps({

    formation: {
        type: Object,
        default: null
    }

});


// =====================================================
// EMIT
// =====================================================

const emit = defineEmits([
    "submit"
]);


// =====================================================
// FORMULAIRE
// =====================================================

const form = ref({

    nom: "",

    resume: "",

    description: "",

    duree: "",

    diplome: "",

    lieu: "",

    objectifs: [""],

    // Image locale
    icone: null,

    // Image en ligne
    icone_url: "",

    // Suppression image
    supprimer_icone: false,

    capacite: null,

    is_active: true

});


// =====================================================
// INPUT FICHIER
// =====================================================

const fichierInput = ref(null);


// =====================================================
// APERÇU
// =====================================================

const imagePreview = ref(null);


// =====================================================
// IMAGE LOCALE
// =====================================================

const imageLocale = ref(false);


// =====================================================
// VÉRIFIER URL
// =====================================================

function isUrl(value) {

    if (!value) {
        return false;
    }

    try {

        new URL(value);

        return true;

    } catch {

        return false;

    }

}


// =====================================================
// URL IMAGE
// =====================================================

function getImageUrl(value) {

    if (!value) {
        return null;
    }

    if (isUrl(value)) {

        return value;

    }

    return `/storage/${value}`;

}


// =====================================================
// CHARGER FORMATION
// =====================================================

watch(

    () => props.formation,

    (formation) => {

        // =================================================
        // MODE AJOUT
        // =================================================

        if (!formation) {

            form.value = {

                nom: "",

                resume: "",

                description: "",

                duree: "",

                diplome: "",

                lieu: "",

                objectifs: [""],

                icone: null,

                icone_url: "",

                supprimer_icone: false,

                capacite: null,

                is_active: true

            };

            imagePreview.value = null;

            imageLocale.value = false;

            return;

        }


        // =================================================
        // LIBÉRER ANCIEN APERÇU
        // =================================================

        if (
            imageLocale.value &&
            imagePreview.value
        ) {

            try {

                URL.revokeObjectURL(
                    imagePreview.value
                );

            } catch {}

        }


        // =================================================
        // CHARGER DONNÉES
        // =================================================

        form.value = {

            nom:
                formation.nom ?? "",

            resume:
                formation.resume ?? "",

            description:
                formation.description ?? "",

            duree:
                formation.duree ?? "",

            diplome:
                formation.diplome ?? "",

            lieu:
                formation.lieu ?? "",

            objectifs:

                Array.isArray(
                    formation.objectifs
                ) &&
                formation.objectifs.length > 0

                    ? [...formation.objectifs]

                    : [""],

            // Aucun nouveau fichier
            icone: null,

            // URL si ancienne image = URL
            icone_url:

                formation.icone &&
                isUrl(formation.icone)

                    ? formation.icone

                    : "",

            supprimer_icone: false,

            capacite:
                formation.capacite ?? null,

            is_active:
                Boolean(
                    formation.is_active
                )

        };


        // =================================================
        // ANCIENNE IMAGE
        // =================================================

        if (formation.icone) {

            imagePreview.value =
                getImageUrl(
                    formation.icone
                );

        } else {

            imagePreview.value = null;

        }


        imageLocale.value = false;

    },

    {
        immediate: true
    }

);


// =====================================================
// CHOISIR IMAGE LOCALE
// =====================================================

function choisirImage(event) {

    const fichier =
        event.target.files?.[0];


    if (!fichier) {

        return;

    }


    // =================================================
    // TYPES AUTORISÉS
    // =================================================

    const typesAcceptes = [

        "image/jpeg",

        "image/png",

        "image/jpg",

        "image/webp"

    ];


    if (
        !typesAcceptes.includes(
            fichier.type
        )
    ) {

        alert(
            "Veuillez sélectionner une image JPG, JPEG, PNG ou WEBP."
        );

        event.target.value = "";

        return;

    }


    // =================================================
    // TAILLE MAXIMALE : 2 MO
    // =================================================

    if (
        fichier.size >
        2 * 1024 * 1024
    ) {

        alert(
            "L'image ne doit pas dépasser 2 Mo."
        );

        event.target.value = "";

        return;

    }


    // =================================================
    // LIBÉRER ANCIEN APERÇU LOCAL
    // =================================================

    if (
        imageLocale.value &&
        imagePreview.value
    ) {

        try {

            URL.revokeObjectURL(
                imagePreview.value
            );

        } catch {}

    }


    // =================================================
    // ENREGISTRER LE VRAI FILE
    // =================================================

    form.value.icone =
        markRaw(fichier);


    // =================================================
    // ANNULER URL
    // =================================================

    form.value.icone_url = "";


    // =================================================
    // ANNULER SUPPRESSION
    // =================================================

    form.value.supprimer_icone = false;


    // =================================================
    // ÉTAT IMAGE
    // =================================================

    imageLocale.value = true;


    // =================================================
    // APERÇU
    // =================================================

    imagePreview.value =
        URL.createObjectURL(
            fichier
        );

}


// =====================================================
// IMAGE EN LIGNE
// =====================================================

function changerUrlImage() {

    const url =
        form.value.icone_url.trim();


    // =================================================
    // URL FOURNIE
    // =================================================

    if (url !== "") {

        // Supprimer fichier local
        form.value.icone = null;


        // Annuler suppression
        form.value.supprimer_icone = false;


        imageLocale.value = false;


        // Afficher URL
        imagePreview.value = url;

        return;

    }


    // =================================================
    // URL VIDE
    // =================================================

    if (!form.value.icone) {

        if (
            props.formation &&
            props.formation.icone &&
            !form.value.supprimer_icone
        ) {

            imagePreview.value =
                getImageUrl(
                    props.formation.icone
                );

        } else {

            imagePreview.value = null;

        }

    }

}


// =====================================================
// SUPPRIMER IMAGE
// =====================================================

function supprimerImage() {

    // =================================================
    // LIBÉRER APERÇU LOCAL
    // =================================================

    if (
        imageLocale.value &&
        imagePreview.value
    ) {

        try {

            URL.revokeObjectURL(
                imagePreview.value
            );

        } catch {}

    }


    // =================================================
    // SUPPRIMER FICHIER
    // =================================================

    form.value.icone = null;


    // =================================================
    // SUPPRIMER URL
    // =================================================

    form.value.icone_url = "";


    // =================================================
    // DEMANDER SUPPRESSION
    // =================================================

    form.value.supprimer_icone = true;


    imageLocale.value = false;

    imagePreview.value = null;


    // =================================================
    // RESET INPUT
    // =================================================

    if (fichierInput.value) {

        fichierInput.value.value = "";

    }

}


// =====================================================
// AJOUTER OBJECTIF
// =====================================================

function ajouterObjectif() {

    form.value.objectifs.push("");

}


// =====================================================
// SUPPRIMER OBJECTIF
// =====================================================

function supprimerObjectif(index) {

    if (
        form.value.objectifs.length > 1
    ) {

        form.value.objectifs.splice(
            index,
            1
        );

    }

}


// =====================================================
// ENVOYER
// =====================================================

function envoyer() {

    // =================================================
    // NETTOYER OBJECTIFS
    // =================================================

    const objectifsPropres =

        form.value.objectifs.filter(

            objectif =>

                objectif !== null &&
                objectif !== undefined &&
                String(objectif).trim() !== ""

        );


    // =================================================
    // PRÉPARER DONNÉES
    // =================================================

    const data = {

        ...form.value,

        objectifs:
            objectifsPropres,

        capacite:

            form.value.capacite === "" ||
            form.value.capacite === null ||
            form.value.capacite === undefined

                ? null

                : Number(
                    form.value.capacite
                )

    };


    // =================================================
    // DEBUG
    // =================================================

    console.log(
        "Formation envoyée :",
        data
    );

    console.log(
        "Fichier image :",
        data.icone
    );

    console.log(
        "Est un File :",
        data.icone instanceof File
    );


    // =================================================
    // ENVOYER AU PARENT
    // =================================================

    emit(
        "submit",
        data
    );

}


// =====================================================
// NETTOYAGE
// =====================================================

onBeforeUnmount(() => {

    if (
        imageLocale.value &&
        imagePreview.value
    ) {

        try {

            URL.revokeObjectURL(
                imagePreview.value
            );

        } catch {}

    }

});

</script>


<template>

    <form
        class="formation-form"
        @submit.prevent="envoyer"
    >

        <!-- ================================================= -->
        <!-- NOM -->
        <!-- ================================================= -->

        <div class="form-group">

            <label>
                Nom de la formation
            </label>

            <input
                type="text"
                v-model="form.nom"
                placeholder="Nom de la formation"
                required
            >

        </div>


        <!-- ================================================= -->
        <!-- RÉSUMÉ -->
        <!-- ================================================= -->

        <div class="form-group">

            <label>
                Résumé
            </label>

            <input
                type="text"
                v-model="form.resume"
                placeholder="Résumé de la formation"
                required
            >

        </div>


        <!-- ================================================= -->
        <!-- DESCRIPTION -->
        <!-- ================================================= -->

        <div class="form-group">

            <label>
                Description
            </label>

            <textarea
                v-model="form.description"
                placeholder="Description de la formation"
                rows="5"
                required
            ></textarea>

        </div>


        <!-- ================================================= -->
        <!-- DURÉE -->
        <!-- ================================================= -->

        <div class="form-group">

            <label>
                Durée
            </label>

            <input
                type="text"
                v-model="form.duree"
                placeholder="Exemple : 6 mois"
                required
            >

        </div>


        <!-- ================================================= -->
        <!-- DIPLÔME -->
        <!-- ================================================= -->

        <div class="form-group">

            <label>
                Diplôme
            </label>

            <input
                type="text"
                v-model="form.diplome"
                placeholder="Exemple : Certificat"
                required
            >

        </div>


        <!-- ================================================= -->
        <!-- LIEU -->
        <!-- ================================================= -->

        <div class="form-group">

            <label>
                Lieu
            </label>

            <input
                type="text"
                v-model="form.lieu"
                placeholder="Lieu de formation"
                required
            >

        </div>


        <!-- ================================================= -->
        <!-- OBJECTIFS -->
        <!-- ================================================= -->

        <div class="form-group">

            <label>
                Objectifs de la formation
            </label>


            <div
                v-for="(objectif, index) in form.objectifs"
                :key="index"
                class="objectif-row"
            >

                <input
                    type="text"
                    v-model="form.objectifs[index]"
                    :placeholder="'Objectif ' + (index + 1)"
                >


                <button
                    v-if="form.objectifs.length > 1"
                    type="button"
                    class="btn-remove"
                    @click="supprimerObjectif(index)"
                >
                    Supprimer
                </button>

            </div>


            <button
                type="button"
                class="btn-add"
                @click="ajouterObjectif"
            >
                + Ajouter un objectif
            </button>

        </div>


        <!-- ================================================= -->
        <!-- CAPACITÉ -->
        <!-- ================================================= -->

        <div class="form-group">

            <label>
                Capacité
            </label>

            <input
                type="number"
                v-model="form.capacite"
                min="1"
                placeholder="Nombre maximum d'apprenants"
            >

            <small>
                Laisser vide si la capacité est illimitée.
            </small>

        </div>


        <!-- ================================================= -->
        <!-- IMAGE / ICÔNE -->
        <!-- ================================================= -->

        <div class="form-group image-group">

            <label>
                Image / Icône de la formation
            </label>


            <p class="image-help">
                Choisissez une image depuis votre ordinateur
                ou utilisez une image disponible en ligne.
            </p>


            <!-- ================================================= -->
            <!-- IMAGE LOCALE -->
            <!-- ================================================= -->

            <div class="image-option">

                <label class="sub-label">
                    Image locale
                </label>


                <input
                    ref="fichierInput"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    @change="choisirImage"
                >


                <small>
                    Formats acceptés : JPG, JPEG, PNG, WEBP.
                    Taille maximale : 2 Mo.
                </small>

            </div>


            <!-- ================================================= -->
            <!-- IMAGE EN LIGNE -->
            <!-- ================================================= -->

            <div class="image-option">

                <label class="sub-label">
                    Image en ligne
                </label>


                <input
                    type="url"
                    v-model="form.icone_url"
                    @input="changerUrlImage"
                    placeholder="https://exemple.com/image.png"
                >


                <small>
                    Collez l'adresse URL directe de l'image.
                </small>

            </div>


            <!-- ================================================= -->
            <!-- APERÇU -->
            <!-- ================================================= -->

            <div
                v-if="imagePreview"
                class="image-preview-container"
            >

                <span class="preview-label">
                    Aperçu
                </span>


                <div class="image-preview">

                    <img
                        :src="imagePreview"
                        alt="Aperçu de l'image"
                    >

                </div>


                <button
                    type="button"
                    class="btn-remove-image"
                    @click="supprimerImage"
                >
                    Supprimer l'image
                </button>

            </div>

        </div>


        <!-- ================================================= -->
        <!-- FORMATION ACTIVE -->
        <!-- ================================================= -->

        <div class="form-group checkbox-group">

            <label>

                <input
                    type="checkbox"
                    v-model="form.is_active"
                >

                Formation active

            </label>

        </div>


        <!-- ================================================= -->
        <!-- BOUTON -->
        <!-- ================================================= -->

        <button
            type="submit"
            class="btn-submit"
        >
            Enregistrer
        </button>

    </form>

</template>


<style scoped>

.formation-form {

    width: 100%;

}


.form-group {

    margin-bottom: 20px;

}


.form-group label {

    display: block;

    margin-bottom: 8px;

    font-weight: 600;

}


input,
textarea {

    width: 100%;

    padding: 12px;

    border: 1px solid #ddd;

    border-radius: 8px;

    font-size: 15px;

    box-sizing: border-box;

}


textarea {

    resize: vertical;

}


small {

    display: block;

    margin-top: 6px;

    color: #777;

}


/* ===================================================== */
/* OBJECTIFS */
/* ===================================================== */

.objectif-row {

    display: flex;

    gap: 10px;

    margin-bottom: 10px;

}


.objectif-row input {

    flex: 1;

}


.btn-add {

    margin-top: 5px;

    padding: 10px 15px;

    background: #e8f3ff;

    color: #2563eb;

    border: none;

    border-radius: 8px;

    cursor: pointer;

}


.btn-add:hover {

    background: #d7eaff;

}


.btn-remove {

    padding: 10px 15px;

    background: #ffe5e5;

    color: #c62828;

    border: none;

    border-radius: 8px;

    cursor: pointer;

}


.btn-remove:hover {

    background: #ffd2d2;

}


/* ===================================================== */
/* IMAGE */
/* ===================================================== */

.image-group {

    border: 1px solid #e5e7eb;

    border-radius: 10px;

    padding: 18px;

    background: #fafafa;

}


.image-help {

    margin-top: 0;

    color: #666;

    font-size: 14px;

}


.image-option {

    margin-top: 18px;

}


.sub-label {

    font-size: 14px;

    font-weight: 600;

}


.image-preview-container {

    margin-top: 20px;

    padding-top: 18px;

    border-top: 1px solid #ddd;

}


.preview-label {

    display: block;

    margin-bottom: 10px;

    font-weight: 600;

}


.image-preview {

    width: 150px;

    height: 150px;

    border-radius: 12px;

    overflow: hidden;

    border: 1px solid #ddd;

    background: white;

    display: flex;

    align-items: center;

    justify-content: center;

}


.image-preview img {

    width: 100%;

    height: 100%;

    object-fit: cover;

}


.btn-remove-image {

    margin-top: 10px;

    padding: 9px 14px;

    background: #ffe5e5;

    color: #c62828;

    border: none;

    border-radius: 8px;

    cursor: pointer;

}


.btn-remove-image:hover {

    background: #ffd2d2;

}


/* ===================================================== */
/* BOUTON ENREGISTRER */
/* ===================================================== */

.btn-submit {

    width: 100%;

    padding: 14px;

    margin-top: 10px;

    background: #3B5998;

    color: white;

    border: none;

    border-radius: 10px;

    font-size: 16px;

    font-weight: 600;

    cursor: pointer;

}


.btn-submit:hover {

    background: #2E7D32;

}


/* ===================================================== */
/* CHECKBOX */
/* ===================================================== */

.checkbox-group label {

    display: flex;

    align-items: center;

    gap: 8px;

}


.checkbox-group input {

    width: auto;

}


/* ===================================================== */
/* RESPONSIVE */
/* ===================================================== */

@media (max-width: 600px) {

    .objectif-row {

        flex-direction: column;

    }

}

</style>
