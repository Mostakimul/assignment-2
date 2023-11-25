import { z } from 'zod';

const UserNameValidationSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
});

const AddressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: UserNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
});

export default UserValidationSchema;
