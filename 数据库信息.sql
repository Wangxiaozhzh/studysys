-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: admin
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `uid` varchar(2048) DEFAULT NULL,
  `homework` text,
  `typeId` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'测试课程1','dasjaksd13kjhlkjlk','完成课上所有练习','3'),(2,'ios第一课','dsidhsdhud','完成课上练习','2'),(4,'web第一课','dsidhsdhu121d','完成课上练习','6'),(7,'测试基础02','test121','完成课上练习','3'),(8,'ios第2课','update111','完成课上的练习','2'),(9,'ios第3课','dsdsdsdsdsd','dsdsds','2'),(10,'web第2课','dssdsdsd','dsdsds','6'),(15,'ewewewsdsds','wangzhzh','dsdsdsd','2'),(24,'1234567','2134','123456','2'),(28,'ios第5课','121','test','2'),(29,'js第一课','sdsdsd','完成课上作业','24'),(30,'html第一课','dsndskdksnds','dskdnsd','23'),(31,'react01','sddsd','dsdsd','26'),(32,'android01','1212','211','12'),(33,'实战','wewewe','sdsds','13'),(34,'vue01','dsdsd','dsd','14'),(35,'vue02','dsdsd','dsdsdsd','14'),(36,'python01','wangzhzh','lihoiu','15'),(37,'angular01','dsdsd','dsds','17'),(38,'爬虫01','iu8232y832','dsdds','20'),(39,'bootstrap01','dsds','dsdsd','21'),(40,'css01','dsdsd','dsdd','22'),(41,'ts01','ewewe','wewwe','27'),(42,'vue 01','12121212','哈哈','17'),(43,'bootstrap03','898293283','dsdd','21'),(44,'ts031212','323232323fdf','sdsdsds','27'),(45,'pachong023','2wewe','ewew','20');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_type`
--

DROP TABLE IF EXISTS `course_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_type`
--

LOCK TABLES `course_type` WRITE;
/*!40000 ALTER TABLE `course_type` DISABLE KEYS */;
INSERT INTO `course_type` VALUES (2,'ios自动化测试'),(3,'理论基础'),(6,'web自动化测试'),(12,'android自动化测试'),(13,'实战项目'),(14,'vue'),(15,'python'),(17,'angular'),(20,'爬虫'),(21,'bootstrap'),(22,'css'),(23,'html'),(24,'js'),(26,'react'),(27,'ts');
/*!40000 ALTER TABLE `course_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interview`
--

DROP TABLE IF EXISTS `interview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interview` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` varchar(128) NOT NULL,
  `interview_date` datetime NOT NULL,
  `interview_type` varchar(128) NOT NULL,
  `remarks` varchar(800) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview`
--

LOCK TABLES `interview` WRITE;
/*!40000 ALTER TABLE `interview` DISABLE KEYS */;
INSERT INTO `interview` VALUES (1,'1','2020-01-21 19:51:53','2121','dsdsdsdsd'),(2,'32','2020-01-21 19:52:03','2121','dsdsdsdsd'),(3,'36','2020-01-22 20:56:56','test','test'),(4,'35','2020-01-23 21:04:53','wewe','wqwqw'),(5,'32','2020-01-24 21:05:25','测试','ewew'),(6,'1','2020-01-25 21:08:00','ewewe','WEWE'),(7,'1','2020-01-16 21:11:29','测试','dsdsd'),(8,'36','2020-01-17 21:17:07','2323','3232'),(9,'35','2020-01-08 21:18:18','ewewe','ewewe'),(10,'36','2020-01-09 21:20:55','3232','3233'),(11,'35','2020-01-07 21:26:25','3233','232'),(12,'35','2020-01-16 21:34:24','3233','32323'),(13,'32','2020-01-17 21:36:36','3232','323'),(14,'36','2020-01-15 21:39:24','wewe','ewew'),(15,'36','2020-01-14 21:40:21','212122','212'),(16,'36','2020-01-23 21:44:27','2122','21212'),(17,'35','2020-01-03 21:44:41','21212','212'),(18,'36','2019-12-27 21:45:18','测试','3232'),(19,'35','2020-01-01 21:48:17','ewewe','ewew'),(20,'35','2020-02-03 20:07:23','测试','dsdsd'),(21,'35','2020-02-12 20:07:50','dsds','sds'),(22,'35','2020-02-12 20:08:21','weewe','weee'),(23,'1','2020-03-11 15:19:15','测试','这里是备注信息'),(24,'38','2020-03-12 15:22:14','test','test'),(26,'49','2020-03-10 16:12:45','21212','21212'),(27,'48','2020-03-19 16:14:11','ewew','ewewe'),(28,'49','2020-03-13 21:53:41','212122','21212'),(30,'44','2020-03-14 13:48:54','测试','dsdsdsds'),(31,'52','2020-03-12 14:32:03','hanhan','dsdsd'),(32,'32','2020-03-12 21:45:36','测试','ewewe'),(35,'53','2020-03-18 21:23:10','测试','21212'),(37,'44','2020-03-20 01:59:08','eweweewe','ewew'),(38,'55','2020-03-18 01:59:21','ewewe','ewew'),(40,'44','2020-03-21 20:51:38','测试','dsds'),(41,'45','2020-03-22 20:51:56','dsdsd','sdsds'),(42,'58','2020-03-22 21:54:06','eweweew','ewewe'),(43,'62','2020-03-21 21:40:03','测试','fggfgg'),(44,'62','2020-04-02 14:04:57','ewewe','wewewe'),(45,'61','2020-03-30 14:06:40','测试','ewewe'),(46,'63','2020-03-31 14:07:00','测试','1212'),(47,'64','2020-04-03 21:05:35','测试','2112'),(48,'64','2020-04-28 03:12:47','测试','北京时间下午6点'),(49,'64','2020-04-29 03:13:20','测试','北京时间下午6点'),(50,'63','2020-05-01 18:55:35','测试','testsye');
/*!40000 ALTER TABLE `interview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `student_name` varchar(128) NOT NULL,
  `student_type` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `update_date` datetime DEFAULT NULL,
  `password` varchar(128) DEFAULT '123456',
  `adress` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'admin',1,1,'2020-01-10 20:22:19','123456','新西兰'),(32,'eric',2,1,'2020-03-12 13:55:11','123456','新西兰'),(35,'glad',2,1,'2020-01-15 21:44:55','123456','国内'),(38,'wangzhzh',1,1,'2020-03-09 21:19:25','123456','国内'),(44,'wzz',2,1,'2020-03-10 14:06:21','123456','澳洲'),(45,'sdsdsds',1,1,'2020-03-10 15:09:29','123456','新西兰'),(46,'sdsdsdsdsdsd',1,1,'2020-03-10 15:09:31','123456','新西兰'),(47,'憨憨',2,1,'2020-03-13 00:52:05','123456','新西兰'),(49,'dsdsdsds',1,1,'2020-03-10 15:09:53','123456','国内'),(53,'铁憨憨',2,1,'2020-03-16 14:01:08','123456','澳洲'),(54,'xiaowang',1,1,'2020-03-15 23:18:50','123456','加拿大'),(55,'rick',1,1,'2020-03-16 14:46:48','123456','澳洲'),(56,'green',2,1,'2020-03-18 02:10:19','123456','加拿大'),(57,'text',1,1,'2020-03-27 21:04:02','123456','国内'),(58,'huipei',2,9,'2020-03-19 19:48:54','123456','国内'),(61,'shawn',2,29,'2020-03-20 16:19:04','123456','国内'),(62,'laji',2,31,'2020-03-20 21:38:44','123456','国内'),(63,'lip',1,32,'2020-03-20 21:39:28','123456','国内'),(64,'jenney@student.com',1,1,'2020-04-29 18:43:11','123456','澳洲');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_type`
--

DROP TABLE IF EXISTS `student_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_type`
--

LOCK TABLES `student_type` WRITE;
/*!40000 ALTER TABLE `student_type` DISABLE KEYS */;
INSERT INTO `student_type` VALUES (1,'测试'),(2,'开发');
/*!40000 ALTER TABLE `student_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL DEFAULT '123456',
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (1,'glad','admin',1),(2,'admin','admin',1),(4,'wangzhzh','admin',1),(5,'wz','123456',1);
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-12 18:39:43
