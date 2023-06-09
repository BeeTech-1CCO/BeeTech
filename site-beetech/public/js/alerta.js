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
        frio: 22.5,
        muito_frio: 12
    };

    var limites_umidade = {
        muito_alta: 80,
        alta: 75,
        ideal_umi: 67.5,
        baixa: 50,
        muito_baixa: 20
    };


    var classe_temperatura = 'cor-alerta';

    // Temperatura

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo muito quente';
        grauDeAvisoCor = 'cor-alerta perigo-quente';

        if (umid >= limites_umidade.muito_alta) {
            classe_umidade = 'cor-alerta perigo-alta';
            grauDeAviso_umidade = 'perigo alta';
            grauDeAvisoCor_umidade = 'cor-alerta perigo-alta';
            exibirAlerta(temp, umid, idSensor, grauDeAviso,grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }
        else if (umid < limites_umidade.muito_alta && umid >= limites_umidade.alta) {
            classe_umidade = 'cor-alerta alerta-alta';
            grauDeAviso_umidade = 'alerta alta';
            grauDeAvisoCor_umidade = 'cor-alerta alerta-alta';
            exibirAlerta(temp, umid, idSensor,grauDeAviso,grauDeAvisoCor,grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }
        else if (umid <= limites_umidade.alta && umid >= limites_umidade.baixa) {
            classe_umidade = 'cor-alerta ideal_umi';
            removerAlerta(idSensor);
        }
        else if (umid <= limites_umidade.baixa && umid > limites_umidade.muito_baixa) {
            classe_umidade = 'cor-alerta alerta-baixa';
            grauDeAviso_umidade = 'alerta baixa';
            grauDeAvisoCor_umidade = 'cor-alerta alerta-baixa';
            exibirAlerta(temp, umid, idSensor,grauDeAviso,grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }
        else if (umid <= limites_umidade.muito_baixa) {
            classe_umidade = 'cor-alerta perigo-baixa';
            grauDeAviso_umidade = 'perigo baixa';
            grauDeAvisoCor_umidade = 'cor-alerta perigo-baixa';
            exibirAlerta(temp, umid, idSensor,grauDeAviso, grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }else{}

    }else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente';
        grauDeAvisoCor = 'cor-alerta alerta-quente';
        
        if (umid >= limites_umidade.muito_alta) {
            classe_umidade = 'cor-alerta perigo-alta';
            grauDeAviso_umidade = 'perigo alta';
            grauDeAvisoCor_umidade = 'cor-alerta perigo-alta';
            exibirAlerta(temp, umid, idSensor, grauDeAviso,grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }
        else if (umid < limites_umidade.muito_alta && umid >= limites_umidade.alta) {
            classe_umidade = 'cor-alerta alerta-alta';
            grauDeAviso_umidade = 'alerta alta';
            grauDeAvisoCor_umidade = 'cor-alerta alerta-alta';
            exibirAlerta(temp, umid, idSensor,grauDeAviso,grauDeAvisoCor,grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }
        else if (umid < limites_umidade.alta && umid > limites_umidade.baixa) {
            classe_umidade = 'cor-alerta ideal_umi';
            removerAlerta(idSensor);
        }
        else if (umid <= limites_umidade.baixa && umid > limites_umidade.muito_baixa) {
            classe_umidade = 'cor-alerta alerta-baixa';
            grauDeAviso_umidade = 'alerta baixa';
            grauDeAvisoCor_umidade = 'cor-alerta alerta-baixa';
            exibirAlerta(temp, umid, idSensor,grauDeAviso,grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }
        else if (umid <= limites_umidade.muito_baixa) {
            classe_umidade = 'cor-alerta perigo-baixa';
            grauDeAviso_umidade = 'perigo baixa';
            grauDeAvisoCor_umidade = 'cor-alerta perigo-baixa';
            exibirAlerta(temp, umid, idSensor,grauDeAviso, grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }else{}

    }else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cor-alerta ideal';
        grauDeAviso = 'ideal'
        grauDeAvisoCor_umidade = 'ideal';
        if (umid >= limites_umidade.muito_alta) {
            classe_umidade = 'cor-alerta perigo-alta';
            grauDeAviso_umidade = 'perigo alta';
            grauDeAvisoCor_umidade = 'cor-alerta perigo-alta';
            exibirAlerta(temp, umid, idSensor, grauDeAviso,grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }
        else if (umid < limites_umidade.muito_alta && umid >= limites_umidade.alta) {
            classe_umidade = 'cor-alerta alerta-alta';
            grauDeAviso_umidade = 'alerta alta';
            grauDeAvisoCor_umidade = 'cor-alerta alerta-alta';
            exibirAlerta(temp, umid, idSensor,grauDeAviso,grauDeAvisoCor,grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }
        else if (umid < limites_umidade.alta && umid > limites_umidade.baixa) {
            classe_umidade = 'cor-alerta ideal_umi';
            removerAlerta(idSensor);
        }
        else if (umid <= limites_umidade.baixa && umid > limites_umidade.muito_baixa) {
            classe_umidade = 'cor-alerta alerta-baixa';
            grauDeAviso_umidade = 'alerta baixa';
            grauDeAvisoCor_umidade = 'cor-alerta alerta-baixa';
            exibirAlerta(temp, umid, idSensor,grauDeAviso,grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }
        else if (umid <= limites_umidade.muito_baixa) {
            classe_umidade = 'cor-alerta perigo-baixa';
            grauDeAviso_umidade = 'perigo baixa';
            grauDeAvisoCor_umidade = 'cor-alerta perigo-baixa';
            exibirAlerta(temp, umid, idSensor,grauDeAviso, grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }else{}

    }else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio';
        grauDeAvisoCor = 'cor-alerta alerta-frio';
        if (umid >= limites_umidade.muito_alta) {
            classe_umidade = 'cor-alerta perigo-alta';
            grauDeAviso_umidade = 'perigo alta';
            grauDeAvisoCor_umidade = 'cor-alerta perigo-alta';
            exibirAlerta(temp, umid, idSensor, grauDeAviso,grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        } else if (umid < limites_umidade.muito_alta && umid >= limites_umidade.alta) {
            classe_umidade = 'cor-alerta alerta-alta';
            grauDeAviso_umidade = 'alerta alta';
            grauDeAvisoCor_umidade = 'cor-alerta alerta-alta';
            exibirAlerta(temp, umid, idSensor,grauDeAviso,grauDeAvisoCor,grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }else if (umid < limites_umidade.alta && umid > limites_umidade.baixa) {
            classe_umidade = 'cor-alerta ideal_umi';
            removerAlerta(idSensor);
        }else if (umid <= limites_umidade.baixa && umid > limites_umidade.muito_baixa) {
            classe_umidade = 'cor-alerta alerta-baixa';
            grauDeAviso_umidade = 'alerta baixa';
            grauDeAvisoCor_umidade = 'cor-alerta alerta-baixa';
            exibirAlerta(temp, umid, idSensor,grauDeAviso,grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }else if (umid <= limites_umidade.muito_baixa) {
            classe_umidade = 'cor-alerta perigo-baixa';
            grauDeAviso_umidade = 'perigo baixa';
            grauDeAvisoCor_umidade = 'cor-alerta perigo-baixa';
            exibirAlerta(temp, umid, idSensor,grauDeAviso, grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }else{}
    }else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo muito frio';
        grauDeAvisoCor = 'cor-alerta perigo-frio';
        if (umid >= limites_umidade.muito_alta) {
            classe_umidade = 'cor-alerta perigo-alta';
            grauDeAviso_umidade = 'perigo alta';
            grauDeAvisoCor_umidade = 'cor-alerta perigo-alta';
            exibirAlerta(temp, umid, idSensor, grauDeAviso,grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }else if (umid < limites_umidade.muito_alta && umid >= limites_umidade.alta) {
            classe_umidade = 'cor-alerta alerta-alta';
            grauDeAviso_umidade = 'alerta alta';
            grauDeAvisoCor_umidade = 'cor-alerta alerta-alta';
            exibirAlerta(temp, umid, idSensor,grauDeAviso,grauDeAvisoCor,grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }else if (umid < limites_umidade.alta && umid > limites_umidade.baixa) {
            classe_umidade = 'cor-alerta ideal_umi';
            removerAlerta(idSensor);
        }else if (umid <= limites_umidade.baixa && umid > limites_umidade.muito_baixa) {
            classe_umidade = 'cor-alerta alerta-baixa';
            grauDeAviso_umidade = 'alerta baixa';
            grauDeAvisoCor_umidade = 'cor-alerta alerta-baixa';
            exibirAlerta(temp, umid, idSensor,grauDeAviso,grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }else if (umid <= limites_umidade.muito_baixa) {
            classe_umidade = 'cor-alerta perigo-baixa';
            grauDeAviso_umidade = 'perigo baixa';
            grauDeAvisoCor_umidade = 'cor-alerta perigo-baixa';
            exibirAlerta(temp, umid, idSensor,grauDeAviso, grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade)
        }else{}
    }else{}

    var card;
    if (idSensor == 1) {
        temp_aquario_1.innerHTML = temp + "°C";
        umi_aquario_1.innerHTML = umid + "%";
        
    } else if (idSensor == 2) {
        temp_aquario_2.innerHTML = temp + "°C";
        umi_aquario_2.innerHTML = umid + "%";
      
    } else if (idSensor == 3) {
        temp_aquario_3.innerHTML = temp + "°C";
        umi_aquario_3.innerHTML = umid + "%";
        
    } else if (idSensor == 4) {
        temp_aquario_4.innerHTML = temp + "°C";
        umi_aquario_4.innerHTML = umid + "%";
        
    }else{}
     
    exibirCards();
    
}

function exibirAlerta(temp, umid, idSensor, grauDeAviso, grauDeAvisoCor, grauDeAviso_umidade, grauDeAvisoCor_umidade) {
    var indice = alertas.findIndex(item => item.idSensor == idSensor);
    
    if (indice >= 0) {
        alertas[indice] = {idSensor, temp, umid, grauDeAviso, grauDeAvisoCor, grauDeAviso_umidade,grauDeAvisoCor_umidade }
    } else {
        alertas.push({ idSensor, temp, umid, grauDeAviso, grauDeAvisoCor,grauDeAviso_umidade,grauDeAvisoCor_umidade });


    }
}
    
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.


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

function transformarEmDiv({ idSensor, temp, umid, grauDeAviso, grauDeAvisoCor}) {
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <h3>Apiário ${idSensor} está com temperatura em estado de '${grauDeAviso}' e umidade em '${grauDeAviso_umidade}'!</h3>
    <small>Temperatura ${temp}°C / Umidade ${umid}%.</small>
    </div>
    </div>`;
}