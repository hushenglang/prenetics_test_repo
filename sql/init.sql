# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: prenetics.c0a606cyly1w.us-west-1.rds.amazonaws.com (MySQL 5.7.16-log)
# Database: prenetics
# Generation Time: 2017-09-17 08:22:12 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

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
  `update_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `email`, `first_name`, `last_name`, `password`, `salt`, `date_birth`, `policy_code`, `create_date`, `update_date`)
VALUES
	(1,'hushenglang@gmail.com','joe','hu','sha1$e5ad088a$1$0cacb09400817216bb001d0a19f73e85c19ae583','JhhHxulocGlKahsTQPIGnb8u8H7yuiiM4Z2RcyehhVAX9nBdb5A9RczEXBMlL20BvMKTm+o5Fd6AgeJEN9o7MgTWcvdeMa3ok077PAxOlbIXZO9T8Tjr7WYC1l58/sUML42dcneZd1Hq3lIuWg8cEv1NlaAeBUOPpWrQrhWEDJE=','1980-01-01','888888','2017-09-16 08:43:04','2017-09-16 23:26:42'),
	(2,'jackma@gmail.com','jack','ma','sha1$64e1bf3e$1$a40346ae70489600d22d89a732e572893e54008c','iHO5mqNI8Kj+u1wpLx6HopBy3SeR/zd4icoNRnlMW0pqG2AlGwIlNz8vE3LI/tIcaH6On3AqqG1lYehulB753CL6V5dzEEuJ+IoJdbH0JmDMxhk5mg4dTW6CaXQmIsThmfAvKYsKeakdUDE6ArC0aCZxzKvlqJoN19Tqx4B+BUI=','1970-07-01','888888','2017-09-16 08:43:04','2017-09-16 23:30:52');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_genetic
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_genetic`;

CREATE TABLE `user_genetic` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `genetic_result` json DEFAULT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user_genetic` WRITE;
/*!40000 ALTER TABLE `user_genetic` DISABLE KEYS */;

INSERT INTO `user_genetic` (`id`, `user_id`, `genetic_result`, `create_date`, `update_date`)
VALUES
	(1,1,'{"result": "Good condition", "suggestion": "Keep diet and sports", "tester_age": "31", "create_date": "2017/09/17", "tester_name": "JoeHu", "issue_organization": "Prenetics"}','2017-09-16 08:43:04','2017-09-17 03:06:33'),
	(2,2,'{"result": "Best condition", "suggestion": "More sports", "tester_age": "50", "create_date": "2017/08/17", "tester_name": "JackMa", "issue_organization": "Prenetics"}','2017-09-16 08:43:05','2017-09-17 03:06:45');

/*!40000 ALTER TABLE `user_genetic` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
