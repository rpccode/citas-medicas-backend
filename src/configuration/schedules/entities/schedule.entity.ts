import { Company } from "src/configuration/company/entities/company.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: 'horarios' })
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Company)
    @Column({ name: 'empresaid' })
    empresaId: string;
  
    @Column({ name: 'medicoid' })
    medicoId: number;
  
    @Column({ name: 'fecha_atencion' })
    fechaAtencion: Date;
  
    @Column({ name: 'inicio_atencion' })
    inicioAtencion: string;
  
    @Column({ name: 'fin_atencion' })
    finAtencion: string;
  
    @Column({ default: true })
    activo: boolean;
  
    @Column({ name: 'fecha_registro', default: () => 'CURRENT_TIMESTAMP' })
    fechaRegistro: Date;
  
    @Column({ name: 'usuario_registro', length: 25 })
    usuarioRegistro: string;
  
    @Column({ name: 'fecha_modificacion', nullable: true })
    fechaModificacion: Date;
  
    @Column({ name: 'usuario_modificacion', length: 25, nullable: true })
    usuarioModificacion: string;

}
