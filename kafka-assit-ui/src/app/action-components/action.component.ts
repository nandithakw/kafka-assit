import { EventEmitter } from "@angular/core";
import { SelectedActionDetails } from "../models/simple-autocomplet-item";

export interface ActionComponent {
  commandReponse: EventEmitter<any>;
  connectionName: string | null | undefined;
}

