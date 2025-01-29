function reflex_agent(location, state){
   	if (state=="sucio") return "limpio";
   	else if (location=="A") return "moverse a la derecha";
   	else if (location=="B") return "moverse a la izquierda";
}

function getState(states) {
    let state_number = 0;

    if (states[0] === "B") {
        state_number += 4;
    }
    if (states[1] === "limpio") {
        state_number += 2;
    }
    if (states[2] === "limpio") {
        state_number += 1;
    }
    return state_number + 1;
}

function putState(states) {
    let actual_state = getState(states);
    if (!visited.includes(actual_state)) { 
        visited.push(actual_state);
		document.getElementById("estadosVisitados").innerHTML = 
		"<b>Estados visitados:</b><br>" + visited.sort((a, b) => a - b).join(", ");	
    }
}

function randomState(states) {
    let actual_state = getState(states);
    if (visited.includes(actual_state)) { 
        let numeroAleatorio = Math.floor(Math.random() * 6) + 1;
		if (numeroAleatorio === 1){
			states[1] = "sucio";
			document.getElementById("log").innerHTML += " | Se ensucio aleatoriamente A"
		}else if(numeroAleatorio === 2){
			states[2] = "sucio";
			document.getElementById("log").innerHTML += " | Se ensucio aleatoriamente B"
		}else if(numeroAleatorio === 3){
			states[1] = "sucio";
			states[2] = "sucio";
			document.getElementById("log").innerHTML += " | Se ensucio aleatoriamente A y B"
		}
		else if (numeroAleatorio === 4){
			states[1] = "limpio";
			document.getElementById("log").innerHTML += " | Se limpio aleatoriamente A"
		}else if(numeroAleatorio === 5){
			states[2] = "limpio";
			document.getElementById("log").innerHTML += " | Se limpio aleatoriamente B"
		}else if(numeroAleatorio === 6){
			states[1] = "limpio";
			states[2] = "limpio";
			document.getElementById("log").innerHTML += " | Se limpio aleatoriamente A y B"
		}
    }
}

function test(states){
      	var location = states[0]; //location = A

      	var state = states[0] == "A" ? states[1] : states[2]; //state = sucio (A esta sucio)

      	var action_result = reflex_agent(location, state); //action_result = limpio (Como A estaba sucio se limpia)

		if (action_result === "limpio"){
			document.getElementById("log").innerHTML += 
    		"<br>A:" + states[1] + " - B:" + states[2] + 
    		" | Estado: " + getState(states) +
    		" | Posicion actual de la aspiradora: ".concat(location).concat(" | Se realizo la accion de: limpiar");
			//Se imprime limpiar en lugar de limpio
		}else{
			document.getElementById("log").innerHTML += 
    		"<br>A:" + states[1] + " - B:" + states[2] + 
   			" | Estado: " + getState(states) +
    		" | Posicion actual de la aspiradora: ".concat(location).concat(" | Se realizo la accion de: ").concat(action_result);
			//Se imprime
		}
		putState(states);
		if (action_result == "limpio"){
        	if (location == "A") states[1] = "limpio";
         	else if (location == "B") states[2] = "limpio";
      	}
      	else if (action_result == "moverse a la derecha") states[0] = "B";
      	else if (action_result == "moverse a la izquierda") states[0] = "A";
		//Se actualizan los estados de states		
		randomState(states);
	setTimeout(function(){ test(states); }, 2000);
}

var states = ["A","sucio","sucio"];
var visited = [];
test(states);
