import { Company } from "src/configuration/company/entities/company.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";


@Entity({ name: 'usuarios' })
export class User {
    @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Company)
  @Column({ name: 'empresaid' })
  empresaId: string;

  @Column('text',{
    unique:true
  })
  nombre: string;

  @Column('text',{
    unique:true
  })
  correo: string;

  @Column('text')
  clave: string;

  @Column({ default: true })
  activo: boolean;
}
