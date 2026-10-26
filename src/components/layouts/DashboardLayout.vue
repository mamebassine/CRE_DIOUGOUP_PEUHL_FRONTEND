<template>
    <div class="dashboard-layout">

        <!-- SIDEBAR -->
        <SidebarAdmin v-if="auth.user?.role !== 'apprenant'" />
        <SidebarApprenant v-else />

        <!-- CONTENU -->
        <div class="dashboard-content">

            <!-- HEADER -->
            <header class="topbar">
                <div class="page-title">
                    <h5>Tableau de bord</h5>
                    <small>CRE de Diougoup Peuhl</small>
                </div>

                <!-- PROFIL UTILISATEUR -->
                <div class="profile">

                    <!-- NOTIFICATIONS -->
                    <div class="notification-wrapper">

                        <button
                            type="button"
                            class="notification"
                            @click="ouvrirNotifications"
                            aria-label="Afficher les notifications"
                        >
                            <i class="fas fa-bell"></i>

                            <span
                                v-if="notificationsNonLues > 0"
                                class="badge"
                            >
                                {{
                                    notificationsNonLues > 99
                                        ? '99+'
                                        : notificationsNonLues
                                }}
                            </span>
                        </button>

                        <!-- LISTE DES NOTIFICATIONS -->
                        <div
                            v-if="notificationOpen"
                            class="notification-dropdown"
                        >
                            <div class="notification-header">
                                <strong>Notifications</strong>

                                <button
                                    type="button"
                                    class="refresh-button"
                                    @click="chargerNotifications"
                                    title="Actualiser"
                                >
                                    <i class="fas fa-sync-alt"></i>
                                </button>
                            </div>

                            <div
                                v-if="chargementNotifications"
                                class="notification-message"
                            >
                                Chargement des notifications...
                            </div>

                            <div
                                v-else-if="erreurNotifications"
                                class="notification-message error-message"
                            >
                                {{ erreurNotifications }}
                            </div>

                            <div
                                v-else-if="notifications.length === 0"
                                class="notification-message"
                            >
                                <i class="far fa-bell"></i>
                                <p>Aucune notification pour le moment.</p>
                            </div>

                            <div v-else class="notification-list">
                                <div
                                    v-for="notification in notifications"
                                    :key="notification.id"
                                    class="notification-item"
                                    :class="{
                                        'notification-unread':
                                            !notification.read_at
                                    }"
                                >
                                    <div class="notification-icon">
                                        <i
                                            :class="
                                                iconeNotification(
                                                    notification.data?.type
                                                )
                                            "
                                        ></i>
                                    </div>

                                    <div class="notification-text">
                                        <strong>
                                            {{
                                                notification.data?.titre
                                                || 'Notification'
                                            }}
                                        </strong>

                                        <p>
                                            {{
                                                notification.data?.message
                                                || 'Vous avez une nouvelle notification.'
                                            }}
                                        </p>

                                        <small>
                                            {{
                                                formaterDate(
                                                    notification.created_at
                                                )
                                            }}
                                        </small>

                                        <!-- ACTIONS -->
                                        <div class="notification-actions">

                                            <button
                                                v-if="!notification.read_at"
                                                type="button"
                                                class="mark-read-button"
                                                :disabled="
                                                    notificationEnCours ===
                                                    notification.id
                                                "
                                                @click="
                                                    marquerCommeLue(
                                                        notification
                                                    )
                                                "
                                            >
                                                {{
                                                    notificationEnCours ===
                                                    notification.id
                                                        ? 'Traitement...'
                                                        : 'Marquer comme lue'
                                                }}
                                            </button>

                                            <button
                                                type="button"
                                                class="delete-notification-button"
                                                :disabled="
                                                    notificationEnCours ===
                                                    notification.id
                                                "
                                                @click="
                                                    supprimerNotification(
                                                        notification
                                                    )
                                                "
                                            >
                                                Supprimer
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- FOOTER -->
                            <div
                                v-if="
                                    notifications.length > 0 &&
                                    notificationsNonLues > 0
                                "
                                class="notification-footer"
                            >
                                <button
                                    type="button"
                                    :disabled="traitementGlobal"
                                    @click="toutMarquerCommeLu"
                                >
                                    {{
                                        traitementGlobal
                                            ? 'Traitement...'
                                            : 'Tout marquer comme lu'
                                    }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- PHOTO UTILISATEUR -->
                    <img
                        v-if="auth.user?.photo"
                        :src="
                            `http://127.0.0.1:8000/storage/${auth.user.photo}`
                        "
                        alt="Utilisateur"
                        class="user-image"
                    >

                    <img
                        v-else
                        src="http://127.0.0.1:8000/storage/users/default.png"
                        alt="Utilisateur"
                        class="user-image"
                    >

                    <!-- NOM ET RÔLE -->
                    <div class="user-info">
                        <strong>{{ auth.user?.nom }}</strong>
                        <small>{{ auth.user?.role }}</small>
                    </div>
                </div>
            </header>

            <!-- CONTENU DE LA PAGE -->
            <main class="page-content">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterView } from "vue-router";

import SidebarAdmin from "../SidebarAdmin.vue";
import SidebarApprenant from "../SidebarApprenant.vue";
import { useAuthStore } from "../../stores/auth";

const auth = useAuthStore();

const API_URL = "http://127.0.0.1:8000/api/auth";

// État des notifications
const notifications = ref([]);
const notificationsNonLues = ref(0);
const notificationOpen = ref(false);
const chargementNotifications = ref(false);
const erreurNotifications = ref("");
const notificationEnCours = ref(null);
const traitementGlobal = ref(false);

let intervalleNotifications = null;

// Récupérer le jeton d'authentification
function obtenirToken() {
    return (
        auth.token ||
        auth.accessToken ||
        localStorage.getItem("token") ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("jwt")
    );
}

// En-têtes de requête
function obtenirHeaders() {
    const token = obtenirToken();

    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token
            ? { Authorization: `Bearer ${token}` }
            : {})
    };
}

// Extraire la liste depuis différentes structures de réponse Laravel
function extraireListe(reponse) {
    if (Array.isArray(reponse)) return reponse;
    if (Array.isArray(reponse.data)) return reponse.data;
    if (Array.isArray(reponse.notifications)) {
        return reponse.notifications;
    }

    return [];
}

// Charger les notifications et le compteur
async function chargerNotifications() {
    if (chargementNotifications.value) return;

    chargementNotifications.value = true;
    erreurNotifications.value = "";

    try {
        const token = obtenirToken();

        if (!token) {
            throw new Error(
                "Jeton absent. Veuillez vous reconnecter."
            );
        }

        const [reponseNotifications, reponseNonLues] =
            await Promise.all([
                fetch(`${API_URL}/notifications`, {
                    method: "GET",
                    headers: obtenirHeaders()
                }),

                fetch(`${API_URL}/notifications/unread`, {
                    method: "GET",
                    headers: obtenirHeaders()
                })
            ]);

        if (
            !reponseNotifications.ok ||
            !reponseNonLues.ok
        ) {
            throw new Error(
                "Impossible de charger les notifications. Vérifiez l'API Laravel."
            );
        }

        const donneesNotifications =
            await reponseNotifications.json();

        const donneesNonLues =
            await reponseNonLues.json();

        notifications.value =
            extraireListe(donneesNotifications);

        // Utiliser le compteur du backend s'il est fourni.
        if (typeof donneesNonLues.count === "number") {
            notificationsNonLues.value =
                donneesNonLues.count;
        } else if (
            typeof donneesNonLues.unread_count === "number"
        ) {
            notificationsNonLues.value =
                donneesNonLues.unread_count;
        } else {
            notificationsNonLues.value =
                extraireListe(donneesNonLues)
                    .filter(notification => !notification.read_at)
                    .length;
        }
    } catch (erreur) {
        console.error(
            "Erreur notifications :",
            erreur
        );

        erreurNotifications.value =
            erreur.message ||
            "Une erreur est survenue lors du chargement.";
    } finally {
        chargementNotifications.value = false;
    }
}

// Ouvrir ou fermer la liste
async function ouvrirNotifications() {
    notificationOpen.value = !notificationOpen.value;

    if (notificationOpen.value) {
        await chargerNotifications();
    }
}

// Marquer une notification comme lue
async function marquerCommeLue(notification) {
    if (
        notification.read_at ||
        notificationEnCours.value !== null
    ) {
        return;
    }

    notificationEnCours.value = notification.id;
    erreurNotifications.value = "";

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
                resultat.message ||
                "Impossible de marquer cette notification comme lue."
            );
        }

        notification.read_at = new Date().toISOString();

        notificationsNonLues.value = Math.max(
            0,
            notificationsNonLues.value - 1
        );
    } catch (erreur) {
        console.error(erreur);

        erreurNotifications.value =
            erreur.message ||
            "Une erreur est survenue.";
    } finally {
        notificationEnCours.value = null;
    }
}

// Marquer toutes les notifications comme lues
async function toutMarquerCommeLu() {
    if (traitementGlobal.value) return;

    traitementGlobal.value = true;
    erreurNotifications.value = "";

    try {
        const reponse = await fetch(
            `${API_URL}/notifications/read-all`,
            {
                method: "PUT",
                headers: obtenirHeaders()
            }
        );

        const resultat = await reponse.json();

        if (!reponse.ok || !resultat.success) {
            throw new Error(
                resultat.message ||
                "Impossible de mettre à jour les notifications."
            );
        }

        const maintenant = new Date().toISOString();

        notifications.value.forEach(notification => {
            if (!notification.read_at) {
                notification.read_at = maintenant;
            }
        });

        notificationsNonLues.value = 0;
    } catch (erreur) {
        console.error(erreur);

        erreurNotifications.value =
            erreur.message ||
            "Une erreur est survenue.";
    } finally {
        traitementGlobal.value = false;
    }
}

// Supprimer une notification
async function supprimerNotification(notification) {
    if (notificationEnCours.value !== null) return;

    const confirmation = window.confirm(
        "Voulez-vous vraiment supprimer cette notification ? Cette action est irréversible."
    );

    if (!confirmation) return;

    notificationEnCours.value = notification.id;
    erreurNotifications.value = "";

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
            throw new Error(
                resultat.message ||
                "Impossible de supprimer cette notification."
            );
        }

        // Retirer la notification de la liste affichée.
        notifications.value = notifications.value.filter(
            element => element.id !== notification.id
        );

        // Actualiser le compteur si la notification était non lue.
        if (!notification.read_at) {
            notificationsNonLues.value = Math.max(
                0,
                notificationsNonLues.value - 1
            );
        }
    } catch (erreur) {
        console.error(
            "Erreur de suppression :",
            erreur
        );

        erreurNotifications.value =
            erreur.message ||
            "Une erreur est survenue lors de la suppression.";
    } finally {
        notificationEnCours.value = null;
    }
}

// Icône selon le type de notification
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

// Formater la date
function formaterDate(date) {
    if (!date) return "";

    const valeur = new Date(date);

    if (Number.isNaN(valeur.getTime())) return "";

    return valeur.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

// Actualiser les notifications périodiquement
onMounted(() => {
    chargerNotifications();

    intervalleNotifications = setInterval(() => {
        if (!notificationOpen.value) {
            chargerNotifications();
        }
    }, 60000);
});

onBeforeUnmount(() => {
    if (intervalleNotifications) {
        clearInterval(intervalleNotifications);
    }
});
</script>

<style scoped>
/* LAYOUT */
.dashboard-layout {
    display: flex;
    min-height: 100vh;
    background: #F8FAFC;
}

.dashboard-content {
    flex: 1;
    margin-left: 260px;
    width: calc(100% - 260px);
    min-height: 100vh;
    background: #F8FAFC;
}

.page-content {
    padding: 65px;
}

/* TOPBAR */
.topbar {
    min-height: 75px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.08);
    gap: 20px;
}

.page-title h5 {
    color: #3B5998;
    font-weight: 800;
    margin: 0;
}

.page-title small {
    color: #1F2937;
}

/* PROFIL */
.profile {
    display: flex;
    align-items: center;
    gap: 15px;
}

.user-image {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #2E7D32;
}

.user-info {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
}

.user-info strong {
    color: #1F2937;
    font-size: 15px;
}

.user-info small {
    color: #2E7D32;
    font-weight: 600;
}

/* NOTIFICATIONS */
.notification-wrapper {
    position: relative;
}

.notification {
    position: relative;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F8FAFC;
    color: #3B5998;
    cursor: pointer;
    transition: 0.3s;
}

.notification:hover {
    background: #3B5998;
    color: white;
}

.notification i {
    font-size: 18px;
}

.badge {
    position: absolute;
    top: -3px;
    right: -3px;
    background: #2E7D32;
    color: white;
    font-size: 11px;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* MENU DÉROULANT */
.notification-dropdown {
    position: absolute;
    top: 50px;
    right: -20px;
    width: 360px;
    max-width: calc(100vw - 30px);
    max-height: 450px;
    overflow-y: auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    color: #1F2937;
}

.notification-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #E5E7EB;
    color: #3B5998;
}

.refresh-button {
    border: none;
    background: transparent;
    color: #3B5998;
    cursor: pointer;
    padding: 5px;
}

.notification-message {
    padding: 25px 15px;
    text-align: center;
    color: #6B7280;
    font-size: 13px;
}

.notification-message p {
    margin: 10px 0 0;
}

.error-message {
    color: #B91C1C;
}

.notification-list {
    display: flex;
    flex-direction: column;
}

.notification-item {
    display: flex;
    gap: 12px;
    padding: 14px;
    border-bottom: 1px solid #F1F5F9;
}

.notification-unread {
    background: #F0F7FF;
}

.notification-icon {
    color: #3B5998;
    font-size: 18px;
    padding-top: 3px;
}

.notification-text {
    flex: 1;
    min-width: 0;
}

.notification-text strong {
    display: block;
    font-size: 13px;
    margin-bottom: 5px;
}

.notification-text p {
    margin: 0 0 6px;
    font-size: 12px;
    line-height: 1.5;
    overflow-wrap: anywhere;
}

.notification-text small {
    color: #6B7280;
    font-size: 11px;
}

/* ACTIONS DES NOTIFICATIONS */
.notification-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
}

.mark-read-button,
.delete-notification-button {
    margin-top: 0;
    padding: 4px 0;
    border: none;
    background: transparent;
    font-size: 12px;
    cursor: pointer;
    font-weight: 600;
}

.mark-read-button {
    color: #2E7D32;
}

.delete-notification-button {
    color: #DC2626;
}

.mark-read-button:hover,
.delete-notification-button:hover {
    text-decoration: underline;
}

.mark-read-button:disabled,
.delete-notification-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.notification-footer {
    padding: 12px 15px;
    border-top: 1px solid #E5E7EB;
}

.notification-footer button {
    display: block;
    margin: 0 auto;
    padding: 0;
    border: none;
    background: transparent;
    color: #2E7D32;
    font-size: 12px;
    cursor: pointer;
    font-weight: 600;
}

.notification-footer button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* RESPONSIVE */
@media (max-width: 850px) {
    .dashboard-content {
        margin-left: 230px;
        width: calc(100% - 230px);
    }

    .page-content {
        padding: 25px;
    }

    .topbar {
        padding: 0 15px;
    }

    .notification-dropdown {
        right: -100px;
    }
}

@media (max-width: 550px) {
    .topbar {
        gap: 10px;
    }

    .page-title small {
        font-size: 11px;
    }

    .profile {
        gap: 8px;
    }

    .user-info {
        display: none;
    }

    .notification-dropdown {
        right: -55px;
        width: 320px;
    }
}
</style>

