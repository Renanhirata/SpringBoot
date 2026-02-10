package com.devSenai2a.SistemaCadastro.Entitys;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import org.springframework.data.annotation.Id;

@Entity
@Table(name = "usuarios")

public class Usuario {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    //@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String senha;
    private String perfil; // ADMIN ou USER
    private String endereco;
    private String bairro;
    private String complemento;
    private String cep;
    private String cidade;
    private String estado;
}