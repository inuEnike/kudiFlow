export interface AuthResponseDTO {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_verified: boolean;
  created_at: Date;
}
export interface AuthRequestDTO {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface VerifyTokenDTO{
  token: string,
  email: string
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_verified: boolean;
  status: "active" | "inactive" | "suspended" | "deleted";
  created_at: Date;
  updated_at: Date;
}
