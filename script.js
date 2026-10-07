// ===== NAVIGATION =====
function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));

  document.getElementById('page-' + id).classList.add('active');

  if (btn) {
    btn.classList.add('active');
  }
}


// ===== TOAST =====
function toast(msg, type = 'success', icon = '') {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  const el = document.createElement('div');

  el.className = `toast ${type}`;

  el.innerHTML = `
    <span style="font-size:18px">
      ${icon || icons[type]}
    </span>
    <span>${msg}</span>
  `;

  document.getElementById('toastContainer').appendChild(el);

  setTimeout(() => el.remove(), 4000);
}


// ===== MODAL =====
function openModal(
  title,
  text,
  confirmFn,
  confirmLabel = 'Confirm'
) {
  document.getElementById('modalTitle').textContent = title;

  document.getElementById('modalText').textContent = text;

  document.getElementById('modalConfirm').textContent =
    confirmLabel;

  document.getElementById('modalConfirm').onclick = () => {
    closeModal();
    confirmFn();
  };

  document
    .getElementById('modalOverlay')
    .classList.add('open');
}


function closeModal() {
  document
    .getElementById('modalOverlay')
    .classList.remove('open');
}


// ===== HERO COUNTERS =====
function animateCounter(id, target) {
  const el = document.getElementById(id);

  let val = 0;

  const step = Math.ceil(target / 80);

  const t = setInterval(() => {

    val = Math.min(val + step, target);

    el.textContent = val.toLocaleString();

    if (val >= target) {
      clearInterval(t);
    }

  }, 20);
}


setTimeout(() => {

  animateCounter(
    'counterAccidents',
    14872
  );

  animateCounter(
    'counterAlerts',
    9341
  );

  animateCounter(
    'counterPotholes',
    58204
  );

  animateCounter(
    'counterVerified',
    32119
  );

}, 400);


// ===== SOS COUNTDOWN =====

let countdownTimer = null;

let countdownSec = 10;


function triggerSOSCountdown() {

  countdownSec = 10;

  document.getElementById('countdownNum').textContent =
    countdownSec;

  document.getElementById('progressRing')
    .style.strokeDashoffset = 0;

  document
    .getElementById('countdownOverlay')
    .classList.add('active');


  countdownTimer = setInterval(() => {

    countdownSec--;

    document.getElementById('countdownNum').textContent =
      countdownSec;


    const offset =
      565 * (1 - countdownSec / 10);

    document.getElementById('progressRing')
      .style.strokeDashoffset = offset;


    if (countdownSec <= 0) {

      clearInterval(countdownTimer);

      document
        .getElementById('countdownOverlay')
        .classList.remove('active');

      dispatchSOS();
    }

  }, 1000);
}


function cancelCountdown() {

  clearInterval(countdownTimer);

  document
    .getElementById('countdownOverlay')
    .classList.remove('active');

  toast(
    '✅ SOS cancelled. Stay safe!',
    'success'
  );
}


function dispatchSOS() {

  document
    .getElementById('alertSent')
    .classList.add('active');


  ['cs1', 'cs2', 'cs3'].forEach((id, i) => {

    setTimeout(() => {

      const el = document.getElementById(id);

      el.textContent = 'NOTIFIED';

      el.className =
        'contact-status status-notified';

    }, i * 600);

  });


  toast(
    '🚨 SOS Dispatched! Contacts notified, ambulance en route.',
    'error',
    '🚨'
  );


  addLog(
    '💥 ACCIDENT DETECTED — SOS TRIGGERED',
    'danger'
  );

  addLog(
    '📡 Multi-channel alerts dispatched to 3 contacts',
    'warn'
  );

  addLog(
    '📍 Live GPS sharing enabled',
    'ok'
  );
}


// ===== VOICE SOS =====

let voiceActive = false;


function toggleVoice() {

  voiceActive = !voiceActive;

  const btn =
    document.getElementById('voiceBtn');

  const status =
    document.getElementById('voiceStatus');


  if (voiceActive) {

    btn.classList.add('listening');

    status.textContent =
      '🎙️ Listening... Say "Help", "Accident", or "Kaapathu"';

    toast(
      '🎙️ Voice SOS activated. Say a command.',
      'info',
      '🎙️'
    );

  } else {

    btn.classList.remove('listening');

    status.textContent =
      'Click microphone to start listening...';
  }
}


function voiceTrigger(cmd) {

  document.getElementById('voiceStatus').textContent =
    `✅ Command detected: "${cmd}" — Initiating SOS...`;

  voiceActive = false;

  document
    .getElementById('voiceBtn')
    .classList.remove('listening');


  toast(
    `🎙️ Voice command "${cmd}" recognized!`,
    'warning',
    '🎙️'
  );


  setTimeout(
    triggerSOSCountdown,
    1000
  );
}


function callService(name) {

  toast(
    `📞 Calling ${name}...`,
    'info',
    '📞'
  );


  setTimeout(() => {

    toast(
      `✅ Connected to ${name}. Speak clearly.`,
      'success'
    );

  }, 1500);
}


function addContact() {

  toast(
    '📱 Contact management — open in full app',
    'info'
  );
}


// ===== HIGHWAY SERVICES =====

const servicesData = [

  {
    name: 'Raj Auto Works',
    type: 'mechanic',
    icon: '🔧',
    dist: '0.8 km',
    rating: '4.6',
    reviews: '124',
    status: 'open',
    cat: 'mechanic'
  },

  {
    name: 'NH Highway Towing',
    type: 'towing',
    icon: '🚛',
    dist: '1.3 km',
    rating: '4.4',
    reviews: '89',
    status: 'open',
    cat: 'towing'
  },

  {
    name: 'HP Petrol Bunk',
    type: 'fuel',
    icon: '⛽',
    dist: '0.4 km',
    rating: '4.2',
    reviews: '215',
    status: 'open',
    cat: 'fuel'
  },

  {
    name: 'Karunanidhi Hospital',
    type: 'ambulance',
    icon: '🏥',
    dist: '2.1 km',
    rating: '4.8',
    reviews: '302',
    status: 'open',
    cat: 'ambulance'
  },

  {
    name: 'Mani Motors',
    type: 'mechanic',
    icon: '🔧',
    dist: '3.2 km',
    rating: '4.3',
    reviews: '67',
    status: 'busy',
    cat: 'mechanic'
  },

  {
    name: 'IOC Petrol Station',
    type: 'fuel',
    icon: '⛽',
    dist: '4.0 km',
    rating: '4.0',
    reviews: '178',
    status: 'open',
    cat: 'fuel'
  },

  {
    name: 'NH Rest Dhaba',
    type: 'food',
    icon: '🍽️',
    dist: '1.6 km',
    rating: '4.5',
    reviews: '441',
    status: 'open',
    cat: 'food'
  },

  {
    name: 'Speed Towing Service',
    type: 'towing',
    icon: '🚛',
    dist: '5.1 km',
    rating: '4.1',
    reviews: '55',
    status: 'open',
    cat: 'towing'
  },

  {
    name: '108 Ambulance',
    type: 'ambulance',
    icon: '🚑',
    dist: 'Free',
    rating: '4.9',
    reviews: '1.2k',
    status: 'open',
    cat: 'ambulance'
  }

];


function renderServices(filter = 'all') {

  const grid =
    document.getElementById('servicesGrid');

  const filtered =
    filter === 'all'
      ? servicesData
      : servicesData.filter(
          s => s.cat === filter
        );


  grid.innerHTML =
    filtered.map(s => `

      <div class="service-card">

        <div class="service-top">

          <div class="service-icon">
            ${s.icon}
          </div>

          <div class="service-distance">
            📍 ${s.dist}
          </div>

        </div>


        <div class="service-name">
          ${s.name}
        </div>


        <div class="service-type">
          ${s.type.charAt(0).toUpperCase() + s.type.slice(1)}
        </div>


        <div class="service-rating">

          ★ ${s.rating}

          <span>
            (${s.reviews} reviews)
          </span>

          &nbsp;&nbsp;

          <span class="${s.status === 'open'
            ? 'status-open'
            : 'status-busy'}">

            ${s.status.toUpperCase()}

          </span>

        </div>


        <div class="service-actions">

          <button
            class="svc-btn"
            onclick="getDirections('${s.name}')">

            🗺️ Directions

          </button>


          <button
            class="svc-btn call-btn"
            onclick="callService('${s.name}')">

            📞 Call

          </button>

        </div>

      </div>

    `).join('');
}


function filterServices(cat, btn) {

  document
    .querySelectorAll('.filter-btn')
    .forEach(
      b => b.classList.remove('active')
    );

  btn.classList.add('active');

  renderServices(cat);
}


function getDirections(name) {

  toast(
    `🗺️ Opening directions to ${name}...`,
    'info',
    '🗺️'
  );
}


function refreshLocation() {

  toast(
    '📍 GPS location refreshed.',
    'success',
    '📍'
  );
}


renderServices();


// ===== VEHICLE VERIFICATION =====

function formatPlate(input) {

  let v =
    input.value
      .replace(/[^A-Z0-9]/gi, '')
      .toUpperCase();

  input.value = v;
}


function simulateScan() {

  toast(
    '📷 Camera activated — scanning plate...',
    'info',
    '📷'
  );


  setTimeout(() => {

    document.getElementById('plateInput').value =
      'KA05MF4521';

    toast(
      '✅ Plate detected: KA 05 MF 4521',
      'success'
    );

  }, 1800);
}


const vehicleDB = {

  default: {

    plate: 'TN 01 AB 1234',

    type: '2021 Honda Activa 6G · Petrol',

    score: 87,

    scoreClass: 'score-safe',

    items: [

      {
        label: 'REGISTRATION STATUS',
        value: 'Active — Valid',
        cls: 'ok'
      },

      {
        label: 'INSURANCE VALIDITY',
        value: 'Valid till Dec 2026',
        cls: 'ok'
      },

      {
        label: 'PENDING CHALLANS',
        value: '₹0 — Clear',
        cls: 'ok'
      },

      {
        label: 'OWNERSHIP TRANSFERS',
        value: '1 Previous Owner',
        cls: 'ok'
      },

      {
        label: 'THEFT STATUS',
        value: 'Not Reported',
        cls: 'ok'
      },

      {
        label: 'ACCIDENT HISTORY',
        value: '1 Minor Claim (2023)',
        cls: 'warn'
      },

      {
        label: 'FITNESS CERTIFICATE',
        value: 'Valid till Aug 2026',
        cls: 'ok'
      },

      {
        label: 'POLLUTION (PUC)',
        value: 'Expired 3 months ago',
        cls: 'bad'
      }

    ]

  },


  bad: {

    plate: 'DL 01 XX 9999',

    type: '2018 Bajaj Pulsar 150 · Petrol',

    score: 28,

    scoreClass: 'score-danger',

    items: [

      {
        label: 'REGISTRATION STATUS',
        value: 'Suspended',
        cls: 'bad'
      },

      {
        label: 'INSURANCE VALIDITY',
        value: 'Expired 14 months ago',
        cls: 'bad'
      },

      {
        label: 'PENDING CHALLANS',
        value: '₹12,400 Outstanding',
        cls: 'bad'
      },

      {
        label: 'OWNERSHIP TRANSFERS',
        value: '4 Owners — Suspicious',
        cls: 'warn'
      },

      {
        label: 'THEFT STATUS',
        value: '⚠️ Theft Reported!',
        cls: 'bad'
      },

      {
        label: 'ACCIDENT HISTORY',
        value: '3 Major Accidents',
        cls: 'bad'
      },

      {
        label: 'FITNESS CERTIFICATE',
        value: 'Expired',
        cls: 'bad'
      },

      {
        label: 'POLLUTION (PUC)',
        value: 'Expired 22 months ago',
        cls: 'bad'
      }

    ]

  }

};


function verifyVehicle() {

  const plate =
    document
      .getElementById('plateInput')
      .value
      .trim();


  if (!plate) {

    toast(
      '⚠️ Please enter a vehicle number',
      'warning'
    );

    return;
  }


  const btn =
    document.getElementById('verifyBtnText');


  btn.innerHTML =
    '<span class="spinner"></span>Verifying...';


  setTimeout(() => {

    btn.innerHTML =
      '🔍 VERIFY VEHICLE';


    const data =
      (
        plate.toUpperCase().includes('DL') ||
        plate.toUpperCase().includes('XX')
      )
        ? vehicleDB.bad
        : vehicleDB.default;


    document.getElementById('vr-plate').textContent =
      plate.toUpperCase();

    document.getElementById('vr-type').textContent =
      data.type;


    const scoreEl =
      document.getElementById('vr-score');


    scoreEl.textContent =
      data.score;


    scoreEl.className =
      'vr-score-num ' +
      data.scoreClass;


    document.getElementById('vrGrid').innerHTML =
      data.items.map(i => `

        <div class="vr-item">

          <div class="vr-item-label">
            ${i.label}
          </div>

          <div class="vr-item-value ${i.cls}">
            ${i.value}
          </div>

        </div>

      `).join('');


    document
      .getElementById('vehicleResult')
      .classList.add('show');


    if (data.score < 50) {

      toast(
        '⚠️ HIGH RISK VEHICLE — Multiple serious issues found!',
        'error',
        '⚠️'
      );

    } else if (data.score < 75) {

      toast(
        '⚠️ Some issues found. Review carefully.',
        'warning'
      );

    } else {

      toast(
        '✅ Vehicle looks mostly clean!',
        'success'
      );

    }

  }, 2000);
}


function downloadReport() {

  toast(
    '📄 Report downloading...',
    'info',
    '📄'
  );
}


// ===== POTHOLE / ROAD MAP =====

const reportsData = [

  {
    type: 'pothole',
    label: 'rt-pothole',
    loc: 'NH-44 Km 142, Krishnagiri',
    time: '2 min ago',
    conf: '96%'
  },

  {
    type: 'accident',
    label: 'rt-accident',
    loc: 'SH-17 Near Dharmapuri',
    time: '8 min ago',
    conf: '91%'
  },

  {
    type: 'pothole',
    label: 'rt-pothole',
    loc: 'NH-544 Coimbatore Bypass',
    time: '15 min ago',
    conf: '88%'
  },

  {
    type: 'road',
    label: 'rt-road',
    loc: 'SH-9 Hosur Road, Bengaluru',
    time: '22 min ago',
    conf: '79%'
  },

  {
    type: 'pothole',
    label: 'rt-pothole',
    loc: 'NH-48 Near Tumkur',
    time: '31 min ago',
    conf: '94%'
  }

];


function renderReports() {

  document
    .getElementById('reportsTableBody')
    .innerHTML =

    reportsData.map(r => `

      <div class="rt-row">

        <span class="rt-badge ${r.label}">
          ${r.type.toUpperCase()}
        </span>

        <span>
          ${r.loc}
        </span>

        <span class="rt-time">
          🕐 ${r.time}
        </span>

        <span class="rt-conf">
          AI: ${r.conf}
        </span>

      </div>

    `).join('');
}


renderReports();


function reportPothole() {

  toast(
    '🕳️ Pothole reported! AI validating...',
    'warning',
    '🕳️'
  );


  document.getElementById('potholeCount').textContent =
    (
      parseInt(
        document
          .getElementById('potholeCount')
          .textContent
          .replace(',', '')
      ) + 1
    ).toLocaleString();


  reportsData.unshift({

    type: 'pothole',

    label: 'rt-pothole',

    loc: 'Current Location (You)',

    time: 'just now',

    conf: 'Pending'

  });


  renderReports();
}


function reportAccident() {

  toast(
    '⚠️ Accident zone reported!',
    'error',
    '⚠️'
  );


  document.getElementById('accidentZones').textContent =
    parseInt(
      document.getElementById('accidentZones').textContent
    ) + 1;


  reportsData.unshift({

    type: 'accident',

    label: 'rt-accident',

    loc: 'Current Location (You)',

    time: 'just now',

    conf: 'Pending'

  });


  renderReports();
}


// ===== INSURANCE CLAIM =====

let claimStep = 1;

const uploadedPhotos = [];


document.getElementById('claimDate').value =
  new Date().toISOString().slice(0, 16);


function claimNext() {

  if (claimStep === 1) {

    document.getElementById('formStep1').style.display =
      'none';

    document.getElementById('formStep2').style.display =
      'block';

    document.getElementById('formTitle').textContent =
      '📸 Evidence Upload';

    document.getElementById('prevBtn').style.display =
      'block';

    document.getElementById('nextBtn').textContent =
      'Next Step →';

    setClaimStep(2);

  }

  else if (claimStep === 2) {

    document.getElementById('formStep2').style.display =
      'none';

    document.getElementById('formStep3').style.display =
      'block';

    document.getElementById('formTitle').textContent =
      '✅ Review & Submit';

    document.getElementById('nextBtn').textContent =
      '🚀 Submit Claim';

    setClaimStep(3);


    const plate =
      document.getElementById('claimPlate').value ||
      'Not provided';

    const type =
      document.getElementById('claimType').value;

    const sev =
      document.getElementById('claimSeverity').value;

    const desc =
      document.getElementById('claimDesc').value ||
      'No description';


    document.getElementById('claimSummary').innerHTML = `

      <div style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:10px;
        font-size:13px;
      ">

        <div>
          <div style="
            color:var(--muted);
            font-size:11px;
            margin-bottom:3px;
          ">
            VEHICLE
          </div>

          ${plate}

        </div>


        <div>

          <div style="
            color:var(--muted);
            font-size:11px;
            margin-bottom:3px;
          ">
            INCIDENT TYPE
          </div>

          ${type}

        </div>


        <div>

          <div style="
            color:var(--muted);
            font-size:11px;
            margin-bottom:3px;
          ">
            SEVERITY
          </div>

          ${sev}

        </div>


        <div>

          <div style="
            color:var(--muted);
            font-size:11px;
            margin-bottom:3px;
          ">
            PHOTOS
          </div>

          ${uploadedPhotos.length} uploaded

        </div>


        <div style="
          grid-column:1/-1
        ">

          <div style="
            color:var(--muted);
            font-size:11px;
            margin-bottom:3px;
          ">
            DESCRIPTION
          </div>

          ${desc.slice(0, 120)}

        </div>

      </div>

    `;

  }

  else if (claimStep === 3) {

    submitClaim();

  }

}


function claimPrev() {

  if (claimStep === 2) {

    document.getElementById('formStep2').style.display =
      'none';

    document.getElementById('formStep1').style.display =
      'block';

    document.getElementById('formTitle').textContent =
      '📝 Incident Details';

    document.getElementById('prevBtn').style.display =
      'none';

    document.getElementById('nextBtn').textContent =
      'Next Step →';

    setClaimStep(1);

  }

  else if (claimStep === 3) {

    document.getElementById('formStep3').style.display =
      'none';

    document.getElementById('formStep2').style.display =
      'block';

    document.getElementById('formTitle').textContent =
      '📸 Evidence Upload';

    document.getElementById('nextBtn').textContent =
      'Next Step →';

    setClaimStep(2);

  }

}


function setClaimStep(n) {

  claimStep = n;


  for (let i = 1; i <= 4; i++) {

    const el =
      document.getElementById('cstep' + i);


    el.className =
      'claim-step' +
      (
        i < n
          ? ' done'
          : i === n
            ? ' active'
            : ''
      );


    if (i < n) {

      el.querySelector('.step-circle').textContent =
        '✓';

    }

    else {

      el.querySelector('.step-circle').textContent =
        i;

    }

  }

}


const photoTypes = {

  damage: 'Vehicle Damage',

  scene: 'Accident Scene',

  doc: 'Document'

};


function uploadPhoto(type) {

  const names = [

    'photo_001.jpg',

    'photo_002.jpg',

    'img_scene.jpg',

    'rc_document.jpg'

  ];


  const fname =
    names[
      Math.floor(
        Math.random() * names.length
      )
    ];


  uploadedPhotos.push({

    type,

    name: fname

  });


  const list =
    document.getElementById('photoList');


  list.innerHTML =
    uploadedPhotos.map(p => `

      <div style="
        display:flex;
        align-items:center;
        gap:8px;
        padding:8px;
        background:var(--bg3);
        border-radius:8px;
        margin-bottom:6px;
        font-size:13px;
      ">

        <span>📎</span>

        <span style="flex:1">
          ${p.name}
        </span>

        <span style="
          color:var(--green);
          font-size:11px;
        ">

          ✓ ${photoTypes[p.type]}

        </span>

      </div>

    `).join('');


  toast(
    `📎 ${fname} uploaded`,
    'success'
  );
}


function submitClaim() {

  const btn =
    document.getElementById('nextBtn');


  btn.innerHTML =
    '<span class="spinner"></span>Submitting...';


  setTimeout(() => {

    document.getElementById('claimFormEl').style.display =
      'none';

    document.getElementById('claimSteps').style.display =
      'none';


    const claimNum =
      'DR-2026-' +
      Math.floor(
        10000 + Math.random() * 90000
      );


    document.getElementById('claimId').textContent =
      'CLAIM #' + claimNum;


    document
      .getElementById('claimStatusEl')
      .classList.add('show');


    setClaimStep(4);


    document.getElementById('claimTimeline').innerHTML = [

      {
        dot: 'var(--green)',
        text: 'Claim received by DR SOS platform',
        time: 'Just now'
      },

      {
        dot: 'var(--green)',
        text:
          `Insurer ${
            document
              .getElementById('insurer')
              ?.value
              ?.split(' ')[0] || 'Insurer'
          } notified`,
        time: 'Just now'
      },

      {
        dot: 'var(--yellow)',
        text: 'Surveyor assignment in progress',
        time: 'Within 2 hours'
      },

      {
        dot: 'var(--muted)',
        text: 'Physical inspection & assessment',
        time: 'Within 24–48 hours'
      },

      {
        dot: 'var(--muted)',
        text: 'Settlement disbursement',
        time: '3–5 business days'
      }

    ]

    .map(t => `

      <div class="cs-tl-item">

        <div
          class="cs-tl-dot"
          style="background:${t.dot}"
        ></div>

        <div>

          <div class="cs-tl-text">
            ${t.text}
          </div>

          <div class="cs-tl-time">
            ${t.time}
          </div>

        </div>

      </div>

    `).join('');


    toast(
      '🎉 Claim #' + claimNum +
      ' submitted successfully!',
      'success'
    );

  }, 2000);
}


// ===== AI SENSOR SIMULATION =====

const sensors = [

  {
    id: 'accel',
    icon: '📐',
    name: 'ACCELEROMETER',
    value: '0.2',
    unit: 'G',
    pct: 5,
    color: 'green'
  },

  {
    id: 'gyro',
    icon: '🔄',
    name: 'GYROSCOPE',
    value: '2.1',
    unit: '°/s',
    pct: 8,
    color: 'green'
  },

  {
    id: 'speed',
    icon: '🚀',
    name: 'SPEED',
    value: '45',
    unit: 'km/h',
    pct: 45,
    color: 'green'
  },

  {
    id: 'gps',
    icon: '📍',
    name: 'GPS ACCURACY',
    value: '±3',
    unit: 'm',
    pct: 92,
    color: 'green'
  },

  {
    id: 'impact',
    icon: '💥',
    name: 'IMPACT SENSOR',
    value: '0.0',
    unit: 'N',
    pct: 0,
    color: 'green'
  },

  {
    id: 'tilt',
    icon: '📏',
    name: 'TILT ANGLE',
    value: '2°',
    unit: '',
    pct: 4,
    color: 'green'
  }

];


function renderSensors() {

  document.getElementById('sensorGrid').innerHTML =

    sensors.map(s => `

      <div
        class="sensor-card"
        id="scard-${s.id}"
      >

        <div class="sensor-icon">
          ${s.icon}
        </div>

        <div class="sensor-name">
          ${s.name}
        </div>

        <div
          class="sensor-value"
          id="sv-${s.id}"
        >
          ${s.value}
        </div>

        <div class="sensor-unit">
          ${s.unit}
        </div>

        <div class="sensor-bar">

          <div
            class="sensor-fill fill-${s.color}"
            id="sf-${s.id}"
            style="width:${s.pct}%"
          ></div>

        </div>

      </div>

    `).join('');
}


renderSensors();


let simInterval = null;


const logBox =
  document.getElementById('logBox');


function addLog(
  msg,
  type = 'normal'
) {

  const now = new Date();


  const ts =
    `[${String(now.getHours()).padStart(2, '0')}:` +
    `${String(now.getMinutes()).padStart(2, '0')}:` +
    `${String(now.getSeconds()).padStart(2, '0')}]`;


  const line =
    document.createElement('div');


  line.className =
    'log-line';


  line.innerHTML = `

    <span class="log-time">
      ${ts}
    </span>

    <span class="log-${type}">
      ${msg}
    </span>

  `;


  logBox.appendChild(line);

  logBox.scrollTop =
    logBox.scrollHeight;
}


function updateSensor(
  id,
  value,
  pct,
  color
) {

  const el =
    document.getElementById(
      'sv-' + id
    );


  const fill =
    document.getElementById(
      'sf-' + id
    );


  if (el) {
    el.textContent = value;
  }


  if (fill) {

    fill.className =
      `sensor-fill fill-${color}`;

    fill.style.width =
      pct + '%';

  }
}


function setCrashProb(pct) {

  const fill =
    document.getElementById(
      'confFill'
    );


  const num =
    document.getElementById(
      'confNum'
    );


  if (fill) {

    fill.style.width =
      pct + '%';

    fill.className =
      pct > 50
        ? 'conf-fill danger'
        : 'conf-fill';

  }


  if (num) {

    num.textContent =
      pct + '%';

  }
}


function setAIState(
  msg,
  danger = false
) {

  const el =
    document.getElementById(
      'aiStateText'
    );


  if (el) {

    el.innerHTML = msg;

    el.className =
      'ai-state' +
      (danger ? ' danger' : '');

  }
}


function stopSim() {

  if (simInterval) {

    clearInterval(simInterval);

    simInterval = null;

  }


  updateSensor(
    'accel',
    '0.2',
    5,
    'green'
  );

  updateSensor(
    'gyro',
    '2.1',
    8,
    'green'
  );

  updateSensor(
    'speed',
    '0',
    0,
    'green'
  );

  updateSensor(
    'impact',
    '0.0',
    0,
    'green'
  );

  updateSensor(
    'tilt',
    '2°',
    4,
    'green'
  );

  updateSensor(
    'gps',
    '±3',
    92,
    'green'
  );


  setCrashProb(3);


  setAIState(
    '<strong>IDLE</strong> — Simulation stopped.'
  );


  addLog(
    '⏹ Simulation stopped',
    'normal'
  );
}


function startNormalRide() {

  stopSim();


  addLog(
    '🏍️ Normal ride simulation started',
    'ok'
  );


  let t = 0;


  simInterval = setInterval(() => {

    t++;


    const speed =
      40 + Math.random() * 20;

    const accel =
      0.1 + Math.random() * 0.4;

    const gyro =
      1 + Math.random() * 5;


    updateSensor(
      'speed',
      speed.toFixed(0),
      speed / 1.2,
      'green'
    );


    updateSensor(
      'accel',
      accel.toFixed(2),
      accel * 20,
      'green'
    );


    updateSensor(
      'gyro',
      gyro.toFixed(1),
      gyro * 3,
      'green'
    );


    setCrashProb(
      Math.floor(
        3 + Math.random() * 5
      )
    );


    setAIState(
      '<strong>MONITORING</strong> — Normal ride. No anomaly detected.'
    );


    if (t % 8 === 0) {

      addLog(
        `  Speed: ${speed.toFixed(0)} km/h | ` +
        `Accel: ${accel.toFixed(2)}G | ` +
        `All nominal`,
        'normal'
      );

    }

  }, 800);
}


function startRoughRoad() {

  stopSim();


  addLog(
    '🪨 Rough road simulation started',
    'warn'
  );


  let t = 0;


  simInterval = setInterval(() => {

    t++;


    const accel =
      0.8 + Math.random() * 1.5;

    const gyro =
      8 + Math.random() * 12;

    const tilt =
      5 + Math.random() * 15;

    const speed =
      25 + Math.random() * 15;

    const prob =
      Math.floor(
        15 + Math.random() * 25
      );


    updateSensor(
      'accel',
      accel.toFixed(2),
      Math.min(accel * 18, 100),
      accel > 1.5
        ? 'yellow'
        : 'green'
    );


    updateSensor(
      'gyro',
      gyro.toFixed(1),
      Math.min(gyro * 3, 100),
      gyro > 14
        ? 'yellow'
        : 'green'
    );


    updateSensor(
      'tilt',
      tilt.toFixed(0) + '°',
      Math.min(tilt * 3, 100),
      tilt > 12
        ? 'yellow'
        : 'green'
    );


    updateSensor(
      'speed',
      speed.toFixed(0),
      speed / 1.2,
      'green'
    );


    setCrashProb(prob);


    setAIState(
      `<strong style="color:var(--yellow)">
        ALERT
      </strong> — Rough road detected. Vibration patterns elevated.`
    );


    if (t % 5 === 0) {

      addLog(
        `⚠️ Vibration spike: ${accel.toFixed(2)}G | ` +
        `Tilt: ${tilt.toFixed(0)}° | ` +
        `Crash prob: ${prob}%`,
        'warn'
      );

    }


    if (
      accel > 1.8 &&
      t % 7 === 0
    ) {

      addLog(
        '🕳️ Pothole pattern detected — logging to hazard map',
        'warn'
      );

    }

  }, 600);
}


function simulatePothole() {

  addLog(
    '🕳️ Pothole event detected!',
    'warn'
  );


  updateSensor(
    'accel',
    '2.8',
    85,
    'yellow'
  );


  updateSensor(
    'gyro',
    '18.4',
    70,
    'yellow'
  );


  setCrashProb(22);


  setAIState(
    `<strong style="color:var(--yellow)">
      POTHOLE DETECTED
    </strong> — Logging hazard. Notifying nearby users.`
  );


  toast(
    '🕳️ Pothole detected & mapped!',
    'warning',
    '🕳️'
  );


  setTimeout(() => {

    updateSensor(
      'accel',
      '0.3',
      6,
      'green'
    );

    updateSensor(
      'gyro',
      '3.2',
      12,
      'green'
    );

    setCrashProb(5);

    setAIState(
      '<strong>MONITORING</strong> — Post-event. All nominal.'
    );

  }, 3000);
}


function simulateCrash() {

  if (simInterval) {

    clearInterval(simInterval);

    simInterval = null;

  }


  addLog(
    '💥 HIGH IMPACT DETECTED — Crash signature identified!',
    'danger'
  );


  updateSensor(
    'accel',
    '8.7',
    100,
    'red'
  );


  updateSensor(
    'gyro',
    '142.3',
    100,
    'red'
  );


  updateSensor(
    'speed',
    '0',
    0,
    'red'
  );


  updateSensor(
    'impact',
    '840',
    100,
    'red'
  );


  updateSensor(
    'tilt',
    '87°',
    100,
    'red'
  );


  setCrashProb(97);


  setAIState(
    `<strong style="color:var(--red)">
      CRASH DETECTED
    </strong> — Impact severity: HIGH. Initiating SOS protocol...`,
    true
  );


  document.getElementById(
    'aiStatus'
  ).style.borderColor =
    'var(--red)';


  document.getElementById(
    'aiStatus'
  ).style.background =
    'rgba(255,45,45,0.08)';


  setTimeout(() => {

    addLog(
      '📡 AI Crash Confirmation: 97% probability — triggering SOS',
      'danger'
    );


    toast(
      '💥 CRASH DETECTED! Initiating emergency protocol...',
      'error',
      '🚨'
    );


    setTimeout(() => {

      showPage(
        'sos',
        document.querySelectorAll(
          '.nav-links button'
        )[1]
      );


      triggerSOSCountdown();


      addLog(
        '🆘 Emergency countdown initiated — SOS pending user override',
        'danger'
      );

    }, 1500);

  }, 1200);


  setTimeout(() => {

    document.getElementById(
      'aiStatus'
    ).style.borderColor = '';


    document.getElementById(
      'aiStatus'
    ).style.background = '';

  }, 8000);
}