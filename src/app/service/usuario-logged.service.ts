import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLoggedService {

  private usuarioKey = 'usuario';
  private isLoginKey = 'isLogin';

  constructor() { }

  // Método auxiliar para verificar si localStorage está disponible
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Métodos para obtener los valores
  getUsuario(): Usuario {
    if (this.isLocalStorageAvailable()) {
      const usuarioJson = localStorage.getItem(this.usuarioKey);
      return usuarioJson ? JSON.parse(usuarioJson) : null;
    }
    return new Usuario();
  }

  getIsLogin(): boolean {
    if (this.isLocalStorageAvailable()) {
      const isLogin = localStorage.getItem(this.isLoginKey);
      return isLogin ? JSON.parse(isLogin) : false;
    }
    return false;
  }

  // Métodos para actualizar los valores
  setUsuario(usuario: Usuario): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.usuarioKey, JSON.stringify(usuario));
    }
  }

  setIsLogin(isLogin: boolean): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.isLoginKey, JSON.stringify(isLogin));
    }
  }

  // Método para limpiar la información al cerrar sesión
  clear(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.usuarioKey);
      localStorage.removeItem(this.isLoginKey);
    }
  }

}
