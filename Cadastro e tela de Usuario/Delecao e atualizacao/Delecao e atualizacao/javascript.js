// CARREGAR USUÁRIOS AO ABRIR PÁGINA

console.log("JS carregado com sucesso!");

document.addEventListener("DOMContentLoaded", function () {
  carregarUsuarios();
});

// FUNÇÃO PARA BUSCAR USUÁRIOS

function carregarUsuarios() {
  fetch("http://localhost:8080/usuarios")
    .then(response => response.json())
    .then(usuarios => {
      const tabela = document.getElementById("tabelaUsuarios");
      tabela.innerHTML = ""; // limpa antes de preencher

      usuarios.forEach(usuario => {
        const linha = `
          <tr>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.perfil || "USER"}</td>
            <td>${usuario.cidade}</td>
            <td>
              <button class="btn-edit" onclick="editarUsuario(${usuario.id})">Editar</button>
              <button class="btn-del" onclick="excluirUsuario(${usuario.id})">Excluir</button>
            </td>
          </tr>
        `;

        tabela.insertAdjacentHTML("beforeend", linha);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar usuários:", error);
    });
}


// CADASTRAR USUÁRIO

document.getElementById("cadastro").addEventListener("submit", function (event) {
  event.preventDefault();

  const data = {
    nome: this.nome.value,
    email: this.email.value,
    senha: this.senha.value,
    endereco: this.endereco.value,
    bairro: this.bairro.value,
    cep: this.cep.value,
    cidade: this.cidade.value,
    estado: this.estado.value
  };

  fetch("http://localhost:8080/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        alert("Usuário salvo com sucesso!");
        this.reset();
        carregarUsuarios(); // atualiza tabela
        window.location.href = "visualizacao.html";
      } else {
        alert("Erro ao salvar usuário");
      }
      
    })
    .catch(error => {
      alert("Erro na conexão: " + error.message);
    });
});

// EXCLUIR USUÁRIO

function excluirUsuario(id) {
  if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

  fetch(`http://localhost:8080/usuarios/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      if (response.ok) {
        alert("Usuário excluído com sucesso!");
        carregarUsuarios();
      } else {
        alert("Erro ao excluir usuário");
      }
    })
    .catch(error => {
      console.error("Erro ao excluir:", error);
    });
}

// EDITAR USUÁRIO (BÁSICO)

function editarUsuario(id) {
  alert("Função de editar usuário ID: " + id);
  // Aqui você pode abrir modal ou redirecionar para tela de edição
}