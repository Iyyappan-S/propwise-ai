CREATE TABLE `analyses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`propertyId` int NOT NULL,
	`result` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analyses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `comparisons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`propertyIds` json NOT NULL,
	`recommendation` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `comparisons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`address` text,
	`latitude` double NOT NULL,
	`longitude` double NOT NULL,
	`areaType` enum('Urban','Suburban','Semi-Rural','Rural') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`locationId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`propertyType` varchar(80) NOT NULL,
	`category` varchar(40) NOT NULL,
	`areaSqft` double NOT NULL,
	`bedrooms` int,
	`bathrooms` int,
	`propertyAge` int,
	`roadAccess` varchar(40),
	`facing` varchar(20),
	`parking` int,
	`amenities` json,
	`sourceUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `properties_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `savedProperties` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`propertyId` int NOT NULL,
	`notes` text,
	`tags` json,
	`favorite` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `savedProperties_id` PRIMARY KEY(`id`)
);
