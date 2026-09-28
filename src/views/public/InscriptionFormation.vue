<script setup>

import { inscriptionPublique } from "@/services/inscriptionService";

import {
    ref,
    onMounted,
    computed
} from "vue";

import {
    useRouter,
    useRoute
} from "vue-router";

import { useFormationStore } from "../../stores/formation";


const router = useRouter();

const route = useRoute();

const formationStore = useFormationStore();


// ======================================================
// FORMATION
// ======================================================

const formation = ref(null);

const loading = ref(false);

const message = ref("");

const messageType = ref("");


// ======================================================
// FORMULAIRE
// ======================================================

const form = ref({

    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    date_naissance: "",
    sexe: "",
    situation_matrimoniale: "",
    niveau_etude: "",
    niveau_informatique: "",
    adresse: "",

    // CNI
    numero_cni: "",

    formation_id: "",
    horaire: "",

    password: "",
    password_confirmation: "",

    // Signature
    signature: ""

});


// ======================================================
// MOT DE PASSE
// ======================================================

const showPassword = ref(false);

const showPasswordConfirmation = ref(false);


// ======================================================
// SIGNATURE
// ======================================================

const signatureCanvas = ref(null);

const signatureDessinee = ref(false);

let dessinEnCours = false;

let contexteSignature = null;


// ======================================================
// DATE MINIMUM : 11 ANS
// ======================================================

const dateNaissanceMax = computed(() => {

    const date = new Date();

    date.setFullYear(
        date.getFullYear() - 11
    );

    return date.toISOString().split("T")[0];

});


// ======================================================
// CALCUL DE L'ÂGE
// ======================================================

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
            aujourdHui.getDate()
            <
            naissance.getDate()
        )
    ) {

        ageCalcule--;

    }

    return ageCalcule;

});


// ======================================================
// VÉRIFICATION ÂGE
// ======================================================

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


// ======================================================
// VÉRIFICATION CNI
// ======================================================

// Nettoyer automatiquement le numéro CNI
// pour ne garder que les chiffres et 13 caractères maximum.
function nettoyerCni() {

    form.value.numero_cni =
        form.value.numero_cni
            .replace(/\D/g, "")
            .slice(0, 13);

}


// Message d'erreur affiché sous le champ CNI.
const erreurCni = computed(() => {

    const cni =
        form.value.numero_cni;

    // Aucun numéro renseigné
    if (!cni) {

        return "Le numéro de CNI est obligatoire.";

    }

    // Vérification des chiffres
    if (!/^\d+$/.test(cni)) {

        return "Le numéro CNI doit contenir uniquement des chiffres.";

    }

    // Vérification de la longueur
    if (cni.length !== 13) {

        return "Le numéro CNI doit contenir exactement 13 chiffres.";

    }

    // Vérification selon le sexe
    if (form.value.sexe === "Masculin") {

        if (!cni.startsWith("1")) {

            return "Pour un homme, le numéro CNI doit commencer par 1.";

        }

    }

    if (form.value.sexe === "Feminin") {

        if (!cni.startsWith("2")) {

            return "Pour une femme, le numéro CNI doit commencer par 2.";

        }

    }

    return "";

});


// Vérification complète du CNI avant l'envoi.
function verifierCni() {

    nettoyerCni();

    if (erreurCni.value) {

        message.value =
            erreurCni.value;

        messageType.value =
            "error";

        return false;

    }

    return true;

}


// ======================================================
// INITIALISER LA SIGNATURE
// ======================================================

function initialiserCanvas() {

    const canvas =
        signatureCanvas.value;

    if (!canvas) return;

    contexteSignature =
        canvas.getContext("2d");

    contexteSignature.lineWidth = 2;

    contexteSignature.lineCap = "round";

    contexteSignature.lineJoin = "round";

    contexteSignature.strokeStyle = "#000";

}


// ======================================================
// POSITION SOURIS
// ======================================================

function obtenirPositionSouris(event) {

    const canvas =
        signatureCanvas.value;

    const rect =
        canvas.getBoundingClientRect();

    return {

        x:
            event.clientX
            -
            rect.left,

        y:
            event.clientY
            -
            rect.top

    };

}


// ======================================================
// POSITION TACTILE
// ======================================================

function obtenirPositionTactile(event) {

    const canvas =
        signatureCanvas.value;

    const rect =
        canvas.getBoundingClientRect();

    const touch =
        event.touches[0];

    return {

        x:
            touch.clientX
            -
            rect.left,

        y:
            touch.clientY
            -
            rect.top

    };

}


// ======================================================
// COMMENCER SIGNATURE - SOURIS
// ======================================================

function commencerSignature(event) {

    if (!contexteSignature) {

        initialiserCanvas();

    }

    dessinEnCours = true;

    signatureDessinee.value = true;

    const position =
        obtenirPositionSouris(event);

    contexteSignature.beginPath();

    contexteSignature.moveTo(
        position.x,
        position.y
    );

}


// ======================================================
// DESSINER - SOURIS
// ======================================================

function dessiner(event) {

    if (!dessinEnCours) return;

    const position =
        obtenirPositionSouris(event);

    contexteSignature.lineTo(
        position.x,
        position.y
    );

    contexteSignature.stroke();

}


// ======================================================
// COMMENCER SIGNATURE - TÉLÉPHONE
// ======================================================

function commencerSignatureTactile(event) {

    event.preventDefault();

    if (!contexteSignature) {

        initialiserCanvas();

    }

    dessinEnCours = true;

    signatureDessinee.value = true;

    const position =
        obtenirPositionTactile(event);

    contexteSignature.beginPath();

    contexteSignature.moveTo(
        position.x,
        position.y
    );

}


// ======================================================
// DESSINER - TÉLÉPHONE
// ======================================================

function dessinerTactile(event) {

    event.preventDefault();

    if (!dessinEnCours) return;

    const position =
        obtenirPositionTactile(event);

    contexteSignature.lineTo(
        position.x,
        position.y
    );

    contexteSignature.stroke();

}


// ======================================================
// TERMINER LA SIGNATURE
// ======================================================

function terminerSignature() {

    if (!dessinEnCours) return;

    dessinEnCours = false;

    if (
        signatureCanvas.value
    ) {

        form.value.signature =
            signatureCanvas.value.toDataURL(
                "image/png"
            );

    }

}


// ======================================================
// EFFACER LA SIGNATURE
// ======================================================

function effacerSignature() {

    const canvas =
        signatureCanvas.value;

    if (
        !canvas ||
        !contexteSignature
    ) {

        return;

    }

    contexteSignature.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    form.value.signature = "";

    signatureDessinee.value = false;

}


// ======================================================
// RÉCUPÉRER LA FORMATION
// ======================================================

onMounted(async () => {

    const id =
        route.query.formation_id;

    if (!id) {

        message.value =
            "Aucune formation sélectionnée.";

        messageType.value =
            "error";

        return;

    }

    try {

        form.value.formation_id = id;

        await formationStore.fetchFormation(id);

        formation.value =
            formationStore.formation;

        setTimeout(() => {

            initialiserCanvas();

        }, 100);

    }

    catch (error) {

        console.error(error);

        message.value =
            "Impossible de récupérer les informations de la formation.";

        messageType.value =
            "error";

    }

});


// ======================================================
// ENVOYER
// ======================================================

async function envoyer() {

    message.value = "";

    messageType.value = "";


    // --------------------------------------------------
    // VÉRIFICATION ÂGE
    // --------------------------------------------------

    if (!verifierAge()) {

        return;

    }


    // --------------------------------------------------
    // MOT DE PASSE
    // --------------------------------------------------

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
            "Les deux mots de passe ne correspondent pas.";

        messageType.value =
            "error";

        return;

    }


    // --------------------------------------------------
    // FORMATION
    // --------------------------------------------------

    if (!form.value.formation_id) {

        message.value =
            "Veuillez sélectionner une formation.";

        messageType.value =
            "error";

        return;

    }


    // --------------------------------------------------
    // CNI
    // --------------------------------------------------

    if (!verifierCni()) {

        return;

    }


    // --------------------------------------------------
    // SIGNATURE
    // --------------------------------------------------

    if (!form.value.signature) {

        message.value =
            "Veuillez signer avant d'envoyer votre demande.";

        messageType.value =
            "error";

        return;

    }


    // --------------------------------------------------
    // ENVOI
    // --------------------------------------------------

    try {

        loading.value = true;

        await inscriptionPublique(
            form.value
        );


        message.value =
            "Votre demande d'inscription a été envoyée avec succès.";

        messageType.value =
            "success";


        form.value.password = "";

        form.value.password_confirmation = "";


        setTimeout(() => {

            router.push("/formations");

        }, 2000);

    }

    catch (error) {

        console.error(error);


        if (
            error.response?.data?.errors
        ) {

            const errors =
                error.response.data.errors;

            const firstError =
                Object.values(errors)[0];


            message.value =
                Array.isArray(firstError)
                    ? firstError[0]
                    : firstError;

        }

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

</script>


<template>

<div class="inscription-page">


    <!-- ==================================================
         CONTENU DU FORMULAIRE
    =================================================== -->

    <main class="inscription-content">


        <div class="inscription-card">


            <!-- HEADER -->

            <div class="page-header">

                <h1>
                    Inscription à une formation
                </h1>

                <p>
                    Remplissez le formulaire pour envoyer votre demande.
                </p>

            </div>


            <!-- FORMATION -->

            <div
                v-if="formation"
                class="formation-info"
            >

                <div>

                    <span class="formation-label">
                        Formation choisie
                    </span>

                    <h3>
                        {{ formation.nom }}
                    </h3>

                </div>

            </div>


            <!-- MESSAGE -->

            <div
                v-if="message"
                :class="[
                    'message',
                    messageType
                ]"
            >

                {{ message }}

            </div>


            <!-- FORMULAIRE -->

            <form
                @submit.prevent="envoyer"
                class="inscription-form"
            >


                <!-- ==================================================
                     INFORMATIONS PERSONNELLES
                =================================================== -->

                <div class="section-title">

                    <h2>
                        Informations personnelles
                    </h2>

                </div>


                <div class="grid">


                    <!-- NOM -->

                    <div class="form-group">

                        <label>
                            Nom
                        </label>

                        <input
                            v-model="form.nom"
                            type="text"
                            placeholder="Votre nom"
                            required
                        >

                    </div>


                    <!-- PRÉNOM -->

                    <div class="form-group">

                        <label>
                            Prénom
                        </label>

                        <input
                            v-model="form.prenom"
                            type="text"
                            placeholder="Votre prénom"
                            required
                        >

                    </div>


                    <!-- EMAIL -->

                    <div class="form-group">

                        <label>
                            Adresse email
                        </label>

                        <input
                            v-model="form.email"
                            type="email"
                            placeholder="exemple@email.com"
                            required
                        >

                    </div>


                    <!-- TÉLÉPHONE -->

                    <div class="form-group">

                        <label>
                            Téléphone
                        </label>

                        <input
                            v-model="form.telephone"
                            type="tel"
                            placeholder="77 000 00 00"
                            required
                        >

                    </div>


                    <!-- CNI -->

                    <div class="form-group">

                        <label>
                            Numéro de CNI
                        </label>

                        <input
                            v-model="form.numero_cni"
                            @input="nettoyerCni"
                            type="text"
                            inputmode="numeric"
                            pattern="[0-9]*"
                            placeholder="Ex : 1234567890123"
                            maxlength="13"
                            required
                        >

                        <small
                            v-if="erreurCni"
                            class="cni-error"
                        >
                            {{ erreurCni }}
                        </small>

                    </div>


                    <!-- DATE -->

                    <div class="form-group">

                        <label>
                            Date de naissance
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
                                'age-error': age < 11
                            }"
                        >

                            Âge :
                            {{ age }}
                            an<span v-if="age > 1">s</span>

                        </small>

                    </div>


                    <!-- SEXE -->

                    <div class="form-group">

                        <label>
                            Sexe
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

                    <div class="form-group">

                        <label>
                            Situation matrimoniale
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
                                Veuf(ve)
                            </option>

                        </select>

                    </div>


                    <!-- NIVEAU ÉTUDE -->

                    <div class="form-group">

                        <label>
                            Niveau d'étude
                        </label>

                        <input
                            v-model="form.niveau_etude"
                            type="text"
                            placeholder="Ex : BFEM, Bac, Licence..."
                            required
                        >

                    </div>


                    <!-- INFORMATIQUE -->

                    <div class="form-group">

                        <label>
                            Niveau informatique
                        </label>

                        <select
                            v-model="form.niveau_informatique"
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


                    <!-- ADRESSE -->

                    <div class="form-group full">

                        <label>
                            Adresse
                        </label>

                        <input
                            v-model="form.adresse"
                            type="text"
                            placeholder="Votre adresse"
                            required
                        >

                    </div>

                </div>


                <!-- ==================================================
                     HORAIRE
                =================================================== -->

                <div class="section-title">

                    <h2>
                        Choix de l'horaire
                    </h2>

                    <p>
                        Sélectionnez le créneau qui vous convient.
                    </p>

                </div>


                <div class="horaires-container">


                    <!-- MATIN : 09H À 11H -->

                    <label class="horaire-card">

                        <input
                            type="radio"
                            v-model="form.horaire"
                            value="Matin - 09h à 11h"
                            required
                        >

                        <div class="horaire-content">

                            <h3>
                                Matin
                            </h3>

                            <strong>
                                09h à 11h
                            </strong>

                            <p>
                                Lundi et Mardi :
                                <b>Cours</b>
                            </p>

                            <p>
                                Mercredi :
                                <b>Révision / Retapage</b>
                            </p>

                            <p>
                                Jeudi et Vendredi :
                                <b>Cours</b>
                            </p>

                        </div>

                    </label>


                    <!-- 11H À 13H -->

                    <label class="horaire-card">

                        <input
                            type="radio"
                            v-model="form.horaire"
                            value="Après 09h - 11h à 13h"
                        >

                        <div class="horaire-content">

                            <h3>
                                Matin 11h
                            </h3>

                            <strong>
                                11h à 13h
                            </strong>

                            <p>
                                Lundi et Mardi :
                                <b>Cours</b>
                            </p>

                            <p>
                                Mercredi :
                                <b>Révision / Retapage</b>
                            </p>

                            <p>
                                Jeudi et Vendredi :
                                <b>Cours</b>
                            </p>

                        </div>

                    </label>


                    <!-- 15H À 17H -->

                    <label class="horaire-card">

                        <input
                            type="radio"
                            v-model="form.horaire"
                            value="Soir - 15h à 17h"
                        >

                        <div class="horaire-content">

                            <h3>
                                Soir
                            </h3>

                            <strong>
                                15h à 17h
                            </strong>

                            <p>
                                Lundi, Mardi, Mercredi et Jeudi :
                                <b>Cours</b>
                            </p>

                            <p>
                                Vendredi :
                                <b>Pas de cours</b>
                            </p>

                        </div>

                    </label>

                </div>


                <!-- ==================================================
                     SIGNATURE
                =================================================== -->

                <div class="section-title">

                    <h2>
                        Signature
                    </h2>

                    <p>
                        Veuillez signer dans la zone ci-dessous.
                    </p>

                </div>


                <div class="signature-box">

                    <div class="signature-canvas-container">

                        <canvas
                            ref="signatureCanvas"
                            class="signature-canvas"
                            width="700"
                            height="250"
                            @mousedown="commencerSignature"
                            @mousemove="dessiner"
                            @mouseup="terminerSignature"
                            @mouseleave="terminerSignature"
                            @touchstart="commencerSignatureTactile"
                            @touchmove="dessinerTactile"
                            @touchend="terminerSignature"
                        ></canvas>


                        <div
                            v-if="!signatureDessinee"
                            class="signature-placeholder"
                        >
                            Signez ici
                        </div>

                    </div>


                    <div class="signature-actions">

                        <small class="signature-help">

                            Vous pouvez signer avec la souris
                            ou avec votre doigt sur téléphone.

                        </small>


                        <button
                            type="button"
                            class="clear-signature-btn"
                            @click="effacerSignature"
                        >
                            Effacer la signature
                        </button>

                    </div>

                </div>


                <!-- ==================================================
                     COMPTE
                =================================================== -->

                <div class="section-title">

                    <h2>
                        Sécuriser votre compte
                    </h2>

                    <p>
                        Choisissez un mot de passe personnel.
                    </p>

                </div>


                <div class="grid">


                    <!-- PASSWORD -->

                    <div class="form-group">

                        <label>
                            Mot de passe
                        </label>

                        <div class="password-field">

                            <input
                                v-model="form.password"
                                :type="
                                    showPassword
                                        ? 'text'
                                        : 'password'
                                "
                                placeholder="Minimum 8 caractères"
                                minlength="8"
                                required
                            >


                            <button
                                type="button"
                                class="password-toggle"
                                @click="
                                    showPassword =
                                        !showPassword
                                "
                            >

                                {{
                                    showPassword
                                        ? "Masquer"
                                        : "Afficher"
                                }}

                            </button>

                        </div>

                    </div>


                    <!-- CONFIRMATION -->

                    <div class="form-group">

                        <label>
                            Confirmer le mot de passe
                        </label>

                        <div class="password-field">

                            <input
                                v-model="
                                    form.password_confirmation
                                "
                                :type="
                                    showPasswordConfirmation
                                        ? 'text'
                                        : 'password'
                                "
                                placeholder="Confirmer votre mot de passe"
                                minlength="8"
                                required
                            >


                            <button
                                type="button"
                                class="password-toggle"
                                @click="
                                    showPasswordConfirmation =
                                        !showPasswordConfirmation
                                "
                            >

                                {{
                                    showPasswordConfirmation
                                        ? "Masquer"
                                        : "Afficher"
                                }}

                            </button>

                        </div>

                    </div>

                </div>


                <!-- ==================================================
                     BOUTON
                =================================================== -->

                <button
                    type="submit"
                    class="submit-button"
                    :disabled="loading"
                >

                    {{
                        loading
                            ? "Envoi en cours..."
                            : "Envoyer ma demande"
                    }}

                </button>


            </form>

        </div>

    </main>

</div>

</template>




<style scoped>

/* ======================================================
   PAGE
====================================================== */

.inscription-page {
    min-height: 100vh;
    background: linear-gradient(
        135deg,
        #f5f7fa 0%,
        #eef3f9 100%
    );
    padding: 50px 20px;
}

.inscription-content {
    max-width: 1100px;
    margin: 0 auto;
}

.inscription-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 40px;
    box-shadow:
        0 10px 35px rgba(0, 0, 0, 0.08),
        0 2px 8px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(59, 89, 152, 0.06);
}


/* ======================================================
   HEADER
====================================================== */

.page-header {
    text-align: center;
    margin-bottom: 35px;
}

.page-header h1 {
    margin: 0 0 10px;
    color: #3B5998;
    font-size: 32px;
    font-weight: 700;
}

.page-header p {
    color: #6b7280;
    font-size: 15px;
    margin: 0;
}


/* ======================================================
   FORMATION
====================================================== */

.formation-info {
    background: linear-gradient(
        135deg,
        #f0f7f1,
        #f7fbf7
    );
    border: 1px solid #dcebdd;
    border-left: 5px solid #2E7D32;
    padding: 20px 22px;
    border-radius: 12px;
    margin-bottom: 30px;
}

.formation-label {
    display: block;
    font-size: 13px;
    color: #777;
    margin-bottom: 6px;
}

.formation-info h3 {
    margin: 0;
    color: #2E7D32;
    font-size: 20px;
}


/* ======================================================
   MESSAGE
====================================================== */

.message {
    padding: 15px 18px;
    border-radius: 10px;
    margin-bottom: 25px;
    font-weight: 500;
    font-size: 14px;
}

.message.success {
    background: #e8f5e9;
    color: #2E7D32;
    border: 1px solid #c8e6c9;
}

.message.error {
    background: #ffebee;
    color: #c62828;
    border: 1px solid #ffcdd2;
}


/* ======================================================
   FORMULAIRE
====================================================== */

.inscription-form {
    width: 100%;
}

.section-title {
    margin-top: 35px;
    margin-bottom: 22px;
    padding-bottom: 10px;
    border-bottom: 1px solid #edf0f4;
}

.section-title h2 {
    position: relative;
    color: #3B5998;
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    padding-left: 14px;
}

.section-title h2::before {
    content: "";
    position: absolute;
    left: 0;
    top: 3px;
    width: 4px;
    height: 20px;
    background: #2E7D32;
    border-radius: 4px;
}

.section-title p {
    color: #666;
    margin: 7px 0 0;
    font-size: 14px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 22px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group.full {
    grid-column: 1 / -1;
}

.form-group label {
    font-weight: 600;
    margin-bottom: 8px;
    color: #374151;
    font-size: 14px;
}

.form-group input,
.form-group select {
    width: 100%;
    min-height: 46px;
    padding: 11px 14px;
    border: 1px solid #d9dee7;
    border-radius: 9px;
    background: #fff;
    color: #333;
    font-size: 15px;
    box-sizing: border-box;
    outline: none;
    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        background 0.2s ease;
}

.form-group input::placeholder {
    color: #a0a6b0;
}

.form-group input:hover,
.form-group select:hover {
    border-color: #b8c1d1;
}

.form-group input:focus,
.form-group select:focus {
    border-color: #3B5998;
    background: #fff;
    box-shadow:
        0 0 0 3px rgba(59, 89, 152, 0.10);
}


/* ======================================================
   CNI
====================================================== */

.form-group input[maxlength="13"] {
    letter-spacing: 1px;
}

.cni-error {
    margin-top: 6px;
    color: #c62828;
    font-size: 13px;
}


/* ======================================================
   ÂGE
====================================================== */

.age-info {
    margin-top: 6px;
    color: #2E7D32;
    font-size: 13px;
}

.age-info.age-error {
    color: #c62828;
}


/* ======================================================
   HORAIRE
====================================================== */

.horaires-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
}

.horaire-card {
    position: relative;
    display: block;
    border: 1px solid #dfe3ea;
    border-radius: 13px;
    padding: 22px;
    background: #fff;
    cursor: pointer;
    transition:
        border-color 0.2s ease,
        background 0.2s ease,
        box-shadow 0.2s ease,
        transform 0.2s ease;
}

.horaire-card:hover {
    border-color: #3B5998;
    background: #f8faff;
    transform: translateY(-2px);
    box-shadow: 0 7px 18px rgba(59, 89, 152, 0.08);
}

.horaire-card input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.horaire-card input:checked + .horaire-content {
    color: #3B5998;
}

.horaire-card:has(input:checked) {
    border-color: #3B5998;
    background: #f5f8ff;
    box-shadow:
        0 0 0 2px rgba(59, 89, 152, 0.10),
        0 8px 20px rgba(59, 89, 152, 0.08);
}

.horaire-content h3 {
    margin: 0 0 10px;
    color: #3B5998;
    font-size: 17px;
}

.horaire-content strong {
    display: block;
    margin-bottom: 12px;
    font-size: 18px;
    color: #2E7D32;
}

.horaire-content p {
    margin: 8px 0;
    color: #555;
    font-size: 14px;
    line-height: 1.5;
}


/* ======================================================
   SIGNATURE
====================================================== */

.signature-box {
    margin-top: 20px;
}

.signature-canvas-container {
    position: relative;
    width: 100%;
    border: 1px solid #d9dee7;
    border-radius: 12px;
    background: #fff;
    overflow: hidden;
    transition: border-color 0.2s ease;
}

.signature-canvas-container:hover {
    border-color: #b8c1d1;
}

.signature-canvas {
    display: block;
    width: 100%;
    height: 250px;
    cursor: crosshair;
    touch-action: none;
}

.signature-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #a0a6b0;
    font-size: 16px;
    pointer-events: none;
}

.signature-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    margin-top: 10px;
}

.signature-help {
    color: #777;
    font-size: 13px;
}

.clear-signature-btn {
    padding: 8px 15px;
    border: 1px solid #ddd;
    border-radius: 7px;
    background: #f7f7f7;
    color: #444;
    cursor: pointer;
    transition:
        background 0.2s ease,
        border-color 0.2s ease;
}

.clear-signature-btn:hover {
    background: #eeeeee;
    border-color: #ccc;
}


/* ======================================================
   MOT DE PASSE
====================================================== */

.password-field {
    position: relative;
    display: flex;
}

.password-field input {
    padding-right: 90px;
}

.password-toggle {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    color: #3B5998;
    cursor: pointer;
    font-weight: 600;
    padding: 6px 10px;
}


/* ======================================================
   BOUTON
====================================================== */

.submit-button {
    width: 100%;
    margin-top: 35px;
    padding: 15px 20px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(
        135deg,
        #3B5998,
        #304b82
    );
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow:
        0 6px 15px rgba(59, 89, 152, 0.18);
    transition:
        background 0.2s ease,
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.submit-button:hover:not(:disabled) {
    background: linear-gradient(
        135deg,
        #304b82,
        #263d6b
    );
    transform: translateY(-1px);
    box-shadow:
        0 8px 18px rgba(59, 89, 152, 0.24);
}

.submit-button:active:not(:disabled) {
    transform: translateY(0);
}

.submit-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
}


/* ======================================================
   RESPONSIVE
====================================================== */

@media (max-width: 900px) {

    .horaires-container {
        grid-template-columns: 1fr;
    }

    .inscription-card {
        padding: 30px;
    }
}


@media (max-width: 700px) {

    .inscription-page {
        padding: 25px 12px;
    }

    .inscription-card {
        padding: 22px 18px;
        border-radius: 15px;
    }

    .page-header h1 {
        font-size: 26px;
    }

    .grid {
        grid-template-columns: 1fr;
        gap: 17px;
    }

    .form-group.full {
        grid-column: auto;
    }

    .section-title {
        margin-top: 28px;
    }

    .section-title h2 {
        font-size: 18px;
    }

    .signature-actions {
        flex-direction: column;
        align-items: stretch;
    }

    .clear-signature-btn {
        width: 100%;
    }

    .signature-canvas {
        height: 200px;
    }
}


@media (max-width: 480px) {

    .inscription-page {
        padding: 15px 8px;
    }

    .inscription-card {
        padding: 20px 15px;
    }

    .page-header {
        margin-bottom: 25px;
    }

    .page-header h1 {
        font-size: 23px;
    }

    .formation-info {
        padding: 16px;
    }

    .horaire-card {
        padding: 18px;
    }

    .submit-button {
        padding: 14px;
    }
}

</style>
