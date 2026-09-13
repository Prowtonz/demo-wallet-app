import { formatDate, KeyValuePipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { TicketTier } from '../../domain/model/ticket_tier';
import { FullName } from '../../domain/model/full_name';
import { PassService } from '../../domain/repository/pass_service';
import { form, FormField, FormRoot, required } from "@angular/forms/signals";
import { HlmDatePickerImports, provideHlmDatePickerConfig } from '@spartan-ng/helm/date-picker';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { ParseFullNameDirective } from './parse-fullname.directive';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { MatIconModule } from "@angular/material/icon";
import { ConcertPassScreenFormItem } from './concert-pass-screen-form-item/concert-pass-screen-form-item';


interface PassData {

  name: FullName | null,

  tier: TicketTier | null,

  date: Date | null

}

interface TicketTierDropdownItem {

  readonly icon: string

  readonly label: string

  readonly color: string

}

@Component({
  selector: 'app-concert-pass-screen',
  styleUrl: './concert-pass-screen.css',
  templateUrl: './concert-pass-screen.html',
  imports: [
    MatIconModule,
    ParseFullNameDirective,
    NgOptimizedImage,
    FormField,
    KeyValuePipe,
    FormRoot,
    ConcertPassScreenFormItem,
    HlmDatePickerImports,
    HlmSelectImports,
    HlmInputImports,
    HlmButtonImports
  ],
  providers: [
    provideHlmDatePickerConfig({
      formatDate: (date: Date) => formatDate(date, 'MMMM d, y', 'en-US')
    })
  ]
})
export class ConcertPassScreen {

  private readonly passService = inject(PassService)

  protected readonly minDate = new Date()

  protected readonly maxDate: Date

  private readonly passModel = signal<PassData>({
    name: null,
    tier: null,
    date: null
  })

  protected readonly passForm = form(this.passModel, schemaPath => {
    const requiredMessage = 'This field is required.'
    required(schemaPath.name, { message: requiredMessage })
    required(schemaPath.tier, { message: requiredMessage })
    required(schemaPath.date, { message: requiredMessage })
  }, {
    submission: {
      action: async formNode => {
        const { name, tier, date } = formNode().value()
        if(name === null || tier === null || date === null) return
        try {
          const bytes = await this.passService.createPass(name, tier, date)
          const blobUrl = window.URL.createObjectURL(bytes)
          const link = document.createElement('a')
          link.href = blobUrl
          link.download = 'pass.pkpass'
          link.click()
          window.URL.revokeObjectURL(blobUrl)
        } catch(e) {}
      }
    }
  })

  protected readonly labels: Record<TicketTier, TicketTierDropdownItem> = {
    [TicketTier.General]: { icon: 'savings', label: 'General', color: '#E968D6' },
    [TicketTier.Organizer]: { icon: 'build', label: 'Organizer', color: '#727272' },
    [TicketTier.Vip]: { icon: 'workspace_premium', label: 'VIP', color: '#BAA446' }
  }

  protected readonly selectedTierItem = computed(() => {
    const tier = this.passForm().value().tier
    if(!tier) return null
    return this.labels[tier]
  })

  constructor() {
    const date = new Date(this.minDate)
    date.setFullYear(date.getFullYear() + 1)
    this.maxDate = date
  }

  protected readonly preserveOrder = () => 0

  protected inputToFullName(input: string): FullName | null {
    try {
      return FullName.fromString(input)
    } catch(e) {
      return null
    }
  }

}