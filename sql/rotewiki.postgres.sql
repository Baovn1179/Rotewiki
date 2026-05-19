-- Tạo database (PostgreSQL không tự dùng USE, cần connect trực tiếp)
-- CREATE DATABASE Rotewiki;

-- Bảng UserAccount
CREATE TABLE UserAccount (
    Username VARCHAR(30) PRIMARY KEY,
    Fullname VARCHAR(255),
    Role VARCHAR(10),
    Password BYTEA, -- VARBINARY(MAX) => BYTEA
    DriveFolder VARCHAR(255),
    IsActive BOOLEAN
);

-- Bảng Post
CREATE TABLE Post (
    ID SERIAL PRIMARY KEY, -- INT IDENTITY(1,1) => SERIAL
    Username VARCHAR(30),
    Title VARCHAR(250),
    Content TEXT,          -- NVARCHAR(MAX) => TEXT
    Image VARCHAR(255) DEFAULT NULL
);

-- Bảng Comment
CREATE TABLE Comment (
    ID SERIAL PRIMARY KEY,  -- INT IDENTITY(1,1) => SERIAL
    Username VARCHAR(30),
    PostID INT,
    ReplyComment INT NULL,  -- Self-referencing
    Content TEXT,
    CONSTRAINT Comment_Reply_FK FOREIGN KEY (ReplyComment)
        REFERENCES Comment(ID)
        ON DELETE SET NULL
);

-- Khóa ngoại
ALTER TABLE Post
ADD CONSTRAINT PostUserReference
FOREIGN KEY (Username)
REFERENCES UserAccount (Username)
ON DELETE CASCADE;

ALTER TABLE Comment
ADD CONSTRAINT CommentUserReference
FOREIGN KEY (Username)
REFERENCES UserAccount (Username)
ON DELETE CASCADE;

ALTER TABLE Comment
ADD CONSTRAINT CommentPostReference
FOREIGN KEY (PostID)
REFERENCES Post(ID)
ON DELETE CASCADE;