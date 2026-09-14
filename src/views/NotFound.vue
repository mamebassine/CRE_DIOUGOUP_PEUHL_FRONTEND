<template>

    <div class="not-found">

        <h1>404</h1>

        <p>
            Page introuvable
        </p>

        <RouterLink to="/">
            Retour à l'accueil
        </RouterLink>

    </div>

</template>

<style scoped>

.not-found {

    text-align: center;
    margin-top: 100px;

}

.not-found h1 {

    font-size: 80px;
    margin-bottom: 10px;

}

.not-found p {

    font-size: 20px;
    margin-bottom: 25px;

}

.not-found a {

    display: inline-block;
    padding: 10px 20px;
    background: #3B5998;
    color: white;
    text-decoration: none;
    border-radius: 6px;

}

</style>