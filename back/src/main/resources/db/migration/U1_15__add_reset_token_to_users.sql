ALTER TABLE users
DROP COLUMN if exists reset_token;
ALTER TABLE users
DROP COLUMN if exists reset_token_lifetime;
