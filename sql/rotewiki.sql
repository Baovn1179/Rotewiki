CREATE DATABASE Rotewiki;

USE Rotewiki;

-- Quy ước dữ liệu:
-- ID của bài viết bắt đầu bằng số 1
-- ID của bình luận bắt đầu bằng số 2

CREATE TABLE UserAccount (
    Username VARCHAR(30) PRIMARY KEY,
    Fullname VARCHAR(255),
    Role VARCHAR(10),
    Password VARBINARY(MAX),
    DriveFolder VARCHAR(255),
    IsActive BIT
);

CREATE TABLE UserListRegister (
    ID IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(30),
    QuestionRecord NVARCHAR(MAX)
);

CREATE TABLE Post (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(30),
    Title NVARCHAR(250),
    Content NVARCHAR(MAX),
    Image VARCHAR(MAX) DEFAULT NULL
);

CREATE TABLE Comment (
    ID INT IDENTITY (1,1) PRIMARY KEY,
    Username VARCHAR(30),
    PostID INT,
    ReplyComment INT,
    Content NVARCHAR(MAX)
);

ALTER TABLE Post 
ADD CONSTRAINT PostUserReference
FOREIGN KEY (Username)
REFERENCES UserAccount (Username);

ALTER TABLE Comment
ADD CONSTRAINT CommentUserReference
FOREIGN KEY (Username)
REFERENCES UserAccount (Username);

ALTER TABLE Comment
ADD CONSTRAINT CommentPostReference
FOREIGN KEY (PostID)
REFERENCES Post (ID);

ALTER TABLE Comment
ADD CONSTRAINT CommentReplyReference
FOREIGN KEY (ID)
REFERENCES Comment (ID);

ALTER TABLE UserListRegister
ADD CONSTRAINT UsernameReference
FOREIGN KEY (Username)
REFERENCES UserAccount (Username);

