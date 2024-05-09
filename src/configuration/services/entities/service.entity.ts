import { Company } from "src/configuration/company/entities/company.entity";
import { Specialty } from "src/configuration/specialty/entities/specialty.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";

@Entity({ name: 'serviciosofrecidos' })
export class Service {

    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Company)
    @Column({ name: 'empresaid' })
    empresaId: number;
  
    @Column()
    nombre: string;
  
    @Column({ nullable: true })
    descripcion: string;
  
    @ManyToOne(() => Specialty)
    @Column({ name: 'especialidad_id' })
    especialidadId: number;
  
    @Column({ type: 'numeric', precision: 10, scale: 2 })
    costo: number;
  
    @Column({ name: 'duracion_estimada', type: 'interval', precision: 6, nullable: true })
    duracionEstimada: string;
  
    @Column({ default: true })
    activo: boolean;
  
    @Column({ name: 'fecharegistro', default: () => 'CURRENT_TIMESTAMP' })
    fechaRegistro: Date;
}
