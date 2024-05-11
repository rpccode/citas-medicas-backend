import { Company } from 'src/configuration/company/entities/company.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserRol } from '../user_rol/entities/user_rol.entity';

@Entity({ name: 'usuarios' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Company)
  @Column({ name: 'empresaId' })
  empresa: string;

  @Column('text', {
    unique: true,
  })
  nombre: string;

  @Column('text', {
    unique: true,
  })
  correo: string;

  @Column('text')
  clave: string;

  @Column('text', { nullable: true })
  token: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => UserRol, (userRol) => userRol.usuario)
  roles: UserRol[];
}
