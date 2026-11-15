<template>
    <div>
        <div class="page-container">

            <div class="page-header">
                <div>
                    <h1>Boîte à idées</h1>
                    <p>Lisez les messages des apprenants et répondez-y.</p>
                    <span v-if="nonLus > 0" class="pastille-non-lus">
                        {{ nonLus }} message{{ nonLus > 1 ? "s" : "" }} non lu{{ nonLus > 1 ? "s" : "" }}
                    </span>
                </div>

                <button
                    type="button"
                    class="btn-actualiser"
                    @click="chargerIdees"
                    :disabled="chargement"
                >
                    {{ chargement ? "Chargement..." : "Actualiser" }}
                </button>
            </div>

            <!-- Statistiques -->
            <div class="stats-grid">
                <div class="stat-card">
                    <span>Total des messages</span>
                    <strong>{{ idees.length }}</strong>
                </div>

                <div class="stat-card nouveau">
                    <span>À traiter</span>
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

                <!-- Filtres -->
                <div class="filtres">
                    <input
                        v-model="filtres.recherche"
                        type="text"
                        placeholder="Rechercher (nom, objet, message)..."
                    >

                    <select v-model="filtres.statut">
                        <option value="">Tous les statuts</option>
                        <option value="Nouveau">À traiter</option>
                        <option value="En cours">En cours</option>
                        <option value="Traite">Traités</option>
                    </select>

                    <select v-model="filtres.type">
                        <option value="">Tous les types</option>
                        <option value="Suggestion">Suggestion</option>
                        <option value="Reclamation">Réclamation</option>
                        <option value="Question">Question</option>
                        <option value="Demande">Demande</option>
                    </select>
                </div>

                <div v-if="chargement" class="vide">
                    Chargement des messages...
                </div>

                <div v-else-if="idees.length === 0" class="vide">
                    Aucun message dans la boîte à idées pour le moment.
                </div>

                <div v-else-if="ideesFiltrees.length === 0" class="vide">
                    Aucun message ne correspond à votre recherche.
                </div>

                <div v-else class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Apprenant</th>
                                <th>Type</th>
                                <th>Objet</th>
                                <th>Date</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="idee in ideesFiltrees"
                                :key="idee.id"
                                :class="{ 'ligne-non-lue': !idee.is_read }"
                            >
                                <td>
                                    <span v-if="!idee.is_read" class="point-non-lu"></span>
                                    {{ nomApprenant(idee) }}
                                </td>

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
                                    <div class="actions">
                                        <button
                                            type="button"
                                            class="btn-repondre"
                                            @click="ouvrirIdee(idee)"
                                        >
                                            {{ idee.reponse ? "Voir" : "Répondre" }}
                                        </button>

                                        <button
                                            type="button"
                                            class="btn-supprimer"
                                            @click="supprimerIdee(idee)"
                                        >
                                            Supprimer
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

            <!-- MESSAGE + REPONSE -->
            <div
                v-if="ideeSelectionnee"
                class="dip-overlay"
                @click.self="fermerModal"
            >
                <div class="dip-modal">
                    <div class="dip-header">
                        <h2>Message de {{ nomApprenant(ideeSelectionnee) }}</h2>
                        <button type="button" class="btn-fermer" @click="fermerModal">×</button>
                    </div>

                    <div class="infos-message">
                        <p><strong>Type :</strong> {{ libelleType(ideeSelectionnee.type_message) }}</p>
                        <p><strong>Envoyé le :</strong> {{ formaterDate(ideeSelectionnee.created_at) }}</p>
                        <p v-if="ideeSelectionnee.apprenant?.user?.email">
                            <strong>Email :</strong> {{ ideeSelectionnee.apprenant.user.email }}
                        </p>
                        <p v-if="ideeSelectionnee.apprenant?.matricule">
                            <strong>Matricule :</strong> {{ ideeSelectionnee.apprenant.matricule }}
                        </p>
                    </div>

                    <h3 class="objet-message">{{ ideeSelectionnee.objet }}</h3>

                    <div class="texte-message">{{ ideeSelectionnee.message }}</div>

                    <div v-if="ideeSelectionnee.reponse && ideeSelectionnee.date_reponse" class="info-reponse">
                        Dernière réponse envoyée le {{ formaterDate(ideeSelectionnee.date_reponse) }}
                    </div>

                    <div class="formulaire">
                        <label>Statut</label>
                        <select v-model="formReponse.statut">
                            <option value="Nouveau">À traiter</option>
                            <option value="En cours">En cours</option>
                            <option value="Traite">Traité</option>
                        </select>

                        <label>Votre réponse</label>
                        <textarea
                            v-model="formReponse.reponse"
                            rows="5"
                            placeholder="Écrivez votre réponse à l'apprenant..."
                        ></textarea>

                        <small>
                            L'apprenant reçoit une notification et un email quand vous
                            enregistrez une nouvelle réponse ou un nouveau statut.
                        </small>

                        <p v-if="erreurModal" class="alerte erreur">{{ erreurModal }}</p>
                    </div>

                    <div class="dip-footer">
                        <button type="button" class="btn-annuler" @click="fermerModal">
                            Fermer
                        </button>

                        <button
                            type="button"
                            class="btn-enregistrer"
                            @click="enregistrerReponse"
                            :disabled="enregistrement"
                        >
                            {{ enregistrement ? "Enregistrement..." : "Enregistrer" }}
                        </button>
                    </div>
                </div>
            </div>

        </Teleport>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import api from "@/api/api";

const idees = ref([]);
const chargement = ref(false);
const erreur = ref("");
const message = ref("");

// Message ouvert dans la fenêtre
const ideeSelectionnee = ref(null);
const enregistrement = ref(false);
const erreurModal = ref("");

const formReponse = reactive({
    statut: "Nouveau",
    reponse: ""
});

const filtres = reactive({
    recherche: "",
    statut: "",
    type: ""
});

// Récupérer tous les messages
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
            "Impossible de récupérer les messages.";
    } finally {
        chargement.value = false;
    }
};

const compterStatut = (statut) => {
    return idees.value.filter(idee => idee.statut === statut).length;
};

const nonLus = computed(() => {
    return idees.value.filter(idee => !idee.is_read).length;
});

// Messages après application des filtres
const ideesFiltrees = computed(() => {
    const recherche = filtres.recherche.trim().toLowerCase();

    return idees.value.filter((idee) => {
        if (filtres.statut && idee.statut !== filtres.statut) return false;
        if (filtres.type && idee.type_message !== filtres.type) return false;

        if (recherche) {
            const texte = `${nomApprenant(idee)} ${idee.objet} ${idee.message}`
                .toLowerCase();

            if (!texte.includes(recherche)) return false;
        }

        return true;
    });
});

// Nom de l'apprenant qui a écrit
const nomApprenant = (idee) => {
    const utilisateur = idee?.apprenant?.user;

    if (utilisateur) {
        return `${utilisateur.prenom || ""} ${utilisateur.nom || ""}`.trim();
    }

    return idee?.apprenant?.matricule || "Apprenant";
};

const libelleType = (type) => {
    return type === "Reclamation" ? "Réclamation" : type;
};

const libelleStatut = (statut) => {
    const statuts = {
        "Nouveau": "À traiter",
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

// Ouvrir un message (il passe en "lu")
const ouvrirIdee = async (idee) => {
    ideeSelectionnee.value = idee;
    formReponse.statut = idee.statut;
    formReponse.reponse = idee.reponse || "";
    erreurModal.value = "";

    if (!idee.is_read) {
        try {
            await api.get(`/auth/boite-idees/${idee.id}`);
            idee.is_read = true;
        } catch (error) {
            console.error("Erreur marquage comme lu :", error);
        }
    }
};

// Enregistrer le statut et la réponse
const enregistrerReponse = async () => {
    erreurModal.value = "";
    enregistrement.value = true;

    try {
        await api.put(`/auth/boite-idees/${ideeSelectionnee.value.id}`, {
            statut: formReponse.statut,
            reponse: formReponse.reponse
        });

        message.value = "Le message a été mis à jour avec succès.";

        fermerModal();
        await chargerIdees();

    } catch (error) {
        console.error("Erreur enregistrement :", error);

        const erreursValidation = error.response?.data?.errors;

        if (erreursValidation) {
            erreurModal.value = Object.values(erreursValidation)
                .flat()
                .join(" ");
        } else {
            erreurModal.value =
                error.response?.data?.message ||
                "Impossible d'enregistrer la réponse.";
        }
    } finally {
        enregistrement.value = false;
    }
};

// Supprimer un message
const supprimerIdee = async (idee) => {
    const confirmation = window.confirm(
        "Voulez-vous vraiment supprimer ce message ? Cette action est définitive."
    );

    if (!confirmation) return;

    erreur.value = "";

    try {
        await api.delete(`/auth/boite-idees/${idee.id}`);

        message.value = "Le message a été supprimé.";
        await chargerIdees();

    } catch (error) {
        console.error("Erreur suppression :", error);

        erreur.value =
            error.response?.data?.message ||
            "Impossible de supprimer le message.";
    }
};

const fermerModal = () => {
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
    margin-bottom: 8px;
}

.page-header p {
    color: #777;
}

.pastille-non-lus {
    display: inline-block;
    margin-top: 10px;
    background: #fff3cd;
    color: #856404;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
}

button {
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-actualiser {
    background: #3B5998;
    color: white;
    padding: 11px 18px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-bottom: 25px;
}

.stat-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 8px #0000000d;
    border-left: 4px solid #3B5998;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.stat-card span {
    color: #777;
    font-size: 14px;
}

.stat-card strong {
    font-size: 26px;
    color: #3B5998;
}

.stat-card.nouveau { border-color: #e69b19; }
.stat-card.nouveau strong { color: #e69b19; }
.stat-card.en-cours { border-color: #1e88e5; }
.stat-card.en-cours strong { color: #1e88e5; }
.stat-card.traite { border-color: #2E7D32; }
.stat-card.traite strong { color: #2E7D32; }

.alerte {
    padding: 12px 14px;
    border-radius: 8px;
    margin-bottom: 16px;
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
    padding: 22px;
    border-radius: 10px;
    box-shadow: 0 2px 8px #0000000d;
}

.filtres {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.filtres input,
.filtres select {
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    font-family: inherit;
}

.filtres input {
    flex: 1;
    min-width: 220px;
}

.vide {
    text-align: center;
    padding: 35px 10px;
    color: #777;
}

.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    min-width: 850px;
}

th, td {
    padding: 13px;
    text-align: left;
    border-bottom: 1px solid #eee;
    font-size: 14px;
}

th {
    background: #f5f7fb;
    color: #3B5998;
}

td {
    color: #555;
}

.colonne-objet {
    max-width: 260px;
    overflow-wrap: anywhere;
}

.ligne-non-lue td {
    background: #fffaf0;
    font-weight: 600;
}

.point-non-lu {
    display: inline-block;
    width: 9px;
    height: 9px;
    margin-right: 6px;
    background: #e69b19;
    border-radius: 50%;
}

.badge-type {
    background: #eef2f8;
    color: #3B5998;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
}

.badge-statut {
    padding: 6px 10px;
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
    background: #d4edda;
    color: #155724;
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

.btn-repondre {
    background: #e8eef8;
    color: #3B5998;
}

.btn-supprimer {
    background: #fdecea;
    color: #c62828;
}

/* FENETRE (préfixe dip- pour éviter les conflits CSS) */
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
    max-width: 680px;
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
    gap: 10px;
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
    grid-template-columns: repeat(2, 1fr);
    gap: 8px 16px;
    margin-bottom: 14px;
}

.infos-message p {
    color: #555;
    font-size: 14px;
    overflow-wrap: anywhere;
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
    margin-bottom: 14px;
}

.info-reponse {
    color: #2E7D32;
    font-size: 13px;
    margin-bottom: 14px;
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

.btn-enregistrer {
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
}
</style>
