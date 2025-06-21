import { beforeAll, describe, expect, it, vi } from "vitest";
import { uploadImage } from "./upload-image";
import { Readable } from "stream";
import { isLeft, isRight, unwrapEither } from "@/shared/either";
import { randomUUID } from "crypto";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { InvalidFileFormat } from "./errors/invalid-file-format";

describe("upload image", () => {
  beforeAll(() => {
    vi.mock("@/infra/storage/upload-file-to-storage", () => {
      return {
        uploadFileToStorage: vi.fn().mockImplementation(() => {
          return {
            key: `${randomUUID()}.jpeg`,
            url: "http://stogare.com/image.jpeg",
          };
        }),
      };
    });
  });

  it("should be able to upload an image", async () => {
    const fileName = `${randomUUID()}.jpeg`;

    const sut = await uploadImage({
      fileName,
      contentType: "image/jpeg",
      contentStream: Readable.from([]),
    });

    expect(isRight(sut)).toBe(true);

    const result = await db
      .select()
      .from(schema.uploads)
      .where(eq(schema.uploads.name, fileName));

    expect(result).toHaveLength(1);
  });

  it("should not be able to upload an invalid file", async () => {
    const fileName = `${randomUUID()}.pdf`;

    const sut = await uploadImage({
      fileName,
      contentType: "document/pdf",
      contentStream: Readable.from([]),
    });

    expect(isLeft(sut)).toBe(true);
    expect(unwrapEither(sut)).toBeInstanceOf(InvalidFileFormat);
  });
});
