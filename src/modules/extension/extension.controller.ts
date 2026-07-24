import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExtensionRegistryService } from './extension-registry.service';

@Controller('extensions')
export class ExtensionController {
    constructor(
        private readonly registryS: ExtensionRegistryService,
    ) { }

    @Get()
    getCatalog() {
        return this.registryS.getCatalog();
    }
}