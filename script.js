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
function sortear(){let n;do{n=Math.floor(Math.random()*reflexoes.length)}while(n===atual&&reflexoes.length>1);atual=n;categoria.textContent=reflexoes[n].c;mensagem.textContent=reflexoes[n].t}
nova.addEventListener("click",sortear);sortear();

const chave="alemMaternidadePalavras";
const iniciais=["apoio","trajetória","competências","oportunidade"];
function carregar(){try{return JSON.parse(localStorage.getItem(chave))||[]}catch{return[]}}
function normalizar(v){return v.trim().replace(/\s+/g," ").slice(0,24)}
function desenhar(){
 const dados=carregar(), cont={};
 [...iniciais,...dados].forEach(p=>{let k=p.toLocaleLowerCase("pt-BR");cont[k]=(cont[k]||0)+1});
 cloud.innerHTML="";
 Object.entries(cont).sort((a,b)=>b[1]-a[1]).forEach(([p,n])=>{
   const s=document.createElement("span");s.textContent=p;s.style.fontSize=(16+Math.min(n,5)*5)+"px";cloud.appendChild(s);
 });
}
wordForm.addEventListener("submit",e=>{
 e.preventDefault();const p=normalizar(palavra.value);
 if(!p){feedback.textContent="Digite uma palavra.";return}
 if(p.length<2){feedback.textContent="Digite uma palavra com pelo menos 2 letras.";return}
 const d=carregar();d.push(p);localStorage.setItem(chave,JSON.stringify(d.slice(-100)));
 palavra.value="";feedback.textContent="Obrigada por deixar sua reflexão.";desenhar();
});
desenhar();