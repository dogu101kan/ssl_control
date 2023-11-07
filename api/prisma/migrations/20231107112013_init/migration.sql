-- CreateTable
CREATE TABLE "Websites" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sslProviderId" TEXT,

    CONSTRAINT "Websites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SSLResults" (
    "id" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "validFrom" TEXT NOT NULL,
    "validTo" TEXT NOT NULL,
    "fingerPrint" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "infoAccess" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SSLResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mails" (
    "id" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SSLProviders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SSLProviders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mails_userId_key" ON "Mails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Websites" ADD CONSTRAINT "Websites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Websites" ADD CONSTRAINT "Websites_sslProviderId_fkey" FOREIGN KEY ("sslProviderId") REFERENCES "SSLProviders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SSLResults" ADD CONSTRAINT "SSLResults_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Websites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mails" ADD CONSTRAINT "Mails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
