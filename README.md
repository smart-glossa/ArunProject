Arun Account Project

Installation Steps:

Create database "arun"
Create the following tables in the "bill" database.
Add Tomcat catalina.properties mysql username and password mysql.username=root mysql.password=root
mysql Table :1

User Table:

CREATE TABLE reg ( name varchar(100) default NULL, user varchar(100) default NULL, password varchar(50) default NULL ) ENGINE=InnoDB DEFAULT CHARSET=latin1

bill table:

CREATE TABLE bill ( billno varchar(50) NOT NULL, sales int(11) default NULL, paid int(11) default NULL, prin int(11) default NULL, credit int(11) default NULL, shortt int(11) default NULL, ex int(11) default NULL, dates varchar(200) default NULL, cdate date default NULL, tot int(11) default NULL, PRIMARY KEY (billno) ) ENGINE=InnoDB DEFAULT CHARSET=latin1 oldbill table :

CREATE TABLE oldbill ( billno varchar(100) default NULL, sales int(50) default NULL, paid int(50) default NULL, prin int(50) default NULL, credit int(50) default NULL, shortt int(50) default NULL, ex int(50) default NULL, dates varchar(100) default NULL, cdate date default NULL, tot int(50) default NULL, KEY billno (billno), CONSTRAINT oldbill_ibfk_1 FOREIGN KEY (billno) REFERENCES bill (billno) ON DELETE CASCADE ) ENGINE=InnoDB DEFAULT CHARSET=latin1

alter table bill add(cdate date,tot int);
