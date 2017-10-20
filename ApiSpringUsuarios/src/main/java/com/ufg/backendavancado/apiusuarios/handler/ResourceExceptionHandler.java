package com.ufg.backendavancado.apiusuarios.handler;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ufg.backendavancado.apiusuarios.domain.DetalhesErro;
import com.ufg.backendavancado.apiusuarios.services.exceptions.UsuarioNaoEncontradoException;

@ControllerAdvice
public class ResourceExceptionHandler {

	@ExceptionHandler(UsuarioNaoEncontradoException.class)
	public ResponseEntity<DetalhesErro> handlerUsuarioNaoEncontradoException(UsuarioNaoEncontradoException e, HttpServletRequest request){
	
		DetalhesErro erro = new DetalhesErro();
		erro.setStatus(404);
		erro.setTitulo("Usuário não pode ser encontrado!");
		erro.setMensagemDesenvolvedor("http://erros/ApiSpringUsuarios.com/404");// Pagina que detalha o erro
		erro.setTimestamp(System.currentTimeMillis());
				
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);	
	}
}
