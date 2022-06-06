CREATE DATABASE jwttutorial;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255), user_email VARCHAR(255),
    user_password VARCHAR(255)
    );

