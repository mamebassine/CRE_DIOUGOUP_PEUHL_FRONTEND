
<template>
    <div class="notifications-page">
        <!-- EN-TÊTE -->
        <div class="page-header">
            <div>
                <h1>
                    <i class="fas fa-bell"></i>
                    Mes notifications
                </h1>
                <p>Consultez et gérez vos notifications du CRE.</p>
            </div>

            <button
                type="button"
                class="refresh-button"
                :disabled="chargement"
                @click="chargerNotifications"
            >
                <i class="fas fa-sync-alt"></i>
                Actualiser
            </button>
        </div>

        <!-- STATISTIQUES -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon total-icon">
                    <i class="fas fa-bell"></i>
                </div>
                <div>
                    <p>Total</p>
                    <h2>{{ notifications.length }}</h2>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon unread-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <div>
                    <p>Non lues</p>
                    <h2>{{ notificationsNonLues }}</h2>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon read-icon">
                    <i class="fas fa-envelope-open"></i>
                </div>
                <div>
                    <p>Lues</p>
                    <h2>{{ nombreLues }}</h2>
                </div>
            </div>
        </div>

        <!-- FILTRES -->
        <div class="toolbar">
            <div class="filters">
                <button
                    v-for="filtre in filtres"
                    :key="filtre.value"
                    type="button"
                    class="filter-button"
                    :class="{ 'filter-active': filtreActif === filtre.value }"
                    @click="filtreActif = filtre.value"
                >
                    {{ filtre.label }}
                </button>
            </div>

            <button
                v-if="notificationsNonLues > 0"
                type="button"
                class="mark-all-button"
                :disabled="traitementGlobal"
                @click="toutMarquerCommeLu"
            >
                <i class="fas fa-check-double"></i>
                {{
                    traitementGlobal
                        ? "Traitement..."
                        : "Tout marquer comme lu"
                }}
            </button>
        </div>

        <!-- CHARGEMENT -->
        <div v-if="chargement" class="state-card">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Chargement des notifications...</p>
        </div>

        <!-- ERREUR -->
        <div v-else-if="erreur" class="state-card error-state">
            <i class="fas fa-exclamation-circle"></i>
            <p>{{ erreur }}</p>
            <button type="button" @click="chargerNotifications">
                Réessayer
            </button>
        </div>

        <!-- LISTE VIDE -->
        <div v-else-if="notificationsFiltrees.length === 0" class="state-card">
            <i class="far fa-bell empty-icon"></i>
            <h3>Aucune notification</h3>
            <p>
                {{
                    filtreActif === "unread"
                        ? "Vous n'avez aucune notification non lue."
                        : filtreActif === "read"
                            ? "Vous n'avez aucune notification lue."
                            : "Vous n'avez aucune notification pour le moment."
                }}
            </p>
        </div>

        <!-- LISTE DES NOTIFICATIONS -->
        <div v-else class="notification-list">
            <article
                v-for="notification in notificationsFiltrees"
                :key="notification.id"
                class="notification-card"
                :class="{ 'is-unread': !notification.read_at }"
            >
                <div
                    class="notification-icon"
                    :class="classeIcone(notification.data?.type)"
                >
                    <i :class="iconeNotification(notification.data?.type)"></i>
                </div>

                <div class="notification-content">
                    <div class="notification-title-row">
                        <h3>
                            {{
                                notification.data?.titre ||
                                "Notification"
                            }}
                        </h3>

                        <span
                            class="status"
                            :class="notification.read_at ? 'status-read' : 'status-unread'"
                        >
                            {{
                                notification.read_at
                                    ? "Lue"
                                    : "Non lue"
                            }}
                        </span>
                    </div>

                    <p class="notification-message">
                        {{
                            notification.data?.message ||
                            "Vous avez une nouvelle notification."
                        }}
                    </p>

                    <small class="notification-date">
                        <i class="far fa-clock"></i>
                        {{ formaterDate(notification.created_at) }}
                    </small>

                    <div class="notification-actions">
                        <button
                            v-if="!notification.read_at"
                            type="button"
                            class="action-button mark-read"
                            :disabled="notificationEnCours !== null"
                            @click="marquerCommeLue(notification)"
                        >
                            <i class="fas fa-check"></i>
                            {{
                                notificationEnCours === notification.id
                                    ? "Traitement..."
                                    : "Marquer comme lue"
                            }}
                        </button>

                        <button
                            type="button"
                            class="action-button delete-button"
                            :disabled="notificationEnCours !== null"
                            @click="supprimerNotification(notification)"
                        >
                            <i class="fas fa-trash-alt"></i>
                            Supprimer
                        </button>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "../../stores/auth";

const auth = useAuthStore();

const API_URL = "http://127.0.0.1:8000/api/auth";

const notifications = ref([]);
const notificationsNonLues = ref(0);
const chargement = ref(false);
const erreur = ref("");
const notificationEnCours = ref(null);
const traitementGlobal = ref(false);
const filtreActif = ref("all");

const filtres = [
    { label: "Toutes", value: "all" },
    { label: "Non lues", value: "unread" },
    { label: "Lues", value: "read" }
];

let intervalleNotifications = null;

const nombreLues = computed(() =>
    notifications.value.filter(notification => notification.read_at).length
);

const notificationsFiltrees = computed(() => {
    if (filtreActif.value === "unread") {
        return notifications.value.filter(
            notification => !notification.read_at
        );
    }

    if (filtreActif.value === "read") {
        return notifications.value.filter(
            notification => Boolean(notification.read_at)
        );
    }

    return notifications.value;
});

function obtenirToken() {
    return (
        auth.token ||
        auth.accessToken ||
        localStorage.getItem("token") ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("jwt")
    );
}

function obtenirHeaders() {
    const token = obtenirToken();

    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
}

function extraireListe(reponse) {
    if (Array.isArray(reponse)) return reponse;
    if (Array.isArray(reponse.data)) return reponse.data;
    if (Array.isArray(reponse.notifications)) {
        return reponse.notifications;
    }

    return [];
}

async function chargerNotifications() {
    if (chargement.value) return;

    chargement.value = true;
    erreur.value = "";

    try {
        if (!obtenirToken()) {
            throw new Error("Votre session a expiré. Veuillez vous reconnecter.");
        }

        const [reponseListe, reponseNonLues] = await Promise.all([
            fetch(`${API_URL}/notifications`, {
                headers: obtenirHeaders()
            }),
            fetch(`${API_URL}/notifications/unread`, {
                headers: obtenirHeaders()
            })
        ]);

        if (!reponseListe.ok || !reponseNonLues.ok) {
            if (reponseListe.status === 401 || reponseNonLues.status === 401) {
                throw new Error("Session expirée. Veuillez vous reconnecter.");
            }

            throw new Error("Impossible de récupérer les notifications.");
        }

        const donneesListe = await reponseListe.json();
        const donneesNonLues = await reponseNonLues.json();

        notifications.value = extraireListe(donneesListe);

        if (typeof donneesNonLues.count === "number") {
            notificationsNonLues.value = donneesNonLues.count;
        } else if (typeof donneesNonLues.unread_count === "number") {
            notificationsNonLues.value = donneesNonLues.unread_count;
        } else {
            notificationsNonLues.value = extraireListe(donneesNonLues)
                .filter(notification => !notification.read_at).length;
        }
    } catch (e) {
        console.error("Erreur de chargement des notifications :", e);
        erreur.value = e.message || "Une erreur est survenue.";
    } finally {
        chargement.value = false;
    }
}

async function marquerCommeLue(notification) {
    if (notification.read_at || notificationEnCours.value !== null) return;

    notificationEnCours.value = notification.id;
    erreur.value = "";

    try {
        const reponse = await fetch(
            `${API_URL}/notifications/${notification.id}/read`,
            {
                method: "PUT",
                headers: obtenirHeaders()
            }
        );

        const resultat = await reponse.json();

        if (!reponse.ok || !resultat.success) {
            throw new Error(
                resultat.message || "Impossible de marquer la notification comme lue."
            );
        }

        notification.read_at = new Date().toISOString();
        notificationsNonLues.value = Math.max(
            0,
            notificationsNonLues.value - 1
        );
    } catch (e) {
        console.error(e);
        erreur.value = e.message || "Une erreur est survenue.";
    } finally {
        notificationEnCours.value = null;
    }
}

async function toutMarquerCommeLu() {
    if (traitementGlobal.value) return;

    traitementGlobal.value = true;
    erreur.value = "";

    try {
        const reponse = await fetch(`${API_URL}/notifications/read-all`, {
            method: "PUT",
            headers: obtenirHeaders()
        });

        const resultat = await reponse.json();

        if (!reponse.ok || !resultat.success) {
            throw new Error(
                resultat.message || "Impossible de mettre à jour les notifications."
            );
        }

        const maintenant = new Date().toISOString();

        notifications.value.forEach(notification => {
            if (!notification.read_at) {
                notification.read_at = maintenant;
            }
        });

        notificationsNonLues.value = 0;
    } catch (e) {
        console.error(e);
        erreur.value = e.message || "Une erreur est survenue.";
    } finally {
        traitementGlobal.value = false;
    }
}

async function supprimerNotification(notification) {
    if (notificationEnCours.value !== null) return;

    const confirmation = window.confirm(
        "Voulez-vous vraiment supprimer cette notification ?"
    );

    if (!confirmation) return;

    notificationEnCours.value = notification.id;
    erreur.value = "";

    try {
        const reponse = await fetch(
            `${API_URL}/notifications/${notification.id}`,
            {
                method: "DELETE",
                headers: obtenirHeaders()
            }
        );

        const resultat = await reponse.json();

        if (!reponse.ok || !resultat.success) {
            throw new Error(resultat.message || "Impossible de supprimer la notification.");
        }

        notifications.value = notifications.value.filter(
            element => element.id !== notification.id
        );

        if (!notification.read_at) {
            notificationsNonLues.value = Math.max(
                0,
                notificationsNonLues.value - 1
            );
        }
    } catch (e) {
        console.error(e);
        erreur.value = e.message || "Une erreur est survenue.";
    } finally {
        notificationEnCours.value = null;
    }
}

function iconeNotification(type) {
    switch (type) {
        case "success":
            return "fas fa-check-circle";
        case "warning":
            return "fas fa-exclamation-triangle";
        case "error":
            return "fas fa-times-circle";
        default:
            return "fas fa-info-circle";
    }
}

function classeIcone(type) {
    switch (type) {
        case "success":
            return "icon-success";
        case "warning":
            return "icon-warning";
        case "error":
            return "icon-error";
        default:
            return "icon-info";
    }
}

function formaterDate(date) {
    if (!date) return "";

    const valeur = new Date(date);

    if (Number.isNaN(valeur.getTime())) return "";

    return valeur.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

onMounted(() => {
    chargerNotifications();

    intervalleNotifications = setInterval(() => {
        chargerNotifications();
    }, 60000);
});

onBeforeUnmount(() => {
    if (intervalleNotifications) {
        clearInterval(intervalleNotifications);
    }
});
</script>

<style scoped>
.notifications-page {
    padding: 25px;
    color: #1F2937;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
    flex-wrap: wrap;
}

.page-header h1 {
    color: #3B5998;
    font-size: 26px;
    margin: 0 0 8px;
}

.page-header h1 i {
    margin-right: 10px;
}

.page-header p {
    color: #6B7280;
    margin: 0;
}

.refresh-button,
.mark-all-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 15px;
    border: none;
    border-radius: 8px;
    background: #3B5998;
    color: white;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s;
}

.refresh-button:hover,
.mark-all-button:hover {
    background: #2E7D32;
}

.refresh-button:disabled,
.mark-all-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
    margin-bottom: 25px;
}

.stat-card {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.stat-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    font-size: 20px;
}

.total-icon {
    color: #3B5998;
    background: #E8EEF9;
}

.unread-icon {
    color: #B45309;
    background: #FEF3C7;
}

.read-icon {
    color: #2E7D32;
    background: #DCFCE7;
}

.stat-card p {
    margin: 0 0 5px;
    color: #6B7280;
    font-size: 13px;
}

.stat-card h2 {
    margin: 0;
    font-size: 24px;
}

.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.filter-button {
    padding: 9px 15px;
    border: 1px solid #D1D5DB;
    border-radius: 8px;
    background: white;
    color: #4B5563;
    cursor: pointer;
}

.filter-active {
    background: #3B5998;
    border-color: #3B5998;
    color: white;
}

.notification-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.notification-card {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.04);
}

.notification-card.is-unread {
    border-left: 4px solid #3B5998;
    background: #F8FAFF;
}

.notification-icon {
    flex-shrink: 0;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 19px;
}

.icon-info {
    color: #3B5998;
    background: #E8EEF9;
}

.icon-success {
    color: #2E7D32;
    background: #DCFCE7;
}

.icon-warning {
    color: #B45309;
    background: #FEF3C7;
}

.icon-error {
    color: #B91C1C;
    background: #FEE2E2;
}

.notification-content {
    flex: 1;
    min-width: 0;
}

.notification-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
}

.notification-title-row h3 {
    margin: 0;
    font-size: 16px;
    color: #1F2937;
}

.status {
    padding: 4px 9px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
}

.status-read {
    background: #DCFCE7;
    color: #166534;
}

.status-unread {
    background: #DBEAFE;
    color: #1D4ED8;
}

.notification-message {
    margin: 10px 0;
    color: #4B5563;
    line-height: 1.6;
    overflow-wrap: anywhere;
}

.notification-date {
    color: #6B7280;
    font-size: 12px;
}

.notification-date i {
    margin-right: 5px;
}

.notification-actions {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin-top: 15px;
}

.action-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 0;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
}

.mark-read {
    color: #2E7D32;
}

.delete-button {
    color: #DC2626;
}

.action-button:hover {
    text-decoration: underline;
}

.action-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.state-card {
    padding: 45px 20px;
    text-align: center;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.state-card > i {
    font-size: 30px;
    color: #3B5998;
}

.state-card p {
    color: #6B7280;
    margin: 15px 0 0;
}

.state-card h3 {
    color: #3B5998;
    margin: 15px 0 0;
}

.state-card .empty-icon {
    color: #9CA3AF;
}

.error-state > i {
    color: #B91C1C;
}

.error-state button {
    margin-top: 15px;
    padding: 9px 15px;
    border: none;
    border-radius: 8px;
    background: #3B5998;
    color: white;
    cursor: pointer;
}

@media (max-width: 900px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 600px) {
    .notifications-page {
        padding: 15px;
    }

    .page-header h1 {
        font-size: 22px;
    }

    .notification-card {
        padding: 15px;
        gap: 10px;
    }

    .notification-icon {
        width: 38px;
        height: 38px;
        font-size: 16px;
    }

    .notification-title-row h3 {
        font-size: 14px;
    }
}
</style>
