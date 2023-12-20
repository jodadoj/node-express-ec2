DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name varchar(50),
    last_name varchar(100),
    address varchar(200),
    date_joined DATE DEFAULT current_date
);






