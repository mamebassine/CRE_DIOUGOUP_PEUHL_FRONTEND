<script setup>

/* =====================================================
   PROPS
===================================================== */

defineProps({

    search: {

        type: String,

        default: ""

    }

});


/* =====================================================
   EVENEMENTS
===================================================== */

defineEmits([

    "update:search"

]);

</script>


<template>

    <div class="search-box">

        <!-- ICÔNE RECHERCHE -->

        <i class="fas fa-search"></i>


        <!-- CHAMP DE RECHERCHE -->

        <input
            type="text"
            :value="search"
            placeholder="Rechercher une inscription..."
            @input="$emit('update:search', $event.target.value)"
        >

    </div>

</template>


<style scoped>

/* =========================================================
   RECHERCHE
========================================================= */

.search-box {

    width: 100%;

    height: 70px;

    background: #ffffff;

    border-radius: 18px;

    display: flex;

    align-items: center;

    padding: 0 28px;

    margin-bottom: 30px;

    box-shadow:
        0 8px 30px rgba(15, 23, 42, 0.06);

    border: 1px solid #edf1f7;

}


/* =========================================================
   ICÔNE
========================================================= */

.search-box i {

    font-size: 25px;

    color: #3B5998;

    margin-right: 20px;

}


/* =========================================================
   INPUT
========================================================= */

.search-box input {

    width: 100%;

    border: none;

    outline: none;

    font-size: 17px;

    color: #334155;

    background: transparent;

}


.search-box input::placeholder {

    color: #a0aec0;

}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 900px) {

    .search-box {

        height: 60px;

        padding: 0 20px;

    }

}


@media (max-width: 600px) {

    .search-box {

        border-radius: 14px;

    }

}

</style>