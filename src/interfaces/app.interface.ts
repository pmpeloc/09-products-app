export interface LoginData {
  correo: string;
  password: string;
}

export interface RegisterData {
  correo: string;
  password: string;
  nombre: string;
}

export interface LoginResponse {
  usuario: User;
  token: string;
}

export interface User {
  rol: string;
  estado: boolean;
  google: boolean;
  nombre: string;
  correo: string;
  uid: string;
  img?: string;
}
