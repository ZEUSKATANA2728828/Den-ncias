let denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];

function mostrar(id){
  document.querySelectorAll(".box").forEach(b=>b.style.display="none");
  document.getElementById(id).style.display="block";
}

function salvar(){
  localStorage.setItem("denuncias", JSON.stringify(denuncias));
}

function enviarDenuncia(){
  let d = {
    id: Date.now(),
    nick: nick.value,
    acusado: acusado.value,
    motivo: motivo.value,
    desc: desc.value,
    status:"Em análise"
  };
  denuncias.push(d);
  salvar();
  alert("Denúncia enviada!");
}

function atualizarMinhas(){
  let box = document.getElementById("minhas");
  if(!box) return;
  box.innerHTML = "<h2>Minhas Denúncias</h2>";
  denuncias.forEach(d=>{
    box.innerHTML += `<div class='denuncia'>
      <b>${d.acusado}</b> - ${d.motivo}<br>Status: ${d.status}
    </div>`;
  });
}

function atualizarStatus(){
  let box = document.getElementById("status");
  if(!box) return;
  box.innerHTML = "<h2>Status</h2>";
  denuncias.forEach(d=>{
    box.innerHTML += `<div class='denuncia'>
      ${d.acusado} → ${d.status}
    </div>`;
  });
}

function login(){
  if(user.value=="adm123" && pass.value=="adm456"){
    loginBox.style.display="none";
    painel.style.display="block";
    atualizarADM();
  } else alert("Login inválido");
}

function atualizarADM(){
  let lista = document.getElementById("lista");
  if(!lista) return;
  lista.innerHTML="";
  denuncias.forEach(d=>{
    lista.innerHTML+=`
      <div class='denuncia'>
      <b>${d.acusado}</b> - ${d.motivo}<br>${d.desc}<br>Status:${d.status}<br>
      <button onclick="setStatus(${d.id},'Aceita')">Aceitar</button>
      <button onclick="setStatus(${d.id},'Rejeitada')">Rejeitar</button>
      <button onclick="setStatus(${d.id},'Resolvida')">Resolver</button>
      </div>
    `;
  });
}

function setStatus(id, st){
  let d = denuncias.find(x=>x.id==id);
  d.status=st;
  salvar();
}

setInterval(()=>{
  denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];
  atualizarMinhas();
  atualizarStatus();
  atualizarADM();
},5000);
