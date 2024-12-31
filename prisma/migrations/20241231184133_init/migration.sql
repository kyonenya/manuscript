-- CreateTable
CREATE TABLE "Entry" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EntryToTag" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EntryToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Entry" ("uuid") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EntryToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_EntryToTag_AB_unique" ON "_EntryToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_EntryToTag_B_index" ON "_EntryToTag"("B");
