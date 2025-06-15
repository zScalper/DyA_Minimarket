import { Component } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { UsuarioDTO } from '../../../../models/usuario.dto';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listar',
  imports: [CommonModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {
  usuarios: UsuarioDTO[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe({
      next: (data) => {
        console.log('Usuarios cargados:', data); 
        this.usuarios = data;
      },
      error: (err) => console.error('Error al cargar usuarios:', err)
    });

  }

  editarUsuario(id: number): void {
    this.router.navigate(['dashboard/administracion/usuarios/editar', id]);
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarioService.eliminar(id).subscribe(() => {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
      });
    }
  }
}
