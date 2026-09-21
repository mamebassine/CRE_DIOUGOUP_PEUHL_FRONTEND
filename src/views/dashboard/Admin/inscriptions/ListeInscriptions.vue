<script setup>

import {

    onMounted,

    computed,

    ref

} from "vue";


import { useRouter }

    from "vue-router";


import { useInscriptionStore }

    from "../../../../stores/inscription";


import RechercheInscription

    from "../../../../components/inscriptions/RechercheInscription.vue";


import TableInscription

    from "../../../../components/inscriptions/TableInscription.vue";



/* =========================================================
   ROUTER
========================================================= */

const router = useRouter();



/* =========================================================
   STORE
========================================================= */

const store =

    useInscriptionStore();



/* =========================================================
   RECHERCHE
========================================================= */

const recherche =

    ref("");



/* =========================================================
   CHARGER LES INSCRIPTIONS
========================================================= */

onMounted(() => {

    store.fetchInscriptions();

});



/* =========================================================
   FILTRER LES INSCRIPTIONS
========================================================= */

const inscriptionsFiltrees =

    computed(() => {


        /* Aucune recherche */

        if (!recherche.value.trim()) {

            return store.inscriptions;

        }



        /* Texte recherché */

        const rechercheTexte =

            recherche.value

                .toLowerCase()

                .trim();



        return store.inscriptions.filter(

            inscription => {


                /* =============================
                   APPRENANT
                ============================= */

                const apprenant =

                    `${

                        inscription.apprenant?.user?.prenom

                        || ""

                    }

                    ${

                        inscription.apprenant?.user?.nom

                        || ""

                    }`;



                /* =============================
                   FORMATION
                ============================= */

                const formation =

                    inscription.formation?.nom

                    || "";



                /* =============================
                   HORAIRE
                ============================= */

                const horaire =

                    inscription.horaire

                    || "";



                /* =============================
                   STATUT
                ============================= */

                const statut =

                    inscription.statut

                    || "";



                /* =============================
                   ETAT
                ============================= */

                const etat =

                    inscription.etat_formation

                    || "";



                /* =============================
                   RECHERCHE
                ============================= */

                return (

                    apprenant

                        .toLowerCase()

                        .includes(rechercheTexte)


                    ||

                    formation

                        .toLowerCase()

                        .includes(rechercheTexte)


                    ||

                    horaire

                        .toLowerCase()

                        .includes(rechercheTexte)


                    ||

                    statut

                        .toLowerCase()

                        .includes(rechercheTexte)


                    ||

                    etat

                        .toLowerCase()

                        .includes(rechercheTexte)

                );

            }

        );

    });



/* =========================================================
   SUPPRIMER
========================================================= */

function supprimer(id) {


    if (

        confirm(

            "Supprimer cette inscription ?"

        )

    ) {


        store.supprimerInscription(id);


    }

}

</script>



<template>

<div class="page-inscriptions">


    <!-- =====================================================
         TITRE DE PAGE
    ====================================================== -->

    <div class="page-header">


        <div>

            <h1>

                Inscriptions

            </h1>


            <p>

                Gestion des inscriptions aux formations

            </p>

        </div>


    </div>



    <!-- =====================================================
         RECHERCHE
    ====================================================== -->

    <RechercheInscription

        @recherche="

            recherche = $event

        "

    />



    <!-- ESPACE -->

    <div class="spacing"></div>



    <!-- =====================================================
         TABLEAU
    ====================================================== -->

    <TableInscription

        :inscriptions="

            inscriptionsFiltrees

        "


        @voir="

            router.push(

                `/dashboard/inscriptions/${$event}`

            )

        "


        @modifier="

            router.push(

                `/dashboard/inscriptions/${$event}/modifier`

            )

        "


        @supprimer="

            supprimer

        "

    />


</div>

</template>



<style scoped>

/* =========================================================
   PAGE
========================================================= */

.page-inscriptions {

    width: 100%;

}


/* =========================================================
   HEADER
========================================================= */

.page-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 25px;

}


.page-header h1 {

    margin: 0 0 6px;

    color: #172554;

    font-size: 28px;

    font-weight: 800;

}


.page-header p {

    margin: 0;

    color: #94a3b8;

    font-size: 14px;

}


/* =========================================================
   ESPACE ENTRE RECHERCHE ET TABLEAU
========================================================= */

.spacing {

    height: 25px;

}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 600px) {

    .page-header h1 {

        font-size: 23px;

    }

}

</style>