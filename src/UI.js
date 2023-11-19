function trelloApiKeyInputSection() {
  var apiKeyInput = CardService.newTextInput()
    .setFieldName('apiKeyInput')
    .setTitle('API KEY');

  var button = CardService.newTextButton()
    .setText('Proceed with API Key')
    .setOnClickAction(
      CardService
        .newAction()
        .setFunctionName('apiKeyClickHandler')
    );

  var section = CardService.newCardSection()
    .setHeader("Trello API key required")
    .addWidget(apiKeyInput)
    .addWidget(button);

  return section;
}

function trelloTokenInputSection() {
  var tokenInput = CardService.newTextInput()
    .setFieldName('tokenInput')
    .setTitle('Trello token');

  var listNameInput = CardService.newTextInput()
    .setFieldName('listNameInput')
    .setTitle('Trello list to display');

  var button = CardService.newTextButton()
    .setText('Connect')
    .setOnClickAction(
      CardService
        .newAction()
        .setFunctionName('tokenClickHandler')
    );

  var section = CardService.newCardSection()
    .setHeader("Trello token required")
    .addWidget(tokenInput)
    .addWidget(listNameInput)
    .addWidget(button);

  return section;
}

function userBoards(boardsWithCards) {
  return boardsWithCards // {board, cards}
    .filter(boardWithCards => boardWithCards.cards.length > 0) // don't render empty section
    .map(boardWithCards => {
      var board = boardWithCards.board;
      var cards = boardWithCards.cards;

      var section = CardService
        .newCardSection()
        .setHeader(board.name)
        .setCollapsible(true); // by default is collaped

      for (card of cards) {
        section.addWidget(
          CardService
            .newDecoratedText()
            .setText(`<b>${card.name}</b><br/>${truncateString(card.desc, 100)}`)
            .setOpenLink(CardService.newOpenLink().setUrl(card.url))
            .setWrapText(true)
        );
      }
      return section;
    });
}
