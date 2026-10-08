```vue
<template>
    <div class="profil-page">

        <!-- EN-TÊTE -->
        <div class="page-header">
            <div>
                <span class="page-badge">
                    <i class="fas fa-user"></i>
                    ESPACE APPRENANT
                </span>

                <h1>Mon profil</h1>

                <p>
                    Consultez et gérez vos informations personnelles.
                </p>
            </div>

            <div class="header-icon">
                <i class="fas fa-user-circle"></i>
            </div>
        </div>


        <!-- MESSAGE SUCCÈS -->
        <div
            v-if="successMessage"
            class="alert alert-success"
        >
            <i class="fas fa-check-circle"></i>
            {{ successMessage }}
        </div>


        <!-- MESSAGE ERREUR -->
        <div
            v-if="errorMessage"
            class="alert alert-error"
        >
            <i class="fas fa-exclamation-circle"></i>
            {{ errorMessage }}
        </div>


        <!-- CARTE PROFIL -->
        <div class="profil-card">

            <!-- PARTIE GAUCHE -->
            <div class="profil-left">

                <!-- PHOTO -->
                <div class="profil-avatar">

                    <img
                        v-if="photoPreview || auth.user?.photo"
                        :src="
                            photoPreview ||
                            `http://127.0.0.1:8000/storage/${auth.user.photo}`
                        "
                        alt="Photo de profil"
                    >

                    <i
                        v-else
                        class="fas fa-user"
                    ></i>

                </div>


                <!-- CHOISIR UNE PHOTO -->
                <label
                    for="photo"
                    class="btn-photo"
                >
                    <i class="fas fa-camera"></i>
                    Modifier la photo
                </label>

                <input
                    id="photo"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    @change="handlePhoto"
                    hidden
                >


                <h2>
                    {{ form.nom || "Apprenant" }}
                </h2>


                <!-- ROLE NON MODIFIABLE -->
                <span class="role-badge">
                    <i class="fas fa-graduation-cap"></i>
                    {{ auth.user?.role || "Apprenant" }}
                </span>

            </div>


            <!-- INFORMATIONS -->
            <div class="profil-right">

                <div class="section-title">
                    <i class="fas fa-id-card"></i>

                    <h3>
                        Informations personnelles
                    </h3>
                </div>


                <form @submit.prevent="modifierProfil">

                    <div class="info-grid">

                        <!-- NOM -->
                        <div class="info-item">

                            <label
                                for="nom"
                                class="info-label"
                            >
                                <i class="fas fa-user"></i>
                                Nom
                            </label>

                            <input
                                id="nom"
                                v-model="form.nom"
                                type="text"
                                class="form-input"
                                required
                            >

                        </div>


                        <!-- PRENOM -->
                        <div class="info-item">

                            <label
                                for="prenom"
                                class="info-label"
                            >
                                <i class="fas fa-user"></i>
                                Prénom
                            </label>

                            <input
                                id="prenom"
                                v-model="form.prenom"
                                type="text"
                                class="form-input"
                                required
                            >

                        </div>


                        <!-- EMAIL -->
                        <div class="info-item">

                            <label
                                for="email"
                                class="info-label"
                            >
                                <i class="fas fa-envelope"></i>
                                Adresse e-mail
                            </label>

                            <input
                                id="email"
                                v-model="form.email"
                                type="email"
                                class="form-input"
                                required
                            >

                        </div>


                        <!-- TELEPHONE -->
                        <div class="info-item">

                            <label
                                for="telephone"
                                class="info-label"
                            >
                                <i class="fas fa-phone"></i>
                                Téléphone
                            </label>

                            <input
                                id="telephone"
                                v-model="form.telephone"
                                type="text"
                                class="form-input"
                                placeholder="Votre numéro de téléphone"
                            >

                        </div>


                        <!-- ROLE -->
                        <div class="info-item role-item">

                            <span class="info-label">
                                <i class="fas fa-user-tag"></i>
                                Rôle
                            </span>

                            <strong>
                                {{ auth.user?.role || "Apprenant" }}
                            </strong>

                            <small>
                                <i class="fas fa-lock"></i>
                                Le rôle ne peut pas être modifié.
                            </small>

                        </div>

                    </div>


                    <!-- BOUTONS -->
                    <div class="form-actions">

                        <button
                            type="button"
                            class="btn-cancel"
                            @click="annulerModification"
                            :disabled="saving"
                        >
                            <i class="fas fa-times"></i>
                            Annuler
                        </button>


                        <button
                            type="submit"
                            class="btn-submit"
                            :disabled="saving"
                        >

                            <i
                                v-if="saving"
                                class="fas fa-spinner fa-spin"
                            ></i>

                            <i
                                v-else
                                class="fas fa-save"
                            ></i>

                            {{ saving ? "Enregistrement..." : "Enregistrer les modifications" }}

                        </button>

                    </div>

                </form>

            </div>

        </div>


        <!-- INFORMATIONS COMPTE -->
        <div class="account-card">

            <div class="account-icon">
                <i class="fas fa-shield-alt"></i>
            </div>

            <div>
                <h3>Mon compte</h3>

                <p>
                    Vous pouvez modifier votre nom, prénom,
                    adresse e-mail, téléphone et photo.
                    Les informations sensibles et le rôle
                    sont protégés.
                </p>
            </div>

        </div>

    </div>
</template>


<script setup>

import { ref } from "vue";
import { useAuthStore } from "../../../stores/auth";

const auth = useAuthStore();


// ===============================
// FORMULAIRE
// ===============================

const form = ref({
    nom: auth.user?.nom || "",
    prenom: auth.user?.prenom || "",
    email: auth.user?.email || "",
    telephone: auth.user?.telephone || ""
});


// ===============================
// PHOTO
// ===============================

const photo = ref(null);
const photoPreview = ref("");


// ===============================
// ETAT
// ===============================

const saving = ref(false);

const successMessage = ref("");

const errorMessage = ref("");


// ===============================
// SELECTION PHOTO
// ===============================

const handlePhoto = (event) => {

    const file = event.target.files?.[0];

    if (!file) {
        return;
    }


    // Vérification du type
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (!allowedTypes.includes(file.type)) {

        errorMessage.value =
            "La photo doit être au format JPG ou PNG.";

        event.target.value = "";

        return;
    }


    // Vérification taille : 2 Mo maximum
    if (file.size > 2 * 1024 * 1024) {

        errorMessage.value =
            "La photo ne doit pas dépasser 2 Mo.";

        event.target.value = "";

        return;
    }


    photo.value = file;

    photoPreview.value = URL.createObjectURL(file);

    errorMessage.value = "";
};


// ===============================
// ANNULER
// ===============================

const annulerModification = () => {

    form.value.nom = auth.user?.nom || "";
    form.value.prenom = auth.user?.prenom || "";
    form.value.email = auth.user?.email || "";
    form.value.telephone = auth.user?.telephone || "";

    photo.value = null;
    photoPreview.value = "";

    errorMessage.value = "";
    successMessage.value = "";
};


// ===============================
// MODIFIER LE PROFIL
// ===============================

const modifierProfil = async () => {

    errorMessage.value = "";
    successMessage.value = "";

    saving.value = true;


    try {

        // ===============================
        // VALIDATIONS
        // ===============================

        if (!form.value.nom.trim()) {

            errorMessage.value =
                "Veuillez renseigner votre nom.";

            saving.value = false;

            return;
        }


        if (!form.value.prenom.trim()) {

            errorMessage.value =
                "Veuillez renseigner votre prénom.";

            saving.value = false;

            return;
        }


        if (!form.value.email.trim()) {

            errorMessage.value =
                "Veuillez renseigner votre adresse e-mail.";

            saving.value = false;

            return;
        }


        // ===============================
        // FORMDATA
        // ===============================

        const formData = new FormData();

        formData.append(
            "nom",
            form.value.nom.trim()
        );

        formData.append(
            "prenom",
            form.value.prenom.trim()
        );

        formData.append(
            "email",
            form.value.email.trim()
        );

        formData.append(
            "telephone",
            form.value.telephone || ""
        );


        // Photo uniquement si une nouvelle
        // photo a été sélectionnée
        if (photo.value) {

            formData.append(
                "photo",
                photo.value
            );

        }


        // Laravel recevra cette requête
        // comme une PUT
        formData.append(
            "_method",
            "PUT"
        );


        console.log(
            "Modification du profil..."
        );


        // ===============================
        // APPEL PINIA
        // ===============================

        const response =
            await auth.updateProfile(formData);


        console.log(
            "Réponse modification profil :",
            response.data
        );


        // ===============================
        // SUCCES
        // ===============================

        successMessage.value =
            response.data?.message ||
            "Votre profil a été modifié avec succès.";


        // Réinitialiser la photo sélectionnée
        photo.value = null;

        photoPreview.value = "";


    } catch (error) {

        console.error(
            "Erreur modification profil :",
            error
        );

        console.error(
            "Réponse serveur :",
            error.response?.data
        );


        if (error.response?.status === 422) {

            const errors =
                error.response?.data?.errors;

            if (errors) {

                const firstError =
                    Object.values(errors)[0];

                errorMessage.value =
                    Array.isArray(firstError)
                        ? firstError[0]
                        : firstError;

            } else {

                errorMessage.value =
                    error.response?.data?.message ||
                    "Les données envoyées sont invalides.";
            }

        } else {

            errorMessage.value =
                error.response?.data?.message ||
                "Impossible de modifier votre profil.";
        }

    } finally {

        saving.value = false;

    }
};

</script>


<style scoped>

.profil-page {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}


/* =========================
   EN-TÊTE
========================= */

.page-header {
    background: linear-gradient(
        135deg,
        #3B5998,
        #2E7D32
    );

    color: white;

    border-radius: 18px;

    padding: 30px 35px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 25px;

    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}


.page-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    background: rgba(255, 255, 255, 0.15);

    padding: 7px 13px;

    border-radius: 20px;

    font-size: 12px;

    font-weight: 600;

    margin-bottom: 10px;
}


.page-header h1 {
    margin: 0 0 6px;

    font-size: 28px;

    font-weight: 700;
}


.page-header p {
    margin: 0;

    opacity: 0.9;

    font-size: 14px;
}


.header-icon {
    width: 65px;
    height: 65px;

    border-radius: 50%;

    background: rgba(255, 255, 255, 0.15);

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 30px;
}


/* =========================
   MESSAGES
========================= */

.alert {
    border-radius: 12px;

    padding: 14px 18px;

    margin-bottom: 20px;

    display: flex;

    align-items: center;

    gap: 10px;

    font-size: 14px;
}


.alert-success {
    background: #eaf6ec;

    color: #2E7D32;

    border: 1px solid #c8e6cc;
}


.alert-error {
    background: #fef2f2;

    color: #b91c1c;

    border: 1px solid #fecaca;
}


/* =========================
   CARTE PROFIL
========================= */

.profil-card {
    background: white;

    border-radius: 18px;

    padding: 30px;

    display: grid;

    grid-template-columns: 280px 1fr;

    gap: 35px;

    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);

    border: 1px solid #eef1f5;

    margin-bottom: 25px;
}


/* =========================
   PARTIE GAUCHE
========================= */

.profil-left {
    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    text-align: center;

    padding: 20px;

    border-right: 1px solid #eef1f5;
}


.profil-avatar {
    width: 130px;
    height: 130px;

    border-radius: 50%;

    overflow: hidden;

    background: #f0f4f8;

    border: 5px solid #e8eef7;

    display: flex;

    align-items: center;

    justify-content: center;

    margin-bottom: 15px;
}


.profil-avatar img {
    width: 100%;
    height: 100%;

    object-fit: cover;
}


.profil-avatar i {
    font-size: 55px;

    color: #3B5998;
}


/* =========================
   BOUTON PHOTO
========================= */

.btn-photo {
    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 7px;

    background: #3B5998;

    color: white;

    padding: 8px 14px;

    border-radius: 8px;

    font-size: 12px;

    font-weight: 600;

    cursor: pointer;

    margin-bottom: 16px;

    transition: 0.2s;
}


.btn-photo:hover {
    opacity: 0.9;

    transform: translateY(-1px);
}


.profil-left h2 {
    margin: 0 0 10px;

    color: #1F2937;

    font-size: 20px;

    font-weight: 700;
}


.role-badge {
    display: inline-flex;

    align-items: center;

    gap: 7px;

    background: #eaf6ec;

    color: #2E7D32;

    padding: 7px 14px;

    border-radius: 20px;

    font-size: 13px;

    font-weight: 600;
}


/* =========================
   INFORMATIONS
========================= */

.profil-right {
    padding: 10px;
}


.section-title {
    display: flex;

    align-items: center;

    gap: 10px;

    margin-bottom: 25px;

    padding-bottom: 15px;

    border-bottom: 1px solid #eef1f5;
}


.section-title i {
    color: #3B5998;

    font-size: 20px;
}


.section-title h3 {
    margin: 0;

    color: #1F2937;

    font-size: 18px;
}


/* =========================
   GRILLE
========================= */

.info-grid {
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 18px;
}


.info-item {
    background: #F8FAFC;

    border-radius: 12px;

    padding: 17px;

    border: 1px solid #eef1f5;
}


.info-label {
    display: flex;

    align-items: center;

    gap: 8px;

    color: #6B7280;

    font-size: 13px;

    margin-bottom: 8px;

    font-weight: 500;
}


.info-label i {
    color: #3B5998;
}


/* =========================
   INPUTS
========================= */

.form-input {
    width: 100%;

    box-sizing: border-box;

    border: 1px solid #dbe1e8;

    background: white;

    border-radius: 8px;

    padding: 11px 12px;

    color: #1F2937;

    font-size: 14px;

    outline: none;

    transition: 0.2s;
}


.form-input:focus {
    border-color: #3B5998;

    box-shadow: 0 0 0 3px rgba(59, 89, 152, 0.10);
}


/* =========================
   ROLE
========================= */

.role-item strong {
    display: block;

    color: #1F2937;

    font-size: 15px;

    margin-bottom: 5px;
}


.role-item small {
    display: block;

    color: #9CA3AF;

    font-size: 11px;
}


.role-item small i {
    margin-right: 4px;
}


/* =========================
   BOUTONS
========================= */

.form-actions {
    display: flex;

    justify-content: flex-end;

    gap: 12px;

    margin-top: 25px;

    padding-top: 20px;

    border-top: 1px solid #eef1f5;
}


.btn-cancel,
.btn-submit {
    border: none;

    border-radius: 9px;

    padding: 11px 18px;

    font-size: 13px;

    font-weight: 600;

    cursor: pointer;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    transition: 0.2s;
}


.btn-cancel {
    background: #f3f4f6;

    color: #4B5563;
}


.btn-cancel:hover {
    background: #e5e7eb;
}


.btn-submit {
    background: #2E7D32;

    color: white;
}


.btn-submit:hover {
    background: #256b29;
}


.btn-cancel:disabled,
.btn-submit:disabled {
    opacity: 0.6;

    cursor: not-allowed;
}


/* =========================
   CARTE COMPTE
========================= */

.account-card {
    background: white;

    border-radius: 16px;

    padding: 22px 25px;

    display: flex;

    align-items: center;

    gap: 18px;

    border-left: 5px solid #2E7D32;

    box-shadow: 0 5px 18px rgba(0, 0, 0, 0.05);
}


.account-icon {
    width: 48px;
    height: 48px;

    min-width: 48px;

    border-radius: 12px;

    background: #eaf6ec;

    color: #2E7D32;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 20px;
}


.account-card h3 {
    margin: 0 0 5px;

    color: #1F2937;

    font-size: 16px;
}


.account-card p {
    margin: 0;

    color: #6B7280;

    font-size: 13px;

    line-height: 1.6;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 900px) {

    .profil-card {
        grid-template-columns: 1fr;
    }

    .profil-left {
        border-right: none;

        border-bottom: 1px solid #eef1f5;

        padding-bottom: 25px;
    }

}


@media (max-width: 650px) {

    .page-header {
        padding: 25px;

        border-radius: 14px;
    }

    .header-icon {
        display: none;
    }

    .page-header h1 {
        font-size: 23px;
    }

    .profil-card {
        padding: 20px;

        gap: 20px;
    }

    .info-grid {
        grid-template-columns: 1fr;
    }

    .account-card {
        align-items: flex-start;

        padding: 18px;
    }

    .form-actions {
        flex-direction: column;
    }

    .btn-cancel,
    .btn-submit {
        width: 100%;
    }

}

</style>
