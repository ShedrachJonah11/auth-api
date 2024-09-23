import { applyDecorators, SetMetadata } from '@nestjs/common';

export const VERSION_METADATA_KEY = 'version';

export const ApiVersion = (version: string) => {
  return applyDecorators(
    SetMetadata(VERSION_METADATA_KEY, version),
  );
};
