import { InfoExtension } from '@ivy-eco/info';
import { ExtensionDefinition } from './modules/extension/extension.interface';
import { AternosExtension } from '@ivy-eco/aternos';

export const extensionsList: ExtensionDefinition[] = [
    { module: InfoExtension },
    { module: AternosExtension }
];