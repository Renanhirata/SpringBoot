package com.devSenai2A.cadastro.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.devSenai2A.cadastro.entities.Usuario;
import com.devSenai2A.cadastro.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    // Injetar o encoder (igual o professor pediu)
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public List<Usuario> listarTodos(){
        return repository.findAll();
    }

    // =========================
    // CADASTRAR (COM BCRYPT)
    // =========================
    public Usuario cadastrar(Usuario usuario) {
        // senha criptografada
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return repository.save(usuario);
    }

    // =========================
    // ATUALIZAR
    // =========================
    public Usuario atualizar(Long id, Usuario dados) {

        Usuario usuario = repository.findById(id).orElse(null);

        if (usuario == null) {
            return null;
        }

        usuario.setNome(dados.getNome());
        usuario.setEmail(dados.getEmail());

        // Se enviar nova senha, criptografa novamente
        if (dados.getSenha() != null && !dados.getSenha().isEmpty()) {
            usuario.setSenha(passwordEncoder.encode(dados.getSenha()));
        }

        usuario.setPerfil(dados.getPerfil());
        usuario.setEndereco(dados.getEndereco());
        usuario.setBairro(dados.getBairro());
        usuario.setComplemento(dados.getComplemento());
        usuario.setCep(dados.getCep());
        usuario.setCidade(dados.getCidade());
        usuario.setEstado(dados.getEstado());

        return repository.save(usuario);
    }

    // =========================
    // DELETAR
    // =========================
    public boolean deletar(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }

    // =========================
    // LOGIN (IGUAL AO PROFESSOR)
    // =========================
    public Usuario login(String email, String senha) {

        Usuario usuario = repository.findByEmail(email);

        if (usuario == null) {
            return null;
        }

        // Validar senha com bcrypt
        if (!passwordEncoder.matches(senha, usuario.getSenha())) {
            return null;
        }

        return usuario;
    }
}