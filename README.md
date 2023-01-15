# Pokedex

This application was created using the create-react-app. To run the application you can run `npm start` and to build the application you can run `npm run build` which are standard with `create-react-app`. To run tests, run `npm test` or `npm test -- --coverage .` to get the coverage report. Some files are excluded from the test coverage and the list of these files are under `package.json`. They were excluded as either implementation detail or they would be tested through integration tests which is not in the scope of this implementation. 

Since the application is using React 18, concurrent rendering is supported out of the box. Pre react 18 you would have to use concurrend mode. 

To generate new components generate-react-cli is used. This just creates an empty component with a test file. 

![Alt text](pikachu.png "Pikachu")

## Requirements
### Business Requirements
Please attempt to implement the following business requirements:
- Use the Pokemon API to make API requests for data https://pokeapi.co/docs/v2.
- Able to search for any Pokemon.
- Able to see a history of what has been searched and revisit at anytime.

### Technical Requirements
The following technical requirements must be met:
- You are allowed to use scaffolding technology like “Create React App” or similar.
- This project should be done with the latest React framework.
- This project should be done with the latest Redux framework.
- This project should be done using TypeScript.
- This project should be done using version control, preferably git.
- This project can be styled with SCSS/CSS or Styled Components if anything needs to be styled.
- This project should include a README that addresses anything you may not have completed. It should also address what additional changes you might need to make if the application were intended to run in a concurrent environment. Any other comments or thoughts about the project are also welcome.

### Bonus Points
- Able to see details about abilities, moves, species, sprites and types upon searching.
- Able to see other evolutions of Pokemon and be able to navigate to specific
- Pokemon in the evolution chain.
- A sleek and intuitive layout that resembles a Pokedex.
- Automated tests that ensure the business logic implemented is correct.