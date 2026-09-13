import { FullName } from "../model/full_name";
import { TicketTier } from "../model/ticket_tier";

export abstract class PassService {

  abstract createPass(name: FullName, tier: TicketTier, date: Date): Promise<Blob>

}