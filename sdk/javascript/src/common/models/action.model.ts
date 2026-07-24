import { Extension } from './extension.model';
import { Session } from './session.model';
import { ValuesField } from "../interfaces/fields.interface";
import { ActionFunction } from './action-function.model';
import { ActionGroup } from './action-group.model';

export interface Action {
    id: number;
    command: string;
    values: ValuesField[];
    session: Session;
    extension: Extension;
    functions: ActionFunction[]
    groups: ActionGroup[]
}
