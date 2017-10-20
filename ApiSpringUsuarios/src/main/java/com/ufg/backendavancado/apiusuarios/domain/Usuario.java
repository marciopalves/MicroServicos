package com.ufg.backendavancado.apiusuarios.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
public class Usuario {

	@JsonInclude(Include.NON_NULL)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@JsonInclude(Include.NON_NULL)
	private String nome;
	@JsonInclude(Include.NON_NULL)
	private String cpf;
	@JsonInclude(Include.NON_NULL)
	private String email;
	@JsonInclude(Include.NON_NULL)
	private String telefone;
	@JsonInclude(Include.NON_NULL)
	private Date nasciemto;
	@JsonInclude(Include.NON_NULL)
	//@OneToMany(mappedBy="Usuario")
	@Transient
	private List<Atividade>ativiades;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTelefone() {
		return telefone;
	}
	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	public Date getNasciemto() {
		return nasciemto;
	}
	public void setNasciemto(Date nasciemto) {
		this.nasciemto = nasciemto;
	}
	public List<Atividade> getAtiviades() {
		return ativiades;
	}
	public void setAtiviades(List<Atividade> ativiades) {
		this.ativiades = ativiades;
	}
	
	public Usuario() {}
	
	public Usuario(String nome) {
		this.nome = nome;
		
	}
}
