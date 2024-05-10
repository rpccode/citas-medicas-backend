import { Company } from "src/configuration/company/entities/company.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";


@Entity({ name: 'especialidades' })
export class Specialty {
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company)
  @Column({ name: 'empresaid' })
  empresaId: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ name: 'fecha_registro', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;

  @Column({ name: 'fecha_modificacion', nullable: true })
  fechaModificacion: Date;

  @Column({ name: 'usuario_registro', length: 25 })
  usuarioRegistro: string;

  @Column({ name: 'usuario_modificacion', length: 25, nullable: true })
  usuarioModificacion: string;

  @Column({ default: true })
  activo: boolean;
}
