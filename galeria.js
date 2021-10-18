"use strict"

// criar um array, mas só que ele não existe, fazendo a função do back-end
// const imagens = [
//    "./img/imagem1.png",
//     "./img/imagem2.png",
//     "./img/imagem3.png",
//     "./img/imagem4.png",
//     "./img/imagem5.png",
//     "./img/imagem6.png",
//     "./img/imagem7.png",
//     "./img/imagem4.png"

// ]

const limparElementos = (elemento) =>{ // 12 passo - criar uma funcao para limpar
    while(elemento.firstChild){ // equanto tiver o primeiro elemento remove o ultimo, limpa toda div container para garregar denovo a div
        elemento.removeChild(elemento.lastChild);
    }

}

//criando funcao - primeiro de tudo
const pesquisarImagens = async (evento) => {
    if(evento.key === 'Enter'){ // 8 passo colocar todo o codigo 1,2,3,4 aqui dentro do if
        const raca = evento.target.value; // 9 passo, pesquisar a raca
         const url = `https://dog.ceo/api/breed/${raca}/images`; // 4 passo, depois que criar o 9 passo, colocar aqui a variavel ${raca}
        const imagensResponse = await fetch(url); //1 passo
        const imagens = await imagensResponse.json(); // 2 passo
        
        limparElementos(document.querySelector('.galeria-container')); // 13 passo, chamar a funcao que limpa
        limparElementos(document.querySelector('.slide-container')); // 13 passo, chamar a funcao que limpa

        carregarGaleria(imagens); //3 passo, 10 passo tirar o console.log e mostrar
        carregarSlide(imagens); // 11 passo colocar o slide

        
   
    }
};



//tirar o img/ e o.png, limpando a url
const pegarId = (url) => {
    const posBarra = url.lastIndexOf("/") + 1 // procura a ultima ocorrencia que eu quero
    const posPonto = url.lastIndexOf(".")
    return url.substring(posBarra, posPonto)
}
// fazendo a função criarItem
const criarItem = (urlImagem)=>{
    const container = document.querySelector(".galeria-container")

    // criando um link
    
    const novoLink = document.createElement("a") // criando uma tag com createElement
    novoLink.href = `#${pegarId(urlImagem)}`//"#imagem1" - acessando a propriedade do link, o href
    novoLink.classList.add("galeria-items") //adicionando uma classe com classList.add
    novoLink.innerHTML = `<img src="${urlImagem}">` // colocando o  conteudo
     container.appendChild(novoLink) //appendchild colocando o conteudo dentro do container
   
    //     container.innerHTML += `
//         <a href="#imagem1" class="galeria-items">
//         <img src="${urlImagem}"> 
//         </a>
// `
}

// criando a função carregarGaleria, carregarSlide
const carregarGaleria = (imgs) => imgs.forEach(criarItem)

const criarSlide = (urlImagem,indice,arr) => {
    const container = document.querySelector(".slide-container") // pegando do html
    const novaDiv = document.createElement("div")
    novaDiv.classList.add("slide")
    novaDiv.id = pegarId(urlImagem)

    //fazendo uma variavel e fazendo o teste, indiceAnterior
    const indiceAnterior = indice <= 0? arr.length - 1 : indice -1
    const idAterior = pegarId(arr[indiceAnterior])

     //fazendo uma variavel e fazendo o teste, indiceProximo
    const indiceProximo = indice >= arr.length -1 ? 0 : indice +1
    const idProximo = pegarId(arr[indiceProximo])
    novaDiv.innerHTML = ` 
    <div class="imagem-container">
         <a href="#" class="fechar"> &#10006;</a>
         <a href="#${idAterior}" class="navegacao anterior">&#171;</a>
         <img src="${urlImagem}">
        <a href="#${idProximo}" class="navegacao proximo">&#187; </a>
        </div>  
`
container.appendChild(novaDiv) //appendchild colocando o conteudo dentro do container
}
const carregarSlide =(imgs) => imgs.forEach(criarSlide)

// chamando a função carregarGaleria,carregarSlide
// carregarGaleria(imagens)

// carregarSlide(imagens)

// quando a pessoa pesquisar, 5 passo
 document.querySelector('.pesquisa-container input').addEventListener('keypress', pesquisarImagens);