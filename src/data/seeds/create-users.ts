import { Role } from "../../auth/domain/models/Role";
import { AppDataSource } from '../../config/dataSource';

export async function createUsers() {
  const userRepository = AppDataSource.getRepository(Role);;

  const roles = [
    { name: 'Cliente' },
    {name:'Admin'},
  ];

  for (const role of roles) {
    await userRepository.save(role);
  }

}
