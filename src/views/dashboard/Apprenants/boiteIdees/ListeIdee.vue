<template>
    <div>
        <div class="page-container">

            <div class="page-header">
                <div>
                    <h1>Ma boîte à idées</h1>
                    <p>
                        Envoyez vos suggestions, questions, réclamations ou demandes
                        au CRE Diougoup Peuhl.
                    </p>
                </div>

                <button type="button" class="btn-nouveau" @click="ouvrirNouveau">
                    + Nouveau message
                </button>
            </div>

            <!-- Statistiques -->
            <div class="stats-grid">
                <div class="stat-card">
                    <span>Messages envoyés</span>
                    <strong>{{ idees.length }}</strong>
                </div>

                <div class="stat-card nouveau">
                    <span>En attente</span>
                    <strong>{{ compterStatut("Nouveau") }}</strong>
                </div>

                <div class="stat-card en-cours">
                    <span>En cours</span>
                    <strong>{{ compterStatut("En cours") }}</strong>
                </div>

                <div class="stat-card traite">
                    <span>Traités</span>
                    <strong>{{ compterStatut("Traite") }}</strong>
                </div>
            </div>

            <!-- Messages -->
            <p v-if="message" class="alerte succes">{{ message }}</p>
            <p v-if="erreur" class="alerte erreur">{{ erreur }}</p>

            <div class="content-card">

                <div class="section-header">
                    <h2>Mes messages</h2>

                    <button
                        type="button"
                        class="btn-actualiser"
                        @click="chargerIdees"
                        :disabled="chargement"
                    >
                        {{ chargement ? "Chargement..." : "Actualiser" }}
                    </button>
                </div>

                <div v-if="chargement" class="vide">
                    Chargement de vos messages...
                </div>

                <div v-else-if="idees.length === 0" class="vide">
                    <div class="vide-icone">💡</div>
                    <h3>Aucun message pour le moment</h3>
                    <p>Une idée, une question ou un problème ? Écrivez-nous.</p>

                    <button type="button" class="btn-nouveau" @click="ouvrirNouveau">
                        Envoyer mon premier message
                    </button>
                </div>

                <div v-else class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Objet</th>
                                <th>Envoyé le</th>
                                <th>Statut</th>
                                <th>Réponse</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="idee in idees" :key="idee.id">
                                <td>
                                    <span class="badge-type">
                                        {{ libelleType(idee.type_message) }}
                                    </span>
                                </td>

                                <td class="colonne-objet">{{ idee.objet }}</td>

                                <td>{{ formaterDate(idee.created_at) }}</td>

                                <td>
                                    <span :class="['badge-statut', classeStatut(idee.statut)]">
                                        {{ libelleStatut(idee.statut) }}
                                    </span>
                                </td>

                                <td>
                                    <span v-if="idee.reponse" class="badge-reponse">
                                        Réponse reçue
                                    </span>
                                    <span v-else class="pas-de-reponse">—</span>
                                </td>

                                <td>
                                    <div class="actions">
                                        <button
                                            type="button"
                                            class="btn-voir"
                                            @click="voirIdee(idee)"
                                        >
                                            Voir
                                        </button>

                                        <button
                                            v-if="idee.statut !== 'Traite'"
                                            type="button"
                                            class="btn-modifier"
                                            @click="ouvrirModification(idee)"
                                        >
                                            Modifier
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <Teleport to="body">

            <!-- VOIR LE MESSAGE ET LA REPONSE -->
            <div
                v-if="mode === 'details' && ideeSelectionnee"
                class="dip-overlay"
                @click.self="fermerModal"
            >
                <div class="dip-modal">
                    <div class="dip-header">
                        <h2>Mon message</h2>
                        <button type="button" class="btn-fermer" @click="fermerModal">×</button>
                    </div>

                    <div class="infos-message">
                        <p><strong>Type :</strong> {{ libelleType(ideeSelectionnee.type_message) }}</p>
                        <p>
                            <strong>Statut :</strong>
                            {{ libelleStatut(ideeSelectionnee.statut) }}
                        </p>
                        <p><strong>Envoyé le :</strong> {{ formaterDate(ideeSelectionnee.created_at) }}</p>
                    </div>

                    <h3 class="objet-message">{{ ideeSelectionnee.objet }}</h3>

                    <div class="texte-message">{{ ideeSelectionnee.message }}</div>

                    <div v-if="ideeSelectionnee.reponse" class="bloc-reponse">
                        <h4>Réponse du centre</h4>
                        <div class="texte-reponse">{{ ideeSelectionnee.reponse }}</div>
                        <small v-if="ideeSelectionnee.date_reponse">
                            Répondu le {{ formaterDate(ideeSelectionnee.date_reponse) }}
                        </small>
                    </div>

                    <div v-else class="bloc-attente">
                        Le centre n'a pas encore répondu. Vous serez prévenu par
                        notification et par email.
                    </div>

                    <div class="dip-footer">
                        <button type="button" class="btn-annuler" @click="fermerModal">
                            Fermer
                        </button>
                    </div>
                </div>
            </div>

            <!-- NOUVEAU MESSAGE / MODIFICATION -->
            <div
                v-if="mode === 'formulaire'"
                class="dip-overlay"
                @click.self="fermerModal"
            >
                <div class="dip-modal">
                    <div class="dip-header">
                        <h2>{{ ideeSelectionnee ? "Modifier mon message" : "Nouveau message" }}</h2>
                        <button type="button" class="btn-fermer" @click="fermerModal">×</button>
                    </div>

                    <div class="formulaire">
                        <label>Type de message *</label>
                        <select v-model="formIdee.type_message">
                            <option value="">Choisir un type</option>
                            <option value="Suggestion">Suggestion</option>
                            <option value="Reclamation">Réclamation</option>
                            <option value="Question">Question</option>
                            <option value="Demande">Demande</option>
                        </select>

                        <label>Objet *</label>
                        <input
                            v-model.trim="formIdee.objet"
                            type="text"
                            maxlength="255"
                            placeholder="Résumez votre message en quelques mots"
                        >

                        <label>Message *</label>
                        <textarea
                            v-model="formIdee.message"
                            rows="6"
                            placeholder="Écrivez votre message ici..."
                        ></textarea>

                        <small v-if="ideeSelectionnee">
                            Votre message modifié sera relu par le centre.
                            Vous ne pouvez plus le modifier une fois qu'il est traité.
                        </small>

                        <p v-if="erreurModal" class="alerte erreur">{{ erreurModal }}</p>
                    </div>

                    <div class="dip-footer">
                        <button type="button" class="btn-annuler" @click="fermerModal">
                            Annuler
                        </button>

                        <button
                            type="button"
                            class="btn-envoyer"
                            @click="enregistrerIdee"
                            :disabled="enregistrement"
                        >
                            {{ enregistrement
                                ? "Envoi en cours..."
                                : (ideeSelectionnee ? "Enregistrer" : "Envoyer") }}
                        </button>
                    </div>
                </div>
            </div>

        </Teleport>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import api from "@/api/api";

const idees = ref([]);
const chargement = ref(false);
const erreur = ref("");
const message = ref("");

// Fenêtres : "" | "details" | "formulaire"
const mode = ref("");
const ideeSelectionnee = ref(null);
const enregistrement = ref(false);
const erreurModal = ref("");

const formIdee = reactive({
    type_message: "",
    objet: "",
    message: ""
});

// Récupérer les messages de l'apprenant connecté
const chargerIdees = async () => {
    chargement.value = true;
    erreur.value = "";

    try {
        const reponse = await api.get("/auth/boite-idees");
        const donnees = reponse.data;

        idees.value = Array.isArray(donnees)
            ? donnees
            : (donnees.data || []);

    } catch (error) {
        console.error("Erreur chargement boîte à idées :", error);

        erreur.value =
            error.response?.data?.message ||
            "Impossible de récupérer vos messages.";
    } finally {
        chargement.value = false;
    }
};

const compterStatut = (statut) => {
    return idees.value.filter(idee => idee.statut === statut).length;
};

const libelleType = (type) => {
    return type === "Reclamation" ? "Réclamation" : type;
};

const libelleStatut = (statut) => {
    const statuts = {
        "Nouveau": "En attente",
        "En cours": "En cours",
        "Traite": "Traité"
    };

    return statuts[statut] || statut;
};

const classeStatut = (statut) => {
    const classes = {
        "Nouveau": "nouveau",
        "En cours": "en-cours",
        "Traite": "traite"
    };

    return classes[statut] || "";
};

const formaterDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
};

// Voir un message et sa réponse
const voirIdee = (idee) => {
    ideeSelectionnee.value = idee;
    mode.value = "details";
};

// Écrire un nouveau message
const ouvrirNouveau = () => {
    ideeSelectionnee.value = null;
    mode.value = "formulaire";
    erreurModal.value = "";

    formIdee.type_message = "";
    formIdee.objet = "";
    formIdee.message = "";
};

// Modifier un message (formulaire prérempli)
const ouvrirModification = (idee) => {
    ideeSelectionnee.value = idee;
    mode.value = "formulaire";
    erreurModal.value = "";

    formIdee.type_message = idee.type_message;
    formIdee.objet = idee.objet;
    formIdee.message = idee.message;
};

// Envoyer ou enregistrer
const enregistrerIdee = async () => {
    erreurModal.value = "";

    if (
        !formIdee.type_message ||
        !formIdee.objet.trim() ||
        !formIdee.message.trim()
    ) {
        erreurModal.value = "Veuillez remplir tous les champs obligatoires (*).";
        return;
    }

    enregistrement.value = true;

    try {
        let reponse;

        if (ideeSelectionnee.value) {
            reponse = await api.put(
                `/auth/boite-idees/${ideeSelectionnee.value.id}`,
                { ...formIdee }
            );
        } else {
            reponse = await api.post("/auth/boite-idees", { ...formIdee });
        }

        message.value = reponse.data.message || "Votre message a été enregistré.";

        fermerModal();
        await chargerIdees();

    } catch (error) {
        console.error("Erreur enregistrement message :", error);

        const erreursValidation = error.response?.data?.errors;

        if (erreursValidation) {
            erreurModal.value = Object.values(erreursValidation)
                .flat()
                .join(" ");
        } else {
            erreurModal.value =
                error.response?.data?.message ||
                "Impossible d'enregistrer votre message.";
        }
    } finally {
        enregistrement.value = false;
    }
};

const fermerModal = () => {
    mode.value = "";
    ideeSelectionnee.value = null;
    erreurModal.value = "";
};

onMounted(() => {
    chargerIdees();
});
</script>

<style scoped>
.page-container {
    padding: 25px;
    max-width: 1200px;
    margin: auto;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
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

button {
    border: none;
    border-radius: 7px;
    cursor: pointer;
    font-size: 13px;
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-nouveau {
    background: #2E7D32;
    color: white;
    padding: 12px 18px;
    border-radius: 8px;
    font-weight: 600;
}

.btn-nouveau:hover {
    background: #256529;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
    margin-bottom: 25px;
}

.stat-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
    border-left: 4px solid #3B5998;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.stat-card span {
    color: #666;
    font-size: 14px;
}

.stat-card strong {
    font-size: 27px;
    color: #3B5998;
}

.stat-card.nouveau { border-color: #ed9c28; }
.stat-card.nouveau strong { color: #ed9c28; }
.stat-card.en-cours { border-color: #1e88e5; }
.stat-card.en-cours strong { color: #1e88e5; }
.stat-card.traite { border-color: #2E7D32; }
.stat-card.traite strong { color: #2E7D32; }

.alerte {
    padding: 14px;
    border-radius: 8px;
    margin-bottom: 18px;
}

.alerte.succes {
    background: #e8f5e9;
    color: #2E7D32;
}

.alerte.erreur {
    background: #ffebee;
    color: #c62828;
}

.content-card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 22px;
}

.section-header h2 {
    color: #333;
    font-size: 19px;
}

.btn-actualiser {
    background: #f0f3f8;
    color: #3B5998;
    padding: 9px 14px;
}

.vide {
    text-align: center;
    padding: 40px 15px;
    color: #777;
}

.vide-icone {
    font-size: 45px;
    margin-bottom: 12px;
}

.vide h3 {
    color: #333;
    margin-bottom: 8px;
}

.vide p {
    margin-bottom: 18px;
}

.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;
}

th, td {
    padding: 14px;
    text-align: left;
    border-bottom: 1px solid #eee;
    font-size: 14px;
}

th {
    background: #f7f8fa;
    color: #444;
}

td {
    color: #555;
}

.colonne-objet {
    max-width: 280px;
    overflow-wrap: anywhere;
}

.badge-type {
    background: #eef2f8;
    color: #3B5998;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
}

.badge-statut {
    display: inline-block;
    padding: 6px 11px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
}

.badge-statut.nouveau {
    background: #fff3cd;
    color: #856404;
}

.badge-statut.en-cours {
    background: #dbeafe;
    color: #1e40af;
}

.badge-statut.traite {
    background: #e8f5e9;
    color: #2E7D32;
}

.badge-reponse {
    background: #e8f5e9;
    color: #2E7D32;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
}

.pas-de-reponse {
    color: #aaa;
}

.actions {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.actions button {
    padding: 8px 12px;
    font-weight: 600;
}

.btn-voir {
    background: #e8eef8;
    color: #3B5998;
}

.btn-modifier {
    background: #fff3cd;
    color: #856404;
}

/* FENETRES (préfixe dip- pour éviter les conflits CSS) */
.dip-overlay {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0, 0, 0, 0.65);
    display: flex !important;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 2147483647 !important;
    visibility: visible !important;
    opacity: 1 !important;
}

.dip-modal {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    background: white;
    width: 100%;
    max-width: 640px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 25px;
    border-radius: 12px;
    position: relative;
    box-shadow: 0 10px 40px #00000030;
}

.dip-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
}

.dip-header h2 {
    color: #3B5998;
    font-size: 20px;
}

.btn-fermer {
    background: #f1f1f1;
    font-size: 22px;
    padding: 3px 10px;
}

.infos-message {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px 14px;
    margin-bottom: 14px;
}

.infos-message p {
    color: #555;
    font-size: 14px;
}

.objet-message {
    color: #333;
    margin: 6px 0 10px;
    overflow-wrap: anywhere;
}

.texte-message {
    background: #f7f8fa;
    border-left: 4px solid #3B5998;
    border-radius: 6px;
    padding: 14px;
    color: #444;
    line-height: 1.6;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    margin-bottom: 16px;
}

.bloc-reponse {
    background: #edf7ef;
    border-left: 4px solid #2E7D32;
    border-radius: 6px;
    padding: 14px;
}

.bloc-reponse h4 {
    color: #2E7D32;
    margin-bottom: 8px;
}

.texte-reponse {
    color: #333;
    line-height: 1.6;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    margin-bottom: 8px;
}

.bloc-reponse small {
    color: #667085;
}

.bloc-attente {
    background: #f0f5ff;
    color: #3B5998;
    padding: 14px;
    border-radius: 6px;
    line-height: 1.6;
}

.formulaire {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.formulaire label {
    font-weight: 600;
    color: #333;
    font-size: 14px;
}

.formulaire input,
.formulaire select,
.formulaire textarea {
    width: 100%;
    padding: 11px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-family: inherit;
    font-size: 14px;
    box-sizing: border-box;
}

.formulaire small {
    color: #777;
}

.dip-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.dip-footer button {
    padding: 10px 16px;
    font-weight: 600;
}

.btn-annuler {
    background: #eee;
    color: #333;
}

.btn-envoyer {
    background: #2E7D32;
    color: white;
}

@media (max-width: 800px) {
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 600px) {
    .page-container {
        padding: 12px;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .infos-message {
        grid-template-columns: 1fr;
    }

    .btn-nouveau {
        width: 100%;
    }
}
</style>
