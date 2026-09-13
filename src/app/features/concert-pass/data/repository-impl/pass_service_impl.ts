import { inject, Service } from "@angular/core";
import { FullName } from "../../domain/model/full_name";
import { TicketTier } from "../../domain/model/ticket_tier";
import { PassService } from "../../domain/repository/pass_service";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { API_URL } from "../../../../core/tokens";


@Service({ autoProvided: false })
export class PassServiceImpl implements PassService {

  private readonly apiUrl = inject(API_URL)

  private readonly httpClient = inject(HttpClient)

  createPass(name: FullName, tier: TicketTier, date: Date): Promise<Blob> {
    const $request = this.httpClient.post(
      this.apiUrl + '/pass',
      {
        name: name.toString(),
        tier,
        event_time: date
      },
      { responseType: 'blob' }
    )
    return firstValueFrom($request)
  }

}