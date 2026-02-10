document.getElementById('cadastro').addEventListener('submit', function(event) {
  event.preventDefault(); // evita que a página recarregue ao enviar o form

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

  fetch('http://localhost:8080/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      alert('Usuário salvo com sucesso!');
      this.reset(); // limpa o formulário após salvar
    } else {
      alert('Erro ao salvar usuário');
    }
  })
  .catch(error => {
    alert('Erro na conexão: ' + error.message);
  });
});
