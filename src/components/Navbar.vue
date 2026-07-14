<template>

  <nav class="navbar">

    <div class="nav-container">

      <!-- Logo -->
      <div class="logo">

        <RouterLink to="/" class="logo-link">
          <img
            src="@/assets/images/logo cre.png"
            alt="Logo CRE"
          >
        </RouterLink>

        <small class="logo-name">
          CRE DIOUGOUP PEUHL
        </small>

      </div>

      <!-- Bouton Mobile -->
      <div
        class="burger"
        @click="isMenuOpen = !isMenuOpen"
      >
        ☰
      </div>

      <!-- Menu -->
      <ul
        class="menu"
        :class="{ open: isMenuOpen }"
      >

        <li>
          <RouterLink to="/centre">
            Le Centre
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/formations">
            Formations
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/actualites">
            Actualités
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/galerie">
            Galerie
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/horaires">
            Horaires
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/contact">
            Contact
          </RouterLink>
        </li>

        <li>
          <RouterLink
            class="btn-login"
            to="/login"
          >
            Connexion
          </RouterLink>
        </li>

      </ul>

    </div>

  </nav>

</template>

<script setup>

import { ref, watch } from "vue";
import { useRoute, RouterLink } from "vue-router";

const isMenuOpen = ref(false);

const route = useRoute();

watch(route, () => {

    isMenuOpen.value = false;

});

</script>

<style scoped>

/************************************************
NAVBAR
*************************************************/

.navbar{

    position:fixed;

    top:0;

    left:0;

    width:100%;

    height:110px;

    background:#ffffff;

    box-shadow:0 4px 12px rgba(0,0,0,.10);

    z-index:1000;

}

/************************************************
NAV CONTAINER
*************************************************/

.nav-container{

    width:100%;

    max-width:1400px;

    height:100%;

    margin:0 auto;

    padding:0 40px;

    display:flex;

    align-items:center;

    justify-content:space-between;

    box-sizing:border-box;

}

/************************************************
LOGO
*************************************************/

.logo{

    min-width:150px;

    display:flex;

    flex-direction:column;

    align-items:center;

    justify-content:center;

}

.logo-link{

    display:flex;

    justify-content:center;

    align-items:center;

}

.logo img{

    height:75px;

    width:auto;

    object-fit:contain;

}

.logo-name{

    margin-top:5px;

    font-size:11px;

    font-weight:700;

    color:#3B5998;

    white-space:nowrap;

}

/************************************************
MENU
*************************************************/

.menu{

    flex:1;

    display:flex;

    justify-content:flex-end;

    align-items:center;

    gap:35px;

    list-style:none;

    margin:0;

    padding:0;

}

.menu li{

    list-style:none;

}

.menu li a{

    text-decoration:none;

    color:#3B5998;

    font-size:16px;

    font-weight:600;

    transition:.3s;

}

.menu li a:hover{

    color:#2E7D32;

}

/************************************************
LIEN ACTIF
*************************************************/

.router-link-active{

    color:#2E7D32 !important;

    border-bottom:3px solid #2E7D32;

    padding-bottom:5px;

}

/************************************************
BOUTON CONNEXION
*************************************************/

.btn-login{

    display:inline-block;

    padding:14px 10px;

    background:#3B5998;

    color:white !important;

    border-radius: 15px;

    text-decoration:none;

    font-weight:600;

    transition:.3s;

}

.btn-login:hover{

    background:#2E7D32;

    color:white !important;

}

/************************************************
BURGER
*************************************************/

.burger{

    display:none;

    font-size:32px;

    color:#3B5998;

    cursor:pointer;

}

/************************************************
RESPONSIVE
*************************************************/

@media(max-width:900px){

    .burger{

        display:block;

    }

    .menu{

        display:none;

        position:absolute;

        top:110px;

        left:0;

        width:100%;

        background:white;

        flex-direction:column;

        justify-content:center;

        gap:25px;

        padding:30px 0;

        box-shadow:0 5px 15px rgba(0,0,0,.15);

    }

    .menu.open{

        display:flex;

    }

    .logo img{

        height:60px;

    }

    .logo-name{

        font-size:9px;

    }

    .nav-container{

        padding:0 20px;

    }

}

</style>