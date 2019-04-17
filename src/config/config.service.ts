import { config, parse } from 'dotenv';
import { readFileSync } from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    // TODO: validate env file
    this.envConfig = parse(readFileSync(filePath));
    config(this.envConfig);
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
