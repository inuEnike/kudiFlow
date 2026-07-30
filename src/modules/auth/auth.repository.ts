import type postgres from "postgres";
import type { AuthRequestDTO, User } from "./auth.dto";

export class AuthRepository {
  constructor(private repository: postgres.Sql) {}

  /*
    Promise<User | null> => Resolves to a Promise that is either User or null 
  */
  findUserByEmail = async (email: string): Promise<User | null> => {
    /*
      The rows returned from this query have the shape of User.
    */
    const [user] = await this.repository<User[]>`
        SELECT * 
        FROM auth.user
        WHERE email = ${email}
    `;
    return user ?? null;
  };

  createUser = async (data: AuthRequestDTO): Promise<User | null> => {
    const [user] = await this.repository<User[]>`
      INSERT INTO auth.user (first_name, last_name, email, phone)
      VALUES (${data.first_name},${data.last_name},${data.email},${data.phone})
      RETURNING *
    `;
    return user ?? null;
  };

  updateIsVerified = async (
    is_verified: boolean,
    email: string,
  ): Promise<User | null> => {
    const [user] = await this.repository<User[]>`
      UPDATE auth.user
      SET is_verified = ${is_verified}
      WHERE email = ${email}
      RETURNING *
    `;

    return user ?? null;
  };

  getAllUsers = async () => {
    const [user] = await this.repository<User[]>`
        SELECT * FROM auth.user
    `;
    return user;
  };
  findUserById = async (id: number) => {
    const [user] = await this.repository<User[]>`
        SELECT * 
        FROM auth.user
        WHERE id = ${id}
      `;
    return user;
  };
}
