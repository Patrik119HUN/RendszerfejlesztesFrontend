import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatChip, MatChipSet, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

interface City {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
  standalone: true,
  imports: [
    MatChip,
    MatProgressSpinner,
    MatChipsModule,
    MatChipSet,
    MatIconModule,
  ],
})
export class StatisticsComponent {
  public cities: City[] = [
    { name: 'Szeged', selected: false },
    { name: 'Kecskemét', selected: false },
    { name: 'Budapest', selected: false },
    { name: 'Pécs', selected: false },
    { name: 'Miskolc', selected: false },
  ];

  public stats = [
    { city: 'Szeged', address: 'Mars tér 14.', customers: 254, percentage: 40 },
    {
      city: 'Szeged',
      address: 'Oskola utca 12.',
      customers: 566,
      percentage: 60,
    },
    {
      city: 'Budapest',
      address: 'Örs vezér tér 31.',
      customers: 1022,
      percentage: 80,
    },
    {
      city: 'Kecskemét',
      address: 'Bem tér 6.',
      customers: 254,
      percentage: 50,
    },
    { city: 'Kecskemét', address: 'Újsor 24.', customers: 65, percentage: 36 },
    { city: 'Kecskemét', address: 'Fa sor 32.', customers: 13, percentage: 20 },
    {
      city: 'Szeged',
      address: 'Zápor utca 44.',
      customers: 45,
      percentage: 20,
    },
    { city: 'Szeged', address: 'M5 bekötő', customers: 2, percentage: 10 },
    {
      city: 'Budapest',
      address: 'Üllői út 123.',
      customers: 553,
      percentage: 75,
    },
    { city: 'Pécs', address: 'Kossuth tér 10.', customers: 94, percentage: 90 },
    {
      city: 'Pécs',
      address: 'Bercsényi utca 12.',
      customers: 65,
      percentage: 50,
    },
    {
      city: 'Budapest',
      address: 'Pöttyös utca 30.',
      customers: 223,
      percentage: 60,
    },
    { city: 'Miskolc', address: 'Odanemenj 0.', customers: 0, percentage: 100 },
  ];

  // Metódus a város kiválasztott állapotának módosítására
  public toggleCitySelection(city: { name: string; selected: boolean }): void {
    city.selected = !city.selected;
  }

  // Getter a szűrt statisztikákhoz
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public get filteredStats() {
    const selectedCities = this.cities
      .filter((city) => city.selected)
      .map((city) => city.name);
    return this.stats.filter((stat) => selectedCities.includes(stat.city));
  }
}
