DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name NOT NULL varchar(50),
    last_name NOT NULL varchar(100),
    address NOT NULL varchar(200),
    date_joined DATE DEFAULT current_date
);






