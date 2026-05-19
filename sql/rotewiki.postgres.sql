CREATE DATABASE rotewiki;

-- Kết nối vào database trước rồi chạy tiếp

CREATE TABLE UserAccount (
    Username VARCHAR(30) PRIMARY KEY,
    Fullname VARCHAR(255),
    Role VARCHAR(10),
    Password BYTEA,
    DriveFolder VARCHAR(255),
    IsActive BOOLEAN
);

CREATE TABLE UserListRegister (
    ID INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Username VARCHAR(30),
    QuestionRecord TEXT
);

CREATE TABLE Post (
    ID INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Username VARCHAR(30),
    Title VARCHAR(250),
    Content TEXT,
    Image TEXT DEFAULT NULL
);

CREATE TABLE Comment (
    ID INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Username VARCHAR(30),
    PostID INTEGER,
    ReplyComment INTEGER,
    Content TEXT
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
FOREIGN KEY (ReplyComment)
REFERENCES Comment (ID);

ALTER TABLE UserListRegister
ADD CONSTRAINT UsernameReference
FOREIGN KEY (Username)
REFERENCES UserAccount (Username);