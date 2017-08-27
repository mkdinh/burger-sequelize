USE k9lh5pvos28ctily;

DROP TABLE IF EXISTS burgers_db;

CREATE TABLE burgers (
	id INT AUTO_INCREMENT,
    burger_name VARCHAR(50),
    devoured BOOLEAN DEFAULT false,
    avatar VARCHAR(1000),
    date datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

select * FROM burgers;

alter table burgers modify column;

DELETE FROM burgers WHERE I
