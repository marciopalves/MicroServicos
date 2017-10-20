package com.ufg.backendavancado.apiusuarios.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ufg.backendavancado.apiusuarios.domain.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long > {

}
