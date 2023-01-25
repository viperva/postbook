| Wydział Informatyki Politechniki Białostockiej<br/> Przedmiot : Aplikacje internetowe oparte o komponenty | Data realizacji: 27.10.2022            |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Projekt Vue.js Adam Brzozowski                                                                            | Prowadzący: dr inż. Urszula Kużelewska |

# Architektura

App</br>
├──→LandingPage</br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──→NewsItem</br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──→AddArticle</br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──→TheMenu</br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──→TheHeader</br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──→TheFooter</br>
├──→ContactPage</br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──→ContactPreview</br>
└──→NewsPage</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──→EditArticle</br>

Komponent **LandingPage** przekazuje do komponentu **NewsItem**:

- id
- tytuł
- url zdjęcia

**AddArticle** wysyła nowo utworzony artykuł do rodzica (**LandingPage**).

**ContactPage** przekazuje do **ContactPreview**:

- powód wysłania wiadomości
- treść wiadomości
- imię
- email

**NewsPage** przekazuje do **EditArticle**:

- id
- datę
- tytuł
- treść
- autora
- link do artykułu
- url zdjęcia

**EditArticle** zwraca do **NewsPage** pełny obiekt artykułu.

# Ścieżki i komponenty związane z routingiem

"/" : LandingPage<br/>
"/contact" : ContactPage<br/>
"/article/:id" : NewsPage<br/>

# API servera

Lista ścieżek i żądań:

- GET "/", Pobiera tablicę obiektów przedstawiających artykuły
- GET "/article/:id", Pobiera pojedynczy obiekt artykułu o id odpowiadającym temu z parametru żądania
- POST "/article/:id", Dodaje pozycję o treści żądania i podanym w parametrze id do tablicy artykułów
- PUT "/article/:id", Dodaje nową lub edytuje istniejącą pozycję w tablicy artykułów na podstawie parametru oraz treści żądania
- DELETE "/article/:id", Usuwa artykuł o podanym w parametrze id z tablicy

# Ciekawe elementy kodu

## Asynchroniczne komponenty w Vue

Rodzic:

```js
<Suspense timeout="0">
    <template #default> <component :is="Component" /> </template>
    <template #fallback> Loading... </template>
</Suspense>
```

Dziecko:

```js
try {
  article.value = await getArticle(id);
} catch {
  article.value = null;
}
```

Vue w wersji 3 pozwala na tzw. **top level await**, czyli możliwość wywoływania instrukcji await poza obszarem funkcji asynchronicznej.<br/>
Znajdujący się jeszcze w eksperymentalej fazie rozwoju komponent Suspense pozwala nam utworzyć podstawową i zastępczą opcję renderowanego komponentu.<br/>
Jeżeli instrukcja asynchroniczna w komponencie dziecku nie skończyła się wykonywać, zobaczymy komponent oznaczony jako **#fallback**.<br/>
W tym przypadku, kiedy funkcja `getArticle()` skończy pobierać dane z serwera, napis "Loading..." zostanie zastąpiony oczekiwanym komponentem.<br/>

## Wiązanie dwustronne

Zmienna reaktywna **message**:

```js
const message = ref < inputType > { input: "", error: null, isValid: false };
```

Element formularza:

```js
<textarea
      @keydown="messageIsValid"
      @focusout="messageIsValid"
      v-model="message.input"
      class="form__textarea"
      name="content"
      placeholder="please, don't hold back"
      cols="80"
      rows="10"
    ></textarea>
```

Tworzenie formularzy w Vue jest wybitnie proste. Za pomocą dyrektywy v-model i reaktywnej zmiennej do niej przypisanej posiadamy już cały zestaw do tworzenia dynamicznych formularzy. Powyższa kombinacja odpowiada przypisaniu naszego stanu do atrybutu **value** elementu input oraz aktualizowaniu go na podstawie zdarzenia **oninput**.

## Przesyłanie stanu do rodzica

Rodzic:

```js
const addArticle = (art: articleType) => {
  articles.value.unshift(art);
};

<AddArticle v-if="isFormOpen" @add-article="(a) => addArticle(a)" />
```

Dziecko:

```js
const emit = defineEmits(["addArticle"]);
```

następnie w funkcji handleSubmit wysyłającej żądanie POST z nowym artykułem:

```js
emit("addArticle", article);
```

Powyższy zabieg przedstaiwa sposób w jaki Vue załatwia komunikację dziecko-rodzic.<br/>
W uproszczeniu, tworzymy własne eventy, które możemy przypisać naszym komponentom. Wywołujemy je ręcznie w kodzie dziecka.<br/>
Dzięki temu rodzic dostaje sygnał, że miało miejsce wydarzenie o podanej nazwie i wykonuje przyłączone do niego instrukcje.

# Wypunktowane elementy techniczne

## typescript

Korzystanie z typescripta w Vue oraz w tym projekcie polega na tworzeniu interfejsów, a następnie typowanie nimi tworzonych zmiennych, obiektów.<br/>
Interfejsy tego projektu znajdują się w pliku `types.ts` skąd eksportowane są do poszczególnych komponentów.

## formularze

W powyższym projekcie znajdziemy 3 formularze. Po jednym w komponentach: **ContactPage**, **AddArticle**, **EditArticle**.<br/>
Posiadają one swoje funkcje walidacyjne napisane ręcznie przeze mnie ponieważ w podstawowej konfiguracji Vue nie posiada wbudowanych walidatorów.<br/>

## Dwukierunkowa komunikacja między komponentami

Kompunikacja dwukierunkowa pojawia się między komponentami NewsPage i EditArticle. EditArticle od NewsPage otrzymuje dane artykułu, którymi wstępnie wypełniany jest formularz. Następnie po dokonaniu w nim zmian komponent EditArticle odsyła pełny artykuł do NewsPage, aby zaktualizować widok.
Ten sposób komunikacji zachodzi również między LadningPage, a NewsItem. Elementy NewsItem renderowane są na podstawie danych z tabeli artykułów. NewsItem natomiast, posiada krzyżyk do usuwania artykułu. Po jego wciścnięciu aktywowana jest funkcja wewnątrz LandingPage, która usuwa z tablicy artykuł o podanym przez NewsItem id.

## 4 żądania HTTP

Sćieżki API projektu opisane są powyżej. W pliku LandingPage wywoływany jest GET "/" aby pozyskać wszystkie artykuły. W NewsPage mamy GET "/article/:id" pobierający dany artykuł. Komponent AddArticle wywołuje żądanie POST, a EditArticle PUT.

## Jedna klasa usługi

W pliku services.ts znajdują się funkcje pobierające dane z serwera. Eksportowane są one stamtąd do poszczególnych komponentów.

## Dodatkowy serwis asynchroniczny

Funkcje opisane w poprzednim myślniku są funkcjami asynchronicznymi i odpowiadają za asynchroniczne renderowanie komponentu.

## Własna dyrektywa

W pliku AddArticle.vue znajduje się dyrektywa definiowana jako funkcja vAutofocus. W Vue właśnie poprzez definiowanie funkcji zaczynających się małą literą 'v' możemy tworzyć własne dyrektywy. Mamy w nich dostęp do metod cyklu życia (tu np. `mounted`) i do elemetu na którym zostały wywołane.
Dyrektywe tą wykorzystujemy poprzez wpisanie ją jako atrybut elementu.
Przewaga dyrektywy vAutofocus nad atrybutem HTML autofocus polega na fakcie, że zadziała ona nie tylko po załadowaniu strony ale też po wstawieniu komponentu przez Vue. Jeżeli na stronie głownej klikniemy przycisk **Add article**, wywołany zostanie komponent **AddArticle**, a tam będzie już wywołany focus na input z autorem.

## Implementacja własnego filtru

W pliku filters.ts znajdują się funkcje mające imitować filtry Angularowe. Do wersji 2 Vue posiadało bardzo podobne filtry, zostały one jednak wycofane ze względu na ograniczenia językowe. Filtry można jednak implementować jako funkcje jak też postąpiłem.

## Routing

W pliku main.ts znajduje się definicja Routera na podstawie dokumentacji Vue Router. Jest to obiekt przypisujący komponenty do odpowiednich ścieżek (co opisane zostało w punkcie o ścieżkach). Następnie w App.vue za pomocą elementu `<RouterView>` wskazujemy miejsce w strukturze aplikacji gdzie renderować się ma odpowiedni komponent.

# Biblioteki

- axios
  https://github.com/axios/axios <br/>
  Biblioteka stanowiąca prostego klienta HTTP dla przeglądarek. Ułatwiła ona wysyłanie żądań HTTP i odbieranie odpowiedzi.

- nanoid
  https://github.com/ai/nanoid <br/>
  Biblioteka pozwalająca na tworzenie unikalnych ID. Użyta została w miejscu tworzenia nowych artykułów.

- Vue Router
  https://router.vuejs.org/ <br/>
  Oficjalna biblioteka routingu dla Vue.js. Użycie opisane powyżej.

# Podział pracy

Wszystko - Adam Brzozowski
