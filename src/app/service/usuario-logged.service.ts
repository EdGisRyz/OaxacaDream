import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLoggedService {

  private usuarioKey = 'usuario';
  private isLoginKey = 'isLogin';

  constructor() { }

  // Métodos para obtener los valores
  getUsuario(): Usuario {
    const usuarioJson = localStorage.getItem(this.usuarioKey);
    return usuarioJson ? JSON.parse(usuarioJson) : null;
  }

  getIsLogin(): boolean {
    const isLogin = localStorage.getItem(this.isLoginKey);
    return isLogin ? JSON.parse(isLogin) : false;
  }

  // Métodos para actualizar los valores
  setUsuario(usuario: Usuario): void {
    localStorage.setItem(this.usuarioKey, JSON.stringify(usuario));
  }

  setIsLogin(isLogin: boolean): void {
    localStorage.setItem(this.isLoginKey, JSON.stringify(isLogin));
  }

  // Método para limpiar la información al cerrar sesión
  clear(): void {
    localStorage.removeItem(this.usuarioKey);
    localStorage.removeItem(this.isLoginKey);
  }
}