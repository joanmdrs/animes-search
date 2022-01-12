function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function mostraTabela(dados){

    document.getElementById("tabela").style.visibility="visible";
    document.getElementById("tbody").innerHTML = "";

    return dados.map(function(dado) {

        let tr = createNode('tr');
        let td_title = createNode('td');
        let td_year = createNode('td');
        let td_score = createNode('td');
        let td_image = createNode('td');

        let data = new Date(Date.parse(dado.start_date)).getFullYear();

        td_title.innerHTML = `<a href='${dado.url}' target="_blank">${dado.title}</a>`;
        td_year.innerHTML = `${data}`;
        td_score.innerHTML = `${dado.score}`;
        td_image.innerHTML = `<a href="#" onclick="carregarImagem(event,'${dado.image_url}')">Carregar</a>`

        append(tr, td_title);
        append(tr, td_year);
        append(tr, td_score);
        append(tr, td_image);
        append(tbody, tr);
    })
}

const buscar = async () => {
    let input = document.getElementById("inp-search");
    let tam = JSON.stringify(input.value).length - 2;
  
    if (input.value == "" || tam < 3) {
        document.getElementById("msg-erro").style.visibility = "visible";
        setTimeout(() => {
            document.getElementById("msg-erro").style.visibility = "hidden";
        }, 5000);

    } else {
        document.getElementById("msg-erro").style.visibility = "hidden";
        document.getElementById("loader").style.visibility = "visible";
        document.getElementById("btn-search").style.visibility = "hidden";

        let chave = document.getElementById("inp-search").value;
        let url = 'https://api.jikan.moe/v3/search/anime?q=' + chave;

        const response = await fetch(url)
        const data = await response.json()

        let dados = data.results;
                
        document.getElementById("th_title").setAttribute("onclick", "ordenaPorTitulo("+JSON.stringify(dados)+")");
        document.getElementById("th_ano").setAttribute("onclick", "ordenaPorAno("+JSON.stringify(dados)+")");
        document.getElementById("th_score").setAttribute("onclick", "ordenaPorScore("+JSON.stringify(dados)+")");
        
        document.getElementById("loader").style.visibility = "hidden";
        mostraTabela(dados);
        document.getElementById("btn-search").style.visibility = "visible";
    }
}

const carregarImagem = (event, url) => {
    event.preventDefault()
    document.getElementById("imagem").innerHTML = `<img src="${url}"  width="200px"/>`

}

function ordenaPorTitulo(dados){
    dados.sort((a,b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0);

    if(document.getElementById("th_title").value == "1"){
        dados.reverse();
        mostraTabela(dados);
        document.getElementById("th_title").value = "0";
    }else{
        mostraTabela(dados);
        document.getElementById("th_title").value = "1";
    }
}

function ordenaPorAno(dados){
    dados.sort((a,b) => a.start_date < b.start_date ? -1 : a.start_date > b.start_date ? 1 : 0);

    if(document.getElementById("th_ano").value == "1"){
        dados.reverse();
        mostraTabela(dados);
        document.getElementById("th_ano").value = "0";
    }else{
        mostraTabela(dados);
        document.getElementById("th_ano").value = "1";
    }
}

function ordenaPorScore(dados){
    dados.sort((a,b) => a.score < b.score ? -1 : a.score > b.score ? 1 : 0);

    if(document.getElementById("th_score").value == "1"){
        dados.reverse();
        mostraTabela(dados);
        document.getElementById("th_score").value = "0";
    }else{
        mostraTabela(dados);
        document.getElementById("th_score").value = "1";
    }
}