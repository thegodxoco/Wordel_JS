
var paraulaAleatoria = ""; //Paraula Random
var intents = 0;
var guanyat = false;
var victories = 0;
var derrotes = 0;
var encerts = [0,0,0,0,0,0];
const cd = document.body; 
cd.onload = local();


function local(){
    if(localStorage.getItem('p1')===null){

        localStorage.setItem('victories', 0);
        localStorage.setItem('derrotes', 0);
        localStorage.setItem('p1', 0);
        localStorage.setItem('p2', 0);
        localStorage.setItem('p3', 0);
        localStorage.setItem('p4', 0);
        localStorage.setItem('p5', 0);
        localStorage.setItem('p6', 0);
        
        victories = localStorage.getItem('victories');
        derrotes = localStorage.getItem('derrotes');
        encerts[0]= localStorage.getItem('p1');
        encerts[1]= localStorage.getItem('p2');
        encerts[2]= localStorage.getItem('p3');
        encerts[3]= localStorage.getItem('p4');
        encerts[4]= localStorage.getItem('p5');
        encerts[5]= localStorage.getItem('p6');
        

    }else{

        victories = localStorage.getItem('victories');
        derrotes = localStorage.getItem('derrotes');
        encerts[0]= localStorage.getItem('p1');
        encerts[1]= localStorage.getItem('p2');
        encerts[2]= localStorage.getItem('p3');
        encerts[3]= localStorage.getItem('p4');
        encerts[4]= localStorage.getItem('p5');
        encerts[5]= localStorage.getItem('p6');
        
    }

var str = "victories: "+ victories;
var stats = document.getElementById("stats");

stats.innerHTML = "<p>victories: "+ victories+"</p> <p>derrotes: "+ derrotes+"</p><p>victories en cada intent </p><p>1: "+encerts[0]+", 2:  "+encerts[1]+", 3:  "+encerts[2]+", 4:  "+encerts[3]+", 5:  "+encerts[4]+", 6:  "+encerts[5]+"</p>";


}

function escriu(click) {
    console.log(paraulaAleatoria);
    if (guanyat===false){
        modificarTaula(click);
    }
    else if(guanyat===true) {
        alert("El joc ha finalitzat. Recarrega la pàgina.");
    }
}

function paraulaRandom(){
    var long = diccionari.length;
    var random = Math.floor(Math.random() * long);
    var paraula = diccionari[random];
    return paraula.toLowerCase();
}

paraulaAleatoria = paraulaRandom();

function modificarTaula(lletra){
    //agafar fills taula i tr que tenen la classe m
    var taula = document.getElementById("taula");
    var filas = taula.getElementsByClassName("m");

    //seleccionar tds del primer tr amb classe m 
    var td =filas[0].getElementsByTagName("td");
   
    for(var i = 0; i<td.length;i++){
        if(td[i].innerHTML === " "){
            td[i].innerHTML = lletra;
            if(i===4){
                des_lletr();
                filas[0].className  = "a";
            }
            break;
        }
    }

}

function enter(){
    if(guanyat===true) {
        alert("El joc ha finalitzat. Recarrega la pàgina.");
    } else if (guanyat===false){
        var taula = document.getElementById("taula");
    var fila = taula.getElementsByClassName("a");
    if(fila[0] === undefined){
        alert("Paraula incorrecta!");
    } else {    
        var x = fila[0].getElementsByTagName("td");
        var par = "";
        for(var i = 0;i<x.length;i++){
            par= par + x[i].innerHTML;
        }
        if(comprovarParaula(par.toLowerCase())===1){
            //paraula acceptada
            fila[0].className = "f";
            act_lletr();
            colorLletra(par, x);
            
            intents++;
            if(intents === 6){
                derrotes++;
                localStorage.removeItem('derrotes');
                localStorage.setItem('derrotes', derrotes);
                alert("Has perdut la paraula era: "+ paraulaAleatoria);
            }
        }else if(comprovarParaula(par.toLowerCase())===2){
            //paraula guanyadora
            
            colorLletra(par, x);
            alert("FELICITATS! Has guanyat.");
            guanyat = true;
            //localstorage encerts


            encerts[intents]++;
            localStorage.removeItem('p1');
            localStorage.removeItem('p2');
            localStorage.removeItem('p3');
            localStorage.removeItem('p4');
            localStorage.removeItem('p5');
            localStorage.removeItem('p6');
            localStorage.setItem('p1', encerts[0]);
            localStorage.setItem('p2', encerts[1]);
            localStorage.setItem('p3', encerts[2]);
            localStorage.setItem('p4', encerts[3]);
            localStorage.setItem('p5', encerts[4]);
            localStorage.setItem('p6', encerts[5]);

            victories++;
            localStorage.removeItem('victories');
            localStorage.setItem('victories', victories);
        }else{
            //paraula no acceptada
            alert("Paraula incorecta!");
        }
    }    
    }
    
}

// Retorna 0 si la paraula no existeix, 1 si existeix i 2 si és la paraula a endevinar
function comprovarParaula(paraula){
    var test; 
    if(diccionari.includes(paraula)){
        test = 1;
        var igual = paraula.localeCompare(paraulaAleatoria);
        if (igual==0){
            test = 2;
        }
    }
    else{
        test = 0
    } 
    return test;
}


function del(){
    if(guanyat===false) {
        var taula = document.getElementById("taula");
        var f = taula.getElementsByClassName("a");  
        if(f.length !== 0){
            var pr2 = f[0].getElementsByTagName("td");
            for(var i = pr2.length-1;i>=0;i--){
                if(pr2[i].innerHTML !== " "){
                    pr2[i].innerHTML = " ";
                    
                    act_lletr();
                    f[0].className="m";
                    break;
                }
            }
        }else{
            var pr3 = taula.getElementsByClassName("m");
            var pr4 = pr3[0].getElementsByTagName("td");
            for(var i = pr4.length-1 ; i>=0;i--){
                if(pr4[i].innerHTML !== " "){
                    pr4[i].innerHTML = " ";
                    i=0;
                }
            }
        }
    } else if (guanyat===true){
        alert("El joc ha finalitzat. Recarrega la pàgina");
    }
    
}

function par_com(){

}

function act_lletr(){
    var pr = document.getElementsByTagName("button");
    for(var i = 0; i<pr.length;i++){
        if(pr[i].id!=="ENTER" && pr[i].id !== "DEL"){
            pr[i].setAttribute("onClick", "escriu(this.id)" ); 
        }
    }
}

function des_lletr(){
    var pr = document.getElementsByTagName("button");
    for(var i = 0; i<pr.length;i++){            
        if(pr[i].id!=="ENTER" && pr[i].id !== "DEL"){
            pr[i].onclick= par_com();
        }            
    }
}

function colorLletra(paraula, x){
    var paraulaM=paraula.toUpperCase();
    var paraulaAM=paraulaAleatoria.toUpperCase();
    for(var i = 0; i<5;i++){
        var cont=0;
        for(var e = 0; e<5;e++){
            if( i !== e  && paraulaM.charAt(i)=== paraulaAM.charAt(e) ){
                var prob = document.getElementById(paraulaM.charAt(i));
                prob.className = "apareix";
                x[i].className = "apareix";
                cont++;
            }
        }
        if(paraulaM.charAt(i)=== paraulaAM.charAt(i)){
            var pro = document.getElementById(paraulaM.charAt(i));
            pro.className= "correct";
            x[i].className = "correct";
        }
        if(cont===0 && paraulaM.charAt(i)!== paraulaAM.charAt(i)){
            var proba = document.getElementById(paraulaM.charAt(i));
            proba.className = "no_apareix";
            x[i].className = "no_apareix";
        }
    }
}


