package com.ufg.backendavancado.apiusuarios.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.ufg.backendavancado.apiusuarios.domain.Usuario;
import com.ufg.backendavancado.apiusuarios.repository.UsuarioRepository;
import com.ufg.backendavancado.apiusuarios.services.exceptions.UsuarioNaoEncontradoException;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository repository;
	
	public List<Usuario> listar(){
		return repository.findAll();		
	}
	
	public Usuario busca(Long id) {
		Usuario usuario = repository.findOne(id);
		if (usuario == null) {
			throw new UsuarioNaoEncontradoException("Usuário não pode ser encontrado!");
		}
		return usuario;
	}
	
	public Usuario salvar(Usuario usuario) {
		usuario.setId(null);
		return  repository.save(usuario);
	}
	
	public void deletar(Long id) {
		try {
			repository.delete(id);
		}catch(EmptyResultDataAccessException e) {
			throw new UsuarioNaoEncontradoException("Usuário não pode ser encontrado!");
		}
	}
	
	public void atualiza(Usuario usuario) {
		verificarExistencia(usuario);
		repository.save(usuario);
	}
	
	private void verificarExistencia(Usuario usuario) {
		busca(usuario.getId());
	}
}
