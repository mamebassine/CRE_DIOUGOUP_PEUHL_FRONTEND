<template>

<div>


<!-- HERO GALERIE -->

<section class="gallery-hero">

<div class="overlay">


<div class="container text-center text-white">


<h1>
Notre Galerie
</h1>


<p>
Découvrez les moments forts, formations et activités du CRE.
</p>


</div>


</div>

</section>





<!-- GALERIE -->

<section class="gallery-section">


<div class="container">


<div class="text-center mb-5">


<h2>
Nos activités en images
</h2>


<p>
Revivez les moments importants du Centre de Recherche et d'Essais.
</p>


</div>






<div class="row g-4">



<!-- IMAGE 1 -->

<div class="col-md-4">

<div class="gallery-card">


<img 
src="@/assets/images/formation.jpg"
alt="Formation"
>


<div class="gallery-overlay">


<h4>
Formations
</h4>


<p>
Apprentissage et développement des compétences.
</p>


</div>


</div>

</div>






<!-- IMAGE 2 -->

<div class="col-md-4">

<div class="gallery-card">


<img 
src="@/assets/images/atelier.jpeg"
alt="Atelier"
>


<div class="gallery-overlay">


<h4>
Ateliers pratiques
</h4>


<p>
Des séances orientées pratique.
</p>


</div>


</div>

</div>






<!-- IMAGE 3 -->

<div class="col-md-4">

<div class="gallery-card">


<img 
src="@/assets/images/equipe.jpg"
alt="Equipe"
>


<div class="gallery-overlay">


<h4>
Notre équipe
</h4>


<p>
Collaboration et innovation.
</p>


</div>


</div>

</div>






<!-- IMAGE 4 -->

<div class="col-md-4">

<div class="gallery-card">


<img 
src="@/assets/images/formation.jpg"
alt="Numérique"
>


<div class="gallery-overlay">


<h4>
Numérique
</h4>


<p>
Innovation et technologie.
</p>


</div>


</div>

</div>






<!-- IMAGE 5 -->

<div class="col-md-4">

<div class="gallery-card">


<img 
src="@/assets/images/atelier.jpeg"
alt="Recherche"
>


<div class="gallery-overlay">


<h4>
Recherche
</h4>


<p>
Expérimentation et créativité.
</p>


</div>


</div>

</div>






<!-- IMAGE 6 -->

<div class="col-md-4">

<div class="gallery-card">


<img 
src="@/assets/images/equipe.jpg"
alt="Activités"
>


<div class="gallery-overlay">


<h4>
Activités du centre
</h4>


<p>
Les moments importants du CRE.
</p>


</div>


</div>

</div>






</div>


</div>


</section>


</div>


</template>





<script setup>

</script>






<style scoped>


.gallery-hero{


height:350px;


background:url("@/assets/images/formation.jpg")


center/cover no-repeat;


}



.overlay{


height:100%;


display:flex;


align-items:center;


justify-content:center;


background:linear-gradient(

135deg,

rgba(59,89,152,.9),

rgba(46,125,50,.85)

);


}



.gallery-hero h1{


font-size:55px;


font-weight:900;


}




.gallery-hero p{


font-size:20px;


}






.gallery-section{


background:var(--color-background);


padding:80px 0;


}




.gallery-section h2{


color:var(--color-primary);


font-size:40px;


font-weight:900;


}






.gallery-card{


height:300px;


border-radius:25px;


overflow:hidden;


position:relative;


box-shadow:0 15px 40px rgba(59,89,152,.18);


transition:.4s;


}



.gallery-card:hover{


transform:translateY(-12px);


}






.gallery-card img{


width:100%;


height:100%;


object-fit:cover;


}






.gallery-overlay{


position:absolute;


bottom:0;


left:0;


right:0;


padding:25px;


background:linear-gradient(

transparent,

rgba(0,0,0,.8)

);


color:white;


}






.gallery-overlay h4{


font-weight:800;


color:white;


}




.gallery-overlay p{


font-size:15px;


}




@media(max-width:768px){


.gallery-hero h1{


font-size:35px;


}



}



</style>