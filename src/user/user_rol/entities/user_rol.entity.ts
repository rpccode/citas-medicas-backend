import { Company } from "src/configuration/company/entities/company.entity";
import { Rol } from "src/configuration/rol/entities/rol.entity";
import { User } from "src/user/entities/user.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";

@Entity({ name: 'usuarios_roles' })
export class UserRol {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Company)
    @Column({ name: 'empresaid' })
    empresaId: string;
  
    @ManyToOne(() => User)
    @Column({ name: 'usuarioid' })
    usuarioId: string;
  
    @ManyToOne(() => Rol)
    @Column({ name: 'rolid' })
    rolId: number;
  
    @Column({ default: true })
    activo: boolean;
  }

