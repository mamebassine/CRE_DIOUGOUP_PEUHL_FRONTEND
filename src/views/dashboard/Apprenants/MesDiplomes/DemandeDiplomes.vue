
<template>
    <div class="page-container">

        <div class="page-header">
            <div>
                <h1>Demande de diplôme ou d'attestation</h1>
                <p>
                    Remplissez ce formulaire pour effectuer votre demande
                    auprès du CRE Diougoup Peuhl.
                </p>
            </div>
        </div>

        <div v-if="message" class="alert success">
            {{ message }}
        </div>

        <div v-if="erreur" class="alert error">
            {{ erreur }}
        </div>

        <form @submit.prevent="envoyerDemande" class="form-card">

            <h3>1. Type de document</h3>

            <div class="form-group">
                <label>Document souhaité *</label>

                <select v-model="form.type_document" required>
                    <option value="">Choisir un document</option>
                    <option value="Diplome">Diplôme</option>
                    <option value="Attestation">Attestation</option>
                </select>
            </div>

            <h3>2. Informations personnelles</h3>

            <div class="form-grid">

                <div class="form-group">
                    <label>Prénom *</label>
                    <input v-model.trim="form.prenom" type="text" required>
                </div>

                <div class="form-group">
                    <label>Nom *</label>
                    <input v-model.trim="form.nom" type="text" required>
                </div>

                <div class="form-group">
                    <label>Date de naissance *</label>
                    <input v-model="form.date_naissance" type="date" required>
                </div>

                <div class="form-group">
                    <label>Lieu de naissance *</label>
                    <input v-model.trim="form.lieu_naissance" type="text" required>
                </div>

                <div class="form-group">
                    <label>Téléphone *</label>
                    <input v-model.trim="form.telephone" type="tel" required>
                </div>

                <div class="form-group">
                    <label>Adresse *</label>
                    <input v-model.trim="form.adresse" type="text" required>
                </div>

                <div class="form-group full-width">
                    <label>Fonction (facultatif)</label>
                    <input v-model.trim="form.fonction" type="text">
                </div>

            </div>

            <h3>3. Informations sur la formation</h3>

            <div class="form-grid">

                <div class="form-group">
                    <label>Formation suivie *</label>
                    <input v-model.trim="form.formation" type="text" required>
                </div>

                <div class="form-group">
                    <label>Durée de la formation</label>
                    <input v-model.trim="form.duree_formation" type="text"
                        placeholder="Exemple : 6 mois">
                </div>

                <div class="form-group">
                    <label>Période de formation</label>
                    <input v-model.trim="form.periode_formation" type="text"
                        placeholder="Exemple : Janvier à Juin 2026">
                </div>

                <div class="form-group">
                    <label>Module suivi</label>
                    <input v-model.trim="form.module_suivi" type="text">
                </div>

                <div class="form-group">
                    <label>Année académique</label>
                    <input v-model.trim="form.annee_academique" type="text"
                        placeholder="Exemple : 2025-2026">
                </div>

            </div>

            <h3>4. Informations sur la demande</h3>

            <div class="form-group">
                <label>Lieu de la demande *</label>
                <input v-model.trim="form.lieu_demande" type="text"
                    placeholder="Exemple : Saint-Louis" required>
            </div>

            <p class="info-text">
                Après l'envoi, votre demande sera transmise à
                l'administration pour examen. Vous pourrez suivre son
                évolution depuis votre espace apprenant.
            </p>

            <div class="form-actions">
                <button type="button" class="cancel-btn" @click="reinitialiser">
                    Réinitialiser
                </button>

                <button type="submit" class="submit-btn" :disabled="chargement">
                    {{ chargement ? "Envoi en cours..." : "Envoyer ma demande" }}
                </button>
            </div>

        </form>

    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/api";

const router = useRouter();

const chargement = ref(false);
const message = ref("");
const erreur = ref("");

const form = reactive({
    type_document: "",
    prenom: "",
    nom: "",
    date_naissance: "",
    lieu_naissance: "",
    telephone: "",
    adresse: "",
    fonction: "",
    formation: "",
    duree_formation: "",
    periode_formation: "",
    module_suivi: "",
    annee_academique: "",
    lieu_demande: ""
});

const reinitialiser = () => {
    Object.keys(form).forEach((key) => {
        form[key] = "";
    });

    message.value = "";
    erreur.value = "";
};

const envoyerDemande = async () => {
    chargement.value = true;
    message.value = "";
    erreur.value = "";

    try {
        const reponse = await api.post(
            "/auth/diplomes/demande",
            form
        );

        message.value = reponse.data.message ||
            "Votre demande a été envoyée avec succès.";

        reinitialiser();

        setTimeout(() => {
            router.push("/espace-apprenant/diplomes");
        }, 1500);

    } catch (error) {
        console.error("Erreur demande diplôme :", error);

        if (error.response?.data?.errors) {
            erreur.value = Object.values(
                error.response.data.errors
            ).flat().join(" ");
        } else {
            erreur.value = error.response?.data?.message ||
                "Une erreur est survenue lors de l'envoi.";
        }

    } finally {
        chargement.value = false;
    }
};
</script>

<style scoped>
.page-container {
    padding: 25px;
    max-width: 1100px;
    margin: auto;
}

.page-header {
    margin-bottom: 25px;
}

.page-header h1 {
    color: #3B5998;
    font-size: 25px;
    margin-bottom: 8px;
}

.page-header p {
    color: #666;
}

.form-card {
    background: white;
    padding: 30px;
    border-radius: 14px;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
}

.form-card h3 {
    color: #2E7D32;
    font-size: 18px;
    margin: 25px 0 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.form-card h3:first-child {
    margin-top: 0;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 18px;
}

.form-group label {
    font-weight: 600;
    color: #333;
    font-size: 14px;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    outline: none;
    box-sizing: border-box;
    font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
    border-color: #3B5998;
    box-shadow: 0 0 0 3px rgba(59, 89, 152, 0.1);
}

.full-width {
    grid-column: 1 / -1;
}

.info-text {
    background: #f0f5ff;
    color: #3B5998;
    padding: 15px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.6;
    margin: 20px 0;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 25px;
}

.submit-btn,
.cancel-btn {
    padding: 12px 22px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
}

.submit-btn {
    background: #2E7D32;
    color: white;
}

.submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.cancel-btn {
    background: #eee;
    color: #333;
}

.alert {
    padding: 14px;
    border-radius: 8px;
    margin-bottom: 18px;
}

.success {
    background: #e8f5e9;
    color: #2E7D32;
}

.error {
    background: #ffebee;
    color: #c62828;
}

@media (max-width: 650px) {
    .form-grid {
        grid-template-columns: 1fr;
    }

    .form-card {
        padding: 18px;
    }

    .form-actions {
        flex-direction: column;
    }

    .form-actions button {
        width: 100%;
    }
}
</style>
