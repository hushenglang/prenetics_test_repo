-- create user table --
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL COMMENT 'unique column',
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL COMMENT 'for usage of orignal password',
  `date_birth` date DEFAULT NULL,
  `policy_code` char(8) DEFAULT NULL COMMENT '8 fixed length column',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- create user genetic table --
-- not sure if user would have many genetic result, so for later extension use this one-to-many table to store genetic result data --
CREATE TABLE `user_genetic` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `genetic_result` json DEFAULT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- insert a few user for testing --
INSERT INTO user(email, first_name, last_name, password, salt, date_birth, policy_code)
VALUES('hushenglang@gmail.com', 'joe', 'hu', '123456', 'aaa', '1980-1-1', '888888');

INSERT INTO user(email, first_name, last_name, password, salt, date_birth, policy_code)
VALUES('jackma@gmail.com', 'jack', 'ma', '123456', 'aaa', '1980-1-1', '888888');

-- insert a few user' genetic result for testing --
INSERT INTO user_genetic(user_id, genetic_result)
VALUES(1, '{"col1": "good condition", "col2": "more sports"}');

INSERT INTO user_genetic(user_id, genetic_result)
VALUES(2, '{"col1": "best condition", "col2": "keep sports"}');