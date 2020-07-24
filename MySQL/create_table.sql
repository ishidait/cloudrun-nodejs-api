CREATE TABLE `todo`.`todos` (
  `todos_id` INT NOT NULL AUTO_INCREMENT,
  `content` NVARCHAR(1000) NOT NULL,
  `done` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`todos_id`));


INSERT INTO `todo`.`todos` (`content`, `done`) VALUES ('Test todo', 1);
INSERT INTO `todo`.`todos` (`content`) VALUES ('ミルクを買う');
INSERT INTO `todo`.`todos` (`content`) VALUES ('散髪をする');
