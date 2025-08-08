// src/api/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7118/api'
});

// —— Boletas ——
export const getBoletas     = () => api.get<Boleta[]>('/Boletas');
export const getBoletaById  = (id: number) => api.get<Boleta>(`/Boletas/${id}`);
export const createBoleta   = (b: {
  numero: string;
  fechaEmision: string;
  empresa: string;
  monto: number;
}) => api.post<Boleta>('/Boletas', b);
export const updateBoleta   = (id: number, b: {
  id: number;
  numero: string;
  fechaEmision: string;
  empresa: string;
  monto: number;
}) => api.put<Boleta>(`/Boletas/${id}`, b);
export const deleteBoleta   = (id: number) => api.delete(`/Boletas/${id}`);

// —— Roles ——
export const getRoles       = () => api.get<Role[]>('/Roles');
export const getRoleById    = (id: number) => api.get<Role>(`/Roles/${id}`);
export const createRole     = (r: { nombre: string }) => api.post<Role>('/Roles', r);
export const updateRole     = (id: number, r: { id: number; nombre: string }) =>
  api.put<Role>(`/Roles/${id}`, r);
export const deleteRole     = (id: number) => api.delete(`/Roles/${id}`);

// —— Usuarios ——
export const getUsuarios    = () => api.get<Usuario[]>('/Usuarios');
export const getUsuarioById = (id: number) => api.get<Usuario>(`/Usuarios/${id}`);
export const createUsuario  = (u: { nombre: string; rolId: number }) =>
  api.post<Usuario>('/Usuarios', u);
export const updateUsuario  = (id: number, u: { id: number; nombre: string; rolId: number }) =>
  api.put<Usuario>(`/Usuarios/${id}`, u);
export const deleteUsuario  = (id: number) => api.delete(`/Usuarios/${id}`);

export default api;

// —— Interfaces para tipado ——

// Boleta
export interface Boleta {
  id: number;
  numero: string;
  fechaEmision: string; // ISO date string
  empresa: string;
  monto: number;
}

// Rol
export interface Role {
  id: number;
  nombre: string;
  usuarios: Usuario[];
}

// Usuario
export interface Usuario {
  id: number;
  nombre: string;
  rolId: number;
  rol: Role;
}
