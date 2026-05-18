CREATE DATABASE Rotewiki;

USE Rotewiki;

CREATE TABLE UserAccount (
    Username VARCHAR(30) PRIMARY KEY,
    Fullname VARCHAR(255),
    Password VARBINARY(MAX),
    DriveFolder VARCHAR(255),
    IsActive BOOLEAN
);


CREATE TABLE Post (
    ID INT PRIMARY KEY,
    Username VARCHAR(30)
);

