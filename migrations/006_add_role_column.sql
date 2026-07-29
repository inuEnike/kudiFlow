
ALTER TABLE auth.user
ADD COLUMN role INT REFERENCES auth.roles(id)