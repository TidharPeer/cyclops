# Cyclops Security stocks dashboard assignment

Vue 3 project of a dashboard showing a list of stocks, with the ability to search by company name or stock symbol, or to select a specific stock from the dropdown.

## How to run

- Clone the repository, and run `npm install`.
- Run `npm dev start`.
- For tests run `npm run test-e2e`
- Build the project for production - run `npm run build`

### Folders structure

- `src` is the main folder
- ----- `assets` contains assets, currently the mock data file
- ----- `components` contains components. Currently the Chart of the stocks graph. 
- ----- `pages` contains main pages of the app. Currently the IndexPage which is the first loaded page, and it loaded the Dashboard page which contains the stocks data and the charts.
- ----- `services` contains services of the app. Currently contains the stock and the fetch api request.
- ----- `stores` contains the main store file, Pinia state management store which contains the stocks data and the loading status.
- ----- `types` contains the types, enums, and consts that being used in the app

- `test`/`e2e` is the main tests folder. It contains the dashboard tests.

The project is using Vite. The tests are made using Playwright
For CSS the app uses tailwind CSS syntax