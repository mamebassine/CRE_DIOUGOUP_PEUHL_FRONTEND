<script setup>

import {
    ref,
    onMounted,
    computed
} from "vue";

import {
    useRoute,
    useRouter
} from "vue-router";

import api from "../../../api/api";

import {
    inscriptionCompleteAdmin
} from "../../../services/inscriptionService";


const route = useRoute();
const router = useRouter();


// =====================================================
// FORMATION
// =====================================================

const formation = ref(null);

const loadingFormation = ref(true);


// =====================================================
// FORMULAIRE
// =====================================================

const form = ref({

    nom: "",
    prenom: "",
    email: "",
    telephone: "",

    password: "",
    password_confirmation: "",

    date_naissance: "",

    sexe: "",

    situation_matrimoniale: "",

    niveau_etude: "",

    niveau_informatique: "",

    adresse: "",

    fonction: "",

    horaire: "",

    photo: null,

    formation_id: route.params.id

});


// =====================================================
// MESSAGE
// =====================================================

const loading = ref(false);

const message = ref("");

const messageType = ref("");


// =====================================================
// DATE DE NAISSANCE
// ÂGE MINIMUM : 11 ANS
// =====================================================

const dateNaissanceMax = computed(() => {

    const date = new Date();

    date.setFullYear(
        date.getFullYear() - 11
    );

    return date.toISOString().split("T")[0];

});


// =====================================================
// CALCUL DE L'ÂGE
// =====================================================

const age = computed(() => {

    if (!form.value.date_naissance) {

        return null;

    }

    const naissance =
        new Date(form.value.date_naissance);

    const aujourdHui =
        new Date();

    let ageCalcule =
        aujourdHui.getFullYear()
        -
        naissance.getFullYear();

    const mois =
        aujourdHui.getMonth()
        -
        naissance.getMonth();

    if (
        mois < 0 ||
        (
            mois === 0 &&
            aujourdHui.getDate() < naissance.getDate()
        )
    ) {

        ageCalcule--;

    }

    return ageCalcule;

});


// =====================================================
// VÉRIFIER L'ÂGE
// =====================================================

function verifierAge() {

    if (
        form.value.date_naissance &&
        age.value < 11
    ) {

        message.value =
            "L'inscription est réservée aux personnes âgées d'au moins 11 ans.";

        messageType.value =
            "error";

        return false;

    }

    return true;

}


// =====================================================
// CHARGER LA FORMATION
// =====================================================

async function chargerFormation() {

    try {

        loadingFormation.value = true;

        const response =
            await api.get(
                `/auth/formations/${route.params.id}`
            );

        formation.value =
            response.data;

    }

    catch (error) {

        console.error(
            "Erreur chargement formation :",
            error
        );

        message.value =
            "Impossible de charger la formation.";

        messageType.value =
            "error";

    }

    finally {

        loadingFormation.value = false;

    }

}


// =====================================================
// PHOTO
// =====================================================

function choisirPhoto(event) {

    form.value.photo =
        event.target.files[0] || null;

}


// =====================================================
// SÉLECTION HORAIRE
// =====================================================

function choisirHoraire(horaire) {

    form.value.horaire = horaire;

}


// =====================================================
// INSCRIPTION
// =====================================================

async function inscrire() {

    message.value = "";

    messageType.value = "";


    // =================================================
    // FORMATION
    // =================================================

    if (!form.value.formation_id) {

        message.value =
            "Aucune formation sélectionnée.";

        messageType.value =
            "error";

        return;

    }


    // =================================================
    // DATE DE NAISSANCE
    // =================================================

    if (!form.value.date_naissance) {

        message.value =
            "Veuillez renseigner la date de naissance.";

        messageType.value =
            "error";

        return;

    }


    if (!verifierAge()) {

        return;

    }


    // =================================================
    // MOT DE PASSE
    // =================================================

    if (
        form.value.password.length < 8
    ) {

        message.value =
            "Le mot de passe doit contenir au moins 8 caractères.";

        messageType.value =
            "error";

        return;

    }


    if (
        form.value.password !==
        form.value.password_confirmation
    ) {

        message.value =
            "Les mots de passe ne correspondent pas.";

        messageType.value =
            "error";

        return;

    }


    // =================================================
    // HORAIRE
    // =================================================

    if (!form.value.horaire) {

        message.value =
            "Veuillez sélectionner un horaire.";

        messageType.value =
            "error";

        return;

    }


    // =================================================
    // CHARGEMENT
    // =================================================

    loading.value = true;


    try {

        console.log(
            "Données envoyées :",
            form.value
        );


        const response =
            await inscriptionCompleteAdmin(
                form.value
            );


        // =================================================
        // SUCCÈS
        // =================================================

        message.value =
            response.data.message ||
            "Apprenant inscrit avec succès.";

        messageType.value =
            "success";


        // =================================================
        // REDIRECTION
        // =================================================

        setTimeout(() => {

            router.push(
                "/dashboard/inscriptions"
            );

        }, 1200);

    }

    catch (error) {

        console.error(
            "Erreur inscription :",
            error
        );


        console.error(
            "Statut HTTP :",
            error.response?.status
        );


        console.error(
            "Réponse serveur :",
            error.response?.data
        );


        // =================================================
        // ERREURS DE VALIDATION LARAVEL
        // =================================================

        if (
            error.response?.data?.errors
        ) {

            const errors =
                error.response.data.errors;


            message.value =
                Object.values(errors)
                    .flat()
                    .join(" ");

        }

        // =================================================
        // ERREUR 405
        // =================================================

        else if (
            error.response?.status === 405
        ) {

            message.value =
                "Erreur 405 : la route d'inscription n'accepte pas la méthode POST. Vérifiez la route Laravel /api/auth/inscriptions/complete.";

        }

        // =================================================
        // ERREUR 401
        // =================================================

        else if (
            error.response?.status === 401
        ) {

            message.value =
                "Vous n'êtes pas authentifié. Veuillez vous reconnecter.";

        }

        // =================================================
        // ERREUR 403
        // =================================================

        else if (
            error.response?.status === 403
        ) {

            message.value =
                "Accès refusé. Vous n'avez pas l'autorisation d'inscrire un apprenant.";

        }

        // =================================================
        // ERREUR 404
        // =================================================

        else if (
            error.response?.status === 404
        ) {

            message.value =
                "La route d'inscription est introuvable.";

        }

        // =================================================
        // AUTRE ERREUR
        // =================================================

        else {

            message.value =
                error.response?.data?.message ||
                "Une erreur est survenue lors de l'inscription.";

        }


        messageType.value =
            "error";

    }

    finally {

        loading.value = false;

    }

}


// =====================================================
// ANNULER
// =====================================================

function annuler() {

    router.back();

}


// =====================================================
// MOUNTED
// =====================================================

onMounted(() => {

    chargerFormation();

});

</script>


<template>

    <div class="page">


        <!-- ================================================= -->
        <!-- CHARGEMENT -->
        <!-- ================================================= -->

        <div
            v-if="loadingFormation"
            class="loading"
        >

            Chargement de la formation...

        </div>


        <!-- ================================================= -->
        <!-- CONTENU -->
        <!-- ================================================= -->

        <div
            v-else
            class="container"
        >


            <!-- ================================================= -->
            <!-- HEADER -->
            <!-- ================================================= -->

            <div class="header">

                <div>

                    <h1>
                        Inscrire un apprenant
                    </h1>

                    <p>
                        Créer le compte et inscrire
                        l'apprenant à une formation.
                    </p>

                </div>


                <button
                    type="button"
                    class="btn-back"
                    @click="annuler"
                >

                    Retour

                </button>

            </div>


            <!-- ================================================= -->
            <!-- FORMATION -->
            <!-- ================================================= -->

            <div
                v-if="formation"
                class="formation-box"
            >

                <div>

                    <strong>
                        Formation
                    </strong>

                    <h2>
                        {{ formation.nom }}
                    </h2>

                </div>


                <div>

                    <strong>
                        Durée
                    </strong>

                    <span>
                        {{ formation.duree }}
                    </span>

                </div>

            </div>


            <!-- ================================================= -->
            <!-- MESSAGE -->
            <!-- ================================================= -->

            <div
                v-if="message"
                :class="[
                    'message',
                    messageType
                ]"
            >

                {{ message }}

            </div>


            <!-- ================================================= -->
            <!-- FORMULAIRE -->
            <!-- ================================================= -->

            <form
                class="form"
                @submit.prevent="inscrire"
            >


                <!-- ================================================= -->
                <!-- 1. INFORMATIONS DU COMPTE -->
                <!-- ================================================= -->

                <div class="section">

                    <h2>
                        1. Informations du compte
                    </h2>


                    <div class="grid">


                        <!-- NOM -->

                        <div class="field">

                            <label>
                                Nom *
                            </label>

                            <input
                                v-model="form.nom"
                                type="text"
                                placeholder="Nom"
                                required
                            >

                        </div>


                        <!-- PRÉNOM -->

                        <div class="field">

                            <label>
                                Prénom *
                            </label>

                            <input
                                v-model="form.prenom"
                                type="text"
                                placeholder="Prénom"
                                required
                            >

                        </div>


                        <!-- EMAIL -->

                        <div class="field">

                            <label>
                                Email *
                            </label>

                            <input
                                v-model="form.email"
                                type="email"
                                placeholder="exemple@email.com"
                                required
                            >

                        </div>


                        <!-- TÉLÉPHONE -->

                        <div class="field">

                            <label>
                                Téléphone *
                            </label>

                            <input
                                v-model="form.telephone"
                                type="tel"
                                placeholder="77 000 00 00"
                                required
                            >

                        </div>


                        <!-- MOT DE PASSE -->

                        <div class="field">

                            <label>
                                Mot de passe *
                            </label>

                            <input
                                v-model="form.password"
                                type="password"
                                minlength="8"
                                placeholder="Minimum 8 caractères"
                                required
                            >

                        </div>


                        <!-- CONFIRMATION -->

                        <div class="field">

                            <label>
                                Confirmer le mot de passe *
                            </label>

                            <input
                                v-model="
                                    form.password_confirmation
                                "
                                type="password"
                                minlength="8"
                                placeholder="Confirmer le mot de passe"
                                required
                            >

                        </div>


                    </div>

                </div>


                <!-- ================================================= -->
                <!-- 2. INFORMATIONS PERSONNELLES -->
                <!-- ================================================= -->

                <div class="section">

                    <h2>
                        2. Informations personnelles
                    </h2>


                    <div class="grid">


                        <!-- DATE DE NAISSANCE -->

                        <div class="field">

                            <label>
                                Date de naissance *
                            </label>

                            <input
                                v-model="form.date_naissance"
                                type="date"
                                :max="dateNaissanceMax"
                                @change="verifierAge"
                                required
                            >


                            <small
                                v-if="age !== null"
                                class="age-info"
                                :class="{
                                    'age-error':
                                        age < 11
                                }"
                            >

                                Âge :
                                {{ age }}
                                an<span
                                    v-if="age > 1"
                                >s</span>

                            </small>

                        </div>


                        <!-- SEXE -->

                        <div class="field">

                            <label>
                                Sexe *
                            </label>

                            <select
                                v-model="form.sexe"
                                required
                            >

                                <option value="">
                                    Sélectionner
                                </option>

                                <option value="Masculin">
                                    Masculin
                                </option>

                                <option value="Feminin">
                                    Féminin
                                </option>

                            </select>

                        </div>


                        <!-- SITUATION -->

                        <div class="field">

                            <label>
                                Situation matrimoniale *
                            </label>

                            <select
                                v-model="
                                    form.situation_matrimoniale
                                "
                                required
                            >

                                <option value="">
                                    Sélectionner
                                </option>

                                <option value="Celibataire">
                                    Célibataire
                                </option>

                                <option value="Marie">
                                    Marié(e)
                                </option>

                                <option value="Divorce">
                                    Divorcé(e)
                                </option>

                                <option value="Veuf">
                                    Veuf / Veuve
                                </option>

                            </select>

                        </div>


                        <!-- NIVEAU D'ÉTUDE -->

                        <div class="field">

                            <label>
                                Niveau d'étude *
                            </label>

                            <input
                                v-model="
                                    form.niveau_etude
                                "
                                type="text"
                                placeholder="Ex : BFEM, Bac, Licence..."
                                required
                            >

                        </div>


                        <!-- NIVEAU INFORMATIQUE -->

                        <div class="field">

                            <label>
                                Niveau informatique *
                            </label>

                            <select
                                v-model="
                                    form.niveau_informatique
                                "
                                required
                            >

                                <option value="">
                                    Sélectionner
                                </option>

                                <option value="Debutant">
                                    Débutant
                                </option>

                                <option value="Intermediaire">
                                    Intermédiaire
                                </option>

                                <option value="Avance">
                                    Avancé
                                </option>

                            </select>

                        </div>


                        <!-- FONCTION -->

                        <div class="field">

                            <label>
                                Fonction
                            </label>

                            <input
                                v-model="form.fonction"
                                type="text"
                                placeholder="Votre fonction"
                            >

                        </div>


                        <!-- ADRESSE -->

                        <div class="field full">

                            <label>
                                Adresse *
                            </label>

                            <textarea
                                v-model="form.adresse"
                                rows="3"
                                placeholder="Votre adresse"
                                required
                            ></textarea>

                        </div>


                        <!-- PHOTO -->

                        <div class="field full">

                            <label>
                                Photo
                            </label>

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                @change="choisirPhoto"
                            >

                        </div>


                    </div>

                </div>


                <!-- ================================================= -->
                <!-- 3. INSCRIPTION FORMATION -->
                <!-- ================================================= -->

                <div class="section">

                    <h2>
                        3. Inscription à la formation
                    </h2>


                    <!-- FORMATION -->

                    <div class="field full">

                        <label>
                            Formation
                        </label>

                        <input
                            :value="formation?.nom"
                            type="text"
                            disabled
                        >

                    </div>


                    <!-- HORAIRE -->

                    <div class="field full horaire-field">

                        <label>
                            Horaire *
                        </label>


                        <div class="horaires-container">


                            <!-- ================================= -->
                            <!-- 10H - 11H -->
                            <!-- ================================= -->

                            <label
                                class="horaire-card"
                                :class="{
                                    selected:
                                        form.horaire ===
                                        '10H-11H'
                                }"
                            >

                                <input
                                    type="radio"
                                    v-model="form.horaire"
                                    value="10H-11H"
                                    required
                                >


                                <div class="horaire-content">

                                    <h3>
                                        Matin
                                    </h3>

                                    <strong>
                                        10H à 11H
                                    </strong>

                                    <p>
                                        Lundi, Mardi,
                                        Jeudi et Vendredi :
                                        <b>Cours</b>
                                    </p>

                                    <p>
                                        Mercredi :
                                        <b>
                                            Révision / Retapage
                                        </b>
                                    </p>

                                </div>

                            </label>


                            <!-- ================================= -->
                            <!-- 11H - 13H -->
                            <!-- ================================= -->

                            <label
                                class="horaire-card"
                                :class="{
                                    selected:
                                        form.horaire ===
                                        '11H-13H'
                                }"
                            >

                                <input
                                    type="radio"
                                    v-model="form.horaire"
                                    value="11H-13H"
                                >


                                <div class="horaire-content">

                                    <h3>
                                        Matin
                                    </h3>

                                    <strong>
                                        11H à 13H
                                    </strong>

                                    <p>
                                        Lundi, Mardi,
                                        Jeudi et Vendredi :
                                        <b>Cours</b>
                                    </p>

                                    <p>
                                        Mercredi :
                                        <b>
                                            Révision / Retapage
                                        </b>
                                    </p>

                                </div>

                            </label>


                            <!-- ================================= -->
                            <!-- 15H - 17H -->
                            <!-- ================================= -->

                            <label
                                class="horaire-card"
                                :class="{
                                    selected:
                                        form.horaire ===
                                        '15H-17H'
                                }"
                            >

                                <input
                                    type="radio"
                                    v-model="form.horaire"
                                    value="15H-17H"
                                >


                                <div class="horaire-content">

                                    <h3>
                                        Après-midi
                                    </h3>

                                    <strong>
                                        15H à 17H
                                    </strong>

                                    <p>
                                        Lundi, Mardi,
                                        Mercredi et Jeudi :
                                        <b>Cours</b>
                                    </p>

                                    <p>
                                        Vendredi :
                                        <b>Pas de cours</b>
                                    </p>

                                </div>

                            </label>


                        </div>

                    </div>

                </div>


                <!-- ================================================= -->
                <!-- ACTIONS -->
                <!-- ================================================= -->

                <div class="actions">


                    <button
                        type="button"
                        class="btn-cancel"
                        @click="annuler"
                    >

                        Annuler

                    </button>


                    <button
                        type="submit"
                        class="btn-submit"
                        :disabled="loading"
                    >

                        {{
                            loading
                                ? "Création..."
                                : "Créer le compte et inscrire"
                        }}

                    </button>


                </div>


            </form>


        </div>

    </div>

</template>


<style scoped>


/* ==========================================================
   PAGE
========================================================== */

.page {

    width: 100%;

    min-height: 100vh;

    padding: 20px;

    box-sizing: border-box;

    background: #f5f7fb;

}


/* ==========================================================
   CONTAINER
========================================================== */

.container {

    max-width: 1100px;

    margin: 0 auto;

}


/* ==========================================================
   LOADING
========================================================== */

.loading {

    text-align: center;

    padding: 60px 20px;

    color: #666;

    font-size: 16px;

}


/* ==========================================================
   HEADER
========================================================== */

.header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 20px;

    margin-bottom: 25px;

}


.header h1 {

    margin: 0 0 8px;

    color: #333;

    font-size: 28px;

}


.header p {

    margin: 0;

    color: #777;

    font-size: 15px;

}


/* ==========================================================
   BOUTON RETOUR
========================================================== */

.btn-back {

    border: none;

    padding: 10px 18px;

    border-radius: 8px;

    background: #eee;

    color: #444;

    cursor: pointer;

    font-weight: 600;

    transition: 0.2s;

}


.btn-back:hover {

    background: #ddd;

}


/* ==========================================================
   FORMATION
========================================================== */

.formation-box {

    background: #eef4ff;

    border: 1px solid #d5e2ff;

    border-radius: 12px;

    padding: 20px;

    margin-bottom: 20px;

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 20px;

}


.formation-box strong {

    color: #555;

    font-size: 13px;

}


.formation-box h2 {

    margin: 7px 0 0;

    color: #3B5998;

    font-size: 21px;

}


.formation-box span {

    display: block;

    margin-top: 7px;

    color: #555;

}


/* ==========================================================
   MESSAGE
========================================================== */

.message {

    padding: 14px 16px;

    border-radius: 8px;

    margin-bottom: 20px;

    font-size: 14px;

    line-height: 1.5;

}


.message.success {

    background: #e8f7ee;

    color: #18733c;

    border: 1px solid #bde5cc;

}


.message.error {

    background: #ffe8e8;

    color: #b42318;

    border: 1px solid #f5c2c2;

}


/* ==========================================================
   FORM
========================================================== */

.form {

    background: #fff;

    border-radius: 12px;

}


/* ==========================================================
   SECTION
========================================================== */

.section {

    border: 1px solid #eee;

    border-radius: 12px;

    padding: 22px;

    margin-bottom: 20px;

    background: #fff;

}


.section h2 {

    margin: 0 0 20px;

    font-size: 18px;

    color: #333;

}


/* ==========================================================
   GRID
========================================================== */

.grid {

    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 18px;

}


/* ==========================================================
   FIELD
========================================================== */

.field {

    display: flex;

    flex-direction: column;

    gap: 7px;

}


.field.full {

    grid-column: 1 / -1;

}


.field label {

    font-weight: 600;

    font-size: 14px;

    color: #333;

}


/* ==========================================================
   INPUT / SELECT / TEXTAREA
========================================================== */

input,
select,
textarea {

    width: 100%;

    box-sizing: border-box;

    padding: 12px 13px;

    border: 1px solid #ddd;

    border-radius: 8px;

    background: #fff;

    color: #333;

    font-size: 14px;

    outline: none;

    transition: 0.2s;

}


input:focus,
select:focus,
textarea:focus {

    border-color: #3B5998;

    box-shadow:
        0 0 0 3px
        rgba(59, 89, 152, 0.08);

}


input:disabled {

    background: #f5f5f5;

    color: #666;

    cursor: not-allowed;

}


textarea {

    resize: vertical;

}


/* ==========================================================
   ÂGE
========================================================== */

.age-info {

    color: #2E7D32;

    font-size: 13px;

}


.age-info.age-error {

    color: #b42318;

}


/* ==========================================================
   HORAIRE
========================================================== */

.horaire-field {

    margin-top: 20px;

}


.horaires-container {

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 18px;

    margin-top: 5px;

}


/* ==========================================================
   CARTE HORAIRE
========================================================== */

.horaire-card {

    display: flex;

    align-items: flex-start;

    gap: 12px;

    padding: 20px;

    border: 1px solid #ddd;

    border-radius: 14px;

    background: #fff;

    cursor: pointer;

    transition:
        border-color 0.2s ease,
        background 0.2s ease,
        box-shadow 0.2s ease;

}


.horaire-card:hover {

    border-color: #3B5998;

    box-shadow:
        0 4px 12px
        rgba(59, 89, 152, 0.08);

}


.horaire-card.selected {

    border-color: #3B5998;

    background: #eef4ff;

    box-shadow:
        0 0 0 2px
        rgba(59, 89, 152, 0.10);

}


/* ==========================================================
   RADIO
========================================================== */

.horaire-card input[type="radio"] {

    width: 18px;

    height: 18px;

    margin-top: 3px;

    flex-shrink: 0;

    accent-color: #3B5998;

}


/* ==========================================================
   CONTENU HORAIRE
========================================================== */

.horaire-content {

    flex: 1;

}


.horaire-content h3 {

    margin: 0 0 8px;

    color: #3B5998;

    font-size: 18px;

}


.horaire-content strong {

    display: inline-block;

    margin-bottom: 10px;

    color: #3B5998;

    font-size: 14px;

}


.horaire-content p {

    margin: 6px 0;

    color: #666;

    font-size: 13px;

    line-height: 1.5;

}


.horaire-content b {

    color: #333;

}


/* ==========================================================
   ACTIONS
========================================================== */

.actions {

    display: flex;

    justify-content: flex-end;

    gap: 12px;

    margin-top: 25px;

    padding-bottom: 20px;

}


.btn-cancel,
.btn-submit {

    border: none;

    padding: 12px 20px;

    border-radius: 8px;

    cursor: pointer;

    font-weight: 600;

    font-size: 14px;

    transition: 0.2s;

}


.btn-cancel {

    background: #eee;

    color: #444;

}


.btn-cancel:hover {

    background: #ddd;

}


.btn-submit {

    background: #3B5998;

    color: white;

}


.btn-submit:hover {

    background: #2E7D32;

}


.btn-submit:disabled {

    opacity: 0.6;

    cursor: not-allowed;

}


/* ==========================================================
   RESPONSIVE
========================================================== */

@media (max-width: 900px) {

    .horaires-container {

        grid-template-columns: 1fr;

    }

}


@media (max-width: 700px) {

    .page {

        padding: 15px;

    }


    .grid {

        grid-template-columns: 1fr;

    }


    .field.full {

        grid-column: auto;

    }


    .formation-box {

        flex-direction: column;

        align-items: flex-start;

    }


    .header {

        flex-direction: column;

        align-items: stretch;

    }


    .header h1 {

        font-size: 24px;

    }


    .actions {

        flex-direction: column;

    }


    .btn-cancel,
    .btn-submit {

        width: 100%;

    }

}
</style>