export const de_DE = {
  translation: {
    actions: {
      add: "Hinzufügen",
      cancel: "Abbrechen",
      accept: "OK",
      save: "Speichern",
      edit: "Ändern",
      delete: "Löschen",
      generate: "Generieren",
      addRace: "Rennen",
      close: "Schließen",
      toggle_all: "Umschalten",
      got_it: "Verstanden",
      leave: "Verlassen",
      stay: "Bleiben",
    },
    empty: {
      drivers: "Starten Sie, indem Sie einige Fahrer anlegen.",
      sessions:
        "Starten Sie, indem Sie einige Fahrer mit dem Hauptmenü anlegen ",
      session_view: "Starten Sie die Rennsitzung mit einer zufälligen Strecke!",
    },
    screens: {
      sessions: {
        list: "Sitzungen",
        view: "Sitzung ansehen",
        edit: "Sitzung ändern",
      },
      drivers: {
        list: "Fahrer",
        view: "Fahrer ansehen",
        edit: "Fahrer ändern",
      },
      races: {
        edit: "Rennen ändern",
        view: "Rennen ansehen",
      },
      random_map: "Zufällige Strecke",
      scoreboard: "Punktetafel",
      settings: "Einstellungen",
      about: "Über",
    },
    about: {
      greeting: "Mit ❤️ entwickelt von dlittig",
    },
    form: {
      name: "Name",
      car: "Fahrzeug von",
      linear: "Linear",
      gapped: "Abgestuft",
      race_track: "Rennstrecke",
      driver_color: "Farbe des Fahrers",
      selected_color: "Gewählte Farbe",
    },
    dialogs: {
      select_drivers: "Fahrer wählen",
      delete_driver: {
        title: "Löschen bestätigen",
        content:
          "Sind Sie sicher, dass Sie den Fahrer löschen wollen mit dem Namen",
      },
      delete_race: {
        title: "Löschen bestätigen",
        content: "Sind Sie sicher, dass Sie dieses Rennen löschen wollen?",
      },
      delete_session: {
        title: "Löschen bestätigen",
        content:
          "Sind Sie sicher, dass Sie diese Sitzung löschen wollen mit dem Namen",
      },
      leave: {
        title: "Seite verlassen?",
        content:
          "Es könnten nicht gespeicherte Änderungen vorhanden sein. Seite wirklich verlassen?",
      },
    },
    toasts: {
      delete_driver_in_use:
        "Der Fahrer kann nicht gelöscht werden, da dieser an einer Sitzung teilnimmt.",
      change_driver_failed:
        "Sie können die Fahrerliste nicht ändern, da schon Rennen angelegt wurden.",
      driver_name_empty: "Der Name des Fahrers darf nicht leer sein!",
    },
    banner: {
      fastest_lap:
        "Mit dem Häkchen können Sie festhalten, welcher Fahrer die schnellste Runde gefahren ist.",
    },
    text: {
      driver: {
        history: "Verlauf",
        color: "Farbe",
        positions: "Positionen",
        stats: "Statistiken",
        all: "Gesamt",
        fastest: "Schnellste",
        races: "Rennen",
        place: "Platz",
      },
      session: {
        pointScheme: {
          title: "Punkteschema",
          linear: "Linear",
          gapped: "Abgestuft",
          linearHint:
            "Alle Fahrer erhalten einen Punkt für jede Position, die sie gewinnen.",
          gappedHint:
            "Jede Position gibt einen weiteren Punkt, wobei der erste Fahrer einen Weiteren erhält.",
        },
        carPolicy: {
          title: "Fahrzeugregeln",
          shift: "Wechsel",
          static: "Statisch",
          staticHint:
            "Alle Fahrzeuge werden für das nächste Rennen vorgeschlagen.",
          shiftHint:
            "Alle Fahrzeuge, außer das des letzten Fahrers, werden vorgeschlagen.",
        },
      },
      race: {
        race: "Rennen",
        condition: {
          title: "Wetterverhältnisse",
          dry: "Trocken",
          rain: "Regen",
          night: "Nacht",
        },
      },
      scoreboard: {
        driver: "Fahrer",
        points: "Punkte",
        clipboard: "",
      },
      settings: {
        theme: {
          title: "Farbschema",
          description: "Passen Sie an, wie die Anwendung aussehen soll",
          light: "Hell",
          dark: "Dunkel",
        },
      },
    },
  },
};
