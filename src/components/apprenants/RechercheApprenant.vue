<template>

<div class="search-box">


    <i class="fas fa-search"></i>


    <input
        type="text"
        placeholder="Rechercher un apprenant..."
        v-model="search"
        @input="rechercher"
    >


</div>

</template>





<script setup>

import { ref } from "vue";



const search = ref("");



const emit = defineEmits([
    "search"
]);



const rechercher = ()=>{


    emit(
        "search",
        search.value
    );


};


</script>






<style scoped>


.search-box{


    display:flex;

    align-items:center;

    gap:12px;

    background:white;

    padding:12px 18px;

    border-radius:15px;

    box-shadow:0 5px 15px rgba(0,0,0,.08);

    margin-bottom:20px;

}



.search-box i{


    color:#3B5998;

    font-size:18px;

}



.search-box input{


    border:none;

    outline:none;

    width:100%;

    font-size:15px;

    color: #1F2937;

}



.search-box input::placeholder{


    color:#9CA3AF;

}


</style>