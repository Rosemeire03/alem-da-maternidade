const reflexoes = [
  { categoria: "Para refletir", texto: "A maternidade pode transformar caminhos, mas não apaga talentos." },
  { categoria: "Para reconhecer", texto: "Ser mãe não apaga os conhecimentos, as experiências e as competências construídas ao longo da trajetória." },
  { categoria: "Para lembrar", texto: "A maternidade pode mudar a trajetória profissional sem apagar tudo o que já foi construído." },
  { categoria: "Para refletir", texto: "Nem toda mulher vive a maternidade e a vida profissional da mesma forma." },
  { categoria: "Para seguir", texto: "O próximo passo profissional não precisa ser igual para todas." },
  { categoria: "Para reconhecer", texto: "Reconhecer o que você sabe fazer também é reconhecer o valor da sua trajetória." },
  { categoria: "Para lembrar", texto: "Uma pausa na vida profissional não apaga as experiências que vieram antes dela." },
  { categoria: "Para seguir", texto: "Às vezes, o próximo passo começa olhando para tudo o que você já construiu." },
  { categoria: "Para reconhecer", texto: "Sua trajetória profissional é feita de experiências, conhecimentos, competências e também de mudanças." },
  { categoria: "Para refletir", texto: "Existem diferentes caminhos profissionais. O importante é pensar em qual deles faz sentido para a sua realidade." },
  { categoria: "Para reconhecer", texto: "Quem você é profissionalmente não cabe apenas em um currículo." },
  { categoria: "Para lembrar", texto: "Mãe e profissional podem fazer parte da mesma trajetória." }
];

let atual = -1;
const mensagem = document.getElementById("mensagem");
const categoria = document.getElementById("categoria");

function sortear() {
  let novo;
  do {
    novo = Math.floor(Math.random() * reflexoes.length);
  } while (reflexoes.length > 1 && novo === atual);

  atual = novo;
  categoria.textContent = reflexoes[novo].categoria;
  mensagem.textContent = reflexoes[novo].texto;
}

document.getElementById("nova").addEventListener("click", sortear);
sortear();
