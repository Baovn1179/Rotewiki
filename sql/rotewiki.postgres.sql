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

INSERT INTO UserAccount (Username, Fullname, Role, Password, DriveFolder, IsActive)
VALUES ('admin', 'admin', 'admin', decode(md5('admin'), 'hex'), NULL, TRUE);

CREATE TABLE UserListRegister (
    ID INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Username VARCHAR(30),
    QuestionRecord TEXT
);

CREATE TABLE Notification (
    ID INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Username VARCHAR(30),
    Title VARCHAR(250),
    Message TEXT,
    IsRead BOOLEAN DEFAULT FALSE,
    CreatedAt TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE UploadedDocument (
    ID INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Username VARCHAR(30),
    Title VARCHAR(250),
    FileName VARCHAR(255),
    CreatedAt TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE Post (
    ID INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Username VARCHAR(30),
    Title VARCHAR(250),
    Content TEXT,
    Image TEXT DEFAULT NULL,
    CreatedAt TIMESTAMPTZ DEFAULT NOW()
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

ALTER TABLE Notification
ADD CONSTRAINT NotificationUserReference
FOREIGN KEY (Username)
REFERENCES UserAccount (Username);

ALTER TABLE UploadedDocument
ADD CONSTRAINT UploadedDocumentUserReference
FOREIGN KEY (Username)
REFERENCES UserAccount (Username);