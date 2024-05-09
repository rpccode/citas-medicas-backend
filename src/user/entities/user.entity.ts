import { Company } from "src/configuration/company/entities/company.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";


@Entity({ name: 'usuarios' })
export class User {
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company)
  @Column({ name: 'empresaid' })
  empresaId: number;

  @Column()
  nombre: string;

  @Column()
  clave: string;

  @Column({ default: true })
  activo: boolean;
}
