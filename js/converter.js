// ─── Unit Definitions ────────────────────────────────────────────────
const categories = {
    temperature: {
        label: 'Temperature',
        units: [
            { id: 'C',  name: 'Celsius',         toBase: v => v,              fromBase: v => v },
            { id: 'F',  name: 'Fahrenheit',      toBase: v => (v - 32) * 5/9, fromBase: v => v * 9/5 + 32 },
            { id: 'K',  name: 'Kelvin',          toBase: v => v - 273.15,     fromBase: v => v + 273.15 }
        ]
    },
    length: {
        label: 'Length',
        units: [
            { id: 'm',   name: 'Meter',           toBase: v => v,              fromBase: v => v },
            { id: 'km',  name: 'Kilometer',       toBase: v => v * 1000,       fromBase: v => v / 1000 },
            { id: 'mi',  name: 'Mile',            toBase: v => v * 1609.344,   fromBase: v => v / 1609.344 },
            { id: 'yd',  name: 'Yard',            toBase: v => v * 0.9144,     fromBase: v => v / 0.9144 },
            { id: 'ft',  name: 'Foot',            toBase: v => v * 0.3048,     fromBase: v => v / 0.3048 },
            { id: 'in',  name: 'Inch',            toBase: v => v * 0.0254,     fromBase: v => v / 0.0254 },
            { id: 'cm',  name: 'Centimeter',      toBase: v => v / 100,        fromBase: v => v * 100 },
            { id: 'mm',  name: 'Millimeter',      toBase: v => v / 1000,       fromBase: v => v * 1000 }
        ]
    },
    weight: {
        label: 'Weight / Mass',
        units: [
            { id: 'kg',  name: 'Kilogram',        toBase: v => v,              fromBase: v => v },
            { id: 'g',   name: 'Gram',            toBase: v => v / 1000,       fromBase: v => v * 1000 },
            { id: 'mg',  name: 'Milligram',       toBase: v => v / 1e6,        fromBase: v => v * 1e6 },
            { id: 'lb',  name: 'Pound',           toBase: v => v * 0.45359237, fromBase: v => v / 0.45359237 },
            { id: 'oz',  name: 'Ounce',           toBase: v => v * 0.02834952, fromBase: v => v / 0.02834952 },
            { id: 'st',  name: 'Stone',           toBase: v => v * 6.35029318, fromBase: v => v / 6.35029318 },
            { id: 't',   name: 'Metric Ton',      toBase: v => v * 1000,       fromBase: v => v / 1000 }
        ]
    },
    volume: {
        label: 'Volume',
        units: [
            { id: 'L',   name: 'Liter',           toBase: v => v,              fromBase: v => v },
            { id: 'mL',  name: 'Milliliter',      toBase: v => v / 1000,       fromBase: v => v * 1000 },
            { id: 'gal', name: 'Gallon (US)',     toBase: v => v * 3.785412,   fromBase: v => v / 3.785412 },
            { id: 'qt',  name: 'Quart (US)',      toBase: v => v * 0.9463529,  fromBase: v => v / 0.9463529 },
            { id: 'pt',  name: 'Pint (US)',       toBase: v => v * 0.4731765,  fromBase: v => v / 0.4731765 },
            { id: 'cup', name: 'Cup (US)',        toBase: v => v * 0.2365882,  fromBase: v => v / 0.2365882 },
            { id: 'floz',name: 'Fluid Ounce (US)',toBase: v => v * 0.02957353, fromBase: v => v / 0.02957353 },
            { id: 'tbsp',name: 'Tablespoon (US)',  toBase: v => v * 0.01478676, fromBase: v => v / 0.01478676 },
            { id: 'tsp', name: 'Teaspoon (US)',   toBase: v => v * 0.004928922,fromBase: v => v / 0.004928922 }
        ]
    },
    area: {
        label: 'Area',
        units: [
            { id: 'sqm',  name: 'Square Meter',    toBase: v => v,              fromBase: v => v },
            { id: 'sqkm', name: 'Square Kilometer', toBase: v => v * 1e6,       fromBase: v => v / 1e6 },
            { id: 'sqmi', name: 'Square Mile',     toBase: v => v * 2.58999e6,  fromBase: v => v / 2.58999e6 },
            { id: 'sqyd', name: 'Square Yard',     toBase: v => v * 0.836127,   fromBase: v => v / 0.836127 },
            { id: 'sqft', name: 'Square Foot',     toBase: v => v * 0.092903,   fromBase: v => v / 0.092903 },
            { id: 'sqin', name: 'Square Inch',     toBase: v => v * 0.00064516, fromBase: v => v / 0.00064516 },
            { id: 'ha',   name: 'Hectare',         toBase: v => v * 10000,      fromBase: v => v / 10000 },
            { id: 'ac',   name: 'Acre',            toBase: v => v * 4046.86,    fromBase: v => v / 4046.86 }
        ]
    },
    speed: {
        label: 'Speed',
        units: [
            { id: 'ms',   name: 'Meter / second',  toBase: v => v,              fromBase: v => v },
            { id: 'kmh',  name: 'Kilometer / hour', toBase: v => v / 3.6,        fromBase: v => v * 3.6 },
            { id: 'mph',  name: 'Mile / hour',     toBase: v => v * 0.44704,    fromBase: v => v / 0.44704 },
            { id: 'kn',   name: 'Knot',            toBase: v => v * 0.514444,   fromBase: v => v / 0.514444 },
            { id: 'ftms', name: 'Foot / second',   toBase: v => v * 0.3048,     fromBase: v => v / 0.3048 }
        ]
    },
    time: {
        label: 'Time',
        units: [
            { id: 's',    name: 'Second',          toBase: v => v,              fromBase: v => v },
            { id: 'min',  name: 'Minute',          toBase: v => v * 60,         fromBase: v => v / 60 },
            { id: 'h',    name: 'Hour',            toBase: v => v * 3600,       fromBase: v => v / 3600 },
            { id: 'd',    name: 'Day',             toBase: v => v * 86400,      fromBase: v => v / 86400 },
            { id: 'wk',   name: 'Week',            toBase: v => v * 604800,     fromBase: v => v / 604800 },
            { id: 'mo',   name: 'Month (30 days)', toBase: v => v * 2.592e6,    fromBase: v => v / 2.592e6 },
            { id: 'yr',   name: 'Year (365 days)', toBase: v => v * 3.1536e7,   fromBase: v => v / 3.1536e7 }
        ]
    },
    data: {
        label: 'Data Storage',
        units: [
            { id: 'B',    name: 'Byte',            toBase: v => v,              fromBase: v => v },
            { id: 'KB',   name: 'Kilobyte',        toBase: v => v * 1000,       fromBase: v => v / 1000 },
            { id: 'MB',   name: 'Megabyte',        toBase: v => v * 1e6,        fromBase: v => v / 1e6 },
            { id: 'GB',   name: 'Gigabyte',        toBase: v => v * 1e9,        fromBase: v => v / 1e9 },
            { id: 'TB',   name: 'Terabyte',        toBase: v => v * 1e12,       fromBase: v => v / 1e12 },
            { id: 'KiB',  name: 'Kibibyte',        toBase: v => v * 1024,       fromBase: v => v / 1024 },
            { id: 'MiB',  name: 'Mebibyte',        toBase: v => v * 1048576,    fromBase: v => v / 1048576 },
            { id: 'GiB',  name: 'Gibibyte',        toBase: v => v * 1.07374e9,  fromBase: v => v / 1.07374e9 }
        ]
    }
};

// ─── State ──────────────────────────────────────────────────────────
let currentCategory = 'temperature';

const fromVal = document.getElementById('fromVal');
const toVal = document.getElementById('toVal');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const formulaText = document.getElementById('formulaText');
const cardTitle = document.getElementById('cardTitle');

// ─── Populate Units ─────────────────────────────────────────────────
function populateUnits(categoryId) {
    const cat = categories[categoryId];
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    cat.units.forEach((u, i) => {
        const opt1 = document.createElement('option');
        opt1.value = u.id;
        opt1.textContent = u.name;
        if (i === 0) opt1.selected = true;
        fromUnit.appendChild(opt1);

        const opt2 = document.createElement('option');
        opt2.value = u.id;
        opt2.textContent = u.name;
        if (i === 1 || (cat.units.length === 1)) opt2.selected = true;
        toUnit.appendChild(opt2);
    });
}

// ─── Conversion ─────────────────────────────────────────────────────
function getUnit(catId, unitId) {
    return categories[catId].units.find(u => u.id === unitId);
}

function convert() {
    const raw = fromVal.value.trim();
    if (raw === '') { toVal.value = ''; formulaText.textContent = ''; return; }
    const v = parseFloat(raw.replace(/,/g, ''));
    if (isNaN(v)) { toVal.value = ''; formulaText.textContent = ''; return; }

    const cat = categories[currentCategory];
    const from = getUnit(currentCategory, fromUnit.value);
    const to = getUnit(currentCategory, toUnit.value);
    if (!from || !to) return;

    // Convert: value → base → target
    const inBase = from.toBase(v);
    const result = to.fromBase(inBase);

    // Format result
    let formatted;
    if (Number.isInteger(result) && Math.abs(result) < 1e15) {
        formatted = result.toString();
    } else if (Math.abs(result) < 0.001 || Math.abs(result) >= 1e12) {
        formatted = result.toExponential(6);
    } else {
        formatted = parseFloat(result.toFixed(10)).toString();
    }
    toVal.value = formatted;

    // Formula hint
    const fromName = from.name;
    const toName = to.name;
    if (cat.units.length === 3 && currentCategory === 'temperature' &&
        ['C','F','K'].includes(from.id) && ['C','F','K'].includes(to.id)) {
        if (from.id === 'C' && to.id === 'F') formulaText.textContent = `${v}°C × 9/5 + 32 = ${formatted}°F`;
        else if (from.id === 'F' && to.id === 'C') formulaText.textContent = `(${v}°F − 32) × 5/9 = ${formatted}°C`;
        else if (from.id === 'C' && to.id === 'K') formulaText.textContent = `${v}°C + 273.15 = ${formatted}K`;
        else if (from.id === 'K' && to.id === 'C') formulaText.textContent = `${v}K − 273.15 = ${formatted}°C`;
        else if (from.id === 'F' && to.id === 'K') formulaText.textContent = `(${v}°F − 32) × 5/9 + 273.15 = ${formatted}K`;
        else if (from.id === 'K' && to.id === 'F') formulaText.textContent = `(${v}K − 273.15) × 9/5 + 32 = ${formatted}°F`;
        else formulaText.textContent = `${v} ${fromName} = ${formatted} ${toName}`;
    } else {
        formulaText.textContent = `${v} ${fromName} = ${formatted} ${toName}`;
    }
}

// ─── Swap ──────────────────────────────────────────────────────────
function swapUnits() {
    const tmpU = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = tmpU;
    const tmpV = fromVal.value;
    fromVal.value = toVal.value;
    toVal.value = tmpV;
    convert();
}

// ─── Switch Category ───────────────────────────────────────────────
function switchCategory(catId) {
    currentCategory = catId;
    cardTitle.textContent = categories[catId].label;
    populateUnits(catId);
    fromVal.value = '';
    toVal.value = '';
    formulaText.textContent = '';
    fromVal.focus();

    // Update tab active state
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab[data-category="${catId}"]`).classList.add('active');

    convert();
}

// ─── Events ─────────────────────────────────────────────────────────
fromVal.addEventListener('input', convert);
fromUnit.addEventListener('change', convert);
toUnit.addEventListener('change', convert);
document.getElementById('swapBtn').addEventListener('click', swapUnits);
document.getElementById('clearBtn').addEventListener('click', () => {
    fromVal.value = '';
    toVal.value = '';
    formulaText.textContent = '';
    fromVal.focus();
});

// Tab clicks
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchCategory(tab.dataset.category));
});

// Keyboard shortcuts: Enter to swap
fromVal.addEventListener('keydown', e => { if (e.key === 'Enter') swapUnits(); });
toVal.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); fromVal.focus(); } });

// ─── Init ──────────────────────────────────────────────────────────
populateUnits('temperature');
fromVal.value = '0';
convert();
