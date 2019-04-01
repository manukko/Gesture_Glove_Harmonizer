# GESTURE GLOVE HARMONIZER

The WebApp has the purpose of adding to the fundamental MIDI note some harmonics that are chosen from the user according to the movement of the hand through the use of the BBC micro:bit.
The sound is synthesized directly by the WebApp which has its own timbra library.  
The WebApp can be also used without the connection to the BBC micro:bit.


### Prequisites:
- Ultimate Gesture GLOVE white version (aka BBC micro:bit)
- MIDI Keyboard

### Installing:
As a WebApp, it can be executed in the browser, either online (https://manukko.github.io/Gesture_Glove_Harmonizer/) or downloading it and running in localhost. 
It is necessary to host it in a webserver due to CORS policy limitations: this can be done for example by creating a web server in python (that has to be installed) with the command: 
```
python -m http.server
```
Moreover, the micro:bit need a script that is downloadable here: https://makecode.microbit.org/_e9J5fpT64DJ5 in order to communicate via Bluetooth with the computer.

## Running the app
To properly interface with the WebApp, before opening it the MIDI keyboard must be connected to the PC. It is then possible to connect the micro:bit clicking on the "pair" button.

'LEFT' and 'RIGHT' are referred to the BBC micro:bit roll movement
'UP' and 'DOWN'are referred to the BBC micro:bit pitch movement

Each 'OCTAVE' button below each of the movement button allow the user to choose which octave the harmonization above is referred to:
-1 for the lower octave, 0 for the actual octave, 1 for the upper octave.

It is possible to change the timbre of the sound with the tools library pressing the key 'SOUND'.

It is possible to modify the Attack Decay Sustain Release (ADSR) of each musical instrument using the sliders
under the ADSR.

The lower right canvas represents the spectrum of the audio signal generated by the WebApp.

## Components
### Audio part
- MIDI sound generation
- Audio synthesis part

The code handles MIDI messages from the MIDI keyboard to start the attack and release functions. They generates a certain number of harmonics according to the synthesized sound: every time we press a key, the former allows us to generate the sound of the selected synthesizer with the proper number of harmonics. For each selected harmonic there is an oscillator which is connected with a proper gain to the output. Attack, release, sustain and decay are handled in JS with linear ramps. 

A clever and simple algorithm on MATLAB select the proper number of harmonics from real recorded sample sound: for each sound, this number is the result of a compromise of reality and reproducibility in a web scenario (see "Synth effect" folder for code and samples).
In JS we have a static copy of the vector generated by this algorithm of the selected harmonics for each available sound on the dropmenu. If we select to reproduce one or two harmonics based on the position of the glove, both the fundamental note and the harmonics will sound with the same timbre. Among the default sounds which are selected by the algorithm, as an experiment, we proposed the synthesized version of the voice of two us to be chosen as a possible instrument. A pink noise has been added in some sounds to enrich them. See comments on code for further details.

### Graphic part
The GUI of the WebApp has been developed using VueJS Framework, to simplify the data responsiveness and data syncronization. In particular, there are different VueJS components, the most important are the ADSR part for envelope settings, the leds for harmonics activation and all the buttons, dropmenus and sliders of the interface. 
As far as the envelope component is concerned, it has been drawn in svg to allow the refreshing of the diagram based on ADSR values.

In the upper part of the GUI there is a canvas, in which a 3d model (imported as a JSON object) replicates hand's movements of the micro:bit. It has been developed with ThreeJS, a WebGL API used for 3D Computer Graphics in web browser. To manage hand's orientation, roll rotation has been simulated by rotating the object around x axis, while pitch rotation by rotating the camera around z axis (to keep the pitch orientation reference).

### BBC micro:bit bluetooth communication
From 2017,thanks to the Web Bluetooth API of Google Chrome it is possible to connect to an application a BLE (Bluetooth Low Energy) device reading information from it and receiving notifications when certain values change. The connection to the device is only possible as a result of a voluntary action by the user (as in this case a click on the proper button on the graphical interface).
- https://www.html.it/articoli/introduzione-alle-web-bluetooth-api/

In particular, in order to transmit data to handle the harmonics to be reproduced, the accellerometer service has been used. It is worth mentioning the fact that a BLE service eats too much RAM memory to let the button service be used simultaneously with it without causing an overflow error. This would have prevented activating and deactivating the microprocessor without the need of shutting it down and pairing it again. Anyway accellerometer values on the three cartesian axis (properly converted into roll and pitch informations) are sufficient for our task. The bluetooth code pairing implementation has been developed by Bitty Software:
- http://www.bittysoftware.com/downloads.html

## Future implementations
One next step will be to integrate in this project a client-side JavaScript implementation, in a browser environment, of the Pitch shifting operation for a human voice recorded directly from a live input such as a microphone. Pitch shifting is a widely used operation, as an example, in all major commercial and open source Digital Audio Workstations and Mixing Softwares. There are algorithms that work in time domain, like Overlap and Add (OLA), Waveform Similarity based OLA (WSOLA) and delay line modulation, and others that work in the frequency domain, like the Phase Vocoder and Spectral Modelling. At the moment, ScriptProcessorNodes and AudioWorkers are operating on the time domain buffer data, on which FFT is computed. For what concerns frequency operations, like pitch shifting, the burden of the computational cost is due to the javascript implementation of FFT. A well-done improvement of this work would surely consist in analyzing computational costs and existence of audio artefacts in the implementation of such algorithms in the Web-audio-API itself. 

A simple pitch detection algorithm for voice input (whose value is given in Hz), as a starting point, is shown hereafter. 
- Code:
https://github.com/manukko/pitch_detection_future_work?fbclid=IwAR1jirUJ5YyZACAgVgIpi74W2hIuCxlgXkoYg0ED2AnhgUOZZNeTjbY_OXQ
- Try it:
https://manukko.github.io/pitch_detection_future_work/?fbclid=IwAR0VBmscqbVY3mNi3FPgexqmfSUKxLOySTJZA2QutbPY_liTolFjLiIYsko

## Framework used
- https://threejs.org/
- https://vuejs.org/

## PROMO Video (in italian)
https://1drv.ms/v/s!AnnhkH9OXjhOh91YWXE5xGYWvUX_gg
