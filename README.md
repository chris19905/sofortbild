# Sofortbild

Eine Kamera-App fuers iPhone im Stil einer Sofortbildkamera. Ein Ausloeser,
kein Filter-Menue, keine Regler.

Das Bild faehrt nach dem Ausloesen aus dem Gehaeuse und entwickelt sich ueber
fuenf Sekunden. Die Farbkurven bilden grob Polaroid-600-Film nach: angehobene
Schwarzwerte, kuehle Schatten, warme Lichter, ausblutende Spitzlichter,
Vignette und Korn. Die Rahmenmasse sind die echten eines 600er-Bildes —
88 x 107 mm Blatt mit 79 x 79 mm Bildfeld.

## Aufs iPhone

Die Seite in **Safari** oeffnen, dann Teilen-Symbol → **Zum Home-Bildschirm**.
Danach laeuft sie im Vollbild mit eigenem Icon und funktioniert auch ohne Netz.

## Wichtig

Der Kamerazugriff braucht **HTTPS**. Ueber `file://` oder in einem
eingebetteten Rahmen stellt der Browser `navigator.mediaDevices` gar nicht
erst bereit — die App sagt dann selbst, woran es liegt.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | die komplette App |
| `manifest.webmanifest` | Name, Icon und Vollbild-Modus |
| `sw.js` | Offline-Betrieb |
| `icon-180.png` | Icon fuer den iPhone-Homescreen |
| `icon.svg` | Icon fuer alles andere |

Die Fotos liegen lokal im Browser (IndexedDB) und verlassen das Geraet nicht.
