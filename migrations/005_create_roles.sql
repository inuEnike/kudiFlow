CREATE TYPE user_roles AS ENUM (
    'super_admin',
    'admin',
    'user'
);
CREATE TABLE IF NOT EXISTS auth.roles (
    id SERIAL PRIMARY KEY,
    role user_roles DEFAULT 'user', 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)