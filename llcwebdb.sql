-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: llcwebdb
-- ------------------------------------------------------
-- Server version	5.7.14-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `application_customer`
--

DROP TABLE IF EXISTS `application_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application_customer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `application_id` int(11) NOT NULL,
  `citrus_seller_id` int(10) DEFAULT '0',
  `customer_name` varchar(40) NOT NULL,
  `customer_shortname` varchar(10) NOT NULL,
  `customerType` enum('Individual','Group','Chain','None') DEFAULT NULL,
  `parentcustomer_id` int(11) NOT NULL,
  `customer_country_code` varchar(5) DEFAULT '91',
  `customer_mobile_number` varchar(11) NOT NULL,
  `customer_country` varchar(20) DEFAULT 'India',
  `customer_city` varchar(100) DEFAULT 'Bangalore',
  `customer_zip` varchar(20) DEFAULT '560008',
  `customer_country_iso_code` varchar(5) DEFAULT 'IN',
  `customer_email99` varchar(80) DEFAULT NULL,
  `customer_passwd99` varchar(80) NOT NULL,
  `customer_location_latitude` float(10,6) DEFAULT '0.000000',
  `customer_location_longitude` float(10,6) DEFAULT '0.000000',
  `utm_source` varchar(200) DEFAULT NULL,
  `utm_medium` varchar(200) DEFAULT NULL,
  `utm_campign` varchar(200) DEFAULT NULL,
  `utm_term` varchar(200) DEFAULT NULL,
  `utm_content` varchar(200) DEFAULT NULL,
  `app_version` varchar(20) DEFAULT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_date` date NOT NULL,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(50) NOT NULL,
  `updated_date` date NOT NULL,
  `updated_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `csid` (`citrus_seller_id`),
  KEY `fk_app_id_idx` (`application_id`),
  CONSTRAINT `fk_appcust_app_id` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_customer`
--

LOCK TABLES `application_customer` WRITE;
/*!40000 ALTER TABLE `application_customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `application_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application_modules`
--

DROP TABLE IF EXISTS `application_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application_modules` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `application_id` int(11) NOT NULL,
  `module_name` varchar(100) NOT NULL,
  `module_title` varchar(50) DEFAULT NULL,
  `module_path` varchar(250) DEFAULT NULL,
  `load_children` varchar(250) NOT NULL,
  `module_data` varchar(500) NOT NULL,
  `data_icon` varchar(250) NOT NULL,
  `module_parentid` int(11) NOT NULL,
  `disp_sequence` int(11) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `isread` tinyint(1) NOT NULL DEFAULT '1',
  `isdenied` tinyint(1) NOT NULL DEFAULT '1',
  `createdby` varchar(250) NOT NULL,
  `createdon` date NOT NULL,
  `lastupdatedby` varchar(250) NOT NULL,
  `lastupdatedon` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_appmod_app_id_idx` (`application_id`),
  CONSTRAINT `fk_appmod_app_id` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_modules`
--

LOCK TABLES `application_modules` WRITE;
/*!40000 ALTER TABLE `application_modules` DISABLE KEYS */;
/*!40000 ALTER TABLE `application_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application_role_module`
--

DROP TABLE IF EXISTS `application_role_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application_role_module` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `application_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `module_id` int(11) NOT NULL,
  `role_module_name` varchar(100) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `createdby` varchar(250) NOT NULL,
  `createdon` date NOT NULL,
  `lastupdatedby` varchar(250) NOT NULL,
  `lastupdatedon` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `appid` (`application_id`),
  KEY `roleid` (`role_id`),
  KEY `moduleid` (`module_id`),
  CONSTRAINT `fk_approlemod_app_id` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_role_module`
--

LOCK TABLES `application_role_module` WRITE;
/*!40000 ALTER TABLE `application_role_module` DISABLE KEYS */;
/*!40000 ALTER TABLE `application_role_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application_seller`
--

DROP TABLE IF EXISTS `application_seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application_seller` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `application_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `seller_shop_name` varchar(100) DEFAULT NULL,
  `about_seller` varchar(3000) DEFAULT '',
  `mobile_alias` varchar(10) DEFAULT NULL,
  `seller_device_id` varchar(300) DEFAULT NULL,
  `seller_location_latitude` float(10,6) DEFAULT '0.000000',
  `seller_location_longitude` float(10,6) DEFAULT '0.000000',
  `seller_kyc_doc_type` varchar(20) DEFAULT NULL,
  `seller_kyc_doc_value` varchar(40) DEFAULT NULL,
  `business_type` varchar(100) NOT NULL DEFAULT 'eCommerce',
  `business_category` varchar(25) DEFAULT '',
  `is_deleted` int(2) DEFAULT '0',
  `created_by` varchar(50) NOT NULL,
  `created_date` date NOT NULL,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(50) NOT NULL,
  `updated_date` date NOT NULL,
  `updated_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile_alias_UNIQUE` (`mobile_alias`),
  KEY `cloc` (`seller_location_latitude`,`seller_location_longitude`),
  KEY `ctime` (`updated_time`),
  KEY `es_bc` (`business_category`),
  KEY `idx_isdl` (`is_deleted`),
  KEY `fk_appseller_app_id_idx` (`application_id`),
  CONSTRAINT `fk_appseller_app_id` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_seller`
--

LOCK TABLES `application_seller` WRITE;
/*!40000 ALTER TABLE `application_seller` DISABLE KEYS */;
/*!40000 ALTER TABLE `application_seller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applicationroles`
--

DROP TABLE IF EXISTS `applicationroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applicationroles` (
  `Application_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `RoleType` enum('eCommerce','Restaurant','FreeAirTV','None') DEFAULT NULL,
  `RoleName` varchar(256) NOT NULL,
  `RoleShortName` varchar(256) DEFAULT NULL,
  `Description` varchar(256) DEFAULT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `CreatedBy` varchar(250) NOT NULL,
  `CreatedOn` date NOT NULL,
  `LastUpdatedBy` varchar(250) NOT NULL,
  `LastUpdatedOn` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_approles_app_id_idx` (`Application_id`),
  CONSTRAINT `fk_approles_app_id` FOREIGN KEY (`Application_id`) REFERENCES `applications` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicationroles`
--

LOCK TABLES `applicationroles` WRITE;
/*!40000 ALTER TABLE `applicationroles` DISABLE KEYS */;
/*!40000 ALTER TABLE `applicationroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ApplicationName` varchar(256) NOT NULL,
  `ApplicationShortName` varchar(256) NOT NULL,
  `Description` varchar(256) DEFAULT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `CreatedBy` varchar(250) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastUpdatedBy` varchar(250) NOT NULL,
  `LastUpdatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ApplicationName_UNIQUE` (`ApplicationName`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applicationuser`
--

DROP TABLE IF EXISTS `applicationuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applicationuser` (
  `Application_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UserType` enum('Super','Admin','User','None') DEFAULT NULL,
  `UserName` varchar(256) NOT NULL,
  `UserShortName` varchar(256) DEFAULT NULL,
  `Country` varchar(100) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `Zip` varchar(20) DEFAULT NULL,
  `Country_IsoCode` varchar(5) DEFAULT NULL,
  `Device_mac` varchar(500) NOT NULL,
  `MobileAlias` varchar(16) DEFAULT NULL,
  `IsAnonymous` tinyint(1) NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `CreatedBy` varchar(250) NOT NULL,
  `CreatedOn` date NOT NULL,
  `LastUpdatedBy` varchar(250) NOT NULL,
  `LastUpdatedOn` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_appuser_app_id_idx` (`Application_id`),
  CONSTRAINT `fk_appuser_app_id` FOREIGN KEY (`Application_id`) REFERENCES `applications` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicationuser`
--

LOCK TABLES `applicationuser` WRITE;
/*!40000 ALTER TABLE `applicationuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `applicationuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assigned_user_rolemodule`
--

DROP TABLE IF EXISTS `assigned_user_rolemodule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assigned_user_rolemodule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_module_id` int(11) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `createdby` varchar(250) NOT NULL,
  `createdon` date NOT NULL,
  `lastupdatedby` varchar(250) NOT NULL,
  `lastupdatedon` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`user_id`),
  KEY `roleid` (`role_module_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assigned_user_rolemodule`
--

LOCK TABLES `assigned_user_rolemodule` WRITE;
/*!40000 ALTER TABLE `assigned_user_rolemodule` DISABLE KEYS */;
/*!40000 ALTER TABLE `assigned_user_rolemodule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `category_description` text,
  `seller_id` int(11) NOT NULL,
  `category_image` varchar(1000) NOT NULL DEFAULT '',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_by` varchar(255) DEFAULT '',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(255) DEFAULT '',
  `updated_on` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,'category_name','category_description',1,'category_image',1,'created_by','2017-05-24 15:15:06','updated_by','2017-05-24 15:31:45');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_subcategory`
--

DROP TABLE IF EXISTS `product_subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_subcategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subcategory_name` varchar(100) NOT NULL,
  `subcategory_decription` text,
  `category_id` int(11) NOT NULL,
  `subcategory_image` varchar(1000) DEFAULT '',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_by` varchar(100) DEFAULT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(100) DEFAULT NULL,
  `updated_on` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_subcategory`
--

LOCK TABLES `product_subcategory` WRITE;
/*!40000 ALTER TABLE `product_subcategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  `product_name` varchar(140) NOT NULL,
  `product_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `discount_rate` decimal(10,2) DEFAULT '0.00',
  `product_descripton` text,
  `product_image` varchar(1000) NOT NULL DEFAULT '',
  `product_size_text` varchar(50) DEFAULT NULL,
  `product_size_number` int(11) NOT NULL DEFAULT '0',
  `product_color` varchar(50) DEFAULT NULL,
  `image1` varchar(1000) NOT NULL DEFAULT '',
  `image2` varchar(1000) NOT NULL DEFAULT '',
  `image3` varchar(1000) NOT NULL DEFAULT '',
  `image4` varchar(1000) NOT NULL DEFAULT '',
  `image5` varchar(1000) NOT NULL DEFAULT '',
  `image6` varchar(1000) NOT NULL DEFAULT '',
  `image7` varchar(1000) NOT NULL DEFAULT '',
  `image8` varchar(1000) NOT NULL DEFAULT '',
  `image9` varchar(1000) NOT NULL DEFAULT '',
  `image10` varchar(1000) NOT NULL DEFAULT '',
  `is_removed` tinyint(1) NOT NULL DEFAULT '1',
  `pod` tinyint(1) NOT NULL DEFAULT '1',
  `add_to_cart` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-25 12:22:52
