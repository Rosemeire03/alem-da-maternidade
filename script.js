const firebaseConfig = {
  apiKey: "AIzaSyDxccwIImYktPtxK3Wlg8gtxth1-2BUIP60",
  authDomain: "alem-da-maternidade.firebaseapp.com",
  databaseURL: "https://alem-da-maternidade-default-rtdb.firebaseio.com",
  projectId: "alem-da-maternidade",
  storageBucket: "alem-da-maternidade.firebasestorage.app",
  messagingSenderId: "280550637561",
  appId: "1:280550637561:web:206d79d1340d9c2c5fc728"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const palavrasRef = db.ref("palavras");

const reflexoes=[
{c:"Para refletir",t:"A maternidade pode transformar caminhos, mas não apaga talentos."},
{c:"Para reconhecer",t:"Ser mãe não apaga os conhecimentos, as experiências e as competências construídas ao longo da trajetória."},
{c:"Para lembrar",t:"A maternidade pode mudar a trajetória profissional sem apagar tudo o que já foi construído."},
{c:"Para refletir",t:"Nem toda mulher vive a maternidade e a vida profissional da mesma forma."},
{c:"Para seguir",t:"O próximo passo profissional não precisa ser igual para todas."},
{c:"Para reconhecer",t:"Reconhecer o que você sabe fazer também é reconhecer o valor da sua trajetória."},
{c:"Para lembrar",t:"Uma pausa na vida profissional não apaga as experiências que vieram antes dela."},
{c:"Para seguir",t:"Às vezes, o próximo passo começa olhando para tudo o que você já construiu."},
{c:"Para reconhecer",t:"Sua trajetória profissional é feita de experiências, conhecimentos, competências e também de mudanças."},
{c:"Para refletir",t:"Existem diferentes caminhos profissionais. O importante é pensar em qual deles faz sentido para a sua realidade."},
{c:"Para reconhecer",t:"Quem você é profissionalmente não cabe apenas em um currículo."},
{c:"Para lembrar",t:"Mãe e profissional podem fazer parte da mesma trajetória."}
];

let atual=-1;
const categoria=document.getElementById("categoria");
const mensagem=document.getElementById("mensagem");
const nova=document.getElementById("nova");
const wordForm=document.getElementById("wordForm");
const palavra=document.getElementById("palavra");
const feedback=document.getElementById("feedback");
const cloud=document.getElementById("cloud");

function sortear(){
  let n;
  do{n=Math.floor(Math.random()*reflexoes.length)}while(n===atual&&reflexoes.length>1);
  atual=n;
  categoria.textContent=reflexoes[n].c;
  mensagem.textContent=reflexoes[n].t;
}
nova.addEventListener("click",sortear);
sortear();

function normalizar(v){
  return v.trim().replace(/\s+/g," ").slice(0,24);
}

function desenharCloud(dados){
  const cont={};
  dados.forEach(item=>{
    if(!item || typeof item.palavra!=="string") return;
    const original=normalizar(item.palavra);
    if(!original) return;
    const chave=original.toLocaleLowerCase("pt-BR");
    if(!cont[chave]) cont[chave]={texto:original,total:0};
    cont[chave].total++;
  });

  cloud.innerHTML="";
  const itens=Object.values(cont).sort((a,b)=>b.total-a.total || a.texto.localeCompare(b.texto,"pt-BR"));

  if(!itens.length){
    const vazio=document.createElement("span");
    vazio.textContent="Seja a primeira pessoa a deixar uma palavra.";
    vazio.style.fontSize="16px";
    cloud.appendChild(vazio);
    return;
  }

  const maior=Math.max(...itens.map(i=>i.total));
  itens.forEach(item=>{
    const s=document.createElement("span");
    s.textContent=item.texto;
    const escala=maior===1 ? 0 : (item.total-1)/(maior-1);
    s.style.fontSize=(17 + escala*19)+"px";
    s.title=item.total+" contribuição"+(item.total>1?"ões":"");
    cloud.appendChild(s);
  });
}

palavrasRef.on("value", snapshot=>{
  const valor=snapshot.val() || {};
  desenharCloud(Object.values(valor));
}, erro=>{
  console.error(erro);
  cloud.textContent="Não foi possível carregar a nuvem neste momento.";
});

wordForm.addEventListener("submit", async e=>{
  e.preventDefault();
  const p=normalizar(palavra.value);

  if(p.length<2){
    feedback.textContent="Digite uma palavra com pelo menos 2 caracteres.";
    return;
  }

  const botao=wordForm.querySelector("button");
  botao.disabled=true;
  feedback.textContent="Enviando...";

  try{
    const novo=palavrasRef.push();
    await novo.set({
      palavra:p,
      criadoEm:firebase.database.ServerValue.TIMESTAMP
    });
    palavra.value="";
    feedback.textContent="Obrigada por deixar sua reflexão.";
  }catch(err){
    console.error(err);
    feedback.textContent="Não foi possível enviar agora. Tente novamente.";
  }finally{
    botao.disabled=false;
  }
});
