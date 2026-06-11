# 📱 Portfolio Studenta (React Native / Expo)

Aplikacja mobilna typu portfolio studenta wykonana w React Native z użyciem Expo Router. Projekt przedstawia profil studenta, listę projektów oraz możliwość ich dodawania i edycji.

🚀 Funkcjonalności
Ekran profilu studenta (imię, opis, umiejętności, zdjęcie)
Edycja profilu
Lista projektów
Dodawanie nowych projektów
Edycja projektów
Usuwanie projektów
Szczegóły projektu
Ekran kontaktowy
Dark / Light mode
Nawigacja (Expo Router + Tabs)
Walidacja formularzy
Lokalny zapis danych (AsyncStorage)
Spersonalizowany wygląd aplikacji
🛠️ Technologie
React Native
Expo
Expo Router
TypeScript
Context API
AsyncStorage
📂 Struktura projektu

app/

projects/
index.tsx
new.tsx
[id].tsx
_layout.tsx
index.tsx (profil)
contact.tsx
_layout.tsx

context/

ProfileContext.tsx
ProjectsContext.tsx
ThemeContext.tsx

utils/

storage.ts

assets/

profile.jpg
▶️ Uruchomienie projektu
Zainstaluj zależności:
npm install
Uruchom projekt:
npx expo start
💾 Dane aplikacji

Dane profilu oraz projekty są zapisywane lokalnie przy użyciu AsyncStorage, dzięki czemu nie znikają po ponownym uruchomieniu aplikacji.

🎨 Personalizacja
własne dane studenta
własne projekty
indywidualny design UI
tryb ciemny i jasny
📸 Screeny
<img width="461" height="935" alt="image" src="https://github.com/user-attachments/assets/bbda05c5-1c21-428c-8d1c-62dccd0b8781" />
<img width="447" height="919" alt="image" src="https://github.com/user-attachments/assets/6cf8b681-636e-4805-8a8b-bebfcf6e5cab" />
<img width="494" height="487" alt="image" src="https://github.com/user-attachments/assets/c94d17fa-ac0d-46ee-b64b-9aefe3c84a6d" />
<img width="469" height="496" alt="image" src="https://github.com/user-attachments/assets/51a614b8-ee1d-4da5-a9e7-534e856ed047" />
<img width="477" height="674" alt="image" src="https://github.com/user-attachments/assets/d5768e06-0abc-4c4c-a86d-c49864cfcbc0" />

Projekt wykonany w ramach zaliczenia przedmiotu: Programowanie aplikacji mobilnych
