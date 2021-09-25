//iniciando os elemento a ser manipulado
const personagemTab = document.querySelectorAll(".nav-tab-persoangem");
const personagemImg = document.querySelector("#personagem-img");
const personagemInfo = document.querySelector(".info-descricao");
window.addEventListener("load", showPersonagem(1))
async function buscarPersonagem(id = 1) {
    try {
        let busca = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        let personagem = await busca.json();
        return personagem;
    } catch (e) {
        console.log("ERRO DE REQUISIÇÃO")
    }
}

async function showPersonagem(id = 1) {
    let personagem = await buscarPersonagem(id);
    alterarTab(id);
    personagemImg.src = personagem.image;
    personagemInfo.innerHTML = `
                    <h1 class="title-name">${personagem.name}</h1>
                    <div class="status">
                        <span>
                            <svg width="1rem" height="1rem">
                                <circle cx="10" cy="10" r="5"  stroke-width="4" fill=${vivoOuMorto(personagem.status)} />
                            </svg>
                        ${personagem.status} - ${personagem.species}
                        </span>
                    </div>
                    <div class="info-extra">
                        <p>
                            <span class="text">Gênero:</span> ${personagem.gender}
                        </p>
                        <span>
                          <span class="text">Localização:</span>
                          ${personagem.origin.name} 
                        </span>
                    </div>
    `

}
function vivoOuMorto(statu) {
    if (statu === "Alive") {
        return "#47ce47"
    } else {
        return "red"
    }

}
function corTab(id,cor){
    id -=1;  //necessario para acessar o array do personagemTab
    for(let i = 0; i < personagemTab.length; i++ ){
        if(i == id){
            personagemTab[i].style.background = cor; 
        }else{
            personagemTab[i].style.background = ""
        }
    }
}
function alterarTab(id) {
   
    switch (id) {
        case 1:
            corTab(id,"#8a90d8");
            break;
        case 2:
            corTab(id,"#f7e54a");  
            break;
        case 3:
            corTab(id,"#ff6c9e");
            break;
        case 4:
            corTab(id,"#fd7449");
            break;
        case 5:
            corTab(id,"#66da6b");
            break;
        default:
            corTab(-1,"");
            break;

    }
}


async function pesquisar(){
    let input = document.querySelector(".input-id");
    let id = Number(input.value)
    
    try{
        if(id>671) throw new Error("Esse ID não existe");
        showPersonagem(id);
    }catch(e){
        console.log(e);
    }
}

