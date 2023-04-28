import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const i18n = new I18n(
  {
    en: {
      supply: 'Supply',
      scanner: 'Scanner',
      move: 'Move',
      overview: 'Overview',
      byItem: 'By Item',
      byLocation: 'By Location',
      from: 'From...',
      to: 'To...',
      save: 'Save',
      locations: 'Locations',
      select: 'Select...',
      inStock: 'In Stock',
      consumption: 'Consumption',
      movementIn: 'Movements In',
      movementOut: 'Movements Out',
      itemGroup: 'Item Group',
      unit: 'Unit',
      yay: 'Yaay',
      successfulMove: 'Successfuly moved stuff.',
      ohNo: 'Oh no!',
      successfulSupply: 'Successfuly supplied stuff.',
      map: 'Map',
      eventMissingItems: 'Missing Items',
      missing: 'Missing',
      outOf: 'out of',
      appUpdated: 'App has been successfully updated',
      appUpdatedText:
        'The app has been updated to the latest version. The app will now restart.',
      upToDate: 'Up to date',
      upToDateText: 'You already have the latest version of the app.',
      updateErrorText: 'An error occurred while checking for updates.',
      initialSupply: 'Initial Supply',
    },
    de: {
      supply: 'Anlieferung',
      scanner: 'Scanner',
      move: 'Verschiebung',
      overview: 'Übersicht',
      byItem: 'Nach Artikel',
      byLocation: 'Nach Standort',
      from: 'Von...',
      to: 'Zu...',
      save: 'Speichern',
      locations: 'Standorte',
      addNewStuff: 'Mehr Artikel hinzufügen',
      select: 'Auswählen...',
      inStock: 'am Standort',
      consumption: 'Konsumation',
      movementIn: 'eingehende Verschiebungen',
      movementOut: 'ausgehende Verschiebungen',
      itemGroup: 'Artikelgruppe',
      unit: 'Einheit',
      yay: 'Juhu',
      successfulMove: 'Erfolgreich verschoben',
      ohNo: 'Oh Nein!',
      successfulSupply: 'Erfolgreich angeliefert',
      map: 'Map',
      eventMissingItems: 'Fehlende Artikel',
      missing: 'Fehlen',
      outOf: 'von',
      appUpdated: 'App erfolgreich aktualisiert',
      appUpdatedText:
        'Die App wurde auf die neueste Version aktualisiert. Die App wird nun neu gestartet.',
      upToDate: 'App ist auf dem neusten Stand',
      upToDateText: 'Sie haben bereits die neueste Version der App.',
      updateErrorText: 'Beim Suchen nach Updates ist ein Fehler aufgetreten.',
      initialSupply: 'Anfängliche Versorgung',
    },
  },
  {
    enableFallback: true,
    locale: Localization.locale,
  }
);

export default i18n;
