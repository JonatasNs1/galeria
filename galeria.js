"use strict"

// criar um array, mas só que ele não existe, fazendo a função do back-end
const imagens = [
   "./img/imagem1.png",
    "./img/imagem2.png",
    "./img/imagem3.png",
    "./img/imagem4.png",
    "./img/imagem5.png",
    "./img/imagem6.png",
    "./img/imagem7.png",
    "./img/imagem4.png"

]


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
carregarGaleria(imagens)

carregarSlide(imagens)