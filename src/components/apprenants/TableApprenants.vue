<template>

<div class="table-card">


<table>


<thead>

<tr>

<th>
Photo
</th>

<th>
Nom complet
</th>

<th>
Email
</th>

<th>
Statut
</th>

<th>
Actions
</th>

</tr>

</thead>




<tbody>


<tr
v-for="apprenant in apprenants"
:key="apprenant.id"
>

<!-- PHOTO -->

<td>

<img
v-if="apprenant.photo"
:src="`http://127.0.0.1:8000/storage/${apprenant.photo}`"
class="photo"
>

<img
v-else
src="http://127.0.0.1:8000/storage/default.png"
class="photo"
>

</td>



<!-- NOM -->

<td>

{{ apprenant.user?.nom }}
{{ apprenant.user?.prenom }}

</td>



<!-- EMAIL -->

<td>

{{ apprenant.user?.email }}

</td>



<!-- STATUT -->

<td>

<span
:class="statutClass(apprenant.statut)"
>

{{ apprenant.statut }}

</span>

</td>



<!-- ACTIONS -->

<td class="actions">

<button
class="btn-view"
@click="$emit('voir', apprenant.id)"
>

<i class="fas fa-eye"></i>

</button>



<button
class="btn-edit"
@click="$emit('modifier', apprenant.id)"
>

<i class="fas fa-edit"></i>

</button>



<button
class="btn-delete"
@click="$emit('supprimer', apprenant.id)"
>

<i class="fas fa-trash"></i>

</button>

</td>

</tr>




</tbody>


</table>



</div>



</template>








<script setup>


defineProps({

    apprenants:{
        type:Array,
        default:[]
    }

});





const statutClass=(statut)=>{


    if(statut==="Valide")
        return "badge valide";


    if(statut==="Refuse")
        return "badge refuse";


    return "badge attente";


};

const formaterDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString("fr-FR");

};



</script>



<style scoped>

.table-card{

    width:100%;

    background:white;

    border-radius:20px;

    padding:25px;

    overflow-x:auto;

    box-shadow:0 5px 20px rgba(0,0,0,0.08);

}



table{

    width:100%;

    border-collapse:collapse;

   min-width:650px;

}



thead{

    background:#F8FAFC;

}



th{

    color:#3B5998;

    font-weight:800;

    padding:18px;

    text-align:left;

    white-space:nowrap;

}



td{

    padding:15px;

    border-bottom:1px solid #eee;

    white-space:nowrap;

}



tbody tr:hover{

    background:#F8FAFC;

}



.photo{

    width:45px;

    height:45px;

    border-radius:50%;

    object-fit:cover;

    border:2px solid #3B5998;

}



.actions{

    display:flex;

    gap:8px;

}



.actions button{

    width:35px;

    height:35px;

    border:none;

    border-radius:8px;

    cursor:pointer;

}



.btn-view{

    background:#3B5998;

    color:white;

}



.btn-edit{

    background:#2E7D32;

    color:white;

}



.btn-delete{

    background:#dc2626;

    color:white;

}



.badge{

    padding:5px 12px;

    border-radius:20px;

    font-size:13px;

    font-weight:bold;

}



.valide{

    background:#dcfce7;

    color:#166534;

}



.refuse{

    background:#fee2e2;

    color:#991b1b;

}



.attente{

    background:#fef3c7;

    color:#92400e;

}


</style>