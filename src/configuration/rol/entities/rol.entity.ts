import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'roles' })
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @Column({ nullable: true })
    descripcion: string;
  
    @Column({ default: true })
    activo: boolean;
}
