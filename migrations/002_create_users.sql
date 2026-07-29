CREATE TYPE user_status AS ENUM (
    'active', 
    'inactive',
    'suspended',
    'deleted'
);
CREATE TABLE IF NOT EXISTS auth.user (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(13) NOT NULL,
    password_hash VARCHAR NOT NULL CHECK (LENGTH(password_hash) >= 7),
    is_verified BOOLEAN DEFAULT false,
    status user_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);