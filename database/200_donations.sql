DROP TABLE IF EXISTS donations;

CREATE TABLE donations (
    donationID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userID UUID REFERENCES users(userID) NOT NULL,
    payment_method varchar(20) NOT NULL,
    donation_amount numeric(10, 2) NOT NULL,
  	donation_time TIMESTAMP DEFAULT current_timestamp 
);








