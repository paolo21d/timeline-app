# Timeline API

Projekt ten powstał w ramach przedmiotu Zaawansowena Aplikacje internetowe realizowanego na Politechnice Warszawskiej (
OKNO).

## Opis projektu

Zaimplementuj prosty system „pamiętnikowy” pozwalający odnotowywać na osi czasu zdarzenia i procesy oraz prezentować je
w estetyczny sposób. Potencjalne zastosowanie możesz wyobrazić sobie jako np. prezentacja dla klientów firmy
szczegółowych informacji z historii jej rozwoju. Może to być także narzędzie o charakterze intranetowym, w którym
odnotowywane są wydarzenia z życia danej społeczności. Potencjalnych zastosowań takiej aplikacji może być wiele – można
zaproponować własne zastosowanie.

## Wymagania funkcjonalne

1. Zdarzenie rozumiemy jako punkt na osi czasu charakteryzujący się następującymi cechami:
    1. nazwa zdarzenia,
    2. data zaistnienia zdarzenia (dzień, miesiąc, rok),
    3. krótki opis tekstowy,
    4. szczegółowy opis tekstowy,
    5. ilustracja graficzna,
    6. typ zdarzenia / procesu.
2. Procesy rozumiemy jako odcinki na osi czasu charakteryzujące się tymi samymi cechami, co zdarzenia, ale z tą różnicą,
   że określona jest data rozpoczęcia i data zakończenia procesu.
3. Typy pozwalają powiązać ze sobą podobne wydarzenia i np. wyświetlić je w sposób charakterystyczny. Typ powinien mieć
   edytowalną nazwę oraz konfigurowalną jakąś cechę graficzną (np. kolor lub/i ikonę).
4. Są dwie grupy użytkowników: czytelnicy (niezalogowani) i administratorzy (zalogowany).
5. Użytkownicy niezalogowani mogą swobodnie przeglądać zawartość pamiętnika, ale bez
   możliwości edycji wpisów.
6. Administratorzy mogą zarówno przeglądać zawartość jak i ją edytować (operacje CRUD na
   zdarzeniach, procesach i typach).
7. Każdy użytkownik może wydrukować pełną zawartość pamiętnika w czytelny sposób.
   Drukowanie powinno być zrealizowane przez odpowiednio przygotowany za pomocą CSS
   widok pozbawiony kontrolek sterujących aplikacji.
8. Zadbać o właściwe przechowywanie hasła dostępowego i możliwość jego zmiany przez
   zalogowanego użytkownika. Mechanizm samodzielnej rejestracji nowych użytkowników
   nie jest wymagany.
9. Zadbać o estetyczną formę prezentacji pamiętnika. Można skorzystać z bibliotek JS, które
   ułatwiają oznaczanie zdarzeń na osi czasu, można spróbować samodzielnej implementacji z
   użyciem odpowiednio przygotowanego arkusza CSS i elementów języka HTML5.
10. Kliknięcie w dane zdarzenie / proces na osi czasu powinno wyświetlać pełen opis danego
    elementu.

## Zastosowane technologie

- **PostgreSQL**  
  Zastosowana zostala baza danych PostgreSQL
- **Spring Boot (Java)**  
  Api zostało zaimplementowane przy wykorzystniu frameworka Spring Boot. Umożliwia on połączenie do bazy danych oraz
  wystawienie endpointówm (możliwych do zabezpiecznia)
- **Maven**  


## Zrealizowany zakres

- **Rejestracja użytkowników**  
  Możliwe jest utworzenie nowego konta użytkownika w systemie. Użytkownik podczas rejestracji musi podac login oraz
  hasło. Login jest zapisany w bazie danych w jawny sposób, natomiast hasło zapisane jest w postaci niejawnej - jest ono
  zhashowane przy użyciu algorytmu BCrypt.
- **Logowanie użytnika do systemu**  
  Aby się zalogowc, użytkownik musi podac swój login oraz hasło. W przypadku pomyślnego uwierzytelnienia, system
  generuje token JWT (Json Web Token), którym to użytkownik będzie się autoryzował przy dalszym korzystaniu z API
  systemu.  
  Przy każdym następnym zapytaniu, token jest walidowany.

- **Tworzenie nowego typu zdarzenia**  
  Uwierzytleniony użytkownik może tworzyc nowe typy zdarzen.
- **Edytowanie istniejacego typu zdarzenia**  
  Uwierzytleniony użytkownik może edytowac istniejace typy zdarzen.
- **Usuwanie istniejacego typu zdarzenia**  
  Uwierzytleniony użytkownik może usuwac istniejacy typy zdarzen. // TODO dopisac ze nie mozna usuwac jak sa pobiete zdarzenia
- **Pobranie istniejacych typów zdarzeń**  
  Każdy użytkownik może pobrac istniejace typy zdarzen.

- **Tworzenie nowego zdarzenia**  
  Uwierzytleniony użytkownik może tworzyc nowe zdarzenia.
- **Edytowanie istniejącego zdarzenia**  
  Uwierzytleniony użytkownik może edytowac istniejące zdarzenia.
- **Usuwanie istniejącego zdarzenia**  
  Uwierzytleniony użytkownik może usuwac istniejące zdarzenia.
- **Pobieranie istniejących zdarzeń**  
  Każdy użytkownik może pobierac istniejące zdarzenia.