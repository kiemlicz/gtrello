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
  var cardBuilder = CardService.newCardBuilder().setName("GTrello");
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

  saveString(TOKEN, token);

  // //fixme doesn't navigate and refresh
  // var nav = CardService.newNavigation().popToRoot();
  // return CardService.newActionResponseBuilder()
  //   .setNavigation(nav)
  //   .build();
  return createMainCard(buildApplication()); //todo this leaves the 'back' arrow
}

function buildApplication() {
  if (has(API_KEY) && !has(TOKEN)) { //fixme is it possible to omit this section? get token from reply?
    return [trelloTokenInputSection()];
  } else if (has(TOKEN)) {
    const connector = new TrelloConnector(getString(API_KEY), getString(TOKEN));
    var boardsWithCards = connector.userStarredBoards().map(board => {
      var cards = connector.userDoingCards(board.lists);
      return { "board": board, "cards": cards };
    });

    return userBoards(boardsWithCards);
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
    .setHeader(CardService.newCardHeader().setTitle("Authorize to Trello"))
    .addSection(CardService.newCardSection()
      .addWidget(CardService.newTextButton().setText("Connect to Trello").setAuthorizationAction(action))
    )
    .build();
  var nav = CardService.newNavigation().pushCard(card);
  return CardService.newActionResponseBuilder()
    .setNavigation(nav)
    .build();
}
