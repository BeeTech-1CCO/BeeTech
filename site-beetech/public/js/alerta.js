var alertas = [];

function obterdados(idSensor) {
    fetch(`/medidas/tempo-real/${idSensor}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idSensor);
                });
            } else {

                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idSensor) {
    var temp = resposta[0].temperatura;
    var umid = resposta[0].umidade;

    console.log(idSensor === resposta[0].fkEmpresa)
    
    var grauDeAviso ='';


    var limites = {
        muito_quente: 40,
        quente: 38,
        ideal: 34,
        frio: 23,
        muito_frio: 12
    };

    var limitesU = {
        muito_quente: 80,
        quente: 70,
        ideal: 60,
        frio: 50,
        muito_frio: 40
    };

    var classe_temperatura = 'cor-alerta';

    // Temperatura

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, umid, idSensor, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, umid, idSensor, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cor-alerta ideal';
        removerAlerta(idSensor);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, umid, idSensor, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, umid, idSensor, grauDeAviso, grauDeAvisoCor)
    }

    // Umidade

    if (umid >= limitesU.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, umid, idSensor, grauDeAviso, grauDeAvisoCor)
    }
    else if (umid < limitesU.muito_quente && umid >= limitesU.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, umid, idSensor, grauDeAviso, grauDeAvisoCor)
    }
    else if (umid < limitesU.quente && umid > limitesU.frio) {
        classe_temperatura = 'cor-alerta ideal';
        removerAlerta(idSensor);
    }
    else if (umid <= limitesU.frio && umid > limitesU.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, umid, idSensor, grauDeAviso, grauDeAvisoCor)
    }
    else if (umid <= limitesU.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, umid, idSensor, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    if (idSensor == 1) {
        temp_aquario_1.innerHTML = temp + "°C";
        card = card_1
    } else if (idSensor == 2) {
        temp_aquario_2.innerHTML = temp + "°C";
        card = card_2
    } else if (idSensor == 3) {
        temp_aquario_3.innerHTML = temp + "°C";
        card = card_3
    } else if (idSensor == 4) {
        temp_aquario_4.innerHTML = temp + "°C";
        card = card_4
    }

    if (idSensor == 1) {
        umi_aquario_1.innerHTML = umid + "%";
        card = card_1
    } else if (idSensor == 2) {
        umi_aquario_2.innerHTML = umid + "%";
        card = card_2
    } else if (idSensor == 3) {
        umi_aquario_3.innerHTML = umid + "%";
        card = card_3
    } else if (idSensor == 4) {
        umi_aquario_4.innerHTML = umid + "%";
        card = card_4
    }

    card.className = classe_temperatura;
}

function exibirAlerta(temp, umid, idSensor, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idSensor == idSensor);

    if (indice >= 0) {
        alertas[indice] = {idSensor, temp, umid, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idSensor, temp, umid, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
    
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}

function removerAlerta(idSensor) {
    alertas = alertas.filter(item => item.idSensor != idSensor);
    exibirCards();
}
 
function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ idSensor, temp, umid, grauDeAviso, grauDeAvisoCor }) {
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor}">&#12644;</div> 
     <h3>Apiário ${idSensor} está em estado de ${grauDeAviso}!</h3>
    <small>Temperatura ${temp}°C / Umidade ${umid}%.</small>
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}