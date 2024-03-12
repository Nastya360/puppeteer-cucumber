
Feature: Booking a place
    Scenario: Successfully book one seat
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user selects tomorrow date
        When user selects session time 
        When user selects one free place
        When user click on the reservation button
        Then user gets the text "Получить код бронирования"

      Scenario: Successfully book some seat
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user selects tomorrow date
        When user selects session time 
        When user selects one free place
        When user selects one free place
        When user selects one free place
        When user click on the reservation button
        Then user gets the text "Получить код бронирования"    

    Scenario: Not successfully book one seat
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user selects tomorrow date
        When user selects session time 
        When user selects one not free place
        When user click on the reservation button
        Then user gets the text "Выбраное место занято. Попробуйте выбрать другое место."    
    