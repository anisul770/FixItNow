import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";
import cors from "cors";

// src/module/users/user.route.ts
import { Router } from "express";

// src/module/users/user.service.ts
import bcrypt from "bcryptjs";

// src/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";

// src/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env")
});
var config_default = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  salt_rounds: process.env.BYCRPT_SALT_ROUNDS,
  app_url: process.env.APP_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  store_id: process.env.STORE_ID,
  store_passwd: process.env.STORE_PASSWD,
  is_live: process.env.IS_LIVE
};

// generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.9.1",
  "engineVersion": "e922089b7d7502aff4249d5da3420f6fa55fc6ad",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Availability {\n  id String @id @default(uuid())\n\n  technicianId String\n  technician   TechnicianProfile @relation(fields: [technicianId], references: [id], onDelete: Cascade)\n\n  date DateTime\n\n  startTime String\n  endTime   String\n\n  isBooked Boolean @default(false)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("availabilities")\n}\n\nmodel Booking {\n  id String @id @default(uuid())\n\n  customerId String\n  customer   User   @relation(fields: [customerId], references: [id], onDelete: Restrict)\n\n  technicianId String\n  technician   TechnicianProfile @relation(fields: [technicianId], references: [id], onDelete: Restrict)\n\n  serviceId String\n  service   Service @relation(fields: [serviceId], references: [id], onDelete: Restrict)\n\n  bookingDate DateTime\n\n  startTime String\n  endTime   String\n\n  address            String\n  problemDescription String?\n\n  totalPrice Float\n\n  status BookingStatus @default(REQUESTED)\n\n  payment Payment?\n  review  Review?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("bookings")\n}\n\nmodel Category {\n  id String @id @default(uuid())\n\n  name        String  @unique\n  description String?\n  icon        String?\n\n  services Service[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("categories")\n}\n\nenum Role {\n  ADMIN\n  CUSTOMER\n  TECHNICIAN\n}\n\nenum ActiveStatus {\n  ACTIVE\n  BLOCKED\n}\n\nenum BookingStatus {\n  REQUESTED\n  ACCEPTED\n  DECLINED\n  PAID\n  IN_PROGRESS\n  COMPLETED\n  CANCELLED\n}\n\nenum PaymentStatus {\n  PENDING\n  COMPLETED\n  FAILED\n  REFUNDED\n}\n\nenum PaymentProvider {\n  STRIPE\n  SSLCOMMERZ\n}\n\nmodel Payment {\n  id String @id @default(uuid())\n\n  bookingId String  @unique\n  booking   Booking @relation(fields: [bookingId], references: [id], onDelete: Restrict)\n\n  provider   PaymentProvider\n  methodType String?\n  method     String?\n\n  transactionId   String? @unique\n  paymentIntentId String? @unique\n\n  amount Float\n\n  status PaymentStatus @default(PENDING)\n\n  paidAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("payments")\n}\n\nmodel Profile {\n  id String @id @default(uuid())\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  profilePhoto String?\n  phone        String?\n  address      String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("profiles")\n}\n\nmodel Review {\n  id String @id @default(uuid())\n\n  bookingId String  @unique\n  booking   Booking @relation(fields: [bookingId], references: [id], onDelete: Restrict)\n\n  customerId String\n  customer   User   @relation(fields: [customerId], references: [id], onDelete: Restrict)\n\n  technicianId String\n  technician   TechnicianProfile @relation(fields: [technicianId], references: [id], onDelete: Restrict)\n\n  rating  Int\n  comment String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("reviews")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Service {\n  id String @id @default(uuid())\n\n  technicianId String\n  technician   TechnicianProfile @relation(fields: [technicianId], references: [id], onDelete: Cascade)\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id], onDelete: Restrict)\n\n  title       String\n  description String\n  price       Float\n  duration    Int\n  rating      Float  @default(0)\n\n  isActive Boolean @default(true)\n\n  bookings Booking[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("services")\n}\n\nmodel TechnicianProfile {\n  id String @id @default(uuid())\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  bio        String?\n  skills     String[]\n  location   String?\n  experience Int\n  hourlyRate Float\n\n  averageRating Float @default(0)\n  totalReviews  Int   @default(0)\n\n  verified Boolean @default(false)\n\n  services     Service[]\n  availability Availability[]\n  bookings     Booking[]\n  reviews      Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("technicians")\n}\n\nmodel User {\n  id       String @id @default(uuid())\n  name     String @db.VarChar(255)\n  email    String @unique @db.VarChar(255)\n  password String @db.VarChar(255)\n\n  role         Role         @default(CUSTOMER)\n  activeStatus ActiveStatus @default(ACTIVE)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  profile           Profile?\n  technicianProfile TechnicianProfile?\n\n  customerBookings Booking[]\n  customerReviews  Review[]\n\n  @@map("users")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Availability":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"AvailabilityToTechnicianProfile"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"startTime","kind":"scalar","type":"String"},{"name":"endTime","kind":"scalar","type":"String"},{"name":"isBooked","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"availabilities"},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"BookingToTechnicianProfile"},{"name":"serviceId","kind":"scalar","type":"String"},{"name":"service","kind":"object","type":"Service","relationName":"BookingToService"},{"name":"bookingDate","kind":"scalar","type":"DateTime"},{"name":"startTime","kind":"scalar","type":"String"},{"name":"endTime","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"problemDescription","kind":"scalar","type":"String"},{"name":"totalPrice","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"payment","kind":"object","type":"Payment","relationName":"BookingToPayment"},{"name":"review","kind":"object","type":"Review","relationName":"BookingToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"bookings"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"services","kind":"object","type":"Service","relationName":"CategoryToService"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"categories"},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToPayment"},{"name":"provider","kind":"enum","type":"PaymentProvider"},{"name":"methodType","kind":"scalar","type":"String"},{"name":"method","kind":"scalar","type":"String"},{"name":"transactionId","kind":"scalar","type":"String"},{"name":"paymentIntentId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"paidAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"payments"},"Profile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProfileToUser"},{"name":"profilePhoto","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"profiles"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToReview"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"ReviewToTechnicianProfile"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"reviews"},"Service":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"ServiceToTechnicianProfile"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToService"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"duration","kind":"scalar","type":"Int"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToService"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"services"},"TechnicianProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TechnicianProfileToUser"},{"name":"bio","kind":"scalar","type":"String"},{"name":"skills","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"experience","kind":"scalar","type":"Int"},{"name":"hourlyRate","kind":"scalar","type":"Float"},{"name":"averageRating","kind":"scalar","type":"Float"},{"name":"totalReviews","kind":"scalar","type":"Int"},{"name":"verified","kind":"scalar","type":"Boolean"},{"name":"services","kind":"object","type":"Service","relationName":"ServiceToTechnicianProfile"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToTechnicianProfile"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToTechnicianProfile"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTechnicianProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"technicians"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"activeStatus","kind":"enum","type":"ActiveStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"profile","kind":"object","type":"Profile","relationName":"ProfileToUser"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"TechnicianProfileToUser"},{"name":"customerBookings","kind":"object","type":"Booking","relationName":"BookingToUser"},{"name":"customerReviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":"users"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","user","profile","technicianProfile","orderBy","cursor","customer","technician","services","_count","category","bookings","service","booking","payment","review","customerBookings","customerReviews","availability","reviews","Availability.findUnique","Availability.findUniqueOrThrow","Availability.findFirst","Availability.findFirstOrThrow","Availability.findMany","data","Availability.createOne","Availability.createMany","Availability.createManyAndReturn","Availability.updateOne","Availability.updateMany","Availability.updateManyAndReturn","create","update","Availability.upsertOne","Availability.deleteOne","Availability.deleteMany","having","_min","_max","Availability.groupBy","Availability.aggregate","Booking.findUnique","Booking.findUniqueOrThrow","Booking.findFirst","Booking.findFirstOrThrow","Booking.findMany","Booking.createOne","Booking.createMany","Booking.createManyAndReturn","Booking.updateOne","Booking.updateMany","Booking.updateManyAndReturn","Booking.upsertOne","Booking.deleteOne","Booking.deleteMany","_avg","_sum","Booking.groupBy","Booking.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","Payment.groupBy","Payment.aggregate","Profile.findUnique","Profile.findUniqueOrThrow","Profile.findFirst","Profile.findFirstOrThrow","Profile.findMany","Profile.createOne","Profile.createMany","Profile.createManyAndReturn","Profile.updateOne","Profile.updateMany","Profile.updateManyAndReturn","Profile.upsertOne","Profile.deleteOne","Profile.deleteMany","Profile.groupBy","Profile.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","Service.findUnique","Service.findUniqueOrThrow","Service.findFirst","Service.findFirstOrThrow","Service.findMany","Service.createOne","Service.createMany","Service.createManyAndReturn","Service.updateOne","Service.updateMany","Service.updateManyAndReturn","Service.upsertOne","Service.deleteOne","Service.deleteMany","Service.groupBy","Service.aggregate","TechnicianProfile.findUnique","TechnicianProfile.findUniqueOrThrow","TechnicianProfile.findFirst","TechnicianProfile.findFirstOrThrow","TechnicianProfile.findMany","TechnicianProfile.createOne","TechnicianProfile.createMany","TechnicianProfile.createManyAndReturn","TechnicianProfile.updateOne","TechnicianProfile.updateMany","TechnicianProfile.updateManyAndReturn","TechnicianProfile.upsertOne","TechnicianProfile.deleteOne","TechnicianProfile.deleteMany","TechnicianProfile.groupBy","TechnicianProfile.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","name","email","password","Role","role","ActiveStatus","activeStatus","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","userId","bio","skills","location","experience","hourlyRate","averageRating","totalReviews","verified","has","hasEvery","hasSome","technicianId","categoryId","title","description","price","duration","rating","isActive","bookingId","customerId","comment","profilePhoto","phone","address","PaymentProvider","provider","methodType","method","transactionId","paymentIntentId","amount","PaymentStatus","status","paidAt","icon","serviceId","bookingDate","startTime","endTime","problemDescription","totalPrice","BookingStatus","date","isBooked","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","push","increment","decrement","multiply","divide"]'),
  graph: "4gRXkAEMBwAAvgIAIKwBAAC9AgAwrQEAABwAEK4BAAC9AgAwrwEBAAAAAbcBQACIAgAhuAFAAIgCACHTAQEAhQIAIe4BAQCFAgAh7wEBAIUCACHzAUAAiAIAIfQBIACfAgAhAQAAAAEAIAsBAACgAgAgrAEAAKYCADCtAQAAAwAQrgEAAKYCADCvAQEAhQIAIbcBQACIAgAhuAFAAIgCACHHAQEAhQIAId4BAQCcAgAh3wEBAJwCACHgAQEAnAIAIQEAAAADACAUAQAAoAIAIAgAAKECACALAACLAgAgEgAAogIAIBMAAIwCACCsAQAAmwIAMK0BAAAFABCuAQAAmwIAMK8BAQCFAgAhtwFAAIgCACG4AUAAiAIAIccBAQCFAgAhyAEBAJwCACHJAQAAjwIAIMoBAQCcAgAhywECAJ0CACHMAQgAngIAIc0BCACeAgAhzgECAJ0CACHPASAAnwIAIQEAAAAFACAVBgAAoAIAIAcAAL4CACAMAADEAgAgDgAAxQIAIA8AAMYCACCsAQAAwgIAMK0BAAAHABCuAQAAwgIAMK8BAQCFAgAhtwFAAIgCACG4AUAAiAIAIdMBAQCFAgAh3AEBAIUCACHgAQEAhQIAIekBAADDAvMBIuwBAQCFAgAh7QFAAIgCACHuAQEAhQIAIe8BAQCFAgAh8AEBAJwCACHxAQgAngIAIQYGAADnAwAgBwAA3AMAIAwAAJwEACAOAACdBAAgDwAAngQAIPABAADfAwAgFQYAAKACACAHAAC-AgAgDAAAxAIAIA4AAMUCACAPAADGAgAgrAEAAMICADCtAQAABwAQrgEAAMICADCvAQEAAAABtwFAAIgCACG4AUAAiAIAIdMBAQCFAgAh3AEBAIUCACHgAQEAhQIAIekBAADDAvMBIuwBAQCFAgAh7QFAAIgCACHuAQEAhQIAIe8BAQCFAgAh8AEBAJwCACHxAQgAngIAIQMAAAAHACAEAAAIADAFAAAJACARBwAAvgIAIAoAAMECACALAACLAgAgrAEAAMACADCtAQAACwAQrgEAAMACADCvAQEAhQIAIbcBQACIAgAhuAFAAIgCACHTAQEAhQIAIdQBAQCFAgAh1QEBAIUCACHWAQEAhQIAIdcBCACeAgAh2AECAJ0CACHZAQgAngIAIdoBIACfAgAhAwcAANwDACAKAACbBAAgCwAA3QMAIBEHAAC-AgAgCgAAwQIAIAsAAIsCACCsAQAAwAIAMK0BAAALABCuAQAAwAIAMK8BAQAAAAG3AUAAiAIAIbgBQACIAgAh0wEBAIUCACHUAQEAhQIAIdUBAQCFAgAh1gEBAIUCACHXAQgAngIAIdgBAgCdAgAh2QEIAJ4CACHaASAAnwIAIQMAAAALACAEAAAMADAFAAANACABAAAACwAgAwAAAAcAIAQAAAgAMAUAAAkAIAEAAAAHACAQDQAAtQIAIKwBAACxAgAwrQEAABIAEK4BAACxAgAwrwEBAIUCACG3AUAAiAIAIbgBQACIAgAh2wEBAIUCACHiAQAAsgLiASLjAQEAnAIAIeQBAQCcAgAh5QEBAJwCACHmAQEAnAIAIecBCACeAgAh6QEAALMC6QEi6gFAALQCACEBAAAAEgAgDgYAAKACACAHAAC-AgAgDQAAtQIAIKwBAAC_AgAwrQEAABQAEK4BAAC_AgAwrwEBAIUCACG3AUAAiAIAIbgBQACIAgAh0wEBAIUCACHZAQIAnQIAIdsBAQCFAgAh3AEBAIUCACHdAQEAnAIAIQEAAAAUACAEBgAA5wMAIAcAANwDACANAACCBAAg3QEAAN8DACAOBgAAoAIAIAcAAL4CACANAAC1AgAgrAEAAL8CADCtAQAAFAAQrgEAAL8CADCvAQEAAAABtwFAAIgCACG4AUAAiAIAIdMBAQCFAgAh2QECAJ0CACHbAQEAAAAB3AEBAIUCACHdAQEAnAIAIQMAAAAUACAEAAAWADAFAAAXACABAAAABwAgAQAAABQAIAMAAAALACAEAAAMADAFAAANACAMBwAAvgIAIKwBAAC9AgAwrQEAABwAEK4BAAC9AgAwrwEBAIUCACG3AUAAiAIAIbgBQACIAgAh0wEBAIUCACHuAQEAhQIAIe8BAQCFAgAh8wFAAIgCACH0ASAAnwIAIQEHAADcAwAgAwAAABwAIAQAAB0AMAUAAAEAIAMAAAAHACAEAAAIADAFAAAJACADAAAAFAAgBAAAFgAwBQAAFwAgAQAAAAsAIAEAAAAcACABAAAABwAgAQAAABQAIAEAAAABACADAAAAHAAgBAAAHQAwBQAAAQAgAwAAABwAIAQAAB0AMAUAAAEAIAMAAAAcACAEAAAdADAFAAABACAJBwAAmgQAIK8BAQAAAAG3AUAAAAABuAFAAAAAAdMBAQAAAAHuAQEAAAAB7wEBAAAAAfMBQAAAAAH0ASAAAAABARkAACkAIAivAQEAAAABtwFAAAAAAbgBQAAAAAHTAQEAAAAB7gEBAAAAAe8BAQAAAAHzAUAAAAAB9AEgAAAAAQEZAAArADABGQAAKwAwCQcAAJkEACCvAQEAygIAIbcBQADNAgAhuAFAAM0CACHTAQEAygIAIe4BAQDKAgAh7wEBAMoCACHzAUAAzQIAIfQBIACPAwAhAgAAAAEAIBkAAC4AIAivAQEAygIAIbcBQADNAgAhuAFAAM0CACHTAQEAygIAIe4BAQDKAgAh7wEBAMoCACHzAUAAzQIAIfQBIACPAwAhAgAAABwAIBkAADAAIAIAAAAcACAZAAAwACADAAAAAQAgIAAAKQAgIQAALgAgAQAAAAEAIAEAAAAcACADCQAAlgQAICYAAJgEACAnAACXBAAgC6wBAAC8AgAwrQEAADcAEK4BAAC8AgAwrwEBAPcBACG3AUAA-gEAIbgBQAD6AQAh0wEBAPcBACHuAQEA9wEAIe8BAQD3AQAh8wFAAPoBACH0ASAAkgIAIQMAAAAcACAEAAA2ADAlAAA3ACADAAAAHAAgBAAAHQAwBQAAAQAgAQAAAAkAIAEAAAAJACADAAAABwAgBAAACAAwBQAACQAgAwAAAAcAIAQAAAgAMAUAAAkAIAMAAAAHACAEAAAIADAFAAAJACASBgAApwMAIAcAAIUDACAMAACGAwAgDgAAhwMAIA8AAIgDACCvAQEAAAABtwFAAAAAAbgBQAAAAAHTAQEAAAAB3AEBAAAAAeABAQAAAAHpAQAAAPMBAuwBAQAAAAHtAUAAAAAB7gEBAAAAAe8BAQAAAAHwAQEAAAAB8QEIAAAAAQEZAAA_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-AwAgJwAA_QMAIDgAAPwDACA5AAD_AwAg4wEAAN8DACDkAQAA3wMAIOUBAADfAwAg5gEAAN8DACDqAQAA3wMAIA-sAQAApwIAMK0BAAB-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_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-AG0ASK2AQAA-QG2ASK3AUAA-gEAIbgBQAD6AQAhAwAAAOABACAEAADyAQAwJQAA8wEAIAMAAADgAQAgBAAA4QEAMAUAAN0BACALrAEAAPYBADCtAQAA8wEAEK4BAAD2AQAwrwEBAPcBACGwAQEA9wEAIbEBAQD3AQAhsgEBAPcBACG0AQAA-AG0ASK2AQAA-QG2ASK3AUAA-gEAIbgBQAD6AQAhDgkAAPwBACAmAACDAgAgJwAAgwIAILkBAQAAAAG6AQEAAAAEuwEBAAAABLwBAQAAAAG9AQEAAAABvgEBAAAAAb8BAQAAAAHAAQEAggIAIcEBAQAAAAHCAQEAAAABwwEBAAAAAQcJAAD8AQAgJgAAgQIAICcAAIECACC5AQAAALQBAroBAAAAtAEIuwEAAAC0AQjAAQAAgAK0ASIHCQAA_AEAICYAAP8BACAnAAD_AQAguQEAAAC2AQK6AQAAALYBCLsBAAAAtgEIwAEAAP4BtgEiCwkAAPwBACAmAAD9AQAgJwAA_QEAILkBQAAAAAG6AUAAAAAEuwFAAAAABLwBQAAAAAG9AUAAAAABvgFAAAAAAb8BQAAAAAHAAUAA-wEAIQsJAAD8AQAgJgAA_QEAICcAAP0BACC5AUAAAAABugFAAAAABLsBQAAAAAS8AUAAAAABvQFAAAAAAb4BQAAAAAG_AUAAAAABwAFAAPsBACEIuQECAAAAAboBAgAAAAS7AQIAAAAEvAECAAAAAb0BAgAAAAG-AQIAAAABvwECAAAAAcABAgD8AQAhCLkBQAAAAAG6AUAAAAAEuwFAAAAABLwBQAAAAAG9AUAAAAABvgFAAAAAAb8BQAAAAAHAAUAA_QEAIQcJAAD8AQAgJgAA_wEAICcAAP8BACC5AQAAALYBAroBAAAAtgEIuwEAAAC2AQjAAQAA_gG2ASIEuQEAAAC2AQK6AQAAALYBCLsBAAAAtgEIwAEAAP8BtgEiBwkAAPwBACAmAACBAgAgJwAAgQIAILkBAAAAtAECugEAAAC0AQi7AQAAALQBCMABAACAArQBIgS5AQAAALQBAroBAAAAtAEIuwEAAAC0AQjAAQAAgQK0ASIOCQAA_AEAICYAAIMCACAnAACDAgAguQEBAAAAAboBAQAAAAS7AQEAAAAEvAEBAAAAAb0BAQAAAAG-AQEAAAABvwEBAAAAAcABAQCCAgAhwQEBAAAAAcIBAQAAAAHDAQEAAAABC7kBAQAAAAG6AQEAAAAEuwEBAAAABLwBAQAAAAG9AQEAAAABvgEBAAAAAb8BAQAAAAHAAQEAgwIAIcEBAQAAAAHCAQEAAAABwwEBAAAAAQ8CAACJAgAgAwAAigIAIBAAAIsCACARAACMAgAgrAEAAIQCADCtAQAA4AEAEK4BAACEAgAwrwEBAIUCACGwAQEAhQIAIbEBAQCFAgAhsgEBAIUCACG0AQAAhgK0ASK2AQAAhwK2ASK3AUAAiAIAIbgBQACIAgAhC7kBAQAAAAG6AQEAAAAEuwEBAAAABLwBAQAAAAG9AQEAAAABvgEBAAAAAb8BAQAAAAHAAQEAgwIAIcEBAQAAAAHCAQEAAAABwwEBAAAAAQS5AQAAALQBAroBAAAAtAEIuwEAAAC0AQjAAQAAgQK0ASIEuQEAAAC2AQK6AQAAALYBCLsBAAAAtgEIwAEAAP8BtgEiCLkBQAAAAAG6AUAAAAAEuwFAAAAABLwBQAAAAAG9AUAAAAABvgFAAAAAAb8BQAAAAAHAAUAA_QEAIQ0BAACgAgAgrAEAAKYCADCtAQAAAwAQrgEAAKYCADCvAQEAhQIAIbcBQACIAgAhuAFAAIgCACHHAQEAhQIAId4BAQCcAgAh3wEBAJwCACHgAQEAnAIAIfUBAAADACD2AQAAAwAgFgEAAKACACAIAAChAgAgCwAAiwIAIBIAAKICACATAACMAgAgrAEAAJsCADCtAQAABQAQrgEAAJsCADCvAQEAhQIAIbcBQACIAgAhuAFAAIgCACHHAQEAhQIAIcgBAQCcAgAhyQEAAI8CACDKAQEAnAIAIcsBAgCdAgAhzAEIAJ4CACHNAQgAngIAIc4BAgCdAgAhzwEgAJ8CACH1AQAABQAg9gEAAAUAIAPEAQAABwAgxQEAAAcAIMYBAAAHACADxAEAABQAIMUBAAAUACDGAQAAFAAgD6wBAACNAgAwrQEAANoBABCuAQAAjQIAMK8BAQD3AQAhtwFAAPoBACG4AUAA-gEAIccBAQD3AQAhyAEBAI4CACHJAQAAjwIAIMoBAQCOAgAhywECAJACACHMAQgAkQIAIc0BCACRAgAhzgECAJACACHPASAAkgIAIQ4JAACZAgAgJgAAmgIAICcAAJoCACC5AQEAAAABugEBAAAABbsBAQAAAAW8AQEAAAABvQEBAAAAAb4BAQAAAAG_AQEAAAABwAEBAJgCACHBAQEAAAABwgEBAAAAAcMBAQAAAAEEuQEBAAAABdABAQAAAAHRAQEAAAAE0gEBAAAABA0JAAD8AQAgJgAA_AEAICcAAPwBACA4AACWAgAgOQAA_AEAILkBAgAAAAG6AQIAAAAEuwECAAAABLwBAgAAAAG9AQIAAAABvgECAAAAAb8BAgAAAAHAAQIAlwIAIQ0JAAD8AQAgJgAAlgIAICcAAJYCACA4AACWAgAgOQAAlgIAILkBCAAAAAG6AQgAAAAEuwEIAAAABLwBCAAAAAG9AQgAAAABvgEIAAAAAb8BCAAAAAHAAQgAlQIAIQUJAAD8AQAgJgAAlAIAICcAAJQCACC5ASAAAAABwAEgAJMCACEFCQAA_AEAICYAAJQCACAnAACUAgAguQEgAAAAAcABIACTAgAhArkBIAAAAAHAASAAlAIAIQ0JAAD8AQAgJgAAlgIAICcAAJYCACA4AACWAgAgOQAAlgIAILkBCAAAAAG6AQgAAAAEuwEIAAAABLwBCAAAAAG9AQgAAAABvgEIAAAAAb8BCAAAAAHAAQgAlQIAIQi5AQgAAAABugEIAAAABLsBCAAAAAS8AQgAAAABvQEIAAAAAb4BCAAAAAG_AQgAAAABwAEIAJYCACENCQAA_AEAICYAAPwBACAnAAD8AQAgOAAAlgIAIDkAAPwBACC5AQIAAAABugECAAAABLsBAgAAAAS8AQIAAAABvQECAAAAAb4BAgAAAAG_AQIAAAABwAECAJcCACEOCQAAmQIAICYAAJoCACAnAACaAgAguQEBAAAAAboBAQAAAAW7AQEAAAAFvAEBAAAAAb0BAQAAAAG-AQEAAAABvwEBAAAAAcABAQCYAgAhwQEBAAAAAcIBAQAAAAHDAQEAAAABCLkBAgAAAAG6AQIAAAAFuwECAAAABbwBAgAAAAG9AQIAAAABvgECAAAAAb8BAgAAAAHAAQIAmQIAIQu5AQEAAAABugEBAAAABbsBAQAAAAW8AQEAAAABvQEBAAAAAb4BAQAAAAG_AQEAAAABwAEBAJoCACHBAQEAAAABwgEBAAAAAcMBAQAAAAEUAQAAoAIAIAgAAKECACALAACLAgAgEgAAogIAIBMAAIwCACCsAQAAmwIAMK0BAAAFABCuAQAAmwIAMK8BAQCFAgAhtwFAAIgCACG4AUAAiAIAIccBAQCFAgAhyAEBAJwCACHJAQAAjwIAIMoBAQCcAgAhywECAJ0CACHMAQgAngIAIc0BCACeAgAhzgECAJ0CACHPASAAnwIAIQu5AQEAAAABugEBAAAABbsBAQAAAAW8AQEAAAABvQEBAAAAAb4BAQAAAAG_AQEAAAABwAEBAJoCACHBAQEAAAABwgEBAAAAAcMBAQAAAAEIuQECAAAAAboBAgAAAAS7AQIAAAAEvAECAAAAAb0BAgAAAAG-AQIAAAABvwECAAAAAcABAgD8AQAhCLkBCAAAAAG6AQgAAAAEuwEIAAAABLwBCAAAAAG9AQgAAAABvgEIAAAAAb8BCAAAAAHAAQgAlgIAIQK5ASAAAAABwAEgAJQCACERAgAAiQIAIAMAAIoCACAQAACLAgAgEQAAjAIAIKwBAACEAgAwrQEAAOABABCuAQAAhAIAMK8BAQCFAgAhsAEBAIUCACGxAQEAhQIAIbIBAQCFAgAhtAEAAIYCtAEitgEAAIcCtgEitwFAAIgCACG4AUAAiAIAIfUBAADgAQAg9gEAAOABACADxAEAAAsAIMUBAAALACDGAQAACwAgA8QBAAAcACDFAQAAHAAgxgEAABwAIA6sAQAAowIAMK0BAADCAQAQrgEAAKMCADCvAQEA9wEAIbcBQAD6AQAhuAFAAPoBACHTAQEA9wEAIdQBAQD3AQAh1QEBAPcBACHWAQEA9wEAIdcBCACRAgAh2AECAJACACHZAQgAkQIAIdoBIACSAgAhC6wBAACkAgAwrQEAAKwBABCuAQAApAIAMK8BAQD3AQAhtwFAAPoBACG4AUAA-gEAIdMBAQD3AQAh2QECAJACACHbAQEA9wEAIdwBAQD3AQAh3QEBAI4CACEKrAEAAKUCADCtAQAAlgEAEK4BAAClAgAwrwEBAPcBACG3AUAA-gEAIbgBQAD6AQAhxwEBAPcBACHeAQEAjgIAId8BAQCOAgAh4AEBAI4CACELAQAAoAIAIKwBAACmAgAwrQEAAAMAEK4BAACmAgAwrwEBAIUCACG3AUAAiAIAIbgBQACIAgAhxwEBAIUCACHeAQEAnAIAId8BAQCcAgAh4AEBAJwCACEPrAEAAKcCADCtAQAAfgAQrgEAAKcCADCvAQEA9wEAIbcBQAD6AQAhuAFAAPoBACHbAQEA9wEAIeIBAACoAuIBIuMBAQCOAgAh5AEBAI4CACHlAQEAjgIAIeYBAQCOAgAh5wEIAJECACHpAQAAqQLpASLqAUAAqgIAIQcJAAD8AQAgJgAAsAIAICcAALACACC5AQAAAOIBAroBAAAA4gEIuwEAAADiAQjAAQAArwLiASIHCQAA_AEAICYAAK4CACAnAACuAgAguQEAAADpAQK6AQAAAOkBCLsBAAAA6QEIwAEAAK0C6QEiCwkAAJkCACAmAACsAgAgJwAArAIAILkBQAAAAAG6AUAAAAAFuwFAAAAABbwBQAAAAAG9AUAAAAABvgFAAAAAAb8BQAAAAAHAAUAAqwIAIQsJAACZAgAgJgAArAIAICcAAKwCACC5AUAAAAABugFAAAAABbsBQAAAAAW8AUAAAAABvQFAAAAAAb4BQAAAAAG_AUAAAAABwAFAAKsCACEIuQFAAAAAAboBQAAAAAW7AUAAAAAFvAFAAAAAAb0BQAAAAAG-AUAAAAABvwFAAAAAAcABQACsAgAhBwkAAPwBACAmAACuAgAgJwAArgIAILkBAAAA6QECugEAAADpAQi7AQAAAOkBCMABAACtAukBIgS5AQAAAOkBAroBAAAA6QEIuwEAAADpAQjAAQAArgLpASIHCQAA_AEAICYAALACACAnAACwAgAguQEAAADiAQK6AQAAAOIBCLsBAAAA4gEIwAEAAK8C4gEiBLkBAAAA4gECugEAAADiAQi7AQAAAOIBCMABAACwAuIBIhANAAC1AgAgrAEAALECADCtAQAAEgAQrgEAALECADCvAQEAhQIAIbcBQACIAgAhuAFAAIgCACHbAQEAhQIAIeIBAACyAuIBIuMBAQCcAgAh5AEBAJwCACHlAQEAnAIAIeYBAQCcAgAh5wEIAJ4CACHpAQAAswLpASLqAUAAtAIAIQS5AQAAAOIBAroBAAAA4gEIuwEAAADiAQjAAQAAsALiASIEuQEAAADpAQK6AQAAAOkBCLsBAAAA6QEIwAEAAK4C6QEiCLkBQAAAAAG6AUAAAAAFuwFAAAAABbwBQAAAAAG9AUAAAAABvgFAAAAAAb8BQAAAAAHAAUAArAIAIRcGAACgAgAgBwAAvgIAIAwAAMQCACAOAADFAgAgDwAAxgIAIKwBAADCAgAwrQEAAAcAEK4BAADCAgAwrwEBAIUCACG3AUAAiAIAIbgBQACIAgAh0wEBAIUCACHcAQEAhQIAIeABAQCFAgAh6QEAAMMC8wEi7AEBAIUCACHtAUAAiAIAIe4BAQCFAgAh7wEBAIUCACHwAQEAnAIAIfEBCACeAgAh9QEAAAcAIPYBAAAHACAJrAEAALYCADCtAQAAZgAQrgEAALYCADCvAQEA9wEAIbABAQD3AQAhtwFAAPoBACG4AUAA-gEAIdYBAQCOAgAh6wEBAI4CACEKCAAAoQIAIKwBAAC3AgAwrQEAAFMAEK4BAAC3AgAwrwEBAIUCACGwAQEAhQIAIbcBQACIAgAhuAFAAIgCACHWAQEAnAIAIesBAQCcAgAhEKwBAAC4AgAwrQEAAE0AEK4BAAC4AgAwrwEBAPcBACG3AUAA-gEAIbgBQAD6AQAh0wEBAPcBACHcAQEA9wEAIeABAQD3AQAh6QEAALkC8wEi7AEBAPcBACHtAUAA-gEAIe4BAQD3AQAh7wEBAPcBACHwAQEAjgIAIfEBCACRAgAhBwkAAPwBACAmAAC7AgAgJwAAuwIAILkBAAAA8wECugEAAADzAQi7AQAAAPMBCMABAAC6AvMBIgcJAAD8AQAgJgAAuwIAICcAALsCACC5AQAAAPMBAroBAAAA8wEIuwEAAADzAQjAAQAAugLzASIEuQEAAADzAQK6AQAAAPMBCLsBAAAA8wEIwAEAALsC8wEiC6wBAAC8AgAwrQEAADcAEK4BAAC8AgAwrwEBAPcBACG3AUAA-gEAIbgBQAD6AQAh0wEBAPcBACHuAQEA9wEAIe8BAQD3AQAh8wFAAPoBACH0ASAAkgIAIQwHAAC-AgAgrAEAAL0CADCtAQAAHAAQrgEAAL0CADCvAQEAhQIAIbcBQACIAgAhuAFAAIgCACHTAQEAhQIAIe4BAQCFAgAh7wEBAIUCACHzAUAAiAIAIfQBIACfAgAhFgEAAKACACAIAAChAgAgCwAAiwIAIBIAAKICACATAACMAgAgrAEAAJsCADCtAQAABQAQrgEAAJsCADCvAQEAhQIAIbcBQACIAgAhuAFAAIgCACHHAQEAhQIAIcgBAQCcAgAhyQEAAI8CACDKAQEAnAIAIcsBAgCdAgAhzAEIAJ4CACHNAQgAngIAIc4BAgCdAgAhzwEgAJ8CACH1AQAABQAg9gEAAAUAIA4GAACgAgAgBwAAvgIAIA0AALUCACCsAQAAvwIAMK0BAAAUABCuAQAAvwIAMK8BAQCFAgAhtwFAAIgCACG4AUAAiAIAIdMBAQCFAgAh2QECAJ0CACHbAQEAhQIAIdwBAQCFAgAh3QEBAJwCACERBwAAvgIAIAoAAMECACALAACLAgAgrAEAAMACADCtAQAACwAQrgEAAMACADCvAQEAhQIAIbcBQACIAgAhuAFAAIgCACHTAQEAhQIAIdQBAQCFAgAh1QEBAIUCACHWAQEAhQIAIdcBCACeAgAh2AECAJ0CACHZAQgAngIAIdoBIACfAgAhDAgAAKECACCsAQAAtwIAMK0BAABTABCuAQAAtwIAMK8BAQCFAgAhsAEBAIUCACG3AUAAiAIAIbgBQACIAgAh1gEBAJwCACHrAQEAnAIAIfUBAABTACD2AQAAUwAgFQYAAKACACAHAAC-AgAgDAAAxAIAIA4AAMUCACAPAADGAgAgrAEAAMICADCtAQAABwAQrgEAAMICADCvAQEAhQIAIbcBQACIAgAhuAFAAIgCACHTAQEAhQIAIdwBAQCFAgAh4AEBAIUCACHpAQAAwwLzASLsAQEAhQIAIe0BQACIAgAh7gEBAIUCACHvAQEAhQIAIfABAQCcAgAh8QEIAJ4CACEEuQEAAADzAQK6AQAAAPMBCLsBAAAA8wEIwAEAALsC8wEiEwcAAL4CACAKAADBAgAgCwAAiwIAIKwBAADAAgAwrQEAAAsAEK4BAADAAgAwrwEBAIUCACG3AUAAiAIAIbgBQACIAgAh0wEBAIUCACHUAQEAhQIAIdUBAQCFAgAh1gEBAIUCACHXAQgAngIAIdgBAgCdAgAh2QEIAJ4CACHaASAAnwIAIfUBAAALACD2AQAACwAgEg0AALUCACCsAQAAsQIAMK0BAAASABCuAQAAsQIAMK8BAQCFAgAhtwFAAIgCACG4AUAAiAIAIdsBAQCFAgAh4gEAALIC4gEi4wEBAJwCACHkAQEAnAIAIeUBAQCcAgAh5gEBAJwCACHnAQgAngIAIekBAACzAukBIuoBQAC0AgAh9QEAABIAIPYBAAASACAQBgAAoAIAIAcAAL4CACANAAC1AgAgrAEAAL8CADCtAQAAFAAQrgEAAL8CADCvAQEAhQIAIbcBQACIAgAhuAFAAIgCACHTAQEAhQIAIdkBAgCdAgAh2wEBAIUCACHcAQEAhQIAId0BAQCcAgAh9QEAABQAIPYBAAAUACAAAAAB-gEBAAAAAQH6AQAAALQBAgH6AQAAALYBAgH6AUAAAAABByAAANIDACAhAADVAwAg9wEAANMDACD4AQAA1AMAIPsBAAADACD8AQAAAwAg_QEAAIEBACAHIAAAiQMAICEAAIwDACD3AQAAigMAIPgBAACLAwAg-wEAAAUAIPwBAAAFACD9AQAAxQEAIAsgAADkAgAwIQAA6QIAMPcBAADlAgAw-AEAAOYCADD5AQAA5wIAIPoBAADoAgAw-wEAAOgCADD8AQAA6AIAMP0BAADoAgAw_gEAAOoCADD_AQAA6wIAMAsgAADSAgAwIQAA1wIAMPcBAADTAgAw-AEAANQCADD5AQAA1QIAIPoBAADWAgAw-wEAANYCADD8AQAA1gIAMP0BAADWAgAw_gEAANgCADD_AQAA2QIAMAkHAADjAgAgDQAA4gIAIK8BAQAAAAG3AUAAAAABuAFAAAAAAdMBAQAAAAHZAQIAAAAB2wEBAAAAAd0BAQAAAAECAAAAFwAgIAAA4QIAIAMAAAAXACAgAADhAgAgIQAA3gIAIAEZAADiBAAwDgYAAKACACAHAAC-AgAgDQAAtQIAIKwBAAC_AgAwrQEAABQAEK4BAAC_AgAwrwEBAAAAAbcBQACIAgAhuAFAAIgCACHTAQEAhQIAIdkBAgCdAgAh2wEBAAAAAdwBAQCFAgAh3QEBAJwCACECAAAAFwAgGQAA3gIAIAIAAADaAgAgGQAA2wIAIAusAQAA2QIAMK0BAADaAgAQrgEAANkCADCvAQEAhQIAIbcBQACIAgAhuAFAAIgCACHTAQEAhQIAIdkBAgCdAgAh2wEBAIUCACHcAQEAhQIAId0BAQCcAgAhC6wBAADZAgAwrQEAANoCABCuAQAA2QIAMK8BAQCFAgAhtwFAAIgCACG4AUAAiAIAIdMBAQCFAgAh2QECAJ0CACHbAQEAhQIAIdwBAQCFAgAh3QEBAJwCACEHrwEBAMoCACG3AUAAzQIAIbgBQADNAgAh0wEBAMoCACHZAQIA3AIAIdsBAQDKAgAh3QEBAN0CACEF-gECAAAAAYECAgAAAAGCAgIAAAABgwICAAAAAYQCAgAAAAEB-gEBAAAAAQkHAADgAgAgDQAA3wIAIK8BAQDKAgAhtwFAAM0CACG4AUAAzQIAIdMBAQDKAgAh2QECANwCACHbAQEAygIAId0BAQDdAgAhBSAAANoEACAhAADgBAAg9wEAANsEACD4AQAA3wQAIP0BAAAJACAFIAAA2AQAICEAAN0EACD3AQAA2QQAIPgBAADcBAAg_QEAAMUBACAJBwAA4wIAIA0AAOICACCvAQEAAAABtwFAAAAAAbgBQAAAAAHTAQEAAAAB2QECAAAAAdsBAQAAAAHdAQEAAAABAyAAANoEACD3AQAA2wQAIP0BAAAJACADIAAA2AQAIPcBAADZBAAg_QEAAMUBACAQBwAAhQMAIAwAAIYDACAOAACHAwAgDwAAiAMAIK8BAQAAAAG3AUAAAAABuAFAAAAAAdMBAQAAAAHgAQEAAAAB6QEAAADzAQLsAQEAAAAB7QFAAAAAAe4BAQAAAAHvAQEAAAAB8AEBAAAAAfEBCAAAAAECAAAACQAgIAAAhAMAIAMAAAAJACAgAACEAwAgIQAA8AIAIAEZAADXBAAwFQYAAKACACAHAAC-AgAgDAAAxAIAIA4AAMUCACAPAADGAgAgrAEAAMICADCtAQAABwAQrgEAAMICADCvAQEAAAABtwFAAIgCACG4AUAAiAIAIdMBAQCFAgAh3AEBAIUCACHgAQEAhQIAIekBAADDAvMBIuwBAQCFAgAh7QFAAIgCACHuAQEAhQIAIe8BAQCFAgAh8AEBAJwCACHxAQgAngIAIQIAAAAJACAZAADwAgAgAgAAAOwCACAZAADtAgAgEKwBAADrAgAwrQEAAOwCABCuAQAA6wIAMK8BAQCFAgAhtwFAAIgCACG4AUAAiAIAIdMBAQCFAgAh3AEBAIUCACHgAQEAhQIAIekBAADDAvMBIuwBAQCFAgAh7QFAAIgCACHuAQEAhQIAIe8BAQCFAgAh8AEBAJwCACHxAQgAngIAIRCsAQAA6wIAMK0BAADsAgAQrgEAAOsCADCvAQEAhQIAIbcBQACIAgAhuAFAAIgCACHTAQEAhQIAIdwBAQCFAgAh4AEBAIUCACHpAQAAwwLzASLsAQEAhQIAIe0BQACIAgAh7gEBAIUCACHvAQEAhQIAIfABAQCcAgAh8QEIAJ4CACEMrwEBAMoCACG3AUAAzQIAIbgBQADNAgAh0wEBAMoCACHgAQEAygIAIekBAADvAvMBIuwBAQDKAgAh7QFAAM0CACHuAQEAygIAIe8BAQDKAgAh8AEBAN0CACHxAQgA7gIAIQX6AQgAAAABgQIIAAAAAYICCAAAAAGDAggAAAABhAIIAAAAAQH6AQAAAPMBAhAHAADxAgAgDAAA8gIAIA4AAPMCACAPAAD0AgAgrwEBAMoCACG3AUAAzQIAIbgBQADNAgAh0wEBAMoCACHgAQEAygIAIekBAADvAvMBIuwBAQDKAgAh7QFAAM0CACHuAQEAygIAIe8BAQDKAgAh8AEBAN0CACHxAQgA7gIAIQUgAADKBAAgIQAA1QQAIPcBAADLBAAg-AEAANQEACD9AQAAxQEAIAUgAADIBAAgIQAA0gQAIPcBAADJBAAg-AEAANEEACD9AQAADQAgByAAAPwCACAhAAD_AgAg9wEAAP0CACD4AQAA_gIAIPsBAAASACD8AQAAEgAg_QEAAGkAIAcgAAD1AgAgIQAA-AIAIPcBAAD2AgAg-AEAAPcCACD7AQAAFAAg_AEAABQAIP0BAAAXACAJBgAA-wIAIAcAAOMCACCvAQEAAAABtwFAAAAAAbgBQAAAAAHTAQEAAAAB2QECAAAAAdwBAQAAAAHdAQEAAAABAgAAABcAICAAAPUCACADAAAAFAAgIAAA9QIAICEAAPkCACALAAAAFAAgBgAA-gIAIAcAAOACACAZAAD5AgAgrwEBAMoCACG3AUAAzQIAIbgBQADNAgAh0wEBAMoCACHZAQIA3AIAIdwBAQDKAgAh3QEBAN0CACEJBgAA-gIAIAcAAOACACCvAQEAygIAIbcBQADNAgAhuAFAAM0CACHTAQEAygIAIdkBAgDcAgAh3AEBAMoCACHdAQEA3QIAIQUgAADMBAAgIQAAzwQAIPcBAADNBAAg-AEAAM4EACD9AQAA3QEAIAMgAADMBAAg9wEAAM0EACD9AQAA3QEAIAuvAQEAAAABtwFAAAAAAbgBQAAAAAHiAQAAAOIBAuMBAQAAAAHkAQEAAAAB5QEBAAAAAeYBAQAAAAHnAQgAAAAB6QEAAADpAQLqAUAAAAABAgAAAGkAICAAAPwCACADAAAAEgAgIAAA_AIAICEAAIADACANAAAAEgAgGQAAgAMAIK8BAQDKAgAhtwFAAM0CACG4AUAAzQIAIeIBAACBA-IBIuMBAQDdAgAh5AEBAN0CACHlAQEA3QIAIeYBAQDdAgAh5wEIAO4CACHpAQAAggPpASLqAUAAgwMAIQuvAQEAygIAIbcBQADNAgAhuAFAAM0CACHiAQAAgQPiASLjAQEA3QIAIeQBAQDdAgAh5QEBAN0CACHmAQEA3QIAIecBCADuAgAh6QEAAIID6QEi6gFAAIMDACEB-gEAAADiAQIB-gEAAADpAQIB-gFAAAAAARAHAACFAwAgDAAAhgMAIA4AAIcDACAPAACIAwAgrwEBAAAAAbcBQAAAAAG4AUAAAAAB0wEBAAAAAeABAQAAAAHpAQAAAPMBAuwBAQAAAAHtAUAAAAAB7gEBAAAAAe8BAQAAAAHwAQEAAAAB8QEIAAAAAQMgAADKBAAg9wEAAMsEACD9AQAAxQEAIAMgAADIBAAg9wEAAMkEACD9AQAADQAgAyAAAPwCACD3AQAA_QIAIP0BAABpACADIAAA9QIAIPcBAAD2AgAg_QEAABcAIA8IAADOAwAgCwAA0AMAIBIAAM8DACATAADRAwAgrwEBAAAAAbcBQAAAAAG4AUAAAAAByAEBAAAAAckBAADNAwAgygEBAAAAAcsBAgAAAAHMAQgAAAABzQEIAAAAAc4BAgAAAAHPASAAAAABAgAAAMUBACAgAACJAwAgAwAAAAUAICAAAIkDACAhAACNAwAgEQAAAAUAIAgAAJADACALAACSAwAgEgAAkQMAIBMAAJMDACAZAACNAwAgrwEBAMoCACG3AUAAzQIAIbgBQADNAgAhyAEBAN0CACHJAQAAjgMAIMoBAQDdAgAhywECANwCACHMAQgA7gIAIc0BCADuAgAhzgECANwCACHPASAAjwMAIQ8IAACQAwAgCwAAkgMAIBIAAJEDACATAACTAwAgrwEBAMoCACG3AUAAzQIAIbgBQADNAgAhyAEBAN0CACHJAQAAjgMAIMoBAQDdAgAhywECANwCACHMAQgA7gIAIc0BCADuAgAhzgECANwCACHPASAAjwMAIQL6AQEAAAAEgAIBAAAABQH6ASAAAAABCyAAALQDADAhAAC5AwAw9wEAALUDADD4AQAAtgMAMPkBAAC3AwAg-gEAALgDADD7AQAAuAMAMPwBAAC4AwAw_QEAALgDADD-AQAAugMAMP8BAAC7AwAwCyAAAKgDADAhAACtAwAw9wEAAKkDADD4AQAAqgMAMPkBAACrAwAg-gEAAKwDADD7AQAArAMAMPwBAACsAwAw_QEAAKwDADD-AQAArgMAMP8BAACvAwAwCyAAAJ0DADAhAAChAwAw9wEAAJ4DADD4AQAAnwMAMPkBAACgAwAg-gEAAOgCADD7AQAA6AIAMPwBAADoAgAw_QEAAOgCADD-AQAAogMAMP8BAADrAgAwCyAAAJQDADAhAACYAwAw9wEAAJUDADD4AQAAlgMAMPkBAACXAwAg-gEAANYCADD7AQAA1gIAMPwBAADWAgAw_QEAANYCADD-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-gEAAOgCADD7AQAA6AIAMPwBAADoAgAw_QEAAOgCADD-AQAAxgMAMP8BAADrAgAwEAYAAKcDACAHAACFAwAgDgAAhwMAIA8AAIgDACCvAQEAAAABtwFAAAAAAbgBQAAAAAHTAQEAAAAB3AEBAAAAAeABAQAAAAHpAQAAAPMBAu0BQAAAAAHuAQEAAAAB7wEBAAAAAfABAQAAAAHxAQgAAAABAgAAAAkAICAAAMkDACADAAAACQAgIAAAyQMAICEAAMgDACABGQAAuwQAMAIAAAAJACAZAADIAwAgAgAAAOwCACAZAADHAwAgDK8BAQDKAgAhtwFAAM0CACG4AUAAzQIAIdMBAQDKAgAh3AEBAMoCACHgAQEAygIAIekBAADvAvMBIu0BQADNAgAh7gEBAMoCACHvAQEAygIAIfABAQDdAgAh8QEIAO4CACEQBgAApQMAIAcAAPECACAOAADzAgAgDwAA9AIAIK8BAQDKAgAhtwFAAM0CACG4AUAAzQIAIdMBAQDKAgAh3AEBAMoCACHgAQEAygIAIekBAADvAvMBIu0BQADNAgAh7gEBAMoCACHvAQEAygIAIfABAQDdAgAh8QEIAO4CACEQBgAApwMAIAcAAIUDACAOAACHAwAgDwAAiAMAIK8BAQAAAAG3AUAAAAABuAFAAAAAAdMBAQAAAAHcAQEAAAAB4AEBAAAAAekBAAAA8wEC7QFAAAAAAe4BAQAAAAHvAQEAAAAB8AEBAAAAAfEBCAAAAAEMCgAAywMAIAsAAMwDACCvAQEAAAABtwFAAAAAAbgBQAAAAAHUAQEAAAAB1QEBAAAAAdYBAQAAAAHXAQgAAAAB2AECAAAAAdkBCAAAAAHaASAAAAABAyAAALkEACD3AQAAugQAIP0BAABQACAEIAAAwQMAMPcBAADCAwAw-QEAAMQDACD9AQAA6AIAMAH6AQEAAAAEBCAAALQDADD3AQAAtQMAMPkBAAC3AwAg_QEAALgDADAEIAAAqAMAMPcBAACpAwAw-QEAAKsDACD9AQAArAMAMAQgAACdAwAw9wEAAJ4DADD5AQAAoAMAIP0BAADoAgAwBCAAAJQDADD3AQAAlQMAMPkBAACXAwAg_QEAANYCADAGrwEBAAAAAbcBQAAAAAG4AUAAAAAB3gEBAAAAAd8BAQAAAAHgAQEAAAABAgAAAIEBACAgAADSAwAgAwAAAAMAICAAANIDACAhAADWAwAgCAAAAAMAIBkAANYDACCvAQEAygIAIbcBQADNAgAhuAFAAM0CACHeAQEA3QIAId8BAQDdAgAh4AEBAN0CACEGrwEBAMoCACG3AUAAzQIAIbgBQADNAgAh3gEBAN0CACHfAQEA3QIAIeABAQDdAgAhAyAAANIDACD3AQAA0wMAIP0BAACBAQAgAyAAAIkDACD3AQAAigMAIP0BAADFAQAgBCAAAOQCADD3AQAA5QIAMPkBAADnAgAg_QEAAOgCADAEIAAA0gIAMPcBAADTAgAw-QEAANUCACD9AQAA1gIAMAQBAADnAwAg3gEAAN8DACDfAQAA3wMAIOABAADfAwAgBwEAAOcDACAIAADoAwAgCwAA3QMAIBIAAOkDACATAADeAwAgyAEAAN8DACDKAQAA3wMAIAAAAAAAAAAABSAAALQEACAhAAC3BAAg9wEAALUEACD4AQAAtgQAIP0BAADdAQAgAyAAALQEACD3AQAAtQQAIP0BAADdAQAgBAIAANsDACADAADcAwAgEAAA3QMAIBEAAN4DACAAAAAAAAAABSAAAK8EACAhAACyBAAg9wEAALAEACD4AQAAsQQAIP0BAADFAQAgAyAAAK8EACD3AQAAsAQAIP0BAADFAQAgAAAAAAAAAAAFIAAAqgQAICEAAK0EACD3AQAAqwQAIPgBAACsBAAg_QEAAN0BACADIAAAqgQAIPcBAACrBAAg_QEAAN0BACAAAAAAAAUgAAClBAAgIQAAqAQAIPcBAACmBAAg-AEAAKcEACD9AQAACQAgAyAAAKUEACD3AQAApgQAIP0BAAAJACAGBgAA5wMAIAcAANwDACAMAACcBAAgDgAAnQQAIA8AAJ4EACDwAQAA3wMAIAAAAAsgAACHBAAwIQAAiwQAMPcBAACIBAAw-AEAAIkEADD5AQAAigQAIPoBAAC4AwAw-wEAALgDADD8AQAAuAMAMP0BAAC4AwAw_gEAAIwEADD_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_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_KFuAAS5cggEEXYMBBF6FAQRfhgEEYIcBBGGJAQRiiwEOY4wBL2SOAQRlkAEOZpEBMGeSAQRokwEEaZQBDmqXATFrmAE1bJkBC22aAQtumwELb5wBC3CdAQtxnwELcqEBDnOiATZ0pAELdaYBDnanATd3qAELeKkBC3mqAQ56rQE4e64BPnyvAQZ9sAEGfrEBBn-yAQaAAbMBBoEBtQEGggG3AQ6DAbgBP4QBugEGhQG8AQ6GAb0BQIcBvgEGiAG_AQaJAcABDooBwwFBiwHEAUeMAcYBAo0BxwECjgHJAQKPAcoBApABywECkQHNAQKSAc8BDpMB0AFIlAHSAQKVAdQBDpYB1QFJlwHWAQKYAdcBApkB2AEOmgHbAUqbAdwBUJwB3gEDnQHfAQOeAeIBA58B4wEDoAHkAQOhAeYBA6IB6AEOowHpAVGkAesBA6UB7QEOpgHuAVKnAe8BA6gB8AEDqQHxAQ6qAfQBU6sB9QFX"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  AvailabilityScalarFieldEnum: () => AvailabilityScalarFieldEnum,
  BookingScalarFieldEnum: () => BookingScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PaymentScalarFieldEnum: () => PaymentScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProfileScalarFieldEnum: () => ProfileScalarFieldEnum,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  ServiceScalarFieldEnum: () => ServiceScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TechnicianProfileScalarFieldEnum: () => TechnicianProfileScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.9.1",
  engine: "e922089b7d7502aff4249d5da3420f6fa55fc6ad"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Availability: "Availability",
  Booking: "Booking",
  Category: "Category",
  Payment: "Payment",
  Profile: "Profile",
  Review: "Review",
  Service: "Service",
  TechnicianProfile: "TechnicianProfile",
  User: "User"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var AvailabilityScalarFieldEnum = {
  id: "id",
  technicianId: "technicianId",
  date: "date",
  startTime: "startTime",
  endTime: "endTime",
  isBooked: "isBooked",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var BookingScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  technicianId: "technicianId",
  serviceId: "serviceId",
  bookingDate: "bookingDate",
  startTime: "startTime",
  endTime: "endTime",
  address: "address",
  problemDescription: "problemDescription",
  totalPrice: "totalPrice",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  icon: "icon",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PaymentScalarFieldEnum = {
  id: "id",
  bookingId: "bookingId",
  provider: "provider",
  methodType: "methodType",
  method: "method",
  transactionId: "transactionId",
  paymentIntentId: "paymentIntentId",
  amount: "amount",
  status: "status",
  paidAt: "paidAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  profilePhoto: "profilePhoto",
  phone: "phone",
  address: "address",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  bookingId: "bookingId",
  customerId: "customerId",
  technicianId: "technicianId",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ServiceScalarFieldEnum = {
  id: "id",
  technicianId: "technicianId",
  categoryId: "categoryId",
  title: "title",
  description: "description",
  price: "price",
  duration: "duration",
  rating: "rating",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var TechnicianProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  bio: "bio",
  skills: "skills",
  location: "location",
  experience: "experience",
  hourlyRate: "hourlyRate",
  averageRating: "averageRating",
  totalReviews: "totalReviews",
  verified: "verified",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  role: "role",
  activeStatus: "activeStatus",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var Role = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  TECHNICIAN: "TECHNICIAN"
};
var BookingStatus = {
  REQUESTED: "REQUESTED",
  ACCEPTED: "ACCEPTED",
  DECLINED: "DECLINED",
  PAID: "PAID",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED"
};
var PaymentStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED"
};
var PaymentProvider = {
  STRIPE: "STRIPE",
  SSLCOMMERZ: "SSLCOMMERZ"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = config_default.databaseUrl;
var adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
var prisma = new PrismaClient({ adapter });

// src/module/users/user.service.ts
var registerUserIntoDB = async (paload) => {
  const { name, email, password, role, experience, hourlyRate, bio, skills, location } = paload;
  const isUserExists = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (isUserExists) {
    throw new Error("User already exists with this email");
  }
  ;
  const isTechnician = role === "TECHNICIAN";
  if (isTechnician && (experience === void 0 || hourlyRate === void 0)) {
    throw new Error("experience and hourlyRate are required to register as a technician");
  }
  ;
  const hashedPassword = await bcrypt.hash(password, Number(config_default.salt_rounds));
  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      profile: {
        create: {}
      },
      ...isTechnician && {
        technicianProfile: {
          create: {
            experience,
            hourlyRate,
            bio,
            skills,
            location
          }
        }
      }
    }
  });
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: createUser.id
    },
    omit: {
      password: true
    },
    include: {
      profile: true,
      customerBookings: true,
      technicianProfile: true
    }
  });
  return user;
};
var getMyProfileFromDB = async (userId) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId
    },
    omit: {
      password: true
    },
    include: {
      profile: true,
      customerBookings: true,
      customerReviews: true,
      technicianProfile: {
        include: {
          bookings: true,
          reviews: true
        }
      }
    }
  });
  return user;
};
var updateMyProfile = async (userId, payload) => {
  const { name, address, phone, profilePhoto } = payload;
  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name,
      profile: {
        upsert: {
          create: { profilePhoto, phone, address },
          update: { profilePhoto, phone, address }
        }
      }
    },
    omit: {
      password: true
    },
    include: {
      profile: true,
      customerBookings: true,
      customerReviews: true
    }
  });
  return updatedUser;
};
var userService = {
  registerUserIntoDB,
  getMyProfileFromDB,
  updateMyProfile
};

// src/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta
  });
};

// src/module/users/user.controller.ts
import httpStatus from "http-status";

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/module/users/user.controller.ts
var registerUser = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: { user }
    });
  }
);
var getMyProfile = catchAsync(
  async (req, res, next) => {
    const profile = await userService.getMyProfileFromDB(req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile retrieved successfully",
      data: { profile }
    });
  }
);
var updateMyProfile2 = catchAsync(
  async (req, res, next) => {
    const userId = req.user?.id;
    const payload = req.body;
    const updatedUser = await userService.updateMyProfile(userId, payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User updated successfully",
      data: { updatedUser }
    });
  }
);
var userController = {
  registerUser,
  getMyProfile,
  updateMyProfile: updateMyProfile2
};

// src/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, expiresIn) => {
  const token = jwt.sign(
    payload,
    secret,
    {
      expiresIn
    }
  );
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken
    };
  } catch (error) {
    console.log("Token verification failed : ", error);
    return {
      success: false,
      error: error.message
    };
  }
};
var jwtUtils = {
  createToken,
  verifyToken
};

// src/middlewares/auth.ts
var auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;
    if (!token) {
      throw new Error("You are not logged in. PLease log in to access this resource.");
    }
    ;
    const verifiedToken = jwtUtils.verifyToken(token, config_default.jwt_access_secret);
    console.log(verifiedToken);
    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }
    ;
    const { email, name, id, role } = verifiedToken.data;
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error("Forbidden. You don't have permission to access this resource");
    }
    ;
    const user = await prisma.user.findFirst({
      where: {
        id,
        email,
        role,
        name
      }
    });
    if (!user) {
      throw new Error("User not found. Please log in again.");
    }
    ;
    if (user.activeStatus === "BLOCKED") {
      throw new Error("Your account has been blocked. Please contact support.");
    }
    ;
    req.user = {
      email,
      name,
      id,
      role
    };
    next();
  });
};

// src/module/users/user.route.ts
var router = Router();
router.post("/register", userController.registerUser);
router.get("/me", auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN), userController.getMyProfile);
router.put("/my-profile", auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN), userController.updateMyProfile);
var userRoutes = router;

// src/middlewares/notFound.ts
var notFound = (req, res) => {
  res.status(404).json({
    message: "Route not Found",
    path: req.originalUrl,
    date: Date()
  });
};

// src/middlewares/globalErrorHandler.ts
import httpStatus2 from "http-status";
var globalErrorHandler = (err, req, res, next) => {
  console.log("Error", err);
  let statusCode = httpStatus2.BAD_REQUEST;
  let errorMessage = err.message || "";
  let errorName = err.name || "Internal Server Error";
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = httpStatus2.BAD_REQUEST;
    errorMessage = "You have provided incorrect field type or missing field";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = httpStatus2.BAD_REQUEST;
      errorMessage = "Duplicate Key Error";
    } else if (err.code === "P2003") {
      statusCode = httpStatus2.BAD_REQUEST;
      errorMessage = "Foreign key constraint failed";
    } else if (err.code === "P2025") {
      statusCode = httpStatus2.BAD_REQUEST;
      errorMessage = "An operation failed because it depends on one or more records that were required but not found";
    } else {
      statusCode = httpStatus2.BAD_REQUEST;
      errorMessage = `Database request error (${err.code})`;
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = httpStatus2.UNAUTHORIZED;
      errorMessage = "Authentication failed against database server. Please Check yout credentials";
    } else if (err.errorCode === "P1001") {
      statusCode = httpStatus2.BAD_REQUEST;
      errorMessage = "Can't reach database server";
    } else {
      statusCode = httpStatus2.INTERNAL_SERVER_ERROR;
      errorMessage = "Could not connect to the database";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    statusCode = httpStatus2.INTERNAL_SERVER_ERROR;
    errorMessage = "A critical database engine error occurred";
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = httpStatus2.INTERNAL_SERVER_ERROR;
    errorMessage = "Error occurred during query execution";
  }
  res.status(statusCode).json({
    success: false,
    statusCode,
    name: errorName,
    message: errorMessage,
    error: err.stack
  });
};

// src/module/auth/auth.route.ts
import { Router as Router2 } from "express";

// src/module/auth/auth.service.ts
import bcrypt2 from "bcryptjs";
var loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email
    }
  });
  if (user.activeStatus === "BLOCKED") {
    throw new Error("Your account has been blocked. Please contact support.");
  }
  ;
  const isPasswordMatch = await bcrypt2.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Password is Incorrect");
  }
  ;
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var refreshToken = async (refreshToken3) => {
  const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken3, config_default.jwt_refresh_secret);
  if (!verifiedRefreshToken.success) {
    throw new Error(verifiedRefreshToken.error);
  }
  ;
  const { id } = verifiedRefreshToken.data;
  const user = await prisma.user.findUniqueOrThrow({
    where: { id }
  });
  if (user.activeStatus === "BLOCKED") {
    throw new Error("User is blocked");
  }
  ;
  const jwtPayload = {
    id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(jwtPayload, config_default.jwt_access_secret, config_default.jwt_access_expires_in);
  return { accessToken };
};
var authService = {
  loginUser,
  refreshToken
};

// src/module/auth/auth.controller.ts
import httpStatus3 from "http-status";
var loginUser2 = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const { accessToken, refreshToken: refreshToken3 } = await authService.loginUser(payload);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24
    });
    res.cookie("refreshToken", refreshToken3, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24 * 7
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus3.OK,
      message: "User is login successfully",
      data: {
        accessToken,
        refreshToken: refreshToken3
      }
    });
  }
);
var refreshToken2 = catchAsync(async (req, res, next) => {
  const refreshToken3 = req.cookies.refreshToken;
  console.log(refreshToken3);
  const { accessToken } = await authService.refreshToken(refreshToken3);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus3.OK,
    message: "Token refreshed successfully",
    data: {
      accessToken
    }
  });
});
var authController = {
  loginUser: loginUser2,
  refreshToken: refreshToken2
};

// src/module/auth/auth.route.ts
var router2 = Router2();
router2.post("/login", authController.loginUser);
router2.post("/refresh-token", authController.refreshToken);
var authRoutes = router2;

// src/app.ts
import cookieParser from "cookie-parser";

// src/module/technician/technician.route.ts
import { Router as Router3 } from "express";

// src/utils/time.ts
var toMinutes = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  if (hour === void 0 || minute === void 0 || Number.isNaN(hour) || Number.isNaN(minute)) {
    throw new Error("Time must be in HH:mm format");
  }
  ;
  return hour * 60 + minute;
};
var toHHmm = (minutes) => `${String(Math.floor(minutes / 60) % 24).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

// src/module/technician/technician.service.ts
var getTechnicianProfile = async (userId) => {
  const profile = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId
    },
    include: {
      user: {
        omit: {
          password: true
        }
      },
      services: true,
      availability: true,
      bookings: true,
      reviews: {
        include: {
          customer: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
  return profile;
};
var createSlots = async (payload, userId) => {
  const { date, startTime, endTime, slotDuration } = payload;
  if (slotDuration <= 0) {
    throw new Error("slotDuration must be greater than 0");
  }
  ;
  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId
    },
    select: {
      id: true
    }
  });
  const startsAt = toMinutes(startTime);
  const endsAt = toMinutes(endTime);
  if (endsAt <= startsAt) {
    throw new Error("endTime must be after startTime");
  }
  ;
  const slots = [];
  for (let cursor = startsAt; cursor + slotDuration <= endsAt; cursor += slotDuration) {
    slots.push({
      technicianId: technician.id,
      date: new Date(date),
      startTime: toHHmm(cursor),
      endTime: toHHmm(cursor + slotDuration)
    });
  }
  ;
  if (!slots.length) {
    throw new Error("The working hour is shorter than one slot");
  }
  ;
  const createdSlots = await prisma.availability.createMany({
    data: slots
  });
  return createdSlots;
};
var getMySlots = async (userId) => {
  const slots = await prisma.availability.findMany({
    where: {
      technician: {
        userId
      }
    },
    orderBy: [
      { date: "asc" },
      { startTime: "asc" }
    ]
  });
  return slots;
};
var deleteSlot = async (slotId, userId) => {
  const slot = await prisma.availability.findUniqueOrThrow({
    where: {
      id: slotId
    },
    include: {
      technician: {
        select: {
          userId: true
        }
      }
    }
  });
  if (slot.technician.userId !== userId) {
    throw new Error("You are not allowed to delete this slot");
  }
  ;
  if (slot.isBooked) {
    throw new Error("A booked slot can not be deleted");
  }
  ;
  const deletedSlot = await prisma.availability.delete({
    where: {
      id: slotId
    }
  });
  return deletedSlot;
};
var getAvailabilityByService = async (serviceId) => {
  const service = await prisma.service.findUniqueOrThrow({
    where: {
      id: serviceId
    },
    select: {
      technicianId: true,
      duration: true
    }
  });
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const slots = await prisma.availability.findMany({
    where: {
      technicianId: service.technicianId,
      isBooked: false,
      date: {
        gte: today
      }
    },
    orderBy: [
      { date: "asc" },
      { startTime: "asc" }
    ]
  });
  const bookableSlots = slots.filter((slot, index) => {
    let covered = 0;
    let previousEnd = slot.startTime;
    for (let next = index; next < slots.length && covered < service.duration; next++) {
      const candidate = slots[next];
      if (!candidate || candidate.date.getTime() !== slot.date.getTime() || candidate.startTime !== previousEnd) {
        break;
      }
      ;
      covered += toMinutes(candidate.endTime) - toMinutes(candidate.startTime);
      previousEnd = candidate.endTime;
    }
    ;
    return covered >= service.duration;
  });
  return bookableSlots;
};
var getAllTechnician = async () => {
  const technicians = await prisma.technicianProfile.findMany({
    include: {
      user: {
        omit: {
          password: true
        }
      }
    }
  });
  return technicians;
};
var technicianServices = {
  getTechnicianProfile,
  createSlots,
  getMySlots,
  deleteSlot,
  getAvailabilityByService,
  getAllTechnician
};

// src/module/technician/technician.controller.ts
import httpStatus4 from "http-status";
var getTechnicianProfile2 = catchAsync(
  async (req, res, next) => {
    const profile = await technicianServices.getTechnicianProfile(req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus4.OK,
      message: "Technician profile is retrived successfully",
      data: { profile }
    });
  }
);
var createSlots2 = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const createdSlots = await technicianServices.createSlots(payload, req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus4.CREATED,
      message: `${createdSlots.count} slots are created successfully`,
      data: { createdSlots }
    });
  }
);
var getMySlots2 = catchAsync(
  async (req, res, next) => {
    const slots = await technicianServices.getMySlots(req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus4.OK,
      message: "Your slots are retrived successfully",
      data: { slots }
    });
  }
);
var deleteSlot2 = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const deletedSlot = await technicianServices.deleteSlot(id, req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus4.OK,
      message: "Slot is deleted successfully",
      data: { deletedSlot }
    });
  }
);
var getAvailabilityByService2 = catchAsync(
  async (req, res, next) => {
    const serviceId = req.params.serviceId;
    const slots = await technicianServices.getAvailabilityByService(serviceId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus4.OK,
      message: "Availability is retrived successfully",
      data: { slots }
    });
  }
);
var getAllTechnician2 = catchAsync(
  async (req, res, next) => {
    const technicians = await technicianServices.getAllTechnician();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus4.OK,
      message: "Technicians are retrived successfully",
      data: { technicians }
    });
  }
);
var technicianController = {
  getTechnicianProfile: getTechnicianProfile2,
  createSlots: createSlots2,
  getMySlots: getMySlots2,
  deleteSlot: deleteSlot2,
  getAvailabilityByService: getAvailabilityByService2,
  getAllTechnician: getAllTechnician2
};

// src/module/service/service.service.ts
var createService = async (payload, userId) => {
  const { title, price, description, duration, categoryId } = payload;
  const isExist = await prisma.service.findFirst({
    where: {
      technician: { userId },
      categoryId,
      title,
      price,
      description,
      duration
    }
  });
  if (isExist) {
    throw new Error("You already have the same service with the same information");
  }
  ;
  const createdService = await prisma.service.create({
    data: {
      title,
      description,
      price,
      duration,
      technician: { connect: { userId } },
      category: { connect: { id: categoryId } }
    }
  });
  return createdService;
};
var getAllServices = async (query) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const andConditions = [];
  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.title) {
    andConditions.push({
      title: query.title
    });
  }
  if (query.price) {
    andConditions.push({
      price: { gte: Number(query.price) }
    });
  }
  if (query.categoryId) {
    andConditions.push({
      categoryId: query.categoryId
    });
  }
  if (query.location) {
    andConditions.push({
      technician: {
        location: query.location
      }
    });
  }
  if (query.rating) {
    andConditions.push({
      rating: { gte: Number(query.rating) }
    });
  }
  const services = await prisma.service.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder
    },
    include: {
      category: true,
      technician: {
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
  return services;
};
var serviceSerivce = {
  createService,
  getAllServices
};

// src/module/service/service.controller.ts
import httpStatus5 from "http-status";
var createService2 = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    console.log(payload, req.user?.id);
    const createdService = await serviceSerivce.createService(payload, req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus5.CREATED,
      message: `${payload.title} service is created successfully`,
      data: { createdService }
    });
  }
);
var getAllServices2 = catchAsync(
  async (req, res, next) => {
    const query = req.query;
    const services = await serviceSerivce.getAllServices(query);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus5.OK,
      message: "All the services are retrieved successfully",
      data: { services }
    });
  }
);
var serviceController = {
  createService: createService2,
  getAllServices: getAllServices2
};

// src/module/technician/technician.route.ts
var router3 = Router3();
router3.get("/profile", auth(Role.ADMIN, Role.TECHNICIAN, Role.CUSTOMER), technicianController.getTechnicianProfile);
router3.post("/new_service", auth(Role.ADMIN, Role.TECHNICIAN), serviceController.createService);
router3.post("/new_slots", auth(Role.TECHNICIAN), technicianController.createSlots);
router3.get("/my_slots", auth(Role.TECHNICIAN), technicianController.getMySlots);
router3.delete("/slots/:id", auth(Role.TECHNICIAN), technicianController.deleteSlot);
router3.get("/availability/:serviceId", technicianController.getAvailabilityByService);
router3.get("/all", technicianController.getAllTechnician);
var technicianRoutes = router3;

// src/module/admin/admin.routes.ts
import { Router as Router4 } from "express";

// src/module/admin/admin.service.ts
var getAllUsers = async () => {
  const users = await prisma.user.findMany({
    omit: {
      password: true
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      profile: true,
      technicianProfile: true
    }
  });
  return users;
};
var verifyTechnician = async (technicianId) => {
  const isExistTechnician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      id: technicianId
    }
  });
  if (!isExistTechnician) {
    throw new Error("The technician is not exist");
  }
  ;
  const verifiedTechnician = await prisma.technicianProfile.update({
    where: {
      id: technicianId
    },
    data: {
      verified: true
    }
  });
  return verifiedTechnician;
};
var updateUserStatus = async (userId, activeStatus) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      activeStatus
    },
    omit: {
      password: true
    }
  });
  return updatedUser;
};
var adminService = {
  getAllUsers,
  verifyTechnician,
  updateUserStatus
};

// src/module/admin/admin.controller.ts
import httpstatus from "http-status";
var getAllUsers2 = catchAsync(
  async (req, res, next) => {
    const users = await adminService.getAllUsers();
    sendResponse(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "All Users are fetched successfully",
      data: { users }
    });
  }
);
var verifyTechnician2 = catchAsync(
  async (req, res, next) => {
    const technicianId = req.params.id;
    const verifiedTechnician = await adminService.verifyTechnician(technicianId);
    sendResponse(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "Technician verified successfully",
      data: { verifiedTechnician }
    });
  }
);
var updateUserStatus2 = catchAsync(
  async (req, res, next) => {
    const userId = req.params.id;
    const { activeStatus } = req.body;
    const updatedUser = await adminService.updateUserStatus(userId, activeStatus);
    sendResponse(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "User status updated successfully",
      data: { updatedUser }
    });
  }
);
var adminController = {
  getAllUsers: getAllUsers2,
  verifyTechnician: verifyTechnician2,
  updateUserStatus: updateUserStatus2
};

// src/module/categories/category.service.ts
var createCategory = async (name) => {
  const isExist = await prisma.category.findUnique({
    where: {
      name
    }
  });
  if (isExist) {
    throw new Error(`${name} category is already exist.`);
  }
  ;
  const createdCategory = await prisma.category.create({
    data: {
      name
    }
  });
  return createdCategory;
};
var getAllCategory = async () => {
  const categories = await prisma.category.findMany({
    include: {
      services: {
        include: {
          technician: {
            select: {
              experience: true,
              hourlyRate: true,
              user: {
                omit: {
                  password: true
                }
              }
            }
          }
        }
      }
    }
  });
  return categories;
};
var categoryService = {
  createCategory,
  getAllCategory
};

// src/module/categories/category.controller.ts
import httpStatus6 from "http-status";
var createCategory2 = catchAsync(
  async (req, res, next) => {
    const { name } = req.body;
    const category = await categoryService.createCategory(name);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus6.CREATED,
      message: `${name} created successfully`,
      data: { category }
    });
  }
);
var getAllCategory2 = catchAsync(
  async (req, res, next) => {
    const categories = await categoryService.getAllCategory();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus6.OK,
      message: "All the categories are retrieved successfully",
      data: { categories }
    });
  }
);
var categoryController = {
  createCategory: createCategory2,
  getAllCategory: getAllCategory2
};

// src/module/bookings/booking.service.ts
var allowedTransitions = {
  REQUESTED: [BookingStatus.ACCEPTED, BookingStatus.DECLINED],
  ACCEPTED: [BookingStatus.IN_PROGRESS, BookingStatus.CANCELLED],
  PAID: [BookingStatus.IN_PROGRESS],
  IN_PROGRESS: [BookingStatus.COMPLETED]
};
var createBooking = async (payload, userId) => {
  const { serviceId, bookingDate, startTime, address, problemDescription } = payload;
  const service = await prisma.service.findUniqueOrThrow({
    where: {
      id: serviceId
    },
    include: {
      technician: {
        select: {
          userId: true
        }
      }
    }
  });
  if (!service.isActive) {
    throw new Error("This service is not available right now");
  }
  ;
  if (service.technician.userId === userId) {
    throw new Error("You can not book your own service");
  }
  ;
  const [startHour, startMinute] = startTime.split(":").map(Number);
  if (startHour === void 0 || startMinute === void 0 || Number.isNaN(startHour) || Number.isNaN(startMinute)) {
    throw new Error("startTime must be in HH:mm format");
  }
  ;
  const endsAt = startHour * 60 + startMinute + service.duration;
  const endTime = `${String(Math.floor(endsAt / 60) % 24).padStart(2, "0")}:${String(endsAt % 60).padStart(2, "0")}`;
  const createdBooking = await prisma.$transaction(async (tx) => {
    const freeSlots = await tx.availability.findMany({
      where: {
        technicianId: service.technicianId,
        date: new Date(bookingDate),
        isBooked: false
      },
      orderBy: {
        startTime: "asc"
      }
    });
    const firstIndex = freeSlots.findIndex((slot) => slot.startTime === startTime);
    if (firstIndex === -1) {
      throw new Error("The technician is not available at that time");
    }
    ;
    const claimedIds = [];
    let covered = 0;
    let previousEnd = startTime;
    for (let index = firstIndex; index < freeSlots.length && covered < service.duration; index++) {
      const slot = freeSlots[index];
      if (!slot || slot.startTime !== previousEnd) {
        break;
      }
      ;
      claimedIds.push(slot.id);
      covered += toMinutes(slot.endTime) - toMinutes(slot.startTime);
      previousEnd = slot.endTime;
    }
    ;
    if (covered < service.duration) {
      throw new Error("The technician is not free for the full service duration");
    }
    ;
    const claimed = await tx.availability.updateMany({
      where: {
        id: { in: claimedIds },
        isBooked: false
      },
      data: {
        isBooked: true
      }
    });
    if (claimed.count !== claimedIds.length) {
      throw new Error("That time was just taken, please pick another slot");
    }
    ;
    return tx.booking.create({
      data: {
        customerId: userId,
        technicianId: service.technicianId,
        serviceId: service.id,
        bookingDate: new Date(bookingDate),
        startTime,
        endTime,
        address,
        problemDescription,
        totalPrice: service.price
      }
    });
  });
  return createdBooking;
};
var releaseSlots = async (tx, booking) => {
  await tx.availability.updateMany({
    where: {
      technicianId: booking.technicianId,
      date: booking.bookingDate,
      startTime: { gte: booking.startTime },
      endTime: { lte: booking.endTime },
      isBooked: true
    },
    data: {
      isBooked: false
    }
  });
};
var getMyBookings = async (userId) => {
  const bookings = await prisma.booking.findMany({
    where: {
      customerId: userId
    },
    include: {
      service: {
        select: {
          title: true,
          duration: true
        }
      },
      technician: {
        select: {
          user: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      bookingDate: "desc"
    }
  });
  return bookings;
};
var getTechnicianBookings = async (userId) => {
  const bookings = await prisma.booking.findMany({
    where: {
      technician: {
        userId
      }
    },
    include: {
      service: {
        select: {
          title: true,
          duration: true
        }
      },
      customer: {
        select: {
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      bookingDate: "desc"
    }
  });
  return bookings;
};
var getSingleBooking = async (bookingId, userId) => {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: {
      id: bookingId
    },
    include: {
      service: true,
      technician: {
        select: {
          userId: true,
          user: {
            select: {
              name: true
            }
          }
        }
      },
      customer: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });
  if (booking.customerId !== userId && booking.technician.userId !== userId) {
    throw new Error("You are not allowed to see this booking");
  }
  ;
  return booking;
};
var updateBookingStatus = async (bookingId, userId, status) => {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: {
      id: bookingId
    },
    include: {
      technician: {
        select: {
          userId: true
        }
      }
    }
  });
  if (booking.technician.userId !== userId) {
    throw new Error("You are not allowed to update this booking");
  }
  ;
  const nextStatuses = allowedTransitions[booking.status] || [];
  if (!nextStatuses.includes(status)) {
    throw new Error(`A ${booking.status} booking can not be moved to ${status}`);
  }
  ;
  const updatedBooking = await prisma.$transaction(async (tx) => {
    if (status === BookingStatus.DECLINED || status === BookingStatus.CANCELLED) {
      await releaseSlots(tx, booking);
    }
    ;
    return tx.booking.update({
      where: {
        id: bookingId
      },
      data: {
        status
      }
    });
  });
  return updatedBooking;
};
var cancelBooking = async (bookingId, userId) => {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: {
      id: bookingId
    }
  });
  if (booking.customerId !== userId) {
    throw new Error("You are not allowed to cancel this booking");
  }
  ;
  if (booking.status === BookingStatus.COMPLETED || booking.status === BookingStatus.CANCELLED) {
    throw new Error(`A ${booking.status} booking can not be cancelled`);
  }
  ;
  const cancelledBooking = await prisma.$transaction(async (tx) => {
    await releaseSlots(tx, booking);
    return tx.booking.update({
      where: {
        id: bookingId
      },
      data: {
        status: BookingStatus.CANCELLED
      }
    });
  });
  return cancelledBooking;
};
var getAllBookings = async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      service: {
        select: {
          title: true,
          duration: true
        }
      },
      technician: {
        select: {
          user: {
            select: {
              name: true
            }
          }
        }
      },
      customer: {
        select: {
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      bookingDate: "desc"
    }
  });
  return bookings;
};
var bookingService = {
  createBooking,
  getMyBookings,
  getTechnicianBookings,
  getSingleBooking,
  updateBookingStatus,
  cancelBooking,
  getAllBookings
};

// src/module/bookings/booking.controller.ts
import httpStatus7 from "http-status";
var createBooking2 = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const createdBooking = await bookingService.createBooking(payload, req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus7.CREATED,
      message: "Booking request is created successfully",
      data: { createdBooking }
    });
  }
);
var getMyBookings2 = catchAsync(
  async (req, res, next) => {
    const bookings = await bookingService.getMyBookings(req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus7.OK,
      message: "Your bookings are retrieved successfully",
      data: { bookings }
    });
  }
);
var getTechnicianBookings2 = catchAsync(
  async (req, res, next) => {
    const bookings = await bookingService.getTechnicianBookings(req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus7.OK,
      message: "Your incoming bookings are retrieved successfully",
      data: { bookings }
    });
  }
);
var getSingleBooking2 = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const booking = await bookingService.getSingleBooking(id, req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus7.OK,
      message: "Booking is retrieved successfully",
      data: { booking }
    });
  }
);
var updateBookingStatus2 = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const { status } = req.body;
    const updatedBooking = await bookingService.updateBookingStatus(id, req.user?.id, status);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus7.OK,
      message: `Booking status is updated to ${status}`,
      data: { updatedBooking }
    });
  }
);
var cancelBooking2 = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const cancelledBooking = await bookingService.cancelBooking(id, req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus7.OK,
      message: "Booking is cancelled successfully",
      data: { cancelledBooking }
    });
  }
);
var getAllBookings2 = catchAsync(
  async (req, res, next) => {
    const bookings = await bookingService.getAllBookings();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus7.OK,
      message: "All bookings are retrieved successfully",
      data: { bookings }
    });
  }
);
var bookingController = {
  createBooking: createBooking2,
  getMyBookings: getMyBookings2,
  getTechnicianBookings: getTechnicianBookings2,
  getSingleBooking: getSingleBooking2,
  updateBookingStatus: updateBookingStatus2,
  cancelBooking: cancelBooking2,
  getAllBookings: getAllBookings2
};

// src/module/payments/payment.service.ts
import SSLCommerzPayment from "sslcommerz-lts";
var isLive = config_default.is_live === "true";
var getGateway = () => new SSLCommerzPayment(config_default.store_id, config_default.store_passwd, isLive);
var initilization = async (booking_id, userId) => {
  const sslcz = getGateway();
  const booking = await prisma.booking.findUniqueOrThrow({
    where: {
      id: booking_id
    },
    include: {
      service: {
        include: {
          category: true
        }
      },
      customer: true
    }
  });
  if (booking.customerId !== userId) {
    throw new Error("You can't pay others booking");
  }
  const payment = await prisma.payment.findUnique({
    where: {
      bookingId: booking_id
    }
  });
  if (payment && payment.status === "COMPLETED") {
    throw new Error("The payment for this booking is already COMPLETED");
  }
  if (booking.status === BookingStatus.PAID) {
    throw new Error("This booking is already paid");
  }
  ;
  if (booking.status !== BookingStatus.ACCEPTED) {
    throw new Error(`A ${booking.status} booking can not be paid`);
  }
  ;
  const data = {
    total_amount: `${booking.totalPrice}`,
    currency: "BDT",
    tran_id: `trx_${booking_id}`,
    // use unique tran_id for each api call
    success_url: `http://localhost:3000/api/payment/${booking_id}/success`,
    fail_url: `http://localhost:3000/api/payment/${booking_id}/fail`,
    cancel_url: `http://localhost:3000/api/payment/${booking_id}/cancel`,
    ipn_url: "http://localhost:3000/ipn",
    shipping_method: "Courier",
    product_name: `${booking.service.title}`,
    product_category: `${booking.service.category.name}`,
    product_profile: "general",
    cus_name: `${booking.customer.name}`,
    cus_email: `${booking.customer.email}`,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: "1000",
    ship_country: "Bangladesh",
    productcategory: "test",
    emi_option: 0,
    num_of_item: "1"
  };
  const apiResponse = await sslcz.init(data);
  if (!apiResponse.GatewayPageURL) {
    throw new Error(`Payment gateway did not return a redirect url: ${JSON.stringify(apiResponse)}`);
  }
  ;
  await prisma.payment.upsert({
    where: {
      bookingId: booking_id
    },
    create: {
      bookingId: booking_id,
      provider: PaymentProvider.SSLCOMMERZ,
      amount: booking.totalPrice,
      paymentIntentId: apiResponse.sessionkey,
      status: PaymentStatus.PENDING
    },
    update: {
      amount: booking.totalPrice,
      paymentIntentId: apiResponse.sessionkey,
      status: PaymentStatus.PENDING
    }
  });
  return apiResponse;
};
var successPayment = async (booking_id, val_id) => {
  if (!val_id) {
    throw new Error("val_id is missing from the gateway callback");
  }
  ;
  const payment = await prisma.payment.findUniqueOrThrow({
    where: {
      bookingId: booking_id
    }
  });
  if (payment.status === PaymentStatus.COMPLETED) {
    return payment;
  }
  ;
  const validation = await getGateway().validate({ val_id });
  console.log(validation);
  if (validation.status !== "VALID" && validation.status !== "VALIDATED") {
    throw new Error(`Payment could not be validated: ${JSON.stringify(validation)}`);
  }
  ;
  if (validation.tran_id !== `trx_${booking_id}`) {
    throw new Error("The gateway transaction does not belong to this booking");
  }
  ;
  if (Math.abs(Number(validation.amount) - payment.amount) > 0.01) {
    throw new Error("The paid amount does not match the booking total");
  }
  ;
  const paidPayment = await prisma.$transaction(async (tx) => {
    await tx.booking.update({
      where: {
        id: booking_id
      },
      data: {
        status: BookingStatus.PAID
      }
    });
    return tx.payment.update({
      where: {
        bookingId: booking_id
      },
      data: {
        status: PaymentStatus.COMPLETED,
        paidAt: /* @__PURE__ */ new Date(),
        transactionId: validation.bank_tran_id,
        methodType: validation.card_type,
        method: validation.card_brand
      }
    });
  });
  return paidPayment;
};
var failPayment = async (booking_id) => {
  const payment = await prisma.payment.findUniqueOrThrow({
    where: {
      bookingId: booking_id
    }
  });
  if (payment.status === PaymentStatus.COMPLETED) {
    return payment;
  }
  ;
  return prisma.payment.update({
    where: {
      bookingId: booking_id
    },
    data: {
      status: PaymentStatus.FAILED
    }
  });
};
var cancelPayment = async (booking_id) => {
  const payment = await prisma.payment.findUniqueOrThrow({
    where: {
      bookingId: booking_id
    }
  });
  if (payment.status === PaymentStatus.COMPLETED) {
    return payment;
  }
  ;
  return prisma.payment.update({
    where: {
      bookingId: booking_id
    },
    data: {
      status: PaymentStatus.FAILED
    }
  });
};
var getMyPayments = async (customerId) => {
  const payments = await prisma.payment.findMany({
    where: {
      booking: {
        customerId
      }
    },
    include: {
      booking: {
        select: {
          bookingDate: true,
          service: {
            select: {
              title: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return payments;
};
var getPaymentDetails = async (booking_id, userId, role) => {
  const payment = await prisma.payment.findUniqueOrThrow({
    where: {
      bookingId: booking_id
    },
    include: {
      booking: {
        include: {
          service: {
            select: {
              title: true
            }
          },
          customer: {
            select: {
              name: true,
              email: true
            }
          },
          technician: {
            select: {
              user: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    }
  });
  if (role !== Role.ADMIN && payment.booking.customerId !== userId) {
    throw new Error("You are not allowed to see this payment");
  }
  ;
  return payment;
};
var getAllPayments = async () => {
  const payments = await prisma.payment.findMany({
    include: {
      booking: {
        include: {
          service: {
            select: {
              title: true
            }
          },
          customer: {
            select: {
              name: true,
              email: true
            }
          },
          technician: {
            select: {
              user: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return payments;
};
var paymentService = {
  initilization,
  successPayment,
  failPayment,
  cancelPayment,
  getMyPayments,
  getPaymentDetails,
  getAllPayments
};

// src/module/payments/payment.controller.ts
import httpStatus8 from "http-status";
var initilization2 = catchAsync(
  async (req, res, next) => {
    const apiResponse = await paymentService.initilization(req.params.booking_id, req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus8.OK,
      message: "Payment initilization done",
      data: { apiResponse }
    });
  }
);
var successPayment2 = catchAsync(
  async (req, res, next) => {
    const booking_id = req.params.booking_id;
    const val_id = req.body.val_id;
    await paymentService.successPayment(booking_id, val_id);
    res.redirect(`${config_default.app_url}/api/booking/${booking_id}`);
  }
);
var failPayment2 = catchAsync(
  async (req, res, next) => {
    const booking_id = req.params.booking_id;
    await paymentService.failPayment(booking_id);
    res.redirect(`${config_default.app_url}/api/booking/${booking_id}`);
  }
);
var cancelPayment2 = catchAsync(
  async (req, res, next) => {
    const booking_id = req.params.booking_id;
    await paymentService.cancelPayment(booking_id);
    res.redirect(`${config_default.app_url}/api/booking/${booking_id}`);
  }
);
var getMyPayments2 = catchAsync(
  async (req, res, next) => {
    const payments = await paymentService.getMyPayments(req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus8.OK,
      message: "Your payments are retrieved successfully",
      data: { payments }
    });
  }
);
var getPaymentDetails2 = catchAsync(
  async (req, res, next) => {
    const booking_id = req.params.booking_id;
    const payment = await paymentService.getPaymentDetails(booking_id, req.user?.id, req.user?.role);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus8.OK,
      message: "Payment details are retrieved successfully",
      data: { payment }
    });
  }
);
var getAllPayments2 = catchAsync(
  async (req, res, next) => {
    const payments = await paymentService.getAllPayments();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus8.OK,
      message: "All payments are retrieved successfully",
      data: { payments }
    });
  }
);
var paymentController = {
  initilization: initilization2,
  successPayment: successPayment2,
  failPayment: failPayment2,
  cancelPayment: cancelPayment2,
  getMyPayments: getMyPayments2,
  getPaymentDetails: getPaymentDetails2,
  getAllPayments: getAllPayments2
};

// src/module/admin/admin.routes.ts
var router4 = Router4();
router4.get("/users", auth(Role.ADMIN), adminController.getAllUsers);
router4.post("/new_category", auth(Role.ADMIN), categoryController.createCategory);
router4.put("/:id/verify_technician", auth(Role.ADMIN), adminController.verifyTechnician);
router4.get("/bookings", auth(Role.ADMIN), bookingController.getAllBookings);
router4.patch("/:id/status", auth(Role.ADMIN), adminController.updateUserStatus);
router4.get("/payments", auth(Role.ADMIN), paymentController.getAllPayments);
var adminRoutes = router4;

// src/module/categories/category.route.ts
import { Router as Router5 } from "express";
var router5 = Router5();
router5.get("/all", categoryController.getAllCategory);
var categoryRoutes = router5;

// src/module/service/service.routes.ts
import { Router as Router6 } from "express";
var router6 = Router6();
router6.get("/all", serviceController.getAllServices);
var serviceRoutes = router6;

// src/module/bookings/booking.routes.ts
import { Router as Router7 } from "express";
var router7 = Router7();
router7.post("/new_booking", auth(Role.CUSTOMER, Role.TECHNICIAN), bookingController.createBooking);
router7.get("/my_bookings", auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN), bookingController.getMyBookings);
router7.get("/technician_bookings", auth(Role.TECHNICIAN), bookingController.getTechnicianBookings);
router7.get("/:id", auth(Role.CUSTOMER, Role.TECHNICIAN), bookingController.getSingleBooking);
router7.patch("/:id/status", auth(Role.TECHNICIAN), bookingController.updateBookingStatus);
router7.patch("/:id/cancel", auth(Role.CUSTOMER), bookingController.cancelBooking);
var bookingRoutes = router7;

// src/module/payments/payment.routes.ts
import { Router as Router8 } from "express";
var router8 = Router8();
router8.get("/:booking_id/init", auth(Role.CUSTOMER), paymentController.initilization);
router8.post("/:booking_id/success", paymentController.successPayment);
router8.post("/:booking_id/fail", paymentController.failPayment);
router8.post("/:booking_id/cancel", paymentController.cancelPayment);
router8.get("/my_payments", auth(Role.CUSTOMER), paymentController.getMyPayments);
router8.get("/:booking_id/details", auth(Role.CUSTOMER, Role.ADMIN), paymentController.getPaymentDetails);
var paymentRoutes = router8;

// src/module/review/review.routes.ts
import { Router as Router9 } from "express";

// src/module/review/review.service.ts
var createReview = async (bookingId, customerId, payload) => {
  const { rating, comment } = payload;
  if (rating < 1 || rating > 5) {
    throw new Error(`rating must be between 1 and 5. You gave ${rating}`);
  }
  ;
  const booking = await prisma.booking.findUniqueOrThrow({
    where: {
      id: bookingId
    }
  });
  if (booking.customerId !== customerId) {
    throw new Error("You can't review others booking");
  }
  ;
  if (booking.status !== BookingStatus.COMPLETED) {
    throw new Error("Only a completed booking can be reviewed");
  }
  ;
  const existingReview = await prisma.review.findUnique({
    where: {
      bookingId
    }
  });
  if (existingReview) {
    throw new Error("This booking is already reviewed");
  }
  ;
  const review = await prisma.$transaction(async (tx) => {
    const createdReview = await tx.review.create({
      data: {
        bookingId,
        customerId,
        technicianId: booking.technicianId,
        rating,
        comment
      }
    });
    const technician = await tx.technicianProfile.findUniqueOrThrow({
      where: {
        id: booking.technicianId
      },
      select: {
        averageRating: true,
        totalReviews: true
      }
    });
    const totalReviews = technician.totalReviews + 1;
    const averageRating = (technician.averageRating * technician.totalReviews + rating) / totalReviews;
    await tx.technicianProfile.update({
      where: {
        id: booking.technicianId
      },
      data: {
        averageRating,
        totalReviews
      }
    });
    return createdReview;
  });
  return review;
};
var getMyReviews = async (customerId) => {
  const reviews = await prisma.review.findMany({
    where: {
      customerId
    },
    include: {
      technician: {
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return reviews;
};
var updateReview = async (reviewId, customerId, payload) => {
  const { rating, comment } = payload;
  if (rating !== void 0 && (rating < 1 || rating > 5)) {
    throw new Error("rating must be between 1 and 5");
  }
  ;
  const review = await prisma.review.findUniqueOrThrow({
    where: {
      id: reviewId
    }
  });
  if (review.customerId !== customerId) {
    throw new Error("You can't edit others review");
  }
  ;
  const updatedReview = await prisma.$transaction(async (tx) => {
    const result = await tx.review.update({
      where: {
        id: reviewId
      },
      data: {
        rating,
        comment
      }
    });
    if (rating !== void 0 && rating !== review.rating) {
      const technician = await tx.technicianProfile.findUniqueOrThrow({
        where: {
          id: review.technicianId
        },
        select: {
          averageRating: true,
          totalReviews: true
        }
      });
      const averageRating = (technician.averageRating * technician.totalReviews - review.rating + rating) / technician.totalReviews;
      await tx.technicianProfile.update({
        where: {
          id: review.technicianId
        },
        data: {
          averageRating
        }
      });
    }
    ;
    return result;
  });
  return updatedReview;
};
var getTechnicianReviews = async (technicianId) => {
  const reviews = await prisma.review.findMany({
    where: {
      technicianId
    },
    include: {
      customer: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return reviews;
};
var getServiceReviews = async (serviceId) => {
  const reviews = await prisma.review.findMany({
    where: {
      booking: {
        serviceId
      }
    },
    include: {
      customer: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return reviews;
};
var reviewService = {
  createReview,
  getMyReviews,
  updateReview,
  getTechnicianReviews,
  getServiceReviews
};

// src/module/review/review.controller.ts
import httpStatus9 from "http-status";
var createReview2 = catchAsync(
  async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const review = await reviewService.createReview(bookingId, req.user?.id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus9.CREATED,
      message: "Review is submitted successfully",
      data: { review }
    });
  }
);
var getMyReviews2 = catchAsync(
  async (req, res, next) => {
    const reviews = await reviewService.getMyReviews(req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus9.OK,
      message: "Your reviews are retrived successfully",
      data: { reviews }
    });
  }
);
var updateReview2 = catchAsync(
  async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const review = await reviewService.updateReview(reviewId, req.user?.id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus9.OK,
      message: "Review is updated successfully",
      data: { review }
    });
  }
);
var getTechnicianReviews2 = catchAsync(
  async (req, res, next) => {
    const technicianId = req.params.technicianId;
    const reviews = await reviewService.getTechnicianReviews(technicianId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus9.OK,
      message: "Reviews are retrived successfully",
      data: { reviews }
    });
  }
);
var getServiceReviews2 = catchAsync(
  async (req, res, next) => {
    const serviceId = req.params.serviceId;
    const reviews = await reviewService.getServiceReviews(serviceId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus9.OK,
      message: "Reviews are retrived successfully",
      data: { reviews }
    });
  }
);
var reviewController = {
  createReview: createReview2,
  getMyReviews: getMyReviews2,
  updateReview: updateReview2,
  getTechnicianReviews: getTechnicianReviews2,
  getServiceReviews: getServiceReviews2
};

// src/module/review/review.routes.ts
var router9 = Router9();
router9.post("/:bookingId", auth(Role.CUSTOMER), reviewController.createReview);
router9.get("/my_reviews", auth(Role.CUSTOMER), reviewController.getMyReviews);
router9.get("/technician/:technicianId", reviewController.getTechnicianReviews);
router9.get("/service/:serviceId", reviewController.getServiceReviews);
router9.patch("/:reviewId", auth(Role.CUSTOMER), reviewController.updateReview);
var reviewRoutes = router9;

// src/app.ts
var app = express();
app.use(cors({
  origin: config_default.app_url,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to DevPulse",
    author: "Anisul Haque",
    admin: "abc@gmail.com   pass:1234",
    technician: "abc<8/9>@gmail.com   pass:1234",
    customer: "abc<1-7>@gmail.com.   pass:1234"
  });
});
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/review", reviewRoutes);
app.use(notFound);
app.use(globalErrorHandler);
var app_default = app;

// src/server.ts
var PORT = config_default.port;
async function main() {
  try {
    app_default.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Error occurred while starting the server: ${error}`);
    process.exit(1);
  }
}
main();
//# sourceMappingURL=server.js.map