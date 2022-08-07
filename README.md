# Itunes Music Player Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.1.

## Development server

Run `npm install` to install the required npm packages for this project.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Tested browser

Please test this on Desktop, Chrome Version 104.0.5112.79 (Official Build) (x86_64)

- On Mobile Safari, the iTunes Affiliate API failed with JSONP Error. However on Desktop Safari, same API call works.
- On Mobile Safari, play audio causes error "Unhandled Promise Rejection: NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission."

## Supported features

- All the below actions are recorded in browser history, so application state is retained on refresh and can be replayed backwards or forwards
- Search tracks by artist's name
- Select track on mobile(<= 768px) to auto-play track and popup bottom controls
- Select track on desktop(> 768px) to view the collection and display it in splitted detail view
- Play/Pause track by clicking the control

## Demo

https://jjhanbcg.github.io/itunes-music-player-angular/
