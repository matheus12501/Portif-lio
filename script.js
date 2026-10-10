document.getElementById("temaBtn").onclick=function(){
 var claro=document.documentElement.classList.toggle("claro");
 localStorage.setItem("tema",claro?"claro":"escuro");
};
var menu=document.getElementById("menu");
var menuBtn=document.getElementById("menuBtn");
menuBtn.onclick=function(){menuBtn.setAttribute("aria-expanded",menu.classList.toggle("aberto"))};
menu.onclick=function(){menu.classList.remove("aberto");menuBtn.setAttribute("aria-expanded","false")};

var frases=["Estudante de tecnologia.","Apaixonado por hardware.","Aprendendo programação."];
var f=0,c=0,apagando=false,alvo=document.getElementById("digita");
function digitar(){
 var frase=frases[f];
 alvo.textContent=frase.slice(0,c);
 if(!apagando&&c<frase.length){c++}
 else if(!apagando){apagando=true;setTimeout(digitar,1200);return}
 else if(c>0){c--}
 else{apagando=false;f=(f+1)%frases.length}
 setTimeout(digitar,apagando?40:80);
}
digitar();

var obs=new IntersectionObserver(function(lista){
 lista.forEach(function(e){if(e.isIntersecting){e.target.classList.add("visivel");obs.unobserve(e.target)}});
},{threshold:0.15});
document.querySelectorAll(".reveal").forEach(function(el){obs.observe(el)});

var linksMenu=document.querySelectorAll("nav a");
var obsMenu=new IntersectionObserver(function(lista){
 lista.forEach(function(e){
  if(e.isIntersecting){linksMenu.forEach(function(a){a.classList.toggle("ativo",a.getAttribute("href")==="#"+e.target.id)})}
 });
},{rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("section").forEach(function(s){obsMenu.observe(s)});

document.querySelectorAll(".pasta>button").forEach(function(b){
 b.onclick=function(){b.setAttribute("aria-expanded",b.parentElement.classList.toggle("aberta"))};
});

var fundo=document.getElementById("fundo");
function abrir(titulo,texto,img){
 document.getElementById("mTitulo").textContent=titulo;
 document.getElementById("mTexto").textContent=texto;
 var i=document.getElementById("mImg");
 i.hidden=!img;
 if(img){i.src=img}
 fundo.classList.add("aberto");
 document.getElementById("fechar").focus();
}
document.querySelectorAll(".cert").forEach(function(b){
 b.onclick=function(){abrir(b.dataset.nome,"Curso concluído na Cisco Networking Academy, com certificado verificado.",b.querySelector("img").src)};
});
document.getElementById("fechar").onclick=function(){fundo.classList.remove("aberto")};
fundo.onclick=function(e){if(e.target===fundo)fundo.classList.remove("aberto")};
document.onkeydown=function(e){if(e.key==="Escape")fundo.classList.remove("aberto")};

document.getElementById("tel").oninput=function(){
 var n=this.value.replace(/\D/g,"").slice(0,11);
 if(n.length>10)n=n.replace(/(\d{2})(\d{5})(\d{4})/,"($1) $2-$3");
 else if(n.length>6)n=n.replace(/(\d{2})(\d{4})(\d{0,4})/,"($1) $2-$3");
 else if(n.length>2)n=n.replace(/(\d{2})(\d*)/,"($1) $2");
 this.value=n;
};

function erro(campo,texto){
 campo.classList.toggle("erro",texto!=="");
 campo.nextElementSibling.textContent=texto;
 return texto==="";
}
document.getElementById("form").oninput=function(e){erro(e.target,"")};
document.getElementById("form").onsubmit=function(e){
 e.preventDefault();
 var nome=document.getElementById("nome"),tel=document.getElementById("tel"),
     email=document.getElementById("email"),texto=document.getElementById("texto");
 var ok=true;
 ok=erro(nome,nome.value.trim().length<3?"Digite seu nome completo.":"")&&ok;
 ok=erro(tel,tel.value.replace(/\D/g,"").length<10?"Digite um telefone com DDD.":"")&&ok;
 ok=erro(email,/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)?"":"Digite um e-mail válido.")&&ok;
 ok=erro(texto,texto.value.trim().length<10?"Escreva pelo menos 10 caracteres.":"")&&ok;
 if(!ok)return;
 abrir("Mensagem validada","Todos os campos estão corretos. Obrigado pelo contato!");
 this.reset();
};
