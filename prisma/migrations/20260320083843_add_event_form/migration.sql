-- CreateTable
CREATE TABLE "EventForm" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "fields" JSONB NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "upiQrImage" TEXT,
    "upiId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventFormSubmission" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "userId" TEXT,
    "responses" JSONB NOT NULL,
    "paymentProof" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "ticketCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventFormSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventForm_eventId_key" ON "EventForm"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "EventFormSubmission_ticketCode_key" ON "EventFormSubmission"("ticketCode");

-- AddForeignKey
ALTER TABLE "EventForm" ADD CONSTRAINT "EventForm_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventFormSubmission" ADD CONSTRAINT "EventFormSubmission_formId_fkey" FOREIGN KEY ("formId") REFERENCES "EventForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventFormSubmission" ADD CONSTRAINT "EventFormSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
