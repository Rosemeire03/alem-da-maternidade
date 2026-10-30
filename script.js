const reflexoes=[
"A maternidade pode transformar o caminho sem diminuir o talento.",
"Ser mãe não apaga conhecimentos, experiências ou competências construídas ao longo da trajetória.",
"Uma trajetória profissional pode mudar de direção sem perder o seu valor.",
"Maternidade e vida profissional podem fazer parte da mesma história.",
"Reconhecer competências também é uma forma de reconhecer a própria trajetória.",
"Nem toda pausa significa um fim. Às vezes, ela faz parte de um novo caminho.",
"Cada mulher pode viver a maternidade e a trajetória profissional de uma forma diferente.",
"O próximo passo profissional não precisa ser igual para todas.",
"Experiências vividas também podem ajudar a construir novos caminhos profissionais.",
"Olhar para a própria trajetória é também perceber o que já foi construído.",
"Novos caminhos podem começar pelo reconhecimento do que você já sabe e já viveu.",
"Por trás de cada currículo existe uma trajetória que não cabe inteira em uma página."
];let atual=-1;const m=document.getElementById("mensagem");function sortear(){let n;do{n=Math.floor(Math.random()*reflexoes.length)}while(reflexoes.length>1&&n===atual);atual=n;m.textContent=reflexoes[n]}document.getElementById("nova").addEventListener("click",sortear);sortear();