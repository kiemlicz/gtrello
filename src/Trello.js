
class TrelloConnector {
    constructor(apiKey, token) {
        this.apiKey = apiKey;
        this.token = token;
        this.options = {
            "Accept": "application/json",
            muteHttpExceptions: true
        };
    }

    userStarredBoards() {
        //get starred boards with opened lists
        var url = `${API_BASE_URL}/members/me/boards?filter=starred&lists=open&${this._key_token_qs()}`;
        var userBoardsResponse = UrlFetchApp.fetch(url, this.options);
        if (userBoardsResponse.getResponseCode() >= 200 && userBoardsResponse.getResponseCode() < 300) {
            var userBoards = JSON.parse(userBoardsResponse.getContentText());
            var r = userBoards
                .filter(board => board.starred === true && board.closed === false) // just a precaution, list returned is already 'starred'
                .map(board => ({ "name": board.name, "url": board.url, "id": board.id, "lists": board.lists }));
            return r;
        } else {
            Logger.log(`Unable to query Trello for starred boards, reponse code: ${userBoardsResponse.getResponseCode()}`);
            return [];
        }
    }

    userDoingCards(lists) {
        var filteredLists = lists
            .filter(list => list.name == TRELLO_DOING_LIST)
            .flatMap(list => {
                var url = `${API_BASE_URL}/lists/${list.id}/cards?${this._key_token_qs()}`;
                var listCardsResponse = UrlFetchApp.fetch(url, this.options);
                if (listCardsResponse.getResponseCode() >= 200 && listCardsResponse.getResponseCode() < 300) {
                    var listCards = JSON.parse(listCardsResponse.getContentText());
                    var r = listCards.length > 0 ? listCards.map(card => ({ "name": card.name, "url": card.url })) : [];
                    return r;
                } else {
                    Logger.log(`No cards found for list ${list.name}`);
                    return [];
                }
            });
        return filteredLists;
    }

    _key_token_qs() {
        return `key=${this.apiKey}&token=${this.token}`
    }
}
