CREATE TABLE IDCARD (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
    name VARCHAR(255) NOT NULL COMMENT 'Name',
    id_card_number VARCHAR(20) NOT NULL COMMENT 'ID Card Number',
    birth_date DATE NOT NULL COMMENT 'Birth Date',
    age INT COMMENT 'Age',
    email VARCHAR(255) COMMENT 'Email Address'
) COMMENT 'Table for storing ID card information';