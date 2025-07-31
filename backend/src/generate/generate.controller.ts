import { Controller, Post, Body } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execAsync = promisify(exec);

@Controller('generate')
export class GenerateController {
  @Post()
  async generate(@Body() body: { key: string }) {
    const { key } = body;

    // 🔧 Resolve the absolute path to the Python script
    const scriptPath = path.resolve(__dirname, '../../../infrastructure/generate_and_upload.py');

    try {
      const { stdout } = await execAsync(`python3 "${scriptPath}" ${key}`);

      const url = stdout.trim();

      return { url };
    } catch (error) {
      console.error('❌ Python script failed:', error);
      throw new Error('Failed to generate website');
    }
  }
}
