function mainApp() {
  var main = createMainCard(buildApplication());
  return [main];
}

/*
Main todos:
 - Login immediately after api key enter, without extra step
 - read token from response?
 */

function createMainCard(sections) {
  var cardBuilder = mainCard();
  for (section of sections) {
    cardBuilder.addSection(section);
  }
  return cardBuilder.build();
}

function apiKeyClickHandler(e) {
  var formInputs = e.formInputs;
  var apiKey = formInputs['apiKeyInput']
  saveString(API_KEY, apiKey);

  var response = navigateToTrelloAuth(apiKey);

  return response;
}

function tokenClickHandler(e) {
  var formInputs = e.formInputs;
  var token = formInputs['tokenInput']
  var listName = formInputs['listNameInput'];

  saveString(TOKEN, token);
  saveString(LIST_NAME, listName);

  // //fixme doesn't navigate and refresh
  // var nav = CardService.newNavigation().popToRoot();
  // return CardService.newActionResponseBuilder()
  //   .setNavigation(nav)
  //   .build();
  return createMainCard(buildApplication()); //todo this leaves the 'back' arrow, check https://developers.google.com/apps-script/add-ons/how-tos/navigation#navigation_best_practice
}

function buildApplication() {
  if (has(TOKEN)) {
    const connector = new TrelloConnector(getString(API_KEY), getString(TOKEN));
    var boardsWithCards = connector.userStarredBoards().map(board => {
      var cards = connector.userCardsFiltered(board.lists, getString(LIST_NAME));
      return { "board": board, "cards": cards };
    });
    return userBoards(boardsWithCards);
  } else if (has(API_KEY)) { //todo is it possible to omit this section? get token from reply?
    return [trelloTokenInputSection()];
  } else {
    return [trelloApiKeyInputSection()];
  }
}

/**
 * Builds extra step with button that contains dynamically filled URL
 * I didn't found a way to construct authorization action that fetches the URL dynamically from input text
 * TODO: get rid of it if possible
 * 
 * @param {*} apiKey 
 * @returns 
 */
function navigateToTrelloAuth(apiKey) {
  var authUrl = `${API_BASE_URL}/authorize?expiration=30days&name=GTrello&scope=read&response_type=token&key=${apiKey}`;
  var action = CardService.newAuthorizationAction().setAuthorizationUrl(authUrl);

  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Proceed with authorization"))
    .addSection(CardService.newCardSection()
      .addWidget(CardService.newTextButton().setText("Connect to Trello").setAuthorizationAction(action))
    )
    .build();
  var nav = CardService.newNavigation().pushCard(card);
  return CardService.newActionResponseBuilder()
    .setNavigation(nav)
    .build();
}
