import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { Role } from 'src/interfaces/auth.interface';

const userSchema = z.object({
  name: z.string().min(3).max(255),
  password: z.string().min(6).max(255),
  userName: z.string().min(3).max(255),
  role: z.nativeEnum(Role),
});

export class UserDto extends createZodDto(userSchema) {}
