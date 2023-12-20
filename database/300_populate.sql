INSERT INTO users (first_name, last_name, address)
VALUES ('Sesame', 'Seeds', '100 Bun Road, London, SW2 5UM, UK');

INSERT INTO users (first_name, last_name, address)
VALUES ('Candy', 'Cane', '63 Gumdrop Close, London, E10 0UT, UK');

INSERT INTO users (first_name, last_name, address)
VALUES ('Cheese', 'Burger', '66 Ketchup Drive, London, NW2 4UW, UK');

WITH seeds_id AS (SELECT userID FROM users WHERE first_name = 'Sesame' AND last_name = 'Seeds')
INSERT INTO donations (userID, payment_method, donation_amount)
VALUES ( (SELECT userID FROM seeds_id), 'American Express', 20.00);

WITH cane_id AS (SELECT userID FROM users WHERE first_name = 'Candy' AND last_name = 'Cane')
INSERT INTO donations (userID, payment_method, donation_amount)
VALUES ( (SELECT userID FROM cane_id), 'PayPal', 100.00);

WITH burger_id AS (SELECT userID FROM users WHERE first_name = 'Candy' AND last_name = 'Cane')
INSERT INTO donations (userID, payment_method, donation_amount)
VALUES ( (SELECT userID FROM burger_id), 'Visa', 200.00);