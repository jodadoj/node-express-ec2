DROP TABLE IF EXISTS donations;

CREATE TABLE donations (
    donationID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userID UUID NOT NULL REFERENCES users(userID),
    payment_method NOT NULL varchar(20),
    donation_amount NOT NULL numeric(10, 2),
  	donation_time TIMESTAMP DEFAULT current_timestamp 
);








