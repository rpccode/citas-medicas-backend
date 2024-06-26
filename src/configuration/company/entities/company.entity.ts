import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: 'configuracion_empresa' })
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'nombre_empresa', unique: true})
    nombreEmpresa: string;
  
    @Column({ nullable: true })
    direccion: string;
  
    @Column({ name: 'telefono', unique: true})
    telefono: string;
  
    @Column({ name: 'correo_electronico', unique: true })
    correoElectronico: string;
  
    @Column({ type: 'bytea', nullable: true })
    logotipo: Buffer;
  
    @Column({ name: 'otros_detalles', nullable: true })
    otrosDetalles: string;
  
    @Column({ default: true })
    activo: boolean;
  
    @Column({ name: 'fecha_registro', default: () => 'CURRENT_TIMESTAMP' })
    fechaRegistro: Date;
}
