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

INSERT INTO UserAccount (Username, Fullname, Role, Password, DriveFolder, IsActive)
VALUES ('admin', 'admin', 'admin', CONVERT(VARBINARY(MAX), 'admin'), NULL, 1);

CREATE TABLE UserListRegister (
    ID IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(30),
    QuestionRecord NVARCHAR(MAX)
);

CREATE TABLE Notification (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(30),
    Title NVARCHAR(250),
    Message NVARCHAR(500),
    IsRead BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE UploadedDocument (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(30),
    Title NVARCHAR(250),
    FileName NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Post (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(30),
    Title NVARCHAR(250),
    Content NVARCHAR(MAX),
    Image VARCHAR(MAX) DEFAULT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
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

ALTER TABLE Notification
ADD CONSTRAINT NotificationUserReference
FOREIGN KEY (Username)
REFERENCES UserAccount (Username);

ALTER TABLE UploadedDocument
ADD CONSTRAINT UploadedDocumentUserReference
FOREIGN KEY (Username)
REFERENCES UserAccount (Username);

