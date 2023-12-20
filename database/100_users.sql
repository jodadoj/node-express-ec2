DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name varchar(50) NOT NULL,
    last_name varchar(100) NOT NULL,
    address varchar(200) NOT NULL,
    date_joined DATE DEFAULT current_date
);






