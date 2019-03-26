const  renderer = new THREE.WebGLRenderer({canvas: document.querySelector(".hand_canvas")});
const  camera = new THREE.PerspectiveCamera(3, window.innerWidth / window.innerHeight, 10, 50);

// Harmonics variables
var h1 = 1,
    h2b = Math.pow(2, 1/12),
    h2 = Math.pow(2, 2/12),
    h3b = Math.pow(2, 3/12),
    h3 = Math.pow(2, 4/12),
    h4 = Math.pow(2, 5/12),
    h5b = Math.pow(2, 6/12),
    h5 = Math.pow(2, 7/12),
    h6b = Math.pow(2, 8/12),
    h6 = Math.pow(2, 9/12),
    h7b = Math.pow(2, 10/12),
    h7 = Math.pow(2, 11/12),
    h8 = 2;

var h = 0; // variable for the first harmonization
var hh = 0; // variable for the second harmonization
var h_left = h5;
var h_right = h5;
var h_up = h8;
var h_down = h8;

// variables for the octave choice
var actual_octaveLeft = 2;
var actual_octaveUp = 2;
var actual_octaveRight = 1/2;
var actual_octaveDown = 1/2;

var roll = 0;
var pitch = 0;
var ACCEL_SRV = 'e95d0753-251d-470a-a062-fa1922dfa9a8'
var ACCEL_DATA = 'e95dca4b-251d-470a-a062-fa1922dfa9a8'
var ACCEL_PERIOD = 'e95dfb24-251d-470a-a062-fa1922dfa9a8'
var MAGNETO_SRV = 'e95df2d8-251d-470a-a062-fa1922dfa9a8'
var MAGNETO_DATA = 'e95dfb11-251d-470a-a062-fa1922dfa9a8'
var MAGNETO_PERIOD = 'e95d386c-251d-470a-a062-fa1922dfa9a8'
var MAGNETO_BEARING = 'e95d9715-251d-470a-a062-fa1922dfa9a8'
var BTN_SRV = 'e95d9882-251d-470a-a062-fa1922dfa9a8'
var BTN_A_STATE = 'e95dda90-251d-470a-a062-fa1922dfa9a8'
var BTN_B_STATE = 'e95dda91-251d-470a-a062-fa1922dfa9a8'
var IO_PIN_SRV = 'e95d127b-251d-470a-a062-fa1922dfa9a8'
var IO_PIN_DATA = 'e95d8d00-251d-470a-a062-fa1922dfa9a8'
var IO_AD_CONFIG = 'e95d5899-251d-470a-a062-fa1922dfa9a8'
var IO_PIN_CONFIG = 'e95db9fe-251d-470a-a062-fa1922dfa9a8'
var IO_PIN_PWM = 'e95dd822-251d-470a-a062-fa1922dfa9a8'
var LED_SRV = 'e95dd91d-251d-470a-a062-fa1922dfa9a8'
var LED_STATE = 'e95d7b77-251d-470a-a062-fa1922dfa9a8'
var LED_TEXT = 'e95d93ee-251d-470a-a062-fa1922dfa9a8'
var LED_SCROLL = 'e95d0d2d-251d-470a-a062-fa1922dfa9a8'
var TEMP_SRV = 'e95d6100-251d-470a-a062-fa1922dfa9a8'
var TEMP_DATA = 'e95d9250-251d-470a-a062-fa1922dfa9a8'
var TEMP_PERIOD = 'e95d1b25-251d-470a-a062-fa1922dfa9a8'

var SINWAVE1f = [1.000];
var SINWAVE1a = [250];

var ELPIANO1f = [1.0000, 1.0121, 1.0287, 1.9955];
var ELPIANO1a = [243.1425  ,  16.9380  ,  7.6275  , 76.5855];

var ORGAN1f = [1.0000, 1.9659, 1.9924, 3.9053, 3.9811, 7.9356];
var ORGAN1a = [124.1516 ,   5.3789  , 80.0809  ,  4.2104  ,103.2640 ,  80.6335];

var ORGAN2f = [0.2538, 0.3788, 0.8977, 1.0000, 1.0985, 1.9886, 2.0038, 2.8902, 2.9886];
var ORGAN2a = [2.4191  ,  4.5088  ,  2.6226 , 251.2533  ,  2.7177 ,  42.7642  , 15.2599   , 2.5116  , 86.1271];

var PIANO1f = [0.1425, 0.2104, 0.9367, 1.0000, 1.0452, 1.2059, 1.9977, 3.0068, 4.0113, 5.0339];
var PIANO1a = [ 2.6407  ,  3.5024  ,  7.1984 , 250.9229  ,  5.8227 ,   2.2781 ,  14.7993  , 10.0962   , 6.4306  ,  3.5564];

var TRI1f = [0.5950, 0.6923, 0.7941, 0.8914, 1.0000, 1.1041, 1.2353, 1.3032, 2.9887, 4.9887, 6.9842, 8.9774, 10.9729, 12.9661, 14.9615];
var TRI1a = [0.4154,0.5529,0.8356,1.2794,247.5712,1.5090,0.6740,0.5449,8.5996,5.6198,2.2270,1.6043,1.0385,0.5842,0.6101];

var SYNTH1f = [0.5011, 1.0000, 1.4989, 1.9977, 2.4966, 2.9955, 3.4943, 3.9932];
var SYNTH1a = [145.2846 , 209.7553  , 22.4301 ,  33.8246 ,  21.3655 ,  12.9702  , 10.5142   , 2.7954];

var MANU1f = [0.2012, 0.4009, 0.6006, 0.8003, 1.0000, 1.0209, 1.1982, 1.3934, 1.5946, 1.6110, 1.7869, 1.7928, 1.9642, 1.9925, 2.1923, 4.3741];
var MANU1a = [96.3986 ,  64.2564 ,  34.8488 ,  51.4745 , 156.3458 ,  16.5059 ,  97.2270  , 27.8127 ,  67.0118  , 32.9409, 51.2886 ,  71.3372   , 8.7134  , 20.4526   , 6.9899   , 6.2132];


var FEDE1f = [1.0000, 1.0381, 1.9905, 2.9714, 3.9429, 3.9714, 4.0095, 4.9524, 5.9333, 6.8762, 6.9048, 6.9429, 7.8286, 7.8857, 7.9333];
var FEDE1a = [118.9386 ,  10.1337  , 45.9867 ,  49.5579 ,  40.1862 ,  29.8920 ,   6.1446 ,   9.2931  , 11.9226 ,   7.5846,  12.2400  ,  7.4334  , 12.9246 ,  20.2221  ,  9.4980];

var TEMP1f = [1];
var TEMP1a = [250];

var TEMP11f = [1.0000, 1.0034, 1.0125, 1.9977, 2.9955, 3.9932, 4.9909, 5.9887, 6.9864];
var TEMP11a = [249.0762 ,   0.3195 ,   0.3126  ,  6.9777  , 24.6345  ,  0.3557  ,  2.4907   , 0.4688 ,   0.3737];

var TEMP21f = [0.0038, 0.9029, 1.0000, 1.0076, 1.0971, 1.9962, 2.0152, 2.9943, 3.9371, 3.9905, 4.0248, 4.9867, 5.9810, 6.9771, 7.9771, 8.9752, 9.7714, 9.9714, 9.9752, 10.9676, 10.9829, 11.9600, 11.9867, 12.9543, 13.9619, 14.9524, 15.9162, 15.9486, 16.9448, 17.9314, 17.9410, 18.9371, 18.9448, 19.9410, 19.9505, 20.9333, 20.9562, 21.9257, 22.9257, 23.9219, 25.8952, 25.9143, 26.8990, 26.9067, 27.9029, 27.9181, 28.9143, 29.8952];
var TEMP21a = [10.3711  ,  1.4606  ,243.7306 ,  11.2517  ,  1.3325  , 32.2438  ,
2.2370  ,  9.0842  ,  1.2722 ,  79.3661 ,1.2948  , 16.5578  , 29.9546 ,  12.1790   ,
     4.9596   , 9.2006  ,  1.1551  , 33.4985   ,10.5384 , 22.5108, 3.3346   ,26.8001  ,  3.0158   ,
     15.4318  ,  8.6117  , 29.4394  ,  1.0457  ,  8.3710  , 11.5478  ,  9.4130,
      12.7303  ,  2.9191 ,   1.2137  ,  4.7462   , 2.1374  ,  9.1195  ,  3.0437 ,
         7.2163 ,   8.8678 ,   1.6068, 0.9886  ,  1.2600  ,  2.3902 ,   3.1836   , 2.7130  ,  1.5430  ,  1.2665  ,  1.2763];


var noisegain = 0.002;
var vect1 = ELPIANO1f;
var amp1 = ELPIANO1a;
var max = vect1.length*3;

var gates = [];
var oscStop = [];
for(i=0;i<max;i++){
  gates[i] = [];
  oscStop[i] = [];
}

/*----------------MICROBIT part----------------*/
class uBit {

  constructor() {
    this.accelerometer = {
      x: 0,
      y: 0,
      z: 0
    };

    this.magnetometer_raw = {
      x: 0,
      y: 0,
      z: 0
    };

    this.magnetometer_bearing = 0;
    this.temperature = 0;

    this.buttonA = 0;
    this.buttonACallBack=function(){};

    this.buttonB = 0;
    this.buttonBCallBack=function(){};

    this.connected = false;

    this.onConnectCallback=function(){};

    this.onDisconnectCallback=function(){
      btLabel.bt_log = "Device not connected"
    };

    this.onBLENotifyCallback=function(){};

    this.characteristic = {
      IO_PIN_DATA: {},
      IO_AD_CONFIG: {},
      IO_PIN_CONFIG: {},
      IO_PIN_PWM: {},
      LED_STATE: {},
      LED_TEXT: {},
      LED_SCROLL: {},
    }
  }

  getAccelerometer() {
    return this.accelerometer;
  }

  onConnect(callbackFunction){
    this.onConnectCallback=callbackFunction;
  }

  onDisconnect(callbackFunction){
    this.onDisconnectCallback=callbackFunction;
  }

  onBleNotify(callbackFunction){
    this.onBLENotifyCallback=callbackFunction;
  }

  characteristic_updated(event) {

    this.onBLENotifyCallback();

    //ACCELEROMETER CHARACTERISTIC
    if (event.target.uuid == ACCEL_DATA) {
      this.accelerometer.x = event.target.value.getInt16(0, true);
      this.accelerometer.y = event.target.value.getInt16(2, true);
      this.accelerometer.z = event.target.value.getInt16(4, true);
    }

    if (event.target.uuid == ACCEL_PERIOD) {
    }
  }

  searchDevice() {
    filters: []
    var options = {};
    options.acceptAllDevices = true;
    options.optionalServices = [ACCEL_SRV, MAGNETO_SRV, BTN_SRV, IO_PIN_SRV, LED_SRV, TEMP_SRV];

    console.log('Requesting Bluetooth Device...');
    btLabel.bt_log = 'Requesting Bluetooth Device...';
    console.log('with ' + JSON.stringify(options));

    navigator.bluetooth.requestDevice(options)
    .then(device => {

      console.log('> Name:             ' + device.name);
      console.log('> Id:               ' + device.id);

      device.addEventListener('gattserverdisconnected', this.onDisconnectCallback);

      // Attempts to connect to remote GATT Server.
      return device.gatt.connect();

    })
    .then(server => {
      // Note that we could also get all services that match a specific UUID by
      // passing it to getPrimaryServices().
      this.onConnectCallback();
      console.log('Getting Services...');
      return server.getPrimaryServices();
    })
    .then(services => {
      console.log('Getting Characteristics...');
      let queue = Promise.resolve();
      services.forEach(service => {
        queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
          console.log('> Service: ' + service.uuid);
          characteristics.forEach(characteristic => {
            console.log('>> Characteristic: ' + characteristic.uuid + ' ' +
              getSupportedProperties(characteristic));

            //need to store all the characteristic I want to write to be able to access them later.
            switch (characteristic.uuid) {
              case ACCEL_PERIOD:
                this.characteristic.ACCEL_PERIOD = characteristic;
                break;

              case IO_PIN_DATA:
                this.characteristic.IO_PIN_DATA = characteristic;
                break;

              case IO_AD_CONFIG:
                this.characteristic.IO_AD_CONFIG = characteristic;
                break;

              case IO_PIN_CONFIG:
                this.characteristic.IO_PIN_CONFIG = characteristic;
                break;

              case IO_PIN_PWM:
                this.characteristic.IO_PIN_PWM = characteristic;
                break;

              case LED_STATE:
                this.characteristic.LED_STATE = characteristic;
                this.connected = true;
                break;

              case LED_TEXT:
                this.characteristic.LED_TEXT = characteristic;
                break;

              case LED_SCROLL:
                this.characteristic.LED_SCROLL = characteristic;
                break;

              default:

            }


            if (getSupportedProperties(characteristic).includes('NOTIFY')) {
              characteristic.startNotifications().catch(err => console.log('startNotifications', err));
              characteristic.addEventListener('characteristicvaluechanged',
                this.characteristic_updated.bind(this));
            }
          });
        }));
      });
      return queue;
    }
  )
    .catch(error => {
      console.log('Argh! ' + error);
      btLabel.bt_log = 'Argh! ' + error;
    });
  }
}


// Utils

function isWebBluetoothEnabled() {
  if (navigator.bluetooth) {
    return true;
  } else {
    ChromeSamples.setStatus('Web Bluetooth API is not available.\n' +
      'Please make sure the "Experimental Web Platform features" flag is enabled.');
    return false;
  }
}


function getSupportedProperties(characteristic) {
  let supportedProperties = [];
  for (const p in characteristic.properties) {
    if (characteristic.properties[p] === true) {
      supportedProperties.push(p.toUpperCase());
    }
  }
  return '[' + supportedProperties.join(', ') + ']';
}


/*----------------VUE PART----------------*/

var btLabel = new Vue({ // bluetooth log information
  el: '#bt-label',
  data: {
    bt_log: "Device not connected"
  }
});

// led objects for hand gesture
var ledLeft = new Vue({
  el: '#left_led',
  data: {
    ledOn: false
  }
});

var ledRight = new Vue({
  el: '#right_led',
  data: {
    ledOn: false
  }
});

var ledUp = new Vue({
  el: '#up_led',
  data: {
    ledOn: false
  }
});

var ledDown = new Vue({
  el: '#down_led',
  data: {
    ledOn: false
  }
});

// Dropdown menu for sound and harmonization selection
const DropdownMenu = Vue.component('dropdown', {
	template: `
		<div>
			<button  @click='toggleShow' class='anchor labels' style = "font-size: 10px;font-weight:bold; color: #b7b2ae; line-height: 10px">
      {{text}}
      </button>
			<div v-if='showMenu' class='menu'>
				<div class='menu-item' v-for='item in this.items' @click='itemClicked(item)'>{{item}}</div>
			</div>
		</div>
	`,

	data: function() {
		return {
			showMenu: false
		}
	},
	props: {
		onClick: 'function',
		items: {
			type: 'Object',
			default: []
		},
    text: 'String'
	},
	methods: {
		toggleShow: function() {
			this.showMenu = !this.showMenu;
		},
		itemClicked: function(item) {
			this.toggleShow();
			this.onClick(item);
		}
	}
});

var Dropdown_octave_right = new Vue({
  el: '#dropmenu_octave_right',
  components: {
    DropdownMenu
  },
	data: {
    text: "Octave",
		activeOct: 'octave -1',
		octaves: [
      'octave +1',
      'octave 0',
      'octave -1'
		]
	},

	methods: {
		changeOctave: function(octave) {
			this.activeOct = octave;
      octaveRightLabel.updateOctave();
      switch (this.activeOct) {
        case 'octave 0':
          actual_octaveRight = 1;
          break;
        case 'octave +1':
          actual_octaveRight = 2;
          break;
        case 'octave -1':
          actual_octaveRight = 1/2;
          break;
      }
		}
	}
});

var octaveRightLabel = new Vue ({
  el: '#label_octave_right',
  data: {
    labelOct: Dropdown_octave_right.activeOct
  },
  methods: {
    updateOctave: function() {
      this.labelOct = Dropdown_octave_right.activeOct;
    }
  }
});

var Dropdown_octave_left = new Vue({
  el: '#dropmenu_octave_left',
  components: {
    DropdownMenu
  },
	data: {
    text: "Octave",
		activeOct: 'octave +1',
		octaves: [
      'octave +1',
      'octave 0',
      'octave -1'
		]
	},

	methods: {
		changeOctave: function(octave) {
			this.activeOct = octave;
      octaveLeftLabel.updateOctave();
      switch (this.activeOct) {
        case 'octave 0':
          actual_octaveLeft = 1;
          break;
        case 'octave +1':
          actual_octaveLeft = 2;
          break;
        case 'octave -1':
          actual_octaveLeft = 1/2;
          break;
      }
		}
	}
});

var octaveLeftLabel = new Vue ({
  el: '#label_octave_left',
  data: {
    labelOct: Dropdown_octave_left.activeOct
  },
  methods: {
    updateOctave: function() {
      this.labelOct = Dropdown_octave_left.activeOct;
    }
  }
});

var Dropdown_octave_up = new Vue({
  el: '#dropmenu_octave_up',
  components: {
    DropdownMenu
  },
	data: {
    text: "Octave",
		activeOct: 'octave +1',
		octaves: [
      'octave +1',
      'octave 0',
      'octave -1'
		]
	},

	methods: {
		changeOctave: function(octave) {
			this.activeOct = octave;
      octaveUpLabel.updateOctave();
      switch (this.activeOct) {
        case 'octave 0':
          actual_octaveUp = 1;
          break;
        case 'octave +1':
          actual_octaveUp = 2;
          break;
        case 'octave -1':
          actual_octaveUp = 1/2;
          break;
      }
		}
	}
});

var octaveUpLabel = new Vue ({
  el: '#label_octave_up',
  data: {
    labelOct: Dropdown_octave_up.activeOct
  },
  methods: {
    updateOctave: function() {
      this.labelOct = Dropdown_octave_up.activeOct;
    }
  }
});

var Dropdown_octave_down = new Vue({
  el: '#dropmenu_octave_down',
  components: {
    DropdownMenu
  },
	data: {
    text: "Octave",
		activeOct: 'octave -1',
		octaves: [
			'octave +1',
      'octave 0',
      'octave -1'
		]
	},

	methods: {
		changeOctave: function(octave) {
			this.activeOct = octave;
      octaveDownLabel.updateOctave();
      switch (this.activeOct) {
        case 'octave 0':
          actual_octaveDown = 1;
          break;
        case 'octave +1':
          actual_octaveDown = 2;
          break;
        case 'octave -1':
          actual_octaveDown = 1/2;
          break;
      }
		}
	}
});

var octaveDownLabel = new Vue ({
  el: '#label_octave_down',
  data: {
    labelOct: Dropdown_octave_down.activeOct
  },
  methods: {
    updateOctave: function() {
      this.labelOct = Dropdown_octave_down.activeOct;
    }
  }
});

var Dropdown_left = new Vue({
  el: '#dropmenu_left',
  components: {
    DropdownMenu
  },
	data: {
    text: "Left",
		activeHarm: '5th',
		harmonics: [
			'2nd minor',
			'2nd Major',
      '3rd minor',
      '3rd Major',
      '4th',
      '5th minor',
      '5th',
      '6th minor',
      '6th Major',
      '7th minor',
      '7th Major',
      'Octave'
		]
	},

	methods: {
		changeHarmonic: function(harmonic) {
			this.activeHarm = harmonic;
      leftLabel.updateLabel();
      switch (this.activeHarm) {
        case '2nd minor':
          h_left = h2b;
          break;
        case '2nd Major':
          h_left = h2;
          break;
        case '3rd minor':
          h_left = h3b;
          break;
        case '3rd Major':
          h_left = h3;
          break;
        case '4th':
          h_left = h4;
          break;
        case '5th minor':
          h_left = h5b;
          break;
        case '5th':
            h_left = h5;
            break;
        case '6th minor':
          h_left = h6b;
          break;
        case '6th Major':
          h_left = h6;
          break;
        case '7th minor':
          h_left = h7b;
          break;
        case '7th Major':
          h_left = h7;
          break;
        case 'Octave':
          h_left = h8;
          break;
      }
		}
	}
});

var leftLabel = new Vue ({
  el: '#label_left',
  data: {
    labelHarm: Dropdown_left.activeHarm
  },
  methods: {
    updateLabel: function() {
      this.labelHarm = Dropdown_left.activeHarm;
    }
  }
});

var Dropdown_right = new Vue({
  el: '#dropmenu_right',
  components: {
    DropdownMenu
  },
	data: {
    text: "Right",
		activeHarm: '5th',
		harmonics: [
			'2nd minor',
			'2nd Major',
      '3rd minor',
      '3rd Major',
      '4th',
      '5th minor',
      '5th',
      '6th minor',
      '6th Major',
      '7th minor',
      '7th Major',
      'Octave'
		]
	},

	methods: {
		changeHarmonic: function(harmonic) {
			this.activeHarm = harmonic;
      rightLabel.updateLabel();
      switch (this.activeHarm) {
        case '2nd minor':
          h_right = h2b;
          break;
        case '2nd Major':
          h_right = h2;
          break;
        case '3rd minor':
          h_right = h3b;
          break;
        case '3rd Major':
          h_right = h3;
          break;
        case '4th':
          h_right = h4;
          break;
        case '5th minor':
          h_right = h5b;
          break;
        case '5th':
            h_right = h5;
            break;
        case '6th minor':
          h_right = h6b;
          break;
        case '6th Major':
          h_right = h6;
          break;
        case '7th minor':
          h_right = h7b;
          break;
        case '7th Major':
          h_right = h7;
          break;
        case 'Octave':
          h_right = h8;
          break;
      }
		}
	}
});

var rightLabel = new Vue ({
  el: '#label_right',
  data: {
    labelHarm: Dropdown_right.activeHarm
  },
  methods: {
    updateLabel: function() {
      this.labelHarm = Dropdown_right.activeHarm;
    }
  }
});

var Dropdown_up = new Vue({
  el: '#dropmenu_up',
  components: {
    DropdownMenu
  },
	data: {
    text: "Up",
		activeHarm: 'Octave',
		harmonics: [
			'2nd minor',
			'2nd Major',
      '3rd minor',
      '3rd Major',
      '4th',
      '5th minor',
      '5th',
      '6th minor',
      '6th Major',
      '7th minor',
      '7th Major',
      'Octave'
		]
	},

	methods: {
		changeHarmonic: function(harmonic) {
			this.activeHarm = harmonic;
      upLabel.updateLabel();
      switch (this.activeHarm) {
        case '2nd minor':
          h_up = h2b;
          break;
        case '2nd Major':
          h_up = h2;
          break;
        case '3rd minor':
          h_up = h3b;
          break;
        case '3rd Major':
          h_up = h3;
          break;
        case '4th':
          h_up = h4;
          break;
        case '5th minor':
          h_up = h5b;
          break;
        case '5th':
            h_up = h5;
            break;
        case '6th minor':
          h_up = h6b;
          break;
        case '6th Major':
          h_up = h6;
          break;
        case '7th minor':
          h_up = h7b;
          break;
        case '7th Major':
          h_up = h7;
          break;
        case 'Octave':
          h_up = h8;
          break;
      }
		}
	}
});

var upLabel = new Vue ({
  el: '#label_up',
  data: {
    labelHarm: Dropdown_up.activeHarm
  },
  methods: {
    updateLabel: function() {
      this.labelHarm = Dropdown_up.activeHarm;
    }
  }
});

var Dropdown_down = new Vue({
  el: '#dropmenu_down',
  components: {
    DropdownMenu
  },
	data: {
    text: "Down",
		activeHarm: 'Octave',
		harmonics: [
			'2nd minor',
			'2nd Major',
      '3rd minor',
      '3rd Major',
      '4th',
      '5th minor',
      '5th',
      '6th minor',
      '6th Major',
      '7th minor',
      '7th Major',
      'Octave'
		]
	},

	methods: {
		changeHarmonic: function(harmonic) {
			this.activeHarm = harmonic;
      downLabel.updateLabel();
      switch (this.activeHarm) {
        case '2nd minor':
          h_down = h2b;
          break;
        case '2nd Major':
          h_down = h2;
          break;
        case '3rd minor':
          h_down = h3b;
          break;
        case '3rd Major':
          h_down = h3;
          break;
        case '4th':
          h_down = h4;
          break;
        case '5th minor':
          h_down = h5b;
          break;
        case '5th':
            h_down = h5;
            break;
        case '6th minor':
          h_down = h6b;
          break;
        case '6th Major':
          h_down = h6;
          break;
        case '7th minor':
          h_down = h7b;
          break;
        case '7th Major':
          h_down = h7;
          break;
        case 'Octave':
          h_down = h8;
          break;
      }
		}
	}
});

var downLabel = new Vue ({
  el: '#label_down',
  data: {
    labelHarm: Dropdown_down.activeHarm
  },
  methods: {
    updateLabel: function() {
      this.labelHarm = Dropdown_down.activeHarm;
    }
  }
});

var Dropdown = new Vue({
	el: '#dropmenu',
  components: {
    DropdownMenu
  },
	data: {
    text: "Sound",
		activeInstrument: 'El. Piano 1',
		instruments: [
      'El. Piano 1',
      'Piano',
      'Rock Organ 1',
      'Rock Organ 2',
      'Synth Triangle',
      'Synth',
      'Voce Manu',
      'Voce Fede',
      'Flute',
      'Trumpet',
      'Temp',
		]
	},
  methods: {
		changeInstrument: function(instrument) {
			this.activeInstrument = instrument;
      switch (this.activeInstrument) {

        case 'El. Piano 1':
          vect1 = ELPIANO1f;
          amp1 = ELPIANO1a;
          max = vect1.length*3;
          noisegain = 0.002;
          for(i=0;i<max;i++){
            gates[i] = [];
            oscStop[i] = [];
          }

          Envelope.form.attackTime = 0;
          Envelope.form.decayTime = 0.221;
          Envelope.form.sustainLevel = 0.48;
          Envelope.form.releaseTime = 0.05;

          break;

              case 'Rock Organ 1':
                vect1 = ORGAN1f;
                amp1 = ORGAN1a;
                max = vect1.length*3;
                noisegain = 0.012;
                for(i=0;i<max;i++){
                  gates[i] = [];
                  oscStop[i] = [];
                }

                Envelope.form.attackTime = 0;
                Envelope.form.decayTime = 0.001;
                Envelope.form.sustainLevel = 1;
                Envelope.form.releaseTime = 0.05;

                break;

                case 'Piano':
                  vect1 = PIANO1f;
                  amp1 = PIANO1a;
                  max = vect1.length*3;
                  noisegain = 0.001;
                  for(i=0;i<max;i++){
                    gates[i] = [];
                    oscStop[i] = [];
                  }

                  Envelope.form.attackTime = 0.01;
                  Envelope.form.decayTime = 0.271;
                  Envelope.form.sustainLevel = 0.33;
                  Envelope.form.releaseTime = 0.1;

                  break;

                      case 'Rock Organ 2':
                        vect1 = ORGAN2f;
                        amp1 = ORGAN2a;
                        max = vect1.length*3;
                        noisegain = 0.010;
                        for(i=0;i<max;i++){
                          gates[i] = [];
                          oscStop[i] = [];
                        }

                        Envelope.form.attackTime = 0;
                        Envelope.form.decayTime = 0.001;
                        Envelope.form.sustainLevel = 1;
                        Envelope.form.releaseTime = 0.05;

                        break;

                        case 'Synth Triangle':
                          vect1 = TRI1f;
                          amp1 = TRI1a;
                          max = vect1.length*3;
                          noisegain = 0.003;
                          for(i=0;i<max;i++){
                            gates[i] = [];
                            oscStop[i] = [];
                          }

                          Envelope.form.attackTime = 0;
                          Envelope.form.decayTime = 0.001;
                          Envelope.form.sustainLevel = 1;
                          Envelope.form.releaseTime = 0.01;

                          break;

                              case 'Synth':
                                vect1 = SYNTH1f;
                                amp1 = SYNTH1a;
                                max = vect1.length*3;
                                noisegain = 0.008;
                                for(i=0;i<max;i++){
                                  gates[i] = [];
                                  oscStop[i] = [];
                                }

                                Envelope.form.attackTime = 0.05;
                                Envelope.form.decayTime = 0.05;
                                Envelope.form.sustainLevel = 0.6;
                                Envelope.form.releaseTime = 0.01;

                                break;

                                case 'Voce Manu':
                                  vect1 = MANU1f;
                                  amp1 = MANU1a;
                                  max = vect1.length*3;
                                  noisegain = 0.010;
                                  for(i=0;i<max;i++){
                                    gates[i] = [];
                                    oscStop[i] = [];
                                  }
                                  break;

                                      case 'Voce Fede':
                                        vect1 = FEDE1f;
                                        amp1 = FEDE1a;
                                        max = vect1.length*3;
                                        noisegain = 0.014;
                                        for(i=0;i<max;i++){
                                          gates[i] = [];
                                          oscStop[i] = [];
                                        }
                                        break;

                                        case 'Temp':
                                          vect1 = TEMP1f;
                                          amp1 = TEMP1a;
                                          max = vect1.length*3;
                                          noisegain = 0.002;
                                          for(i=0;i<max;i++){
                                            gates[i] = [];
                                            oscStop[i] = [];
                                          }
                                          break;

                                          case 'Flute':
                                            vect1 = TEMP11f;
                                            amp1 = TEMP11a;
                                            max = vect1.length*3;
                                            noisegain = 0.008;
                                            for(i=0;i<max;i++){
                                              gates[i] = [];
                                              oscStop[i] = [];
                                            }

                                            Envelope.form.attackTime = 0.04;
                                            Envelope.form.decayTime = 0.401;
                                            Envelope.form.sustainLevel = 0.26;
                                            Envelope.form.releaseTime = 0.26;

                                            break;

                                            case 'Trumpet':
                                              vect1 = TEMP21f;
                                              amp1 = TEMP21a;
                                              max = vect1.length*3;
                                              noisegain = 0.010;
                                              for(i=0;i<max;i++){
                                                gates[i] = [];
                                                oscStop[i] = [];
                                              }

                                              Envelope.form.attackTime = 0.01;
                                              Envelope.form.decayTime = 0.051;
                                              Envelope.form.sustainLevel = 0.58;
                                              Envelope.form.releaseTime = 0.19;

                                              break;
      }
		}
	}
});

// Vue component for the ADSR diagram
const EnvelopeGenerator = Vue.component('envelope-generator', {
  name: 'EnvelopeGenerator',
  template: "#adsr",
  props: {
    width: {
      type: Number,
      default: 640
    },
    height: {
      type: Number,
      default: 480
    },
    attack: {
      type: Number,
      required: true,
      validaor: v => 0 <= v && v <= 1
    },
    decay: {
      type: Number,
      required: true,
      validaor: v => 0 <= v && v <= 1
    },
    sustain: {
      type: Number,
      required: true,
      validaor: v => 0 <= v && v <= 1
    },
    release: {
      type: Number,
      required: true,
      validaor: v => 0 <= v && v <= 1
    }
  },

  data () {
    return {
      path: '',
      array: []
    }
  },

  mounted() {
    this.draw();
  },

  watch: {
    attack: function () { this.draw(); },
    decay: function () { this.draw(); },
    sustain: function () { this.draw(); },
    release: function () { this.draw(); }
  },

  methods: {
    draw() {
      const wRetio = this.width / 6;
      const hRetio = this.height / 1;

      this.array=[];
			var paths = this.array;
      let x, y;
      x = y = 0;

      // attack
      x = (this.attack * wRetio)+7;
      y = 7;
      paths.push(`${x}`);
      paths.push(`${y}`);

      // decay
      x += this.decay * wRetio;
      if (this.sustain * hRetio == this.height){
        y = this.height - this.sustain * hRetio +7;
      } else {
        y = this.height-11 - this.sustain * hRetio;
      }
      paths.push(`${x}`);
      paths.push(`${y}`);

      // sustain
      x += 1 * wRetio;
      paths.push(`${x}`);
      paths.push(`${y}`);

      // release
      x += this.release * wRetio;
      y = this.height-11;
      paths.push(`${x}`);
      paths.push(`${y}`);
      this.path = `M7 ${this.height-11},` + paths.join(',');
    }
  }
});

Envelope = new Vue({
  el: '#app',
  components: { EnvelopeGenerator },
  data() {
    return {
      form: {
        attackTime: 0,  //Envelope.form.attackTime
        decayTime: 0.221,
        sustainLevel: 0.48,
        releaseTime: 0.05
      },
      ctx: new AudioContext(),
      osc: null,
      adsr: null
    }
  },

  methods: {
    start() {
      this.osc = this.ctx.createOscillator();
      this.adsr = this.ctx.createGain();

      // osc -> gain -> output
      this.osc.connect(this.adsr);
      this.adsr.connect(this.ctx.destination);

      const t0 = this.ctx.currentTime;
      this.osc.start(t0);
      // vol:0
      this.adsr.gain.setValueAtTime(0, t0);
      // attack
      const t1 = t0 + this.form.attackTime;
      this.adsr.gain.linearRampToValueAtTime(1, t1);
      // decay
      const t2 = this.form.decayTime;
      this.adsr.gain.setTargetAtTime(this.form.sustainLevel, t1, t2);
    },
    stop() {
      const t = this.ctx.currentTime;
      this.adsr.gain.cancelScheduledValues(t);
      this.adsr.gain.setValueAtTime(this.adsr.gain.value, t);
      this.adsr.gain.setTargetAtTime(0, t, this.form.releaseTime);

      const stop = setInterval(() => {

        if (this.adsr.gain.value < 0.01) {
          this.osc.stop();
          clearInterval(stop);
        }
      }, 10);
    },
  }
});

// Vue objects for volume sliders
Master = new Vue({
  el: '.master-volume',
  data: {
    m_volume: 50
  }
});

H1_volume = new Vue({
  el: '.h1-volume',
  data: {
    h1_volume: 50
  }
});

H2_volume = new Vue({
  el: '.h2-volume',
  data: {
    h2_volume: 50
  }
});

/*----------------MICROBIT bluetooth pairing----------------*/
var microbit = new uBit();

microbit.onConnect(function(){
  btLabel.bt_log = "Device connected"
  console.log("connected");
});

document.querySelector("#bt_button").addEventListener('click', event => {
  microbit.searchDevice();
});

microbit.onBleNotify(function(){
  aX = microbit.getAccelerometer().x;
  aY = microbit.getAccelerometer().y;
  aZ = microbit.getAccelerometer().z;

  pitch = Math.atan(aX / Math.sqrt(Math.pow(aY, 2) + Math.pow(aZ, 2)));
  roll = Math.atan(aY / Math.sqrt(Math.pow(aX, 2) + Math.pow(aZ, 2)));

  //convert radians into degrees
  pitch = pitch * (180.0 / Math.PI);
  roll = -1 * roll * (180.0 / Math.PI);

  // harmonic activation after a certain roll, pitch value
  if(pitch>25) {
    hh=h_up*actual_octaveUp;
    ledUp.ledOn = true;
  } else if(pitch<-25) {
    hh=h_down*actual_octaveDown;
    ledDown.ledOn = true;
  } else {
    hh = 0;
    ledUp.ledOn = false;
    ledDown.ledOn = false;
  }

  if(roll>25){
    h=h_right*actual_octaveRight;
    ledRight.ledOn = true;
  } else if(roll<-25){
    h=h_left*actual_octaveLeft;
    ledLeft.ledOn = true;
  } else {
    h=0;
    ledLeft.ledOn = false;
    ledRight.ledOn = false;
  }
});

/*----------------MIDI part----------------*/

// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

var midi, data;
var temp;
var c = new AudioContext();

var notePresent = 0;
var bufferSize = 4096;

// noise generation for sounds
var pinkNoise = (function() {
    var b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    var node = c.createScriptProcessor(bufferSize, 1, 1);
    node.onaudioprocess = function(e) {
        var output = e.outputBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            var white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.11; // (roughly) compensate for gain
            b6 = white * 0.115926;
        }
    }
    return node;
})();

var gp = c.createGain();
pinkNoise.connect(gp);
gp.gain.value = 0;
gp.connect(c.destination);

var now=[];

// initializing ADSR and Harmonics variables
var at = Envelope.form.attackTime;
var rt = Envelope.form.releaseTime;
var dt = Envelope.form.decayTime;
var h1_vol = H1_volume.h1_volume;
var h2_vol = H2_volume.h2_volume;
var master_vol = Master.m_volume;
var sustain_level = Envelope.form.sustainLevel;

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
var analyser = c.createAnalyser();

analyser.fftSize =2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);


function attack(midiNote, volume) {
  h1_vol = H1_volume.h1_volume;
  h2_vol = H2_volume.h2_volume;
  at = Envelope.form.attackTime;
  dt = Envelope.form.decayTime;
  master_vol = Master.m_volume;
  sustain_level = Envelope.form.sustainLevel;

  notePresent++; // noise variable

  //check if harmonics (to be played) are present or not
  if(h != 0 && hh != 0 ){
    var vect2 = vect1.map(function(element) {
    return element*h;//invece che *2 metti il valore microbit
  });
  var amp2 = amp1.map(function(element) {
    return element*(h1_vol/100);
  });

    var vect3 = vect1.map(function(element) {
    return element*hh;//invece che *2 metti il valore microbit
  });
  var amp3 = amp1.map(function(element) {
    return element*(h2_vol/100);
  });
  var vect = vect1.concat(vect2);
  vect = vect3.concat(vect);
  var amp = amp1.concat(amp2);
  amp = amp3.concat(amp);
  }
  else if(h != 0 ){
    var vect2 = vect1.map(function(element) {
      return element*h;//invece che *2 metti il valore microbit
    });
    var amp2 = amp1.map(function(element) {
      return element*(h1_vol/100);
    });
    var vect = vect1.concat(vect2);
    var amp = amp1.concat(amp2);
  }

  else if(hh != 0 ){
      var vect2 = vect1.map(function(element) {
          return element*hh;//invece che *2 metti il valore microbit
      });
      var amp2 = amp1.map(function(element) {
        return element*(h2_vol/100);
      });
      var vect = vect1.concat(vect2);
      var amp = amp1.concat(amp2);
      }
      else{
        var vect = vect1;
        var amp = amp1;
      }

      // voulume controls
      volume = master_vol/2000  + volume/1600;
      if (master_vol == 0) volume = 0;

      // midi note
      const freq = Math.pow(2, (midiNote-69)/12)*440;

      //harmonic amplitudes oscillators and gains initialization
      var ha = [];
      var o = [];
      var g = [];

      gp.gain.value = noisegain*(master_vol/50);

// iter to create the timbre summing sinusoids
      for(i=0;i<max;i++){
        o[i] = c.createOscillator();
      }

      for(i=0;i<max;i++){
        g[i] = c.createGain();
      }

      for(i=0;i<max;i++){
        g[i].connect(analyser);
      }

      for(i=0;i<max;i++){
        o[i].connect(g[i])
      }

      analyser.connect(c.destination);

      for(i=0;i<max;i++){
        g[i].connect(c.destination);
      }

      // Cutting the frequency of the timbre that are higher than 22000hz
      for(i=0;i<max;i++){
        if(freq*vect[i]<22000){
          o[i].frequency.value = freq*vect[i];
        }

        else {
          o[i].frequency.value = 0;
        }
      }

      // same as above with volume
      for(i=0;i<max;i++){
        if(freq*vect[i]<22000){
          ha[i] = amp[i]; //vettore dei volumi
        }

        else {
          ha[i] = 0;//vettore dei multipli delle frequenze
        }

      }

      // gain creation
      for(i=0;i<max;i++){
        g[i].gain.value = 0;
      }

      now[freq]= c.currentTime;

      for(i=0;i<max;i++){
        g[i].gain.linearRampToValueAtTime(volume/124*ha[i],now[freq]+at);
      }

      for(i=0;i<max;i++){
        g[i].gain.linearRampToValueAtTime(sustain_level*volume/124*ha[i],now[freq]+at+dt);
      }

      // SOUND!!!!!!!!!!!!!
      for(i=0;i<max;i++){
        o[i].start();
      }


      // Filling gates and oscStop vectors that will be used in release
      for(i=0;i<max;i++){
        gates[i][freq] = g[i];

      }

      for(i=0;i<max;i++){
        oscStop[i][midiNote] = o[i];
      }
}



function release(midiNote) {
  rt = Envelope.form.releaseTime;  // release time

  const freq = Math.pow(2, (midiNote-69)/12)*440; // midi note to release

  notePresent--; // noise variable

  if(notePresent==0) {
    gp.gain.value = 0;
  }


  gates[0][freq].gain.linearRampToValueAtTime(0,c.currentTime+rt);
  oscStop[0][midiNote].stop(c.currentTime+rt+0.01);


   // controls to release the sound if the pressed key time is less than attack time
  if(c.currentTime-now[freq]<at+dt){
    for(i=1;i<max;i++){
      gates[i][freq].gain.linearRampToValueAtTime(0,now[freq]+at+dt);
    }
    for(i=1;i<max;i++){
      oscStop[i][midiNote].stop(c.currentTime+at+dt+0.01);
    }

  }
  else{
    for(i=1;i<max;i++){
      gates[i][freq].gain.linearRampToValueAtTime(0,c.currentTime+rt);
    }
    for(i=1;i<max;i++){
      oscStop[i][midiNote].stop(c.currentTime+rt+0.01);
    }

  }
  // canvas harmonics design
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data.
   // MIDI data [144, 63, 73] in order type, key and velocity

    var [command, key, velocity] = data;

   if (command === 254) return; //because my keyboard sends command = 254 without stopping
    else  if (command === 144 && velocity!=0) {
      attack(key, velocity);

// RELEASE command: keyboard Gianmarco = 128 --- keyboard Federico = 144 as attack command

    } else if (command === 128 || (command === 144 && velocity === 0)) {
      release(key);
    }

}

/*----------------GRAPHIC PART----------------*/

//canvas drawing functions for frequency peaks
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//grid width and height
var bw = 400;
var bh = 400;
//padding around grid
var p = 0;

function drawCross() {
  ctx.globalAlpha = 0.9
  ctx.strokeStyle = 'rgba(125, 125, 125, 0.5)';
  ctx.beginPath();
  drawBoard();
};

function drawBoard() {
  for (var x = 0; x <= bw; x += 2*(x/8+1)) {
    ctx.moveTo(0.5 + x + p, p);
    ctx.lineTo(0.5 + x + p, bh + p);
  }

  for (var x = 0; x <= bh; x += 10) {
    ctx.moveTo(p, 0.5 + x + p);
    ctx.lineTo(bw + p, 0.5 + x + p);
  }

  ctx.strokeStyle = 'rgba(125, 125, 125, 0.3)';
  ctx.stroke();
};

// scene generation for three js part
camera.position.set(0,0,20);
const scene = new THREE.Scene();

var loader = new THREE.ObjectLoader();
var myObj;
var pivot = new THREE.Group();
var offsetX = -20;
var offsetY = -21;

var font_loader = new THREE.FontLoader(); // load the hand model

loader.load("./js/hand-for-lane.json",

// onLoad
function ( obj ) {
		myObj = obj;
		scene.add( obj );
		myObj.rotation.x = offsetX;
		myObj.rotation.y = offsetY;
		var box = new THREE.Box3().setFromObject( myObj );
		box.getCenter( myObj.position ); // this re-sets the mesh position
		myObj.position.multiplyScalar( - 1 );
		scene.add( pivot );
		pivot.add( myObj );
	},
	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},
	// onError callback
	function ( err ) {
		console.error( 'An error happened' + err);
	}

);

// light point for the object
const light1 = new THREE.PointLight(0xffffff, 2, 0);
light1.position.set(200, 100, 500);
scene.add(light1);

function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (canvas.width !== width ||canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

function animate() {
	requestAnimationFrame( animate );
	render();
  resizeCanvasToDisplaySize();
}

function render() {
	pivot.rotation.x = -Math.PI*pitch/150;
	camera.rotation.z = Math.PI*roll/150;
  renderer.render(scene, camera);
}
animate();

// rendering of frequency peaks in canvas
function drawSamples() {
  analyser.getByteFrequencyData(dataArray);
  /* get the context of the image */
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCross();
  for(var i=0; i<dataArray.length; i++) {
    ctx.fillRect(i, 285, 1, -dataArray[i]);
  }
  requestAnimationFrame(drawSamples);
}
drawSamples();
