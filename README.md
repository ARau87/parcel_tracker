# Parcel tracker

"Parcel tracker" ist eine Anwendung zur Sendungsverfolgung. Sie erlaubt die Registrierung von Nutzern, die neue Sendungen
im System erstellen können und anschließend den Status einer erstellten Senung zu verfolgen.
Außerdem enthält die Anwendung ein Adminpanel, über das die API-Endpunkte zur Änderung der Sendungstatus getestet werden 
können.


## Installation


### Vorbedingungen

#### Node.js

Die Anwendung basiert auf Node.js. Daher muss vor der Installation der Anwendung Node.js (min: v9.1.0) installiert werden.

[Node.js](https://nodejs.org/en/)

#### MongoDB

Um die Anwendung nutzen zu können muss sie mit einer MongoDB-Datenbank verbunden werden. Standardmäßig wird die Anwendung mit
einer vorkonfigurierten Cloud-Datenbank von mir bei [MLab](https://mlab.com/) verbunden.

Es bestehen also unter anderen die Möglichkeiten:

 - Erstellung einer Datenbank bei [MLab](https://mlab.com/)
 - Lokale Installation einer MongoDB-Datenbank. [MongoDB](https://www.mongodb.com/)
 
 ### Konfiguration
 
 Um die Anwendung zu konfigurieren öffnen Sie die folgende Datei in einem Texteditor: **parcel_tracker/server/config/config.json**
 
 Folgende Anwendungsparameter müssen konfiguriert werden:
 
 - **MONGO_URI**: URI zur produktiv MongoDB Datenbank
 - **MONGO_URI_TEST**: (Optional) URI zur Test Datenbank. Wird zum Starten der Tests benötigt.
 - **COOKIE_KEY**: Randomstring der zur Verschlüsselung/Entschlüsselung der Cookie-Sessions benötigt wird.
 - **COOKIE_KEY_SECOND**: Zweiter Randomstring zur Verschlüsselung/Entschlüsselung (Erhöht die Sicherheit)
 - **DEFAULT_ADMIN_USER**: Dieses Adminkonto wird bei Start der Anwendung erstellt. Wird kein Adminkonto gewünscht kann dieser Parameter auch entfernt werden.

### Setup

 - Öffnen Sie ein Terminal
 - Clonen Sie das github repository: **git clone https://github.com/ARau87/parcel_tracker.git**
 - Navigieren Sie zum Anwendungsordner:  **cd path/to/parcel_tracker**
 - Starten Sie die Installation der Abhängigkeiten: **npm install**
 - Nun können einige Tests gestartet werden um die Installation zu überprüfen: **npm test**
   ( Bitte beachten Sie, dass zum Starten der Tests eine Verbindung zur Datenbank konfiguriert sein muss. Siehe Konfiguration!)
 - Die Anwendung kann folgendermaßen gestartet werden: **npm start**
 - Standardmäßig ist die Anwendung auf Port 5005 erreichbar, es sei denn die Prozessumgebungsvariable process.env.PORT wird gesetzt (zB in Heroku).


## Beschreibung

### User-Client

#### Home '/' oder '/#/'

Die Seite dient als Startpunkt der Anwendung. Auf ihr ist ein Eingabefeld zu sehen, dass zur Eingabe einer Sendungsnummer dient.
Wird eine gültige Nummer eingegeben, so wird die letzte Station der Sendung und die aktuelle Station angezeigt. Da die Seite
öffentlich zugänglich ist, werden nur wenige Details über die Sendung preisgegeben.

#### Login '/#/login'

Die Login Seite zeigt ein Anmeldeformular für registrierte Nutzer. Die Anmeldung erfolgt mit dem Nutzernamen und das in der
Registrierung gewählte Passwort.


#### Registrierung '/#/register'

Das Registrierungformular ermöglicht die Nutzung des User-Clients. Nach erfolgreicher Registrierung ist ein Einloggen über die 
Login-Seite möglich.

#### Übersicht '/#/dashboard'

Die Übersicht zeigt alle Sendungen des angemeldeten Nutzers. Über die Sendungsschaltflächen können alle Details der Sendung
wie Adressaten und Sendungshistorie eingesehen werden. Neben einer Liste der Sendungen ist auch eine Schaltfläche zur Erstellung
neuer Sendungen vorhanden.

#### Neue Sendung '/#/new-parcel'

In dieser Seite kann eine neue Sendung erstellt werden. Dazu werden Informationen über den Empfänger und den Absender benötigt.
Die Sendereingabefelder sind anfangs mit den Informationen über den eingeloggten Nutzer gefüllt.

#### Sendungsdetails '/#/parcel/:trackingNr'

Diese Seite zeigt nähere Informatione über die gewählte Sendung. Neben Absender und Empfängerinformationen findet man hier
eine Sendungshistorie und die aktuelle Station. Außerdem ist ein QRCode vorhanden. Diese enthält die URL zur undetailierten
Ansicht der Sendung.

#### Sendungserstellungsbericht '/#/parcel/:trackingNr/created'

Diese Seite wird nach erfolgreicher Erstellung einer Sendung angezeigt und enthält den QRCode mit der URL zur undetailierten 
Sendungsverfolgung und die Adressinformationen.

#### Undetailierte Sendungsansicht '/#/tracking/:trackingNr'

Die undetailierte Sendungsansicht ist öffentlich ohne Login erreichbar und enthält daher nur die letzte Station der Sendung
und die aktuelle Station. Dadurch kann der Nutzer die Sendung ohne Anmeldung verfolgen aber seine persönlichen Daten sind 
geschützt.

#### Mobile Navigationsansicht '/mobile/nav/:app'

Diese Seite ist nur bei mobilen Geräten mit geringeren Bildschirmbreiten über den 'Burger'-Button erreichbar. Sie zeigt eine
Navigation die für mobile Geräte optimiert ist. Für diese Seite gibt es eine Ansicht für Admin und User-Client


### Admin-Client

Der Admin-Client ist entweder über die URL '/admin' erreichbar oder über den Navigationspunkt 'Admin'. Sie ist nur für 
Admins erreichbar. Der Standardadmin ist 'admin@parcel-tracker.de' mit dem Passwort '123456'. Ein Login ist NICHT für den
Admin-Client vorhanden. Loggen Sie sich zunächst mit dem Adminuser in den User-Client ein und klicken Sie auf 'Admin' in der
Navigation.
Über den Navigationspunkt 'App' gelangt man zum User-Client zurück.

#### Admin-Übersicht '/admin#/dashboard'

In der Adminübersicht sind ALLE Sendungen der Nutzer sichtbar. Abgeschlossene Sendungen können nur eingesehen werden. Nicht abgeschlossene
Sendungen können abgeschlossen werden oder es können Stationen hinzugefügt werden.

#### Admin-Sendungsansicht '/admin#/parcel/:trackingNr'

Die Sendungsansicht der Admins zeigen bei abgeschlossenen Sendungen alle Informationen der Sendung mit Sendungshistorie. 
Bei offenen Sendungen ist ein Bearbeitungsformular vorhanden. Dieses ermöglicht einerseits das Hinzufügen von Stationen zur
Sendung, die da bei den Nutzern sichtbar ist. Außerdem ist es möglich die Sendung abzuschließen.


## Architektur

Die Anwendung ist eine Client-Server Architektur. 

Der Server kommuniziert über einen mongoose Driver mit einer MongoDB Datenbank. Über eine REST API ist der Server mit den
Clients verbunden.

Die Clients basieren auf dem Vue.js Framework (MVVM-Architektur). Durch Vue-Router ist das clientseitige Routing ermöglicht.
Die Styles des Cients wurden mit SASS implementiert. Die Clients besitzen ein grundlegendes Responsive Design.

Das folgende Schaubild zeigt die komplette Architektur

![Parcel-Tracker Architektur - Bild konnte nicht geladen werden](https://github.com/ARau87/parcel_tracker/blob/master/Architecture.pdf "Parcel-Tracker Architektur")


## Ausblick

Features die zu einem Produktivsystem fehlen sind:

 - Passwortverschlüsselung 
 - Abrechnung bei Sendungserstellung
 - Sendungstypen
 - Autocomplete für Adressen/PLZ/Städte (Endpunkte sind schon vorhanden)
 - Verbesserung des Responsive Designs
 - Stationen in Google Maps verfolgen
 - uvm.
