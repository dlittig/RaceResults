export const en_US = {
  translation: {
    actions: {
      add: "Add",
      cancel: "Cancel",
      accept: "OK",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      generate: "Generate",
      addRace: "Race",
      close: "Close",
      toggle_all: "Toggle all",
      got_it: "Got it",
      leave: "Leave",
      stay: "Stay",
    },
    error: {
      component: "Sorry, something went wrong...",
    },
    empty: {
      drivers: "Get started by creating some drivers.",
      sessions: "Get started by creating some drivers via the hamburger menu ",
      session_view: "Start your session with a random map!",
    },
    screens: {
      sessions: {
        list: "Sessions",
        view: "View session",
        edit: "Edit session",
      },
      drivers: {
        list: "Drivers",
        view: "View driver",
        edit: "Edit driver",
      },
      races: {
        edit: "Edit race",
        view: "View race",
      },
      random_map: "Random map",
      scoreboard: "Scoreboard",
      settings: "Settings",
      about: "About",
    },
    about: {
      greeting: "Built with ❤️ by dlittig",
    },
    form: {
      name: "Name",
      car: "Car of",
      race_track: "Race track",
      driver_color: "Driver color",
      selected_color: "Selected color",
    },
    dialogs: {
      select_drivers: "Select drivers",
      delete_driver: {
        title: "Confirm deletion",
        content: "Are you sure you want to delete",
      },
      delete_race: {
        title: "Confirm deletion",
        content: "Are you sure you want to delete this race?",
      },
      delete_session: {
        title: "Confirm deletion",
        content: "Are you sure you want to delete the session",
      },
      leave: {
        title: "Leave screen?",
        content:
          "You might have unsaved changes. Are you sure you want to leave the screen?",
      },
    },
    toasts: {
      delete_driver_in_use:
        "Can not delete driver who participated in sessions",
      change_driver_failed:
        "You can't edit the drivers list, because there are races already.",
      driver_name_empty: "The driver's name can't be empty!",
    },
    banner: {
      fastest_lap:
        "With the checkbox you can keep track of the fastest round driven.",
    },
    text: {
      driver: {
        history: "History",
        color: "Color",
        positions: "Positions",
        stats: "Statistics",
        all: "All",
        fastest: "Fastest",
        races: "Races",
        place: "Place",
      },
      session: {
        pointScheme: {
          title: "Point scheme",
          linear: "Linear",
          gapped: "Gapped",
          linearHint:
            "All drivers get a single point for a position they gain.",
          gappedHint:
            "Each position gain gives one point whereas the first gets one additional point.",
        },
        carPolicy: {
          title: "Car policy",
          shift: "Shift",
          static: "Static",
          staticHint: "All cars will appear as suggestion for a new race.",
          shiftHint:
            "All cars except the last one will be suggested for a new race.",
        },
      },
      race: {
        race: "Race",
        condition: {
          title: "Weater condition",
          dry: "Dry",
          rain: "Rain",
          night: "Night",
        },
      },
      scoreboard: {
        driver: "Driver",
        points: "Points",
        clipboard: "",
      },
      settings: {
        theme: {
          title: "Display theme",
          description: "Adjust how the appearance of the app should look like",
          light: "Light",
          dark: "Dark",
        },
      },
    },
  },
};
