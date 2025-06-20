import { jsonSchemaTransform } from "fastify-type-provider-zod";
import type { JSONSchema7 } from "json-schema";

type TransformSwaggerSchemaData = Parameters<typeof jsonSchemaTransform>[0];

export function transformSwaggerSchema(data: TransformSwaggerSchemaData) {
  const { schema, url } = jsonSchemaTransform(data);

  if (schema.consumes?.includes("multipart/form-data")) {
    if (schema.body === undefined) {
      schema.body = {
        type: "object",
        required: [],
        properties: {},
      } as JSONSchema7;
    }

    const body = schema.body as JSONSchema7;

    //   schema.body.properties.file = {
    //     type: "string",
    //     format: "binary",
    //   };

    //   schema.body.required.push("file");
    // }

    if (
      body.type === "object" &&
      typeof body.properties === "object" &&
      Array.isArray(body.required)
    ) {
      body.properties["file"] = {
        type: "string",
        format: "binary",
      };

      body.required.push("file");
    }
  }

  return { schema, url };
}
