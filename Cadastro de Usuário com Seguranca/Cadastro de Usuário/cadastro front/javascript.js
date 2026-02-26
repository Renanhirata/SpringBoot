console.log("JS carregado com sucesso!");

document.addEventListener("DOMContentLoaded", function () {

  const paginaAtual = window.location.pathname.split("/").pop();

  // =========================
  // PROTEÇÃO + USUÁRIO LOGADO
  // =========================
  if (paginaAtual === "usuarios.html") {
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (!usuarioLogado) {
      alert("Você precisa fazer login!");
      window.location.href = "login2.html";
      return;
    }

    const usuario = JSON.parse(usuarioLogado);

    // Mostrar nome
    const nomeSpan = document.getElementById("nomeUsuario");
    if (nomeSpan) {
      nomeSpan.textContent = "Olá, " + usuario.nome;
    }

    // Mostrar perfil
    const perfilSpan = document.getElementById("perfilUsuario");
    if (perfilSpan) {
      perfilSpan.textContent = usuario.perfil || "USER";
    }

    // Botão Sair
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
      btnLogout.addEventListener("click", function () {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "login2.html";
      });
    }

    carregarUsuarios();
  }

  // =========================
  // LOGIN
  // =========================
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;
      const errorMsg = document.getElementById("errorMsg");

      if (errorMsg) errorMsg.textContent = "";

      fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Email ou senha inválidos");
        }
        return response.json();
      })
      .then(usuario => {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        alert("Bem-vindo " + usuario.nome);
        window.location.href = "usuarios.html";
      })
      .catch(error => {
        if (errorMsg) {
          errorMsg.textContent = error.message;
        } else {
          alert(error.message);
        }
      });
    });
  }

  // =========================
  // CADASTRO
  // =========================
  const cadastroForm = document.getElementById("cadastro");

  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (event) {
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
        if (!response.ok) {
          throw new Error("Erro ao salvar usuário");
        }
        return response.json();
      })
      .then(() => {
        alert("Usuário salvo com sucesso!");
        localStorage.removeItem("usuarioLogado");
        cadastroForm.reset();
        window.location.href = "login2.html";
      })
      .catch(error => {
        alert(error.message);
      });
    });
  }

});


// =========================
// CARREGAR USUÁRIOS
// =========================
function carregarUsuarios() {

  fetch("http://localhost:8080/usuarios")
    .then(response => response.json())
    .then(usuarios => {
      const tabela = document.getElementById("tabelaUsuarios");
      if (!tabela) return;

      tabela.innerHTML = "";

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


// =========================
// EXCLUIR
// =========================
function excluirUsuario(id) {

  if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

  fetch(`http://localhost:8080/usuarios/${id}`, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao excluir usuário");
    }
    alert("Usuário excluído com sucesso!");
    carregarUsuarios();
  })
  .catch(error => {
    alert(error.message);
  });
}


// =========================
// EDITAR (BÁSICO)
// =========================
function editarUsuario(id) {
  alert("Função de editar usuário ID: " + id);
}